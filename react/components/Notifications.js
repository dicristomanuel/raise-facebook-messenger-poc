import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import FilterEngaged from '../containers/FilterEngaged';

class Notifications extends Component {
  onClick(chatId) {
    this.props.onClick(chatId);
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[0].childNodes[0];
    if (element)
    element.className = 'new-message-single-notification bounce';
  }

  render() {
    return (
      <div className='bottom-notifications'>
        <div className='new-message-notifications'>
          {this.props.notifications.map(notification =>
              <div className='new-message-single-notification' onClick={this.onClick.bind(this, notification.chatId)} key={notification.chatId}>
                <div className='dot'></div>
                <div className='img-container'>
                  <img src={notification.image} className='xsm-image'/>
                </div>
              </div>
            )}
        </div>
        <FilterEngaged />
      </div>
    )
  }
}

Notifications.Notifications = {
  notifications: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Notifications;
