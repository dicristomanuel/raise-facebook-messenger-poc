import React, { PropTypes, Component } from 'react';
import Manifest from './Manifest';
import FlipMove from 'react-flip-move';

// const ChatList = ({ chats }) => {
//   return (
//   <ul className='chats'>
//     {chats.map(chat =>
//       <Manifest
//         key={chat.chatId}
//         {...chat}
//       />
//     )}
//   </ul>
//   );
// }

class ChatList extends Component {
  render() {
    return(
      <ul>
      <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)" className='chats'>
        {this.props.chats.map(chat =>
          <Manifest
            key={chat.chatId}
            {...chat}
          />
        )}
        </FlipMove>
      </ul>
    )
  }
}

// TODO: ask why key - Where does it show - Is it just a props for the after click?
// why {...chat} - chat only returns an error?
// TODO: sort by oldest updated

ChatList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    engaged: PropTypes.bool.isRequired,
  }).isRequired).isRequired
}

export default ChatList;
