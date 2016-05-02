import { transform } from './transformer';
import { createChat, findChat, saveMessage} from './db/dbstore';
import { sendMessage } from './messenger';
import { isBot, matchAnswer } from './bot';

export const init = (fromMessenger) => {
  transform(fromMessenger)
  .then((data) => {
    const { sender, text, answer, send, firstName } = data;
    toDB(data)
    .then((chat) => {
      // move into transformer
      data.firstName = chat.firstName;
    });
    // CONTINUE
  });
};

const toDB = (data) => {
  return new Promise((resolve, reject) => {
    const { sender, text, answer, send } = data;
    findChat(sender)
    .then((chat) => {
      if (!chat) {
        createChat(sender)
        .then((newChat) => {
          resolve(newChat);
        });
      }
      resolve(chat);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const botAnswer = (data) => {
    const { send, text, firstName } = data;
    if (!send && isBot(text)) {
      // move into transformer
      data.send = true;
      return matchAnswer(text, firstName);
    }
  return null;
};



// 1. format data
// 2. check if exists
// 2b. if doesn't then create otherwise find
// 3.check for bot
// 4. store
