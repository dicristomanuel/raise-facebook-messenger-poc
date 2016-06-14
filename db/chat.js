import { Chat } from './dbConfig';

export default {
  create: data => {
    return Chat.create(data);
  },

  find: sender => {
    return Chat.findOne({where: { sender }});
  },

  findById: id => {
    return Chat.findById(id);
  },

  findAll: () => {
    return Chat.findAll({order: '"updatedAt" ASC', limit: 25});
  },

  update: (chat, keyValue) => {
    return chat.update(keyValue);
  },
};
