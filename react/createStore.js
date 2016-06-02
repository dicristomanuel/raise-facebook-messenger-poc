import { createStore } from 'redux';
import ChatApp from './reducers/index';

const store = createStore(ChatApp);

export default store;
