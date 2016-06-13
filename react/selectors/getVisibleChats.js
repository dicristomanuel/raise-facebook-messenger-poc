import { createSelector } from 'reselect';

const getVisibilityFilter = (state) => state.chatVisibilityFilter;
const getChats = (state) => state.chats;

export const GetVisibleChats = createSelector(
  [ getVisibilityFilter, getChats ],
  (chatVisibilityFilter, chats) => {
    switch (chatVisibilityFilter) {
      case 'SHOW_ALL':
        return chats;
      case 'SHOW_ACTIVE':
        return chats.filter(chat => chat.active && !chat.busy);
      case 'SHOW_BUSY':
        return chats.filter(chat => chat.busy && !chat.engaged);
      case 'SHOW_SOLVED':
        return chats.filter(chat => chat.solved);
      case 'SHOW_ENGAGED':
        return chats.filter(chat => chat.engaged);
    }
  }
);
