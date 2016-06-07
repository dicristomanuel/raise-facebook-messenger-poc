import { connect } from 'react-redux';
import { SetChatVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    all:     ownProps.filter === state.chatVisibilityFilter,
    active:  ownProps.filter === state.chatVisibilityFilter,
    busy:    ownProps.filter === state.chatVisibilityFilter,
    solved:  ownProps.filter === state.chatVisibilityFilter,
    engaged: ownProps.filter === state.chatVisibilityFilter,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(SetChatVisibilityFilter(ownProps.filter));
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
// TODO: ask better explain this lifecycle
export default FilterLink;
