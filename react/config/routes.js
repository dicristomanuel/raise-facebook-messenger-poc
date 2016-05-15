import React from 'react';
import Main from '../Main';
import Chats from '../components/Chats';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={Chats} />
  </Route>
);
