import React from 'react';
import Layout from '../Layout';
import Chats from '../components/Chats';
import SingleChat from '../components/SingleChat';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path='/' component={Layout}>
    <Route path='/:chatId' component={SingleChat} />
    <IndexRoute component={Chats} />
  </Route>
);
