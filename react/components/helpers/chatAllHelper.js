import request from 'superagent';
import Store from '../../createStore';
import { UpdateStatus, AddChat, AddChats } from '../../actions';


const socket = io();

const getChats = () => {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:3001/get-chats')
    .end((err, res) => {
      if (err)
      reject(err);
      else
      resolve(res.body);
    });
  });
};

const transform = (data) => {
  let chats = [];
  data.forEach((chat) => {
    const { id, firstName, lastName, profilePic, state, active, busy, solved, engaged, updatedAt } = chat;
    chats.push({
      chatId: id,
      name: `${firstName} ${lastName}`,
      profilePic,
      state,
      active,
      busy,
      solved,
      engaged,
      updatedAt,
    });
  });
  return chats;
};

export const Compare = (a,b) => {
  if (a.updatedAt < b.updatedAt)
    return -1;
  else if (a.updatedAt > b.updatedAt)
    return 1;
  else
    return 0;
}

export const InitChatsAndSockets = () => {
  socket.on('chat_update', (data) => {
    Store.dispatch(UpdateStatus(data));
  });

  socket.on('new_chat', (chat) => {
    Store.dispatch(AddChat(transform([chat])));
  });

  return getChats()
  .then((chats) => {
    Store.dispatch(AddChats(transform(chats)));
  })
  .catch((err) => {console.log(err)});
};
