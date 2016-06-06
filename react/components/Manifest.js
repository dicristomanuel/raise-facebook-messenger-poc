import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

const onClick = (chat) => {
  console.log(chat);
  return browserHistory.push(`/chat/${chat.chatId}`);
}

const getStatus = (chat) => {
  if (chat.busy)
  return 'busy';
  else if (chat.active)
  return 'active';
  else if (chat.solved)
  return 'solved';
  else if (chat.engaged)
  return 'engaged';
}

const Manifest = (chat) => {
  let state = `state ${getStatus(chat)}`;
  return (
    <li className='manifest' onClick={onClick}>
      <div className={state}>
        <div className='profile-pic'>
          <img src={chat.profilePic} />
        </div>
      </div>
    <p className="name">{chat.name}</p>
    </li>
  );
}

Manifest.PropTypes = {
  chat: PropTypes.shape({
    chatId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    engaged: PropTypes.bool.isRequired,
  }).isRequired
}

export default Manifest;
