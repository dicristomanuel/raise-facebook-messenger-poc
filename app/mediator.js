import { Messenger, Socket } from './transformer';
import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { SendMessage, GetProfile, SendGiftcards } from './messenger';
import { MatchAnswer } from '../bot/mainBot';
import { MemberService, Bot, ToMemberService } from '../data/constants';

const evalData = (data) => {
  debugger;
  return data;
};

// CHECK DATA SENT

const socketEmit = (io, action) => (data) => {
  io.emit(action, data);
  return data;
};

const findOrCreateChat = sender => {
  return Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj)
    return GetProfile(sender)
    .then(Chat.create);
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
  return findOrCreateChat(sender)
  .then(chat => {
    Chat.update(chat, {session: MemberService, active: false});
  });
};

const fromConsumer = (io, chat) => {
  return Chat.update(chat, {session: MemberService, active: true})
  .then(socketEmit(io, 'new_chat'));
};

const fromBot = (chat) => {
  return Chat.update(chat, {session: Bot, active: false});
};

const updateChat = (io, userType, sender) => obj => {
  if (!obj)
  return fromMemberService(sender);
  else if (obj._boundTo.dataValues.text.includes(ToMemberService))
  return fromConsumer(io, obj);
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
  return false;
};

const sendToMessager = (sender, text, userType) => {
  if (userType === MemberService)
  SendMessage(sender, text);
};

// exports ====>

export const Init = (io, dataIn) => {
  const data = Messenger.transform(dataIn);
  const { sender, text, userType } = data;
  return findOrCreateChat(sender)
  .then(storeMessage({userType, text}))
  .then(socketEmit(io, 'new_message'))
  .then(botCheck(text, sender))
  .then(updateChat(io, userType, sender))
  .then(sendToMessager(sender, text, userType));
};

export const getChats = () => {
  return Chat.findAll();
};
