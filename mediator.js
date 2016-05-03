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
  .then((chat) => {
    storeUserMessage(text, userType, chat);
    botCheck(text, send, chat);
  });
};

const findOrCreateChat = (sender) => {
  return new Promise((resolve, reject) => {
    Chat.find(sender)
    .then((chatObj) => {
      if (!chatObj)
      resolve(getProfile(sender).then(Chat.create));
      else
      resolve(chatObj);
    });
  });
};

const storeUserMessage = (text, userType, chat) => {
  const active = userType === 'member_service' ? false : true;
  const toStore = {
    text,
    userType,
    active,
    chat
  };
  return Bubble.create(toStore);
};


const botCheck = (text, send, chat) => {
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

const sendToMessenger = (data) => {

};
