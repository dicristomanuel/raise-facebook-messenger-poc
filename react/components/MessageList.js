import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import Textarea from '../containers/Textarea';
import { findDOMNode } from 'react-dom';
import { loadMessages } from './helpers/singleChatHelper';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.pages = 1;
  }

  handleScroll(component) {
    const element = findDOMNode(this).childNodes[0];
    if (element.scrollTop <= 100 && !this.loading) {
      this.loading = true;
      this.pages++;
      console.log(this.props.messages);
      loadMessages(this.props.chatId, this.pages);
    }
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[0];
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const compare = (a,b) => {
      if (a.id < b.id)
        return -1;
      else if (a.id > b.id)
        return 1;
      else
        return 0;
    }

    return(
      <ul className='message-list' onScroll={this.handleScroll.bind(this)}>
        <FlipMove enterAnimation="fade" duration='200' className='messages'>
          {this.props.messages.sort(compare).map(message =>
            <Text
              key={message.id}
              userType={message.userType}
              {...message}
            />
          )}
        </FlipMove>
      <Textarea />
      </ul>
    )
  }
}

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
    updatedAt: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired).isRequired
}

export default MessageList;
