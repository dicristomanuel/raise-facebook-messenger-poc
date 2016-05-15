import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

//<Link to="page" activeClassName="test">page</Link>
