import { Bot, ToMemberService, Consumer, BotCard } from '../../../app/appConstants';
import Message from '../../../db/message';
import { Socket } from '../../../app/transformer';
import { GiftcardMessage } from '../../../messenger/structuredMessages';
import Her from '../../../bot/her';
import { SendGiftcards } from '../../../messenger/api';

const transformGiftcardMessage = messages => {
  const toSend = [];
  messages.attachment.payload.elements.forEach((message) => {
    const { title, image_url, subtitle } = message;
    toSend.push({ title, image_url, subtitle });
  })
  return JSON.stringify(toSend);
};

const isGiftcardMessage = data => {
  const { brand, category, sender, text } = data;
  if (brand) return SendGiftcards(sender, GiftcardMessage({ brand, text }))
  .then((giftcardMessage) => {
    return giftcardMessage;
  });
  else if (category) return SendGiftcards(sender, GiftcardMessage({ category, text }))
  .then((giftcardMessage) => {
    return giftcardMessage;
  });
  else return false
};

const writeToDb = (data) => {
  const { chat, answer, text } = data;
  const giftcardMessage = isGiftcardMessage(data);
  let promises = [];

  if (giftcardMessage) giftcardMessage.then((giftcardMessage) => {
    if (giftcardMessage) {
      promises.push(
        Message.create({ chatId: chat.id, text, userType: Consumer }),
        Message.create({ chatId: chat.id, text: answer, userType: Bot }),
        Message.create({ chatId: chat.id, text: transformGiftcardMessage(giftcardMessage), userType: BotCard })
      );
    }
  });
  if (answer) {
    promises.push(
      Message.create({ chatId: chat.id, text, userType: Consumer }),
      Message.create({ chatId: chat.id, text: answer, userType: Bot })
    );
  } else {
    promises.push(Message.create({ chatId: chat.id, text, userType: Consumer }));
  }
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
  const toDb = Her.saying(text);
  return handleBotMessage({...toDb, ...data});
};


import Ava from 'ava-ia';
import { weather } from 'ava-ia/lib/intents';
import { forecastYahoo } from 'ava-ia/lib/actions';

const ava = new Ava({
  debug: true
});

ava.intent(weather, forecastYahoo)

ava.listen('Do you know if tomorrow will rain in Bangkok?')
.then(state => {
  debugger;
  console.log(state)
})
.catch(error => {
  debugger;
  console.log(state)
})



export const OnBot = (data) => {
  const { io, chat } = data;
  io.emit('chat_update', Socket.updateChat({ state: 'bot' }, chat));
  return prepareBotMessage(data);
};
