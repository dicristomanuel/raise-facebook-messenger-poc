import { Bot, ToMemberService, Consumer } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../../../app/messenger';
import Bubble from '../../../db/bubble';

const handleBotMessage = (toDb, data) => {
  const { sender, chat, text, userType } = data;
  const { answer, brand } = toDb;
  SendMessage(sender, answer);
  brand ? SendGiftcards(sender, brand) : null;
  if (answer.includes(ToMemberService))
  return { ...data, state: 'msReceive', answer }
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
  return handleBotMessage(toDb, data);
};

export const OnBot = (data) => {
  return prepareBotMessage(data);
};
