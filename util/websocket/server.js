import { io } from '../../server';
import constant from './constants';

const onConnect = (socket) => {
  // ... do some stuff
  // ... get initial data

  socket.emit(constant.INITIAL_DATA, initialData);
};

const initBindings() {
  io.on(constant.CONNECTION, onConnect);
};

export const init = () => {
  initBindings();
};
