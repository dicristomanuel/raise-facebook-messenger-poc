import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';

const onClick = (chat) => {
  // return browserHistory.push(`/chat/${chat.chatId}`);
  return true;
}
// TODO: ^^

const getStatus = (chat) => {
  if (chat.busy && !chat.engaged)
  return 'busy';
  else if (chat.active && !chat.busy)
  return 'active';
  else if (chat.solved)
  return 'solved';
  else if (chat.engaged)
  return 'engaged';
}

class Manifest extends Component {
  render() {
    let state = `state ${getStatus(this.props)}`;
    return (
      <li className='manifest' onClick={onClick}>
        <div className={state}>
          <div className='profile-pic'>
            <img src={this.props.profilePic} />
          </div>
        </div>
        <p className="name">{this.props.name}</p>
      </li>
    );
  }
}

Manifest.PropTypes = {
  chat: PropTypes.shape({
    chatId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    engaged: PropTypes.bool.isRequired,
  }).isRequired
}

export default Manifest;
