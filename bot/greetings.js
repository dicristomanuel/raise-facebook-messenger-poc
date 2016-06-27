export default
[
  'hello',
  'hi',
  'hey',
  'hola',
  'howdy',
  'good morning',
  'good evening',
  'good afternoon',
  'what[^ ]* up',
  'sup',
  'how are you'
].join('|');

var re = /\w+/;
new RegExp('\\b(hi|hey)\\b');
