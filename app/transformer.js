const fromMessenger = (data) => {
  const { text, sender, userType } = data;
  return {
    text,
    sender,
    userType,
    firstName: null,
    answer: null,
    owner: 'facebook'
  };
};

const fromSocket = () => {};

export const Messenger = {
  transform: fromMessenger,
};

export const Socket = {
  transform: fromSocket,
};


// export const TransformSocket = data => {
//   let chats = [];
//   for (let chat of data) {
//     let { id, firstName, lastName, profilePic, busy, active, solved } = chat.dataValues;
//     chats.push({
//       chatId: id,
//       name: `${firstName} ${lastName}`,
//       profilePic,
//       busy,
//       active,
//       solved
//     });
//   }
//   return chats;
// };
