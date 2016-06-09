import React, { Component } from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';
import Manifest from './manifest';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <Link to='/'>
          <div className='logo'>
            <img src='images/raise.png'/>
          </div>
        </Link>
      {
        this.props.origin === 'ChatAll' ?
        <ChatFilter /> : <Manifest origin='SingleChat'/>
      }
      </div>
    );
  }
}

// ADD Name filter for fuzzy search
export default Header;
