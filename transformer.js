import { transformerErr } from './errors';

export const transform = (data) => {
  return new Promise((resolve, reject) => {
    const { text, sender, userType } = data;
    const send = userType === 'member_service' ? true : false;

    resolve({
      text,
      sender,
      userType,
      firstName: null,
      answer: null,
      send
    });

    reject(transformerErr);
  });
};
