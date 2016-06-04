import React, { PropTypes } from 'react';

const Manifest = (chat) => {
return (
  <li>
    {chat.name}
  </li>
);
}

Manifest.PropTypes = {
  // onClick: PropTypes.func.isRequired,
  // chat: PropTypes.object.isRequired
}

export default Manifest;
