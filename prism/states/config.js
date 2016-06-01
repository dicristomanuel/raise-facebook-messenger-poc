import { OnBot, OffBot, OnMs, OffMs } from './all';
import Chat from '../../db/chat';

const onUpdate = (data) => {
  debugger;
  return Chat.update(data.chat, { state: data.state })
  .then((chat) => {
    return { ...data, chat };
  });
}

export default [
  { from: 'init', to: 'bot', on: OnBot, off: OffBot },
  { from: 'bot',  to: 'bot', on: OnBot, off: OffBot },
  { from: 'ms',   to: 'ms',  on: OnMs,  off: OffMs },
  { onUpdate }
];
