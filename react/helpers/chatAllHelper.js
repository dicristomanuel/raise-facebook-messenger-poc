import request from 'superagent';
import Store from '../createStore';

export const GetChats = () => {
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

export const Transform = (data) => {
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

export const Compare = (a,b) => {
  if (a.updatedAt < b.updatedAt)
  return -1;
  else if (a.updatedAt > b.updatedAt)
  return 1;
  else
  return 0;
}
