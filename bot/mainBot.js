import { bot } from './botConstants';

const textMatch = (text, context) => {
  return text.toLowerCase().match(`(${context})`, 'i');
};

const setContext = (text) => {
  let result = '';
  bot.contexts.forEach((context) => {
    if (!!textMatch(text, bot[context]) && !!textMatch(text, bot[context])[0]) {
      result = context;
    }
  });
  return result;
};

const getBrandName = (text) => {
  return textMatch(text, bot.brands)[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

const getCategoryName = (text) => {
  return textMatch(text, bot.categories)[1];
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);
  const brand = context === 'brands' ? getBrandName(text) : null;
  const category = context === 'categories' ? getCategoryName(text) : null;
  // follow same for categories
  if (context === 'greetings')
  return `Hi ${name}, would you like to browse giftcards or get assistance?`;
  else if (context === 'brands')
  return `These are the best deals for ${brand}`;
  else if (context === 'giftcards')
  return 'What brand or category are you interested in?';
  else if (context === 'categories')
  return `These are the options for ${category}`;
  else if (context === 'positives')
  return `Aww! Thank you ${name}! :)`;
  else if (context === 'negatives')
  return 'I\'m sorry to hear that :(';
  else if (context === 'farewell')
  return 'Good talking to you!';
  else
  return 'Let me find someone for you.';
};
