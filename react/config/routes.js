import React from 'react';
import Main from '../components/Main';
// import Chat from '../components/Chat';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path='/' component={Main}>
    // <Route path='/:chatId' component={Chat} />
  </Route>
);

// <IndexRoute component={Chats} />
// TODO: socket.on in routes works only if refresh page
