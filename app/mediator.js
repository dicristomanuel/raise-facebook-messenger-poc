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
  const toDb = {
    text,
    userType,
    chat
  };
  return Object.assign(chat, Bubble.create(toDb));
};

const updateChat = (io, data, chat, session, active) => {
  const { userType } = data;
  if (userType === MemberService && chat.active !== false) {
    socketEmit({io, action: Chat_update, data: { active: false }, chat});
    return Chat.update(chat, { active: false });
  } else if (userType === Consumer && chat.session === MemberService && chat.active !== true) {
    socketEmit({io, action: Chat_update, data: { active: true }, chat});
    return Chat.update(chat, { active: true });
  } else if (chat.session !== session) {
    socketEmit({io, action: Chat_update, data: { session, active }, chat});
    return Chat.update(chat, {session, active});
  }
};

const handleBotMessage = (io, toDb, data, fromBot, chat) => {
  const session = toDb.text.includes(ToMemberService) ? MemberService : Bot;
  const active = session === MemberService ? true : false;
  SendMessage(data.sender, toDb.text);
  if (fromBot.brand)
  SendGiftcards(data.sender, fromBot.brand);
  return updateChat(io, data, session, active, chat)
  .then(storeMessage(toDb));
};

const prepareBotMessage = (io, data, chat) => {
  const fromBot = MatchAnswer(data.text, chat.firstName);
  const toDb = {
    text: fromBot.answer,
    userType: Bot,
    chat
  };
  return handleBotMessage(io, toDb, data, fromBot, chat);
};

const botCheck = (io, data) => chat => {
  if (chat.session !== MemberService)
  return prepareBotMessage(io, data, chat);
  else
  return chat;
};

const sendToMessager = (text) => (chat) => {
  SendMessage(chat.dataValues.sender, text);
};

// exports ====>

export const FromConsumer = (io, dataIn) => {
  const data = Messenger.transform(dataIn);
  const { sender, text, userType } = data;
  return findOrCreateChat({io, sender})
  .then(storeMessage({userType, text}))
  .then(botCheck(io, data));
};

export const FromMemberService = (io, data) => {
  const { text, chatId, userType } = data;
  return Chat.findById(chatId)
  .then(storeMessage({userType, text}))
  .then(updateChat(io, userType))
  .then(sendToMessager(text))
  .catch((error) => {
    return `${error}`;
  });
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
