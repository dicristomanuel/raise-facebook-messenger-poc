// import request from 'superagent';
// import store from '../../react/createStore';
//
// const socket = io();
//
// socket.on('new_connection', (data) => {
//   console.log('IN NEW CONNECTION');
//   console.log(data);
// });
//
// socket.on('new_chat', (data) => {
//   console.log('IN NEW CHAT');
//   console.log(data);
// });
//
// socket.on('new_message', (data) => {
//   console.log('IN NEW MESSAGE');
//   console.log(data);
//   console.log(`CHECK THE STORE ${store.getState()}`);
// });
//
// socket.on('chat_update', (data) => {
//   console.log('IN CHAT UPDATE');
//   console.log(data);
// });
//
// request.get('http://localhost:3001/get-chats')
// .end((err, res) => {
//   console.log(res.body);
// });
