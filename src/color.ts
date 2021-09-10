/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Alpha } from './alpha';
import { toColorHex } from './utils';


/**
 * @class
 * Color
 *
 * Represents a red-green-blue-alpha value
 */
export class Color {
  public readonly red: number;
  public readonly green: number;
  public readonly blue: number;
  public readonly alpha: null | Alpha;
  public readonly useCommas: boolean;
  public readonly useCss: boolean;
  public readonly useHex: boolean;
  public readonly usePc: boolean;
  public readonly useHash: boolean;

  /**
   * Create a new instance of Rgba
   *
   * @param properties
   * @returns
   */
  static from(properties: {
    red: number,
    green: number,
    blue: number,
    alpha?: null | number | Alpha,
    useCommas?: boolean,
    useCss?: boolean,
    useHex?: boolean,
    usePc?: boolean,
    useHash?: boolean,
  }): Color {
    return new Color(
      properties.red,
      properties.green,
      properties.blue,
      properties.alpha,
      properties.useCommas,
      properties.useCss,
      properties.useHex,
      properties.usePc,
      properties.useHash,
    );
  }

  /**
   * @constructor
   * Construct an instance of the Rgba class
   *
   * @param red
   * @param green
   * @param blue
   * @param alpha
   * @param useCommas
   * @param useCss
   * @param useHex
   * @param usePc
   * @param useHash
   */
  constructor(
    red: number,
    green: number,
    blue: number,
    alpha?: null | number | Alpha,
    useCommas = true,
    useCss = true,
    useHex = false,
    usePc = true,
    useHash = true,
  ) {
    this.red = Math.max(Math.min(255, red), 0);
    this.green = Math.max(Math.min(255, green), 0);
    this.blue = Math.max(Math.min(255, blue), 0);
    this.alpha =  typeof alpha === 'number'
      ? new Alpha(alpha, false, false)
      : (alpha ?? null);
    this.useCommas = useCommas;
    this.useCss = useCss;
    this.useHex = useHex;
    this.usePc = usePc;
    this.useHash = useHash;
  }

  /**
   * Write to array
   *
   * @returns
   */
  toArray(): [red: number, green: number, blue: number, alpha: null | Alpha] {
    return [this.red, this.green, this.blue, this.alpha,];
  }

  /**
   * Write to hex, hex alpha, rgb or rgba in the same way that was input
   *
   * @example
   * ```ts
   * color.string(); // #aabbcc
   * color.string(); // #aabbccff
   * color.string(); // aabbcc
   * color.string(); // aabbccff
   * color.string(); // rgba(255, 100, 72, 50%)
   * color.string(); // rgba(255, 100, 72, 0.5)
   * color.string(); // 255, 100, 72, 50%
   * color.string(); // 255, 100, 72, 0.5
   * color.string(); // rgba(255 100 72 / 50%)
   * color.string(); // rgba(255 100 72 / 0.5)
   * color.string(); // 255 100 72 / 50%
   * color.string(); // 255 100 72 / 0.5
   * color.string(); // rgba(255, 100, 72)
   * color.string(); // 255, 100, 72
   * color.string(); // rgba(255 100 72)
   * color.string(); // 255 100 72
   * ```
   *
   * @returns
   */
  string(options?: {
    useHex?: boolean,
    useAlpha?: boolean,
    useHash?: boolean,
    useCommas?: boolean,
    useCss?: boolean,
    usePc?: boolean,
  }): string {
    const useHex = options?.useHex ?? this.useHex;
    const useAlpha = options?.useAlpha ?? !!this.alpha;
    const useHash = options?.useHash ?? this.useHash;
    const useCommas = options?.useCommas ?? this.useCommas;
    const useCss = options?.useCss ?? this.useCss;
    const usePc = options?.usePc ?? this.usePc;

    if (useHex) return this.toHex({
      useAlpha,
      useHash,
    });
    return this.toRgbx({
      useCommas,
      useCss,
      usePc,
    });
  }


  /**
   * Write to rgba or rgba in the same way that was input
   *
   * @example
   * ```ts
   * color.toRgbx(); // rgba(255, 100, 72, 50%)
   * color.toRgbx(); // rgba(255, 100, 72, 0.5)
   * color.toRgbx(); // 255, 100, 72, 50%
   * color.toRgbx(); // 255, 100, 72, 0.5
   * color.toRgbx(); // rgba(255 100 72 / 50%)
   * color.toRgbx(); // rgba(255 100 72 / 0.5)
   * color.toRgbx(); // 255 100 72 / 50%
   * color.toRgbx(); // 255 100 72 / 0.5
   * color.toRgbx(); // rgba(255, 100, 72)
   * color.toRgbx(); // 255, 100, 72
   * color.toRgbx(); // rgba(255 100 72)
   * color.toRgbx(); // 255 100 72
   * ```
   *
   * @returns
   */
  toRgbx(options?: {
    useCommas?: boolean,
    useCss?: boolean,
    usePc?: boolean,
  }): string {
    const useCommas= options?.useCommas ?? this.useCommas;
    const useCss= options?.useCss ?? this.useCss;
    const usePc= options?.usePc ?? this.usePc;

    if (this.alpha) return this.toRgba({ useCommas, useCss, usePc,});
    return this.toRgb({ useCommas, useCss, });
  }

  /**
   * Write to rgba in the same way as was input
   *
   * @example
   * ```ts
   * color.toRgba(); // rgba(255, 100, 72, 50%)
   * color.toRgba(); // rgba(255, 100, 72, 0.5)
   * color.toRgba(); // 255, 100, 72, 50%
   * color.toRgba(); // 255, 100, 72, 0.5
   * color.toRgba(); // rgba(255 100 72 / 50%)
   * color.toRgba(); // rgba(255 100 72 / 0.5)
   * color.toRgba(); // 255 100 72 / 50%
   * color.toRgba(); // 255 100 72 / 0.5
   * ```
   *
   * @returns
   */
  toRgba(options?: {
    useCommas?: boolean,
    useCss?: boolean,
    usePc?: boolean,
  }): string {
    const useCommas = options?.useCommas ?? this.useCommas;
    const useCss = options?.useCss ?? this.useCss;
    const usePc = options?.usePc ?? this.usePc;

    if (useCommas) {
      // commas
      if (useCss) {
        // commas, css
        if (usePc) {
          // commas, css, pc
          return this.toRgbaCssCommasPc();
        } else {
          // commas, css, abs
          return this.toRgbaCssCommasAbs();
        }
      }
      // commas, raw
      if (usePc) {
        // commas, raw, pc
        return this.toRgbaRawCommasPc();
      } else {
        // commas, raw, abs
        return this.toRgbaRawCommasAbs();
      }
    }

    // spaces
    if (useCss) {
      // spaces, css
      if (usePc) {
        // spaces, css, pc
        return this.toRgbaCssSpacesPc();
      } else {
        // spaces, css, abs
        return this.toRgbaCssSpacesAbs();
      }
    }
    // spaces, raw
    if (usePc) {
      // spaces, raw, pc
      return this.toRgbaRawSpacesPc();
    } else {
      // spaces, raw, abs
      return this.toRgbaRawSpacesAbs();
    }
  }


  /**
   * Write to rgb in the same way that was input
   *
   * @example
   * ```ts
   * color.toRgb(); // rgba(255, 100, 72)
   * color.toRgb(); // 255, 100, 72
   * color.toRgb(); // rgba(255 100 72)
   * color.toRgb(); // 255 100 72
   * ```
   *
   * @returns
   */
  toRgb(options?: {
    useCommas?: boolean,
    useCss?: boolean,
  }): string {
    const useCommas = options?.useCommas ?? this.useCommas;
    const useCss = options?.useCss ?? this.useCss;

    if (useCommas) {
      // commas
      if (useCss) {
        // commas, css
        return this.toRgbCssCommas();
      }
      // commas, raw
      return this.toRgbRawCommas();
    }

    // spaces
    if (useCss) {
      // spaces, css
      return this.toRgbCssSpaces();
    }
    return this.toRgbRawSpaces();
  }


  /**
   * Write to spaces with the percentage alpha value
   *
   * @example
   * ```ts
   * color.toSpacesPc(); // 255 100 72 / 50%
   * ```
   *
   * @returns
   */
  toRgbaRawSpacesPc(): string {
    return `${this.red} ${this.green} ${this.blue} / ${this.alpha?.toPc() ?? 100}%`;
  }

  /**
   * Write to commas with the percentage alpha value
   *
   * @example
   * ```ts
   * color.toCommasPc(); // 255, 100, 72, 50%
   * ```
   *
   * @returns
   */
  toRgbaRawCommasPc(): string {
    return `${this.red}, ${this.green}, ${this.blue}, ${this.alpha?.toPc() ?? 100}%`;
  }

  /**
   * Write to spaces with the absolute alpha value
   *
   * @example
   * ```ts
   * color.toSpacesAbs(); // 255 100 72 / 0.5
   * ```
   *
   * @returns
   */
  toRgbaRawSpacesAbs(): string {
    return `${this.red} ${this.green} ${this.blue} / ${this.alpha?.toPc() ?? 1}`;
  }

  /**
   * Write to commas with the absolute alpha value
   *
   * @example
   * ```ts
   * color.toSpacesAbs(); // 255, 100, 72, 0.5
   * ```
   *
   * @returns
   */
  toRgbaRawCommasAbs(): string {
    return `${this.red}, ${this.green}, ${this.blue}, ${this.alpha?.toAbs() ?? 1}`;
  }

  /**
   * Write to rgb (no alpha) spaces
   *
   * @example
   * ```ts
   * color.toRgbSpaces(); // 255 100 72
   * ```
   *
   * @returns
   */
  toRgbRawSpaces(): string {
    return `${this.red} ${this.green} ${this.blue}`;
  }

  /**
   * Write to rgb (no alpha) commas
   *
   * @example
   * ```ts
   * color.toRgbCommas(); // 255, 100, 72
   * ```
   *
   * @returns
   */
  toRgbRawCommas(): string {
    return `${this.red}, ${this.green}, ${this.blue}`;
  }

  /**
   * Write to css spaces with the percentage alpha value
   *
   * @example
   * ```ts
   * color.toCssSpacesPc(); // rgba(255 100 72 / 50%)
   * ```
   *
   * @returns
   */
  toRgbaCssSpacesPc(): string {
    return `rgba(${this.toRgbaRawSpacesPc()})`;
  }

  /**
   * Write to css commas with the percentage alpha value
   *
   * @example
   * ```ts
   * color.toCssCommasPc(); // rgba(255, 100, 72, 50%)
   * ```
   *
   * @returns
   */
  toRgbaCssCommasPc(): string {
    return `rgba(${this.toRgbaRawCommasPc()})`;
  }

  /**
   * Write to css spaces with the absolute alpha value
   *
   * @example
   * ```ts
   * color.toCssSpacesAbs(); // rgba(255 100 72 / 0.5)
   * ```
   *
   * @returns
   */
  toRgbaCssSpacesAbs(): string {
    return `rgba(${this.toRgbaRawSpacesAbs()})`;
  }

  /**
   * Write to css commas with the absolute alpha value
   *
   * @example
   * ```ts
   * color.rgbToSpaces(); // rgba(255, 100, 72, 0.5)
   * ```
   *
   * @returns
   */
  toRgbaCssCommasAbs(): string {
    return `rgba(${this.toRgbaRawCommasAbs()})`;
  }

  /**
   * Write to rgb (no alpha) spaces
   *
   * @example
   * ```ts
   * color.rgbToSpaces(); // rgb(255 100 72)
   * ```
   *
   * @returns
   */
  toRgbCssSpaces(): string {
    return `rgb(${this.toRgbRawSpaces()})`;
  }

  /**
   * Write to rgb (no alpha) commas
   *
   * @example
   * ```ts
   * color.rgbToSpaces(); // rgb(255, 100, 72)
   * ```
   *
   * @returns
   */
  toRgbCssCommas(): string {
    return `rgb(${this.toRgbRawCommas()})`;
  }


  /**
   * Write to hex in the same way as was input
   *
   * @example
   * ```ts
   * color.toHex(); // #aabbcc
   * color.toHex(); // #aabbccff
   * color.toHex(); // aabbcc
   * color.toHex(); // aabbccff
   * ```
   *
   * @returns
   */
  toHex(options?: {
    useHash?: boolean,
    useAlpha?: boolean,
  }): string {
    const useHash = options?.useHash ?? this.useHash;
    const useAlpha = options?.useAlpha ?? !!this.alpha;

    if (useAlpha) {
      if (useHash) {
        // alpha, hash
        return this.toHashcodeRgba();
      }
      // alpha, no-hash
      return this.toHexRgba();
    }
    if (useHash) {
      // no-alpha, hash
      return this.toHashcodeRgb();
    }
    // no-alpha, no-hash
    return this.toHexRgb();
  }


  /**
   * Hex code of the color
   *
   * @example
   * ```ts
   * color.toHexRgb(); // aabbcc
   * ```
   *
   * @returns
   */
  toHexRgb(): string {
    if (this._hexRgb != null) return this._hexRgb;
    this._hexRgb = `${this.toHexRed()}${this.toHexGreen()}${this.toHexBlue()}`;
    return this._hexRgb;
  }
  protected _hexRgb?: string;


  /**
   * Hex code of the color with alpha
   *
   * @example
   * ```ts
   * color.toHexRgba(); // aabbccdd
   * ```
   *
   * @returns
   */
  toHexRgba(): string {
    if (this._hexRgba != null) return this._hexRgba;
    this._hexRgba = this.toHexRgb() + (this.alpha?.toHex() ?? 'ff');
    return this._hexRgba;
  }
  protected _hexRgba?: string;


  /**
   * Hex code of the color, preceeded by hash
   *
   * @example
   * ```ts
   * color.toHashcodeRgb(); // #aabbcc
   * ```
   *
   * @returns
   */
  toHashcodeRgb(): string {
    if (this._hashcode !== undefined) return this._hashcode;
    this._hashcode = '#' + this.toHexRgb();
    return this._hashcode;
  }
  protected _hashcode?: string;


  /**
   * Hex code of the color with alpha, preceeded by hash
   *
   * @example
   * ```ts
   * color.toHashcodeRgba(); // #aabbccdd
   * ```
   *
   * @returns
   */
  toHashcodeRgba(): string {
    if (this._hashCodeRgba !== undefined) return this._hashCodeRgba;
    this._hashCodeRgba = '#' + this.toHexRgba();
    return this._hashCodeRgba;
  }
  protected _hashCodeRgba?: string;


  /**
   * Hex code of red
   *
   * @example
   * ```ts
   * color.toHexAlpha(); // aa
   * ```
   *
   * @returns
   */
  toHexRed(): string {
    if (this._hexRed !== undefined) return this._hexRed;
    this._hexRed = toColorHex(this.red);
    return this._hexRed;
  }
  protected _hexRed?: string;


  /**
   * Hex code of green
   *
   * @example
   * ```ts
   * color.toHexAlpha(); // bb
   * ```
   *
   * @returns
   */
  toHexGreen(): string {
    if (this._hexGreen !== undefined) return this._hexGreen;
    this._hexGreen = toColorHex(this.green);
    return this._hexGreen;
  }
  protected _hexGreen?: string;


  /**
   * Hex code of the blue
   *
   * @example
   * ```ts
   * color.toHexAlpha(); // cc
   * ```
   *
   * @returns
   */
  toHexBlue(): string {
    if (this._hexBlue !== undefined) return this._hexBlue;
    this._hexBlue = toColorHex(this.blue);
    return this._hexBlue;
  }
  protected _hexBlue?: string;


  /**
   * Hex code of alpha
   *
   * @example
   * ```ts
   * color.toHexAlpha(); // aabbccff
   * ```
   *
   * @returns
   */
  toHexAlpha(): string {
    if (this._hexAlpha !== undefined) return this._hexAlpha;
    this._hexAlpha = this.alpha?.toHex() ?? 'ff';
    return this._hexAlpha;
  }
  protected _hexAlpha?: string;
}
