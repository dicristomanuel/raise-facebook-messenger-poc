export const ADD_CHAT = 'ADD_CHAT';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const Statuses = {
  ACTIVE: 'ACTIVE',
  BUSY: 'BUSY',
  SOLVED: 'SOLVED'
};

export const VisibilityFilters = {
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_BUSY: 'SHOW_BUSY',
  SHOW_SOLVED: 'SHOW_SOLVED',
};

export const AddChat = data => {
  return { type: ADD_CHAT, data};
};

export const AddNotification = id => {
  return { type: ADD_NOTIFICATION, id};
};
