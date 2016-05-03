import { fbToken } from './tokens';
import request from 'request';

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
      }, (error, response, payload) => {
        if (error) {
          reject(error);
        } else if (response.body.error) {
          reject(response.body.error);
        } else {
          resolve(text);
        }
      });
    });
  };

  const formatObject = (object, sender) => {
    const parsed = JSON.parse(object);
    return {
      firstName: parsed.first_name,
      lastName: parsed.last_name,
      profilePic: parsed.profile_pic,
      sender
    };
  };
