export const TransformSocket = data => {
  let chats = [];

  if (data.dataValues) {
    let { id, firstName, lastName, profilePic, busy, active, solved } = data.dataValues;
    chats.push({
      id,
      firstName,
      lastName,
      profilePic,
      busy,
      active,
      solved
    });
  } else {
    for (let chat of data) {
      let { id, firstName, lastName, profilePic, busy, active, solved } = chat;
      chats.push({
        id,
        firstName,
        lastName,
        profilePic,
        busy,
        active,
        solved
      });
    }
  }

  return chats;
};
