import chat from './chat'
import bubble from './bubble'

export const saveData = (data) => {
  return new Promise((resolve, reject) => {
    chat.findOrCreate(data.sender).then((result) => {
      resolve(result.isNew)
    });
  });
}

export const saveProfile = (profile, sender) => {
  chat.find(sender)
  .then((chat) => {
    chat.update(profile)
  })
}

const toCamelCase = (object) => {
  
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
