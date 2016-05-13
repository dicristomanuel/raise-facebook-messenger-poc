const socket = io();

socket.on('activeChats', function(data) {
  console.log('activeChats', data);
});

socket.on('newChat', (data) => {
  console.log('NEW CHAT!', data);
});
