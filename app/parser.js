import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';
import { Consumer } from '../data/appConstants';

let cached;

const prismInit = data => chat => {
  debugger;
  cached = chat;
  Prism.create(States);
  return Prism.next({ chat, ...data, state: chat.state});
};

const createChat = (data) => {
  const { sender } = data;
  GetProfile(sender).then(Chat.create)
  .then(prismInit(data));
};

const init = (data) => {
  const { sender, userType, chatId } = data;
  if (userType === Consumer)
  Chat.find(sender)
  .then((chat) => {
    chat ? prismInit({ ...data, chat }) : createChat(data)
  });
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
