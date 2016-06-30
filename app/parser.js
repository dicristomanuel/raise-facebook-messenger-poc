import Chat from '../db/chat';
import { GetProfile } from '../messenger/api';
import Prism from '../prism/prism';
import States from '../prism/states/config';
import { Consumer } from '../data/appConstants';
import Talkback from '../bot/talkback';
import Contexts from '../bot/config';

let configured = false;

const configModules = chat => {
  Prism.create(States);
  Talkback.create(Contexts, {userName: chat.firstName}, `${chat.firstName}, let me find someone for you.`);
}

const createChat = (data) => {
  const { sender } = data;
  GetProfile(sender).then(Chat.create)
  .then(prismInit(data));
};

const prismInit = data => chat => {
  if (chat) {
    configured ? null : configModules(chat);
    configured = true;
    return Prism.next({ chat, ...data, state: chat.state});
  } else {
    createChat(data);
  }
};

export default (data) => {
  const { sender, userType, chatId } = data;
  if (userType === Consumer)
  Chat.find(sender)
  .then(prismInit(data))
  else
  return Chat.findById(chatId)
  .then(prismInit(data));
};
