/* https://github.com/peterthoeny/word-to-num, MIT License */

// word-to-numb tests
let test = [
    "show me number one",
    "show me number one item",
    "show me number one, would you?",
    "show me number one, then two, then three",
    "I want number two hundred",
    "I want number two hundred twenty five",
    "I want number two hundred and twenty five",
    "I want number two hundred thousand",
    "I want number two hundred thousand twenty five",
    "I want number two hundred and twelve thousand and twenty five",
    "minus two hundred and twelve thousand seven hundred and twenty five is negative",
    "I want number two hundred really",
    "I want number two hundred, ok?",
    "get three hundred twenty seven",
    "get three hundred and twenty seven",
    "twelve cards and two dices",
    "twelve point five two",
    "zero it is",
    "zero point nine",
    "one two three four",
    "one thousand two hundred and thirty four",
    "the number is four zero eight five five five one two one two",
    "the number is four o eight five five five one two one two",
    "show eleven point five",
    "show eleven dot five two",
    "show the second",
    "show the second one",
    "show the twelveth item",
    "show the 12th item",
    "show the fifty fivth item",
    "show size eleven point five",
    "show size eleven and half",
    "show size eleven and a half",
    "show size 11 + 1/2",
    "it's minus seven point five degrees",
    "it's negative twelve degrees"
];

const WordToNum = require( "../word-to-num.js" );
var w2n = new WordToNum();

w2n.setLang('english');
test.map(function (s) {
    let n = w2n.normalize(s);
    let e = w2n.extract(s);
    console.log('--- "' + s + '"\n -> "' + n + '", extract: ' + JSON.stringify(e));
});

// EOF
