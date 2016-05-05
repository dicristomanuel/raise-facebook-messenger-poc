import { transform } from './transformer';
import Chat from './db/chat';
import Bubble from './db/bubble';
import { sendMessage, getProfile } from './messenger';
import { isBot, matchAnswer } from './bot';
import { memberService, bot } from './constants';

const findOrCreateChat = (sender) => {
  return Chat.find(sender)
  .then((chatObj) => {
    if (!chatObj)
    return getProfile(sender).then(Chat.create);
    else
    return chatObj;
  });
};

const storeMessage = (data) => (chat) => {
  const { text, userType } = data;
  const toStore = {
    text,
    userType,
    chat
  };
  return Object.assign(chat, Bubble.create(toStore));
};

const updateChat = (userType, sender) => (obj) => {
  if (!obj) {
    Chat.find(sender)
    .then((chat) => {
      if (userType === memberService)
      return Chat.update(chat, {session: userType, active: false});
      else if (!obj)
      return Chat.update(chat, {session: memberService, active: true});
    });
  }
};

const handleBotMessage = (text, sender, chat) => {
  const toStore = {
    text: matchAnswer(text, chat.firstName),
    userType: bot,
    chat
  };
  sendMessage(sender, toStore.text);
  return Chat.update(chat, {session: bot, active: false})
  .then(storeMessage(toStore));

};

const botCheck = (text, sender) => (chat) => {
  if (chat.session !== memberService && isBot(text)) {
    return handleBotMessage(text, sender, chat);
  } else {
    return false;
  }
};

const sendToMessager = (sender, text, userType) => {
  if (userType === memberService)
  sendMessage(sender, text);
};

export const init = (dataIn) => {
  const data = transform(dataIn);
  const { sender, text, userType } = data;

  return findOrCreateChat(sender)
  .then(storeMessage({userType, text}))
  .then(botCheck(text, sender))
  .then(updateChat(userType, sender))
  .then(sendToMessager(sender, text, userType));
};

// TODO:
// add bot mix response (ILU) and send structure messages for GCs
// 'Awww'
