/* eslint-disable max-len */


const REGEX_HEX = {
  str: '(?:'
    + '#'
    + '([a-f0-9]{2})'
    + '([a-f0-9]{2})'
    + '([a-f0-9]{2})'
    // + '([a-f0-9]{2})?'
  + ')',
  // length: 4,
  length: 3,
  // all: 0,
  red: 0,
  green: 1,
  blue: 2,
  // alpha: 3,
};

const REGEX_RGBA_NUMBERS_COMMAS = {
  // rgba with commas
  str:
    '(?:'
      + '(\\d{1,3})' + '\\s*,\\s*'   // red
      + '(\\d{1,3})' + '\\s*,\\s*'  // green
      + '(\\d{1,3})' + '\\s*'       // blue
    // decimal absolute or percentage, preceeded by , or /
      + '(?'
        + ':\\s*,\\s*'      // separator between rgb & alpha
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
      + '(?'
        + ':\\s*/\\s*'      // separator between rgb & alpha
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

const REGEX_COLORS = {
  str:
    REGEX_HEX.str
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
  captures: REGEX_HEX.length
    + REGEX_RGBA_COMMAS.length
    + REGEX_RGBA_SPACES.length
    + REGEX_RGB_COMMAS.length
    + REGEX_RGB_SPACES.length
    + REGEX_RGBA_NUMBERS_COMMAS.length
    + REGEX_RGBA_NUMBERS_SPACES.length
    + REGEX_RGB_NUMBERS_COMMAS.length
    + REGEX_RGB_NUMBERS_SPACES.length
  ,

  // hex_all: REGEX_HEX.all,
  hex_red: REGEX_HEX.red,
  hex_green: REGEX_HEX.green,
  hex_blue: REGEX_HEX.blue,

  // rgba_commas_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.all,
  rgba_commas_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.red,
  rgba_commas_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.green,
  rgba_commas_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.blue,
  rgba_commas_alpha: REGEX_HEX.length + REGEX_RGBA_COMMAS.alpha,

  // rgba_spaces_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.all,
  rgba_spaces_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.red,
  rgba_spaces_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.green,
  rgba_spaces_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.blue,
  rgba_spaces_alpha: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.alpha,

  // rgb_commas_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.all,
  rgb_commas_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.red,
  rgb_commas_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.green,
  rgb_commas_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.blue,

  // rgb_spaces_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.all,
  rgb_spaces_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.red,
  rgb_spaces_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.green,
  rgb_spaces_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.blue,

  // rgba_numbers_commas_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.all,
  rgba_numbers_commas_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.red,
  rgba_numbers_commas_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.green,
  rgba_numbers_commas_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.blue,
  rgba_numbers_commas_alpha: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.alpha,

  // rgba_numbers_spaces_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.all,
  rgba_numbers_spaces_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.red,
  rgba_numbers_spaces_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.green,
  rgba_numbers_spaces_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.blue,
  rgba_numbers_spaces_alpha: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.alpha,

  // rgb_numbers_commas_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.all,
  rgb_numbers_commas_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.red,
  rgb_numbers_commas_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.green,
  rgb_numbers_commas_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.blue,

  // rgb_numbers_spaces_all: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.all,
  rgb_numbers_spaces_red: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.red,
  rgb_numbers_spaces_green: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.green,
  rgb_numbers_spaces_blue: REGEX_HEX.length + REGEX_RGBA_COMMAS.length + REGEX_RGBA_SPACES.length + REGEX_RGB_COMMAS.length + REGEX_RGB_SPACES.length + REGEX_RGBA_NUMBERS_COMMAS.length + REGEX_RGBA_NUMBERS_SPACES.length + REGEX_RGB_NUMBERS_COMMAS.length + REGEX_RGB_NUMBERS_SPACES.blue,
};

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace RgbaMatchType {
  export type Hex = 'Hex';
  export const Hex: Hex = 'Hex';

  export type RgbaSpaces = 'RgbaSpaces';
  export const RgbaSpaces: RgbaSpaces = 'RgbaSpaces';

  export type RgbaCommas = 'RgbaCommas';
  export const RgbaCommas: RgbaCommas = 'RgbaCommas';

  export type RgbSpaces = 'RgbSpaces';
  export const RgbSpaces: RgbSpaces = 'RgbSpaces';

  export type RgbCommas = 'RgbCommas';
  export const RgbCommas: RgbCommas = 'RgbCommas';

  export type RgbaNumbersCommas = 'RgbaNumbersCommas';
  export const RgbaNumbersCommas: RgbaNumbersCommas = 'RgbaNumbersCommas';

  export type RgbaNumbersSpaces = 'RgbaNumbersSpaces';
  export const RgbaNumbersSpaces: RgbaNumbersSpaces = 'RgbaNumbersSpaces';

  export type RgbNumbersCommas = 'RgbNumbersCommas';
  export const RgbNumbersCommas: RgbNumbersCommas = 'RgbNumbersCommas';

  export type RgbNumbersSpaces = 'RgbNumbersSpaces';
  export const RgbNumbersSpaces: RgbNumbersSpaces = 'RgbNumbersSpaces';

  export type Any =
    | Hex
    | RgbaCommas
    | RgbaSpaces
    | RgbaCommas
    | RgbSpaces
    | RgbCommas
    | RgbaNumbersCommas
    | RgbaNumbersSpaces
    | RgbNumbersCommas
    | RgbNumbersSpaces
  ;
}

interface ParsedPayload {
  type: RgbaMatchType.Any;
  original: string;
  start: number;
  end: number;
  red: number;
  green: number;
  blue: number;
  alpha: null | ParsedAlpha;
  length: number;
}

class ParsedAlpha {
  static from(str: string): ParsedAlpha {
    if (str.endsWith('%')) {
      const pc = str.substr(0, str.length - 1);
      return new ParsedAlpha(true, Number(pc));
    }
    return new ParsedAlpha(false, Number(str));
  }

  constructor(
    public readonly is_pc: boolean,
    public readonly value: number,
  ) {}

  toString() {
    if (this.is_pc) return `${this.value}%`;
    return this.value.toString();
  }
}

/**
 * @param {IterableIterator<RegExpMatchArray>} iterator
 */
function * handleMatches(iterator: IterableIterator<RegExpMatchArray>): IterableIterator<ParsedPayload> {
  for (const next of iterator) {
    // check kind
    const isHex = next[1 + REGEX_COLORS.hex_red] != null;
    const isRgbaCommas = next[1 + REGEX_COLORS.rgba_commas_red] != null;
    const isRgbaSpaces = next[1 + REGEX_COLORS.rgba_spaces_red] != null;
    const isRgbCommas = next[1 + REGEX_COLORS.rgb_commas_red] != null;
    const isRgbSpaces = next[1 + REGEX_COLORS.rgb_spaces_red] != null;
    const isRgbaNumbersCommas = next[1 + REGEX_COLORS.rgba_numbers_commas_red] != null;
    const isRgbaNumbersSpaces = next[1 + REGEX_COLORS.rgba_numbers_spaces_red] != null;
    const isRgbNumbersCommas = next[1 + REGEX_COLORS.rgb_numbers_commas_red] != null;
    const isRgbNumbersSpaces = next[1 + REGEX_COLORS.rgb_numbers_spaces_red] != null;


    const original = next[0]!;
    const start = next.index!;
    const length = original.length;
    const end = + start + length;
    type Payloadlet = [
      type: RgbaMatchType.Any,
      red: number,
      green: number,
      blue: number,
      alpah?: ParsedAlpha,
    ];
    let paylet: null | Payloadlet = null;

    if (isHex) {
      paylet = [
        RgbaMatchType.Hex,
        parseInt(next[1 + REGEX_COLORS.hex_red]!, 16),
        parseInt(next[1 + REGEX_COLORS.hex_green]!, 16),
        parseInt(next[1 + REGEX_COLORS.hex_blue]!, 16),
      ];
    }

    else if (isRgbaCommas) {
      paylet = [
        RgbaMatchType.RgbaCommas,
        Number(next[1 + REGEX_COLORS.rgba_commas_red]!),
        Number(next[1 + REGEX_COLORS.rgba_commas_green]!),
        Number(next[1 + REGEX_COLORS.rgba_commas_blue]!),
        ParsedAlpha.from(next[1 + REGEX_COLORS.rgba_commas_alpha]!),
      ];
    }

    else if (isRgbaSpaces) {
      paylet = [
        RgbaMatchType.RgbaSpaces,
        Number(next[1 + REGEX_COLORS.rgba_spaces_red]!),
        Number(next[1 + REGEX_COLORS.rgba_spaces_green]!),
        Number(next[1 + REGEX_COLORS.rgba_spaces_blue]!),
        ParsedAlpha.from(next[1 + REGEX_COLORS.rgba_spaces_alpha]!),
      ];
    }

    else if (isRgbCommas) {
      paylet = [
        RgbaMatchType.RgbCommas,
        Number(next[1 + REGEX_COLORS.rgb_commas_red]!),
        Number(next[1 + REGEX_COLORS.rgb_commas_green]!),
        Number(next[1 + REGEX_COLORS.rgb_commas_blue]!),
      ];
    }

    else if (isRgbSpaces) {
      paylet = [
        RgbaMatchType.RgbSpaces,
        Number(next[1 + REGEX_COLORS.rgb_spaces_red]!),
        Number(next[1 + REGEX_COLORS.rgb_spaces_green]!),
        Number(next[1 + REGEX_COLORS.rgb_spaces_blue]!),
      ];
    }

    else if (isRgbaNumbersCommas) {
      paylet = [
        RgbaMatchType.RgbaNumbersCommas,
        Number(next[1 + REGEX_COLORS.rgba_numbers_commas_red]!),
        Number(next[1 + REGEX_COLORS.rgba_numbers_commas_green]!),
        Number(next[1 + REGEX_COLORS.rgba_numbers_commas_blue]!),
        ParsedAlpha.from(next[1 + REGEX_COLORS.rgba_numbers_commas_alpha]!),
      ];
    }

    else if (isRgbaNumbersSpaces) {
      paylet = [
        RgbaMatchType.RgbaNumbersSpaces,
        Number(next[1 + REGEX_COLORS.rgba_numbers_spaces_red]!),
        Number(next[1 + REGEX_COLORS.rgba_numbers_spaces_green]!),
        Number(next[1 + REGEX_COLORS.rgba_numbers_spaces_blue]!),
        ParsedAlpha.from(next[1 + REGEX_COLORS.rgba_numbers_spaces_alpha]!),
      ];
    }

    else if (isRgbNumbersCommas) {
      paylet = [
        RgbaMatchType.RgbNumbersCommas,
        Number(next[1 + REGEX_COLORS.rgb_numbers_commas_red]!),
        Number(next[1 + REGEX_COLORS.rgb_numbers_commas_green]!),
        Number(next[1 + REGEX_COLORS.rgb_numbers_commas_blue]!),
      ];
    }

    else if (isRgbNumbersSpaces) {
      paylet = [
        RgbaMatchType.RgbNumbersSpaces,
        Number(next[1 + REGEX_COLORS.rgb_numbers_spaces_red]!),
        Number(next[1 + REGEX_COLORS.rgb_numbers_spaces_green]!),
        Number(next[1 + REGEX_COLORS.rgb_numbers_spaces_blue]!),
      ];
    }

    else {
      // no match...
    }

    if (paylet) {
      const [type, red, green, blue, alpha,] = paylet!;
      const payload: ParsedPayload = {
        original,
        start,
        length,
        end,
        type,
        red,
        green,
        blue,
        alpha: alpha ?? null,
      };
      yield payload;
    } else {
      console.warn('matched unknown colour type...', original);
    }
  }
}

const text = `
hello
#aabbcc
world
rgba(1, 2, 3, 0.5)
how rgba(1 2 3 / 0.5)
are rgb(1, 2, 3)  you
 doing rgb(1 2 3) :)
1, 2, 3, 50%
1 2 3 / 0.875
123, 456, 789
123 456 789
`;

const matchGenerator = handleMatches(text.matchAll(new RegExp(REGEX_COLORS.str, 'gi')));

function editor(matches: Iterable<ParsedPayload>) {
  let delta = 0;
  let modifiedText = text;
  const collected: ParsedPayload[] = [];

  for (const match of matches) {
    collected.push(match);
    const {
      red,
      green,
      blue,
      alpha,
      start,
      original,
      type,
    } = match;

    const hexRed = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue = blue.toString(16).padStart(2, '0');
    let hexAlpha: string | null = null;
    if (alpha) {
      if (alpha.is_pc) hexAlpha = (Math.round((255 / 100) * alpha.value)).toString(16).padStart(2, '0');
      else hexAlpha = (Math.round(255 * alpha.value)).toString(16).padStart(2, '0');
    }
    let hexNext: string;
    if (hexAlpha != null) hexNext = `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
    else hexNext = `#${hexRed}${hexGreen}${hexBlue}`;
    const _delta = hexNext.length - original.length;

    console.log(`[${type.padEnd(20, ' ')}]: \t${original.padEnd(20, ' ')}\t -> \t${hexNext}`);

    modifiedText =
      modifiedText.substr(0, start + delta)
      + hexNext
      + modifiedText.substr(start + delta + original.length);

    delta += _delta;

  }

  console.table(collected.map(({ alpha, ...rest }) => ({ ...rest, alpha: alpha && String(alpha) || null,})));
  console.log(modifiedText);
}

editor(matchGenerator);
