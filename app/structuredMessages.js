import Ids from '../bot/identities/all';

export const GiftcardMessage = (data) => {
  const { brand, value, category } = data;
  let brandStripped = brand.replace(/ +/g, '');
  let brandUpper = brandStripped.toUpperCase();

  const bodyMessgeForCategory = (category, value) => {
    debugger;
    let result = [];
    Ids.filter(id => id.categories.includes(category))
    .slice(0,3).forEach(brand => {
      result.push({
        "title":`${brand.brandNameUpper} $${value} Giftcard`,
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
    });
    return result;
  }

  const bodyMessageForValue = (brand, value) => {
    const times = 3;
    let result = [];
    const id = Ids.filter(id => id.variants.includes(brand))[0];
    for(var i=0; i < times; i++){
      debugger;
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

  if (category)
  return {"attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements": bodyMessgeForCategory(category, value)
      }
    }
  }
  else if (value) {
    debugger;
    console.log(bodyMessageForValue(brand, value));
    return {"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements": bodyMessageForValue(brand, value)
        }
      }
    }
  } else {
    const id = Ids.filter(id => id.variants.includes(brand))[0];
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
