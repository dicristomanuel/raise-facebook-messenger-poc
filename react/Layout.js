import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

import store from './createStore';
import { AddChat, ChatStatuses } from './actions'

class Layout extends React.Component {
  render() {
    store.dispatch(AddChat({
      chatId: 1234,
      name: 'Foo Bar',
      profilePic: 'foobar.png',
      status: ChatStatuses.ACTIVE,
    }));
    store.dispatch(AddChat({
      chatId: 1235,
      name: 'Foo Baz',
      profilePic: 'foobaz.png',
      status: ChatStatuses.ACTIVE,
    }));
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

//<Link to="page" activeClassName="test">page</Link>
