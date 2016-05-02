import request from 'request';
import { Message } from './message';
import Chat from './db/chat';
import { sendMessage, getProfile } from './messenger';
import { isBot, matchAnswer } from './bot';

export const init = (data) => {
  const message = new Message(data.text, data.sender, data.userType);
  findOrCreateChat(message.sender);
};

const findOrCreateChat = (sender, cb) => {
  Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj) {
      return getProfile(sender).then(Chat.create);
    }
    return chatObj;
  });
};

const botAnswer = (data) => {
  const { send, text, firstName } = data;
  if (!send && isBot(text)) {
    // move into transformer
    data.send = true;
    return matchAnswer(text, firstName);
  }
  return null;
};
