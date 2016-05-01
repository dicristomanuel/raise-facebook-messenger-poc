export const isBot = (text) => {
  console.log("in ISBOT");
  return isGreeting(text) || isGiftcard(text);
};

export const matchAnswer = (text) => {
  const context = isGreeting(text) ? 'greetings' : 'giftcard';

  

  if (context === 'greetings') {
    // TODO: return `Hello ${name}, how can I help you today?`;
    return `Hello, how can I help you today?`;
  } else if (context === 'giftcard') {
    return 'This is what we have available';
  }
};

const isGreeting = (text) => {
  return !!text.toLowerCase().match('^(hello|hi|hey|hola|howdy|good morning|good evening|good afternoon)(.?)$', 'i');
};

const isGiftcard = (text) => {
  return !!text.toLowerCase().match('^(giftcard)(.?)$', 'i');
};

const isBrand = (text) => {
  return !!text.toLowerCase().match('^(walmart|target|home depot|macy|macy\'s|kmart)(.?)$', 'i');
};
