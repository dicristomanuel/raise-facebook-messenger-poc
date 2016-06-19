import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import { RemoveNotification } from '../actions';
import { browserHistory } from 'react-router';

const mapStateToProps = state => {
  console.log('in connect ', state.memberService.notifications);
  return {
    notifications: state.memberService.notifications,
    messagesVisibilityFilter: state.messagesVisibilityFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId) => {
      RemoveNotification(chatId)
      browserHistory.push(`/chat/${chatId}`);
    }
  }
}

const FilterNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);

export default FilterNotifications;
