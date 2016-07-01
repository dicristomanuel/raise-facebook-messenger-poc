import Message from '../../../db/message';
import { Bot, Consumer } from '../../../app/appConstants';

const writeToDb = (data) => {
  const { chat, text, userType, answer } = data;
  let promises = [];
  if (answer)
  promises.push(
    Message.create({ chatId: chat.id, text, userType: Consumer }),
    Message.create({ chatId: chat.id, text: answer, userType: Bot })
  );
  else
  promises.push(
    Message.create({ chatId: chat.id, text, userType })
  );
  return Promise.all(promises);
}

export const OnMs = (data) => {
  return writeToDb(data)
  .then((toSocket) => {
    return { ...data, toSocket };
  })
};
