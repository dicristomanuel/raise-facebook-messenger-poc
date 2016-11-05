import React, { PropTypes, Component } from 'react';
import TextNotifications from './TextNotifications';

class Notifications extends Component {
  onClick(chatId) {
    this.props.onClick(chatId);
  }

  componentDidUpdate() {
    const newMessage = this.refs.newMessage;
    if (newMessage)
    newMessage.className = 'new-message-single-active bounce';
  }

  render() {
    return (
      <div className='bottom-active'>
        <div className='new-message-active'>
          {this.props.active.map((singleActive, index) =>
              <div className='new-message-single-active'
                ref='newMessage'
                onClick={this.onClick.bind(this, singleActive.chatId)}
                key={index}
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
