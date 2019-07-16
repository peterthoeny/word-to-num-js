/* https://github.com/peterthoeny/word-to-num-js, MIT License */

// word to number function
function WordToNum() {

    // current lanuage
    this.language = 'english';

    this.languages = {
        english: {
            singles: {
                'zero': 0,
                'one': 1,
                'two': 2,
                'three': 3,
                'four': 4,
                'five': 5,
                'six': 6,
                'seven': 7,
                'eight': 8,
                'nine': 9,
                'ten': 10,
                'eleven': 11,
                'twelve': 12,
                'thirteen': 13,
                'fourteen': 14,
                'fifteen': 15,
                'sixteen': 16,
                'seventeen': 17,
                'eighteen': 18,
                'nineteen': 19,

                'first': 1,
                'second': 2,
                'third': 3,
                'fourth': 4,
                'fivth': 5,
                'sixth': 6,
                'seventh': 7,
                'eightth': 8,
                'nineth': 9,
                'tenth': 10,
                'eleventh': 11,
                'twelveth': 12,
                'thirteenth': 13,
                'fourteenth': 14,
                'fifteenth': 15,
                'sixteenth': 16,
                'seventeenth': 17,
                'eighteenth': 18,
                'nineteenth': 19
            },
            tens: {
                'twenty': 20,
                'thirty': 30,
                'forty': 40,
                'fifty': 50,
                'sixty': 60,
                'seventy': 70,
                'eighty': 80,
                'ninety': 90
            },
            magnitude: {
                'thousand':     1000,
                'million':      1000000,
                'billion':      1000000000,
                'trillion':     1000000000000
            }
        }
    }
}

// set language
WordToNum.prototype.setLang = function(language) {
	if (!this.languages[language]) {
		return false;
    }
	this.language = language;
	return true;
};

// normalize numbers, such as:
// "get the first one, then number twenty five" ==> "get the 1, then number 25"
WordToNum.prototype.normalize = function(text) {

    var isNum = false;
    var hasTens = false;
    var n = 0;
    var g = 0;
    var frac = '';
    var ws = '';
    let singles = this.languages[ this.language ].singles;
    let tens = this.languages[ this.language ].tens;
    let magnitude = this.languages[ this.language ].magnitude;

    text = text
    .replace(/([r1]st|[o2]nd|[i3]rd|[rvxnte0-9]th) one\b/g, '$1 \x01\x03\x05')
    .replace(/1st\b/g, '1')
    .replace(/2nd\b/g, '2')
    .replace(/3rd\b/g, '3')
    .replace(/ +and (a )?half\b/g, '.5')
    .replace(/ +\+ 1\/2\b/g, '.5')
    .replace(/([0-9])th\b/g, '$1')
    .replace(/([a-zA-Z]+)([^a-zA-Z]*)/g, function(match, p1, p2) {
        //console.log('p1: '+p1+', p2: "'+p2+'"');
        var p1l = p1.toLowerCase();
        var s = singles[p1l];
        var t = tens[p1l];
        var m = magnitude[p1l];
        if (s != null || (isNum && p1l.match(/^o$/i))) {
            s = s || 0;
            isNum = true;
            if (frac.length) {
                frac += s;
            } else if (hasTens) {
                g = g + s;
            } else {
                g = g * 10 + s;
            }
            ws = p2;
        } else if (t != null) {
            isNum = true;
            hasTens = true;
            if (frac.length) {
                frac += t;
            } else {
                g = g + t;
            }
            ws = p2;
        } else if (p1l == 'hundred') {
            isNum = true;
            hasTens = false;
            g = g * 100;
            ws = p2;
        } else if (m != null) {
            isNum = true;
            hasTens = false;
            n = n + g * m
            g = 0;
            ws = p2;
        } else if (isNum && p1l === 'and') {
            ws = p2;
        } else if (isNum && p1l.match(/^(dot|point)$/)) {
            frac = '.';
            ws = p2;
        } else if (isNum) {
            var out = (n + g).toString() + frac + ws + p1 + p2;
            n = 0;
            g = 0;
            frac = '';
            hasTens = false;
            isNum = false;
            return out;
        } else {
            return p1 + p2;
        }
        return '';
    })
    .replace(/\b(minus|negative) ([0-9])/g, '-$2')
    .replace(/ \x01\x03\x05/g, ' one');
    if(isNum) {
        text += (n + g).toString() + frac + ws;
    }
    return text;
};

// extract numbers, such as:
// "get the first one, then number twenty five" ==> [1, 25]
WordToNum.prototype.extract = function(text) {
    var nums = [];
    this.normalize(text).replace(/(-?[0-9]+(\.[0-9]+)?)/g, function(match, p1) {
        nums.push(Number(p1));
        return p1;
    });
    return nums;
};

module.exports = WordToNum;

// EOF
