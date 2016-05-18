import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('new_chat', (data) => {

});
