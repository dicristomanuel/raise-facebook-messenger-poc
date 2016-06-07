import { connect } from 'react-redux';
import { SetVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    all:     ownProps.filter === state.visibilityFilter,
    active:  ownProps.filter === state.visibilityFilter,
    busy:    ownProps.filter === state.visibilityFilter,
    solved:  ownProps.filter === state.visibilityFilter,
    engaged: ownProps.filter === state.visibilityFilter,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(SetVisibilityFilter(ownProps.filter));
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
// TODO: ask better explain this lifecycle
export default FilterLink;
