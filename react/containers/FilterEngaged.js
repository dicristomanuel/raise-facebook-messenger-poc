import { connect } from 'react-redux';
import EngagedNotification from '../components/EngagedNotification';

const isEngaged = (chats, engaged) => {
  return chats.includes(engaged);
};

const mapStateToProps = state => {
  return {
    isEngaged: isEngaged(state.notifications.chats, state.messagesVisibilityFilter),
  }
}

const FilterEngaged = connect(mapStateToProps)(EngagedNotification);

export default FilterEngaged;
