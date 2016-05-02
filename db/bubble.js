import { Bubble } from './dbConfig';

export default {
  create: (data) => {
    const { sender, text, userType, chat } = data;
    Bubble.create({ sender, text, userType })
    .then(chat.addBubble)
    .then(() => {
      chat.update({active: true});
    });
  },

  createForBot: (data) => {
    const { sender, answer, chat } = data;
    Bubble.create({ sender, text: answer, userType: 'bot' })
    .then(chat.addBubble)
    .then(() => {
      chat.update({active: false});
    });
  }
};


// THIS REFACTOR HAS YET TO BE TESTED
