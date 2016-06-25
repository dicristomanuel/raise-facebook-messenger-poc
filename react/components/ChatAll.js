import React, { Component } from 'react';
import VisibleChatList from '../containers/VisibleChatList';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import Footer from './Footer';
import { LogoClick, FetchChats } from '../actions';

class ChatAll extends Component {

  componentWillMount() {
    Store.dispatch(FetchChats());
  }

  render() {
    return(
      <Provider store={Store}>
        <div>
          <Header origin='ChatAll' />
          <VisibleChatList />
          <Footer />
        </div>
      </Provider>
    )
  }
};

export default ChatAll;
