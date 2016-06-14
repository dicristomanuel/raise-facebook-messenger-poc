import request from 'superagent';
import Store from '../../createStore';
import { AddMessage, AddMessages, SetMessagesVisibilityFilter } from '../../actions';
import { New_message } from '../../../data/socketConstants';

const socket = io();

const getMessages = (id, page) => {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:3001/get-messages?id=${id}&page=${page}`)
    .end((err, res) => {
      if (err)
      reject(err);
      else {
      resolve(res.body);
    }
    });
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

export const loadMessages = (id, page) => {
  return new Promise((resolve, reject) => {
    getMessages(id, page)
    .then((messages) => {
      console.log(messages);
      Store.dispatch(AddMessages(messages));
      resolve('success');
    })
    .catch((error) => {reject(error)});
  })
};

export const InitMessagesAndSockets = (id, page = 1) => {
  Store.dispatch(SetMessagesVisibilityFilter(id));

  socket.on(`${New_message}${id}`, (message) => {
    Store.dispatch(AddMessage(message));
  });

  return loadMessages(id, page);
};
