import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import { InitMessagesAndSockets } from '../helpers/singleChatHelper';
import { SetMessagesVisibilityFilter, FetchMessages, ResetSingleChat } from '../actions';

class SingleChat extends Component {

  static onEnter(router) {
    Store.dispatch(FetchMessages(router.params.id));
  }

  componentWillUnmount() {
    Store.dispatch(ResetSingleChat());
  }

  render() {
    return (
      <Provider store={Store}>
        <div>
          <Header origin='SingleChat' />
          <VisibleMessageList />
        </div>
      </Provider>
    );
  }
}

export default SingleChat;
