import Bubble from '../../../db/bubble';
import { Bot } from '../../../data/appConstants';

export const OnMs = (data) => {
  debugger;
  const { chat, text, userType, answer } = data;
  if (answer)
  Bubble.create([
                  { chatId: chat.id, text, userType },
                  { chatId: chat.id, text: answer, userType: Bot }
                ]);
  else
  Bubble.create([{ chatId: chat.id, text, userType }]);
  return data;
};
