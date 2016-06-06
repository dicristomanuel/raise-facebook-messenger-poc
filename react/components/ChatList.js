import React, { PropTypes } from 'react';
import Manifest from './Manifest';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ChatList = ({ chats }) => {
  return (
  <ul>
    <ReactCSSTransitionGroup transitionName="manifest" transitionEnterTimeout={800} transitionLeaveTimeout={200} className='chats'>
      {chats.map(chat =>
        <Manifest
          key={chat.chatId}
          {...chat}
        />
      )}
    </ReactCSSTransitionGroup>
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
