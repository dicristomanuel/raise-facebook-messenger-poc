import React, { PropTypes } from 'react';
import Manifest from './Manifest';

const ChatList = ({chats}) => (
  <ul>
    {chats.map(chat =>
      <Manifest
        key={chat.id}
        {...chat}
      />
    )}
  </ul>
);

ChatList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    busy: PropTypes.string.isRequired,
    solved: PropTypes.string.isRequired,
    engaged: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  // onChatClick: PropTypes.func.isRequired
}

export default ChatList;
