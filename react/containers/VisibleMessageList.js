import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const getMessagesForId = (messages, chatId) => {
  return messages.filter(message => message.chatId === chatId);
}
// TODO: move to selectors

const mapStateToProps = state => {
  return {
    messages: getMessagesForId(state.messages, state.messagesVisibilityFilter),
    chatId: state.messagesVisibilityFilter,
  }
}

const VisibleMessageList = connect(mapStateToProps)(MessageList);

export default VisibleMessageList;
