import request from 'superagent';
import Store from '../createStore';
import { New_message, New_notification } from '../../data/socketConstants';
import { AddMessage, AddMessages, SetMessagesVisibilityFilter, AddEngagedChat,
         RemoveEngagedChat, AddActive, AddFlashMessage } from '../actions';

const socket = io();

const getMessages = (id, page) => {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:3001/get-messages?id=${id}&page=${page}`)
    .end((err, res) => {
      if (err)
      reject(err);
      else
      resolve(res.body);
    });
  });
};

export const SendMessage = (data) => {
  const { chatId, text } = data;
  request.post(`http://localhost:3001/member-service`)
  .send({ chatId, text })
  .end((err, res) => {
    if (err)
    console.log(err);
  });
}

const getImageLink = (chatId) => {
  return Store.getState().chats.filter(chat => chat.chatId == chatId)[0].profilePic;
}

const handleEngage = (chatId, current) => {
  if (current == 'none') {
    Store.dispatch(AddEngagedChat(chatId))
    Store.dispatch(AddFlashMessage('Chat Engaged'))
    socket.on(`${New_notification}${chatId}`, (message) => {
      if (Store.getState().messagesVisibilityFilter != message.chatId)
      Store.dispatch(AddActive({chatId: message.chatId, image: getImageLink(chatId)}));
    });
  } else {
    Store.dispatch(RemoveEngagedChat(chatId))
    Store.dispatch(AddFlashMessage('Chat Disengaged'))
    socket.off(`${New_notification}${chatId}`);
  }
}

export const SetEngageForChat = (chatId, current) => {
  handleEngage(chatId, current);
  let value = '';
  if (current == 'none') {
    value = Store.getState().notifications.memberService.hash;
  }
  else
  value = 'none';
  request.put('http://localhost:3001/update-chat')
  .send({ chatId, key: 'engaged', value })
  .end((err, res) => {
    if (err)
    console.log(err);
  });
};

export const Compare = (a,b) => {
  if (a.id < b.id)
  return -1;
  else if (a.id > b.id)
  return 1;
  else
  return 0;
}

export const LoadMessages = (id, page) => {
  return new Promise((resolve, reject) => {
    getMessages(id, page)
    .then((messages) => {
      Store.dispatch(AddMessages(messages));
      resolve('success');
    })
    .catch((error) => {reject(error)});
  })
};

export const InitMessagesAndSockets = (id, page = 1) => {
  const chatId = parseInt(id);
  return LoadMessages(chatId, page);
};
