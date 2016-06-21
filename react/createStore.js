import { createStore, applyMiddleware } from 'redux';
import createSocketMiddleware from 'redux-ws';
import io from 'socket.io-client';
import ChatApp from './reducers/index';

const socketMiddleware = createSocketMiddleware(io());

const store = createStore(
  ChatApp,
  applyMiddleware(socketMiddleware)
);

export default store;
