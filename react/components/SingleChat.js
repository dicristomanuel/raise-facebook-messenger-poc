import React, { Component } from 'react';
import { InitMessagesAndSockets } from './helpers/chatSingleHelper';
import { Provider } from 'react-redux';
import Store from '../createStore';
import HeaderSingleChat from './HeaderSingleChat';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';

class SingleChat extends Component {
  render() {
    InitMessagesAndSockets(this.props.params.id);
    return (
      <Provider store={Store}>
        <div>
          <HeaderSingleChat />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default SingleChat;
