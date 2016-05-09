import { Chat } from './dbConfig';

export default {
  create: data => {
    return Chat.create(data);
  },

  find: sender => {
    return Chat.findOne({where: { sender }});
  },

  update: (chat, keyValue) => {
    return chat.update(keyValue);
  }
};
