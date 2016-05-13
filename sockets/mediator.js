import { io } from '../server.js';
import Chat from '../db/chat';
import { TransformSocket } from './transformer';

export const SocketInit = () => {
  io.on('connection', socket => {
    Chat.findActive()
    .then(data => {
      const chats = TransformSocket(data);
      socket.emit('activeChats', chats);
    });
  });
};
