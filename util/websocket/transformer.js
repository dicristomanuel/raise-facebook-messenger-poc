export const TransformSocket = data => {
  let chats = [];
  for (let chat of data) {
    let { id, firstName, lastName, profilePic, busy, active, solved } = chat.dataValues;
    chats.push({
      chatId: id,
      name: `${firstName} ${lastName}`,
      profilePic,
      busy,
      active,
      solved
    });
  }
  return chats;
};
