import { connect } from 'react-redux';
import { SetMessagesVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    chatId: ownProps.chatId === state.messagesVisibilityFilter,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(SetMessagesVisibilityFilter(ownProps.chatId));
    }
  }
}

const FilterMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterMessages;
