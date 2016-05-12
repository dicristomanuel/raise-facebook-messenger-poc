import { bot } from './botConstants';

const textMatch = (text, context) => {
  return text.match(`(${context})`, 'i');
};

const setContext = text => {
  let result = '';
  bot.contexts.forEach(context => {
    if (!!textMatch(text, bot[context]) && !!textMatch(text, bot[context])[0])
    result = context;
  });
  return result;
};

const getBrandName = text => {
  return textMatch(text, bot.brands)[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

const getCategoryName = text => {
  return textMatch(text, bot.categories)[1];
};

const getAnswer = (context, name, brand, category) => {
  switch (context) {
    case 'greetings':
      return `Hi ${name}, would you like to browse giftcards or get assistance?`;
    case 'brands':
      return `These are the best deals for ${brand}`;
    case 'giftcards':
      return 'What brand or category are you interested in?';
    case 'categories':
      return `These are the options for ${category}`;
    case 'positives':
      return `Aww! Thank you ${name}! :)`;
    case 'negatives':
      return 'I\'m sorry to hear that :(';
    case 'farewell':
      return 'Good talking to you!';
    default:
      return `${name}, let me find someone for you.`;
  }
};

export const matchAnswer = (text, name) => {
  const context = setContext(text);
  const brand = context === 'brands' ? getBrandName(text) : null;
  const category = context === 'categories' ? getCategoryName(text) : null;
  const answer = getAnswer(context, name, brand, category);
  return {answer, brand};
};
