import { transform } from './transformer';
import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { sendMessage, getProfile } from './messenger';
import { matchAnswer } from '../bot/mainBot';
import { memberService, bot, toMemberService } from '../data/constants';

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
      return Chat.update(chat, {session: memberService, active: false});
    });
  } else if (obj._boundTo.dataValues.text === toMemberService) {
    return Chat.update(obj, {session: memberService, active: true});
  } else {
    return Chat.update(obj, {session: bot, active: false});
  }
};

const handleBotMessage = (text, sender, chat) => {
  const toStore = {
    text: matchAnswer(text, chat.firstName),
    userType: bot,
    chat
  };

  const session = toStore.text.includes('someone') ? memberService : bot;
  sendMessage(sender, toStore.text);
  return Chat.update(chat, {session, active: false})
  .then(storeMessage(toStore));

};

const botCheck = (text, sender) => (chat) => {
  if (chat.session !== memberService) {
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
