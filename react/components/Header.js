import React from 'react';
import ChatFilter from './ChatFilter';
import ChatFilter from './NameFilter';
const Header = () => (
  <div className='header'>
    <div className='logo'>
      <img src='images/raise.png'/>
    </div>
    <ChatFilter />
    <NameFilter />
    // ADD Name filter for fuzzy search
  </div>
);

export default Header;
