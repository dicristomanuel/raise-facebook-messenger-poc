import React, { PropTypes, Component } from 'react';
import Store from '../createStore';

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

class ManifestSm extends Component {
  onClick(chatId) {
    
  }
  render() {
    return (
        <div className='manifest-sm' onClick={this.props.onClick.bind(this)}>
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
  }).isRequired
}

export default ManifestSm;
