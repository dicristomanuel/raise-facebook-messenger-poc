import { botWords, botGreetings, botBrands } from './constants';

export const isBot = (text) => {
  if (!!text.toLowerCase().match(`^(${botWords})(.?)$`, 'i'))
  return true;
  else
  return false;
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);

  const brand = context === 'brands' ? getBrandName(text) : null;

  if (context === 'greetings')
  return `Hello ${name}, how can we help you today?`;
  else if (context === 'brands')
  return `This is what we have available for ${brand}`;
};

const setContext = (text) => {
  if (text.toLowerCase().match(`^(${botGreetings})(.?)$`, 'i'))
  return 'greetings';
  else if (text.toLowerCase().match(`^(${botBrands})(.?)$`, 'i'))
  return 'brands';
};

const getBrandName = (text) => {
  return text.toLowerCase().match(`^(${botBrands})(.?)$`, 'i')[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};
