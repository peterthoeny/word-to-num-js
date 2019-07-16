# WordToNum (js) [![Build Status](https://travis-ci.org/peterthoeny/word-to-num-js.svg?branch=master)](https://travis-ci.org/peterthoeny/word-to-num-js)

## Convert a string containing word-numbers to all their digits
WordToNum lets you normalize any string for all of its word-numbers into
digits, as well as extract word-numbers into an array of numbers.
Ordinal numbers ("first, second, third") are normalized to cardinal numbers
("1, 2, 3").

```
"eleventh floor"
- normalize: "11 floor"
- extract: [ 11 ]
"Show me number two hundred"
- normalize: "Show me number 200"
- extract: [ 200 ]
"twelve cards and two dices"
- normalize: "12 cards and 2 dices"
- extract: [ 12, 2 ]
"it's minus seven point five degrees"
- normalize: "it's -7.5 degrees"
- extract: [ -7.5 ]
```

## Table of contents

- [Usage](#usage)
- [Dependencies](#dependencies)

## Usage
There are two main functions, one to normalize text, one to extract numbers.

```js
var WordToNum = require( "word-to-num.js" );
var w2n = new WordToNum();

w2n.normalize( "eleventh floor" ); // "11 floor"
w2n.extract(   "eleventh floor" ); // [ 11 ]
w2n.normalize( "Show me number two hundred" ); // "Show me number 200"
w2n.extract(   "Show me number two hundred" ); // [ 200 ]
w2n.normalize( "I want the second one" ); // "I want the 2"
w2n.extract(   "I want the second one" ); // [ 2 ]
w2n.normalize( "twelve cards and two dices" ); // "12 cards and 2 dices"
w2n.extract(   "twelve cards and two dices" ); // [ 12, 2 ]
```

## Dependencies
None.
