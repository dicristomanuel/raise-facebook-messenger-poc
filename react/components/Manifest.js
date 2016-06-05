import React, { PropTypes } from 'react';

const Manifest = (chat) => {

  let status = chat.busy ? 'busy' : 'solved';
  let state = `state ${status}`;
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
