# @nkp/color

[![npm version](https://badge.fury.io/js/%40nkp%2Fcolor.svg)](https://www.npmjs.com/package/@nkp/color)
[![Node.js Package](https://github.com/nickkelly1/nkp-color/actions/workflows/release.yml/badge.svg)](https://github.com/nickkelly1/nkp-color/actions/workflows/release.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/nickkelly1/nkp-color/badge.svg)](https://snyk.io/test/github/nickkelly1/nkp-color)

Zero dependency utilities to parse and transforms rgb, rgba, and hex colors.

```ts
import { parseText } from '@nkp/color';

const text = `
this #aabbcc is text rgba(25, 125, 225, 50%) with
colors rgb(255 155 55) strewn throughout #abc.
`;

const modified: string = parseText(text).mapColors((match) => match
  .color
  .toRgbx({ useCommas: true, }));

// text becomes
//
// this rgb(170, 187, 204) is text rgba(25, 125, 225, 50%) with
// colors rgb(255, 155, 55) strewn throughout rgb(170, 187, 204).
```

## Table of contents

- [Exports](#exports)
- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
- [Usage](#usage)
  - [Parsing](#parsing)
  - [Transformation](#transformation)
- [Publishing](#publishing)

## Exports

`@nkp/color` exports both CommonJS and ES modules.


## Installation

### npm

```sh
npm install @nkp/color
```

### yarn

```sh
yarn add @nkp/color
```

### pnpm

```sh
pnpm install @nkp/color
```

## Usage

### Parsing

`@nkp/color` can parse text and return all the matched colors with RGBA values and details on their indeces, rgb/a separators (commas or spaces), and rgba absolute or percentage sign.

```ts
import { parseText, ParsedText } from '@nkp/color';

const parsed: ParsedText = parseText(`
this #aabbcc is text rgba(25, 125, 225, 50%) with
colors rgb(255 155 55) strewn throughout #abc.
`);

console.table(parsed.matches.map((match) => ({
  original: match.original,
  start: match.start,
  end: match.end,
  red: match.color.red,
  green: match.color.green,
  blue: match.color.blue,
  alpha: match.color.alpha?.toAbs(),
  hex: match.color.toHex(),
})));

┌─────────┬───────────────────────────┬───────┬─────┬─────┬───────┬──────┬───────────┬─────────────┐
│ (index) │         original          │ start │ end │ red │ green │ blue │   alpha   │     hex     │
├─────────┼───────────────────────────┼───────┼─────┼─────┼───────┼──────┼───────────┼─────────────┤
│    0    │         '#aabbcc'         │  10   │ 17  │ 170 │  187  │ 204  │ undefined │  '#aabbcc'  │
│    1    │ 'rgba(25, 125, 225, 50%)' │  26   │ 49  │ 25  │  125  │ 225  │    0.5    │ '#197de180' │
│    2    │     'rgb(255 155 55)'     │  66   │ 81  │ 255 │  155  │  55  │ undefined │  '#ff9b37'  │
│    3    │          '#abc'           │  100  │ 104 │ 170 │  187  │ 204  │ undefined │  '#aabbcc'  │
└─────────┴───────────────────────────┴───────┴─────┴─────┴───────┴──────┴───────────┴─────────────┘
```

### Transformation

After parsing text, `@nkp/color` the caller can transform selected colors to other types of color encoding.

```ts
import { parseText, ParsedText } from '@nkp/color';

const modified: string = parseText(`
this #aabbcc is text rgba(25, 125, 225, 50%) with
colors rgb(255 155 55) strewn throughout #abc.
`).mapColors((match) => match.color.toRgbx({ useCommas: true, }));

/**
 * this rgb(170, 187, 204) is text rgba(25, 125, 225, 50%) with
 * colors rgb(255, 155, 55) strewn throughout rgb(170, 187, 204).
 */
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
