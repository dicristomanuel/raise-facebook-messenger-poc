import { OnInit, OnBot, OffBot, OnMs, OffMs } from './all';
import Chat from '../../db/chat';

const onUpdate = (data) => {
  return Chat.update(data.chat, { state: data.state })
  .then((chat) => {
    return { ...data, chat };
  });
}

export default [
  { from: 'init', to: 'init', on: OnInit, off: null },
  { from: 'bot',  to: 'bot',  on: OnBot,  off: OffBot },
  { from: 'ms',   to: 'ms',   on: OnMs,   off: OffMs },
  { onUpdate }
];
