import React, { PropTypes, Component } from 'react';
import Store from '../createStore';

const getStatus = (chat) => {
  if (chat.busy && chat.engaged == 'none')
  return 'busy';
  else if (chat.engaged != 'none')
  return 'engaged';
  else if (chat.active && !chat.busy)
  return 'active';
  else if (chat.solved)
  return 'solved';
}

class ManifestSm extends Component {
  onClickManifestSm(chatId) {
    this.props.onClick(chatId, this.props.manifest.engaged);
  }

  render() {
    return (
        <div className='manifest-sm' onClick={this.onClickManifestSm.bind(this, this.props.manifest.chatId)} title='Click to engage'>
          <p className="name">{this.props.manifest.name}</p>
          <div className={getStatus(this.props.manifest) + " state-sm"}>
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
