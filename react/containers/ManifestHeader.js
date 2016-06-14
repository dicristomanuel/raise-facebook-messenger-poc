import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ManifestSm from '../components/ManifestSm';
import GetSingleManifest from '../selectors/GetSingleManifest';

const mapStateToProps = (state, ownProps) => {
  return {
    manifest: GetSingleManifest(state)
  }
}

const ManifestHeader = connect(
  mapStateToProps
)(ManifestSm);

export default ManifestHeader;
