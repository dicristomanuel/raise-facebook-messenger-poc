import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class Textarea extends Component {
  handleChange(event) {
    const element = findDOMNode(this).childNodes[0];
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  render() {
    return(
      <div className='input-container'>
        <textarea type="text"
          className='textarea'
          onChange={this.handleChange.bind(this)}
          />
          <a href='#'>
          <img src="/assets/images/dots.png" className="options-message"></img>
          </a>
      </div>
    )
  }
};

export default Textarea;
