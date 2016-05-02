import { Chat } from './dbConfig';
import { getProfile } from '../messenger';

export default {
  create: (userData) => {
    return Chat.create(userData);
  },

  find: (sender) => {
    return Chat.findOne({where: { sender }});
  }
};
