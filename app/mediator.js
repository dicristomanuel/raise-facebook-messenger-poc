import { Messenger, Socket } from './transformer';
import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { SendMessage, GetProfile, SendGiftcards } from './messenger';
import { MatchAnswer } from '../bot/mainBot';
import { MemberService, Bot, ToMemberService, Consumer } from '../data/appConstants';
import { New_message, New_chat, Chat_update } from '../data/socketConstants';

const socketEmit = (transform) => {
  const { io, action, data, chat } = transform;
  switch (action) {
    case New_chat:
    return io.emit(action, chat);
    case New_message:
    return io.emit(`${action}${chat.id}`, Socket.message(data, chat));
    case Chat_update:
    return io.emit(action, Socket.updateChat(data, chat));
  }
};

const socketNewChat = (io) => (chat) => {
  socketEmit({io, action: New_chat, chat});
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
  const toDb = {
    text,
    userType,
    chat
  };
  return Object.assign(chat, Bubble.create(toDb));
};

const updateChat = (io, data) => chat => {
  const { userType } = data;
  const active = userType === Consumer ? true : false;
  socketEmit(io, Chat_update, { active }, chat);
  return Chat.update(chat, { active });
};

const handleBotMessage = (toDb, sender, fromBot, chat) => {
  const session = toDb.text.includes(ToMemberService) ? MemberService : Bot;
  const active = session === MemberService ? true : false;
  SendMessage(sender, toDb.text);
  if (fromBot.brand)
  SendGiftcards(sender, fromBot.brand);
  return Chat.update(chat, {session, active})
  .then(storeMessage(toDb));
};

const prepareBotMessage = (text, sender, chat) => {
  const fromBot = MatchAnswer(text, chat.firstName);
  const toDb = {
    text: fromBot.answer,
    userType: Bot,
    chat
  };
  return handleBotMessage(toDb, sender, fromBot, chat);
};

const botCheck = (text, sender) => chat => {
  if (chat.session !== MemberService)
  return prepareBotMessage(text, sender, chat);
  else
  return chat;
};

// MAKE SURE SOCKETS DON'T EMIT CHATS THAT SHOULDNT BE EMMITED

const sendToMessager = (text) => (chat) => {
  SendMessage(chat.dataValues.sender, text);
};

// exports ====>

export const FromConsumer = (io, dataIn) => {
  const data = Messenger.transform(dataIn);
  const { sender, text, userType } = data;
  return findOrCreateChat({io, sender})
  .then(storeMessage({userType, text}))
  .then(updateChat(io, data))
  .then(botCheck(text, sender));
};

export const FromMemberService = (io, data) => {
  const { text, chatId } = data;
  const userType = MemberService;
  return Chat.findById(chatId)
  .then(storeMessage({userType, text}))
  .then(updateChat(io, {...data, userType}))
  .then(sendToMessager(text));
};

export const GetChats = () => {
  return Chat.findAll();
};

export const GetMessages = (id) => {
  return Bubble.findForChat(id);
};

export const UpdateStatus = (io, payload) => {
  const { chatId, key, value } = payload;
  return Chat.findById(chatId)
  .then((chat) => {
    const keyValue = JSON.parse(`{"${key}":${value}}`);
    socketEmit({io, action: Chat_update, data: keyValue, chat});
    Chat.update(chat, keyValue);
  });
};
