import { connect } from 'react-redux';
import ChatList from '../components/ChatList';

const getVisibleChats = (chats, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return chats;
    case 'SHOW_ACTIVE':
      return chats.filter(chat => chat.active && !chat.busy)
    case 'SHOW_BUSY':
      return chats.filter(chat => chat.busy && !chat.engaged)
    case 'SHOW_SOLVED':
      return chats.filter(chat => chat.solved)
    case 'SHOW_ENGAGED':
      return chats.filter(chat => chat.engaged)
  }
}

const mapStateToProps = state => {
  return {
    chats: getVisibleChats(state.chats, state.visibilityFilter)
  }
}

const VisibleChatList = connect(mapStateToProps)(ChatList);

export default VisibleChatList;



// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChatClick: (id) => {
//       dispatch(getMessagesForChat(id))
//     }
//   }
// }
// LATER
