export const formatMessage = (data) => {
  return new Promise((resolve, reject) => {
    const { text, sender, userType } = data;
    const send = userType === 'member_service' ? true : false

    resolve({
      text,
      sender,
      userType,
      send
    })
  })
};
