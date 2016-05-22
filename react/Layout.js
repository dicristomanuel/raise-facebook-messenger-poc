import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import store from './createStore';
import { AddMessage } from './actions';

const socket = io();

class Layout extends React.Component {
  render() {
    socket.on('new_message', (messages) => {
      messages.forEach((message) => {
        store.dispatch(AddMessage(message));
      });

      console.log(store.getState());
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
