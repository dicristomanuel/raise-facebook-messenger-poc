import { New_message } from '../../../data/socketConstants';
import { MemberService } from '../../../data/appConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../app/messenger'
import Chat from '../../../db/chat';

const sendOut = (data) => {
  const { io, chat, sender, answer } = data;
  SendMessage(sender, answer);
  Chat.update(chat, {solved:false});
  Chat.update(chat, {active:true})
  .then((chat) => {
    io.emit('chat_update', Socket.updateChat({active:true}, chat));
  })
  return data;
};

export const OffMs = (data) => {
  const { io, chat, text, answer, userType, sender, toSocket } = data;
  if (answer)
  sendOut(data);
  else if (userType === MemberService)
  SendMessage(chat.sender, text);
  toSocket.forEach((message) => {
    io.emit(`${New_message}${chat.id}`, Socket.message(message));
  })
  return data;
}
