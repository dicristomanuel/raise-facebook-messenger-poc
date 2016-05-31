import { Bot, ToMemberService } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import { SendMessage, SendGiftcards } from '../../messenger';
import Bubble from '../../../db/bubble';
import Chat from '../../../db/chat';


const switch = (newState, data) => {
  Chat.update(data.chat, { state: 'msReceive' })
  .then((chat) {
    Prism.switch(newState, { ...data, currentState: 'msReceive', chat });
  });
};

const handleBotMessage = (data) => {
  const { sender, toDb, brand, chat } = data;
  SendMessage(sender, toDb.text);
  brand ? SendGiftcards(sender, brand) : null;
  Bubble.create({chat, ...toDb});
  toDb.text.includes(ToMemberService) ? switch('msReceive', data) : null;
  return data;
};

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

const BotReceive = (data) => {
  return prepareBotMessage(data);
};

export default BotReceive;
