import { Message } from './dbConfig';

export default {
  create: data => {
    const { chatId, text, userType } = data;
    return Message.create({ ChatId: chatId, text, userType });
  },
  findForChat: (id, page) => {
    const limit = 25 * page;
    return Message.findAll({ where: { ChatId: id }, order: '"id" DESC', limit });
  },
};
