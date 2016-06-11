import Chat from '../db/chat';
import Bubble from '../db/bubble';
import { New_message, New_chat, Chat_update } from '../data/socketConstants';
import { Socket } from './transformer';

export const GetChats = () => {
  return Chat.findAll();
};

export const GetMessages = (id, page) => {
  return Bubble.findForChat(id, page);
};

export const UpdateStatus = (io, payload) => {
  const { chatId, key, value } = payload;
  return Chat.findById(chatId)
  .then((chat) => {
    const keyValue = JSON.parse(`{"${key}":${value}}`);
    io.emit(Chat_update, Socket.updateChat(keyValue, chat));
    return Chat.update(chat, keyValue);
  });
};
