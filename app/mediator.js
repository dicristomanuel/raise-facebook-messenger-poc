import { Transform } from './transformer';
import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { SendMessage, GetProfile, SendGiftcards } from './messenger';
import { MatchAnswer } from '../bot/mainBot';
import { MemberService, Bot, ToMemberService } from '../data/constants';
import { io } from '../server.js';
import { TransformSocket } from '../sockets/transformer';

const socketEmit = (action, obj) => {
  io.emit(action, TransformSocket(obj));
};

const findOrCreateChat = sender => {
  return Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj)
    return GetProfile(sender).then(Chat.create);
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

const forMemberService = (chat) => {
  socketEmit('newChat', chat);
  return Chat.update(chat, {session: MemberService, active: true});
};

const fromBot = (chat) => {
  return Chat.update(chat, {session: Bot, active: false});
};

const updateChat = (userType, sender) => obj => {
  if (!obj) {
    return fromMemberService(sender);
  } else if (obj._boundTo.dataValues.text.includes(ToMemberService)) {
    return forMemberService(obj);
  } else {
    fromBot(obj);
  }
};

const handleBotMessage = (text, sender, chat) => {
  const fromBot = MatchAnswer(text, chat.firstName);
  const toStore = {
    text: fromBot.answer,
    userType: Bot,
    chat
  };
  const session = toStore.text === ToMemberService ? MemberService : Bot;
  SendMessage(sender, toStore.text);
  fromBot.brand ? SendGiftcards(sender, fromBot.brand) : null;
  return Chat.update(chat, {session, active: false})
  .then(storeMessage(toStore));
};

const botCheck = (text, sender) => chat => {
  if (chat.session !== MemberService)
  return handleBotMessage(text, sender, chat);
  else
  return false;
};

const sendToMessager = (sender, text, userType) => {
  if (userType === MemberService)
  SendMessage(sender, text);
};

export const Init = dataIn => {
  const data = Transform(dataIn);
  const { sender, text, userType } = data;
  return findOrCreateChat(sender)
  .then(storeMessage({userType, text}))
  .then(botCheck(text, sender))
  .then(updateChat(userType, sender))
  .then(sendToMessager(sender, text, userType));
};
