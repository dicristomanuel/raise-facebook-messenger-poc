import greetings from './greetings';
import brands from './brands';
import giftcards from './giftcards';
import categories from './categories';
import positives from './positives';
import negatives from './negatives';
import farewell from './farewell';

export const Bot = {
  greetings,
  brands,
  giftcards,
  categories,
  positives,
  negatives,
  farewell,
  contexts: [
             'negatives',
             'positives',
             'farewell',
             'giftcards',
             'greetings',
             'categories',
             'brands'
            ]
};
