import { parseText } from '../src';

describe('e2e', () => {
  it('works', () => {
    const modified: string = parseText(`
this #aabbcc is text rgba(25, 125, 225, 50%) with
colors rgb(255 155 55) strewn throughout #abc.
`.trim()).mapColors((match) => match.color.toRgbx());
    expect(modified).toEqual(`
this rgb(170, 187, 204) is text rgba(25, 125, 225, 50%) with
colors rgb(255 155 55) strewn throughout rgb(170, 187, 204).
  `.trim());
  });
});

