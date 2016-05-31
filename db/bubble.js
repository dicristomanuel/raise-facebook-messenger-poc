import { Bubble } from './dbConfig';

export default {
  create: data => {
    const { text, userType, chatId } = data;
    return Bubble.create({ text, userType, ChatId });
  },
  findForChat: (id) => {
    return Bubble.findAll({ where: { ChatId: id }, order: '"id" ASC'});
  }
};
