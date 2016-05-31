import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';

let cached;

const init = (sender, data) => {
  return GetProfile(sender).then(Chat.create)
  .then((chat) => {
    cached = chat; 
    Prism.create(States);
    return Prism.next({ chat, ...data, state: chat.state});
  });
};

const next = (data) => {
  const { chat } = data;
  return Prism.next({ chat, ...data, state: chat.state});
};

export const Parser = (data) => {
  const { sender } = data;
  return cached ? next({...data, chat: cached}) : init(sender, data);
};
