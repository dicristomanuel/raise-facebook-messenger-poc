import { botWords, botGreetings, botBrands } from './constants';

export const isBot = (text) => {
  if (!!text.toLowerCase().match(`^(${botWords})(.?)$`, 'i')) {
      return true;
  }
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);
  if (context === 'greetings') {
    return `Hello ${name}, how can I help you today?`;
  } else if (context === 'giftcard') {
    return 'This is what we have available';
  }
};

const setContext = (text) => {
    if (text.toLowerCase().match(`^(${botGreetings})(.?)$`, 'i')) {
      return 'greetings';
    } else if (text.toLowerCase().match(`^(${botBrands})(.?)$`, 'i')) {
      return 'brands';
    }
  };
