import React from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';
import ManifestSmall from './ManifestSmall';

const HeaderChatSingle = () => (
  <div className='header-sm'>
    <Link to='/'>
      <div className='logo'>
        <img src='images/raise.png'/>
      </div>
    </Link>
    <ManifestSmall />
  </div>
);

// make bar thinner and add arrow to scroll all the way down
// ADD Name filter for fuzzy search
export default HeaderChatSingle;
