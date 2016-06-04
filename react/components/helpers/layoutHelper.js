import request from 'superagent';
import Store from '../../createStore';
import { AddChat } from '../../actions';

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

export const LayoutInit = () => {
  return getChats()
  .then((chats) => {
    chats.forEach((chat) => {
      Store.dispatch(AddChat(chat));
    });
  })
  .catch((err) => {console.log(err)});
};

// TODO: better error handling
