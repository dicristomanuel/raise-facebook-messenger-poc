import React, { PropTypes, Component } from 'react';
import Manifest from './Manifest';
import FlipMove from 'react-flip-move';

class ChatList extends Component {
  onClick(chatId) {
    this.props.onClick(chatId);
  }

  render() {
    const compare = (a,b) => {
      if (a.updatedAt < b.updatedAt)
        return -1;
      else if (a.updatedAt > b.updatedAt)
        return 1;
      else
        return 0;
    }
// move to helper
    return(
      <ul>
        <FlipMove easing="cubic-bezier(.49,.05,.62,.9)" className='chats'>
          {this.props.chats.sort(compare).map(chat =>
            <Manifest
              key={chat.chatId}
              origin='ChatList'
              callback={this.onClick.bind(this)}
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
    engaged: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChatList;
