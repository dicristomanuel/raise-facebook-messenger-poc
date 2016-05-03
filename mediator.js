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
  .then(updateActive);

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
  const obj = {chat: chat};
  return Object.assign({chat: chat}, Bubble.create(toStore));
};

const updateActive = (obj) => {
  if (obj.userType !== 'member_service')
  return Chat.update(obj.chat, {active: true});
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


const evalResp = (resp) => {
  console.log(resp);
};
