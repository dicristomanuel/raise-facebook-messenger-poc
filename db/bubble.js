import { Bubble } from './dbConfig';

export default {
  create: data => {
    const { chatId, text, userType } = data;
    return Bubble.create({ ChatId: chatId, text, userType });
  },
  findForChat: (id, page) => {
    const limit = 25 * page;
    return Bubble.findAll({ where: { ChatId: id }, order: '"id" DESC', limit });
  },
};
