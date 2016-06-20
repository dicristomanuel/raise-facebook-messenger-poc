import React, { PropTypes, Component } from 'react';

class Manifest extends Component {
  onClickManifest(chatId) {
    this.props.callback(chatId);
  }

  getStatus() {
    const chat = this.props;
    const memberService = this.props.memberService.hash;
    if (chat.engaged != 'none' && chat.engaged != memberService)
    return 'busy';
    else if (chat.engaged == memberService)
    return 'engaged';
    else if (chat.active)
    return 'active';
    else
    return 'solved';
  }

  render() {
    const status = this.getStatus();
    return (
      <li className='manifest' onClick={this.onClickManifest.bind(this, this.props.chatId)}>
        <div className={status + " state"}>
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
