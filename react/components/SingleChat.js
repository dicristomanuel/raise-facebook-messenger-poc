import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from '../createStore';
import Header from './Header';
import VisibleMessageList from '../containers/VisibleMessageList';
import Footer from './Footer';
import { InitMessagesAndSockets } from './helpers/singleChatHelper';
import Notification from './Notification';
// import { NotificationContainer, NotificationManager } from 'react-notifications';

class SingleChat extends Component {
  constructor(props) {
      super(props);
    }

  // createNotification(type) {
  // return () => {
  //   switch (type) {
  //     case 'info':
  //       NotificationManager.info('Info message');
  //       break;
  //     case 'success':
  //       NotificationManager.success('Success message', 'Title here');
  //       break;
  //     case 'warning':
  //       NotificationManager.warning('UNDO', 'Chat engaged', 90000000);
  //       break;
  //     case 'error':
  //       NotificationManager.error('Error message', 'Click me!', 5000, () => {
  //         alert('callback');
  //       });
  //       break;
  //     }
  //   };
  // };

  render() {
    InitMessagesAndSockets(this.props.params.id)
    return (
      <Provider store={Store}>
        <div>
          <Header parent='SingleChat' />
          <Notification />
          <VisibleMessageList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

// <NotificationContainer enterTimeout={800} leaveTimeout={500}/>
// <button className='btn btn-warning'
// onClick={this.createNotification('warning')}>Warning
// </button>

export default SingleChat;
