import request from 'superagent';
import Store from '../createStore';
import { New_notification } from '../../data/socketConstants';
import { UpdateStatus, AddChat, AddChats, AddMemberService, AddEngagedChat, AddActive } from '../actions';
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

const getImageLink = (chatId) => {
  return Store.getState().chats.filter(chat => chat.chatId == chatId)[0].profilePic;
}


const initNotifications = (chats) => {
  chats.forEach(chat => {
    const chatId = chat.id;
    Store.dispatch(AddEngagedChat(chatId))
    socket.on(`${New_notification}${chatId}`, (message) => {
      if (Store.getState().messagesVisibilityFilter != message.chatId)
      Store.dispatch(AddActive({chatId: message.chatId, image: getImageLink(chatId)}));
    });
  })
}

export const InitChatsAndSockets = () => {
  return new Promise((resolve, reject) => {
    socket.on('chat_update', (data) => {
      Store.dispatch(UpdateStatus(data));
    });
    socket.on('new_chat', (chat) => {
      Store.dispatch(AddChat(transform([chat])));
    });
    getChats()
    .then((data) => {
      if (Object.keys(data.msAuth).length > 1)
      Store.dispatch(AddMemberService(data.msAuth))
      initNotifications(data.chats[1]);
      Store.dispatch(AddChats(transform(data.chats[0])));
      resolve('success');
    })
    .catch((err) => {reject(err)});
  })
};
