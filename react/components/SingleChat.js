import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';
import { InitMessagesAndSockets } from './helpers/singleChatHelper';
import Notification from './Notification';

class SingleChat extends Component {
  constructor(props) {
      super(props);
    }

  render() {
    InitMessagesAndSockets(this.props.params.id)
    return (
      <Provider store={Store}>
        <div>
          <Header parent='SingleChat' />
          <Notification />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default SingleChat;
