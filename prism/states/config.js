import { OnBot, OffBot } from './all';
import Chat from '../../db/chat';

const onUpdate = (data) => {
  return Chat.update(data.chat, { state: data.state })
  .then((chat) => {
    return { ...data, chat };
  });
}

export default [
  { from: 'init',      to: 'bot',     on: OnBot, off: OffBot },
  { from: 'bot',       to: 'bot',     on: OnBot, off: OffBot },
  { from: 'msReceive', to: 'msSend'    },
  { from: 'msSend',    to: 'msReceive' },
  { onUpdate }
  // { from: 'botSend',    to: 'botReceive', on, off },
  // { from: 'msReceive',  to: 'msSend',     on, off },
  // { from: 'msSend',     to: 'msReceive',  on, off },
];
