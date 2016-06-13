import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { GetMessagesForId } from '../selectors/getMessagesForId';

const mapStateToProps = state => {
  return {
    messages: GetMessagesForId(state),
    chatId: state.messagesVisibilityFilter,
  }
}

const VisibleMessageList = connect(mapStateToProps)(MessageList);

export default VisibleMessageList;
