import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import { InitMessagesAndSockets } from '../helpers/singleChatHelper';
import { SetMessagesVisibilityFilter, FetchMessages } from '../actions';

class SingleChat extends Component {
  componentWillMount() {
    Store.dispatch(FetchMessages(this.props.params.id))
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

SingleChat.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default SingleChat;
