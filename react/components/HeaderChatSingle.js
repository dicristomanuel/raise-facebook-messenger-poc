import React from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';

const HeaderChatList = () => (
  <div className='header'>
    <Link to='/'>
      <div className='logo'>
        <img src='images/raise.png'/>
      </div>
    </Link>
    <ChatFilter />
  </div>
);

// ADD Name filter for fuzzy search
export default HeaderChatList;
