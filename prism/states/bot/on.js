import { Bot, ToMemberService, Consumer, BotCard } from '../../../data/appConstants';
import Message from '../../../db/message';
import { Socket } from '../../../app/transformer';
import { GiftcardMessage } from '../../../app/structuredMessages';
import Talkback from '../../../bot/talkback';
import { SendGiftcards } from '../../../app/messenger';


const transformGiftcardMessage = (messages) => {
  const toSend = [];
  messages.attachment.payload.elements.forEach((message) => {
    const { title, image_url, subtitle } = message;
    toSend.push({ title, image_url, subtitle });
  })
  return JSON.stringify(toSend);
};

const writeToDb = (data) => {
  const { chat, answer, text, brand, value, sender, category } = data;
  let promises = [];
  let giftcardMessage = null;
  if (brand) {
    giftcardMessage = GiftcardMessage({ brand, value })
    SendGiftcards(sender, giftcardMessage)
  } else if (category) {
    giftcardMessage = GiftcardMessage({ category, value })
    SendGiftcards(sender, giftcardMessage)
  }
  if (giftcardMessage)
    promises.push(
      Message.create({ chatId: chat.id, text, userType: Consumer }),
      Message.create({ chatId: chat.id, text: answer, userType: Bot }),
      Message.create({ chatId: chat.id, text: transformGiftcardMessage(giftcardMessage), userType: BotCard })
    );
  else if (answer)
    promises.push(
      Message.create({ chatId: chat.id, text, userType: Consumer }),
      Message.create({ chatId: chat.id, text: answer, userType: Bot })
    );
  else
    promises.push(
      Message.create({ chatId: chat.id, text, userType: Consumer })
    );

  return Promise.all(promises);
}

const handleBotMessage = (data) => {
  const { answer } = data;
  if (answer.includes(ToMemberService))
    return { ...data, state: 'ms' }
  else
    return writeToDb(data)
    .then((toSocket) => {
      return { ...data, toSocket };
    })
};

const prepareBotMessage = (data) => {
  const { text } = data;
  const toDb = Talkback.saying(text);
  return handleBotMessage({...toDb, ...data});
};

export const OnBot = (data) => {
  const { io, chat } = data;
  io.emit('chat_update', Socket.updateChat({ state: 'bot' }, chat));
  return prepareBotMessage(data);
};
