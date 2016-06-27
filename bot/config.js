import Context from './context';

const greetingRule = (text) => {
  debugger;
};

export default {
  contexts: [
    { name: 'greetings', data: Context.Greetings },
    { name: 'giftcards', data: Context.Giftcards },
  ]
  rules: [
    { forContext: 'greetings', data: greetingRule }
  ]
};
