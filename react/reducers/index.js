
import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_CHAT, UPDATE_STATUS, ADD_MESSAGE} from '../actions.js';
import { combineReducers } from 'redux';

const { SHOW_ACTIVE } = VisibilityFilters;

const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const chats = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAT:
      return [
        ...state,
        {
          chatId: action.chatId,
          name: action.name,
          profilePic: action.profilePic,
          busy: action.busy,
          active: action.active,
          solved: action.solved,
          engaged: action.engaged,
        }
      ];
    // case UPDATE_CHAT:
    //   return state.chats.map((chat, index) => {
    //     if (index === action.index)
    //     return {...chat, status: action.status}
    //     return chat
    //   });
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          chatId: action.chatId,
          text: action.text,
          userType: action.userType,
        }
      ];
    default:
      return state;
  }
};

const ChatApp = combineReducers({
  visibilityFilter,
  chats,
  messages,
});

export default ChatApp;

// TODO:
// Use immutable map for UPDATE_STATUS

// Add:
// notifications: action.notifications,
// updatedAt: action.updatedAt
// messages: []

//
// ======
//
//
// Note for ES6 Savvy Users
//
// Because combineReducers expects an object, we can put all top-level reducers into a separate file, export each reducer function, and use import * as reducers to get them as an object with their names as the keys:
//
// import { combineReducers } from 'redux'
// import * as reducers from './reducers'
//
// const chatApp = combineReducers(reducers)
// Because import * is still new syntax, we don’t use it anymore in the documentation to avoid confusion, but you may encounter it in some community examples.
