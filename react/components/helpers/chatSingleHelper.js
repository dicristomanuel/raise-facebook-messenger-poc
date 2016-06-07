import request from 'superagent';
import Store from '../../createStore';
import { AddMessage } from '../../actions';

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

export const InitMessagesAndSockets = (id) => {
  socket.on(`new_message${id}`, (data) => {
    Store.dispatch(AddMessage(data));
  });

  return getMessages(id)
  .then((messages) => {
    messages.forEach((message) => {
      Store.dispatch(AddMessage(message));
    });
  })
  .catch((err) => {console.log(err)});
};
