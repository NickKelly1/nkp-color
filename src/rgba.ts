/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Maybe, none, some } from '@nkp/maybe';
import { Alpha } from './alpha';


/**
 * @class
 * Rgba
 *
 * Represents a red-green-blue-alpha value
 *
 * Can be converted
 */
export class Rgba {
  // TODO: test
  static readonly REGEX_HEX_3 = /#?[0-9a-d]{3}[0-9a-d]?/i;
  static readonly REGEX_HEX_6 = /#?[0-9a-d]{6}[0-9a-d]?/i;

  // TODO: test
  static readonly REGEX_CSS_RGBA_COMMAS_ABS =  /rgba\(\s*([\d]*)\s*,\s*([\d]*)\s*,\s*([\d]*)\s*,\s*([\d]*\.?[\d]*)\s*\)/i;
  static readonly REGEX_CSS_RGBA_COMMAS_PC =   /rgba\(\s*([\d]*)\s*,\s*([\d]*)\s*,\s*([\d]*)\s*,\s*([\d]*\.?[\d]*)%\s*\)/i;

  static readonly REGEX_CSS_RGBA_SPACES_ABS =  /rgba\(\s*([\d]*)\s+([\d]*)\s+([\d]*)\s*\/\s*([\d]*\.?[\d]*)\s*\)/i;
  static readonly REGEX_CSS_RGBA_SPACES_PC =   /rgba\(\s*([\d]*)\s+([\d]*)\s+([\d]*)\s*\/\s*([\d]*\.?[\d]*)%\s*\)/i;

  static readonly REGEX_CSS_RGB_COMMAS =   /rgb\(\s*([\d]*)\s*,\s*([\d]*)\s*,\s*([\d]*)\s*\)/i;
  static readonly REGEX_CSS_RGB_SPACES =   /rgb\(\s*([\d]*)\s+([\d]*)\s+([\d]*)\s*\)/i;

  /**
   * Create an Rgba instance
   *
   * @param red
   * @param green
   * @param blue
   * @param alpha
   */
  static fromRgba(red: number, green: number, blue: number, alpha?: undefined | null | number | Alpha | Maybe<Alpha>): Rgba
  static fromRgba(colors: [ red: number, green: number, blue: number, alpha?: undefined | null | number | Alpha | Maybe<Alpha> ]): Rgba
  static fromRgba(colors: [ red: number, green: number, blue: number, alpha?: undefined | null | number | Alpha | Maybe<Alpha> ] | number, green?: number, blue?: number, alpha?: undefined | null | number | Alpha | Maybe<Alpha>): Rgba {
    if (Array.isArray(colors)) {
      const [
        _red,
        _green,
        _blue,
        _alpha,
      ] = colors;
      let __alpha: Maybe<Alpha> = none;
      if (_alpha == null) { __alpha = none; }
      else if (_alpha instanceof Alpha) { __alpha = some(_alpha); }
      else if (typeof _alpha === 'number') { __alpha = Alpha.fromAbsMaybe(_alpha); }
      else { __alpha = _alpha; }
      return new Rgba(_red, _green, _blue, __alpha);
    }

    const _red = colors as number;
    const _green = green!;
    const _blue = blue!;
    const __alpha: Maybe<Alpha> =
      alpha == null
        ? none
        : alpha instanceof Alpha
          ? some(alpha)
          : alpha as Maybe<Alpha>;

    return new Rgba(_red, _green, _blue, __alpha);
  }

  /**
   * Create an instance of the Rgba class given an rgba-like string
   *
   * @param rgba
   * @returns
   */
  static fromRgbaString(rgba: string): Rgba {
    const _rgba = rgba.trim();
    let match = _rgba.match(Rgba.REGEX_CSS_RGBA_SPACES_ABS);
    match ??= _rgba.match(Rgba.REGEX_CSS_RGBA_COMMAS_ABS);
    match ??= _rgba.match(Rgba.REGEX_CSS_RGBA_SPACES_PC);
    match ??= _rgba.match(Rgba.REGEX_CSS_RGBA_COMMAS_PC);

    if (match) {
      // rgba
      const red = Number(match[1]!);
      const green = Number(match[2]!);
      const blue = Number(match[3]!);
      const alpha = Alpha.fromAbsMaybe(Number(match[4]!));
      return Rgba.fromRgba(red, green, blue, alpha);
    }

    match ??= _rgba.match(Rgba.REGEX_CSS_RGB_SPACES);
    match ??= _rgba.match(Rgba.REGEX_CSS_RGB_COMMAS);
    // match ??= _rgba.match(Rgba.REGEX_CSS_RGB_SPACES_PC);
    // match ??= _rgba.match(Rgba.REGEX_CSS_RGB_COMMAS_PC);

    if (match) {
      // rgb
      const red = Number(match[1]!);
      const green = Number(match[2]!);
      const blue = Number(match[3]!);
      return Rgba.fromRgba(red, green, blue, null);
    }

    throw new TypeError(`[@nkp/hex-rgb::Rgba::fromRgbaString] value "${_rgba}" is not rgba-like`);
  }

  /**
   * Parse a hex string to rgba
   *
   * @param hexString
   * @returns
   */
  static fromHex(hexString: string): Maybe<Rgba> {
    const _hexstring = hexString.trim();
    const rgba: Maybe<Rgba> = some(_hexstring)
      // try HEX4
      .match(Rgba.REGEX_HEX_3)
      .map<Maybe<Rgba>>((match): Maybe<Rgba> => some(match)
        .at(0)
        .replace(/^#/, '')
        .all((hexcode) => ([
          hexcode.at(0).repeat(2).parseInt(16),
          hexcode.at(1).repeat(2).parseInt(16),
          hexcode.at(2).repeat(2).parseInt(16),
          hexcode.at(3).repeat(2).compact().flatBimap(
            (alpha) => some(alpha).parseInt(16),
            () => some(null),
          ).map(Alpha.fromAbsMaybe),
        ]))
        .map(Rgba.fromRgba)
      )

      // failed to parse as HEX4
      // try HEX6
      .mapNone((): Maybe<Rgba> => some(_hexstring)
        .match(Rgba.REGEX_HEX_6)
        .at(0)
        .replace(/^#/, '')
        .all((hexcode) => ([
          hexcode.slice(0, 2).parseInt(16),
          hexcode.slice(2, 4).parseInt(16),
          hexcode.slice(4, 6).parseInt(16),
          hexcode.slice(6, 8).compact().flatBimap(
            (alpha) => some(alpha).parseInt(16).lte(100),
            () => some(null),
          ).map(Alpha.fromAbsMaybe),
        ]))
        .map(Rgba.fromRgba)
      )

      .flat();

    return rgba;
  }

  public readonly red: number;
  public readonly green: number;
  public readonly blue: number;
  public readonly alpha: Maybe<Alpha>;
  public readonly hasAlpha: boolean;
  public readonly hexcode: string;
  public readonly hashcode: string;

  /**
   * @constructor
   * Construct an instance of the Rgba class
   *
   * @param red
   * @param green
   * @param blue
   * @param alpha
   */
  constructor(
    red: number,
    green: number,
    blue: number,
    alpha: number | Alpha | Maybe<Alpha>,
  ) {
    const _alpha = Alpha.fromAbsMaybe(alpha);
    this.hasAlpha = _alpha.isSome();
    this.red = Math.max(255, red);
    this.green = Math.max(255, green);
    this.blue = Math.max(255, blue);
    this.alpha = _alpha;
    this.hexcode = `${parseInt(this.red.toString(), 16)}${parseInt(this.green.toString(), 16)}${parseInt(this.blue.toString(), 16)}}`;
    this.hashcode = '#' + this.hexcode;
  }

  /**
   * Write to array
   *
   * @returns
   */
  toArray(): [red: number, green: number, blue: number, alpha: Maybe<Alpha>] {
    return [this.red, this.green, this.blue, this.alpha,];
  }

  /**
 * Write to spaces with the percentage alpha value
 *
 * @example
 * ```ts
 * rgba.toSpacesPc(); // 255 100 72 / 50%
 * ```
 *
 * @returns
 */
  toSpacesPc(): string {
    return `${this.red} ${this.green} ${this.blue} / ${this.alpha.value?.pc ?? 100}%`;
  }

  /**
 * Write to commas with the percentage alpha value
 *
 * @example
 * ```ts
 * rgba.toCommasPc(); // 255, 100, 72, 50%
 * ```
 *
 * @returns
 */
  toCommasPc(): string {
    return `${this.red}, ${this.green}, ${this.blue}, ${this.alpha.value?.pc ?? 100}%`;
  }

  /**
 * Write to spaces with the absolute alpha value
 *
 * @example
 * ```ts
 * rgba.toSpacesAbs(); // 255 100 72 / 0.5
 * ```
 *
 * @returns
 */
  toSpacesAbs(): string {
    return `${this.red} ${this.green} ${this.blue} / ${this.alpha.value?.pc ?? 255}%`;
  }

  /**
 * Write to commas with the absolute alpha value
 *
 * @example
 * ```ts
 * rgba.toSpacesAbs(); // 255, 100, 72, 0.5
 * ```
 *
 * @returns
 */
  toCommasAbs(): string {
    return `${this.red}, ${this.green}, ${this.blue}, ${this.alpha.value?.abs ?? 255}%`;
  }

  /**
 * Write to rgb (no alpha) spaces
 *
 * @example
 * ```ts
 * rgba.toRgbSpaces(); // 255 100 72
 * ```
 *
 * @returns
 */
  toRgbSpaces(): string {
    return `${this.red} ${this.green} ${this.blue}`;
  }

  /**
 * Write to rgb (no alpha) commas
 *
 * @example
 * ```ts
 * rgba.toRgbCommas(); // 255, 100, 72
 * ```
 *
 * @returns
 */
  toRgbCommas(): string {
    return `${this.red}, ${this.green}, ${this.blue}%`;
  }

  /**
 * Write to css spaces with the percentage alpha value
 *
 * @example
 * ```ts
 * rgba.toCssSpacesPc(); // rgba(255 100 72 / 50%)
 * ```
 *
 * @returns
 */
  toCssSpacesPc(): string {
    return `rgba(${this.toSpacesPc()})`;
  }

  /**
 * Write to css commas with the percentage alpha value
 *
 * @example
 * ```ts
 * rgba.toCssCommasPc(); // rgba(255, 100, 72, 50%)
 * ```
 *
 * @returns
 */
  toCssCommasPc(): string {
    return `rgba(${this.toCommasPc()})`;
  }

  /**
 * Write to css spaces with the absolute alpha value
 *
 * @example
 * ```ts
 * rgba.toCssSpacesAbs(); // rgba(255 100 72 0.5)
 * ```
 *
 * @returns
 */
  toCssSpacesAbs(): string {
    return `rgba(${this.toSpacesAbs()})`;
  }

  /**
 * Write to css commas with the absolute alpha value
 *
 * @example
 * ```ts
 * rgba.rgbToSpaces(); // rgba(255, 100, 72, 0.5)
 * ```
 *
 * @returns
 */
  toCssCommasAbs(): string {
    return `rgba(${this.toCommasAbs()})`;
  }

  /**
 * Write to rgb (no alpha) spaces
 *
 * @example
 * ```ts
 * rgba.rgbToSpaces(); // rgb(255 100 72)
 * ```
 *
 * @returns
 */
  toCssRgbSpaces(): string {
    return `rgba(${this.toRgbSpaces()})`;
  }

  /**
 * Write to rgb (no alpha) commas
 *
 * @example
 * ```ts
 * rgba.rgbToSpaces(); // rgb(255, 100, 72)
 * ```
 *
 * @returns
 */
  toCssRgbCommas(): string {
    return `rgba(${this.toRgbCommas()})`;
  }
}

const q = new Rgba(10, 20, 30, Alpha.fromAbs(50));
