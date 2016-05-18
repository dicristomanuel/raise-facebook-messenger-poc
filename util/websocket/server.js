import { io } from '../../server';
import { CONNECTION, INITIAL_DATA } from './constants';
import Chat from '../../db/chat';
import { TransformSocket } from './transformer';

const onConnect = (socket) => {
  Chat.findAll()
  .then((data) => {
    socket.emit(INITIAL_DATA, TransformSocket(data));
  });
};

const initBindings = () => {
  io.on(CONNECTION, onConnect);
};

export const SocketInit = () => {
  initBindings();
};
