import { createSelector } from 'reselect';

const getVisibilityFilter = (state) => state.messagesVisibilityFilter;
const getMessages = (state) => state.messages;

export const GetMessagesForId = createSelector(
  [ getVisibilityFilter, getMessages ],
  (messagesVisibilityFilter, messages) => {
    console.log(messagesVisibilityFilter, messages);
    return messages.filter(message => message.chatId == messagesVisibilityFilter)[0];
  }
);
