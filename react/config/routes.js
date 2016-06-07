import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from '../components/Home';
import ChatSingle from '../components/ChatSingle';

export default (
    <Route path='/'>
      <IndexRoute component={Home} />
      <Route path='chat/:id' component={ChatSingle} />
    </Route>
)
