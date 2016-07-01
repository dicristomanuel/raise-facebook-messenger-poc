import { New_message, New_notification } from '../../../app/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../messenger/api';

const sendOut = (data) => {
  const { sender, answer, brand, giftcardMessage, toSocket } = data;
  SendMessage(sender, answer);
  return data;
};

export const OffBot = (data) => {
  const { io, chat, toSocket } = data;
  sendOut(data);
  toSocket.forEach((message) => {
    const toSocket = Socket.message(message);
    io.emit(`${New_message}${chat.id}`, toSocket);
    io.emit(`${New_notification}${chat.id}`, toSocket);
  })
  return data;
}
