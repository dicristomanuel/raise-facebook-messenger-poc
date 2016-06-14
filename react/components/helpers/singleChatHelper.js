import request from 'superagent';
import Store from '../../createStore';
import { AddMessage, AddMessages, SetMessagesVisibilityFilter } from '../../actions';

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
      Store.dispatch(AddMessages(messages));
      resolve('success');
    })
    .catch((error) => {reject(error)});
  })
};

export const InitMessagesAndSockets = (id, page = 1) => {
  Store.dispatch(SetMessagesVisibilityFilter(id));

  socket.on(`new_message${id}`, (message) => {
    console.log('in socket, ', message);
    Store.dispatch(AddMessage(message));
  });

  return loadMessages(id, page);
};
