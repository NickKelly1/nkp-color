/* eslint-disable max-len */

const REGEX_HEX_6 = {
  str: '(?:'
    + '#'
    + '([a-f0-9]{2})'
    + '([a-f0-9]{2})'
    + '([a-f0-9]{2})'
    + '([a-f0-9]{2})?'
  + ')',
  length: 4,
  red: 0,
  green: 1,
  blue: 2,
  alpha: 3,
};

const REGEX_HEX_3 = {
  str: '(?:'
    + '#'
    + '([a-f0-9])'
    + '([a-f0-9])'
    + '([a-f0-9])'
    + '([a-f0-9])?'
  + ')',
  length: 4,
  red: 0,
  green: 1,
  blue: 2,
  alpha: 3,
};

const REGEX_RGBA_NUMBERS_COMMAS = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s*,\\s*'   // red
      + '(\\d{1,3})' + '\\s*,\\s*'  // green
      + '(\\d{1,3})' + '\\s*'       // blue
    // decimal absolute or percentage, preceeded by , or /
      + '(?:'
        + ',\\s*'      // separator between rgb & alpha
        + '('
          + '\\d+'          // integral
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

const REGEX_RGBA_COMMAS = {
  // rgba with commas
  str:
    '(?:'
      + 'rgba\\(\\s*'
        + REGEX_RGBA_NUMBERS_COMMAS.str
      + '\\s*\\)'
    + ')'
  ,
  length: REGEX_RGBA_NUMBERS_COMMAS.length,
  // all: 0,
  red: REGEX_RGBA_NUMBERS_COMMAS.red,
  green: REGEX_RGBA_NUMBERS_COMMAS.green,
  blue: REGEX_RGBA_NUMBERS_COMMAS.blue,
  alpha: REGEX_RGBA_NUMBERS_COMMAS.alpha,
};

const REGEX_RGBA_NUMBERS_SPACES = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s+'     // red
      + '(\\d{1,3})' + '\\s+'   // green
      + '(\\d{1,3})' + '\\s+'   // blue
    // decimal absolute or percentage, preceeded by , or /
      + '(?:'
        + '/\\s+'      // separator between rgb & alpha
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

const REGEX_RGB_NUMBERS_COMMAS = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s*,\\s*'  // red
      + '(\\d{1,3})' + '\\s*,\\s*'  // green
      + '(\\d{1,3})'                // blue
    + ')',
  length: 3,
  // all: 0,
  red: 0,
  green: 1,
  blue: 2,
};

const REGEX_RGB_COMMAS = {
  // rgba with commas
  str:
    '(?:'
      + 'rgb\\(\\s*'
        + REGEX_RGB_NUMBERS_COMMAS.str
      + '\\s*\\)'
    + ')'
  ,
  length: REGEX_RGB_NUMBERS_COMMAS.length,
  all: 0,
  red: REGEX_RGB_NUMBERS_COMMAS.red,
  green: REGEX_RGB_NUMBERS_COMMAS.green,
  blue: REGEX_RGB_NUMBERS_COMMAS.blue,
};

const REGEX_RGB_NUMBERS_SPACES = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s+'  // red
      + '(\\d{1,3})' + '\\s+'  // green
      + '(\\d{1,3})'                // blue
    + ')',
  length: 3,
  // all: 0,
  red: 0,
  green: 1,
  blue: 2,
};

const REGEX_RGB_SPACES = {
  // rgba with commas
  str:
    '(?:'
      + 'rgb\\(\\s*'
        + REGEX_RGB_NUMBERS_SPACES.str
      + '\\s*\\)'
    + ')'
  ,
  length: REGEX_RGB_NUMBERS_SPACES.length,
  // all: 0,
  red: REGEX_RGB_NUMBERS_SPACES.red,
  green: REGEX_RGB_NUMBERS_SPACES.green,
  blue: REGEX_RGB_NUMBERS_SPACES.blue,
};

export const REGEX_COLORS = {
  str:
    REGEX_HEX_6.str
    + '|'
    + REGEX_HEX_3.str
    + '|'
    + REGEX_RGBA_COMMAS.str
    + '|'
    + REGEX_RGBA_SPACES.str
    + '|'
    + REGEX_RGB_COMMAS.str
    + '|'
    + REGEX_RGB_SPACES.str
    + '|'
    + REGEX_RGBA_NUMBERS_COMMAS.str
    + '|'
    + REGEX_RGBA_NUMBERS_SPACES.str
    + '|'
    + REGEX_RGB_NUMBERS_COMMAS.str
    + '|'
    + REGEX_RGB_NUMBERS_SPACES.str
  ,
  captures: REGEX_HEX_6.length
    + REGEX_RGBA_COMMAS.length
    + REGEX_RGBA_SPACES.length
    + REGEX_RGB_COMMAS.length
    + REGEX_RGB_SPACES.length
    + REGEX_RGBA_NUMBERS_COMMAS.length
    + REGEX_RGBA_NUMBERS_SPACES.length
    + REGEX_RGB_NUMBERS_COMMAS.length
    + REGEX_RGB_NUMBERS_SPACES.length
  ,

  hex6_red: REGEX_HEX_6.red,
  hex6_green: REGEX_HEX_6.green,
  hex6_blue: REGEX_HEX_6.blue,
  hex6_alpha: REGEX_HEX_6.alpha,

  hex3_red: REGEX_HEX_6.length + REGEX_HEX_3.red,
  hex3_green: REGEX_HEX_6.length + REGEX_HEX_3.green,
  hex3_blue: REGEX_HEX_6.length + REGEX_HEX_3.blue,
  hex3_alpha: REGEX_HEX_6.length + REGEX_HEX_3.alpha,

  rgba_commas_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.red,
  rgba_commas_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.green,
  rgba_commas_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.blue,
  rgba_commas_alpha: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.alpha,

  rgba_spaces_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.red,
  rgba_spaces_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.green,
  rgba_spaces_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.blue,
  rgba_spaces_alpha: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.alpha,

  rgb_commas_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.red,
  rgb_commas_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.green,
  rgb_commas_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.blue,

  rgb_spaces_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.red,
  rgb_spaces_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.green,
  rgb_spaces_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.blue,

  rgba_numbers_commas_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.red,
  rgba_numbers_commas_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.green,
  rgba_numbers_commas_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.blue,
  rgba_numbers_commas_alpha: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.alpha,

  rgba_numbers_spaces_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.red,
  rgba_numbers_spaces_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.green,
  rgba_numbers_spaces_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.blue,
  rgba_numbers_spaces_alpha: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.alpha,

  rgb_numbers_commas_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.red,
  rgb_numbers_commas_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.green,
  rgb_numbers_commas_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.blue,

  rgb_numbers_spaces_red: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.red,
  rgb_numbers_spaces_green: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.green,
  rgb_numbers_spaces_blue: REGEX_HEX_6.length + REGEX_HEX_3.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.blue,
};
