import Ids from '../bot/identities/all';
import Pluralize from 'pluralize';
export const GiftcardMessage = (data) => {
  const { brand, value, category } = data;
  const parseBrand = (brand) => {
    return brand.toLowerCase().replace(/\s/g, '');
  };

  const bodyMessgeForCategory = category => {
    let result = [];
    Ids.filter(id => id.categories.includes(Pluralize(category, 1)))
    .slice(0,3).forEach(brand => {
      result.push({
        "title":`${brand.brandNameUpper}`,
        "image_url":`${brand.imageUrl}`,
        "subtitle":`type ${brand.brandName} to browse giftcards`
      })
    });
    return result;
  }

  const bodyMessageForValue = (brand, value) => {
    const times = 3;
    let result = [];
    const id = Ids.filter(id => id.variants.includes(brand))[0];
    for(var i=0; i < times; i++){
      result.push({
        "title":`${id.brandNameUpper} $${value} Giftcard`,
        "image_url":`${id.imageUrl}`,
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
  }

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
    const id = Ids.filter(id => id.variants.includes(parseBrand(brand)))[0];
    return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
             "title":`${id.brandNameUpper} $45 giftcard`,
             "image_url":`${id.imageUrl}`,
             "subtitle":"for only $37",
             "buttons":[
               {
                 "type":"web_url",
                 "url":"https://www.raise.com/",
                 "title":"View Item"
               }
             ]
           },
           {
             "title":`${id.brandNameUpper} $45 giftcard`,
             "image_url":`${id.imageUrl}`,
             "subtitle":"for only $37",
             "buttons":[
               {
                 "type":"web_url",
                 "url":"https://www.raise.com/",
                 "title":"View Item"
               }
             ]
           },
           {
             "title":`${id.brandNameUpper} $45 giftcard`,
             "image_url":`${id.imageUrl}`,
             "subtitle":"for only $37",
             "buttons":[
               {
                 "type":"web_url",
                 "url":"https://www.raise.com/",
                 "title":"View Item"
               }
             ]
           }
         ]
      }
    }
  }}
};
