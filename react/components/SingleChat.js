import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';
import { InitMessagesAndSockets } from './helpers/singleChatHelper';
import { NotificationStack } from 'react-notification';

class SingleChat extends Component {
  constructor(props) {
    super(props);
    this.notifyEngaged = true;
  }

  toggleNotifyEngaged() {
   this.notifyEngaged = !this.notifyEngaged;
  }

  render() {
    InitMessagesAndSockets(this.props.params.id)
    return (
      <Provider store={Store}>
        <div>
        <Notification
          isActive={ this.notifyEngaged }
          message="Notification"
          action="Dismiss"
          title="Title!"
          onDismiss={ console.log(this.toggleNotification) }
          onClick={() =>  {console.log(this)} }}
        />
          <Header parent='SingleChat' />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default SingleChat;
