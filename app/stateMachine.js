import Chat from '../db/chat';
import { BotFromInit } from './states/all';

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

export const NextState = {
  init: 'botFromInit',
};

export const State = {
  init: (data) => {
    callNextState(data);
  },


  botFromInit: BotFromInit,

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
