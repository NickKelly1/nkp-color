const REGEX_RGBA_NUMBERS_SPACES = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s+'     // red
      + '(\\d{1,3})' + '\\s+'   // green
      + '(\\d{1,3})' + '\\s+'   // blue
    // decimal absolute or percentage, preceeded by , or /
      + '(?:'
        + '\\s*/\\s*'      // separator between rgb & alpha
        + '('
          + '\\d+'            // integral
          + '(?:\\.\\d+)?'  // decimal
          + '%?'            // optional %
        + ')'
      + ')'
    + ')',
  length: 4,
  // all: 0,
  red: 0,
  green: 1,
  blue: 2,
  alpha: 3,
};

const REGEX_RGBA_SPACES = {
  // rgba with commas
  str:
    '(?:'
      + 'rgba\\(\\s*'
        + REGEX_RGBA_NUMBERS_SPACES.str
      + '\\s*\\)'
    + ')'
  ,
  length: REGEX_RGBA_NUMBERS_SPACES.length,
  // all: 0,
  red: REGEX_RGBA_NUMBERS_SPACES.red,
  green: REGEX_RGBA_NUMBERS_SPACES.green,
  blue: REGEX_RGBA_NUMBERS_SPACES.blue,
  alpha: REGEX_RGBA_NUMBERS_SPACES.alpha,
};


const match = 'rgba(10 10 10 / 25)'.match(new RegExp(REGEX_RGBA_SPACES.str, 'i'));
console.log(match);
