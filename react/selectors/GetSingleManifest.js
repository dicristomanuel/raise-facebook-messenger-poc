import { createSelector } from 'reselect';

const getVisibilityFilter = (state) => state.messagesVisibilityFilter;
const getChats = (state) => state.chats;

const GetSingleManifest = createSelector(
  [ getVisibilityFilter, getChats ],
  (messagesVisibilityFilter, chats) => {
    return chats.filter(chat => chat.chatId == messagesVisibilityFilter)[0];
  }
);

export default GetSingleManifest;
