import chat from './chat';
import bubble from './bubble';

export const saveMessage = (data) => {
  return new Promise((resolve, reject) => {
    chat.findOrCreate(data.sender)
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

export const saveProfile = (profile, sender) => {
  return new Promise((resolve, reject) => {
    chat.find(sender)
    .then((chat) => {
      chat.update(profile);
      resolve(200);
    })
    .catch((error) => {
      console.log("<< ERROR >> ", error);
      reject(error);
    });
  });
};
