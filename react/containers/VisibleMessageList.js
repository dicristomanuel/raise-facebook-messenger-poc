import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { GetMessagesForId } from '../selectors/getMessagesForId';
import { SendMessage } from '../helpers/singleChatHelper';

const isEngaged = (chats, engaged) => {
  console.log('chats', chats);
  console.log('engaged', engaged);
  console.log('includes?', chats.includes(engaged));
  return chats.includes(engaged);
};

const mapStateToProps = state => {
  return {
    messages: GetMessagesForId(state),
    chatId: state.messagesVisibilityFilter,
    isEngaged: isEngaged(state.memberService.chats, state.messagesVisibilityFilter),
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
