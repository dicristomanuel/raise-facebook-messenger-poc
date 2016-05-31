import { Bot, ToMemberService } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../../../app/messenger';
import Bubble from '../../../db/bubble';
import Prism from '../../prism';

const handleBotMessage = (toDb, data) => {
  const { sender, chat } = data;
  const { text, brand } = toDb;
  SendMessage(sender, text);
  brand ? SendGiftcards(sender, brand) : null;
  Bubble.create({chat, ...toDb});
  return text.includes(ToMemberService) ? {...data, state: 'msReceive'} : data;
};

const prepareBotMessage = (data) => {
  const { chat, text, userType } = data;
  Bubble.create({chatId: chat.id, text, userType});

  const toDb = MatchAnswer(text, chat);
  return handleBotMessage(toDb, data);
};

export const OnBot = (data) => {
  return prepareBotMessage(data);
};
