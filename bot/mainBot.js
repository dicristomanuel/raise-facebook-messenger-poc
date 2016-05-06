import { bot } from './botConstants';

const textMatch = (text, context) => {
  return text.toLowerCase().match(`^(${context})(?:y|ies|s)?(?:e?s)?(.?)$`, 'i');
};

const setContext = (text) => {
  for (let context in bot.contexts) {
    if (textMatch(text, bot[bot.contexts[context]]))
    return bot.contexts[context];
  }
};

const getBrandName = (text) => {
  return textMatch(text, bot.brands)[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);
  debugger;
  const brand = context === 'brands' ? getBrandName(text) : null;
  // follow same for categories
  if (context === 'greetings')
  return `Hi ${name}, would you like to browse giftcards or get assistance?`;
  else if (context === 'brands')
  return `These are the best deals for ${brand}`;
  else if (context === 'giftcards')
  return 'What brand or category are you interested in?';
  else if (context === 'categories')
  return `These are the options for ${text}`;
  else if (context === 'positives')
  return `Aww! Thank you ${name}! :)`;
  else if (context === 'negatives')
  return `I'm sorry to hear that :(`;
  else
  return 'Let me find someone for you.';
};
