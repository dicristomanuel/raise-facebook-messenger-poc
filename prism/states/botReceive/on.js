import { Bot, ToMemberService } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../../../app/messenger';
import Bubble from '../../../db/bubble';

const handleBotMessage = (data) => {
  const { sender, toDb, brand, chat } = data;
  SendMessage(sender, toDb.text);
  brand ? SendGiftcards(sender, brand) : null;
  Bubble.create({chat, ...toDb});
  const next = toDb.text.includes(ToMemberService) ? true : false;
  return {...data, next};
};
// alternative to promise ^^

const prepareBotMessage = (data) => {
  const { chat, text, userType } = data;
  Bubble.create({chat, text, userType});

  const fromBot = MatchAnswer(text, chat.firstName);
  const { answer, brand } = fromBot;
  const toDb = {
    text: answer,
    userType: Bot,
    chat,
  };
  return handleBotMessage({toDb, ...data, brand});
};

export const OnBotReceive = (data) => {
  return new Promise((resolve, reject) => {
    resolve(prepareBotMessage(data));
  });
};
