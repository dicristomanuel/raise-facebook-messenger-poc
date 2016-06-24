import React, { PropTypes, Component } from 'react';

class TextNotifications extends Component {
  constructor() {
    super();
    this.previousFlashMessage = '';
  }

  componentDidMount() {
    this.previousFlashMessage = this.props.engaged.includes(this.props.current) ? 'Chat Engaged' : 'Chat Disengaged';
  }

  componentDidUpdate() {
    const container = this.refs.textNotifications;
    const flashMessage = this.props.flashMessage[0];
    if (flashMessage !== this.previousFlashMessage) {
      container.className = `notification-container notification-animation-in`;
      setTimeout(() => {
        container.className = `notification-container notification-animation-out`;
      }, 2200);
    }
    this.previousFlashMessage = flashMessage;
  }

  render() {
    return (
      <div className='hide' ref='textNotifications'>
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
