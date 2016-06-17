import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import Notifications from './Notifications';

class InputContainer extends Component {
  handleChange(event) {
    const element = findDOMNode(this).childNodes[0].childNodes[0];
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  onClick(event) {
    console.log(event);
  }

  render() {
    return(
      <div className='input-container'>
        <div className='input-area'>
          <textarea type="text"
            placeholder="Type your message ..."
            className='textarea'
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <Notifications />
      </div>
    )
  }
};

export default InputContainer;
