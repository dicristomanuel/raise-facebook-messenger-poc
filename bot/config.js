import Constants from './constants';
import Pluralize from 'pluralize';
import Her from './her';

const greetingRules = data => {
  const { text, options, match } = data;
  if (text.length <= 30) {
    return { answer: `Hi ${options.userName}, would you like to browse giftcards or get assistance?` };
  }
  else return false;
};

const giftcardsRules = data => {
  const { text } = data;
  if (text.length <= 50) return { answer: 'What brand or category are you interested in?' };
  else return false;
};

const upperCase = (brand) => {
  return brand.replace(/\w\S*/g, function(text){return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()});
}

const brandsRules = data => {
  const { text, match } = data;
  const value = match.filter(string => parseInt(string))
  const brand = match.filter(string => !parseInt(string))
  if (brand.length > 1)
  return { answer: 'Please type one brand at the time' };
  else if (text.length <= 70 && !!value.length)
  return { answer: `These are the giftcards available in the $${value[0]} range for ${upperCase(brand[0])}`.replace(/  +/g, ' '), brand: brand[0], value: value[0] };
  else if (text.length <= 70)
  return { answer: `These are the best deals for ${upperCase(match[0])}`, brand: match[0] };
  else
  return false;
};

const categoriesRules = data => {
  const { text, match, category } = data;
  if (match.length > 1)
  return { answer: 'Please type one category at the time' };
  else if (text.length <= 70)
  return { answer: `You can find ${Pluralize(match[0].toLowerCase())} at the following stores`, category: match[0] };
};

const positivesRules = data => {
  const { text, options } = data;
  if (text.length <= 30)
  return { answer: `Aww! Thank you ${options.userName}! :)` };
};

const negativesRules = data => {
  const { text, options } = data;
  if (text.length <= 30)
  return { answer: 'I\'m sorry to hear that :(' };
};

const farewellsRules = data => {
  const { text, options } = data;
  if (text.length <= 30)
  return { answer: 'Good talking to you!' };
};

export default {
  contexts: [
    {
      name: 'brands',
      words: Constants.Brands,
      rules: brandsRules,
    },
    {
      name: 'categories',
      words: Constants.Categories,
      rules: categoriesRules,
    },
    {
      name: 'giftcards',
      words: Constants.Giftcards,
      rules: giftcardsRules,
    },
    {
      name: 'greetings',
      words: Constants.Greetings,
      rules: greetingRules,
    },
    {
      name: 'positives',
      words: Constants.Positives,
      rules: positivesRules,
    },
    {
      name: 'farewell',
      words: Constants.Farewell,
      rules: farewellsRules,
    },
    {
      name: 'negatives',
      words: Constants.Negatives,
      rules: negativesRules,
    },
  ],
};
