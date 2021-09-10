/* eslint-disable @typescript-eslint/no-explicit-any */
import { toColorHex } from './utils';

const absPrecision = 3;

export class Alpha {
  /**
   * Normalise an absolute value
   *
   * @param abs
   * @returns
   */
  static normaliseAbs(abs: number): number {
    return Math.round(Math.min(Math.max( abs, 0), 1) * (10 ** absPrecision)) / (10 ** absPrecision);
  }

  /**
   * Normalise an absolute percentage value
   *
   * @param pc
   * @returns
   */
  static normalisePc(pc: number): number {
    return Math.round(Math.min(Math.max(pc, 0), 100));
  }

  /**
   * normalise an absolute 255 (hex) value
   *
   * @param abs255
   * @returns
   */
  static normaliseAbs255(abs255: number): number {
    return Math.round(Math.min(Math.max(abs255, 0), 255));
  }

  /**
   * Create an Alpha instance from a string or number
   *
   * - Number is interpreted as absolute value between 0 and 1
   * - String is interpreted as either % or hex value
   *
   * @param str
   * @returns
   */
  static from(str: number | string): Alpha {
    if (typeof str === 'number') return Alpha.fromRgba(str.toString());
    const _str = str.trim();
    if (_str.endsWith('%')) return Alpha.fromRgba(_str);
    return Alpha.fromHex(str);
  }


  /**
   * Create an Alpha instance
   *
   * @param str
   * @returns
   */
  static fromHex(str: string): Alpha {
    return new Alpha(
      str,
      null,
      null,
    );
  }

  /**
   * Create an Alpha instance
   *
   * @param str
   * @returns
   */
  static fromRgba(str: string): Alpha {
    if (str.endsWith('%')) {
      // percentage
      const pc = str.substr(0, str.length - 1);
      return Alpha.fromPc(Number(pc));
    }
    return Alpha.fromAbs(Number(str));
  }

  /**
   * Create an Alpha from a percentage
   *
   * @param pc
   * @returns
   */
  static fromPc(pc: number): Alpha {
    return new Alpha(
      null,
      null,
      pc,
    );
  }

  /**
   * Create an alpha from an absolute value between 0 and 1
   *
   * @param abs1
   * @returns
   */
  static fromAbs(abs1: number): Alpha {
    // absolute
    return new Alpha(
      null,
      abs1,
      null,
    );
  }

  /**
   * Constructor
   *
   * @param hex
   * @param abs1
   * @param pc
   */
  constructor(hex: string, abs1: null, pc: null)
  constructor(hex: null, abs1: number, pc: null)
  constructor(hex: null, abs1: null, pc: number)
  constructor(
    protected readonly hex: null | string,
    protected readonly abs1: null | number,
    protected readonly pc: null | number
  ) {
    if (this.hex === null
      && this.abs1 === null
      && this.pc === null
    ) {
      throw new TypeError('[@nkp/color::Alpha::constructor] No input type');
    }
  }

  /**
   * Was this created from a percentage value?
   *
   * @returns
   */
  isPc(): boolean {
    return this.pc !== null;
  }

  /**
   * Was this created from an absolute value?
   *
   * @returns
   */
  isAbs(): boolean {
    return this.abs1 !== null;
  }

  /**
   * Was this created from a hex value?
   *
   * @returns
   */
  isHex(): boolean {
    return this.hex !== null;
  }


  /**
   * Absolute base-10 value of the alpha
   *
   * @returns
   */
  public toAbs(): number {
    if (this._abs !== undefined) return this._abs;

    if (this.abs1 !== null)
      this._abs = this.abs1;

    else if (this.pc !== null)
      this._abs = Alpha.normaliseAbs(this.pc / 100);

    else if (this.hex !== null)
      this._abs = Alpha.normaliseAbs(parseInt(this.hex, 16) / 255);

    return this._abs!;
  }
  protected _abs?: number;

  /**
   * Percentage value of the alpha
   *
   * @returns
   */
  public toPc(): number {
    if (this._pc !== undefined) return this._pc;

    if (this.pc !== null)
      this._pc = this.pc;

    if (this.abs1 !== null)
      this._pc = Alpha.normalisePc(100 * this.abs1);

    else if (this.hex !== null)
      this._pc = Alpha.normalisePc(100 * parseInt(this.hex, 16) / 255);

    return this._pc!;
  }
  protected _pc?: number;

  /**
   * Hex code of alpha
   *
   * @returns
   */
  public toHex(): string {
    if (this._hex !== undefined) return this._hex;

    if (this.hex !== null)
      this._hex = this.hex;

    if (this.abs1 !== null)
      this._hex = toColorHex(Alpha.normaliseAbs255(255 * this.abs1));

    else if (this.pc !== null)
      this._hex = toColorHex(Alpha.normaliseAbs255(255 * this.pc / 100));

    return this._hex!;
  }
  protected _hex?: string;
}

