import { Bot } from '../data/appConstants';
import { MatchAnswer } from '../bot/mainBot';
import { SendMessage, SendGiftcards } from './messenger';
import Chat from '../db/chat';
import Bubble from '../db/bubble';

const callState = data => {
  const state = data.chat.state;
  return State[state](data);
};

const callNextState = data => {
  const { chat } = data;
  const current = chat.state;
  const state = NextState[current];
  return Chat.update(chat, { state })
  .then((updated) => {
    return callState({...data, chat: updated});
  });
};

const handleBotMessage = (data) => {
  const { sender, toDb, brand, chat } = data;
  SendMessage(sender, toDb.text);
  brand ? SendGiftcards(data.sender, fromBot.brand) : null;
  return Bubble.create({chat, ...toDb})
  return data;
};

const prepareBotMessage = (data) => {
  const { text, chat } = data;
  const fromBot = MatchAnswer(text, chat.firstName);
  const { answer, brand } = fromBot;
  const toDb = {
    text: answer,
    userType: Bot,
    chat
  };
  return handleBotMessage({toDb, ...data, brand});
};

export const NextState = {
  init: 'botFromInit',
};

export const State = {
  init: (data) => {
    callNextState(data);
  },

  botFromInit: (data) => {
    const { chat, text, userType } = data;
    Bubble.create({chat, text, userType});
    return prepareBotMessage(data);
  },

  closeBotFromInit: () => {},
  bot: () => {},
  closeBot: () => {},
  msReceiveFromBot: () => {},
  closeMsReceiveFromBot: () => {},
  msReceive: () => {},
  closeMsReceive: () => {},
  msSend: () => {},
  closeMsSend: () => {},
};
