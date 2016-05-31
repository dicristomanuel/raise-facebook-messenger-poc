import { Bubble } from './dbConfig';

export default {
  create: data => {
    debugger;
    const { chatId, text, userType } = data;
    return Bubble.create({ ChatId: chatId, text, userType });
  },
  findForChat: (id) => {
    return Bubble.findAll({ where: { ChatId: id }, order: '"id" ASC'});
  }
};
