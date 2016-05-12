import { io } from '../server.js';

export default (io) => {

  let counter = 0;

  io.on('connection', function(socket){
    socket.emit('welcome', { message: 'Welcome!', id: socket.id, counter: counter });

    socket.on('clicked', onClicked);
    socket.on('disconnect', onDisconnect);

    function onClicked() {
      console.log('onClicked');
      counter++;
      io.sockets.emit('update', { counter: counter });
    }

    function onDisconnect() {
      console.log('onDisconnect', arguments);
    }
  });

};
