import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
// extra small manifest and container

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='notification-container notification-animation-out'>
        <div className='notification engaged'>
          <p className='notification-text'>Chat engaged</p>
          <p className='notification-undo'>UNDO</p>
        </div>
      </div>
    )
  }
}

export default Notification;
