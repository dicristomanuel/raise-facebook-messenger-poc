import request from 'request';
import { transform } from './transformer';
import Chat from './db/chat';
import Bubble from './db/bubble';
import { sendMessage, getProfile } from './messenger';
import { isBot, matchAnswer } from './bot';

export const init = (dataIn) => {
  const data = transform(dataIn);
  const { sender, text, send, userType } = data;

  findOrCreateChat(sender)
  .then(storeUserMessage(userType, text))
  .then(updateActive)
  .then(botCheck(text, send, sender))
  .then(sendToMessager(sender, text, userType));

};

const findOrCreateChat = (sender) => {
  return Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj)
    return getProfile(sender).then(Chat.create);
    else
    return chatObj;
  });
};

const storeUserMessage = (userType, text) => (chat) => {
  const toStore = {
    text,
    userType,
    chat
  };
  return Object.assign({chat: chat}, Bubble.create(toStore));
};

const updateActive = (obj) => {
  if (obj.userType !== 'member_service')
  return Chat.update(obj.chat, {active: true});
};

const botCheck = (text, send, sender) => (chat) => {
  if (!send && isBot(text))
  return handleBotMessage(text, sender, chat);
  else
  return false;
};

const handleBotMessage = (text, sender, chat) => {
  const toStore = {
    text: matchAnswer(text, chat.firstName),
    userType: 'bot',
    active: false,
    chat
  };
  sendMessage(sender, toStore.text);
  return Bubble.create(toStore);
};

const sendToMessager = (sender, text, userType) => {
  if (userType === 'member_service')
  sendMessage(sender, text);
};

// TODO:
// solve member service handling case
// add bot mix response (ILU)
