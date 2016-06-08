import React, { PropTypes, Component } from 'react';
import FilterMessages from '../containers/FilterMessages';
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

class Manifest extends Component {
  render() {
    return (
      <FilterMessages chatId={this.props.chatId}>
        <li className='manifest'>
          <div className={getStatus(this.props) + " state"}>
            <div className='profile-pic'>
              <img src={this.props.profilePic} />
            </div>
          </div>
          <p className="name">{this.props.name}</p>
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
