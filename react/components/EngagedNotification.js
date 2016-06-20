import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class EngagedNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const element = findDOMNode(this);
    console.log(element);
    if (this.props.isEngaged && element.className === 'hide') {
      element.className = `notification-container notification-animation-in`;
      setTimeout(() => {
        element.className = `notification-container notification-animation-out`;
      }, 2200);
    }
  }

  render() {
    return (
      <div className='hide'>
        <div className='notification'>
          <p className='notification-text'>Chat engaged</p>
        </div>
      </div>
    )
  }
}

export default EngagedNotification;
