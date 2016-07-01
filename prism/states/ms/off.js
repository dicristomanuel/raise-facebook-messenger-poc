import { New_message, New_notification, Chat_update } from '../../../app/socketConstants';
import { MemberService } from '../../../app/appConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../messenger/api'
import Chat from '../../../db/chat';

const sendOut = (data) => {
  const { io, chat, sender, answer } = data;
  SendMessage(sender, answer);
  Chat.update(chat, { solved: false });
  Chat.update(chat, { active: true })
  .then((chat) => {
    io.emit(Chat_update, Socket.updateChat({ active: true }, chat));
    io.emit(Chat_update, Socket.updateChat({ state: 'ms' }, chat));
  })
  return data;
};

export const OffMs = (data) => {
  const { io, chat, text, answer, userType, sender, toSocket } = data;
  if (answer)
    sendOut(data);
  else if (userType === MemberService) {
    SendMessage(chat.sender, text);
    Chat.update(chat, { active: false });
    io.emit(Chat_update, Socket.updateChat({ active: false }, chat));
  } else {
    Chat.update(chat, { active: true });
    io.emit(Chat_update, Socket.updateChat({ active: true }, chat));
  }
  toSocket.forEach((message) => {
    const toSocket = Socket.message(message);
    io.emit(`${New_message}${chat.id}`, toSocket);
    io.emit(`${New_notification}${chat.id}`, toSocket);
  })
  return data;
}
