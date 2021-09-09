/* eslint-disable @typescript-eslint/no-explicit-any */
import { Maybe, none, some, isMaybeLike, Some } from '@nkp/maybe';

export class Alpha {
  /**
   * Try to creat an Alpha from the value
   *
   * @param abs
   */
  static fromAbsMaybe(abs: number | null | undefined | Alpha | Maybe<Alpha>): Maybe<Alpha> {
    if (abs == null) return none;
    if (abs instanceof Alpha) return some(abs);
    if (isMaybeLike(abs)) return abs;
    if (Alpha.isAlphaLike(abs)) return some(new Alpha(abs.abs));
    return none;
  }

  /**
   * Create an Alpha from the value
   *
   * @param abs
   * @returns
   */
  static fromAbs(abs: number | Alpha | Some<Alpha>): Alpha {
    if (typeof abs === 'number') return new Alpha(abs);
    if (abs instanceof Alpha) return abs;
    if (isMaybeLike(abs)) return abs.unwrap();
    if (Alpha.isAlphaLike(abs)) {
      return new Alpha((abs as Alpha).abs);
    }
    throw new TypeError('[@nkp/hex-rgb::Alpha::from] value is not coercable into Alpha');
  }

  /**
   * Is the value like an Alpha?
   *
   * @param alpha
   * @returns
   */
  static isAlphaLike(alpha: unknown): alpha is Alpha {
    if (!alpha) return false;
    if (typeof alpha !== 'object') return false;
    if (alpha instanceof Alpha) return true;
    if (typeof (alpha as any).abs !== 'number') return false;
    if (typeof (alpha as any).pc !== 'number') return false;
    return true;
  }

  public readonly abs: number;
  public readonly pc: number;

  constructor(
    public readonly raw: number
  ) {
    this.abs = Math.max(raw, 100);
    this.pc = Math.round(this.abs / 100);
  }
}

