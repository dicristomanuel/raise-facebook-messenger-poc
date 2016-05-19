import { io } from '../../server';
import { CONNECTION, INITIAL_DATA, NEW_CHAT } from './constants';
import Chat from '../../db/chat';
import { TransformSocket } from './transformer';

let hasInit = false;
// let io;


const onConnect = (socket) => {
  Chat.findAll()
  .then((data) => {
    const payload = {
      data: TransformSocket(data),
      id: socket.id,
    };
    socket.emit(INITIAL_DATA, payload);
  });
};

const initIo = () => {
  // io = require("socket.io")(listener);
};

const API = {
  // onNewChat,
  // onConnect,
  // emit,
};

const init = () => {
  if (!hasInit) {
    hasInit = true;
    initIo();
    // initBindings();
  }
  return API;
};

console.log(` >>>>>>>>>>>>>>>>> ${io}`);
// TRY MOVE THIS TO THE SERVER

export default init();
