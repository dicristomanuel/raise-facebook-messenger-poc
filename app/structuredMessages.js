export const giftcardMessage = {
  "attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
        {
          "title":"LOWES $100 Giftcard",
          "image_url":"https://pbs.twimg.com/profile_images/687659097848676352/5jkBRMpC.png",
          "subtitle":"for only $90",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
              "title":"Buy Giftcard"
            }
          ]
        },
        {
          "title":"LOWES $50 Giftcard",
          "image_url":"https://pbs.twimg.com/profile_images/687659097848676352/5jkBRMpC.png",
          "subtitle":"for only $45",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
              "title":"Buy Item"
            }
          ]
        }
      ]
    }
  }
};
