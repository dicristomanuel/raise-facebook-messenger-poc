import { connect } from 'react-redux';
import { SetMessagesVisibilityFilter } from '../actions';
import Link from '../components/Link';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return {
    chatId: ownProps.chatId === state.messagesVisibilityFilter,
    extra: 'foobar'
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(SetMessagesVisibilityFilter(ownProps.chatId));
      browserHistory.push(`/chat/${ownProps.chatId}`);
    }
  }
}

const FilterMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterMessages;
