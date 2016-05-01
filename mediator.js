import { formatMessage } from './transformer';
import { isBot, matchAnswer } from './bot';
import { saveMessage, saveProfile } from './db/dbstore';
import { grabProfile, sendMessage } from './messenger';

export const init = (dataIn) => {
  formatMessage(dataIn).then((dataStore) => {
    const toDB = Object.assign(dataStore, botCheck(dataStore));
    const { sender, text, answer } = toDB;
    console.log("full data >>> ", toDB);
    saveMessage(toDB).then((isNew) => {
      if (isNew) {
        grabProfile(sender).then((profile) => {
          saveProfile(profile, sender);
        })
        .catch((error) => {
          console.log("<< ERROR >> ", error);
        });
      }
      answer ? sendMessage(sender, answer) : null
    });
  });
};

// maybe remove 'send' and just base on answer/userType

const botCheck = (data) => {
  if (!data.send && isBot(data.text)) {
    return {answer: matchAnswer(data.text)};
  }
  return {answer: null};
};
