import React, { Component } from 'react';
import { InitMessagesAndSockets } from './helpers/singleChatHelper';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';

class SingleChat extends Component {
  render() {
    InitMessagesAndSockets(this.props.params.id);
    return (
      <Provider store={Store}>
        <div>
          <Header parent='SingleChat' />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default SingleChat;
