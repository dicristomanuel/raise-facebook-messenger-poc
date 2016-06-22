import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class TextNotifications extends Component {
  constructor() {
    super();
    this.previousFlashMessage = '';
  }

  componentDidUpdate() {
    const element = findDOMNode(this);
    const flashMessage = this.props.flashMessage;
    if (flashMessage !== this.previousFlashMessage) {
      element.className = `notification-container notification-animation-in`;
      setTimeout(() => {
        element.className = `notification-container notification-animation-out`;
      }, 2200);
    }
    this.previousFlashMessage = flashMessage;
  }

  render() {
    return (
      <div className='hide'>
        <div className='notification'>
          <p className='notification-text'>{this.props.flashMessage}</p>
        </div>
      </div>
    )
  }
}

TextNotifications.propTypes = {
  flashMessage: PropTypes.array.isRequired,
}


export default TextNotifications;
