# @nkp/colors

Fill in the following:

[![npm version](https://badge.fury.io/js/%40nkp%2Fcolors.svg)](https://www.npmjs.com/package/@nkp/colors)
[![Node.js Package](https://github.com/nickkelly1/nkp-colors/actions/workflows/release.yml/badge.svg)](https://github.com/nickkelly1/nkp-colors/actions/workflows/release.yml)
![Known Vulnerabilities](https://snyk.io/test/github/nickkelly1/nkp-colors/badge.svg)

NPM package. Parses RGB and hex colors and can convert between them.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [Exports](#exports)
- [Usage](#usage)
  - [Parsing](#parsing)
  - [Transformation](#transformation)

## Installation

### NPM

```sh
npm install @nkp/colors
```

### Yarn

```sh
yarn add @nkp/colors
```

### Exports

`@nkp/colors` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

### Parsing

`@nkp/colours` can parse text and return all the matched colours with RGBA values and details on their indeces, rgb/a separators (commas or spaces), and rgba absolute or percentage sign.

```ts
import { parseText, ParsedText } from '@nkp/colors';

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

After parsing text, `@nkp/colours` the caller can transform selected colours to other types of colour encoding.

```ts
import { parseText, ParsedText } from '@nkp/colors';

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
