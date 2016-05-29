import { Bubble } from './dbConfig';

export default {
  create: data => {
    const { text, userType, chat } = data;
    return Bubble.create({ text, userType, ChatId: chat.id });
  },
  findForChat: (id) => {
    return Bubble.findAll({ where: { ChatId: id }, order: '"id" ASC'});
  }
};
