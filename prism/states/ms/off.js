import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../app/messenger'

const sendOut = (data) => {
  const { sender, answer } = data;
  SendMessage(sender, answer);
  return data;
};

export const OffMs = (data) => {
  const { io, chat, text, answer } = data;
  if (answer)
  sendOut(data);
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
  return data;
}
