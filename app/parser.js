import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';
import { Consumer } from '../data/appConstants';

const createChat = (data) => {
  const { sender } = data;
  GetProfile(sender).then(Chat.create)
  .then(prismInit(data));
};

const prismInit = data => chat => {
  if (chat) {
    Prism.create(States);
    return Prism.next({ chat, ...data, state: chat.state});
  } else {
    createChat(data);
  }
};

const init = (data) => {
  const { sender, userType, chatId } = data;
  if (userType === Consumer)
  Chat.find(sender)
  .then(prismInit(data))
  else
  return Chat.findById(chatId)
  .then(prismInit(data));
};

export default (data) => {
  return init(data);
};
