import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import InputContainer from './InputContainer';
import { findDOMNode } from 'react-dom';
import { LoadMessages, Compare } from './helpers/singleChatHelper';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.pages = 1;
    this.loading = false;
    this.messagesCount = 0;
    this.shouldLoad = true;
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[0];
    // if (!this.loading)
    console.log(element.scrollHeight);
    element.scrollTop = element.scrollHeight;
  }

  handleScroll(event) {
    const element = findDOMNode(this).childNodes[0];
    if (element.scrollTop <= 100 && this.shouldLoad) {
      this.loading = true;
      this.pages++;
      LoadMessages(this.props.chatId, this.pages)
      .then((count) => {
        // if (count === this.messagesCount) {
          this.shouldLoad = false;
        // }
        this.loading = false;
      })
    }
  }

  onSendToMessenger(text) {
    this.props.sendToMessenger(this.props.chatId, text);
  }

  render() {
    // this.messagesCount = this.props.messages.length;
    return(
      <ul className='message-list' onScroll={this.handleScroll.bind(this, event)}>
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
      <InputContainer sendToMessenger={this.onSendToMessenger.bind(this)}/>
      </ul>
    )
  }
}


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
