import React, { PropTypes } from 'react';
import Manifest from './Manifest';

const ChatList = ({ chats }) => {
  return (
  <ul className='chats'>
    {chats.map(chat =>
      <Manifest
        key={chat.chatId}
        {...chat}
      />
    )}
  </ul>
);
}

// TODO: ask why key - Where does it show - Is it just a props for the after click?
// why {...chat} - chat only returns an error?
// TODO: sort by oldest updated

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
