export const ADD_CHAT = 'ADD_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const CHAT_UPDATE = 'CHAT_UPDATE';

export const ChatStatuses = {
  STATE: 'STATE',
  BUSY: 'BUSY',
  SOLVED: 'SOLVED',
  ENGAGED: 'ENGAGED'
};

export const VisibilityFilters = {
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

export const SetVisibilityFilter = filter => {
  return { type: SET_VISIBILITY_FILTER, filter };
};

export const UpdateStatus = data => {
  return { type: CHAT_UPDATE, ...data };
};
