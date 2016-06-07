import React, { PropTypes, Component } from 'react';

class Text extends Component {
  render() {
    return (
        <li>
          {this.props.text}
        </li>
    );
  }
}

Text.PropTypes = {
  id: PropTypes.number.isRequired,
  chatId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

export default Text;
