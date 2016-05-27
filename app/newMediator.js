/*
  1- parser
      a- checks if chat exists and return current state
      b- call next state for current state (e.i. closeBot >> openBot, MsReceiveFromBot >> open MsSends) with params
  2- state exectutes and closes ** BACKTO 1
  3- state exectutes and switches to new given state (with params) and then closes ** BACKTO 1

  ToBuild:
    - parser
    - state next state
    - state flow
*/

/*
  RULES - always returns chat except for parser that returns next state (main element for the file - call file with its name)
          helper always have name of function helped
*/

/*
  TODO - create interface for functions
  ei. parser always takes sender:number and text:string
*/


import Chat from '../db/chat';
import { GetProfile } from './messenger';
import NextState from './nextState';


// STATE EXECUTE ===>



// <=== STATE EXECUTE


// PARSER ===>
const parserCreate = (sender) => {
  return Chat.find(sender)
  .then((chat) => {
    return chat || GetProfile(sender).then(Chat.create);
  });
};

const parserNextState = (main) => {
  const current = main.state;
  const next = NextState[current];
  window[next]();
};

export const Parser = (data) => {
  const { sender } = data;
  return parserCreate(sender)
  .then(parserNextState);
};
// <=== PARSER
