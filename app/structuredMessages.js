import Entities from '../bot/entities/all';
import Pluralize from 'pluralize';

export const GiftcardMessage = data => {
  const { brand, value, category } = data;

  const parseBrand = (brand) => {
    return brand.toLowerCase().replace(/[\'\s\\']/g, '');
  };

  const bodyMessgeForCategory = category => {
    let result = [];
    Entities.filter(entity => entity.categories.includes(Pluralize(category, 1)))
    .slice(0,3).forEach(brand => {
      result.push({
        "title":`${brand.nameUpperCase}`,
        "image_url":`${brand.imageUrl}`,
        "subtitle":`type ${brand.name} to browse giftcards`
      })
    });
    return result;
  };

  const bodyMessageForValue = (brand, value) => {
    const times = 3;
    let result = [];
    const brand = Entities.filter(entity => entity.variants.includes(brand))[0];
    for(var i=0; i < times; i++){
      result.push({
        "title":`${brand.nameUpperCase} $${value} Giftcard`,
        "image_url":`${brand.imageUrl}`,
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
    return result;
  };

  const bodySimpleMessage = brand =>
    {
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
    };

  if (category) {
  return {"attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements": bodyMessgeForCategory(category)
      }
    }
  }
} else if (value)
    return {"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements": bodyMessageForValue(parseBrand(brand), value)
        }
      }
    }
  else {
    const brand = Entities.filter(brand => brand.variants.includes(parseBrand(brand)))[0];
    return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          bodySimpleMessage(brand);
          bodySimpleMessage(brand);
          bodySimpleMessage(brand);
         ]
      }
    }
  }}
};
