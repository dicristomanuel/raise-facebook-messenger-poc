import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const getMessagesForId = (messages, chatId) => {
  return messages.filter(message => message.chatId === chatId);
}

const mapStateToProps = state => {
  return {
    messages: getMessagesForId(state.messages, state.messagesVisibilityFilter),
  }
}

const VisibleMessageList = connect(mapStateToProps)(MessageList);

export default VisibleMessageList;
