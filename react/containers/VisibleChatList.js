import { connect } from 'react-redux';
import ChatList from '../components/ChatList';
import { GetVisibleChats } from '../selectors/getVisibleChats';
import { browserHistory } from 'react-router';

const mapStateToProps = state => {
  return {
    chats: GetVisibleChats(state)
  }
}

const VisibleChatList = connect(mapStateToProps)(ChatList);

export default VisibleChatList;
