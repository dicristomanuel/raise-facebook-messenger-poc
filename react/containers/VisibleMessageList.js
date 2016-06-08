import { connect } from 'react-redux';
import ChatList from '../components/ChatList';
// import ChatList from '../components/ChatList';

const getMessagesForId = (messages, chatId) => {
  return messages.filter(message => message.chatId === chatId);
}

const getChatManifest = (chats, chatId) => {
  return chats.filter(chat => chat.chatId === chatId);
}

const mapStateToProps = state => {
  return {
    messages: getMessagesForId(state.messages, state.messagesVisibilityFilter),
    chat: getChatManifest(state.chats, state.messagesVisibilityFilter)
  }
}

const VisibleMessageList = connect(mapStateToProps)(ChatList);

export default VisibleMessageList;
