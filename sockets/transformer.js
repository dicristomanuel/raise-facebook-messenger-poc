export const TransformSocket = data => {
  let chats = [];
  if (data.length === true) {
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
  } else {
    const { id, firstName, lastName, profilePic, busy, active, solved } = data.dataValues;
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

  return chats;
};
