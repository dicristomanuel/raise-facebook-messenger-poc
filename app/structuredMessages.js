import all from '../bot/identities/all';

export const GiftcardMessage = (data) => {
  const { brand, value, category } = data;
  // if category then select 3 brands related to that category
  let brandStripped = brand.replace(/ +/g, '');
  let brandUpper = brandStripped.toUpperCase();
  // brand identity
  debugger;
  console.log(all.target);

  // const brandsForCategory = {
  //   'electronic': ['bestbuy']
  // }

  // const giftcardMessageBody =

  // {
  //   "title":`${brandUpper} $${value} Giftcard`,
  //   "image_url":`${imageBrands[brandStripped]}`,
  //   "subtitle":`for only $${value - 10}`,
  //   "buttons":[
  //     {
  //       "type":"web_url",
  //       "url":"https://27641c48.ngrok.io",
  //       "title":"Buy Giftcard"
  //     }
  //   ]
  // },
  const imageBrands = {
    'target': 'http://www.logospike.com/wp-content/uploads/2014/11/Target_logo-6.png',
    'lowe\'s': 'https://pbs.twimg.com/profile_images/687659097848676352/5jkBRMpC.png',
    'walmart': 'http://www.wpaperhd.com/uploads/originals/2016/02/23/walmart-logo-B14N.jpg',
    'homedepot': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/2000px-TheHomeDepot.svg.png',
    'macys': 'http://logonoid.com/images/macys-logo.png',
    'tacobell': 'http://www.logospike.com/wp-content/uploads/2014/11/Taco_bell_logo-3.jpg',
    'wholefoods': 'http://www.snacknation.com/wp-content/uploads/2015/11/Whole-Foods-logo.png'
  }

  if (value)
  return {"attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
        {
          "title":`${brandUpper} $${value} Giftcard`,
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":`for only $${value - 10}`,
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
        {
          "title":`${brandUpper} $${value} Giftcard`,
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":`for only $${value - 10}`,
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
        {
          "title":`${brandUpper} $${value} Giftcard`,
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":`for only $${value - 10}`,
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
      ]
    }
  }
}
else {
  return { "attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
        {
          "title":"LOWES $100 Giftcard",
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":"for only $80.91",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
        {
          "title":"LOWES $50 Giftcard",
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":"for only $80.91",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
        {
          "title":"LOWES $100 Giftcard",
          "image_url":`${imageBrands[brandStripped]}`,
          "subtitle":"for only $80.91",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://27641c48.ngrok.io",
              "title":"Buy Giftcard"
            }
          ]
        },
      ]
    }
  }
}}};
