import { createStore } from 'redux';
import ChatApp from './reducers/index';
import { AddChat, UpdateStatus, SetVisibilityFilter, VisibilityFilters } from './actions';

const store = createStore(ChatApp);

export default store;