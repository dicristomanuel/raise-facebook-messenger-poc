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
    return Prism.next(chat.state, { chat, ...data });
  });
};

const next = (data) => {
  return Prism.next(cached.state, { chat: cached, ...data });
};

export const Parser = (data) => {
  const { sender } = data;
  return cached ? next(data) : init(sender, data);
};
