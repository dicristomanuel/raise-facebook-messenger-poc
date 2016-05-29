import { OnBotReceive, OffBotReceive } from './all';

const on = 'foo';
const off = 'bar';

export default [
  { from: 'init',       to: 'botReceive', on: OnBotReceive, off: OffBotReceive },
  { from: 'botReceive', to: 'botSend',    on, off },
  { from: 'botSend',    to: 'botReceive', on, off },
  { from: 'msReceive',  to: 'msSend',     on, off },
  { from: 'msSend',     to: 'msReceive',  on, off },
];
