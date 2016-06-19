import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ManifestSm from '../components/ManifestSm';
import GetSingleManifest from '../selectors/GetSingleManifest';
import { SetEngageForChat } from '../helpers/singleChatHelper';

const mapStateToProps = (state, ownProps) => {
  return {
    manifest: GetSingleManifest(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId, engaged) => {
      const value = engaged ? false : true;
      SetEngageForChat(chatId, value); // value is going to be MS name
    }
  }
}

const ManifestHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestSm);

export default ManifestHeader;
