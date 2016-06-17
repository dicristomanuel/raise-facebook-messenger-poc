import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class Text extends Component {
  componentDidMount() {
    const element = findDOMNode(this);
    this.props.text.includes('https://scontent') ? element.style.background = 'none' : null
  }

  render() {
    const propsText = this.props.text;
    const text = propsText.includes('https://scontent') ? <img src={ propsText } className='message-img'></img> : <p>{ propsText }</p>
    return (
        <li className={this.props.userType + ' text'} title={this.props.createdAt}>
          { text }
        </li>
    );
  }
}

Text.PropTypes = {
  id: PropTypes.number.isRequired,
  chatId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default Text;
