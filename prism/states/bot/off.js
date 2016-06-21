import { New_message, New_notification } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage, SendGiftcards } from '../../../app/messenger';
import { GiftcardMessage } from '../../../app/structuredMessages';

const containsBrand = (data) => {
  const { brand, sender, chat, io } = data;
  if (brand) {
    SendGiftcards(sender, brand)
    io.emit(`${New_message}${chat.id}`, GiftcardMessage.attachment.payload.elements[0].title)
  }
};

export const OffBot = (data) => {
  const { io, chat, toSocket, brand, sender, answer} = data;
  SendMessage(sender, answer);
  toSocket.forEach((message) => {
    const toEmit = Socket.message(message);
    io.emit(`${New_message}${chat.id}`, toEmit);
    io.emit(`${New_notification}${chat.id}`, toEmit);
  })
  containsBrand(data);
  return data;
}
