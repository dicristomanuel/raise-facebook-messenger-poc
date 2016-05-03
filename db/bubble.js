import { Bubble } from './dbConfig';

export default {
  create: (data) => {
    const { text, userType, chat, active } = data;
    return Bubble.create({ text, userType, ChatId: chat.id })
    .then(() => {
      chat.update({ active });
    });
  }
};
