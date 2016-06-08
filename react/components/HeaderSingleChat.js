import React from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';

const HeaderSingleChat = () => (
  <div className='header'>
    <Link to='/'>
      <div className='logo'>
        <img src='images/raise.png'/>
      </div>
    </Link>
  </div>
);

// make bar thinner and add arrow to scroll all the way down
// ADD Name filter for fuzzy search
// return to previous page from router (catch all)
export default HeaderSingleChat;
