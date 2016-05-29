import { New_message } from '../../data/socketConstants';
import { Socket } from '../transformer';

export const CloseBotFromInit = (data) => {
  const { io, chat } = data;
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
}
