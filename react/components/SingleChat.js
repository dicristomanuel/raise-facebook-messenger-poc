import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import { InitMessagesAndSockets } from '../helpers/singleChatHelper';
import { SetMessagesVisibilityFilter, FetchMessages, ResetSingleChat } from '../actions';

class SingleChat extends Component {

  componentWillReceiveProps() {
    this.setState({
      prevChatId: this.props.params.id
    });
  }

  onLeave() {
    const toZero = this.previousExist() ? true : false;
    Store.dispatch(ResetSingleChat(toZero));
  }

  previousExist() {
    return this.state && this.state.prevChatId;
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

SingleChat.onEnter = router => {
  Store.dispatch(FetchMessages(router.params.id));
}

SingleChat.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default SingleChat;
