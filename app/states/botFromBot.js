import { Bot, ToMemberService } from '../../data/appConstants';
import { MatchAnswer } from '../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../messenger';
import Bubble from '../../db/bubble';
import { CallNextState } from '../stateMachine';

const handleBotMessage = (data) => {
  const { sender, toDb, brand, chat } = data;
  SendMessage(sender, toDb.text);
  brand ? SendGiftcards(sender, brand) : null;
  const switchState = toDb.text.includes(ToMemberService) ? true : false;
  Bubble.create({chat, ...toDb});
  return new Promise((resolve, reject) => {
    resolve({...data, switchState});
  });
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

export const BotFromBot = (data) => {
  // layer with function to execute - data to send back (with switchState)
  return prepareBotMessage(data)
  .then(CallNextState);
};
