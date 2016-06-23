import { New_message, New_notification, New_chat, Chat_update } from '../../data/socketConstants';
import { AddActive, AddMessage, AddChat, UpdateStatus } from '../actions';

const getImageLink = (chatId, getState) => {
  return getState().chats.filter(chat => chat.chatId == chatId)[0].profilePic;
}; // move to helper?
// refactor with implicit return
export default {
  OnNewChat: data => {
    const { socket, dispatch, Transform } = data;
    socket.on(New_chat, (chat) => {
      dispatch(AddChat(Transform([chat])));
    })
  },

  OnChatUpdate: data => {
    const { socket, dispatch } = data;
    socket.on(Chat_update, (data) => {
      dispatch(UpdateStatus(data));
    });
  },

  OnNotification: data => {
    const { chatId, dispatch, socket, getState } = data;
    socket.on(`${New_notification}${chatId}`, (message) => {
      const currentChat = getState().messagesVisibilityFilter;
      if (currentChat != message.chatId) {
        dispatch(AddActive({chatId: message.chatId, image: getImageLink(chatId, getState)}));
      }
    });
  },
  OffNotification: (chatId, socket) => {
    socket.off(`${New_notification}${chatId}`);
  },

  OnMessage: data => {
    const { chatId, socket, dispatch } = data;
    socket.on(`${New_message}${chatId}`, (message) => {
      dispatch(AddMessage(message));
    });
  },

  OffMessage: data => {
    const { chatId, socket, dispatch } = data;
    socket.off(`${New_message}${chatId}`);
  },
}
export const OnNotification = data => {
  const { chatId, dispatch, socket, getState } = data;
  socket.on(`${New_notification}${chatId}`, (message) => {
    const currentChat = getState().messagesVisibilityFilter;
    if (currentChat != message.chatId) {
      dispatch(AddActive({chatId: message.chatId, image: getImageLink(chatId, getState)}));
    }
  });
};
