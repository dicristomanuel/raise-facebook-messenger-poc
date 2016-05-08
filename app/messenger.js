import { fbToken } from '../data/tokens';
import request from 'request';
import { giftcardMessage } from './structuredMessages';

const formatObject = (object, sender) => {
  const parsed = JSON.parse(object);
  return {
    firstName: parsed.first_name,
    lastName: parsed.last_name,
    profilePic: parsed.profile_pic,
    sender
  };
};

export const getProfile = (sender) => {
  return new Promise((resolve, reject) => {
    request(`https://graph.facebook.com/v2.6/${sender}?fields=first_name,last_name,profile_pic&access_token=${fbToken}`,
      (error, response, body) => {
        if (!error && response.statusCode == 200)
        resolve(formatObject(body, sender));
        else
        reject(error);
      });
    });
  };

  export const sendMessage = (sender, text) => {
    const messageData = { text };
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:fbToken},
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

// will have brand
  export const sendGiftcards = (sender) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:fbToken},
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
        resolve('Success');
      });
    });
  };
