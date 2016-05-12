export const transform = data => {

  let chats = [];

  for (let chat of data) {
    let { id, firstName, lastName, profilePic, busy } = chat;
    chats.push({
      id,
      firstName,
      lastName,
      profilePic,
      busy
    });
  }

  return chats;
};
