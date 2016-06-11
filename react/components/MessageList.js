import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import Textarea from '../containers/Textarea';
import { findDOMNode } from 'react-dom';

class MessageList extends Component {
  handleScroll(stuff) {
    const element = findDOMNode(this).childNodes[0];
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[0];
    element.scrollTop = element.scrollHeight;
  }

  render() {
    return(
      <ul className='message-list' onScroll={this.handleScroll.bind(this)}>
        <div className='messages no-scroll'>
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

// TODO: sort by oldest updated
// When loading turn loading to true and launch load only when not true
// add handleType for text area height

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
