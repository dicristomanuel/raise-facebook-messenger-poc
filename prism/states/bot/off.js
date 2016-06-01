import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import Store from '../../../react/createStore';
import { UpdateStatus, AddChat, AddMessage } from '../../../react/actions';

export const OffBot = (data) => {
  const { io, chat } = data;
  Store.dispatch(AddChat(chat));
  return data;
}

// SHOULD TAKE CARE OF REDUX STORE TOO ?
// ADD PRISM FUNCTION TO HANDLE REDUX STORE ?
// NEW CHAT AND NEW MESSAGE


// io.emit(`${New_message}${chat.id}`, Socket.message(data));
