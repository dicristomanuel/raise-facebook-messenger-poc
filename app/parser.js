/*
  1- parser
      a- checks if chat exists and return current state
      b- call next state for current state (e.i. closeBot >> openBot, MsReceiveFromBot >> open MsSends) with params
  2- state exectutes and closes ** BACKTO 1
  3- state exectutes and switches to new given state (with params) and then closes ** BACKTO 1
*/

/*
  RULES - always returns chat except for parser that returns next state (main element for the file - call file with its name)
          helper always have name of function helped
*/

/*
  TODO - create interface for functions
  Parser sender:integer text:text
  parserNextState
  TYPESCRIPT && HOTRELOAD
*/


import Chat from '../db/chat';
import { GetProfile } from './messenger';
import { State } from './stateMachine';

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
    return State[chat.state]({...data, chat});
  });
};
