import React, { PropTypes, Component } from 'react';

const getStatus = (chat) => {
  if (chat.busy && !chat.engaged)
  return 'busy';
  else if (chat.engaged)
  return 'engaged';
  else if (chat.active && !chat.busy)
  return 'active';
  else if (chat.solved)
  return 'solved';
}

class Manifest extends Component {
  onClickManifest(chatId) {
    this.props.callback(chatId);
  }

  render() {
    return (
      <li className='manifest' onClick={this.onClickManifest.bind(this, this.props.chatId)}>
        <div className={getStatus(this.props) + " state"}>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Manifest;
