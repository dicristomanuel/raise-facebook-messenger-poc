// import test from 'tape';
// import { Init } from './app/mediator';
// import Chat from './db/chat';
//
// test('should eq to true', (t) => {
//   const listener = {"domain":null,"_events":{"clientError":[null,null]},"_eventsCount":6,"_connections":0,"_handle":null,"_usingSlaves":false,"_slaves":[],"_unref":false,"allowHalfOpen":true,"pauseOnConnect":false,"httpAllowHalfOpen":false,"timeout":120000,"_pendingResponseData":0};
//   const io = require('socket.io')(listener);
//   const dataIn = { text: 'hi', sender: '935925493143785', userType: 'consumer' };
//   const actual = Init(io, dataIn);
//   const chat = Chat.find('935925493143785');
//   t.equal(chat, true);
//   t.end();
// });
//
// TODO: How to test?
