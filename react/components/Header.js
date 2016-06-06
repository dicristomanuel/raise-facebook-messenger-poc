import React from 'react';
import ChatFilter from './ChatFilter';

const Header = () => (
  <div className='header'>
    <div className='logo'>
      <img src='images/raise.png'/>
    </div>
    <ChatFilter />
  </div>
);

export default Header;
