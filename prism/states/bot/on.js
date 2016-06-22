import { Bot, ToMemberService, Consumer } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import Message from '../../../db/message';
import { Socket } from '../../../app/transformer';
import { GiftcardMessage } from '../../../app/structuredMessages';

const transformGiftcardMessage = (messages) => {
  const toSend = [];
  messages.attachment.payload.elements.forEach((message) => {
    const { title, image_url, subtitle } = message;
    toSend.push({ title, image_url, subtitle });
  })
  return JSON.stringify(toSend);
};
// MESSAGE TEXT CAN ONLY BE A STRING
const writeToDb = (data) => {
  const { chat, text, userType, answer, brand } = data;
  let promises = [];
  if (brand)
  promises.push(
    Message.create({ chatId: chat.id, text, userType: Consumer }),
    Message.create({ chatId: chat.id, text: answer, userType: Bot }),
    Message.create({ chatId: chat.id, text: transformGiftcardMessage(GiftcardMessage), userType: 'botCard' })
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
  const { chat, text } = data;
  const toDb = MatchAnswer(chat, text);
  return handleBotMessage({...toDb, ...data});
};

export const OnBot = (data) => {
  const { io, chat } = data;
  io.emit('chat_update', Socket.updateChat({ state: 'bot' }, chat));
  return prepareBotMessage(data);
};
