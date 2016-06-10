import { Bubble } from './dbConfig';

export default {
  create: data => {
    data.forEach((message) => {
      const { chatId, text, userType } = message;
      return Bubble.create({ ChatId: chatId, text, userType });
    })
  },
  findForChat: (id) => {
    return Bubble.findAll({ where: { ChatId: id }, order: '"id" ASC', limit: 25});
  }
};
