import React, { PropTypes, Component } from 'react';

class Text extends Component {
  render() {

    return (
        <li className='manifest'>
          {this.props}
        </li>
    );
  }
}

// Text.PropTypes = {
//   chat: PropTypes.shape({
//     chatId: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     profilePic: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     busy: PropTypes.bool.isRequired,
//     solved: PropTypes.bool.isRequired,
//     engaged: PropTypes.bool.isRequired,
//   }).isRequired
// }

export default Text;
