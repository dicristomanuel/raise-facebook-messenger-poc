import BotReceive from './botReceive/on';

const on = 'foo';
const off = 'bar';

export default [
  { from: 'init',       to: 'botReceive', on, off },
  { from: 'botReceive', to: 'botSend',    on, off },
  { from: 'botSend',    to: 'botReceive', on, off },
  { from: 'msReceive',  to: 'msSend',     on, off },
  { from: 'msSend',     to: 'msReceive',  on, off },
];

// AUTO GENERATE THESE:
/*
'init': 'botReceive',
botReceiveFromInit
afterBotReceiveFromInit

'botReceive': 'botSend',
botSendFromBotReceive
afterBotSendFromBotReceive

'botSend' : 'botReceive',
botReceiveFromBotSend
afterbotReceiveFromBotSend

'botReceive': 'msReceive',
msReceiveFromBotReceive
afterMsReceiveFromBotReceive

'msReceive': 'msSend',
msSendFromMsReceive
afterMsSendFromMsReceive

'msSend': 'msReceive',
msReceiveFromMsSend
afterMsReceiveFromMsSend
*/
