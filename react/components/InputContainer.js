import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class InputContainer extends Component {
  handleChange(event) {
    const element = findDOMNode(this).childNodes[0];
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
        <ul className='active-engaged'>
          <li>
            <div className='xsm-main-container'>
              <div className='xsm-single-container' onClick={this.onClick}>
                <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='xsm'/>
              </div>
              <div className='xsm-single-container bounce' onClick={this.onClick}>
                <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='xsm'/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
};

// <a href='#'>
// <img src="/assets/images/dots.png" className="options-message"></img>
// </a>

export default InputContainer;
