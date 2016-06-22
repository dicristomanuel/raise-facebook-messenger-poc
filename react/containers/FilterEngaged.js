import { connect } from 'react-redux';
import EngagedNotification from '../components/EngagedNotification';

const isEngaged = (chats, engaged) => {
  // return chats.includes(engaged);
  return {};
};

const mapStateToProps = state => {
  return {
    isEngaged: isEngaged(state.memberService.chats, state.messagesVisibilityFilter),
  }
}

const FilterEngaged = connect(mapStateToProps)(EngagedNotification);

export default FilterEngaged;
