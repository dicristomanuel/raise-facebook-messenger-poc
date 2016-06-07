import React, { PropTypes, Component } from 'react';
import Text from './Text';
import FlipMove from 'react-flip-move';

class MessageList extends Component {
  render() {
    return(
      <ul>
      <FlipMove easing="cubic-bezier(.49,.05,.62,.9)" className='chats'>
        {this.props.messages.map(message =>
          <Text
            key={message.chatId}
            {...message}
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

// ChatList.propTypes = {
//   chats: PropTypes.arrayOf(PropTypes.shape({
//     chatId: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     profilePic: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     busy: PropTypes.bool.isRequired,
//     solved: PropTypes.bool.isRequired,
//     engaged: PropTypes.bool.isRequired,
//   }).isRequired).isRequired
// }

export default MessageList;
