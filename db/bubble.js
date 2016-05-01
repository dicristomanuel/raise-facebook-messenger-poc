import { Bubble } from './schema'

export default {
  create: (data) => {
    const { sender, text, userType, chat } = data;
    return new Promise((resolve, reject) => {
      Bubble.create({ sender, text, userType })
      .then((bubble) => {
        chat.addBubble(bubble);
        chat.update({active: false});
        resolve(bubble);
      })
      .catch((error) => {
        reject(error);
      })
    });
  },

  createForBot: (data) => {
    const { sender, answer, chat } = data;
    return new Promise((resolve, reject) => {
      Bubble.create({ sender, text: answer, userType: 'bot' })
      .then((bubble) => {
        chat.addBubble(bubble);
        chat.update({active: false});
        resolve(bubble);
      })
      .catch((error) => {
        reject(error);
      })
    });
  }
}
