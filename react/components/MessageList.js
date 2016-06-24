import React, { PropTypes, Component } from 'react';
import FlipMove from 'react-flip-move';
import Text from './Text';
import InputContainer from './InputContainer';
import { findDOMNode } from 'react-dom';
import { LoadMessages, Compare } from '../helpers/singleChatHelper';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.pages = 1;
    this.loading = false;
    this.messagesCount = 0;
    this.prevScrollOffsetBottom = 0;
    this.allowScrollUp = true;
  }

  componentDidUpdate(prevProps) {
    this.updateScrollPosition(prevProps.messages, this.props.messages)
    // this.messagesCount = this.props.messages.length;
  }

  updateScrollPosition(prev, curr) {
    const element = findDOMNode(this).querySelector('.scroll-container');
    const noOlderMessages = !!prev.length && prev[0].id === curr[0].id;
    const hasNewerMessages = noOlderMessages && prev.length !== curr.length;
    const receivedSameMessages = noOlderMessages && !hasNewerMessages;
    if (!prev.length || hasNewerMessages) {
      element.scrollTop = element.scrollHeight;
      return;
    } else if (this.loading && receivedSameMessages) {
      this.allowScrollUp = false;
    }
    this.loading = false;
    // setTimeout(() => {
    //   this.reconcileScrollPosition(element);
    //   this.loading = false;
    // }, 0);
  }

  // reconcileScrollPosition(msgEl) {
  //     const texts = msgEl.querySelectorAll('.text');
  //     const lastText = texts[texts.length - 1];
  //     const currScrollOffsetBottom = this.rect(lastText).bottom;
  //     const msgDelta = this.props.messages.length - this.messagesCount;
  //     const textH = this.rect(lastText).height;
  //     // const scrollDelta = msgDelta * textH;
  //     const scrollDelta = this.prevScrollOffsetBottom - currScrollOffsetBottom;
  //     msgEl.scrollTop -= scrollDelta;
  // }
  //
  // rect(el) {
  //   return el.getBoundingClientRect();
  // }

  // handleScroll(event) {
  //   if (this.loading || !this.allowScrollUp) return;
  //   const messages = findDOMNode(this).querySelector('.messages');
  //   const texts = messages.querySelectorAll('.text');
  //   const lastText = texts[texts.length - 1];
  //   if (messages.scrollTop <= 100) {
  //     // this.prevScrollOffsetBottom = this.rect(lastText).bottom;
  //     // this.messagesCount = this.props.messages.length;
  //     this.loading = true;
  //     this.pages++;
  //     this.props.fetchMessages(this.props.chatId, this.pages)
  //   }
  // }

  handleScroll(event) {
    const messages = findDOMNode(this).querySelector('.scroll-container');
    if (messages.scrollTop <= 100) {
      this.pages++;
      this.props.fetchMessages(this.props.chatId, this.pages)
    }
  }

  onSendToMessenger(text) {
    this.props.sendToMessenger(this.props.chatId, text);
  }

  render() {
    return(
      <div className='message-list'>
        <ul className='scroll-container' onScroll={this.handleScroll.bind(this, event)}>
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
