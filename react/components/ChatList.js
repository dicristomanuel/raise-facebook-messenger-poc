import React, { PropTypes } from 'react';
import Manifest from './Manifest';

const ChatList = ({ chats }) => {
  return (
  <ul>
    {chats.map(chat =>
      <Manifest
        key={chat.chatId}
        {...chat}
      />
    )}
  </ul>
);
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
  }).isRequired).isRequired
}

export default ChatList;
