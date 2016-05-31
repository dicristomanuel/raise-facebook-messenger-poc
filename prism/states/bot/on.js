import { Bot, ToMemberService, Consumer } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../../../app/messenger';
import Bubble from '../../../db/bubble';

const handleBotMessage = (toDb, data) => {
  const { sender, chat } = data;
  const { text, userType, brand } = toDb;
  SendMessage(sender, text);
  brand ? SendGiftcards(sender, brand) : null;
  Bubble.create({ chatId: chat.id, text, userType });
  return text.includes(ToMemberService) ? { ...data, state: 'msReceive'} : data;
};

const prepareBotMessage = (data) => {
  const { chat, text } = data;
  const toDb = MatchAnswer(chat, text);
  return handleBotMessage(toDb, data);
};

export const OnBot = (data) => {
  const { chat, text } = data;
  Bubble.create({chatId: chat.id, text, userType: Consumer});
  return prepareBotMessage(data);
};
