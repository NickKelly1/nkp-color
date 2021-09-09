import { Alpha } from './alpha';
import { REGEX_COLORS } from './regex';
import { Color } from './color';

export enum MatchType {
  Hex = 'Hex',
  Rgbx = 'Rgbx',
}

export enum MatchHexSurround {
  Hash = 'Hash',
  None = 'None'
}

export enum MatchRgbSurround {
  Css = 'Css',
  None = 'NOne',
}

export enum MatchRgbSeparator {
  Spaces = 'Spaces',
  Commas = 'Commas',
}

export interface RgbColorMatch extends ColorMatchInstance {
  type: MatchType.Rgbx;
  separator: MatchRgbSeparator;
  surround: MatchRgbSurround;
}
export interface HexColorMatch extends ColorMatchInstance {
  type: MatchType.Hex;
  separator: null;
  surround: MatchRgbSurround;
}
export type ColorMatch = RgbColorMatch | HexColorMatch;
export class ColorMatchInstance {
  public readonly hasAlpha;

  constructor(
    public readonly type: MatchType,
    public readonly separator: null | MatchRgbSeparator,
    public readonly surround: MatchRgbSurround | MatchHexSurround,
    public readonly original: string,
    public readonly start: number,
    public readonly end: number,
    public readonly length: number,
    public readonly color: Color,
  ) {
    this.hasAlpha = color.alpha != null;
  }
}

/**
 * Match RegExp against the color
 *
 * @param array
 * @returns
 */
export function match(array: RegExpMatchArray): null | ColorMatch {
  // check kind
  const isHex6 = array[1 + REGEX_COLORS.hex6_red] != null;
  const isHex3 = array[1 + REGEX_COLORS.hex3_red] != null;
  const isRgbaCommas = array[1 + REGEX_COLORS.rgba_commas_red] != null;
  const isRgbaSpaces = array[1 + REGEX_COLORS.rgba_spaces_red] != null;
  const isRgbCommas = array[1 + REGEX_COLORS.rgb_commas_red] != null;
  const isRgbSpaces = array[1 + REGEX_COLORS.rgb_spaces_red] != null;
  const isRgbaNumbersCommas = array[1 + REGEX_COLORS.rgba_numbers_commas_red] != null;
  const isRgbaNumbersSpaces = array[1 + REGEX_COLORS.rgba_numbers_spaces_red] != null;
  const isRgbNumbersCommas = array[1 + REGEX_COLORS.rgb_numbers_commas_red] != null;
  const isRgbNumbersSpaces = array[1 + REGEX_COLORS.rgb_numbers_spaces_red] != null;

  const original = array[0]!;
  let type: undefined | MatchType;
  let surround: undefined | MatchHexSurround | MatchRgbSurround;
  let separator: undefined | null | MatchRgbSeparator;
  let rgba: undefined | Color;

  if (isHex6) {
    type = MatchType.Hex;
    surround = original.startsWith('#')
      ? MatchHexSurround.Hash
      : MatchHexSurround.None;
    separator = null;
    const alphaStr = array[1 + REGEX_COLORS.hex6_alpha];
    const alpha = alphaStr != null ? Alpha.fromHex(alphaStr) : null;
    rgba = Color.from({
      red: parseInt(array[1 + REGEX_COLORS.hex6_red]!, 16),
      green: parseInt(array[1 + REGEX_COLORS.hex6_green]!, 16),
      blue: parseInt(array[1 + REGEX_COLORS.hex6_blue]!, 16),
      alpha,
      useCommas: true,
      useCss: true,
      useHex: true,
      usePc: false,
      useHash: true,
    });
  }

  else if (isHex3) {
    type = MatchType.Hex;
    surround = original.startsWith('#')
      ? MatchHexSurround.Hash
      : MatchHexSurround.None;
    separator = null;
    const alphaStr = array[1 + REGEX_COLORS.hex3_alpha];
    const alpha = alphaStr != null ? Alpha.fromHex(alphaStr.repeat(2)) : null;
    rgba = Color.from({
      red: parseInt(array[1 + REGEX_COLORS.hex3_red]!.repeat(2), 16),
      green: parseInt(array[1 + REGEX_COLORS.hex3_green]!.repeat(2), 16),
      blue: parseInt(array[1 + REGEX_COLORS.hex3_blue]!.repeat(2), 16),
      alpha,
      useCommas: true,
      useCss: true,
      useHex: true,
      usePc: false,
      useHash: true,
    });
  }

  else if (isRgbaCommas) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.Css;
    separator = MatchRgbSeparator.Commas;
    const alpha = Alpha.fromRgbx(array[1 + REGEX_COLORS.rgba_commas_alpha]!);
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgba_commas_red]!),
      green: Number(array[1 + REGEX_COLORS.rgba_commas_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgba_commas_blue]!),
      alpha,
      useCommas: true,
      useCss: true,
      useHex: false,
      usePc: alpha.isPc,
      useHash: true,
    });
  }

  else if (isRgbaSpaces) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.Css;
    separator = MatchRgbSeparator.Spaces;
    const alpha = Alpha.fromRgbx(array[1 + REGEX_COLORS.rgba_spaces_alpha]!);
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgba_spaces_red]!),
      green: Number(array[1 + REGEX_COLORS.rgba_spaces_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgba_spaces_blue]!),
      alpha,
      useCommas: false,
      useCss: true,
      useHex: false,
      usePc: alpha.isPc,
      useHash: true,
    });
  }

  else if (isRgbCommas) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.Css;
    separator = MatchRgbSeparator.Commas;
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgb_commas_red]!),
      green: Number(array[1 + REGEX_COLORS.rgb_commas_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgb_commas_blue]!),
      alpha: null,
      useCommas: true,
      useCss: true,
      useHex: false,
      usePc: false,
      useHash: true,
    });
  }

  else if (isRgbSpaces) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.Css;
    separator = MatchRgbSeparator.Spaces;
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgb_spaces_red]!),
      green: Number(array[1 + REGEX_COLORS.rgb_spaces_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgb_spaces_blue]!),
      alpha: null,
      useCommas: false,
      useCss: true,
      useHex: false,
      usePc: false,
      useHash: true,
    });
  }

  else if (isRgbaNumbersCommas) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.None;
    separator = MatchRgbSeparator.Commas;
    const alpha = Alpha.fromRgbx(array[1 + REGEX_COLORS.rgba_numbers_commas_alpha]!);
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgba_numbers_commas_red]!),
      green: Number(array[1 + REGEX_COLORS.rgba_numbers_commas_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgba_numbers_commas_blue]!),
      alpha,
      useCommas: true,
      useCss: false,
      useHex: false,
      usePc: alpha.isPc,
      useHash: true,
    });
  }

  else if (isRgbaNumbersSpaces) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.None;
    separator = MatchRgbSeparator.Spaces;
    const alpha = Alpha.fromRgbx(array[1 + REGEX_COLORS.rgba_numbers_spaces_alpha]!);
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgba_numbers_spaces_red]!),
      green: Number(array[1 + REGEX_COLORS.rgba_numbers_spaces_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgba_numbers_spaces_blue]!),
      alpha,
      useCommas: false,
      useCss: false,
      useHex: false,
      usePc: alpha.isPc,
      useHash: true,
    });
  }

  else if (isRgbNumbersCommas) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.None;
    separator = MatchRgbSeparator.Commas;
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgb_numbers_commas_red]!),
      green: Number(array[1 + REGEX_COLORS.rgb_numbers_commas_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgb_numbers_commas_blue]!),
      alpha: null,
      useCommas: true,
      useCss: false,
      useHex: false,
      usePc: false,
      useHash: true,
    });
  }

  else if (isRgbNumbersSpaces) {
    type = MatchType.Rgbx;
    surround = MatchRgbSurround.None;
    separator = MatchRgbSeparator.Spaces;
    rgba = Color.from({
      red: Number(array[1 + REGEX_COLORS.rgb_numbers_spaces_red]!),
      green: Number(array[1 + REGEX_COLORS.rgb_numbers_spaces_green]!),
      blue: Number(array[1 + REGEX_COLORS.rgb_numbers_spaces_blue]!),
      alpha: null,
      useCommas: false,
      useCss: false,
      useHex: false,
      usePc: false,
      useHash: true,
    });
  }

  else {
    // no match...
  }

  if (type != null) {
    const original = array[0]!;
    const start = array.index!;
    const length = original.length;
    const end = + start + length;
    const color = new ColorMatchInstance(
        type!,
        separator!,
        surround!,
        original,
        start,
        end,
        original.length,
        rgba!,
    );
    return color as ColorMatch;
  } else {
    console.warn('matched unknown color type...', original);
  }

  return null;
}


/**
 * Parse matches and yield the corresponding colors
 *
 * @param iterator
 */
export function * matchAll(iterator: IterableIterator<RegExpMatchArray>): IterableIterator<ColorMatch> {
  for (const array of iterator) {
    const color = match(array);
    if (color != null) yield color;
  }
}
