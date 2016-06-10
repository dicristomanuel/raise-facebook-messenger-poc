import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import Textarea from '../containers/Textarea';
import { findDOMNode } from 'react-dom';

class MessageList extends Component {
  handleScroll(stuff) {
    const element = findDOMNode(this)
  }

  render() {
    return(
      <ul className='message-list' onScroll={this.handleScroll.bind(this)}>
        <div className='messages'>
          {this.props.messages.map(message =>
            <Text
              key={message.id}
              userType={message.userType}
              {...message}
            />
          )}
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
