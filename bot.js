import { botWords, botGreetings, botBrands } from './constants';

export const isBot = (text) => {
  if (!!text.toLowerCase().match(`^(${botWords})(.?)$`, 'i'))
  return true;
  else
  return false;
};

const textMatch = (text, context) => {
  return text.toLowerCase().match(`^(${context})(.?)$`, 'i');
};

const setContext = (text) => {
  if (textMatch(text, botGreetings))
  return 'greetings';
  else if (textMatch(text, botBrands))
  return 'brands';
};

const getBrandName = (text) => {
  return text.toLowerCase().match(`^(${botBrands})(.?)$`, 'i')[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);

  const brand = context === 'brands' ? getBrandName(text) : null;

  if (context === 'greetings')
  return `Hi ${name}, would you like to browse giftcards or get assistance?`;
  else if (context === 'brands')
  return `This is what we have available for ${brand}`;
};
