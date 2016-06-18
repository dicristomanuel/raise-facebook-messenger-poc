import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { GetMessagesForId } from '../selectors/getMessagesForId';
import { SendMessage } from '../helpers/singleChatHelper';

const mapStateToProps = state => {
  return {
    messages: GetMessagesForId(state),
    chatId: state.messagesVisibilityFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendToMessenger: (chatId, text) => {
      SendMessage({ chatId, text })
    }
  }
}

const VisibleMessageList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList);

export default VisibleMessageList;
