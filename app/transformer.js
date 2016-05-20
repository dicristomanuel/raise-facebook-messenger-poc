const extractMessage = (chat) => {
  return chat && chat._boundTo ? chat._boundTo.dataValues.text : null;
};

const fromMessenger = (data) => {
  const { text, sender, userType } = data;
  return {
    text,
    sender,
    userType,
    firstName: null,
    answer: null,
  };
};

const newMessage = (data, chat) => {
  const botMessage = extractMessage(chat);
  if (botMessage)
  return [{
    text: data.text,
    userType: data.userType,
    chatId: chat.id,
  },
  {
    text: botMessage,
    userType: 'bot',
    chatId: chat.id,
  }];
  else {
    return {
      text: data.text,
      userType: data.userType,
      chatId: chat.id,
    };
  }
};

const updateChat = (data, chat) => {
  return {
    chatId: chat.id,
    change: data,
  };
};

export const Messenger = {
  transform: fromMessenger,
};

export const Socket = {
  message: newMessage,
  updateChat: updateChat,
};
