import { New_message, New_notification } from '../../data/socketConstants';
import { AddActive, AddMessage } from '../actions';

const getImageLink = (chatId, getState) => {
  return getState().chats.filter(chat => chat.chatId == chatId)[0].profilePic;
};

export const socketOnNotification = data => {
  const { chatId, dispatch, socket, getState } = data;
  socket.on(`${New_notification}${chatId}`, (message) => {
    const currentChat = getState().messagesVisibilityFilter;
    if (currentChat != message.chatId) {
      dispatch(AddActive({chatId: message.chatId, image: getImageLink(chatId, getState)}));
    }
  });
};

export const socketOffNotification = (chatId, socket) => {
  socket.off(`${New_notification}${chatId}`);
};

export const socketOnMessage = (data) => {
  const { chatId, socket, dispatch } = data;
  console.log('in ON MESSAGE FOR', chatId);
  socket.on(`${New_message}${chatId}`, (message) => {
    dispatch(AddMessage(message));
  });
};

export const socketOffMessage = (data) => {
  const { chatId, socket, dispatch } = data;
  console.log('IN OFF MESSAGE', chatId);
  socket.on(`${New_message}${chatId}`, (message) => {
    dispatch(AddMessage(message));
  });
};
