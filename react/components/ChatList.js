import React, { PropTypes, Component } from 'react';
import Manifest from './Manifest';
import FlipMove from 'react-flip-move';
import { Compare } from '../helpers/chatAllHelper';

class ChatList extends Component {
  onClickChatList(chatId) {
    this.props.onClick(chatId);
  }

  render() {
    return(
      <ul>
        <FlipMove easing="cubic-bezier(.49,.05,.62,.9)" className='chats'>
          {this.props.chats.sort(Compare).map(chat =>
            <Manifest
              key={chat.chatId}
              origin='ChatList'
              callback={this.onClickChatList.bind(this)}
              memberService={this.props.memberService}
              {...chat}
            />
          )}
        </FlipMove>
      </ul>
    )
  }
}

ChatList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    engaged: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChatList;
