import chat from './chat'
import bubble from './bubble'

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
        ])
      } else {
        bubble.create(Object.assign(data, instance))
        .then(() => {
          resolve(instance.isNew);
        })
        .catch((error) => {
          reject(error);
        })
      }



      // bubble.create(Object.assign(data, instance))
      // .then(() => {
      //   if (data.answer) {
      //     bubble.createForBot(Object.assign(data, instance))
      //     .then(() => {
      //       resolve(instance.isNew);
      //     })
      //   } else {
      //     resolve(instance.isNew);
      //   }
      // })


    });
  });
}

export const saveProfile = (profile, sender) => {
  chat.find(sender)
  .then((chat) => {
    chat.update(profile)
  })
  .catch((error) => {
    console.log("<< ERROR >> ", error);
  })
}

/*
{
text: 'hey',
sender: 935925493143785,
userType: 'consumer',
send: false,
answer: 'Hello, how can I help you today?'
}
*/
