import { connect } from 'react-redux';
import Manifest from '../components/Manifest';

const getVisibleChats = (chats, filter) => {
  switch (filter) {
    case 'SHOW_ACTIVE':
      return chats.filter(chat => chat.active && !chat.busy)
    case 'SHOW_BUSY':
      return chats.filter(chat => chat.busy)
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

const UpdateChatStatus = connect(mapStateToProps)(Manifest);

export default UpdateChatStatus;



// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChatClick: (id) => {
//       dispatch(getMessagesForChat(id))
//     }
//   }
// }
// LATER
