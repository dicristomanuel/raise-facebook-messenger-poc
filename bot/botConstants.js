import Greetings from './greetings';
import Brands from './brands';
import Giftcards from './giftcards';
import Categories from './categories';
import Positives from './positives';
import Negatives from './negatives';
import Farewell from './farewell';

export const Bot = {
  Greetings,
  Brands,
  Giftcards,
  Categories,
  Positives,
  Negatives,
  Farewell,
  contexts: [
             'Negatives',
             'Positives',
             'Farewell',
             'Greetings',
             'Giftcards',
             'Categories',
             'Brands'
            ]
};
