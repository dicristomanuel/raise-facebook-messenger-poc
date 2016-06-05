import React, { PropTypes } from 'react';

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
    <li className='manifest'>
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
  chat: PropTypes.object.isRequired
}

export default Manifest;
