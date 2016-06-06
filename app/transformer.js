import { Bot, Consumer } from '../data/appConstants';

const newChat = (data) => {
  const { chat } = data;
  const { id, firstName, lastName, profilePic, state } = chat;
  return {
    id: id,
    firstName,
    lastName,
    profilePic,
    state: Bot,
    active: false,
    busy: false,
    solved: false,
    engaged: false,
  }
};

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
  chat: newChat,
  message: newMessage,
  updateChat: updateChat,
};
