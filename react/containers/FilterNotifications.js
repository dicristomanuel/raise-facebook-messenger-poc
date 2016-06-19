import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import { RemoveNotification } from '../actions';
import { browserHistory } from 'react-router';

const mapStateToProps = state => {
  return {
    notifications: state.memberService.notifications,
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
