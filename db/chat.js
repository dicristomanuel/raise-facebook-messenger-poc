import { Chat } from './dbConfig';

export default {
  create: data => {
    return Chat.create(data);
  },

  find: sender => {
    return Chat.findOne({where: { sender }});
  },

  findById: id => {
    return Chat.findOne({where: { id }});
  },

  findAll: () => {
    return Chat.findAll();
  },

  findActive: () => {
    return Chat.findAll({ where: { active: true }});
  },

  update: (chat, keyValue) => {
    return chat.update(keyValue);
  },
};
