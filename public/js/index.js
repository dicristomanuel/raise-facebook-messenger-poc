import request from 'superagent';
const socket = io();

socket.on('new_connection', (data) => {
  console.log('IN NEW CONNECTION');
  console.log(data);
});

socket.on('new_chat', (data) => {
  console.log('IN NEW CHAT', data);
});

socket.on('new_message', (data) => {
  console.log('IN NEW MESSAGE');
  console.log(data);
});

request.get('http://localhost:3001/getChats')
.withCredentials()
.end((err, res) => {
  console.log(res.body);
});
