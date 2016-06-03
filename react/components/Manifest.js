import React, { PropTypes } from 'react';

const Manifest = ({ onClick, name }) => (
  <li
    onClick={onClick}
  >
    {name}
  </li>
);

Manifest.PropTypes = {
  // onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  busy: PropTypes.string.isRequired,
  solved: PropTypes.string.isRequired,
  engaged: PropTypes.string.isRequired,
}

export default Manifest;
