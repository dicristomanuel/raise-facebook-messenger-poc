import { connect } from 'react-redux';
import ChatList from '../components/ChatList';
import { GetVisibleChats } from '../selectors/getVisibleChats';
import { browserHistory } from 'react-router';
import { SetMessagesVisibilityFilter, handleClickManifest, ChatAllInit } from '../actions';
import { InitMessagesAndSockets } from '../helpers/singleChatHelper';

const mapStateToProps = state => {
  // console.log('in connect', state.notifications.memberService);
  return {
    chats: GetVisibleChats(state),
    memberService: { ...state.notifications.memberService },
    activeChats: state.notifications.active,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId) => {
      dispatch(handleClickManifest(chatId))
      browserHistory.push(`/chat/${chatId}`);
    },
    beforeMount: () => {
      dispatch(ChatAllInit());
    }
  }
}

const VisibleChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);

export default VisibleChatList;
