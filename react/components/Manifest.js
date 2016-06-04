import React, { PropTypes } from 'react';

const Manifest = ({ chat, onClick }) => (
  <li onClick={onClick}>
    {chat}
  </li>
);

Manifest.PropTypes = {
  onClick: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
}

export default Manifest;
