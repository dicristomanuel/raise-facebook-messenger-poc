import { formatMessage } from './transformer'
import { isBot, matchAnswer } from './bot'
import { saveData, saveProfile } from './db/dbstore'
import { grabProfile } from './messenger'

export const init = (dataIn) => {
  formatMessage(dataIn).then((dataStore) => {
    const toDB = Object.assign(dataStore, botCheck(dataStore));
    const sender = toDB.sender;
    saveData(toDB).then((isNew) => {
      if (isNew) {
        grabProfile(sender).then((profile) => {
          saveProfile(profile, sender)
        })
        .catch((error) => {
          console.log("<< ERROR >> ", error);
        });
      }
      // profileData ? writeProfile() : null
    })
  });

  // store user text to DB ?
  // store bot text to DB ?
  // dataOut
}

const botCheck = (data) => {
  if (!data.send && isBot(data.text)) {
    return {answer: matchAnswer(data.text)};
  }
  return {answer: null}
}
