import React, { PropTypes, Component } from 'react';

class Text extends Component {
  render() {
    return (
        <li className={this.props.userType + " text"} title={this.props.createdAt}>
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
  createdAt: PropTypes.string.isRequired,
}

export default Text;
