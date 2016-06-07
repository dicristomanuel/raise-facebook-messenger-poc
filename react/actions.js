export const ADD_CHAT = 'ADD_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_CHAT_VISIBILITY_FILTER = 'SET_CHAT_VISIBILITY_FILTER';
export const SET_MESSAGES_VISIBILITY_FILTER = 'SET_MESSAGES_VISIBILITY_FILTER';
export const CHAT_UPDATE = 'CHAT_UPDATE';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_BUSY: 'SHOW_BUSY',
  SHOW_SOLVED: 'SHOW_SOLVED',
  SHOW_ENGAGED: 'SHOW_ENGAGED'
};

export const AddChat = data => {
  return { type: ADD_CHAT, ...data };
};

export const AddMessage = data => {
  return { type: ADD_MESSAGE, ...data };
};

export const SetChatVisibilityFilter = filter => {
  return { type: SET_CHAT_VISIBILITY_FILTER, filter };
};

export const SetMessagesVisibilityFilter = chatId => {
  return { type: SET_MESSAGES_VISIBILITY_FILTER, chatId };
};

export const UpdateStatus = data => {
  return { type: CHAT_UPDATE, ...data };
};
