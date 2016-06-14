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
  debugger;
  const { id, createdAt, text, userType, ChatId, answer } = data;
  const createdDate = createdAt.toString();
  debugger;
  if (answer)
  return [{
    id,
    text,
    ChatId,
    userType: Consumer,
    createdAt: createdDate.substring(4, 21),
  },
  {
    id,
    ChatId,
    text: answer,
    userType: Bot,
    createdAt: createdDate.substring(4, 21),
  }];
  else
  return [{
    id,
    ChatId,
    text,
    userType,
    createdAt: createdDate.substring(4, 21),
  }];

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
