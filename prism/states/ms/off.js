import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage } from '../../../app/messenger'
import Chat from '../../../db/chat';


const sendOut = (data) => {
  const { io, chat, sender, answer } = data;
  SendMessage(sender, answer);
  Chat.update(chat, {active:true})
  .then((chat) => {
    io.emit('chat_update', Socket.updateChat({active:true}, chat));
  })
  return data;
};

export const OffMs = (data) => {
  const { io, chat, text, answer } = data;
  if (answer)
  sendOut(data);
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
  return data;
}
