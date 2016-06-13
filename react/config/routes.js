import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ChatAll from '../components/ChatAll';
import SingleChat from '../components/SingleChat';
import { InitChatsAndSockets } from '../components/helpers/chatAllHelper';

InitChatsAndSockets()

export default (
    <Route path='/'>
      <IndexRoute component={ChatAll} />
      <Route path='chat/:id' component={SingleChat} />
    </Route>
)
