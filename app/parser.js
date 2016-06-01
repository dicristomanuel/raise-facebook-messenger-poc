import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';
import { Consumer } from '../data/appConstants';

let cached;

const prismInit = data => chat => {
  cached = chat;
  Prism.create(States);
  return Prism.next({ chat, ...data, state: chat.state});
};

const init = (data) => {
  const { sender, userType, chatId } = data;
  if (userType === Consumer)
  return GetProfile(sender).then(Chat.create)
  .then(prismInit(data));
  else
  return Chat.findById(chatId)
  .then(prismInit(data));
};

const execute = (data) => {
  return Prism.next({ ...data, state: data.chat.state});
};

export default (data) => {
  return cached ? execute({...data, chat: cached}) : init(data);
};
