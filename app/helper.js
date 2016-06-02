import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { New_message, New_chat, Chat_update } from '../data/socketConstants';

export const GetChats = () => {
  return Chat.findAll();
};

export const GetMessages = (id) => {
  return Bubble.findForChat(id);
};

export const UpdateStatus = (io, payload) => {
  const { chatId, key, value } = payload;
  return Chat.findById(chatId)
  .then((chat) => {
    const keyValue = JSON.parse(`{"${key}":${value}}`);
    socketEmit({io, action: Chat_update, data: keyValue, chat});
    Chat.update(chat, keyValue);
  });
};
