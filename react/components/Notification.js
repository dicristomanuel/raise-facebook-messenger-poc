import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
// extra small manifest and container

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='notification-container'>
        <div className='notification engaged'>
          <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='img-xsm' />
          <p className='notification-text'>Chat engaged</p>
          <p className='notification-undo'>UNDO</p>
        </div>
      </div>
    )
  }
}

export default Notification;
