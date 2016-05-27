import { Bot } from '../../data/appConstants';
import { MatchAnswer } from '../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../messenger';
import Bubble from '../../db/bubble';

const handleBotMessage = (data) => {
  const { sender, toDb, brand, chat } = data;
  SendMessage(sender, toDb.text);
  brand ? SendGiftcards(sender, brand) : null;
  return Bubble.create({chat, ...toDb})
  return data;
};

const prepareBotMessage = (data) => {
  const { text, chat } = data;
  const fromBot = MatchAnswer(text, chat.firstName);
  const { answer, brand } = fromBot;
  const toDb = {
    text: answer,
    userType: Bot,
    chat
  };
  return handleBotMessage({toDb, ...data, brand});
};

export const BotFromInit = (data) => {
  const { chat, text, userType } = data;
  Bubble.create({chat, text, userType})
  .then(() => {
    return prepareBotMessage(data);
  });
};
