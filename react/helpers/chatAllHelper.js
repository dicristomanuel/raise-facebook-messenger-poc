import request from 'superagent';
import Store from '../createStore';
import { New_notification } from '../../data/socketConstants';
import { UpdateStatus, AddChat, AddChats, AddMemberService, AddEngagedChat, AddActive, InitNotifications } from '../actions';
const socket = io();

export const GetChats = () => {
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

export const Transform = (data) => {
  let chats = [];
  data.forEach((chat) => {
    const { id, firstName, lastName, profilePic, state, active, solved, engaged, updatedAt } = chat;
    chats.push({
      chatId: id,
      name: `${firstName} ${lastName}`,
      profilePic,
      state,
      active,
      solved,
      engaged,
      updatedAt,
    });
  });
  return chats;
};
//TODO: move transformer to app transformer

export const Compare = (a,b) => {
  if (a.updatedAt < b.updatedAt)
  return -1;
  else if (a.updatedAt > b.updatedAt)
  return 1;
  else
  return 0;
}

export const InitChatsAndSockets = () => {
  return new Promise((resolve, reject) => {
    socket.on('chat_update', (data) => {
      Store.dispatch(UpdateStatus(data));
    });
    socket.on('new_chat', (chat) => {
      Store.dispatch(AddChat(transform([chat])));
    });
    GetChats()
    .then((data) => {
      if (Object.keys(data.msAuth).length > 1)
      Store.dispatch(AddMemberService(data.msAuth))
      Store.dispatch(InitNotifications(data.engagedChats));
      Store.dispatch(AddChats(Transform(data.allChats)));
      resolve('success');
    })
    .catch((err) => {reject(err)});
  })
};
