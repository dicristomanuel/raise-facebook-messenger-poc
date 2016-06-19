import { connect } from 'react-redux';
import ChatList from '../components/ChatList';
import { GetVisibleChats } from '../selectors/getVisibleChats';
import { browserHistory } from 'react-router';
import { SetMessagesVisibilityFilter, RemoveNotification } from '../actions';
import { InitMessagesAndSockets } from '../helpers/singleChatHelper';

const mapStateToProps = state => {
  return {
    chats: GetVisibleChats(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId) => {
      dispatch(SetMessagesVisibilityFilter(chatId));
      dispatch(RemoveNotification(chatId));
      browserHistory.push(`/chat/${chatId}`);
    }
  }
}

const VisibleChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);

export default VisibleChatList;
