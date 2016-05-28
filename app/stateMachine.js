import Chat from '../db/chat';
import { BotFromInit, CloseBotFromInit, BotFromBot } from './states/all';

const callState = data => {
  const state = data.chat.state;
  return states[state](data);
};

export const CallNextState = data => {
  const { chat, switchState } = data;
  const current = chat.state;
  const state = switchState ? switchState[current] : nextState[current];
  return Chat.update(chat, { state })
  .then((updated) => {
    return callState({...data, chat: updated});
  });
};

const nextState = {
  init: 'botFromInit',
  botFromInit: 'closeBotFromInit',
  closeBotFromInit: 'botFromBot',
  botFromBot: 'closeBotFromInit',
};

const switchState = {
  botFromInit: 'msReceiveFromBot',
  botFromBot: 'msReceiveFromBot',
};

const states = {
  init: CallNextState,
  botFromInit: BotFromInit,
  closeBotFromInit: CloseBotFromInit,
  botFromBot: BotFromBot,
  closeBot: () => {},
  msReceiveFromBot: () => {},
  closeMsReceiveFromBot: () => {},
  msReceive: () => {},
  closeMsReceive: () => {},
  msSend: () => {},
  closeMsSend: () => {},
};

// TODO: automate names ^
// NEXT: WHEN BOT GOES TO MS
