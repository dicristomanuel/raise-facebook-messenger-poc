import chat from './chat';
import bubble from './bubble';

export const findChat = (sender) => {
  return new Promise((resolve, reject) => {
    chat.find(sender)
    .then((instance) => {
      resolve(instance);
    });
  });
};

export const createChat = (sender) => {
  return new Promise((resolve, reject) => {
    chat.create(sender)
    .then((chat) => {
      resolve(chat);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export const saveMessage = (data) => {
  return new Promise((resolve, reject) => {
    chat.findOne(data.sender)
    .then((instance) => {
      if (data.answer) {
        Promise.all([
          bubble.create(Object.assign(data, instance)),
          bubble.createForBot(Object.assign(data, instance))
          .then(() => {
            resolve(instance.isNew);
          })
          .catch((error) => {
            reject(error);
          })
        ]);
      } else {
        bubble.create(Object.assign(data, instance))
        .then(() => {
          resolve(instance.isNew);
        })
        .catch((error) => {
          reject(error);
        });
      }
    });
  });
};
