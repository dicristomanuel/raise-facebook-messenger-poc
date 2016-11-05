import request from 'superagent';
import Store from '../createStore';
import { HandleEngage } from '../actions';

export const GetMessages = (id, page) => {
  return new Promise((resolve, reject) => {
    request.get(`https://4fd63ce9.ngrok.io/get-messages?id=${id}&page=${page}`)
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
  request.post(`https://4fd63ce9.ngrok.io/member-service`)
  .send({ chatId, text })
  .end((err, res) => {
    if (err)
    console.log(err);
  });
}

export const SetEngageForChat = (chatId, current) => {
  Store.dispatch(HandleEngage(chatId, current));
  let value = '';
  if (current == 'none')
  value = Store.getState().notifications.memberService.hash;
  else
  value = 'none';
  request.put('https://4fd63ce9.ngrok.io/update-chat')
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
