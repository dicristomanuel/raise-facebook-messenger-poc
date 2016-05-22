import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Store from './createStore';
import { AddMessage, AddChat } from './actions';
import Event from './constants';
import { LayoutInit } from './components/helpers/layoutHelper';

const socket = io();

class Layout extends React.Component {
  render() {
    LayoutInit();
    // socket.on(Event.new_message, (messages) => {
    //   messages.forEach((message) => {
    //     Store.dispatch(AddMessage(message));
    //   });
    //   console.log(Store.getState());
    // });
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
