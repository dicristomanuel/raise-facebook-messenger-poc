import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';

class MessageList extends Component {
  render() {
    return(
      <ul className='message-list'>
        <FlipMove easing='ease-in-out' duration='200' enterAnimation='fade' className='messages'>
          {this.props.messages.map(message =>
            <Text
              key={message.id}
              userType={message.userType}
              {...message}
            />
          )}
        </FlipMove>
        <div className='input-container'>
          <input type="text" />
        </div>
      </ul>
    )
  }
}

// Why does every element need to be inside ul ?
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
