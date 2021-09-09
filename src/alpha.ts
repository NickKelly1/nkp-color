/* eslint-disable @typescript-eslint/no-explicit-any */
import { toColorHex } from './utils';

export class Alpha {
  /**
   * Create an Alpha instance
   *
   * @param str
   * @returns
   */
  static fromHex(str: string): Alpha {
    return new Alpha(parseInt(str, 16) / 255, false, true);
  }

  /**
   * Create an Alpha instance
   *
   * @param str
   * @returns
   */
  static fromRgbx(str: string): Alpha {
    if (str.endsWith('%')) {
      const pc = str.substr(0, str.length - 1);
      return new Alpha(Number(pc), true, false);
    }
    return new Alpha(Number(str), false, false);
  }

  /**
   * Constructor
   *
   * @param raw
   * @param isPc
   */
  constructor(
    public readonly raw: number,
    public readonly isPc: boolean,
    public readonly isHex: boolean,
  ) {}


  /**
   * Absolute base-10 value of the alpha
   *
   * @returns
   */
  public toAbs(): number {
    if (this._abs !== undefined) return this._abs;
    this._abs = this.isPc ? this.raw / 100 : this.raw;
    return this._abs;
  }
  protected _abs?: number;

  /**
   * Percentage value of the alpha
   *
   * @returns
   */
  public toPc(): number {
    if (this._pc !== undefined) return this._pc;
    this._pc = this.isPc ? this.raw : this.raw * 100;
    return this._pc;
  }
  protected _pc?: number;

  /**
   * Hex code of alpha
   *
   * @returns
   */
  public toHex(): string {
    if (this._hex !== undefined) return this._hex;
    this._hex = toColorHex(Math.round(this.toAbs() * 255));
    return this._hex;
  }
  protected _hex?: string;
}

