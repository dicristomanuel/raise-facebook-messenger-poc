import { io } from '../server.js';
import Chat from '../db/chat';
import { TransformSocket } from './transformer';
import store from '../react/createStore';
import { AddChat, ChatStatuses } from '../react/actions';

export const SocketInit = () => {
  io.on('connection', socket => {
    Chat.findActive()
    .then(data => {
      if (data.length !== 0) {
        // const chats = TransformSocket(data);
        store.dispatch(AddChat({
          chatId: 1234,
          name: 'Foo Bar',
          profilePic: 'foobar.png',
          status: ChatStatuses.ACTIVE,
        }));
      }
    });
  });
};
