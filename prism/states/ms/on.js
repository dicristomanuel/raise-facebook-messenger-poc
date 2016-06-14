import Bubble from '../../../db/bubble';
import { Bot, Consumer } from '../../../data/appConstants';


const writeToDb = (data) => {
  const { chat, text, userType, answer } = data;
  let promises = [];
  if (answer)
  promises.push(
    Bubble.create({ chatId: chat.id, text, userType: Consumer }),
    Bubble.create({ chatId: chat.id, text: answer, userType: Bot })
  );
  else
  promises.push(
    Bubble.create({ chatId: chat.id, text, userType })
  );
  return Promise.all(promises);
}

export const OnMs = (data) => {
  return writeToDb(data)
  .then((toSocket) => {
    return { ...data, toSocket };
  })
};
