import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class TextNotifications extends Component {

  componentDidUpdate() {
    const element = findDOMNode(this);
    if (true) {
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
          <p className='notification-text'>{this.props.flashMessages}</p>
        </div>
      </div>
    )
  }
}

TextNotifications.propTypes = {
  flashMessages: PropTypes.array.isRequired,
}


export default TextNotifications;
