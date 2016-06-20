import Chat from '../db/chat';
import Message from '../db/message';
import { Chat_update } from '../data/socketConstants';
import { Socket } from './transformer';
import { SendMessage } from './messenger';

const transformMessages = (data) => {
  let messages = [];
  data.forEach((message) => {
    messages.push(Socket.message(message));
  })
  return messages;
};

export const GetChats = (msAuth) => {
  const promises = [Chat.findAll(), Chat.findByHash(msAuth.hash)];
  return Promise.all(promises);
};

export const GetMessages = (id, page) => {
  return Message.findForChat(id, page)
  .then((messages) => {
    return transformMessages(messages);
  });
};

export const UpdateStatus = (io, payload) => {
  const { chatId, key, value } = payload;
  return Chat.findById(chatId)
  .then((chat) => {
    const keyValue = JSON.parse(`{"${key}":"${value}"}`);
    io.emit(Chat_update, Socket.updateChat(keyValue, chat));
    return Chat.update(chat, keyValue);
  });
};
