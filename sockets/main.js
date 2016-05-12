import { io } from '../server.js';
import Chat from '../db/chat';
import { transform } from './transformer';

export default (io) => {

  io.on('connection', function(socket){

    Chat.findActive()
    .then((data) => {
      const chats = transform(data);

      socket.emit('activeChats', chats);
    });
  });

};
