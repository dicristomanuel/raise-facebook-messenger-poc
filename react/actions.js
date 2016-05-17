export const ADD_CHAT = 'ADD_CHAT';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const ChatStatuses = {
  ACTIVE: 'ACTIVE',
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

export const AddChat = options => {
  return {
    type: ADD_CHAT,
    ...options
  };
};

export const SetVisibilityFilter = filter => {
  return { type: SET_VISIBILITY_FILTER, filter };
};

export const UpdateStatus = filter => {
  return { type: UPDATE_STATUS, filter };
};
