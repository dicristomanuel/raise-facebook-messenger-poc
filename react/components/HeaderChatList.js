import React from 'react';
import ChatFilter from './ChatFilter';

const HeaderChatList = () => (
  <div className='header'>
    <div className='logo'>
      <img src='images/raise.png'/>
    </div>
    <ChatFilter />
  </div>
);

// ADD Name filter for fuzzy search
export default HeaderChatList;
