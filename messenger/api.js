import { FbToken } from '../app/tokens';
import request from 'request';

const formatObject = (object, sender) => {
  const parsed = JSON.parse(object);
  return {
    firstName: parsed.first_name,
    lastName: parsed.last_name,
    profilePic: parsed.profile_pic,
    sender
  };
};

export const GetProfile = sender => {
  return new Promise((resolve, reject) => {
    request(`https://graph.facebook.com/v2.6/${sender}?fields=first_name,last_name,profile_pic&access_token=${FbToken}`,
      (error, response, body) => {
        if (!error && response.statusCode == 200)
        resolve(formatObject(body, sender));
        else
        reject(error);
      });
    });
  };

  export const SendMessage = (sender, text) => {
    const messageData = { text };
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:FbToken},
        method: 'POST',
        json: {
          recipient: {id:sender},
          message: messageData,
        }
      }, (error, response) => {
        if (error)
        reject(error);
        else if (response.body.error)
        reject(response.body.error);
        else
        resolve(text);
      });
    });
  };

  export const SendGiftcards = (sender, giftcardMessage) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:FbToken},
        method: 'POST',
        json: {
          recipient: {id:sender},
          message: giftcardMessage,
        }
      }, (error, response) => {
        if (error)
        reject(error);
        else if (response.body.error)
        reject(response.body.error);
        else
        resolve(giftcardMessage);
      });
    });
  };
