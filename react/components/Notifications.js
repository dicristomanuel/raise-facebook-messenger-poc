import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import TextNotifications from './TextNotifications';

class Notifications extends Component {
  onClick(chatId) {
    this.props.onClick(chatId);
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[0].childNodes[0];
    if (element)
    element.className = 'new-message-single-active bounce';
  }

  render() {
    return (
      <div className='bottom-active'>
        <div className='new-message-active'>
          {this.props.active.map(singleActive =>
              <div className='new-message-single-active'
                onClick={this.onClick.bind(this, singleActive.chatId)}
                key={singleActive.chatId}
              >
                <div className='dot'></div>
                <div className='img-container'>
                  <img src={singleActive.image} className='xsm-image'/>
                </div>
              </div>
            )}
        </div>
        <TextNotifications
          flashMessage={this.props.flashMessage}
          engaged={this.props.engaged}
          current={this.props.current}
        />
      </div>
    )
  }
}

Notifications.contextTypes = {
  history: PropTypes.object,
}

Notifications.Notifications = {
  active: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Notifications;
