import request from 'superagent';
import Store from '../../createStore';
import { AddMessage, AddMessages } from '../../actions';

const socket = io();

const getMessages = (id) => {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:3001/get-messages/${id}`)
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
    const { id, ChatId, userType, text, updatedAt } = message;
    messages.push({
      id,
      text,
      userType,
      chatId: ChatId,
      updatedAt,
    });
  });
  return messages;
};

export const InitMessagesAndSockets = (id) => {
  socket.on(`new_message${id}`, (message) => {
    Store.dispatch(AddMessage(transform([message])));
  });

  return getMessages(id)
  .then((messages) => {
    Store.dispatch(AddMessages(transform(messages)));
  })
  .catch((err) => {console.log(err)});
};
