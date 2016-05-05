import {bot, botWords} from './botConstants';

export const isBot = (text) => {
  if (!!text.toLowerCase().match(`^(${botWords})(?:y|ies|s)?(?:e?s)?(.?)$`, 'i'))
  return true;
  else
  return false;
};

const textMatch = (text, context) => {
  return text.toLowerCase().match(`^(${context})(?:y|ies|s)?(?:e?s)?(.?)$`, 'i');
};

const setContext = (text) => {
  if (textMatch(text, bot.greetings))
  return 'greetings';
  else if (textMatch(text, bot.brands))
  return 'brands';
  else if (textMatch(text, bot.giftcards))
  return 'giftcards';
  else if (textMatch(text, bot.categories))
  return 'categories';
  else if (textMatch(text, bot.positives))
  return 'positives';
  else if (textMatch(text, bot.negatives))
  return 'negatives';
};

const getBrandName = (text) => {
  debugger;
  return textMatch(text, bot.brands)[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);
  const brand = context === 'brands' ? getBrandName(text) : null;
  debugger;
  if (context === 'greetings')
  return `Hi ${name}, would you like to browse giftcards or get assistance?`;
  else if (context === 'brands')
  return `This is what we have available for ${brand}`;
  else if (context === 'giftcards')
  return 'What brand or category are you interested in?';
  else if (context === 'categories')
  return `These are the options for ${text}`;
  else if (context === 'positives')
  return `Aww! Thank you ${name}! :)`;
  else if (context === 'negatives')
  return `I'm sorry to hear that :(`;
};



// let me find someone to help you right away
