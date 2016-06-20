import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  onClick(event) {
    console.log(event);
  }

  componentDidUpdate() {
    const element = findDOMNode(this).childNodes[1];
    if (this.props.isEngaged) {
      element.className = `notification-container notification-animation-in`;
      setTimeout(() => {
        element.className = `notification-container notification-animation-out`;
      }, 2200);
    }
  }

  render() {
    return (
      <div className='bottom-notifications'>
        <div className='engaged-notifications'>
          {this.props.notifications.map(chat =>
              <div className='engaged-single-container bounce' onClick={this.onClick} key={chat.id}>
                <div className='dot'></div>
                <div className='img-container'>
                  <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='xsm-image'/>
                </div>
              </div>
            )}
        </div>

        <div className='hide'>
          <div className='notification'>
            <p className='notification-text'>Chat engaged</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications;
