import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

import store from './createStore';
import { AddChat, ChatStatuses } from './actions';

// Socket layer demo
import socket from '../util/websocket/client';

class Layout extends React.Component {
  render() {
    socket.init();
    const c1Token = socket.subscribe('connection', () => { console.log('connection'); });
    socket.subscribe('foobar', () => { console.log('foobar'); });
    socket.unsubscribe(c1Token);
    console.log(store.getState());
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
