import React from 'react';
import Store from './createStore';
import Footer from './components/Footer';
import Header from './components/Header';
import { UpdateStatus } from './actions';
import { LayoutInit } from './components/helpers/layoutHelper';
import { Chat_update } from '../data/socketConstants';

const socket = io();

class Layout extends React.Component {
  render() {
    LayoutInit();

    socket.on(Chat_update, (data) => {
      console.log('data', data.change);
      Store.dispatch(UpdateStatus(data));
      console.log(Store.getState());
    });

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
