import Chat from '../db/chat';
import { GetProfile } from './messenger';
import { CallNextState } from './stateMachine';
import Prism from './prism';
import States from './states/config';


const parserInit = (sender) => {
  return Chat.find(sender)
  .then((chat) => {
    return chat || GetProfile(sender).then(Chat.create);
  });
};

export const Parser = (data) => {
  const { sender } = data;
  return parserInit(sender)
  .then((chat) => {
    const initialState = {...data, chat, switchState: false};
    Prism.create(States);
    Prism.botReceive.switch('newState');
    // return CallNextState({...data, chat, switchState: false});
  });
};
