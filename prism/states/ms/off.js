import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../app/messenger'

export const OffMs = (data) => {
  const { io, chat, text } = data;
  SendMessage(chat.sender, text);
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
  return data;
}
