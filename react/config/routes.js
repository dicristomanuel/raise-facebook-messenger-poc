import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import ChatSingle from '../components/ChatSingle';


export default (
    <Route path='/'>
      <IndexRoute component={Main} />
      <Route path='chat/:id' component={ChatSingle} />
    </Route>
);

// TODO: socket.on in routes works only if refresh page
