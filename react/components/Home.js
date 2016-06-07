import React from 'react';
import { InitChatsAndSockets } from './helpers/homeHelper';
import VisibleChatList from '../containers/VisibleChatList';
import { Provider } from 'react-redux';
import Store from '../createStore';
import HeaderChatList from './HeaderChatList';
import Footer from './Footer';

InitChatsAndSockets()
// TODO: ask ^^ location of this ok?
const Home = () => (
  <Provider store={Store}>
    <div>
      <HeaderChatList />
      <VisibleChatList />
      <Footer />
    </div>
  </Provider>
);

export default Home;
