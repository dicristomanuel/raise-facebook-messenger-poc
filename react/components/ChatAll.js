import React, { Component } from 'react';
import VisibleChatList from '../containers/VisibleChatList';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import Footer from './Footer';
import { SetMessagesVisibilityFilter, FetchChats } from '../actions';

class ChatAll extends Component {
  setMessageFilter() {
    Store.dispatch(SetMessagesVisibilityFilter(0))
  }

  componentWillMount() {
    Store.dispatch(FetchChats());
  }

  render() {
    return(
      <Provider store={Store}>
        <div>
          <Header origin='ChatAll' setMessageFilter={this.setMessageFilter()} />
          <VisibleChatList />
          <Footer />
        </div>
      </Provider>
    )
  }
};

export default ChatAll;
