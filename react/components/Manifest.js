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

  highlightActive(chatId) {
    return this.props.activeChats.filter((active) => {
      return active.chatId == chatId;
    })[0];
  }

  render() {
    const isActive = this.highlightActive(this.props.chatId);
    const status = this.getStatus();
    return (
      <li className='manifest' onClick={this.onClickManifest.bind(this, this.props.chatId)}>
        <div className={status + " state"}>
          <div className='profile-pic-manifest'>
            <img src={this.props.profilePic} />
          </div>
        </div>
        <div className={isActive ? 'dot-manifest' : null}></div>
        <p className="name">{this.props.name}</p>
      </li>
    );
  }
}

Manifest.PropTypes = {
  chatId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  solved: PropTypes.bool.isRequired,
  engaged: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  memberService: React.PropTypes.shape({
    hash: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

export default Manifest;
