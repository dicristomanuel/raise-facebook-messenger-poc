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
      this.notifications = [{
          message: `Notification ipsum...`,
          key: 1,
          action: 'Dismiss',
          onClick: () => this.removeNotification(),
        }];
    }

  // addNotification() {
  //   const newCount = count + 1;
  //   return this.notifications.add({
  //       message: `Notification ipsum...`,
  //       key: 1,
  //       action: 'Dismiss',
  //       onClick: () => this.removeNotification(1),
  //     })
  // }

  removeNotification(key) {
    console.log(key);
    console.log(this.notifications.filter(n => n.key === key));
  }

  render() {
    console.log(this.notifications);
    InitMessagesAndSockets(this.props.params.id)
    return (
      <Provider store={Store}>
        <div>
          <NotificationStack
            notifications={this.notifications}
            dismissAfter='3000'
            onDismiss={notification => this.removeNotification(notification.key)}
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
