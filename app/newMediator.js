import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';

let chat;

const createChat = (sender) => {
  return GetProfile(sender).then(Chat.create);
};

export const Parser = (data) => {
  const { sender } = data;
  if (chat)
  return Prism.next(chat.state, {...chat, ...data});
  else
  return createChat(sender)
  .then((chat) => {
    Prism.create(States);
    return Prism.next(chat.state, {...chat, ...data});
  });
};
