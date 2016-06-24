import React, { PropTypes, Component } from 'react';
import FilterNotifications from '../containers/FilterNotifications';

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.inputValue = '';
  }

  handleChange(showInput, event) {
    const textArea = this.refs.textArea;
    if (!showInput)
    textArea.value = '';
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
    this.inputValue = event.target.value;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && this.inputValue !== '') {
      this.props.sendToMessenger(this.inputValue)
      this.refs.textArea.value = '';
    }
  }

  render() {
    return(
      <div className='input-container'>
        <div className='input-area'>
          <textarea type="text"
            ref='textArea'
            placeholder={ this.props.isEngaged ? "Type your message ..." : "Engage the chat to type"}
            className={this.props.isEngaged ? 'textarea' : 'textarea disabled'}
            onChange={this.handleChange.bind(this, this.props.isEngaged)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
        </div>
        <FilterNotifications />
      </div>
    )
  }
};

InputContainer.propTypes = {
  sendToMessenger: PropTypes.func.isRequired,
  isEngaged: PropTypes.bool.isRequired,
}


export default InputContainer;
