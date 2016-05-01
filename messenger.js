import { fbToken } from './tokens'
import request from 'request'

export const grabProfile = (sender) => {
  return new Promise((resolve, reject) => {
    request(`https://graph.facebook.com/v2.6/${sender}?fields=first_name,last_name,profile_pic&access_token=${fbToken}`,
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(formatObject(body));
        } else {
          reject(error);
        }
      });
    });
  }

  const formatObject = (object) => {
    const parsed = JSON.parse(object);
    return {
      firstName: parsed["first_name"],
      lastName: parsed["last_name"],
      profilePic: parsed["profile_pic"]
    }
  }
