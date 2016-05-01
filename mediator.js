import { formatMessage } from './transformer';
import { isBot, matchAnswer } from './bot';
import { saveMessage, saveProfile } from './db/dbstore';
import { getProfile, sendMessage } from './messenger';

export const init = (dataIn) => {
  console.log("in INIT");
  formatMessage(dataIn).then((dataProcessed) => {
    const toDB = Object.assign(dataProcessed, botCheck(dataProcessed));
    const { sender, text, answer, send } = toDB;
    saveMessage(toDB).then((isNew) => {
      if (isNew) {
        getProfile(sender).then((profile) => {
          saveProfile(profile, sender);
        })
        .catch((error) => {
          console.log("<< ERROR >> ", error);
        });
      }
      console.log(toDB);
      send ? sendMessage(sender, answer) : null
    });
  });
};

const botCheck = (data) => {
  if (!data.send && isBot(data.text)) {
    data.send = true;
    return {answer: matchAnswer(data.text)};
  }
  return {answer: null};
};
