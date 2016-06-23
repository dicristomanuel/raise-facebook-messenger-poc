import request from 'superagent';
import Store from '../createStore';
import { AddMessage, AddMessages, HandleEngage } from '../actions';

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

export const SetEngageForChat = (chatId, current) => {
  Store.dispatch(HandleEngage(chatId, current));
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
