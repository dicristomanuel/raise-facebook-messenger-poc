import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ManifestSm from '../components/ManifestSm';
import GetSingleManifest from '../selectors/GetSingleManifest';
import { SetEngageForChat } from '../helpers/singleChatHelper';

const mapStateToProps = state => {
  return {
    manifest: GetSingleManifest(state),
    memberService: {
      hash: state.memberService.hash,
      name: state.memberService.name,
    },
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId, current) => {
      SetEngageForChat(chatId, current);
    }
  }
}

const ManifestHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestSm);

export default ManifestHeader;
