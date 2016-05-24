import React from 'react';
import Layout from '../Layout';
import Chat from '../components/Chat';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path='/' component={Layout}>
    <Route path='/:chatId' component={Chat} />
  </Route>
);

// <IndexRoute component={Chats} />
