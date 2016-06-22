import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ManifestSm from '../components/ManifestSm';
import GetSingleManifest from '../selectors/GetSingleManifest';
import { SetEngageForChat } from '../helpers/singleChatHelper';
import { AddFlashMessage } from '../actions';

const mapStateToProps = state => {
  return {
    manifest: GetSingleManifest(state),
    memberService: {
      hash: state.notifications.memberService.hash,
      name: state.notifications.memberService.name,
    },
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (chatId, current, status, dbState) => {
      if (dbState != 'ms')
      dispatch(AddFlashMessage('Can\'t engage'))
      else if (status == 'busy')
      dispatch(AddFlashMessage('Chat Busy'))
      else
      SetEngageForChat(chatId, current);
    }
  }
}

const ManifestHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestSm);

export default ManifestHeader;
