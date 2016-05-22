import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Event from '../data/socketConstants';
import { LayoutInit } from './components/helpers/layoutHelper';

const socket = io();

class Layout extends React.Component {
  render() {
    LayoutInit();
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

// TODO: <Link to="page" activeClassName="test">page</Link>
