import React, { Component } from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <Link to='/'>
          <div className='logo'>
            <img src='images/raise.png'/>
          </div>
        </Link>
      { this.props.parent === 'ChatAll' ? <ChatFilter /> : null }
      </div>
    );
  }
}

// ADD Name filter for fuzzy search
export default Header;
