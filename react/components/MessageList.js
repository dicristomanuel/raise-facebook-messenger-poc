import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';

class MessageList extends Component {
  render() {
    return(
      <ul>
        <FlipMove easing="cubic-bezier(.49,.05,.62,.9)" className='messages'>
          {this.props.messages.map(message =>
            <Text
              key={message.id}
              chat={this.props.chat}
              {...message}
            />
          )}
        </FlipMove>
      </ul>
    )
  }
}

// why {...chat} - chat only returns an error?
// TODO: sort by oldest updated

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    chatId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired).isRequired
}

export default MessageList;
