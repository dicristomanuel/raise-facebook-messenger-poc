import { createSelector } from 'reselect';

const getMemberServiceHash = (state) => state.memberService.hash;
const getVisibilityFilter = (state) => state.chatVisibilityFilter;
const getChats = (state) => state.chats;

export const GetVisibleChats = createSelector(
  [ getMemberServiceHash, getVisibilityFilter, getChats ],
  (memberService, chatVisibilityFilter, chats) => {
    switch (chatVisibilityFilter) {
      case 'SHOW_ALL':
        return chats;
      case 'SHOW_ACTIVE':
        return chats.filter(chat => chat.active && chat.engaged == 'none');
      case 'SHOW_BUSY':
        return chats.filter(chat => chat.engaged != 'none' && chat.engaged != memberService);
      case 'SHOW_SOLVED':
        return chats.filter(chat => chat.solved);
      case 'SHOW_ENGAGED':
        return chats.filter(chat => chat.engaged == memberService);
    }
  }
);
