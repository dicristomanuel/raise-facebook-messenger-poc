import States from './all';
debugger;
export default [
  { from: 'init',       to: 'botReceive' },
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
