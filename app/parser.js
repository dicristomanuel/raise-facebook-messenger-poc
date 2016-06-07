import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';
import { Consumer } from '../data/appConstants';

let cached;
// TODO: ask: should I cache? When changing status it keeps the old one in cache

const createChat = (data) => {
  const { sender } = data;
  GetProfile(sender).then(Chat.create)
  .then(prismInit(data));
};

const prismInit = data => chat => {
  if (chat) {
    cached = chat;
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

const execute = (data) => {
  debugger;
  return Prism.next({ ...data, state: data.chat.state});
};

export default (data) => {
  return cached ? execute({...data, chat: cached}) : init(data);
};
