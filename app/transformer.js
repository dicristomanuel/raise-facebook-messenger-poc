import { Bot, Consumer } from './appConstants';

const newChat = data => {
  const { chat } = data;
  const { id, firstName, lastName, profilePic, state, active, solved, engaged } = chat;
  return {
    id,
    firstName,
    lastName,
    profilePic,
    state,
    active,
    solved,
    engaged,
  }
};

const newMessage = data => {
  const { id, ChatId, text, userType, createdAt } = data;
  return {
    id,
    chatId: ChatId,
    text,
    userType,
    createdAt: createdAt.toString().substring(4,21)
  }
};

const updateChat = (data, chat) => {
  return {
    chatId: chat.id,
    change: data,
  };
};

export const Socket = {
  chat: newChat,
  message: newMessage,
  updateChat: updateChat,
};
