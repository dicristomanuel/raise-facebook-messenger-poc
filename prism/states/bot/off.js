import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';

export const OffBot = (data) => {
  const { io, chat } = data;
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
  return data;
}
