export const transform = (data) => {
  const { text, sender, userType } = data;
  const send = userType === 'member_service' ? true : false;

  return{
    text,
    sender,
    userType,
    firstName: null,
    answer: null,
    send
  };
};
