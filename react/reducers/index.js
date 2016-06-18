import { VisibilityFilters, SET_CHAT_VISIBILITY_FILTER, SET_MESSAGES_VISIBILITY_FILTER,
  ADD_CHAT, ADD_CHATS, CHAT_UPDATE, ADD_MESSAGE, ADD_MESSAGES, ADD_MEMBER } from '../actions.js';
  import { combineReducers } from 'redux';

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

  const memberService = (state = {}, action) => {
    switch (action.type) {
      case ADD_MEMBER:
        return { ...action.data }
      case ADD_MESSAGE:
        console.log('from MS .. ', action);
        return state
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
