import { botWords, botGreetings, botBrands } from './constants';

export class Bot {
  constructor(text) {
    this.text = text;
    this.context = setContext(this.text);
  }

  get Context() {
    return this.context;
  }
}

export const isBot = (text) => {
  return !!text.toLowerCase().match(`^(${botWords})(.?)$`, 'i');
};

const setContext = (text) => {
    if (text.toLowerCase().match(`^(${botGreetings})(.?)$`, 'i')) {
      return 'greetings';
    } else if (text.toLowerCase().match(`^(${botBrands})(.?)$`, 'i')) {
      return 'brands';
    }
  };
