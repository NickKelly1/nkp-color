import { ColorMatch, match, matchAll } from './match';
import { REGEX_COLORS } from './regex';


/**
 * Parse a color
 *
 * @param line
 * @returns
 */
export function parse(line: string): null | ColorMatch {
  const array = line.match(new RegExp(REGEX_COLORS.str, 'i'));
  if (!array) return null;
  const color = match(array);
  return color;
}


/**
 * Scan the text for colors and possibly modify them
 *
 * @param text
 * @param map
 * @returns
 */
export function parseText(text: string): ParsedText {
  const matches = matchAll(text.matchAll(new RegExp(REGEX_COLORS.str, 'gi')));
  return new ParsedText(text, Array.from(matches));
}

/**
 * Allows transformation of colors in parsed text
 */
export class ParsedText {
  constructor(
    public readonly original: string,
    public readonly matches: Array<ColorMatch>
  ) {
    //
  }

  /**
   * Map all colors within the original text to produce a new text
   *
   * @param callbackfn
   * @returns
   */
  mapColors(callbackfn: ((match: ColorMatch, currentIndex: number) => string)): string {
    let delta = 0;
    let modifiedText = this.original;
    let i = 0;
    for (const match of this.matches) {
      const mapTo = callbackfn(match, i);
      if (mapTo == null) continue;
      modifiedText =
        modifiedText.substr(0, match.start + delta)
        + mapTo
        + modifiedText.substr(match.start + delta + match.length);
      delta += mapTo.length - match.length;
      i += 1;
    }
    return modifiedText;
  }
}
