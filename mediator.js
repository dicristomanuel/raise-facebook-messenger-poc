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
  .then(updateActive(sender));

};

const evalData = (resp) => {
  console.log(resp);
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
  const active = userType === 'member_service' ? false : true;
  const toStore = {
    text,
    userType,
    chat
  };
  return Bubble.create(toStore);
};

const updateActive = (sender, active) => {
  return Chat.update(sender, 'active', active);
  // continue for update
};


const botCheck = (text, send) => (chat) => {
  if (!send && isBot(text))
  return storeBotMessage(text, chat);
  else
  return false;
};

const storeBotMessage = (text, chat) => {
  const toStore = {
    text: matchAnswer(text, chat.firstName),
    userType: 'bot',
    active: false,
    chat
  };
  return Bubble.create(toStore);
};


const sendToMessenger = (sender) => (bubble) => {
  return sendMessage(sender, text);
};
