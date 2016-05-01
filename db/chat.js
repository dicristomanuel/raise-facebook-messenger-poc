import { Chat } from './schema'

export default {
  findOrCreate: (sender) => {
    return new Promise((resolve, reject) => {
      Chat.findOrCreate({where: { sender }})
      .spread((chat, isNew) => {
        resolve({ chat, isNew });
      })
      .catch((error) => {
        reject(error);
      })
    });
  },

  find: (sender) => {
    return new Promise((resolve, reject) => {
      Chat.findOne({where: { sender }})
      .then((chat) => {
        resolve(chat);
      }).catch((error) => {
        reject(error);
      })
    });
  }
}
