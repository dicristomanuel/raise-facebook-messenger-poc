import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import Textarea from '../containers/Textarea';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message =>
      <Text
      key={message.id}
      userType={message.userType}
      {...message}
      />
    );

    return(
      <ul className='message-list'>
        <div className='messages'>
          { messages }
        </div>
        <Textarea />
      </ul>
    )
  }
}

// Why does every element need to be inside ul ?
// TODO: sort by oldest updated
// Key issue when going back and forth pages

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
