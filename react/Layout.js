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
    socket.subscribe('initial_data', (data) => {
      console.log(store.getState());
      store.dispatch(AddChat(data));
      console.log(store.getState());
    });
    // socket.unsubscribe(c1Token);

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
