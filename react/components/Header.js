import React, { Component } from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';
import ManifestSm from './ManifestSm';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <div className='header-content'>
          <Link to='/'>
            <div className='logo'>
              <img src='images/raise.png'/>
            </div>
          </Link>
          {
            this.props.origin === 'ChatAll' ?
            <ChatFilter /> : <ManifestSm />
          }
        </div>
      </div>
    );
  }
}

// ADD Name filter for fuzzy search
export default Header;
