import { Bot, ToMemberService } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import Bubble from '../../../db/bubble';

const handleBotMessage = (data) => {
  const { sender, chat, text, userType, answer } = data;
  if (answer.includes(ToMemberService))
  return { ...data, state: 'ms' }
  else
  Bubble.create([
    { chatId: chat.id, text, userType },
    { chatId: chat.id, text: answer, userType: Bot }
  ]);
  return data;
};

const prepareBotMessage = (data) => {
  const { chat, text } = data;
  const toDb = MatchAnswer(chat, text);
  return handleBotMessage({...toDb, ...data});
};

export const OnBot = (data) => {
  return prepareBotMessage(data);
};
