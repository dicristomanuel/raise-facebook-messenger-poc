import constant from './constants';

// const socket = window.io();
const callbacks = {};
// let id;

const delegateEvent = (event, data) => {
  if(callbacks.hasOwnProperty(event)) {
    callbacks[event].forEach((callback) => {
      callback(data);
    });
  }
};

const onInitialData = (data) => {
  delegateEvent(constant.INITIAL_DATA, data);
};

const initBindings = () => {};

export const init = () => {
  // ...
};

export const subscribe = (event, callback) => {
  callbacks[event] = callbacks[event] || [];
  callbacks[event].push(callback);
  return `${event}·${callbacks[event].length - 1}`;
};

export const unsubscribe = (token) => {
  let [event, idx] = token.split('·');
  idx = parseInt(idx, 10);
  callbacks[event] = callbacks[event].splice(idx, 1);
};

export default {
  subscribe,
  unsubscribe,
  init,
};
