import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <nav className='navbar navbar-default' role='navigation'>
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            THIS IS THE FOOTER
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Footer;
