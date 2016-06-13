import React from 'react';
import VisibleChatList from '../containers/VisibleChatList';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import Footer from './Footer';

const ChatAll = () => (
  <Provider store={Store}>
    <div>
      <Header origin='ChatAll' />
      <VisibleChatList />
      <Footer />
    </div>
  </Provider>
);

export default ChatAll;
