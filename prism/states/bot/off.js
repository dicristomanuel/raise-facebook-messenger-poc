import { New_message, New_chat } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import Store from '../../../react/createStore';
import { UpdateStatus, AddChat, AddMessage } from '../../../react/actions';

export const OffBot = (data) => {
  const { io, chat } = data;
  // io.emit(New_chat, Socket.message(data));
  // new message
  return data;
  // sends to messenger
}

// SHOULD TAKE CARE OF REDUX STORE TOO ?
// ADD PRISM FUNCTION TO HANDLE REDUX STORE ?
// NEW CHAT AND NEW MESSAGE


// io.emit(`${New_message}${chat.id}`, Socket.message(data));
