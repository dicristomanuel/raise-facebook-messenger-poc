import { connect } from 'react-redux';
import { SetMessagesVisibilityFilter } from '../actions';
import Link from '../components/Link';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return {
    chatId: ownProps.chatId === state.messagesVisibilityFilter
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      // ownProps.origin === ChatList
      dispatch(SetMessagesVisibilityFilter(ownProps.chatId));
      browserHistory.push(`/chat/${ownProps.chatId}`);
      // else
      // engage this chat
    }
  }
}

const FilterMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterMessages;
