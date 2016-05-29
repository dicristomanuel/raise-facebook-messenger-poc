import Chat from '../db/chat';
import { GetProfile } from './messenger';
import Prism from '../prism/prism';
import States from '../prism/states/config';

let cached;

const createChat = (sender) => {
  return GetProfile(sender).then(Chat.create);
};

export const Parser = (data) => {
  const { sender } = data;
  if (cached) {
    return Prism.next(cached.state, { chat: cached, ...data });
  }
  else {
    return createChat(sender)
    .then((chat) => {
      cached = chat;
      Prism.create(States);
      return Prism.next(chat.state, { chat, ...data });
    });
  }
};
