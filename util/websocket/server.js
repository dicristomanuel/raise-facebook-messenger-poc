import { io } from '../../server';
import constant from './constants';
import Chat from '../../db/chat';
import { TransformSocket } from './transformer';

const onConnect = (socket) => {
  Chat.findAll()
  .then((data) => {
    socket.emit(constant.INITIAL_DATA, TransformSocket(data));
  });
};

const initBindings = () => {
  io.on(constant.CONNECTION, onConnect);
};

export const SocketInit = () => {
  initBindings();
};
