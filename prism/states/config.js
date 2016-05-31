import { OnBot, OffBot, OnMsReceive, OffMsReceive, OnMsSend, OffMsSend } from './all';
import Chat from '../../db/chat';

const onUpdate = (data) => {
  return Chat.update(data.chat, { state: data.state })
  .then((chat) => {
    return { ...data, chat };
  });
}

export default [
  { from: 'init',      to: 'bot',       on: OnBot,       off: OffBot },
  { from: 'bot',       to: 'bot',       on: OnBot,       off: OffBot },
  { from: 'msReceive', to: 'msSend',    on: OnMsSend,    off: OffMsSend },
  { from: 'msSend',    to: 'msReceive', on: OnMsReceive, off: OffMsReceive },
  { onUpdate }
  // { from: 'botSend',    to: 'botReceive', on, off },
  // { from: 'msReceive',  to: 'msSend',     on, off },
  // { from: 'msSend',     to: 'msReceive',  on, off },
];
