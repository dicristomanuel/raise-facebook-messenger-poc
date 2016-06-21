import { Bot, ToMemberService, Consumer } from '../../../data/appConstants';
import { MatchAnswer } from '../../../bot/mainBot';
import Message from '../../../db/message';
import { Socket } from '../../../app/transformer';
import { GiftcardMessage } from '../../../app/structuredMessages';

const writeToDb = (data) => {
  const { chat, text, userType, answer, brand } = data;
  let promises = [];
  if (brand)
  promises.push(
    Message.create({ chatId: chat.id, text, userType: Consumer }),
    Message.create({ chatId: chat.id, text: answer, userType: Bot }),
    Message.create({ chatId: chat.id, text: GiftcardMessage.attachment.payload.elements[0].title, userType: Bot })
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
