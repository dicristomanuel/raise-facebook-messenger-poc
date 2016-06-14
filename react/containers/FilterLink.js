import { connect } from 'react-redux';
import { SetChatVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = state => {
  return {
    current: state.chatVisibilityFilter
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

export default FilterLink;
