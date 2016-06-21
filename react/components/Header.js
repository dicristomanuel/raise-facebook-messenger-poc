import React, { PropTypes, Component } from 'react';
import ChatFilter from './ChatFilter';
import { Link } from 'react-router';
import ManifestHeader from '../containers/ManifestHeader';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <div className='header-content'>
          <Link to='/'>
            <div className='logo'>
              <img src='/assets/images/raise.png'/>
            </div>
          </Link>
          {
            this.props.origin === 'ChatAll' ?
            <ChatFilter /> : <ManifestHeader />
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  origin: PropTypes.string.isRequired,
}


export default Header;
