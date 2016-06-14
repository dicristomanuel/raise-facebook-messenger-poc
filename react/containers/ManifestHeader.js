import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ManifestSm from '../components/ManifestSm';
import GetSingleManifest from '../selectors/GetSingleManifest';

const mapStateToProps = (state, ownProps) => {
  return {
    manifest: GetSingleManifest(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId) => {
      dispatch(SetMessagesVisibilityFilter(chatId));
      browserHistory.push(`/chat/${chatId}`);
    }
  }
}

const ManifestHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestSm);

export default ManifestHeader;
