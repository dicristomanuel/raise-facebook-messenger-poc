export const Transform = data => {
  const { text, sender, userType } = data;

  return {
    text,
    sender,
    userType,
    firstName: null,
    answer: null
  };
};
