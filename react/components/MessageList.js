import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import Textarea from '../containers/Textarea';
import { findDOMNode } from 'react-dom';
import { loadMessages, Compare } from './helpers/singleChatHelper';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.pages = 0;
    this.loading = false;
    this.firstRender = true;
  }

  handleScroll(event) {
    const element = findDOMNode(this).childNodes[0];
    const currentHeight = element.scrollTop;
    if (element.scrollTop <= 100 && !this.loading) {
      this.loading = true;
      this.pages++;
      loadMessages(this.props.chatId, this.pages)
      .then(() => {
        this.loading = false;
      })
    }
  }

  componentDidUpdate() {
    if (this.firstRender) {
      this.firstRender = false;
      const element = findDOMNode(this).childNodes[0];
      element.scrollTop = element.scrollHeight;
    }
  }

  render() {
    return(
      <ul className='message-list' onScroll={this.handleScroll.bind(this, event)}>
        <p>{this.props.lastUpdated}</p>
        <FlipMove enterAnimation="fade" duration='200' className='messages'>
          {this.props.messages.sort(Compare).map(message =>
            <Text
              key={message.id}
              userType={message.userType}
              createdAt={message.createdAt}
              {...message}
            />
          )}
        </FlipMove>
      <Textarea />
      </ul>
    )
  }
}

// ALERT: not sending messages to messenger - ?

// TODO: sort by oldest updated
// When loading turn loading to true and launch load only when not true
// add handleType for text area height
// FlipMove is hiding the scrollbar
// Why call super(props)

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    chatId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired).isRequired
}

export default MessageList;
