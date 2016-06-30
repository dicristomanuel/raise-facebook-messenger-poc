import Entities from '../bot/entities/all';
import Pluralize from 'pluralize';

export const bodyMessgeForCategory = category => {
  let bodyMessage = [];
  Entities.filter(entity => entity.categories.includes(Pluralize(category, 1)))
  .slice(0,3).forEach(brand => {
    bodyMessage.push({
      "title":`${brand.nameUpperCase}`,
      "image_url":`${brand.imageUrl}`,
      "subtitle":`type ${brand.name} to browse giftcards`
    })
  });
  return bodyMessage;
};

export const bodyMessageForValue = (brand, value) => {
  const times = 3;
  let bodyMessage = [];
  const entityBrand = Entities.filter(entity => entity.variants.includes(brand))[0];
  for(var i=0; i < times; i++){
    bodyMessage.push({
      "title":`${entityBrand.nameUpperCase} $${value} Giftcard`,
      "image_url":`${entityBrand.imageUrl}`,
      "subtitle":`for only $${value - 10}`,
      "buttons":[
        {
          "type":"web_url",
          "url":"https://www.raise.com/",
          "title":"Buy Giftcard"
        }
      ]
    })
  }
  return bodyMessage;
};

export const bodySimpleMessage = brand => {
  return {
    "title":`${brand.nameUpperCase} $45 giftcard`,
    "image_url":`${brand.imageUrl}`,
    "subtitle":"for only $37",
    "buttons":[
      {
        "type":"web_url",
        "url":"https://www.raise.com/",
        "title":"Buy Giftcard"
      }
    ]
  }
};
