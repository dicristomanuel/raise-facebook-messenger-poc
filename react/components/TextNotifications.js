import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class TextNotifications extends Component {
  constructor() {
    super();
    this.previousFlashMessage = '';
  }

  componentDidMount() {
    this.previousFlashMessage = this.props.engaged.includes(this.props.current) ? 'Chat Engaged' : 'Chat Disengaged';
  }

  componentDidUpdate() {
    const element = findDOMNode(this);
    const flashMessage = this.props.flashMessage[0];
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
