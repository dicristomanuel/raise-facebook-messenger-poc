import React, { PropTypes, Component } from 'react';
import FilterMessages from '../containers/FilterMessages';
import Store from '../createStore';
import { GetChatManifest } from '../selectors/getChatManifest';

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
  render() {
    let manifest = GetChatManifest(Store.getState())
    return (
      // <FilterMessages chatId={manifest.chatId} origin={this.props.origin}>
        <li className='manifest-sm'>
        <p className="name">{manifest.name}</p>
          <div className={getStatus(manifest) + " state-sm"}>
            <div className='profile-pic-sm'>
              <img src={manifest.profilePic} className='profile-img-sm' />
            </div>
          </div>
        </li>
      // </FilterMessages>
    );
  }
}

// change filter messages
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
