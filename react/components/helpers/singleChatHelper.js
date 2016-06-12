import request from 'superagent';
import Store from '../../createStore';
import { AddMessage, AddMessages } from '../../actions';

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

const transform = (data) => {
  let messages = [];
  data.forEach((message) => {
    const { id, ChatId, userType, text, createdAt } = message;
    messages.push({
      id,
      text,
      userType,
      chatId: ChatId,
      createdAt: `${createdAt.substring(0, 10)} ${createdAt.substring(11, 16)}`,
    });
  });
  return messages;
};
// TODO: fix date (adding extra 5 hrs)

export const Compare = (a,b) => {
  if (a.id < b.id)
    return -1;
  else if (a.id > b.id)
    return 1;
  else
    return 0;
}

export const loadMessages = (id, page) => {
  return getMessages(id, page)
  .then((messages) => {
    Store.dispatch(AddMessages(transform(messages)));
  })
  .catch((err) => {console.log(err)});
};

export const InitMessagesAndSockets = (id, page = 1) => {
  socket.on(`new_message${id}`, (message) => {
    Store.dispatch(AddMessage(transform([message])));
  });

  return loadMessages(id, page);
};
