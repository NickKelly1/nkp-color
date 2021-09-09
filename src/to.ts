import { MatchType } from './match';
import { parseText } from './parse';

/**
 * Convert colors within the text to RGB or RGBA
 *
 * @param text
 * @returns
 */
export function toRgbx(text: string): string {
  return parseText(text).mapColors((match) => {
    if (match.type === MatchType.Hex) {
      return match.color.toRgbx({
        useCommas: true,
        useCss: true,
        usePc: false,
      });
    }

    return match
      .color
      .toRgbx();
  });
}


/**
 * Convert colors within the text to RGBA
 *
 * @param text
 * @returns
 */
export function toRgba(text: string): string {
  return parseText(text).mapColors((match) => {
    if (match.type === MatchType.Hex) {
      return match.color.toRgba({
        useCommas: true,
        useCss: true,
        usePc: false,
      });
    }

    return match
      .color
      .toRgba();
  });
}


/**
 * Convert colors within the text to RGB
 *
 * @param text
 * @returns
 */
export function toRgb(text: string): string {
  return parseText(text).mapColors((match) => {
    if (match.type === MatchType.Hex) {
      return match.color.toRgb({
        useCommas: true,
        useCss: true,
      });
    }

    return match
      .color
      .toRgb();
  });
}

/**
 * Covert colors within the text to hex
 *
 * @param text
 * @returns
 */
export function toHex(text: string): string {
  return parseText(text).mapColors((match) => {
    return match.color.toHex();
  });
}
