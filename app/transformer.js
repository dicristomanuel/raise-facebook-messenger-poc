import { Bot, Consumer } from '../data/appConstants';

const newMessage = (data) => {
  const { text, toDb, chat } = data;
  const { id } = chat;
  if (toDb)
  return [{
    text,
    userType: Consumer,
    chatId: id,
  },
  {
    text: toDb.text,
    userType: Bot,
    chatId: id,
  }];
  else {
    return [{
      text,
      userType: Consumer,
      chatId: id,
    }];
  }
};

const updateChat = (data, chat) => {
  return {
    chatId: chat.id,
    change: data,
  };
};

// exports ====>

export const Socket = {
  message: newMessage,
  updateChat: updateChat,
};
