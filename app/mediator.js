import { Messenger, Socket } from './transformer';
import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { SendMessage, GetProfile, SendGiftcards } from './messenger';
import { MatchAnswer } from '../bot/mainBot';
import { MemberService, Bot, ToMemberService } from '../data/appConstants';
import { New_message, New_chat, Chat_update } from '../data/socketConstants';

const socketEmit = (transform) => {
  const { io, action, data, chat } = transform;
  switch (action) {
    case New_chat:
    return io.emit(action, chat);
    case New_message:
    return io.emit(action, Socket.message(data, chat));
    case Chat_update:
    return io.emit(action, Socket.updateChat(data, chat));
  }
  return chat;
};

const socketNewChat = (io) => (chat) => {
  socketEmit({io, action: New_chat, chat});
  return chat;
};

const findOrCreateChat = data => {
  const { io, sender } = data;
  return Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj)
    return GetProfile(sender)
    .then(Chat.create)
    .then(socketNewChat(io));
    else
    return chatObj;
  });
};

const storeMessage = data => chat => {
  const { text, userType } = data;
  const toStore = {
    text,
    userType,
    chat
  };
  return Object.assign(chat, Bubble.create(toStore));
};

const fromMemberService = (sender) => {
  return findOrCreateChat({sender})
  .then(chat => {
    Chat.update(chat, {session: MemberService, active: false});
  });
};

const fromConsumer = (chat) => {
  return Chat.update(chat, {session: MemberService, active: true});
};

const fromBot = (chat) => {
  return Chat.update(chat, {session: Bot, active: false});
};

const updateChat = (io, data) => obj => {
  socketEmit({io, action: 'new_message', data, chat: obj});
  if (!obj)
  return fromMemberService(data.sender);
  else if (obj._boundTo.dataValues.text.includes(ToMemberService))
  return fromConsumer(obj);
  else
  return fromBot(obj);
};

const handleBotMessage = (toStore, sender, fromBot, chat) => {
  const session = toStore.text === ToMemberService ? MemberService : Bot;
  SendMessage(sender, toStore.text);
  if (fromBot.brand)
  SendGiftcards(sender, fromBot.brand);
  return Chat.update(chat, {session, active: false})
  .then(storeMessage(toStore));
};

const prepareBotMessage = (text, sender, chat) => {
  const fromBot = MatchAnswer(text, chat.firstName);
  const toStore = {
    text: fromBot.answer,
    userType: Bot,
    chat
  };
  return handleBotMessage(toStore, sender, fromBot, chat);
};

const botCheck = (text, sender) => chat => {
  if (chat.session !== MemberService)
  return prepareBotMessage(text, sender, chat);
  else
  return chat;
};

const sendToMessager = (sender, text, userType) => {
  if (userType === MemberService)
  SendMessage(sender, text);
};

// exports ====>

export const Init = (io, dataIn) => {
  const data = Messenger.transform(dataIn);
  const { sender, text, userType } = data;
  return findOrCreateChat({io, sender})
  .then(storeMessage({userType, text}))
  .then(botCheck(text, sender))
  .then(updateChat(io, data))
  .then(sendToMessager(sender, text, userType));
};

export const getChats = () => {
  return Chat.findAll();
};

export const updateStatus = (io, payload) => {
  const { chatId, key, value } = payload;
  return Chat.findById(chatId)
  .then((chat) => {
    const keyValue = JSON.parse(`{"${key}":${value}}`);
    socketEmit({io, action: Chat_update, data: keyValue, chat});
    Chat.update(chat, keyValue);
  });
};
