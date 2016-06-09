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

const originOf = instance => instance.props.origin === 'SingleChat';

class Manifest extends Component {
  render() {
    let singleChat = originOf(this);
    let manifest = singleChat ? GetChatManifest(Store.getState()) : this.props;

    return (
      <FilterMessages chatId={manifest.chatId} origin={this.props.origin}>
        <li className={singleChat ? 'manifest-sm' : 'manifest'}>
          <div className={getStatus(manifest) + " state"}>
            <div className={singleChat ? 'profile-pic-sm' : 'profile-pic'}>
              <img src={manifest.profilePic} />
            </div>
          </div>
          <p className="name">{manifest.name}</p>
        </li>
      </FilterMessages>
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
