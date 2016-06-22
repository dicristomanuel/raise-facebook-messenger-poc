import { combineReducers } from 'redux';
import { VisibilityFilters, SET_CHAT_VISIBILITY_FILTER, SET_MESSAGES_VISIBILITY_FILTER,
         ADD_CHAT, ADD_CHATS, CHAT_UPDATE, ADD_MESSAGE, ADD_MESSAGES, ADD_MEMBER,
         ADD_ENGAGED_CHAT, REMOVE_ENGAGED_CHAT, ADD_ACTIVE, REMOVE_ACTIVE,
         ADD_FLASH_MESSAGE } from '../actions.js';

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

const notifications = (state = { memberService: {}, chats: [], active: [], flashMessages: [] }, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return { ...state, memberService: {
        hash: action.data.hash,
        name: action.data.name
      }}
    case ADD_ENGAGED_CHAT:
      if (state.chats.indexOf(action.chatId) === -1)
      return { ...state, chats: [ ...state.chats, action.chatId ]}
      else
      return state;
    case REMOVE_ENGAGED_CHAT:
      const indexChat = state.chats.indexOf(action.chatId);
      return { ...state, chats: [
        ...state.chats.slice(0, indexChat),
        ...state.chats.slice(indexChat + 1)
      ]}
    case ADD_ACTIVE:
      const activeAdd = state.active.filter((active) => {
        return active.chatId === action.data.chatId;
      })[0];
      if (!activeAdd)
      return { ...state, active: [ ...state.active, {
        chatId: action.data.chatId,
        image: action.data.image,
      }]}
      else
      return state
    case REMOVE_ACTIVE:
      const activeRemove = state.active.filter((active) => {
        return active.chatId === action.data;
      })[0];
      if (activeRemove) {
        const indexNotification = state.active.indexOf(activeRemove);
        return { ...state, active: [
          ...state.active.slice(0, indexNotification),
          ...state.active.slice(indexNotification + 1)
        ]}
      } else {
        return state;
      }
    case ADD_FLASH_MESSAGE:
      return { ...state, flashMessages: [ action.flashMessage ]}
    default:
      return state;
  }
}

const ChatApp = combineReducers({
  chatVisibilityFilter,
  messagesVisibilityFilter,
  chats,
  messages,
  notifications,
});

export default ChatApp;
