import { combineReducers } from 'redux';
import { VisibilityFilters, SET_CHAT_VISIBILITY_FILTER, SET_MESSAGES_VISIBILITY_FILTER,
         ADD_CHAT, ADD_CHATS, CHAT_UPDATE, ADD_MESSAGE, ADD_MESSAGES, ADD_MEMBER,
         ADD_ENGAGED_CHAT, REMOVE_ENGAGED_CHAT, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions.js';

const { SHOW_ALL } = VisibilityFilters;

const chatVisibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_CHAT_VISIBILITY_FILTER:
      return action.filter;
    default:
    return state;
  }
};

const messagesVisibilityFilter = (state = 0, action) => {
  switch (action.type) {
    case SET_MESSAGES_VISIBILITY_FILTER:
      return action.chatId;
    default:
    return state;
  }
};

const chats = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAT:
      return [ ...state, ...action.chat ]
    case ADD_CHATS:
      return action.chats;
    case CHAT_UPDATE:
      return state.map((chat, index) => {
      if (action.chatId === chat.chatId)
      return { ...chat, ...action.change }
      return chat
    });
    default:
    return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [ ...state, action.message ];
    case ADD_MESSAGES:
      return action.messages
    default:
    return state;
  }
};

const memberService = (state = { chats: [], notifications: [] }, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return { ...state, ...action.data }
    case ADD_ENGAGED_CHAT:
      return { ...state, chats: [ ...state.chats, action.chatId ]}
    case REMOVE_ENGAGED_CHAT:
      // replace with Immutable - SPLICE WILL BE REMOVED
      const indexEngaged = state.chats.indexOf(action.chatId)
      const lastItemEngaged = state.chats.length === 1 ? -1 : 1;
      return { ...state, chats: [
        ...state.chats.splice(indexEngaged, lastItemEngaged)
        ]}
    case ADD_NOTIFICATION:
      if (state.notifications.indexOf(action.chatId) === -1)
      return { ...state, notifications: [ ...state.notifications, action.chatId ] }
      else
      return state
    case REMOVE_NOTIFICATION:
      const present = state.notifications.indexOf(action.chatId) != -1 ? true : false;
      if (present) {
        const indexNotification = state.notifications.indexOf(action.chatId);
        const lastItemNotification = state.notifications.length === 1 ? -1 : 1;
        return { ...state, notifications: [
          ...state.notifications.splice(indexNotification, lastItemNotification)
        ]}
      } else {
        return state;
      }
    default:
      return state;
  }
}

const ChatApp = combineReducers({
  chatVisibilityFilter,
  messagesVisibilityFilter,
  chats,
  messages,
  memberService,
});

export default ChatApp;
