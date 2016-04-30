export const isBot = (text) => {
  return isGreeting(text) || isGiftcard(text)
}

export const matchAnswer = (text) => {
  const context = isGreeting(text) ? 'greetings' : 'brand'
  if (context === 'greetings') {
    return 'Hello, how can I help you today?'
  } else if (context === 'brand') {
    return 'This is what we have available'
  }
}

const isGreeting = (text) => {
  return !!text.match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)')
}

const isGiftcard = (text) => {
  return !!text.match('(walmart|target|home depot|macy|kmart|giftcard|giftcards)(\\s|!|\\.|$)')
}
