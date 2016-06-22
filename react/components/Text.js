import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import BotCard from './BotCard';

class Text extends Component {
  componentDidMount() {
    const element = findDOMNode(this);
    this.includes(this.props.text) ? element.style.background = 'none' : null
  }

  includes(string) {
    if (string.includes('https://scontent')) {
      return 'image'
    } else if (string.includes('https://fbcdn')) {
      return 'like'
    }
    return false;
  }

  handleText(text, userType) {
    const textType = this.includes(text);
    if (userType === 'botCard') {
      return <BotCard giftcards={text} />
    } else if (textType) {
      const classForImage = textType === 'image' ? 'message-img' : 'message-like';
      return <a href={text} target='_blank'><img src={text} className={classForImage}></img></a>
    } else {
      return <p>{text}</p>
    }
  }

  render() {
    const text = this.handleText(this.props.text, this.props.userType);
    return (
        <li className={this.props.userType + ' text'} title={this.props.createdAt}>
          {text}
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
