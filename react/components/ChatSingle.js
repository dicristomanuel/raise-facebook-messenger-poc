import React, { Component } from 'react';
import { InitMessagesAndSockets } from './helpers/chatSingleHelper';
import { Provider } from 'react-redux';
import Store from '../createStore';
import HeaderChatSingle from './HeaderChatSingle';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';

class ChatSingle extends Component {
  render() {
    console.log(this.props);
    InitMessagesAndSockets(this.props.params.id);
    return (
      <Provider store={Store}>
        <div>
          <HeaderChatSingle />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default ChatSingle;
