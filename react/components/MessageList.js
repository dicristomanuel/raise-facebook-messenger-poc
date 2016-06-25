import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import InputContainer from './InputContainer';
import { LoadMessages, Compare } from '../helpers/singleChatHelper';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.pages = 1;
    this.loading = false;
    this.prevHeight = 0;
    this.allowScrollUp = true;
  }

  componentDidUpdate(prevProps) {
    this.updateScrollPosition(prevProps.messages, this.props.messages)
    // this.refs.scroller.scrollTop = this.refs.scroller.scrollHeight
  }

  updateScrollPosition(prev, curr) {
    const scrollContainer = this.refs.scroller;
    const noOlderMessages = !!prev.length && prev[0].id === curr[0].id;
    const hasNewerMessages = noOlderMessages && prev.length !== curr.length;
    const receivedSameMessages = noOlderMessages && !hasNewerMessages;
    if (!prev.length || hasNewerMessages) {
      return scrollContainer.scrollTop = scrollContainer.scrollHeight;
    } else if (this.loading && receivedSameMessages) {
      this.allowScrollUp = false;
    }
    this.loading = false;
  }

  handleScroll() {
    const scrollContainer = this.refs.scroller;
    if (scrollContainer.scrollTop <= 100) {
      this.pages++;
      console.log(this.pages);
      this.props.fetchMessages(this.props.chatId, this.pages)
    }
  }

  onSendToMessenger(text) {
    this.props.sendToMessenger(this.props.chatId, text);
  }

  render() {
    return(
      <div className='message-list'>
        <ul className='scroll-container' onScroll={this.handleScroll.bind(this, event)} ref='scroller'>
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
        </ul>
      <InputContainer
        sendToMessenger={this.onSendToMessenger.bind(this)}
        isEngaged={this.props.isEngaged}
        chatId={this.props.chatId}
      />
      </div>
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
  }).isRequired).isRequired,
  sendToMessenger: PropTypes.func.isRequired,
}

export default MessageList;
