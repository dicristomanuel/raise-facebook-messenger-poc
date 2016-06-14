import { Bot, ToMemberService, Consumer } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import Bubble from '../../../db/bubble';

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
    Bubble.create({ chatId: chat.id, text, userType: Consumer })
  );
  return Promise.all(promises);
}

const handleBotMessage = (data) => {
  const { sender, chat, text, userType, answer } = data;
  if (answer.includes(ToMemberService)) {
  return { ...data, state: 'ms' }
}
  else
  return writeToDb(data)
  .then((toSocket) => {
    return { ...data, toSocket };
  })
};

const prepareBotMessage = (data) => {
  const { chat, text } = data;
  const toDb = MatchAnswer(chat, text);
  return handleBotMessage({...toDb, ...data});
};

// exports ====>

export const OnBot = (data) => {
  return prepareBotMessage(data);
};
