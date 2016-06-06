import { connect } from 'react-redux';
import Manifest from '../components/Manifest';


const mapStateToProps = state => {
  return {
    chat: state.chats;
  }
}

const UpdateChatStatus = ""
// const UpdateChatStatus = connect(mapStateToProps)(Manifest);

export default UpdateChatStatus;
