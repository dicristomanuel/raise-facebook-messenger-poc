import React, { Component } from 'react';
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
          {this.props.notifications.map(chat =>
              <div className='new-message-single-notification' onClick={this.onClick.bind(this, chat)} key={chat}>
                <div className='dot'></div>
                <div className='img-container'>
                  <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='xsm-image'/>
                </div>
              </div>
            )}
        </div>
        <FilterEngaged />
      </div>
    )
  }
}

export default Notifications;
