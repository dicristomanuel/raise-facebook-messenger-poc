import { bodyMessgeForCategory, bodyMessageForValue, bodySimpleMessage } from './structuredMessagesHelper';
import Entities from '../bot/entities/all';

export const GiftcardMessage = data => {
  const { brand, value, category } = data;

  const parseBrand = brand => {
    return brand.toLowerCase().replace(/[\'\s\\']/g, '');
  };

  if (category) {
    return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements": bodyMessgeForCategory(category)
      }
    }}
  } else if (value) {
    return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements": bodyMessageForValue(parseBrand(brand), value)
      }
    }}
  } else {
    const entityBrand = Entities.filter(entity => entity.variants.includes(parseBrand(brand)))[0];
    return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          bodySimpleMessage(entityBrand),
          bodySimpleMessage(entityBrand),
          bodySimpleMessage(entityBrand)
        ]
      }
    }
  }}
};
