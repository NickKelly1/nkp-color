import { Alpha } from './alpha';
import { MatchHexSurround, MatchRgbSeparator, MatchRgbSurround, MatchType } from './match';
import { parseText } from './parse';

function toHex(decimal: number): string {
  return decimal.toString(16).padStart(2, '0');
}

function toDecimal(hex: string): number {
  return parseInt(hex, 16);
}

function toHexAlpha(num: number): string {
  return Math.round((num * 255)).toString(16).padStart(2, '0');
}


describe('parse', () => {
  describe('hex6', () => {
    describe('no-alpha', () => {
      it('parses', () => {
        const _1_red = 200;
        const _1_hex_red = toHex(_1_red);
        const _1_green = 50;
        const _1_hex_green = toHex(_1_green);
        const _1_blue = 100;
        const _1_hex_blue = toHex(_1_blue);

        const _2_red = 250;
        const _2_hex_red = toHex(_2_red);
        const _2_green = 100;
        const _2_hex_green = toHex(_2_green);
        const _2_blue = 150;
        const _2_hex_blue = toHex(_2_blue);

        const _3_red = 1;
        const _3_hex_red = toHex(_3_red);
        const _3_green = 3;
        const _3_hex_green = toHex(_3_green);
        const _3_blue = 2;
        const _3_hex_blue = toHex(_3_blue);


        const _1 = '#' + _1_hex_red + _1_hex_green + _1_hex_blue;
        const _2 = '#' + _2_hex_red + _2_hex_green + _2_hex_blue;
        const _3 = '#' + _3_hex_red + _3_hex_green + _3_hex_blue;

        const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
        expect(parsed.matches.length === 3);

        expect(parsed.matches[0]!.original).toEqual(_1);
        expect(parsed.matches[0]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[0]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[0]!.hasAlpha).toEqual(false);
        expect(parsed.matches[0]!.color.red).toEqual(_1_red);
        expect(parsed.matches[0]!.color.green).toEqual(_1_green);
        expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
        expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
        expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
        expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);

        expect(parsed.matches[1]!.original).toEqual(_2);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[1]!.hasAlpha).toEqual(false);
        expect(parsed.matches[1]!.color.red).toEqual(_2_red);
        expect(parsed.matches[1]!.color.green).toEqual(_2_green);
        expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
        expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
        expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
        expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);

        expect(parsed.matches[2]!.original).toEqual(_3);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[2]!.hasAlpha).toEqual(false);
        expect(parsed.matches[2]!.color.red).toEqual(_3_red);
        expect(parsed.matches[2]!.color.green).toEqual(_3_green);
        expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
        expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
        expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
        expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
      });
    });

    describe('alpha', () => {
      it('parses', () => {
        const _1_red = 200;
        const _1_hex_red = toHex(_1_red);
        const _1_green = 50;
        const _1_hex_green = toHex(_1_green);
        const _1_blue = 100;
        const _1_hex_blue = toHex(_1_blue);
        const _1_alpha = 10;
        const _1_hex_alpha = toHex(_1_alpha);
        const _1_alpha_abs = _1_alpha / 255;

        const _2_red = 250;
        const _2_hex_red = toHex(_2_red);
        const _2_green = 100;
        const _2_hex_green = toHex(_2_green);
        const _2_blue = 150;
        const _2_hex_blue = toHex(_2_blue);
        const _2_alpha = 75;
        const _2_hex_alpha = toHex(_2_alpha);
        const _2_alpha_abs = _2_alpha / 255;

        const _3_red = 1;
        const _3_hex_red = toHex(_3_red);
        const _3_green = 3;
        const _3_hex_green = toHex(_3_green);
        const _3_blue = 2;
        const _3_hex_blue = toHex(_3_blue);
        const _3_alpha = 200;
        const _3_hex_alpha = toHex(_3_alpha);
        const _3_alpha_abs = _3_alpha / 255;


        const _1 = '#' + _1_hex_red + _1_hex_green + _1_hex_blue + _1_hex_alpha;
        const _2 = '#' + _2_hex_red + _2_hex_green + _2_hex_blue + _2_hex_alpha;
        const _3 = '#' + _3_hex_red + _3_hex_green + _3_hex_blue + _3_hex_alpha;

        const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
        expect(parsed.matches.length === 3);

        expect(parsed.matches[0]!.original).toEqual(_1);
        expect(parsed.matches[0]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[0]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[0]!.hasAlpha).toEqual(true);
        expect(parsed.matches[0]!.color.red).toEqual(_1_red);
        expect(parsed.matches[0]!.color.green).toEqual(_1_green);
        expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
        expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
        expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
        expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);
        expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_1_alpha_abs));

        expect(parsed.matches[1]!.original).toEqual(_2);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[1]!.hasAlpha).toEqual(true);
        expect(parsed.matches[1]!.color.red).toEqual(_2_red);
        expect(parsed.matches[1]!.color.green).toEqual(_2_green);
        expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
        expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
        expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
        expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);
        expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_2_alpha_abs));

        expect(parsed.matches[2]!.original).toEqual(_3);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[2]!.hasAlpha).toEqual(true);
        expect(parsed.matches[2]!.color.red).toEqual(_3_red);
        expect(parsed.matches[2]!.color.green).toEqual(_3_green);
        expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
        expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
        expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
        expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
        expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_3_alpha_abs));
      });
    });
  });

  describe('hex3', () => {
    describe('no-alpha', () => {
      it('parses', () => {
        const _1_hex_red = '0';
        const _1_red = toDecimal(_1_hex_red.repeat(2));
        const _1_hex_green = 'e';
        const _1_green = toDecimal(_1_hex_green.repeat(2));
        const _1_hex_blue = '7';
        const _1_blue = toDecimal(_1_hex_blue.repeat(2));

        const _2_hex_red = '1';
        const _2_red = toDecimal(_2_hex_red.repeat(2));
        const _2_hex_blue = '8';
        const _2_hex_green = 'd';
        const _2_green = toDecimal(_2_hex_green.repeat(2));
        const _2_blue = toDecimal(_2_hex_blue.repeat(2));

        const _3_hex_red = '2';
        const _3_red = toDecimal(_3_hex_red.repeat(2));
        const _3_hex_green = 'e';
        const _3_green = toDecimal(_3_hex_green.repeat(2));
        const _3_hex_blue = '9';
        const _3_blue = toDecimal(_3_hex_blue.repeat(2));

        const _1 = '#' + _1_hex_red + _1_hex_green + _1_hex_blue;
        const _2 = '#' + _2_hex_red + _2_hex_green + _2_hex_blue;
        const _3 = '#' + _3_hex_red + _3_hex_green + _3_hex_blue;

        const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
        expect(parsed.matches.length === 3);

        expect(parsed.matches[0]!.original).toEqual(_1);
        expect(parsed.matches[0]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[0]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[0]!.hasAlpha).toEqual(false);
        expect(parsed.matches[0]!.color.red).toEqual(_1_red);
        expect(parsed.matches[0]!.color.green).toEqual(_1_green);
        expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
        expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red.repeat(2));
        expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green.repeat(2));
        expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue.repeat(2));

        expect(parsed.matches[1]!.original).toEqual(_2);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[1]!.hasAlpha).toEqual(false);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.color.red).toEqual(_2_red);
        expect(parsed.matches[1]!.color.green).toEqual(_2_green);
        expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
        expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red.repeat(2));
        expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green.repeat(2));
        expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue.repeat(2));

        expect(parsed.matches[2]!.original).toEqual(_3);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[2]!.hasAlpha).toEqual(false);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.color.red).toEqual(_3_red);
        expect(parsed.matches[2]!.color.green).toEqual(_3_green);
        expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
        expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red.repeat(2));
        expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green.repeat(2));
        expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue.repeat(2));
      });
    });

    describe('alpha', () => {
      it('parses', () => {
        const _1_hex_red = '0';
        const _1_red = toDecimal(_1_hex_red.repeat(2));
        const _1_hex_green = 'e';
        const _1_green = toDecimal(_1_hex_green.repeat(2));
        const _1_hex_blue = '7';
        const _1_blue = toDecimal(_1_hex_blue.repeat(2));
        const _1_hex_alpha = 'b';
        const _1_alpha = toDecimal(_1_hex_alpha.repeat(2));
        const _1_alpha_abs = _1_alpha / 255;

        const _2_hex_red = '1';
        const _2_red = toDecimal(_2_hex_red.repeat(2));
        const _2_hex_blue = '8';
        const _2_hex_green = 'd';
        const _2_green = toDecimal(_2_hex_green.repeat(2));
        const _2_blue = toDecimal(_2_hex_blue.repeat(2));
        const _2_hex_alpha = 'c';
        const _2_alpha = toDecimal(_2_hex_alpha.repeat(2));
        const _2_alpha_abs = _2_alpha / 255;

        const _3_hex_red = '2';
        const _3_red = toDecimal(_3_hex_red.repeat(2));
        const _3_hex_green = 'e';
        const _3_green = toDecimal(_3_hex_green.repeat(2));
        const _3_hex_blue = '9';
        const _3_blue = toDecimal(_3_hex_blue.repeat(2));
        const _3_hex_alpha = 'c';
        const _3_alpha = toDecimal(_3_hex_alpha.repeat(2));
        const _3_alpha_abs = _3_alpha / 255;

        const _1 = '#' + _1_hex_red + _1_hex_green + _1_hex_blue  + _1_hex_alpha;
        const _2 = '#' + _2_hex_red + _2_hex_green + _2_hex_blue  + _2_hex_alpha;
        const _3 = '#' + _3_hex_red + _3_hex_green + _3_hex_blue  + _3_hex_alpha;

        const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
        expect(parsed.matches.length === 3);

        expect(parsed.matches[0]!.original).toEqual(_1);
        expect(parsed.matches[0]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[0]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[0]!.hasAlpha).toEqual(true);
        expect(parsed.matches[0]!.color.red).toEqual(_1_red);
        expect(parsed.matches[0]!.color.green).toEqual(_1_green);
        expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
        expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red.repeat(2));
        expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green.repeat(2));
        expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue.repeat(2));
        expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_1_alpha_abs));

        expect(parsed.matches[1]!.original).toEqual(_2);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[1]!.hasAlpha).toEqual(true);
        expect(parsed.matches[1]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[1]!.color.red).toEqual(_2_red);
        expect(parsed.matches[1]!.color.green).toEqual(_2_green);
        expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
        expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red.repeat(2));
        expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green.repeat(2));
        expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue.repeat(2));
        expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_2_alpha_abs));

        expect(parsed.matches[2]!.original).toEqual(_3);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.surround).toEqual(MatchHexSurround.Hash);
        expect(parsed.matches[2]!.hasAlpha).toEqual(true);
        expect(parsed.matches[2]!.type).toEqual(MatchType.Hex);
        expect(parsed.matches[2]!.color.red).toEqual(_3_red);
        expect(parsed.matches[2]!.color.green).toEqual(_3_green);
        expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
        expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red.repeat(2));
        expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green.repeat(2));
        expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue.repeat(2));
        expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(Alpha.normaliseAbs(_3_alpha_abs));
      });
    });
  });

  describe('rgb', () => {
    describe('css',() => {
      describe('spaces', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);


          const _1 = `rgb(${_1_red} ${_1_green} ${_1_blue} )`;
          const _2 = `rgb(    ${_2_red}      ${_2_green}       ${_2_blue}         )`;
          const _3 = `rgb(${_3_red}          ${_3_green} ${_3_blue} )`;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1);
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[0]!.hasAlpha).toEqual(false);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);

          expect(parsed.matches[1]!.original).toEqual(_2);
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[1]!.hasAlpha).toEqual(false);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);

          expect(parsed.matches[2]!.original).toEqual(_3);
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[2]!.hasAlpha).toEqual(false);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
        });
      });
      describe('commas', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);


          const _1 = `rgb(${_1_red}, ${_1_green}, ${_1_blue} )`;
          const _2 = `rgb(    ${_2_red},      ${_2_green},       ${_2_blue}     )`;
          const _3 = `rgb(${_3_red}     ,       ${_3_green}    , ${_3_blue}  )`;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1);
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[0]!.hasAlpha).toEqual(false);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);

          expect(parsed.matches[1]!.original).toEqual(_2);
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[1]!.hasAlpha).toEqual(false);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);

          expect(parsed.matches[2]!.original).toEqual(_3);
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[2]!.hasAlpha).toEqual(false);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
        });
      });
    });
    describe('raw',() => {
      describe('spaces', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);


          const _1 = `${_1_red} ${_1_green} ${_1_blue} `;
          const _2 = `    ${_2_red}      ${_2_green}       ${_2_blue}         `;
          const _3 = `${_3_red}          ${_3_green} ${_3_blue} `;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1.trim());
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[0]!.hasAlpha).toEqual(false);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);

          expect(parsed.matches[1]!.original).toEqual(_2.trim());
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[1]!.hasAlpha).toEqual(false);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);

          expect(parsed.matches[2]!.original).toEqual(_3.trim());
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[2]!.hasAlpha).toEqual(false);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
        });
      });
      describe('commas', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);


          const _1 = `${_1_red}, ${_1_green}, ${_1_blue} `;
          const _2 = `    ${_2_red},      ${_2_green},       ${_2_blue}     `;
          const _3 = `${_3_red}     ,       ${_3_green}    , ${_3_blue}  `;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1.trim());
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[0]!.hasAlpha).toEqual(false);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);

          expect(parsed.matches[1]!.original).toEqual(_2.trim());
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[1]!.hasAlpha).toEqual(false);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);

          expect(parsed.matches[2]!.original).toEqual(_3.trim());
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[2]!.hasAlpha).toEqual(false);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
        });
      });
    });
  });

  describe('rgba', () => {
    describe('css',() => {
      describe('spaces', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);
          const _1_alpha = 0.33;
          const _1_alpha_abs = Math.round(_1_alpha * 255);
          const _1_hex_alpha = toHex(_1_alpha_abs);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);
          const _2_alpha = 0.66;
          const _2_alpha_abs = Math.round(_2_alpha * 255);
          const _2_hex_alpha = toHex(_2_alpha_abs);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);
          const _3_alpha = 0.99;
          const _3_alpha_abs = Math.round(_3_alpha * 255);
          const _3_hex_alpha = toHex(_3_alpha_abs);


          const _1 = `rgba(${_1_red} ${_1_green} ${_1_blue} / ${_1_alpha})`;
          const _2 = `rgba(    ${_2_red}      ${_2_green}       ${_2_blue}         /     ${_2_alpha}    )`;
          const _3 = `rgba(${_3_red}          ${_3_green} ${_3_blue} /   ${_3_alpha}   )`;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1);
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[0]!.hasAlpha).toEqual(true);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);
          expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(_1_alpha);
          expect(parsed.matches[0]!.color.alpha!.toHex()).toEqual(_1_hex_alpha);

          expect(parsed.matches[1]!.original).toEqual(_2);
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[1]!.hasAlpha).toEqual(true);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);
          expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(_2_alpha);
          expect(parsed.matches[1]!.color.alpha!.toHex()).toEqual(_2_hex_alpha);

          expect(parsed.matches[2]!.original).toEqual(_3);
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[2]!.hasAlpha).toEqual(true);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
          expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(_3_alpha);
          expect(parsed.matches[2]!.color.alpha!.toHex()).toEqual(_3_hex_alpha);
        });
      });
      describe('commas', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);
          const _1_alpha = 0.33;
          const _1_alpha_abs = Math.round(_1_alpha * 255);
          const _1_hex_alpha = toHex(_1_alpha_abs);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);
          const _2_alpha = 0.66;
          const _2_alpha_abs = Math.round(_2_alpha * 255);
          const _2_hex_alpha = toHex(_2_alpha_abs);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);
          const _3_alpha = 0.99;
          const _3_alpha_abs = Math.round(_3_alpha * 255);
          const _3_hex_alpha = toHex(_3_alpha_abs);


          const _1 = `rgba(${_1_red}, ${_1_green}, ${_1_blue}, ${_1_alpha})`;
          const _2 = `rgba(    ${_2_red},      ${_2_green},       ${_2_blue}     ,         ${_2_alpha}    )`;
          const _3 = `rgba(${_3_red}     ,       ${_3_green}    , ${_3_blue}  ,   ${_3_alpha}   )`;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1);
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[0]!.hasAlpha).toEqual(true);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);
          expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(_1_alpha);
          expect(parsed.matches[0]!.color.alpha!.toHex()).toEqual(_1_hex_alpha);

          expect(parsed.matches[1]!.original).toEqual(_2);
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[1]!.hasAlpha).toEqual(true);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);
          expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(_2_alpha);
          expect(parsed.matches[1]!.color.alpha!.toHex()).toEqual(_2_hex_alpha);

          expect(parsed.matches[2]!.original).toEqual(_3);
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.Css);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[2]!.hasAlpha).toEqual(true);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
          expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(_3_alpha);
          expect(parsed.matches[2]!.color.alpha!.toHex()).toEqual(_3_hex_alpha);
        });
      });
    });
    describe('raw',() => {
      describe('spaces', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);
          const _1_alpha = 0.33;
          const _1_alpha_abs = Math.round(_1_alpha * 255);
          const _1_hex_alpha = toHex(_1_alpha_abs);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);
          const _2_alpha = 0.66;
          const _2_alpha_abs = Math.round(_2_alpha * 255);
          const _2_hex_alpha = toHex(_2_alpha_abs);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);
          const _3_alpha = 0.99;
          const _3_alpha_abs = Math.round(_3_alpha * 255);
          const _3_hex_alpha = toHex(_3_alpha_abs);


          const _1 = `${_1_red} ${_1_green} ${_1_blue} / ${_1_alpha}`;
          const _2 = `    ${_2_red}      ${_2_green}       ${_2_blue}         /     ${_2_alpha}    `;
          const _3 = `${_3_red}          ${_3_green} ${_3_blue} /   ${_3_alpha}   `;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1.trim());
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[0]!.hasAlpha).toEqual(true);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);
          expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(_1_alpha);
          expect(parsed.matches[0]!.color.alpha!.toHex()).toEqual(_1_hex_alpha);

          expect(parsed.matches[1]!.original).toEqual(_2.trim());
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[1]!.hasAlpha).toEqual(true);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);
          expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(_2_alpha);
          expect(parsed.matches[1]!.color.alpha!.toHex()).toEqual(_2_hex_alpha);

          expect(parsed.matches[2]!.original).toEqual(_3.trim());
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Spaces);
          expect(parsed.matches[2]!.hasAlpha).toEqual(true);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
          expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(_3_alpha);
          expect(parsed.matches[2]!.color.alpha!.toHex()).toEqual(_3_hex_alpha);
        });
      });
      describe('commas', () => {
        it('works', () => {
          const _1_red = 200;
          const _1_hex_red = toHex(_1_red);
          const _1_green = 50;
          const _1_hex_green = toHex(_1_green);
          const _1_blue = 100;
          const _1_hex_blue = toHex(_1_blue);
          const _1_alpha = 0.33;
          const _1_alpha_abs = Math.round(_1_alpha * 255);
          const _1_hex_alpha = toHex(_1_alpha_abs);

          const _2_red = 250;
          const _2_hex_red = toHex(_2_red);
          const _2_green = 100;
          const _2_hex_green = toHex(_2_green);
          const _2_blue = 150;
          const _2_hex_blue = toHex(_2_blue);
          const _2_alpha = 0.66;
          const _2_alpha_abs = Math.round(_2_alpha * 255);
          const _2_hex_alpha = toHex(_2_alpha_abs);

          const _3_red = 1;
          const _3_hex_red = toHex(_3_red);
          const _3_green = 3;
          const _3_hex_green = toHex(_3_green);
          const _3_blue = 2;
          const _3_hex_blue = toHex(_3_blue);
          const _3_alpha = 0.99;
          const _3_alpha_abs = Math.round(_3_alpha * 255);
          const _3_hex_alpha = toHex(_3_alpha_abs);


          const _1 = `${_1_red}, ${_1_green}, ${_1_blue}, ${_1_alpha}`;
          const _2 = `    ${_2_red},      ${_2_green},       ${_2_blue}     ,         ${_2_alpha}    `;
          const _3 = `${_3_red}     ,       ${_3_green}    , ${_3_blue}  ,   ${_3_alpha}   `;

          const parsed = parseText(`hello ${_1}\nbefore ${_2} after\n${_3} world`);
          expect(parsed.matches.length === 3);

          expect(parsed.matches[0]!.original).toEqual(_1.trim());
          expect(parsed.matches[0]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[0]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[0]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[0]!.hasAlpha).toEqual(true);
          expect(parsed.matches[0]!.color.red).toEqual(_1_red);
          expect(parsed.matches[0]!.color.green).toEqual(_1_green);
          expect(parsed.matches[0]!.color.blue).toEqual(_1_blue);
          expect(parsed.matches[0]!.color.toHexRed()).toEqual(_1_hex_red);
          expect(parsed.matches[0]!.color.toHexGreen()).toEqual(_1_hex_green);
          expect(parsed.matches[0]!.color.toHexBlue()).toEqual(_1_hex_blue);
          expect(parsed.matches[0]!.color.alpha!.toAbs()).toEqual(_1_alpha);
          expect(parsed.matches[0]!.color.alpha!.toHex()).toEqual(_1_hex_alpha);

          expect(parsed.matches[1]!.original).toEqual(_2.trim());
          expect(parsed.matches[1]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[1]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[1]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[1]!.hasAlpha).toEqual(true);
          expect(parsed.matches[1]!.color.red).toEqual(_2_red);
          expect(parsed.matches[1]!.color.green).toEqual(_2_green);
          expect(parsed.matches[1]!.color.blue).toEqual(_2_blue);
          expect(parsed.matches[1]!.color.toHexRed()).toEqual(_2_hex_red);
          expect(parsed.matches[1]!.color.toHexGreen()).toEqual(_2_hex_green);
          expect(parsed.matches[1]!.color.toHexBlue()).toEqual(_2_hex_blue);
          expect(parsed.matches[1]!.color.alpha!.toAbs()).toEqual(_2_alpha);
          expect(parsed.matches[1]!.color.alpha!.toHex()).toEqual(_2_hex_alpha);

          expect(parsed.matches[2]!.original).toEqual(_3.trim());
          expect(parsed.matches[2]!.type).toEqual(MatchType.Rgbx);
          expect(parsed.matches[2]!.surround).toEqual(MatchRgbSurround.None);
          expect(parsed.matches[2]!.separator).toEqual(MatchRgbSeparator.Commas);
          expect(parsed.matches[2]!.hasAlpha).toEqual(true);
          expect(parsed.matches[2]!.color.red).toEqual(_3_red);
          expect(parsed.matches[2]!.color.green).toEqual(_3_green);
          expect(parsed.matches[2]!.color.blue).toEqual(_3_blue);
          expect(parsed.matches[2]!.color.toHexRed()).toEqual(_3_hex_red);
          expect(parsed.matches[2]!.color.toHexGreen()).toEqual(_3_hex_green);
          expect(parsed.matches[2]!.color.toHexBlue()).toEqual(_3_hex_blue);
          expect(parsed.matches[2]!.color.alpha!.toAbs()).toEqual(_3_alpha);
          expect(parsed.matches[2]!.color.alpha!.toHex()).toEqual(_3_hex_alpha);
        });
      });
    });
  });
});
