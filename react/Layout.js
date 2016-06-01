import React from 'react';
import Store from './createStore';
import Footer from './components/Footer';
import Header from './components/Header';
import { UpdateStatus, AddChat } from './actions';
import { LayoutInit } from './components/helpers/layoutHelper';
import { Chat_update, New_chat } from '../data/socketConstants';

const socket = io();
LayoutInit();
//
// socket.on(Chat_update, (data) => {
//   Store.dispatch(UpdateStatus(data));
//   console.log('CHAT UPDATE >>> ', data, Store.getState());
// });
//

socket.on(New_chat, (chat) => {
  Store.dispatch(AddChat(chat));
});

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

// TODO: <Link to="page" activeClassName="test">page</Link>
