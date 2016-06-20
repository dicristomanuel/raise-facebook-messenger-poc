import React, { PropTypes, Component } from 'react';
import Store from '../createStore';

class ManifestSm extends Component {
  onClickManifestSm(chatId, status) {
    if (status != 'busy')
    this.props.onClick(chatId, this.props.manifest.engaged);
  }

  getStatus() {
    const chat = this.props.manifest;
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

  getTitleMessage(status) {
    if (status === 'busy')
    return 'Already engaged'
    // return `Engaged by ${this.props.manifest.memberService.name}`
    else if (status === 'engaged')
    return 'Click to disengage'
    else
    return 'Click to engage'
  }

  render() {
    const status = this.getStatus();
    return (
      <div className='manifest-sm' onClick={this.onClickManifestSm.bind(this, this.props.manifest.chatId, status)} title={this.getTitleMessage(status)}>
        <p className="name">{this.props.manifest.name}</p>
        <div className={status + " state-sm"}>
          <div className='profile-pic-sm'>
            <img src={this.props.manifest.profilePic} className='profile-img-sm' />
          </div>
        </div>
      </div>
    );
  }
}

ManifestSm.PropTypes = {
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

export default ManifestSm;
