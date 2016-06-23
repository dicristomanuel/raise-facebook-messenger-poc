import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import { handleClickManifest, RemoveFlashMessage } from '../actions';
import { browserHistory } from 'react-router';

const mapStateToProps = state => {
  return {
    active: state.notifications.active,
    flashMessage: state.notifications.flashMessages,
    engaged: state.notifications.chats,
    current: state.messagesVisibilityFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId) => {
      dispatch(handleClickManifest(chatId));
      browserHistory.push(`/chat/${chatId}`);
    },
  }
}

const FilterNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);

export default FilterNotifications;
