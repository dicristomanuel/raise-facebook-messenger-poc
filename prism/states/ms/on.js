import Bubble from '../../../db/bubble';
import { Bot } from '../../../data/appConstants';

const writeToDb = (data) => {
  const { chat, text, userType, answer } = data;
  return Bubble.create({ chatId: chat.id, text, userType })
}

export const OnMs = (data) => {
  // const { io, chat, text, userType, answer } = data;
  // if (answer) {
  //   Bubble.create([
  //     { chatId: chat.id, text, userType },
  //     { chatId: chat.id, text: answer, userType: Bot }
  //   ]);
  // }
  // else {
  //   Bubble.create({ chatId: chat.id, text, userType })
  //   .then((message) => {
  //     debugger;
  //   });
  // }
  return writeToDb(data)
  .then((toSocket) => {
    return { ...data, toSocket };
  })
};
// toSocket to array?
