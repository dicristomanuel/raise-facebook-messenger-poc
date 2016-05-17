import { io } from '../../server';
import constant from './constants';

const onConnect = (socket) => {
  const initialData = {
    chatId: 123,
    name: 'Manuel Di Cristo',
    profilePic: 'profilePic.png',
    status: 'active',
  };
  socket.emit(constant.INITIAL_DATA, initialData);
};

const initBindings = () => {
  io.on(constant.CONNECTION, onConnect);
};

export const SocketInit = () => {
  initBindings();
};
