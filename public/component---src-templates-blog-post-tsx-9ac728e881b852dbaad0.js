(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[19],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/regenerate v1.4.1 by @mathias | MIT license */
;

(function (root) {
  // Detect free variables `exports`.
  var freeExports =  true && exports; // Detect free variable `module`.

  var freeModule =  true && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js/io.js or Browserified code,
  // and use it as `root`.

  var freeGlobal = typeof global == 'object' && global;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }
  /*--------------------------------------------------------------------------*/


  var ERRORS = {
    'rangeOrder': "A range\u2019s `stop` value must be greater than or equal " + 'to the `start` value.',
    'codePointRange': 'Invalid code point value. Code points range from ' + 'U+000000 to U+10FFFF.'
  }; // https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs

  var HIGH_SURROGATE_MIN = 0xD800;
  var HIGH_SURROGATE_MAX = 0xDBFF;
  var LOW_SURROGATE_MIN = 0xDC00;
  var LOW_SURROGATE_MAX = 0xDFFF; // In Regenerate output, `\0` is never preceded by `\` because we sort by
  // code point value, so let’s keep this regular expression simple.

  var regexNull = /\\x00([^0123456789]|$)/g;
  var object = {};
  var hasOwnProperty = object.hasOwnProperty;

  var extend = function extend(destination, source) {
    var key;

    for (key in source) {
      if (hasOwnProperty.call(source, key)) {
        destination[key] = source[key];
      }
    }

    return destination;
  };

  var forEach = function forEach(array, callback) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
      callback(array[index], index);
    }
  };

  var toString = object.toString;

  var isArray = function isArray(value) {
    return toString.call(value) == '[object Array]';
  };

  var isNumber = function isNumber(value) {
    return typeof value == 'number' || toString.call(value) == '[object Number]';
  }; // This assumes that `number` is a positive integer that `toString()`s nicely
  // (which is the case for all code point values).


  var zeroes = '0000';

  var pad = function pad(number, totalCharacters) {
    var string = String(number);
    return string.length < totalCharacters ? (zeroes + string).slice(-totalCharacters) : string;
  };

  var hex = function hex(number) {
    return Number(number).toString(16).toUpperCase();
  };

  var slice = [].slice;
  /*--------------------------------------------------------------------------*/

  var dataFromCodePoints = function dataFromCodePoints(codePoints) {
    var index = -1;
    var length = codePoints.length;
    var max = length - 1;
    var result = [];
    var isStart = true;
    var tmp;
    var previous = 0;

    while (++index < length) {
      tmp = codePoints[index];

      if (isStart) {
        result.push(tmp);
        previous = tmp;
        isStart = false;
      } else {
        if (tmp == previous + 1) {
          if (index != max) {
            previous = tmp;
            continue;
          } else {
            isStart = true;
            result.push(tmp + 1);
          }
        } else {
          // End the previous range and start a new one.
          result.push(previous + 1, tmp);
          previous = tmp;
        }
      }
    }

    if (!isStart) {
      result.push(tmp + 1);
    }

    return result;
  };

  var dataRemove = function dataRemove(data, codePoint) {
    // Iterate over the data per `(start, end)` pair.
    var index = 0;
    var start;
    var end;
    var length = data.length;

    while (index < length) {
      start = data[index];
      end = data[index + 1];

      if (codePoint >= start && codePoint < end) {
        // Modify this pair.
        if (codePoint == start) {
          if (end == start + 1) {
            // Just remove `start` and `end`.
            data.splice(index, 2);
            return data;
          } else {
            // Just replace `start` with a new value.
            data[index] = codePoint + 1;
            return data;
          }
        } else if (codePoint == end - 1) {
          // Just replace `end` with a new value.
          data[index + 1] = codePoint;
          return data;
        } else {
          // Replace `[start, end]` with `[startA, endA, startB, endB]`.
          data.splice(index, 2, start, codePoint, codePoint + 1, end);
          return data;
        }
      }

      index += 2;
    }

    return data;
  };

  var dataRemoveRange = function dataRemoveRange(data, rangeStart, rangeEnd) {
    if (rangeEnd < rangeStart) {
      throw Error(ERRORS.rangeOrder);
    } // Iterate over the data per `(start, end)` pair.


    var index = 0;
    var start;
    var end;

    while (index < data.length) {
      start = data[index];
      end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
      // Exit as soon as no more matching pairs can be found.

      if (start > rangeEnd) {
        return data;
      } // Check if this range pair is equal to, or forms a subset of, the range
      // to be removed.
      // E.g. we have `[0, 11, 40, 51]` and want to remove 0-10 → `[40, 51]`.
      // E.g. we have `[40, 51]` and want to remove 0-100 → `[]`.


      if (rangeStart <= start && rangeEnd >= end) {
        // Remove this pair.
        data.splice(index, 2);
        continue;
      } // Check if both `rangeStart` and `rangeEnd` are within the bounds of
      // this pair.
      // E.g. we have `[0, 11]` and want to remove 4-6 → `[0, 4, 7, 11]`.


      if (rangeStart >= start && rangeEnd < end) {
        if (rangeStart == start) {
          // Replace `[start, end]` with `[startB, endB]`.
          data[index] = rangeEnd + 1;
          data[index + 1] = end + 1;
          return data;
        } // Replace `[start, end]` with `[startA, endA, startB, endB]`.


        data.splice(index, 2, start, rangeStart, rangeEnd + 1, end + 1);
        return data;
      } // Check if only `rangeStart` is within the bounds of this pair.
      // E.g. we have `[0, 11]` and want to remove 4-20 → `[0, 4]`.


      if (rangeStart >= start && rangeStart <= end) {
        // Replace `end` with `rangeStart`.
        data[index + 1] = rangeStart; // Note: we cannot `return` just yet, in case any following pairs still
        // contain matching code points.
        // E.g. we have `[0, 11, 14, 31]` and want to remove 4-20
        // → `[0, 4, 21, 31]`.
      } // Check if only `rangeEnd` is within the bounds of this pair.
      // E.g. we have `[14, 31]` and want to remove 4-20 → `[21, 31]`.
      else if (rangeEnd >= start && rangeEnd <= end) {
          // Just replace `start`.
          data[index] = rangeEnd + 1;
          return data;
        }

      index += 2;
    }

    return data;
  };

  var dataAdd = function dataAdd(data, codePoint) {
    // Iterate over the data per `(start, end)` pair.
    var index = 0;
    var start;
    var end;
    var lastIndex = null;
    var length = data.length;

    if (codePoint < 0x0 || codePoint > 0x10FFFF) {
      throw RangeError(ERRORS.codePointRange);
    }

    while (index < length) {
      start = data[index];
      end = data[index + 1]; // Check if the code point is already in the set.

      if (codePoint >= start && codePoint < end) {
        return data;
      }

      if (codePoint == start - 1) {
        // Just replace `start` with a new value.
        data[index] = codePoint;
        return data;
      } // At this point, if `start` is `greater` than `codePoint`, insert a new
      // `[start, end]` pair before the current pair, or after the current pair
      // if there is a known `lastIndex`.


      if (start > codePoint) {
        data.splice(lastIndex != null ? lastIndex + 2 : 0, 0, codePoint, codePoint + 1);
        return data;
      }

      if (codePoint == end) {
        // Check if adding this code point causes two separate ranges to become
        // a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
        if (codePoint + 1 == data[index + 2]) {
          data.splice(index, 4, start, data[index + 3]);
          return data;
        } // Else, just replace `end` with a new value.


        data[index + 1] = codePoint + 1;
        return data;
      }

      lastIndex = index;
      index += 2;
    } // The loop has finished; add the new pair to the end of the data set.


    data.push(codePoint, codePoint + 1);
    return data;
  };

  var dataAddData = function dataAddData(dataA, dataB) {
    // Iterate over the data per `(start, end)` pair.
    var index = 0;
    var start;
    var end;
    var data = dataA.slice();
    var length = dataB.length;

    while (index < length) {
      start = dataB[index];
      end = dataB[index + 1] - 1;

      if (start == end) {
        data = dataAdd(data, start);
      } else {
        data = dataAddRange(data, start, end);
      }

      index += 2;
    }

    return data;
  };

  var dataRemoveData = function dataRemoveData(dataA, dataB) {
    // Iterate over the data per `(start, end)` pair.
    var index = 0;
    var start;
    var end;
    var data = dataA.slice();
    var length = dataB.length;

    while (index < length) {
      start = dataB[index];
      end = dataB[index + 1] - 1;

      if (start == end) {
        data = dataRemove(data, start);
      } else {
        data = dataRemoveRange(data, start, end);
      }

      index += 2;
    }

    return data;
  };

  var dataAddRange = function dataAddRange(data, rangeStart, rangeEnd) {
    if (rangeEnd < rangeStart) {
      throw Error(ERRORS.rangeOrder);
    }

    if (rangeStart < 0x0 || rangeStart > 0x10FFFF || rangeEnd < 0x0 || rangeEnd > 0x10FFFF) {
      throw RangeError(ERRORS.codePointRange);
    } // Iterate over the data per `(start, end)` pair.


    var index = 0;
    var start;
    var end;
    var added = false;
    var length = data.length;

    while (index < length) {
      start = data[index];
      end = data[index + 1];

      if (added) {
        // The range has already been added to the set; at this point, we just
        // need to get rid of the following ranges in case they overlap.
        // Check if this range can be combined with the previous range.
        if (start == rangeEnd + 1) {
          data.splice(index - 1, 2);
          return data;
        } // Exit as soon as no more possibly overlapping pairs can be found.


        if (start > rangeEnd) {
          return data;
        } // E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
        // `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
        // `0,16` range that was previously added.


        if (start >= rangeStart && start <= rangeEnd) {
          // `start` lies within the range that was previously added.
          if (end > rangeStart && end - 1 <= rangeEnd) {
            // `end` lies within the range that was previously added as well,
            // so remove this pair.
            data.splice(index, 2);
            index -= 2; // Note: we cannot `return` just yet, as there may still be other
            // overlapping pairs.
          } else {
            // `start` lies within the range that was previously added, but
            // `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
            // now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
            // Remove the previously added `end` and the current `start`.
            data.splice(index - 1, 2);
            index -= 2;
          } // Note: we cannot return yet.

        }
      } else if (start == rangeEnd + 1 || start == rangeEnd) {
        data[index] = rangeStart;
        return data;
      } // Check if a new pair must be inserted *before* the current one.
      else if (start > rangeEnd) {
          data.splice(index, 0, rangeStart, rangeEnd + 1);
          return data;
        } else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
          // The new range lies entirely within an existing range pair. No action
          // needed.
          return data;
        } else if ( // E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
        rangeStart >= start && rangeStart < end || // E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
        end == rangeStart) {
          // Replace `end` with the new value.
          data[index + 1] = rangeEnd + 1; // Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
          // and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.

          added = true; // Note: we cannot `return` just yet.
        } else if (rangeStart <= start && rangeEnd + 1 >= end) {
          // The new range is a superset of the old range.
          data[index] = rangeStart;
          data[index + 1] = rangeEnd + 1;
          added = true;
        }

      index += 2;
    } // The loop has finished without doing anything; add the new pair to the end
    // of the data set.


    if (!added) {
      data.push(rangeStart, rangeEnd + 1);
    }

    return data;
  };

  var dataContains = function dataContains(data, codePoint) {
    var index = 0;
    var length = data.length; // Exit early if `codePoint` is not within `data`’s overall range.

    var start = data[index];
    var end = data[length - 1];

    if (length >= 2) {
      if (codePoint < start || codePoint > end) {
        return false;
      }
    } // Iterate over the data per `(start, end)` pair.


    while (index < length) {
      start = data[index];
      end = data[index + 1];

      if (codePoint >= start && codePoint < end) {
        return true;
      }

      index += 2;
    }

    return false;
  };

  var dataIntersection = function dataIntersection(data, codePoints) {
    var index = 0;
    var length = codePoints.length;
    var codePoint;
    var result = [];

    while (index < length) {
      codePoint = codePoints[index];

      if (dataContains(data, codePoint)) {
        result.push(codePoint);
      }

      ++index;
    }

    return dataFromCodePoints(result);
  };

  var dataIsEmpty = function dataIsEmpty(data) {
    return !data.length;
  };

  var dataIsSingleton = function dataIsSingleton(data) {
    // Check if the set only represents a single code point.
    return data.length == 2 && data[0] + 1 == data[1];
  };

  var dataToArray = function dataToArray(data) {
    // Iterate over the data per `(start, end)` pair.
    var index = 0;
    var start;
    var end;
    var result = [];
    var length = data.length;

    while (index < length) {
      start = data[index];
      end = data[index + 1];

      while (start < end) {
        result.push(start);
        ++start;
      }

      index += 2;
    }

    return result;
  };
  /*--------------------------------------------------------------------------*/
  // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae


  var floor = Math.floor;

  var highSurrogate = function highSurrogate(codePoint) {
    return parseInt(floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN, 10);
  };

  var lowSurrogate = function lowSurrogate(codePoint) {
    return parseInt((codePoint - 0x10000) % 0x400 + LOW_SURROGATE_MIN, 10);
  };

  var stringFromCharCode = String.fromCharCode;

  var codePointToString = function codePointToString(codePoint) {
    var string; // https://mathiasbynens.be/notes/javascript-escapes#single
    // Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
    // different meaning in regular expressions (word boundary), so it cannot
    // be used here.

    if (codePoint == 0x09) {
      string = '\\t';
    } // Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
    // else if (codePoint == 0x0B) {
    // 	string = '\\v';
    // }
    else if (codePoint == 0x0A) {
        string = '\\n';
      } else if (codePoint == 0x0C) {
        string = '\\f';
      } else if (codePoint == 0x0D) {
        string = '\\r';
      } else if (codePoint == 0x2D) {
        // https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
        // Note: `-` (U+002D HYPHEN-MINUS) is escaped in this way rather
        // than by backslash-escaping, in case the output is used outside
        // of a character class in a `u` RegExp. /\-/u throws, but
        // /\x2D/u is fine.
        string = '\\x2D';
      } else if (codePoint == 0x5C) {
        string = '\\\\';
      } else if (codePoint == 0x24 || codePoint >= 0x28 && codePoint <= 0x2B || codePoint == 0x2E || codePoint == 0x2F || codePoint == 0x3F || codePoint >= 0x5B && codePoint <= 0x5E || codePoint >= 0x7B && codePoint <= 0x7D) {
        // The code point maps to an unsafe printable ASCII character;
        // backslash-escape it. Here’s the list of those symbols:
        //
        //     $()*+./?[\]^{|}
        //
        // This matches SyntaxCharacters as well as `/` (U+002F SOLIDUS).
        // https://tc39.github.io/ecma262/#prod-SyntaxCharacter
        string = '\\' + stringFromCharCode(codePoint);
      } else if (codePoint >= 0x20 && codePoint <= 0x7E) {
        // The code point maps to one of these printable ASCII symbols
        // (including the space character):
        //
        //      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
        //     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
        //
        // These can safely be used directly.
        string = stringFromCharCode(codePoint);
      } else if (codePoint <= 0xFF) {
        string = '\\x' + pad(hex(codePoint), 2);
      } else {
        // `codePoint <= 0xFFFF` holds true.
        // https://mathiasbynens.be/notes/javascript-escapes#unicode
        string = "\\u" + pad(hex(codePoint), 4);
      } // There’s no need to account for astral symbols / surrogate pairs here,
    // since `codePointToString` is private and only used for BMP code points.
    // But if that’s what you need, just add an `else` block with this code:
    //
    //     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
    //     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);


    return string;
  };

  var codePointToStringUnicode = function codePointToStringUnicode(codePoint) {
    if (codePoint <= 0xFFFF) {
      return codePointToString(codePoint);
    }

    return "\\u{" + codePoint.toString(16).toUpperCase() + '}';
  };

  var symbolToCodePoint = function symbolToCodePoint(symbol) {
    var length = symbol.length;
    var first = symbol.charCodeAt(0);
    var second;

    if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > 1 // There is a next code unit.
    ) {
        // `first` is a high surrogate, and there is a next character. Assume
        // it’s a low surrogate (else it’s invalid usage of Regenerate anyway).
        second = symbol.charCodeAt(1); // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae

        return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
      }

    return first;
  };

  var createBMPCharacterClasses = function createBMPCharacterClasses(data) {
    // Iterate over the data per `(start, end)` pair.
    var result = '';
    var index = 0;
    var start;
    var end;
    var length = data.length;

    if (dataIsSingleton(data)) {
      return codePointToString(data[0]);
    }

    while (index < length) {
      start = data[index];
      end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

      if (start == end) {
        result += codePointToString(start);
      } else if (start + 1 == end) {
        result += codePointToString(start) + codePointToString(end);
      } else {
        result += codePointToString(start) + '-' + codePointToString(end);
      }

      index += 2;
    }

    return '[' + result + ']';
  };

  var createUnicodeCharacterClasses = function createUnicodeCharacterClasses(data) {
    // Iterate over the data per `(start, end)` pair.
    var result = '';
    var index = 0;
    var start;
    var end;
    var length = data.length;

    if (dataIsSingleton(data)) {
      return codePointToStringUnicode(data[0]);
    }

    while (index < length) {
      start = data[index];
      end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

      if (start == end) {
        result += codePointToStringUnicode(start);
      } else if (start + 1 == end) {
        result += codePointToStringUnicode(start) + codePointToStringUnicode(end);
      } else {
        result += codePointToStringUnicode(start) + '-' + codePointToStringUnicode(end);
      }

      index += 2;
    }

    return '[' + result + ']';
  };

  var splitAtBMP = function splitAtBMP(data) {
    // Iterate over the data per `(start, end)` pair.
    var loneHighSurrogates = [];
    var loneLowSurrogates = [];
    var bmp = [];
    var astral = [];
    var index = 0;
    var start;
    var end;
    var length = data.length;

    while (index < length) {
      start = data[index];
      end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

      if (start < HIGH_SURROGATE_MIN) {
        // The range starts and ends before the high surrogate range.
        // E.g. (0, 0x10).
        if (end < HIGH_SURROGATE_MIN) {
          bmp.push(start, end + 1);
        } // The range starts before the high surrogate range and ends within it.
        // E.g. (0, 0xD855).


        if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
          bmp.push(start, HIGH_SURROGATE_MIN);
          loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
        } // The range starts before the high surrogate range and ends in the low
        // surrogate range. E.g. (0, 0xDCFF).


        if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
          bmp.push(start, HIGH_SURROGATE_MIN);
          loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
          loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
        } // The range starts before the high surrogate range and ends after the
        // low surrogate range. E.g. (0, 0x10FFFF).


        if (end > LOW_SURROGATE_MAX) {
          bmp.push(start, HIGH_SURROGATE_MIN);
          loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
          loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);

          if (end <= 0xFFFF) {
            bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
          } else {
            bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
            astral.push(0xFFFF + 1, end + 1);
          }
        }
      } else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {
        // The range starts and ends in the high surrogate range.
        // E.g. (0xD855, 0xD866).
        if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
          loneHighSurrogates.push(start, end + 1);
        } // The range starts in the high surrogate range and ends in the low
        // surrogate range. E.g. (0xD855, 0xDCFF).


        if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
          loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
          loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
        } // The range starts in the high surrogate range and ends after the low
        // surrogate range. E.g. (0xD855, 0x10FFFF).


        if (end > LOW_SURROGATE_MAX) {
          loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
          loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);

          if (end <= 0xFFFF) {
            bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
          } else {
            bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
            astral.push(0xFFFF + 1, end + 1);
          }
        }
      } else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {
        // The range starts and ends in the low surrogate range.
        // E.g. (0xDCFF, 0xDDFF).
        if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
          loneLowSurrogates.push(start, end + 1);
        } // The range starts in the low surrogate range and ends after the low
        // surrogate range. E.g. (0xDCFF, 0x10FFFF).


        if (end > LOW_SURROGATE_MAX) {
          loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);

          if (end <= 0xFFFF) {
            bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
          } else {
            bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
            astral.push(0xFFFF + 1, end + 1);
          }
        }
      } else if (start > LOW_SURROGATE_MAX && start <= 0xFFFF) {
        // The range starts and ends after the low surrogate range.
        // E.g. (0xFFAA, 0x10FFFF).
        if (end <= 0xFFFF) {
          bmp.push(start, end + 1);
        } else {
          bmp.push(start, 0xFFFF + 1);
          astral.push(0xFFFF + 1, end + 1);
        }
      } else {
        // The range starts and ends in the astral range.
        astral.push(start, end + 1);
      }

      index += 2;
    }

    return {
      'loneHighSurrogates': loneHighSurrogates,
      'loneLowSurrogates': loneLowSurrogates,
      'bmp': bmp,
      'astral': astral
    };
  };

  var optimizeSurrogateMappings = function optimizeSurrogateMappings(surrogateMappings) {
    var result = [];
    var tmpLow = [];
    var addLow = false;
    var mapping;
    var nextMapping;
    var highSurrogates;
    var lowSurrogates;
    var nextHighSurrogates;
    var nextLowSurrogates;
    var index = -1;
    var length = surrogateMappings.length;

    while (++index < length) {
      mapping = surrogateMappings[index];
      nextMapping = surrogateMappings[index + 1];

      if (!nextMapping) {
        result.push(mapping);
        continue;
      }

      highSurrogates = mapping[0];
      lowSurrogates = mapping[1];
      nextHighSurrogates = nextMapping[0];
      nextLowSurrogates = nextMapping[1]; // Check for identical high surrogate ranges.

      tmpLow = lowSurrogates;

      while (nextHighSurrogates && highSurrogates[0] == nextHighSurrogates[0] && highSurrogates[1] == nextHighSurrogates[1]) {
        // Merge with the next item.
        if (dataIsSingleton(nextLowSurrogates)) {
          tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
        } else {
          tmpLow = dataAddRange(tmpLow, nextLowSurrogates[0], nextLowSurrogates[1] - 1);
        }

        ++index;
        mapping = surrogateMappings[index];
        highSurrogates = mapping[0];
        lowSurrogates = mapping[1];
        nextMapping = surrogateMappings[index + 1];
        nextHighSurrogates = nextMapping && nextMapping[0];
        nextLowSurrogates = nextMapping && nextMapping[1];
        addLow = true;
      }

      result.push([highSurrogates, addLow ? tmpLow : lowSurrogates]);
      addLow = false;
    }

    return optimizeByLowSurrogates(result);
  };

  var optimizeByLowSurrogates = function optimizeByLowSurrogates(surrogateMappings) {
    if (surrogateMappings.length == 1) {
      return surrogateMappings;
    }

    var index = -1;
    var innerIndex = -1;

    while (++index < surrogateMappings.length) {
      var mapping = surrogateMappings[index];
      var lowSurrogates = mapping[1];
      var lowSurrogateStart = lowSurrogates[0];
      var lowSurrogateEnd = lowSurrogates[1];
      innerIndex = index; // Note: the loop starts at the next index.

      while (++innerIndex < surrogateMappings.length) {
        var otherMapping = surrogateMappings[innerIndex];
        var otherLowSurrogates = otherMapping[1];
        var otherLowSurrogateStart = otherLowSurrogates[0];
        var otherLowSurrogateEnd = otherLowSurrogates[1];

        if (lowSurrogateStart == otherLowSurrogateStart && lowSurrogateEnd == otherLowSurrogateEnd) {
          // Add the code points in the other item to this one.
          if (dataIsSingleton(otherMapping[0])) {
            mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
          } else {
            mapping[0] = dataAddRange(mapping[0], otherMapping[0][0], otherMapping[0][1] - 1);
          } // Remove the other, now redundant, item.


          surrogateMappings.splice(innerIndex, 1);
          --innerIndex;
        }
      }
    }

    return surrogateMappings;
  };

  var surrogateSet = function surrogateSet(data) {
    // Exit early if `data` is an empty set.
    if (!data.length) {
      return [];
    } // Iterate over the data per `(start, end)` pair.


    var index = 0;
    var start;
    var end;
    var startHigh;
    var startLow;
    var endHigh;
    var endLow;
    var surrogateMappings = [];
    var length = data.length;

    while (index < length) {
      start = data[index];
      end = data[index + 1] - 1;
      startHigh = highSurrogate(start);
      startLow = lowSurrogate(start);
      endHigh = highSurrogate(end);
      endLow = lowSurrogate(end);
      var startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
      var endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
      var complete = false; // Append the previous high-surrogate-to-low-surrogate mappings.
      // Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.

      if (startHigh == endHigh || startsWithLowestLowSurrogate && endsWithHighestLowSurrogate) {
        surrogateMappings.push([[startHigh, endHigh + 1], [startLow, endLow + 1]]);
        complete = true;
      } else {
        surrogateMappings.push([[startHigh, startHigh + 1], [startLow, LOW_SURROGATE_MAX + 1]]);
      } // Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
      // `(endHigh - 1, LOW_SURROGATE_MAX)`.


      if (!complete && startHigh + 1 < endHigh) {
        if (endsWithHighestLowSurrogate) {
          // Combine step 2 and step 3.
          surrogateMappings.push([[startHigh + 1, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
          complete = true;
        } else {
          surrogateMappings.push([[startHigh + 1, endHigh], [LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1]]);
        }
      } // Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.


      if (!complete) {
        surrogateMappings.push([[endHigh, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
      }

      index += 2;
    } // The format of `surrogateMappings` is as follows:
    //
    //     [ surrogateMapping1, surrogateMapping2 ]
    //
    // i.e.:
    //
    //     [
    //       [ highSurrogates1, lowSurrogates1 ],
    //       [ highSurrogates2, lowSurrogates2 ]
    //     ]


    return optimizeSurrogateMappings(surrogateMappings);
  };

  var createSurrogateCharacterClasses = function createSurrogateCharacterClasses(surrogateMappings) {
    var result = [];
    forEach(surrogateMappings, function (surrogateMapping) {
      var highSurrogates = surrogateMapping[0];
      var lowSurrogates = surrogateMapping[1];
      result.push(createBMPCharacterClasses(highSurrogates) + createBMPCharacterClasses(lowSurrogates));
    });
    return result.join('|');
  };

  var createCharacterClassesFromData = function createCharacterClassesFromData(data, bmpOnly, hasUnicodeFlag) {
    if (hasUnicodeFlag) {
      return createUnicodeCharacterClasses(data);
    }

    var result = [];
    var parts = splitAtBMP(data);
    var loneHighSurrogates = parts.loneHighSurrogates;
    var loneLowSurrogates = parts.loneLowSurrogates;
    var bmp = parts.bmp;
    var astral = parts.astral;
    var hasLoneHighSurrogates = !dataIsEmpty(loneHighSurrogates);
    var hasLoneLowSurrogates = !dataIsEmpty(loneLowSurrogates);
    var surrogateMappings = surrogateSet(astral);

    if (bmpOnly) {
      bmp = dataAddData(bmp, loneHighSurrogates);
      hasLoneHighSurrogates = false;
      bmp = dataAddData(bmp, loneLowSurrogates);
      hasLoneLowSurrogates = false;
    }

    if (!dataIsEmpty(bmp)) {
      // The data set contains BMP code points that are not high surrogates
      // needed for astral code points in the set.
      result.push(createBMPCharacterClasses(bmp));
    }

    if (surrogateMappings.length) {
      // The data set contains astral code points; append character classes
      // based on their surrogate pairs.
      result.push(createSurrogateCharacterClasses(surrogateMappings));
    } // https://gist.github.com/mathiasbynens/bbe7f870208abcfec860


    if (hasLoneHighSurrogates) {
      result.push(createBMPCharacterClasses(loneHighSurrogates) + // Make sure the high surrogates aren’t part of a surrogate pair.
      "(?![\\uDC00-\\uDFFF])");
    }

    if (hasLoneLowSurrogates) {
      result.push( // It is not possible to accurately assert the low surrogates aren’t
      // part of a surrogate pair, since JavaScript regular expressions do
      // not support lookbehind.
      "(?:[^\\uD800-\\uDBFF]|^)" + createBMPCharacterClasses(loneLowSurrogates));
    }

    return result.join('|');
  };
  /*--------------------------------------------------------------------------*/
  // `regenerate` can be used as a constructor (and new methods can be added to
  // its prototype) but also as a regular function, the latter of which is the
  // documented and most common usage. For that reason, it’s not capitalized.


  var regenerate = function regenerate(value) {
    if (arguments.length > 1) {
      value = slice.call(arguments);
    }

    if (this instanceof regenerate) {
      this.data = [];
      return value ? this.add(value) : this;
    }

    return new regenerate().add(value);
  };

  regenerate.version = '1.4.1';
  var proto = regenerate.prototype;
  extend(proto, {
    'add': function add(value) {
      var $this = this;

      if (value == null) {
        return $this;
      }

      if (value instanceof regenerate) {
        // Allow passing other Regenerate instances.
        $this.data = dataAddData($this.data, value.data);
        return $this;
      }

      if (arguments.length > 1) {
        value = slice.call(arguments);
      }

      if (isArray(value)) {
        forEach(value, function (item) {
          $this.add(item);
        });
        return $this;
      }

      $this.data = dataAdd($this.data, isNumber(value) ? value : symbolToCodePoint(value));
      return $this;
    },
    'remove': function remove(value) {
      var $this = this;

      if (value == null) {
        return $this;
      }

      if (value instanceof regenerate) {
        // Allow passing other Regenerate instances.
        $this.data = dataRemoveData($this.data, value.data);
        return $this;
      }

      if (arguments.length > 1) {
        value = slice.call(arguments);
      }

      if (isArray(value)) {
        forEach(value, function (item) {
          $this.remove(item);
        });
        return $this;
      }

      $this.data = dataRemove($this.data, isNumber(value) ? value : symbolToCodePoint(value));
      return $this;
    },
    'addRange': function addRange(start, end) {
      var $this = this;
      $this.data = dataAddRange($this.data, isNumber(start) ? start : symbolToCodePoint(start), isNumber(end) ? end : symbolToCodePoint(end));
      return $this;
    },
    'removeRange': function removeRange(start, end) {
      var $this = this;
      var startCodePoint = isNumber(start) ? start : symbolToCodePoint(start);
      var endCodePoint = isNumber(end) ? end : symbolToCodePoint(end);
      $this.data = dataRemoveRange($this.data, startCodePoint, endCodePoint);
      return $this;
    },
    'intersection': function intersection(argument) {
      var $this = this; // Allow passing other Regenerate instances.
      // TODO: Optimize this by writing and using `dataIntersectionData()`.

      var array = argument instanceof regenerate ? dataToArray(argument.data) : argument;
      $this.data = dataIntersection($this.data, array);
      return $this;
    },
    'contains': function contains(codePoint) {
      return dataContains(this.data, isNumber(codePoint) ? codePoint : symbolToCodePoint(codePoint));
    },
    'clone': function clone() {
      var set = new regenerate();
      set.data = this.data.slice(0);
      return set;
    },
    'toString': function toString(options) {
      var result = createCharacterClassesFromData(this.data, options ? options.bmpOnly : false, options ? options.hasUnicodeFlag : false);

      if (!result) {
        // For an empty set, return something that can be inserted `/here/` to
        // form a valid regular expression. Avoid `(?:)` since that matches the
        // empty string.
        return '[]';
      } // Use `\0` instead of `\x00` where possible.


      return result.replace(regexNull, '\\0$1');
    },
    'toRegExp': function toRegExp(flags) {
      var pattern = this.toString(flags && flags.indexOf('u') != -1 ? {
        'hasUnicodeFlag': true
      } : null);
      return RegExp(pattern, flags || '');
    },
    'valueOf': function valueOf() {
      // Note: `valueOf` is aliased as `toArray`.
      return dataToArray(this.data);
    }
  });
  proto.toArray = proto.valueOf; // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return regenerate;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(164)(module), __webpack_require__(38)))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _getPrototypeOf; });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ wrapNativeSuper_wrapNativeSuper; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
var setPrototypeOf = __webpack_require__(123);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/construct.js + 1 modules
var construct = __webpack_require__(202);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js




function wrapNativeSuper_wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  wrapNativeSuper_wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return Object(construct["a" /* default */])(Class, arguments, Object(getPrototypeOf["a" /* default */])(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return Object(setPrototypeOf["a" /* default */])(Wrapper, Class);
  };

  return wrapNativeSuper_wrapNativeSuper(Class);
}

/***/ }),
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 170 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(235)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ construct_construct; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
var setPrototypeOf = __webpack_require__(123);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/construct.js


function construct_construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    construct_construct = Reflect.construct;
  } else {
    construct_construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) Object(setPrototypeOf["a" /* default */])(instance, Class.prototype);
      return instance;
    };
  }

  return construct_construct.apply(null, arguments);
}

/***/ }),
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(999);
var createDesc = __webpack_require__(1004);
module.exports = __webpack_require__(171) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 335 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 336 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(170);
var global = __webpack_require__(169);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(1007) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(339);
var defined = __webpack_require__(340);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(1013);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 340 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 341 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(570);module.exports={MDXRenderer:MDXRenderer};

/***/ }),
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(571);var _toConsumableArray=__webpack_require__(119);var _defineProperty=__webpack_require__(573);var _objectWithoutPropertiesLoose=__webpack_require__(266);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(8);var _require=__webpack_require__(204),mdx=_require.mdx;var _require2=__webpack_require__(259),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(218);

var isNativeReflectConstruct = __webpack_require__(572);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 572 */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),
/* 573 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 575 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = __webpack_require__(8);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/* global global */


var KEYCODE_ENTER = 13;
var KEYCODE_TAB = 9;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_Y = 89;
var KEYCODE_Z = 90;
var KEYCODE_M = 77;
var KEYCODE_PARENS = 57;
var KEYCODE_BRACKETS = 219;
var KEYCODE_QUOTE = 222;
var KEYCODE_BACK_QUOTE = 192;
var KEYCODE_ESCAPE = 27;
var HISTORY_LIMIT = 100;
var HISTORY_TIME_GAP = 3000;
var isWindows = 'navigator' in global && /Win/i.test(navigator.platform);
var isMacLike = 'navigator' in global && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
var className = 'npm__react-simple-code-editor__textarea';
var cssText =
/* CSS */
'\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.' + className + ':empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn\'t support \'-webkit-text-fill-color\'\n    * So we use \'color: transparent\' to make the text transparent on IE\n    * Unlike other browsers, it doesn\'t affect caret color in IE\n    */\n  .' + className + ' {\n    color: transparent !important;\n  }\n\n  .' + className + '::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n';

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      capture: true
    }, _this._recordCurrentState = function () {
      var input = _this._input;
      if (!input) return; // Save current state of the input

      var value = input.value,
          selectionStart = input.selectionStart,
          selectionEnd = input.selectionEnd;

      _this._recordChange({
        value: value,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      });
    }, _this._getLines = function (text, position) {
      return text.substring(0, position).split('\n');
    }, _this._recordChange = function (record) {
      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$_history = _this._history,
          stack = _this$_history.stack,
          offset = _this$_history.offset;

      if (stack.length && offset > -1) {
        // When something updates, drop the redo operations
        _this._history.stack = stack.slice(0, offset + 1); // Limit the number of operations to 100

        var count = _this._history.stack.length;

        if (count > HISTORY_LIMIT) {
          var extras = count - HISTORY_LIMIT;
          _this._history.stack = stack.slice(extras, count);
          _this._history.offset = Math.max(_this._history.offset - extras, 0);
        }
      }

      var timestamp = Date.now();

      if (overwrite) {
        var last = _this._history.stack[_this._history.offset];

        if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
          // A previous entry exists and was in short interval
          // Match the last word in the line
          var re = /[^a-z0-9]([a-z0-9]+)$/i; // Get the previous line

          var previous = _this._getLines(last.value, last.selectionStart).pop().match(re); // Get the current line


          var current = _this._getLines(record.value, record.selectionStart).pop().match(re);

          if (previous && current && current[1].startsWith(previous[1])) {
            // The last word of the previous line and current line match
            // Overwrite previous entry so that undo will remove whole word
            _this._history.stack[_this._history.offset] = _extends({}, record, {
              timestamp: timestamp
            });
            return;
          }
        }
      } // Add the new operation to the stack


      _this._history.stack.push(_extends({}, record, {
        timestamp: timestamp
      }));

      _this._history.offset++;
    }, _this._updateInput = function (record) {
      var input = _this._input;
      if (!input) return; // Update values and selection state

      input.value = record.value;
      input.selectionStart = record.selectionStart;
      input.selectionEnd = record.selectionEnd;

      _this.props.onValueChange(record.value);
    }, _this._applyEdits = function (record) {
      // Save last selection state
      var input = _this._input;
      var last = _this._history.stack[_this._history.offset];

      if (last && input) {
        _this._history.stack[_this._history.offset] = _extends({}, last, {
          selectionStart: input.selectionStart,
          selectionEnd: input.selectionEnd
        });
      } // Save the changes


      _this._recordChange(record);

      _this._updateInput(record);
    }, _this._undoEdit = function () {
      var _this$_history2 = _this._history,
          stack = _this$_history2.stack,
          offset = _this$_history2.offset; // Get the previous edit

      var record = stack[offset - 1];

      if (record) {
        // Apply the changes and update the offset
        _this._updateInput(record);

        _this._history.offset = Math.max(offset - 1, 0);
      }
    }, _this._redoEdit = function () {
      var _this$_history3 = _this._history,
          stack = _this$_history3.stack,
          offset = _this$_history3.offset; // Get the next edit

      var record = stack[offset + 1];

      if (record) {
        // Apply the changes and update the offset
        _this._updateInput(record);

        _this._history.offset = Math.min(offset + 1, stack.length - 1);
      }
    }, _this._handleKeyDown = function (e) {
      var _this$props = _this.props,
          tabSize = _this$props.tabSize,
          insertSpaces = _this$props.insertSpaces,
          ignoreTabKey = _this$props.ignoreTabKey,
          onKeyDown = _this$props.onKeyDown;

      if (onKeyDown) {
        onKeyDown(e);

        if (e.defaultPrevented) {
          return;
        }
      }

      if (e.keyCode === KEYCODE_ESCAPE) {
        e.target.blur();
      }

      var _e$target = e.target,
          value = _e$target.value,
          selectionStart = _e$target.selectionStart,
          selectionEnd = _e$target.selectionEnd;
      var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);

      if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && _this.state.capture) {
        // Prevent focus change
        e.preventDefault();

        if (e.shiftKey) {
          // Unindent selected lines
          var linesBeforeCaret = _this._getLines(value, selectionStart);

          var startLine = linesBeforeCaret.length - 1;
          var endLine = _this._getLines(value, selectionEnd).length - 1;
          var nextValue = value.split('\n').map(function (line, i) {
            if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
              return line.substring(tabCharacter.length);
            }

            return line;
          }).join('\n');

          if (value !== nextValue) {
            var startLineText = linesBeforeCaret[startLine];

            _this._applyEdits({
              value: nextValue,
              // Move the start cursor if first line in selection was modified
              // It was modified only if it started with a tab
              selectionStart: startLineText.startsWith(tabCharacter) ? selectionStart - tabCharacter.length : selectionStart,
              // Move the end cursor by total number of characters removed
              selectionEnd: selectionEnd - (value.length - nextValue.length)
            });
          }
        } else if (selectionStart !== selectionEnd) {
          // Indent selected lines
          var _linesBeforeCaret = _this._getLines(value, selectionStart);

          var _startLine = _linesBeforeCaret.length - 1;

          var _endLine = _this._getLines(value, selectionEnd).length - 1;

          var _startLineText = _linesBeforeCaret[_startLine];

          _this._applyEdits({
            value: value.split('\n').map(function (line, i) {
              if (i >= _startLine && i <= _endLine) {
                return tabCharacter + line;
              }

              return line;
            }).join('\n'),
            // Move the start cursor by number of characters added in first line of selection
            // Don't move it if it there was no text before cursor
            selectionStart: /\S/.test(_startLineText) ? selectionStart + tabCharacter.length : selectionStart,
            // Move the end cursor by total number of characters added
            selectionEnd: selectionEnd + tabCharacter.length * (_endLine - _startLine + 1)
          });
        } else {
          var updatedSelection = selectionStart + tabCharacter.length;

          _this._applyEdits({
            // Insert tab character at caret
            value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
            // Update caret position
            selectionStart: updatedSelection,
            selectionEnd: updatedSelection
          });
        }
      } else if (e.keyCode === KEYCODE_BACKSPACE) {
        var hasSelection = selectionStart !== selectionEnd;
        var textBeforeCaret = value.substring(0, selectionStart);

        if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
          // Prevent default delete behaviour
          e.preventDefault();

          var _updatedSelection = selectionStart - tabCharacter.length;

          _this._applyEdits({
            // Remove tab character at caret
            value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
            // Update caret position
            selectionStart: _updatedSelection,
            selectionEnd: _updatedSelection
          });
        }
      } else if (e.keyCode === KEYCODE_ENTER) {
        // Ignore selections
        if (selectionStart === selectionEnd) {
          // Get the current line
          var line = _this._getLines(value, selectionStart).pop();

          var matches = line.match(/^\s+/);

          if (matches && matches[0]) {
            e.preventDefault(); // Preserve indentation on inserting a new line

            var indent = '\n' + matches[0];

            var _updatedSelection2 = selectionStart + indent.length;

            _this._applyEdits({
              // Insert indentation character at caret
              value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
              // Update caret position
              selectionStart: _updatedSelection2,
              selectionEnd: _updatedSelection2
            });
          }
        }
      } else if (e.keyCode === KEYCODE_PARENS || e.keyCode === KEYCODE_BRACKETS || e.keyCode === KEYCODE_QUOTE || e.keyCode === KEYCODE_BACK_QUOTE) {
        var chars = void 0;

        if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
          chars = ['(', ')'];
        } else if (e.keyCode === KEYCODE_BRACKETS) {
          if (e.shiftKey) {
            chars = ['{', '}'];
          } else {
            chars = ['[', ']'];
          }
        } else if (e.keyCode === KEYCODE_QUOTE) {
          if (e.shiftKey) {
            chars = ['"', '"'];
          } else {
            chars = ["'", "'"];
          }
        } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
          chars = ['`', '`'];
        } // If text is selected, wrap them in the characters


        if (selectionStart !== selectionEnd && chars) {
          e.preventDefault();

          _this._applyEdits({
            value: value.substring(0, selectionStart) + chars[0] + value.substring(selectionStart, selectionEnd) + chars[1] + value.substring(selectionEnd),
            // Update caret position
            selectionStart: selectionStart,
            selectionEnd: selectionEnd + 2
          });
        }
      } else if ((isMacLike ? // Trigger undo with ⌘+Z on Mac
      e.metaKey && e.keyCode === KEYCODE_Z : // Trigger undo with Ctrl+Z on other platforms
      e.ctrlKey && e.keyCode === KEYCODE_Z) && !e.shiftKey && !e.altKey) {
        e.preventDefault();

        _this._undoEdit();
      } else if ((isMacLike ? // Trigger redo with ⌘+Shift+Z on Mac
      e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey : isWindows ? // Trigger redo with Ctrl+Y on Windows
      e.ctrlKey && e.keyCode === KEYCODE_Y : // Trigger redo with Ctrl+Shift+Z on other platforms
      e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) && !e.altKey) {
        e.preventDefault();

        _this._redoEdit();
      } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
        e.preventDefault(); // Toggle capturing tab key so users can focus away

        _this.setState(function (state) {
          return {
            capture: !state.capture
          };
        });
      }
    }, _this._handleChange = function (e) {
      var _e$target2 = e.target,
          value = _e$target2.value,
          selectionStart = _e$target2.selectionStart,
          selectionEnd = _e$target2.selectionEnd;

      _this._recordChange({
        value: value,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      }, true);

      _this.props.onValueChange(value);
    }, _this._history = {
      stack: [],
      offset: -1
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._recordCurrentState();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          style = _props.style,
          padding = _props.padding,
          highlight = _props.highlight,
          textareaId = _props.textareaId,
          autoFocus = _props.autoFocus,
          disabled = _props.disabled,
          form = _props.form,
          maxLength = _props.maxLength,
          minLength = _props.minLength,
          name = _props.name,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          required = _props.required,
          onClick = _props.onClick,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur,
          onKeyUp = _props.onKeyUp,
          onKeyDown = _props.onKeyDown,
          onValueChange = _props.onValueChange,
          tabSize = _props.tabSize,
          insertSpaces = _props.insertSpaces,
          ignoreTabKey = _props.ignoreTabKey,
          rest = _objectWithoutProperties(_props, ['value', 'style', 'padding', 'highlight', 'textareaId', 'autoFocus', 'disabled', 'form', 'maxLength', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onValueChange', 'tabSize', 'insertSpaces', 'ignoreTabKey']);

      var contentStyle = {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding
      };
      var highlighted = highlight(value);
      return React.createElement('div', _extends({}, rest, {
        style: _extends({}, styles.container, style)
      }), React.createElement('textarea', {
        ref: function ref(c) {
          return _this2._input = c;
        },
        style: _extends({}, styles.editor, styles.textarea, contentStyle),
        className: className,
        id: textareaId,
        value: value,
        onChange: this._handleChange,
        onKeyDown: this._handleKeyDown,
        onClick: onClick,
        onKeyUp: onKeyUp,
        onFocus: onFocus,
        onBlur: onBlur,
        disabled: disabled,
        form: form,
        maxLength: maxLength,
        minLength: minLength,
        name: name,
        placeholder: placeholder,
        readOnly: readOnly,
        required: required,
        autoFocus: autoFocus,
        autoCapitalize: 'off',
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: false,
        'data-gramm': false
      }), React.createElement('pre', _extends({
        'aria-hidden': 'true',
        style: _extends({}, styles.editor, styles.highlight, contentStyle)
      }, typeof highlighted === 'string' ? {
        dangerouslySetInnerHTML: {
          __html: highlighted + '<br />'
        }
      } : {
        children: highlighted
      })), React.createElement('style', {
        type: 'text/css',
        dangerouslySetInnerHTML: {
          __html: cssText
        }
      }));
    }
  }, {
    key: 'session',
    get: function get() {
      return {
        history: this._history
      };
    },
    set: function set(session) {
      this._history = session.history;
    }
  }]);

  return Editor;
}(React.Component);

Editor.defaultProps = {
  tabSize: 2,
  insertSpaces: true,
  ignoreTabKey: false,
  padding: 0
};
exports.default = Editor;
var styles = {
  container: {
    position: 'relative',
    textAlign: 'left',
    boxSizing: 'border-box',
    padding: 0,
    overflow: 'hidden'
  },
  textarea: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    resize: 'none',
    color: 'inherit',
    overflow: 'hidden',
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextFillColor: 'transparent'
  },
  highlight: {
    position: 'relative',
    pointerEvents: 'none'
  },
  editor: {
    margin: 0,
    border: 0,
    background: 'none',
    boxSizing: 'inherit',
    display: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariantLigatures: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
    tabSize: 'inherit',
    textIndent: 'inherit',
    textRendering: 'inherit',
    textTransform: 'inherit',
    whiteSpace: 'pre-wrap',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(38)))

/***/ }),
/* 576 */,
/* 577 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var generate = __webpack_require__(578).generate;

var parse = __webpack_require__(579).parse;

var regenerate = __webpack_require__(0);

var unicodeMatchProperty = __webpack_require__(580);

var unicodeMatchPropertyValue = __webpack_require__(583);

var iuMappings = __webpack_require__(585);

var ESCAPE_SETS = __webpack_require__(586); // Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).


var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF); // Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es6#sec-pattern-semantics

var BMP_SET = regenerate().addRange(0x0, 0xFFFF); // Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./u`. https://mths.be/es6#sec-atom

var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
.remove( // minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
0x000A, // Line Feed <LF>
0x000D, // Carriage Return <CR>
0x2028, // Line Separator <LS>
0x2029 // Paragraph Separator <PS>
);

var getCharacterClassEscapeSet = function getCharacterClassEscapeSet(character, unicode, ignoreCase) {
  if (unicode) {
    if (ignoreCase) {
      return ESCAPE_SETS.UNICODE_IGNORE_CASE.get(character);
    }

    return ESCAPE_SETS.UNICODE.get(character);
  }

  return ESCAPE_SETS.REGULAR.get(character);
};

var getUnicodeDotSet = function getUnicodeDotSet(dotAll) {
  return dotAll ? UNICODE_SET : DOT_SET_UNICODE;
};

var getUnicodePropertyValueSet = function getUnicodePropertyValueSet(property, value) {
  var path = value ? "".concat(property, "/").concat(value) : "Binary_Property/".concat(property);

  try {
    return __webpack_require__(587)("./".concat(path, ".js"));
  } catch (exception) {
    throw new Error("Failed to recognize value `".concat(value, "` for property ") + "`".concat(property, "`."));
  }
};

var handleLoneUnicodePropertyNameOrValue = function handleLoneUnicodePropertyNameOrValue(value) {
  // It could be a `General_Category` value or a binary property.
  // Note: `unicodeMatchPropertyValue` throws on invalid values.
  try {
    var _property = 'General_Category';
    var category = unicodeMatchPropertyValue(_property, value);
    return getUnicodePropertyValueSet(_property, category);
  } catch (exception) {} // It’s not a `General_Category` value, so check if it’s a binary
  // property. Note: `unicodeMatchProperty` throws on invalid properties.


  var property = unicodeMatchProperty(value);
  return getUnicodePropertyValueSet(property);
};

var getUnicodePropertyEscapeSet = function getUnicodePropertyEscapeSet(value, isNegative) {
  var parts = value.split('=');
  var firstPart = parts[0];
  var set;

  if (parts.length == 1) {
    set = handleLoneUnicodePropertyNameOrValue(firstPart);
  } else {
    // The pattern consists of two parts, i.e. `Property=Value`.
    var property = unicodeMatchProperty(firstPart);

    var _value = unicodeMatchPropertyValue(property, parts[1]);

    set = getUnicodePropertyValueSet(property, _value);
  }

  if (isNegative) {
    return UNICODE_SET.clone().remove(set);
  }

  return set.clone();
}; // Given a range of code points, add any case-folded code points in that range
// to a set.


regenerate.prototype.iuAddRange = function (min, max) {
  var $this = this;

  do {
    var folded = caseFold(min);

    if (folded) {
      $this.add(folded);
    }
  } while (++min <= max);

  return $this;
};

var update = function update(item, pattern) {
  var tree = parse(pattern, config.useUnicodeFlag ? 'u' : '');

  switch (tree.type) {
    case 'characterClass':
    case 'group':
    case 'value':
      // No wrapping needed.
      break;

    default:
      // Wrap the pattern in a non-capturing group.
      tree = wrap(tree, pattern);
  }

  Object.assign(item, tree);
};

var wrap = function wrap(tree, pattern) {
  // Wrap the pattern in a non-capturing group.
  return {
    'type': 'group',
    'behavior': 'ignore',
    'body': [tree],
    'raw': "(?:".concat(pattern, ")")
  };
};

var caseFold = function caseFold(codePoint) {
  return iuMappings.get(codePoint) || false;
};

var processCharacterClass = function processCharacterClass(characterClassItem, regenerateOptions) {
  var set = regenerate();

  var _iterator = _createForOfIteratorHelper(characterClassItem.body),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      switch (item.type) {
        case 'value':
          set.add(item.codePoint);

          if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
            var folded = caseFold(item.codePoint);

            if (folded) {
              set.add(folded);
            }
          }

          break;

        case 'characterClassRange':
          var min = item.min.codePoint;
          var max = item.max.codePoint;
          set.addRange(min, max);

          if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
            set.iuAddRange(min, max);
          }

          break;

        case 'characterClassEscape':
          set.add(getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase));
          break;

        case 'unicodePropertyEscape':
          set.add(getUnicodePropertyEscapeSet(item.value, item.negative));
          break;
        // The `default` clause is only here as a safeguard; it should never be
        // reached. Code coverage tools should ignore it.

        /* istanbul ignore next */

        default:
          throw new Error("Unknown term type: ".concat(item.type));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (characterClassItem.negative) {
    update(characterClassItem, "(?!".concat(set.toString(regenerateOptions), ")[\\s\\S]"));
  } else {
    update(characterClassItem, set.toString(regenerateOptions));
  }

  return characterClassItem;
};

var updateNamedReference = function updateNamedReference(item, index) {
  delete item.name;
  item.matchIndex = index;
};

var assertNoUnmatchedReferences = function assertNoUnmatchedReferences(groups) {
  var unmatchedReferencesNames = Object.keys(groups.unmatchedReferences);

  if (unmatchedReferencesNames.length > 0) {
    throw new Error("Unknown group names: ".concat(unmatchedReferencesNames));
  }
};

var processTerm = function processTerm(item, regenerateOptions, groups) {
  switch (item.type) {
    case 'dot':
      if (config.useDotAllFlag) {
        break;
      } else if (config.unicode) {
        update(item, getUnicodeDotSet(config.dotAll).toString(regenerateOptions));
      } else if (config.dotAll) {
        // TODO: consider changing this at the regenerate level.
        update(item, '[\\s\\S]');
      }

      break;

    case 'characterClass':
      item = processCharacterClass(item, regenerateOptions);
      break;

    case 'unicodePropertyEscape':
      if (config.unicodePropertyEscape) {
        update(item, getUnicodePropertyEscapeSet(item.value, item.negative).toString(regenerateOptions));
      }

      break;

    case 'characterClassEscape':
      update(item, getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase).toString(regenerateOptions));
      break;

    case 'group':
      if (item.behavior == 'normal') {
        groups.lastIndex++;
      }

      if (item.name && config.namedGroup) {
        var name = item.name.value;

        if (groups.names[name]) {
          throw new Error("Multiple groups with the same name (".concat(name, ") are not allowed."));
        }

        var index = groups.lastIndex;
        delete item.name;
        groups.names[name] = index;

        if (groups.onNamedGroup) {
          groups.onNamedGroup.call(null, name, index);
        }

        if (groups.unmatchedReferences[name]) {
          groups.unmatchedReferences[name].forEach(function (reference) {
            updateNamedReference(reference, index);
          });
          delete groups.unmatchedReferences[name];
        }
      }

    /* falls through */

    case 'alternative':
    case 'disjunction':
    case 'quantifier':
      item.body = item.body.map(function (term) {
        return processTerm(term, regenerateOptions, groups);
      });
      break;

    case 'value':
      var codePoint = item.codePoint;
      var set = regenerate(codePoint);

      if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
        var folded = caseFold(codePoint);

        if (folded) {
          set.add(folded);
        }
      }

      update(item, set.toString(regenerateOptions));
      break;

    case 'reference':
      if (item.name) {
        var _name = item.name.value;
        var _index = groups.names[_name];

        if (_index) {
          updateNamedReference(item, _index);
          break;
        }

        if (!groups.unmatchedReferences[_name]) {
          groups.unmatchedReferences[_name] = [];
        } // Keep track of references used before the corresponding group.


        groups.unmatchedReferences[_name].push(item);
      }

      break;

    case 'anchor':
    case 'empty':
    case 'group':
      // Nothing to do here.
      break;
    // The `default` clause is only here as a safeguard; it should never be
    // reached. Code coverage tools should ignore it.

    /* istanbul ignore next */

    default:
      throw new Error("Unknown term type: ".concat(item.type));
  }

  return item;
};

var config = {
  'ignoreCase': false,
  'unicode': false,
  'dotAll': false,
  'useDotAllFlag': false,
  'useUnicodeFlag': false,
  'unicodePropertyEscape': false,
  'namedGroup': false
};

var rewritePattern = function rewritePattern(pattern, flags, options) {
  config.unicode = flags && flags.includes('u');
  var regjsparserFeatures = {
    'unicodePropertyEscape': config.unicode,
    'namedGroups': true,
    'lookbehind': options && options.lookbehind
  };
  config.ignoreCase = flags && flags.includes('i');
  var supportDotAllFlag = options && options.dotAllFlag;
  config.dotAll = supportDotAllFlag && flags && flags.includes('s');
  config.namedGroup = options && options.namedGroup;
  config.useDotAllFlag = options && options.useDotAllFlag;
  config.useUnicodeFlag = options && options.useUnicodeFlag;
  config.unicodePropertyEscape = options && options.unicodePropertyEscape;

  if (supportDotAllFlag && config.useDotAllFlag) {
    throw new Error('`useDotAllFlag` and `dotAllFlag` cannot both be true!');
  }

  var regenerateOptions = {
    'hasUnicodeFlag': config.useUnicodeFlag,
    'bmpOnly': !config.unicode
  };
  var groups = {
    'onNamedGroup': options && options.onNamedGroup,
    'lastIndex': 0,
    'names': Object.create(null),
    // { [name]: index }
    'unmatchedReferences': Object.create(null) // { [name]: Array<reference> }

  };
  var tree = parse(pattern, flags, regjsparserFeatures); // Note: `processTerm` mutates `tree` and `groups`.

  processTerm(tree, regenerateOptions, groups);
  assertNoUnmatchedReferences(groups);
  return generate(tree);
};

module.exports = rewritePattern;

/***/ }),
/* 578 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * regjsgen 0.5.2
 * Copyright 2014-2020 Benjamin Tan <https://ofcr.se/>
 * Available under the MIT license <https://github.com/bnjmnt4n/regjsgen/blob/master/LICENSE-MIT.txt>
 */
;
(function () {
  'use strict'; // Used to determine if values are of the language type `Object`.

  var objectTypes = {
    'function': true,
    'object': true
  }; // Used as a reference to the global object.

  var root = objectTypes[typeof window] && window || this; // Detect free variable `exports`.

  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports; // Detect free variable `module`.

  var hasFreeModule = objectTypes[typeof module] && module && !module.nodeType; // Detect free variable `global` from Node.js or Browserified code and use it as `root`.

  var freeGlobal = freeExports && hasFreeModule && typeof global == 'object' && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  } // Used to check objects for own properties.


  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /*--------------------------------------------------------------------------*/
  // Generates a string based on the given code point.
  // Based on https://mths.be/fromcodepoint by @mathias.

  function fromCodePoint() {
    var codePoint = Number(arguments[0]);

    if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
    codePoint < 0 || // not a valid Unicode code point
    codePoint > 0x10FFFF || // not a valid Unicode code point
    Math.floor(codePoint) != codePoint // not an integer
    ) {
        throw RangeError('Invalid code point: ' + codePoint);
      }

    if (codePoint <= 0xFFFF) {
      // BMP code point
      return String.fromCharCode(codePoint);
    } else {
      // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      var highSurrogate = (codePoint >> 10) + 0xD800;
      var lowSurrogate = codePoint % 0x400 + 0xDC00;
      return String.fromCharCode(highSurrogate, lowSurrogate);
    }
  }
  /*--------------------------------------------------------------------------*/
  // Ensures that nodes have the correct types.


  var assertTypeRegexMap = {};

  function assertType(type, expected) {
    if (expected.indexOf('|') == -1) {
      if (type == expected) {
        return;
      }

      throw Error('Invalid node type: ' + type + '; expected type: ' + expected);
    }

    expected = hasOwnProperty.call(assertTypeRegexMap, expected) ? assertTypeRegexMap[expected] : assertTypeRegexMap[expected] = RegExp('^(?:' + expected + ')$');

    if (expected.test(type)) {
      return;
    }

    throw Error('Invalid node type: ' + type + '; expected types: ' + expected);
  }
  /*--------------------------------------------------------------------------*/
  // Generates a regular expression string based on an AST.


  function generate(node) {
    var type = node.type;

    if (hasOwnProperty.call(generators, type)) {
      return generators[type](node);
    }

    throw Error('Invalid node type: ' + type);
  } // Constructs a string by concatentating the output of each term.


  function generateSequence(generator, terms) {
    var i = -1,
        length = terms.length,
        result = '',
        term;

    while (++i < length) {
      term = terms[i]; // Ensure that `\0` null escapes followed by number symbols are not
      // treated as backreferences.

      if (i + 1 < length && terms[i].type == 'value' && terms[i].kind == 'null' && terms[i + 1].type == 'value' && terms[i + 1].kind == 'symbol' && terms[i + 1].codePoint >= 48 && terms[i + 1].codePoint <= 57) {
        result += '\\000';
        continue;
      }

      result += generator(term);
    }

    return result;
  }
  /*--------------------------------------------------------------------------*/


  function generateAlternative(node) {
    assertType(node.type, 'alternative');
    return generateSequence(generateTerm, node.body);
  }

  function generateAnchor(node) {
    assertType(node.type, 'anchor');

    switch (node.kind) {
      case 'start':
        return '^';

      case 'end':
        return '$';

      case 'boundary':
        return '\\b';

      case 'not-boundary':
        return '\\B';

      default:
        throw Error('Invalid assertion');
    }
  }

  function generateAtom(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');
    return generate(node);
  }

  function generateCharacterClass(node) {
    assertType(node.type, 'characterClass');
    return '[' + (node.negative ? '^' : '') + generateSequence(generateClassAtom, node.body) + ']';
  }

  function generateCharacterClassEscape(node) {
    assertType(node.type, 'characterClassEscape');
    return '\\' + node.value;
  }

  function generateCharacterClassRange(node) {
    assertType(node.type, 'characterClassRange');
    var min = node.min,
        max = node.max;

    if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
      throw Error('Invalid character class range');
    }

    return generateClassAtom(min) + '-' + generateClassAtom(max);
  }

  function generateClassAtom(node) {
    assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');
    return generate(node);
  }

  function generateDisjunction(node) {
    assertType(node.type, 'disjunction');
    var body = node.body,
        i = -1,
        length = body.length,
        result = '';

    while (++i < length) {
      if (i != 0) {
        result += '|';
      }

      result += generate(body[i]);
    }

    return result;
  }

  function generateDot(node) {
    assertType(node.type, 'dot');
    return '.';
  }

  function generateGroup(node) {
    assertType(node.type, 'group');
    var result = '';

    switch (node.behavior) {
      case 'normal':
        if (node.name) {
          result += '?<' + generateIdentifier(node.name) + '>';
        }

        break;

      case 'ignore':
        result += '?:';
        break;

      case 'lookahead':
        result += '?=';
        break;

      case 'negativeLookahead':
        result += '?!';
        break;

      case 'lookbehind':
        result += '?<=';
        break;

      case 'negativeLookbehind':
        result += '?<!';
        break;

      default:
        throw Error('Invalid behaviour: ' + node.behaviour);
    }

    result += generateSequence(generate, node.body);
    return '(' + result + ')';
  }

  function generateIdentifier(node) {
    assertType(node.type, 'identifier');
    return node.value;
  }

  function generateQuantifier(node) {
    assertType(node.type, 'quantifier');
    var quantifier = '',
        min = node.min,
        max = node.max;

    if (max == null) {
      if (min == 0) {
        quantifier = '*';
      } else if (min == 1) {
        quantifier = '+';
      } else {
        quantifier = '{' + min + ',}';
      }
    } else if (min == max) {
      quantifier = '{' + min + '}';
    } else if (min == 0 && max == 1) {
      quantifier = '?';
    } else {
      quantifier = '{' + min + ',' + max + '}';
    }

    if (!node.greedy) {
      quantifier += '?';
    }

    return generateAtom(node.body[0]) + quantifier;
  }

  function generateReference(node) {
    assertType(node.type, 'reference');

    if (node.matchIndex) {
      return '\\' + node.matchIndex;
    }

    if (node.name) {
      return '\\k<' + generateIdentifier(node.name) + '>';
    }

    throw new Error('Unknown reference type');
  }

  function generateTerm(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|unicodePropertyEscape|value|dot');
    return generate(node);
  }

  function generateUnicodePropertyEscape(node) {
    assertType(node.type, 'unicodePropertyEscape');
    return '\\' + (node.negative ? 'P' : 'p') + '{' + node.value + '}';
  }

  function generateValue(node) {
    assertType(node.type, 'value');
    var kind = node.kind,
        codePoint = node.codePoint;

    if (typeof codePoint != 'number') {
      throw new Error('Invalid code point: ' + codePoint);
    }

    switch (kind) {
      case 'controlLetter':
        return '\\c' + fromCodePoint(codePoint + 64);

      case 'hexadecimalEscape':
        return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);

      case 'identifier':
        return '\\' + fromCodePoint(codePoint);

      case 'null':
        return '\\' + codePoint;

      case 'octal':
        return '\\' + ('000' + codePoint.toString(8)).slice(-3);

      case 'singleEscape':
        switch (codePoint) {
          case 0x0008:
            return '\\b';

          case 0x0009:
            return '\\t';

          case 0x000A:
            return '\\n';

          case 0x000B:
            return '\\v';

          case 0x000C:
            return '\\f';

          case 0x000D:
            return '\\r';

          case 0x002D:
            return '\\-';

          default:
            throw Error('Invalid code point: ' + codePoint);
        }

      case 'symbol':
        return fromCodePoint(codePoint);

      case 'unicodeEscape':
        return "\\u" + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);

      case 'unicodeCodePointEscape':
        return "\\u{" + codePoint.toString(16).toUpperCase() + '}';

      default:
        throw Error('Unsupported node kind: ' + kind);
    }
  }
  /*--------------------------------------------------------------------------*/
  // Used to generate strings for each node type.


  var generators = {
    'alternative': generateAlternative,
    'anchor': generateAnchor,
    'characterClass': generateCharacterClass,
    'characterClassEscape': generateCharacterClassEscape,
    'characterClassRange': generateCharacterClassRange,
    'disjunction': generateDisjunction,
    'dot': generateDot,
    'group': generateGroup,
    'quantifier': generateQuantifier,
    'reference': generateReference,
    'unicodePropertyEscape': generateUnicodePropertyEscape,
    'value': generateValue
  };
  /*--------------------------------------------------------------------------*/
  // Export regjsgen.

  var regjsgen = {
    'generate': generate
  }; // Some AMD build optimizers, like r.js, check for condition patterns like the following:

  if (true) {
    // Define as an anonymous module so it can be aliased through path mapping.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return regjsgen;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    root.regjsgen = regjsgen;
  } // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else {}
}).call(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(164)(module), __webpack_require__(38)))

/***/ }),
/* 579 */
/***/ (function(module, exports, __webpack_require__) {

// regjsparser
//
// ==================================================================
//
// See ECMA-262 Standard: 15.10.1
//
// NOTE: The ECMA-262 standard uses the term "Assertion" for /^/. Here the
//   term "Anchor" is used.
//
// Pattern ::
//      Disjunction
//
// Disjunction ::
//      Alternative
//      Alternative | Disjunction
//
// Alternative ::
//      [empty]
//      Alternative Term
//
// Term ::
//      Anchor
//      Atom
//      Atom Quantifier
//
// Anchor ::
//      ^
//      $
//      \ b
//      \ B
//      ( ? = Disjunction )
//      ( ? ! Disjunction )
//      ( ? < = Disjunction )
//      ( ? < ! Disjunction )
//
// Quantifier ::
//      QuantifierPrefix
//      QuantifierPrefix ?
//
// QuantifierPrefix ::
//      *
//      +
//      ?
//      { DecimalDigits }
//      { DecimalDigits , }
//      { DecimalDigits , DecimalDigits }
//
// Atom ::
//      PatternCharacter
//      .
//      \ AtomEscape
//      CharacterClass
//      ( GroupSpecifier Disjunction )
//      ( ? : Disjunction )
//
// PatternCharacter ::
//      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
//
// AtomEscape ::
//      DecimalEscape
//      CharacterEscape
//      CharacterClassEscape
//      k GroupName
//
// CharacterEscape[U] ::
//      ControlEscape
//      c ControlLetter
//      HexEscapeSequence
//      RegExpUnicodeEscapeSequence[?U] (ES6)
//      IdentityEscape[?U]
//
// ControlEscape ::
//      one of f n r t v
// ControlLetter ::
//      one of
//          a b c d e f g h i j k l m n o p q r s t u v w x y z
//          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
//
// IdentityEscape ::
//      SourceCharacter but not c
//
// DecimalEscape ::
//      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
//
// CharacterClassEscape ::
//      one of d D s S w W
//
// CharacterClass ::
//      [ [lookahead ∉ {^}] ClassRanges ]
//      [ ^ ClassRanges ]
//
// ClassRanges ::
//      [empty]
//      NonemptyClassRanges
//
// NonemptyClassRanges ::
//      ClassAtom
//      ClassAtom NonemptyClassRangesNoDash
//      ClassAtom - ClassAtom ClassRanges
//
// NonemptyClassRangesNoDash ::
//      ClassAtom
//      ClassAtomNoDash NonemptyClassRangesNoDash
//      ClassAtomNoDash - ClassAtom ClassRanges
//
// ClassAtom ::
//      -
//      ClassAtomNoDash
//
// ClassAtomNoDash ::
//      SourceCharacter but not one of \ or ] or -
//      \ ClassEscape
//
// ClassEscape ::
//      DecimalEscape
//      b
//      CharacterEscape
//      CharacterClassEscape
//
// GroupSpecifier ::
//      [empty]
//      ? GroupName
//
// GroupName ::
//      < RegExpIdentifierName >
//
// RegExpIdentifierName ::
//      RegExpIdentifierStart
//      RegExpIdentifierName RegExpIdentifierContinue
//
// RegExpIdentifierStart ::
//      UnicodeIDStart
//      $
//      _
//      \ RegExpUnicodeEscapeSequence
//
// RegExpIdentifierContinue ::
//      UnicodeIDContinue
//      $
//      _
//      \ RegExpUnicodeEscapeSequence
//      <ZWNJ>
//      <ZWJ>
(function () {
  var fromCodePoint = String.fromCodePoint || function () {
    // Implementation taken from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    return function fromCodePoint() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;

      if (!length) {
        return '';
      }

      var result = '';

      while (++index < length) {
        var codePoint = Number(arguments[index]);

        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
        codePoint < 0 || // not a valid Unicode code point
        codePoint > 0x10FFFF || // not a valid Unicode code point
        floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError('Invalid code point: ' + codePoint);
          }

        if (codePoint <= 0xFFFF) {
          // BMP code point
          codeUnits.push(codePoint);
        } else {
          // Astral code point; split in surrogate halves
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = codePoint % 0x400 + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }

        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }

      return result;
    };
  }();

  function parse(str, flags, features) {
    if (!features) {
      features = {};
    }

    function addRaw(node) {
      node.raw = str.substring(node.range[0], node.range[1]);
      return node;
    }

    function updateRawStart(node, start) {
      node.range[0] = start;
      return addRaw(node);
    }

    function createAnchor(kind, rawLength) {
      return addRaw({
        type: 'anchor',
        kind: kind,
        range: [pos - rawLength, pos]
      });
    }

    function createValue(kind, codePoint, from, to) {
      return addRaw({
        type: 'value',
        kind: kind,
        codePoint: codePoint,
        range: [from, to]
      });
    }

    function createEscaped(kind, codePoint, value, fromOffset) {
      fromOffset = fromOffset || 0;
      return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
    }

    function createCharacter(matches) {
      var _char = matches[0];

      var first = _char.charCodeAt(0);

      if (hasUnicodeFlag) {
        var second;

        if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
          second = lookahead().charCodeAt(0);

          if (second >= 0xDC00 && second <= 0xDFFF) {
            // Unicode surrogate pair
            pos++;
            return createValue('symbol', (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000, pos - 2, pos);
          }
        }
      }

      return createValue('symbol', first, pos - 1, pos);
    }

    function createDisjunction(alternatives, from, to) {
      return addRaw({
        type: 'disjunction',
        body: alternatives,
        range: [from, to]
      });
    }

    function createDot() {
      return addRaw({
        type: 'dot',
        range: [pos - 1, pos]
      });
    }

    function createCharacterClassEscape(value) {
      return addRaw({
        type: 'characterClassEscape',
        value: value,
        range: [pos - 2, pos]
      });
    }

    function createReference(matchIndex) {
      return addRaw({
        type: 'reference',
        matchIndex: parseInt(matchIndex, 10),
        range: [pos - 1 - matchIndex.length, pos]
      });
    }

    function createNamedReference(name) {
      return addRaw({
        type: 'reference',
        name: name,
        range: [name.range[0] - 3, pos]
      });
    }

    function createGroup(behavior, disjunction, from, to) {
      return addRaw({
        type: 'group',
        behavior: behavior,
        body: disjunction,
        range: [from, to]
      });
    }

    function createQuantifier(min, max, from, to) {
      if (to == null) {
        from = pos - 1;
        to = pos;
      }

      return addRaw({
        type: 'quantifier',
        min: min,
        max: max,
        greedy: true,
        body: null,
        // set later on
        range: [from, to]
      });
    }

    function createAlternative(terms, from, to) {
      return addRaw({
        type: 'alternative',
        body: terms,
        range: [from, to]
      });
    }

    function createCharacterClass(classRanges, negative, from, to) {
      return addRaw({
        type: 'characterClass',
        body: classRanges,
        negative: negative,
        range: [from, to]
      });
    }

    function createClassRange(min, max, from, to) {
      // See 15.10.2.15:
      if (min.codePoint > max.codePoint) {
        bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
      }

      return addRaw({
        type: 'characterClassRange',
        min: min,
        max: max,
        range: [from, to]
      });
    }

    function flattenBody(body) {
      if (body.type === 'alternative') {
        return body.body;
      } else {
        return [body];
      }
    }

    function isEmpty(obj) {
      return obj.type === 'empty';
    }

    function incr(amount) {
      amount = amount || 1;
      var res = str.substring(pos, pos + amount);
      pos += amount || 1;
      return res;
    }

    function skip(value) {
      if (!match(value)) {
        bail('character', value);
      }
    }

    function match(value) {
      if (str.indexOf(value, pos) === pos) {
        return incr(value.length);
      }
    }

    function lookahead() {
      return str[pos];
    }

    function current(value) {
      return str.indexOf(value, pos) === pos;
    }

    function next(value) {
      return str[pos + 1] === value;
    }

    function matchReg(regExp) {
      var subStr = str.substring(pos);
      var res = subStr.match(regExp);

      if (res) {
        res.range = [];
        res.range[0] = pos;
        incr(res[0].length);
        res.range[1] = pos;
      }

      return res;
    }

    function parseDisjunction() {
      // Disjunction ::
      //      Alternative
      //      Alternative | Disjunction
      var res = [],
          from = pos;
      res.push(parseAlternative());

      while (match('|')) {
        res.push(parseAlternative());
      }

      if (res.length === 1) {
        return res[0];
      }

      return createDisjunction(res, from, pos);
    }

    function parseAlternative() {
      var res = [],
          from = pos;
      var term; // Alternative ::
      //      [empty]
      //      Alternative Term

      while (term = parseTerm()) {
        res.push(term);
      }

      if (res.length === 1) {
        return res[0];
      }

      return createAlternative(res, from, pos);
    }

    function parseTerm() {
      // Term ::
      //      Anchor
      //      Atom
      //      Atom Quantifier
      if (pos >= str.length || current('|') || current(')')) {
        return null;
        /* Means: The term is empty */
      }

      var anchor = parseAnchor();

      if (anchor) {
        return anchor;
      }

      var atom = parseAtomAndExtendedAtom();

      if (!atom) {
        bail('Expected atom');
      }

      var quantifier = parseQuantifier() || false;

      if (quantifier) {
        quantifier.body = flattenBody(atom); // The quantifier contains the atom. Therefore, the beginning of the
        // quantifier range is given by the beginning of the atom.

        updateRawStart(quantifier, atom.range[0]);
        return quantifier;
      }

      return atom;
    }

    function parseGroup(matchA, typeA, matchB, typeB) {
      var type = null,
          from = pos;

      if (match(matchA)) {
        type = typeA;
      } else if (match(matchB)) {
        type = typeB;
      } else {
        return false;
      }

      return finishGroup(type, from);
    }

    function finishGroup(type, from) {
      var body = parseDisjunction();

      if (!body) {
        bail('Expected disjunction');
      }

      skip(')');
      var group = createGroup(type, flattenBody(body), from, pos);

      if (type == 'normal') {
        // Keep track of the number of closed groups. This is required for
        // parseDecimalEscape(). In case the string is parsed a second time the
        // value already holds the total count and no incrementation is required.
        if (firstIteration) {
          closedCaptureCounter++;
        }
      }

      return group;
    }

    function parseAnchor() {
      // Anchor ::
      //      ^
      //      $
      //      \ b
      //      \ B
      //      ( ? = Disjunction )
      //      ( ? ! Disjunction )
      var res,
          from = pos;

      if (match('^')) {
        return createAnchor('start', 1
        /* rawLength */
        );
      } else if (match('$')) {
        return createAnchor('end', 1
        /* rawLength */
        );
      } else if (match('\\b')) {
        return createAnchor('boundary', 2
        /* rawLength */
        );
      } else if (match('\\B')) {
        return createAnchor('not-boundary', 2
        /* rawLength */
        );
      } else {
        return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
      }
    }

    function parseQuantifier() {
      // Quantifier ::
      //      QuantifierPrefix
      //      QuantifierPrefix ?
      //
      // QuantifierPrefix ::
      //      *
      //      +
      //      ?
      //      { DecimalDigits }
      //      { DecimalDigits , }
      //      { DecimalDigits , DecimalDigits }
      var res,
          from = pos;
      var quantifier;
      var min, max;

      if (match('*')) {
        quantifier = createQuantifier(0);
      } else if (match('+')) {
        quantifier = createQuantifier(1);
      } else if (match('?')) {
        quantifier = createQuantifier(0, 1);
      } else if (res = matchReg(/^\{([0-9]+)\}/)) {
        min = parseInt(res[1], 10);
        quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
      } else if (res = matchReg(/^\{([0-9]+),\}/)) {
        min = parseInt(res[1], 10);
        quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
      } else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
        min = parseInt(res[1], 10);
        max = parseInt(res[2], 10);

        if (min > max) {
          bail('numbers out of order in {} quantifier', '', from, pos);
        }

        quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
      }

      if (quantifier) {
        if (match('?')) {
          quantifier.greedy = false;
          quantifier.range[1] += 1;
        }
      }

      return quantifier;
    }

    function parseAtomAndExtendedAtom() {
      // Parsing Atom and ExtendedAtom together due to redundancy.
      // ExtendedAtom is defined in Apendix B of the ECMA-262 standard.
      //
      // SEE: https://www.ecma-international.org/ecma-262/10.0/index.html#prod-annexB-ExtendedPatternCharacter
      //
      // Atom ::
      //      PatternCharacter
      //      .
      //      \ AtomEscape
      //      CharacterClass
      //      ( GroupSpecifier Disjunction )
      //      ( ? : Disjunction )
      // ExtendedAtom ::
      //      ExtendedPatternCharacter
      // ExtendedPatternCharacter ::
      //      SourceCharacter but not one of ^$\.*+?()[|
      var res; // jviereck: allow ']', '}' here as well to be compatible with browser's
      //   implementations: ']'.match(/]/);

      if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
        //      PatternCharacter
        return createCharacter(res);
      } else if (!hasUnicodeFlag && (res = matchReg(/^(?:]|})/))) {
        //      ExtendedPatternCharacter
        return createCharacter(res);
      } else if (match('.')) {
        //      .
        return createDot();
      } else if (match('\\')) {
        //      \ AtomEscape
        res = parseAtomEscape();

        if (!res) {
          if (!hasUnicodeFlag && lookahead() == 'c') {
            // B.1.4 ExtendedAtom
            // \[lookahead = c]
            return createValue('symbol', 92, pos - 1, pos);
          }

          bail('atomEscape');
        }

        return res;
      } else if (res = parseCharacterClass()) {
        return res;
      } else if (features.lookbehind && (res = parseGroup('(?<=', 'lookbehind', '(?<!', 'negativeLookbehind'))) {
        return res;
      } else if (features.namedGroups && match("(?<")) {
        var name = parseIdentifier();
        skip(">");
        var group = finishGroup("normal", name.range[0] - 3);
        group.name = name;
        return group;
      } else {
        //      ( Disjunction )
        //      ( ? : Disjunction )
        return parseGroup('(?:', 'ignore', '(', 'normal');
      }
    }

    function parseUnicodeSurrogatePairEscape(firstEscape) {
      if (hasUnicodeFlag) {
        var first, second;

        if (firstEscape.kind == 'unicodeEscape' && (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF && current('\\') && next('u')) {
          var prevPos = pos;
          pos++;
          var secondEscape = parseClassEscape();

          if (secondEscape.kind == 'unicodeEscape' && (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
            // Unicode surrogate pair
            firstEscape.range[1] = secondEscape.range[1];
            firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            firstEscape.type = 'value';
            firstEscape.kind = 'unicodeCodePointEscape';
            addRaw(firstEscape);
          } else {
            pos = prevPos;
          }
        }
      }

      return firstEscape;
    }

    function parseClassEscape() {
      return parseAtomEscape(true);
    }

    function parseAtomEscape(insideCharacterClass) {
      // AtomEscape ::
      //      DecimalEscape
      //      CharacterEscape
      //      CharacterClassEscape
      //      k GroupName
      var res,
          from = pos;
      res = parseDecimalEscape() || parseNamedReference();

      if (res) {
        return res;
      } // For ClassEscape


      if (insideCharacterClass) {
        //     b
        if (match('b')) {
          // 15.10.2.19
          // The production ClassEscape :: b evaluates by returning the
          // CharSet containing the one character <BS> (Unicode value 0008).
          return createEscaped('singleEscape', 0x0008, '\\b');
        } else if (match('B')) {
          bail('\\B not possible inside of CharacterClass', '', from);
        } else if (!hasUnicodeFlag && (res = matchReg(/^c([0-9])/))) {
          // B.1.4
          // c ClassControlLetter
          return createEscaped('controlLetter', res[1] + 16, res[1], 2);
        } //     [+U] -


        if (match('-') && hasUnicodeFlag) {
          return createEscaped('singleEscape', 0x002d, '\\-');
        }
      }

      res = parseCharacterEscape();
      return res;
    }

    function parseDecimalEscape() {
      // DecimalEscape ::
      //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
      //      CharacterClassEscape :: one of d D s S w W
      var res, match;

      if (res = matchReg(/^(?!0)\d+/)) {
        match = res[0];
        var refIdx = parseInt(res[0], 10);

        if (refIdx <= closedCaptureCounter) {
          // If the number is smaller than the normal-groups found so
          // far, then it is a reference...
          return createReference(res[0]);
        } else {
          // ... otherwise it needs to be interpreted as a octal (if the
          // number is in an octal format). If it is NOT octal format,
          // then the slash is ignored and the number is matched later
          // as normal characters.
          // Recall the negative decision to decide if the input must be parsed
          // a second time with the total normal-groups.
          backrefDenied.push(refIdx); // Reset the position again, as maybe only parts of the previous
          // matched numbers are actual octal numbers. E.g. in '019' only
          // the '01' should be matched.

          incr(-res[0].length);

          if (res = matchReg(/^[0-7]{1,3}/)) {
            return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
          } else {
            // If we end up here, we have a case like /\91/. Then the
            // first slash is to be ignored and the 9 & 1 to be treated
            // like ordinary characters. Create a character for the
            // first number only here - other number-characters
            // (if available) will be matched later.
            res = createCharacter(matchReg(/^[89]/));
            return updateRawStart(res, res.range[0] - 1);
          }
        }
      } // Only allow octal numbers in the following. All matched numbers start
      // with a zero (if the do not, the previous if-branch is executed).
      // If the number is not octal format and starts with zero (e.g. `091`)
      // then only the zeros `0` is treated here and the `91` are ordinary
      // characters.
      // Example:
      //   /\091/.exec('\091')[0].length === 3
      else if (res = matchReg(/^[0-7]{1,3}/)) {
          match = res[0];

          if (/^0{1,3}$/.test(match)) {
            // If they are all zeros, then only take the first one.
            return createEscaped('null', 0x0000, '0', match.length + 1);
          } else {
            return createEscaped('octal', parseInt(match, 8), match, 1);
          }
        } else if (res = matchReg(/^[dDsSwW]/)) {
          return createCharacterClassEscape(res[0]);
        }

      return false;
    }

    function parseNamedReference() {
      if (features.namedGroups && matchReg(/^k<(?=.*?>)/)) {
        var name = parseIdentifier();
        skip('>');
        return createNamedReference(name);
      }
    }

    function parseRegExpUnicodeEscapeSequence() {
      var res;

      if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
        // UnicodeEscapeSequence
        return parseUnicodeSurrogatePairEscape(createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2));
      } else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
        // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
        return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
      }
    }

    function parseCharacterEscape() {
      // CharacterEscape ::
      //      ControlEscape
      //      c ControlLetter
      //      HexEscapeSequence
      //      UnicodeEscapeSequence
      //      IdentityEscape
      var res;
      var from = pos;

      if (res = matchReg(/^[fnrtv]/)) {
        // ControlEscape
        var codePoint = 0;

        switch (res[0]) {
          case 't':
            codePoint = 0x009;
            break;

          case 'n':
            codePoint = 0x00A;
            break;

          case 'v':
            codePoint = 0x00B;
            break;

          case 'f':
            codePoint = 0x00C;
            break;

          case 'r':
            codePoint = 0x00D;
            break;
        }

        return createEscaped('singleEscape', codePoint, '\\' + res[0]);
      } else if (res = matchReg(/^c([a-zA-Z])/)) {
        // c ControlLetter
        return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
      } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
        // HexEscapeSequence
        return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
      } else if (res = parseRegExpUnicodeEscapeSequence()) {
        if (!res || res.codePoint > 0x10FFFF) {
          bail('Invalid escape sequence', null, from, pos);
        }

        return res;
      } else if (features.unicodePropertyEscape && hasUnicodeFlag && (res = matchReg(/^([pP])\{([^\}]+)\}/))) {
        // https://github.com/jviereck/regjsparser/issues/77
        return addRaw({
          type: 'unicodePropertyEscape',
          negative: res[1] === 'P',
          value: res[2],
          range: [res.range[0] - 1, res.range[1]],
          raw: res[0]
        });
      } else {
        // IdentityEscape
        return parseIdentityEscape();
      }
    }

    function parseIdentifierAtom(check) {
      var ch = lookahead();
      var from = pos;

      if (ch === '\\') {
        incr();
        var esc = parseRegExpUnicodeEscapeSequence();

        if (!esc || !check(esc.codePoint)) {
          bail('Invalid escape sequence', null, from, pos);
        }

        return fromCodePoint(esc.codePoint);
      }

      var code = ch.charCodeAt(0);

      if (code >= 0xD800 && code <= 0xDBFF) {
        ch += str[pos + 1];
        var second = ch.charCodeAt(1);

        if (second >= 0xDC00 && second <= 0xDFFF) {
          // Unicode surrogate pair
          code = (code - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }

      if (!check(code)) return;
      incr();
      if (code > 0xFFFF) incr();
      return ch;
    }

    function parseIdentifier() {
      // RegExpIdentifierName ::
      //      RegExpIdentifierStart
      //      RegExpIdentifierName RegExpIdentifierContinue
      //
      // RegExpIdentifierStart ::
      //      UnicodeIDStart
      //      $
      //      _
      //      \ RegExpUnicodeEscapeSequence
      //
      // RegExpIdentifierContinue ::
      //      UnicodeIDContinue
      //      $
      //      _
      //      \ RegExpUnicodeEscapeSequence
      //      <ZWNJ>
      //      <ZWJ>
      var start = pos;
      var res = parseIdentifierAtom(isIdentifierStart);

      if (!res) {
        bail('Invalid identifier');
      }

      var ch;

      while (ch = parseIdentifierAtom(isIdentifierPart)) {
        res += ch;
      }

      return addRaw({
        type: 'identifier',
        value: res,
        range: [start, pos]
      });
    }

    function isIdentifierStart(ch) {
      // Generated by `tools/generate-identifier-regex.js`.
      var NonAsciiIdentifierStart = /[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFF1]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
      return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
      ch >= 65 && ch <= 90 || // A..Z
      ch >= 97 && ch <= 122 || // a..z
      ch >= 0x80 && NonAsciiIdentifierStart.test(fromCodePoint(ch));
    } // Taken from the Esprima parser.


    function isIdentifierPart(ch) {
      // Generated by `tools/generate-identifier-regex.js`.
      var NonAsciiIdentifierPartOnly = /[0-9_\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDD30-\uDD39\uDF46-\uDF50]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC66-\uDC6F\uDC7F-\uDC82\uDCB0-\uDCBA\uDCF0-\uDCF9\uDD00-\uDD02\uDD27-\uDD34\uDD36-\uDD3F\uDD45\uDD46\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDC9-\uDDCC\uDDD0-\uDDD9\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF3B\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDC50-\uDC59\uDC5E\uDCB0-\uDCC3\uDCD0-\uDCD9\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDE50-\uDE59\uDEAB-\uDEB7\uDEC0-\uDEC9\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC2C-\uDC3A\uDCE0-\uDCE9\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE3E\uDE47\uDE51-\uDE5B\uDE8A-\uDE99]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC50-\uDC59\uDC92-\uDCA7\uDCA9-\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD50-\uDD59\uDD8A-\uDD8E\uDD90\uDD91\uDD93-\uDD97\uDDA0-\uDDA9\uDEF3-\uDEF6]|\uD81A[\uDE60-\uDE69\uDEF0-\uDEF4\uDF30-\uDF36\uDF50-\uDF59]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A\uDD50-\uDD59]|\uDB40[\uDD00-\uDDEF]/;
      return isIdentifierStart(ch) || ch >= 48 && ch <= 57 || // 0..9
      ch >= 0x80 && NonAsciiIdentifierPartOnly.test(fromCodePoint(ch));
    }

    function parseIdentityEscape() {
      // IdentityEscape ::
      //      [+U] SyntaxCharacter
      //      [+U] /
      //      [~U] SourceCharacterIdentityEscape[?N]
      // SourceCharacterIdentityEscape[?N] ::
      //      [~N] SourceCharacter but not c
      //      [+N] SourceCharacter but not one of c or k
      var tmp;
      var l = lookahead();

      if (hasUnicodeFlag && /[\^\$\.\*\+\?\(\)\\\[\]\{\}\|\/]/.test(l) || !hasUnicodeFlag && l !== "c") {
        if (l === "k" && features.lookbehind) {
          return null;
        }

        tmp = incr();
        return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
      }

      return null;
    }

    function parseCharacterClass() {
      // CharacterClass ::
      //      [ [lookahead ∉ {^}] ClassRanges ]
      //      [ ^ ClassRanges ]
      var res,
          from = pos;

      if (res = matchReg(/^\[\^/)) {
        res = parseClassRanges();
        skip(']');
        return createCharacterClass(res, true, from, pos);
      } else if (match('[')) {
        res = parseClassRanges();
        skip(']');
        return createCharacterClass(res, false, from, pos);
      }

      return null;
    }

    function parseClassRanges() {
      // ClassRanges ::
      //      [empty]
      //      NonemptyClassRanges
      var res;

      if (current(']')) {
        // Empty array means nothing insinde of the ClassRange.
        return [];
      } else {
        res = parseNonemptyClassRanges();

        if (!res) {
          bail('nonEmptyClassRanges');
        }

        return res;
      }
    }

    function parseHelperClassRanges(atom) {
      var from, to, res;

      if (current('-') && !next(']')) {
        // ClassAtom - ClassAtom ClassRanges
        skip('-');
        res = parseClassAtom();

        if (!res) {
          bail('classAtom');
        }

        to = pos;
        var classRanges = parseClassRanges();

        if (!classRanges) {
          bail('classRanges');
        }

        from = atom.range[0];

        if (classRanges.type === 'empty') {
          return [createClassRange(atom, res, from, to)];
        }

        return [createClassRange(atom, res, from, to)].concat(classRanges);
      }

      res = parseNonemptyClassRangesNoDash();

      if (!res) {
        bail('nonEmptyClassRangesNoDash');
      }

      return [atom].concat(res);
    }

    function parseNonemptyClassRanges() {
      // NonemptyClassRanges ::
      //      ClassAtom
      //      ClassAtom NonemptyClassRangesNoDash
      //      ClassAtom - ClassAtom ClassRanges
      var atom = parseClassAtom();

      if (!atom) {
        bail('classAtom');
      }

      if (current(']')) {
        // ClassAtom
        return [atom];
      } // ClassAtom NonemptyClassRangesNoDash
      // ClassAtom - ClassAtom ClassRanges


      return parseHelperClassRanges(atom);
    }

    function parseNonemptyClassRangesNoDash() {
      // NonemptyClassRangesNoDash ::
      //      ClassAtom
      //      ClassAtomNoDash NonemptyClassRangesNoDash
      //      ClassAtomNoDash - ClassAtom ClassRanges
      var res = parseClassAtom();

      if (!res) {
        bail('classAtom');
      }

      if (current(']')) {
        //      ClassAtom
        return res;
      } // ClassAtomNoDash NonemptyClassRangesNoDash
      // ClassAtomNoDash - ClassAtom ClassRanges


      return parseHelperClassRanges(res);
    }

    function parseClassAtom() {
      // ClassAtom ::
      //      -
      //      ClassAtomNoDash
      if (match('-')) {
        return createCharacter('-');
      } else {
        return parseClassAtomNoDash();
      }
    }

    function parseClassAtomNoDash() {
      // ClassAtomNoDash ::
      //      SourceCharacter but not one of \ or ] or -
      //      \ ClassEscape
      var res;

      if (res = matchReg(/^[^\\\]-]/)) {
        return createCharacter(res[0]);
      } else if (match('\\')) {
        res = parseClassEscape();

        if (!res) {
          bail('classEscape');
        }

        return parseUnicodeSurrogatePairEscape(res);
      }
    }

    function bail(message, details, from, to) {
      from = from == null ? pos : from;
      to = to == null ? from : to;
      var contextStart = Math.max(0, from - 10);
      var contextEnd = Math.min(to + 10, str.length); // Output a bit of context and a line pointing to where our error is.
      //
      // We are assuming that there are no actual newlines in the content as this is a regular expression.

      var context = '    ' + str.substring(contextStart, contextEnd);
      var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';
      throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
    }

    var backrefDenied = [];
    var closedCaptureCounter = 0;
    var firstIteration = true;
    var hasUnicodeFlag = (flags || "").indexOf("u") !== -1;
    var pos = 0; // Convert the input to a string and treat the empty string special.

    str = String(str);

    if (str === '') {
      str = '(?:)';
    }

    var result = parseDisjunction();

    if (result.range[1] !== str.length) {
      bail('Could not parse entire input - got stuck', '', result.range[1]);
    } // The spec requires to interpret the `\2` in `/\2()()/` as backreference.
    // As the parser collects the number of capture groups as the string is
    // parsed it is impossible to make these decisions at the point when the
    // `\2` is handled. In case the local decision turns out to be wrong after
    // the parsing has finished, the input string is parsed a second time with
    // the total number of capture groups set.
    //
    // SEE: https://github.com/jviereck/regjsparser/issues/70


    for (var i = 0; i < backrefDenied.length; i++) {
      if (backrefDenied[i] <= closedCaptureCounter) {
        // Parse the input a second time.
        pos = 0;
        firstIteration = false;
        return parseDisjunction();
      }
    }

    return result;
  }

  var regjsparser = {
    parse: parse
  };

  if ( true && module.exports) {
    module.exports = regjsparser;
  } else {
    window.regjsparser = regjsparser;
  }
})();

/***/ }),
/* 580 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canonicalProperties = __webpack_require__(581);

var propertyAliases = __webpack_require__(582);

var matchProperty = function matchProperty(property) {
  if (canonicalProperties.has(property)) {
    return property;
  }

  if (propertyAliases.has(property)) {
    return propertyAliases.get(property);
  }

  throw new Error("Unknown property: ".concat(property));
};

module.exports = matchProperty;

/***/ }),
/* 581 */
/***/ (function(module, exports) {

module.exports = new Set([// Non-binary properties:
'General_Category', 'Script', 'Script_Extensions', // Binary properties:
'Alphabetic', 'Any', 'ASCII', 'ASCII_Hex_Digit', 'Assigned', 'Bidi_Control', 'Bidi_Mirrored', 'Case_Ignorable', 'Cased', 'Changes_When_Casefolded', 'Changes_When_Casemapped', 'Changes_When_Lowercased', 'Changes_When_NFKC_Casefolded', 'Changes_When_Titlecased', 'Changes_When_Uppercased', 'Dash', 'Default_Ignorable_Code_Point', 'Deprecated', 'Diacritic', 'Emoji', 'Emoji_Component', 'Emoji_Modifier', 'Emoji_Modifier_Base', 'Emoji_Presentation', 'Extended_Pictographic', 'Extender', 'Grapheme_Base', 'Grapheme_Extend', 'Hex_Digit', 'ID_Continue', 'ID_Start', 'Ideographic', 'IDS_Binary_Operator', 'IDS_Trinary_Operator', 'Join_Control', 'Logical_Order_Exception', 'Lowercase', 'Math', 'Noncharacter_Code_Point', 'Pattern_Syntax', 'Pattern_White_Space', 'Quotation_Mark', 'Radical', 'Regional_Indicator', 'Sentence_Terminal', 'Soft_Dotted', 'Terminal_Punctuation', 'Unified_Ideograph', 'Uppercase', 'Variation_Selector', 'White_Space', 'XID_Continue', 'XID_Start']);

/***/ }),
/* 582 */
/***/ (function(module, exports) {

// Generated using `npm run build`. Do not edit!
module.exports = new Map([['scx', 'Script_Extensions'], ['sc', 'Script'], ['gc', 'General_Category'], ['AHex', 'ASCII_Hex_Digit'], ['Alpha', 'Alphabetic'], ['Bidi_C', 'Bidi_Control'], ['Bidi_M', 'Bidi_Mirrored'], ['Cased', 'Cased'], ['CI', 'Case_Ignorable'], ['CWCF', 'Changes_When_Casefolded'], ['CWCM', 'Changes_When_Casemapped'], ['CWKCF', 'Changes_When_NFKC_Casefolded'], ['CWL', 'Changes_When_Lowercased'], ['CWT', 'Changes_When_Titlecased'], ['CWU', 'Changes_When_Uppercased'], ['Dash', 'Dash'], ['Dep', 'Deprecated'], ['DI', 'Default_Ignorable_Code_Point'], ['Dia', 'Diacritic'], ['EBase', 'Emoji_Modifier_Base'], ['EComp', 'Emoji_Component'], ['EMod', 'Emoji_Modifier'], ['Emoji', 'Emoji'], ['EPres', 'Emoji_Presentation'], ['Ext', 'Extender'], ['ExtPict', 'Extended_Pictographic'], ['Gr_Base', 'Grapheme_Base'], ['Gr_Ext', 'Grapheme_Extend'], ['Hex', 'Hex_Digit'], ['IDC', 'ID_Continue'], ['Ideo', 'Ideographic'], ['IDS', 'ID_Start'], ['IDSB', 'IDS_Binary_Operator'], ['IDST', 'IDS_Trinary_Operator'], ['Join_C', 'Join_Control'], ['LOE', 'Logical_Order_Exception'], ['Lower', 'Lowercase'], ['Math', 'Math'], ['NChar', 'Noncharacter_Code_Point'], ['Pat_Syn', 'Pattern_Syntax'], ['Pat_WS', 'Pattern_White_Space'], ['QMark', 'Quotation_Mark'], ['Radical', 'Radical'], ['RI', 'Regional_Indicator'], ['SD', 'Soft_Dotted'], ['STerm', 'Sentence_Terminal'], ['Term', 'Terminal_Punctuation'], ['UIdeo', 'Unified_Ideograph'], ['Upper', 'Uppercase'], ['VS', 'Variation_Selector'], ['WSpace', 'White_Space'], ['space', 'White_Space'], ['XIDC', 'XID_Continue'], ['XIDS', 'XID_Start']]);

/***/ }),
/* 583 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var propertyToValueAliases = __webpack_require__(584);

var matchPropertyValue = function matchPropertyValue(property, value) {
  var aliasToValue = propertyToValueAliases.get(property);

  if (!aliasToValue) {
    throw new Error("Unknown property `".concat(property, "`."));
  }

  var canonicalValue = aliasToValue.get(value);

  if (canonicalValue) {
    return canonicalValue;
  }

  throw new Error("Unknown value `".concat(value, "` for property `").concat(property, "`."));
};

module.exports = matchPropertyValue;

/***/ }),
/* 584 */
/***/ (function(module, exports) {

module.exports = new Map([['General_Category', new Map([['C', 'Other'], ['Cc', 'Control'], ['cntrl', 'Control'], ['Cf', 'Format'], ['Cn', 'Unassigned'], ['Co', 'Private_Use'], ['Cs', 'Surrogate'], ['L', 'Letter'], ['LC', 'Cased_Letter'], ['Ll', 'Lowercase_Letter'], ['Lm', 'Modifier_Letter'], ['Lo', 'Other_Letter'], ['Lt', 'Titlecase_Letter'], ['Lu', 'Uppercase_Letter'], ['M', 'Mark'], ['Combining_Mark', 'Mark'], ['Mc', 'Spacing_Mark'], ['Me', 'Enclosing_Mark'], ['Mn', 'Nonspacing_Mark'], ['N', 'Number'], ['Nd', 'Decimal_Number'], ['digit', 'Decimal_Number'], ['Nl', 'Letter_Number'], ['No', 'Other_Number'], ['P', 'Punctuation'], ['punct', 'Punctuation'], ['Pc', 'Connector_Punctuation'], ['Pd', 'Dash_Punctuation'], ['Pe', 'Close_Punctuation'], ['Pf', 'Final_Punctuation'], ['Pi', 'Initial_Punctuation'], ['Po', 'Other_Punctuation'], ['Ps', 'Open_Punctuation'], ['S', 'Symbol'], ['Sc', 'Currency_Symbol'], ['Sk', 'Modifier_Symbol'], ['Sm', 'Math_Symbol'], ['So', 'Other_Symbol'], ['Z', 'Separator'], ['Zl', 'Line_Separator'], ['Zp', 'Paragraph_Separator'], ['Zs', 'Space_Separator'], ['Other', 'Other'], ['Control', 'Control'], ['Format', 'Format'], ['Unassigned', 'Unassigned'], ['Private_Use', 'Private_Use'], ['Surrogate', 'Surrogate'], ['Letter', 'Letter'], ['Cased_Letter', 'Cased_Letter'], ['Lowercase_Letter', 'Lowercase_Letter'], ['Modifier_Letter', 'Modifier_Letter'], ['Other_Letter', 'Other_Letter'], ['Titlecase_Letter', 'Titlecase_Letter'], ['Uppercase_Letter', 'Uppercase_Letter'], ['Mark', 'Mark'], ['Spacing_Mark', 'Spacing_Mark'], ['Enclosing_Mark', 'Enclosing_Mark'], ['Nonspacing_Mark', 'Nonspacing_Mark'], ['Number', 'Number'], ['Decimal_Number', 'Decimal_Number'], ['Letter_Number', 'Letter_Number'], ['Other_Number', 'Other_Number'], ['Punctuation', 'Punctuation'], ['Connector_Punctuation', 'Connector_Punctuation'], ['Dash_Punctuation', 'Dash_Punctuation'], ['Close_Punctuation', 'Close_Punctuation'], ['Final_Punctuation', 'Final_Punctuation'], ['Initial_Punctuation', 'Initial_Punctuation'], ['Other_Punctuation', 'Other_Punctuation'], ['Open_Punctuation', 'Open_Punctuation'], ['Symbol', 'Symbol'], ['Currency_Symbol', 'Currency_Symbol'], ['Modifier_Symbol', 'Modifier_Symbol'], ['Math_Symbol', 'Math_Symbol'], ['Other_Symbol', 'Other_Symbol'], ['Separator', 'Separator'], ['Line_Separator', 'Line_Separator'], ['Paragraph_Separator', 'Paragraph_Separator'], ['Space_Separator', 'Space_Separator']])], ['Script', new Map([['Adlm', 'Adlam'], ['Aghb', 'Caucasian_Albanian'], ['Ahom', 'Ahom'], ['Arab', 'Arabic'], ['Armi', 'Imperial_Aramaic'], ['Armn', 'Armenian'], ['Avst', 'Avestan'], ['Bali', 'Balinese'], ['Bamu', 'Bamum'], ['Bass', 'Bassa_Vah'], ['Batk', 'Batak'], ['Beng', 'Bengali'], ['Bhks', 'Bhaiksuki'], ['Bopo', 'Bopomofo'], ['Brah', 'Brahmi'], ['Brai', 'Braille'], ['Bugi', 'Buginese'], ['Buhd', 'Buhid'], ['Cakm', 'Chakma'], ['Cans', 'Canadian_Aboriginal'], ['Cari', 'Carian'], ['Cham', 'Cham'], ['Cher', 'Cherokee'], ['Chrs', 'Chorasmian'], ['Copt', 'Coptic'], ['Qaac', 'Coptic'], ['Cprt', 'Cypriot'], ['Cyrl', 'Cyrillic'], ['Deva', 'Devanagari'], ['Diak', 'Dives_Akuru'], ['Dogr', 'Dogra'], ['Dsrt', 'Deseret'], ['Dupl', 'Duployan'], ['Egyp', 'Egyptian_Hieroglyphs'], ['Elba', 'Elbasan'], ['Elym', 'Elymaic'], ['Ethi', 'Ethiopic'], ['Geor', 'Georgian'], ['Glag', 'Glagolitic'], ['Gong', 'Gunjala_Gondi'], ['Gonm', 'Masaram_Gondi'], ['Goth', 'Gothic'], ['Gran', 'Grantha'], ['Grek', 'Greek'], ['Gujr', 'Gujarati'], ['Guru', 'Gurmukhi'], ['Hang', 'Hangul'], ['Hani', 'Han'], ['Hano', 'Hanunoo'], ['Hatr', 'Hatran'], ['Hebr', 'Hebrew'], ['Hira', 'Hiragana'], ['Hluw', 'Anatolian_Hieroglyphs'], ['Hmng', 'Pahawh_Hmong'], ['Hmnp', 'Nyiakeng_Puachue_Hmong'], ['Hrkt', 'Katakana_Or_Hiragana'], ['Hung', 'Old_Hungarian'], ['Ital', 'Old_Italic'], ['Java', 'Javanese'], ['Kali', 'Kayah_Li'], ['Kana', 'Katakana'], ['Khar', 'Kharoshthi'], ['Khmr', 'Khmer'], ['Khoj', 'Khojki'], ['Kits', 'Khitan_Small_Script'], ['Knda', 'Kannada'], ['Kthi', 'Kaithi'], ['Lana', 'Tai_Tham'], ['Laoo', 'Lao'], ['Latn', 'Latin'], ['Lepc', 'Lepcha'], ['Limb', 'Limbu'], ['Lina', 'Linear_A'], ['Linb', 'Linear_B'], ['Lisu', 'Lisu'], ['Lyci', 'Lycian'], ['Lydi', 'Lydian'], ['Mahj', 'Mahajani'], ['Maka', 'Makasar'], ['Mand', 'Mandaic'], ['Mani', 'Manichaean'], ['Marc', 'Marchen'], ['Medf', 'Medefaidrin'], ['Mend', 'Mende_Kikakui'], ['Merc', 'Meroitic_Cursive'], ['Mero', 'Meroitic_Hieroglyphs'], ['Mlym', 'Malayalam'], ['Modi', 'Modi'], ['Mong', 'Mongolian'], ['Mroo', 'Mro'], ['Mtei', 'Meetei_Mayek'], ['Mult', 'Multani'], ['Mymr', 'Myanmar'], ['Nand', 'Nandinagari'], ['Narb', 'Old_North_Arabian'], ['Nbat', 'Nabataean'], ['Newa', 'Newa'], ['Nkoo', 'Nko'], ['Nshu', 'Nushu'], ['Ogam', 'Ogham'], ['Olck', 'Ol_Chiki'], ['Orkh', 'Old_Turkic'], ['Orya', 'Oriya'], ['Osge', 'Osage'], ['Osma', 'Osmanya'], ['Palm', 'Palmyrene'], ['Pauc', 'Pau_Cin_Hau'], ['Perm', 'Old_Permic'], ['Phag', 'Phags_Pa'], ['Phli', 'Inscriptional_Pahlavi'], ['Phlp', 'Psalter_Pahlavi'], ['Phnx', 'Phoenician'], ['Plrd', 'Miao'], ['Prti', 'Inscriptional_Parthian'], ['Rjng', 'Rejang'], ['Rohg', 'Hanifi_Rohingya'], ['Runr', 'Runic'], ['Samr', 'Samaritan'], ['Sarb', 'Old_South_Arabian'], ['Saur', 'Saurashtra'], ['Sgnw', 'SignWriting'], ['Shaw', 'Shavian'], ['Shrd', 'Sharada'], ['Sidd', 'Siddham'], ['Sind', 'Khudawadi'], ['Sinh', 'Sinhala'], ['Sogd', 'Sogdian'], ['Sogo', 'Old_Sogdian'], ['Sora', 'Sora_Sompeng'], ['Soyo', 'Soyombo'], ['Sund', 'Sundanese'], ['Sylo', 'Syloti_Nagri'], ['Syrc', 'Syriac'], ['Tagb', 'Tagbanwa'], ['Takr', 'Takri'], ['Tale', 'Tai_Le'], ['Talu', 'New_Tai_Lue'], ['Taml', 'Tamil'], ['Tang', 'Tangut'], ['Tavt', 'Tai_Viet'], ['Telu', 'Telugu'], ['Tfng', 'Tifinagh'], ['Tglg', 'Tagalog'], ['Thaa', 'Thaana'], ['Thai', 'Thai'], ['Tibt', 'Tibetan'], ['Tirh', 'Tirhuta'], ['Ugar', 'Ugaritic'], ['Vaii', 'Vai'], ['Wara', 'Warang_Citi'], ['Wcho', 'Wancho'], ['Xpeo', 'Old_Persian'], ['Xsux', 'Cuneiform'], ['Yezi', 'Yezidi'], ['Yiii', 'Yi'], ['Zanb', 'Zanabazar_Square'], ['Zinh', 'Inherited'], ['Qaai', 'Inherited'], ['Zyyy', 'Common'], ['Zzzz', 'Unknown'], ['Adlam', 'Adlam'], ['Caucasian_Albanian', 'Caucasian_Albanian'], ['Arabic', 'Arabic'], ['Imperial_Aramaic', 'Imperial_Aramaic'], ['Armenian', 'Armenian'], ['Avestan', 'Avestan'], ['Balinese', 'Balinese'], ['Bamum', 'Bamum'], ['Bassa_Vah', 'Bassa_Vah'], ['Batak', 'Batak'], ['Bengali', 'Bengali'], ['Bhaiksuki', 'Bhaiksuki'], ['Bopomofo', 'Bopomofo'], ['Brahmi', 'Brahmi'], ['Braille', 'Braille'], ['Buginese', 'Buginese'], ['Buhid', 'Buhid'], ['Chakma', 'Chakma'], ['Canadian_Aboriginal', 'Canadian_Aboriginal'], ['Carian', 'Carian'], ['Cherokee', 'Cherokee'], ['Chorasmian', 'Chorasmian'], ['Coptic', 'Coptic'], ['Cypriot', 'Cypriot'], ['Cyrillic', 'Cyrillic'], ['Devanagari', 'Devanagari'], ['Dives_Akuru', 'Dives_Akuru'], ['Dogra', 'Dogra'], ['Deseret', 'Deseret'], ['Duployan', 'Duployan'], ['Egyptian_Hieroglyphs', 'Egyptian_Hieroglyphs'], ['Elbasan', 'Elbasan'], ['Elymaic', 'Elymaic'], ['Ethiopic', 'Ethiopic'], ['Georgian', 'Georgian'], ['Glagolitic', 'Glagolitic'], ['Gunjala_Gondi', 'Gunjala_Gondi'], ['Masaram_Gondi', 'Masaram_Gondi'], ['Gothic', 'Gothic'], ['Grantha', 'Grantha'], ['Greek', 'Greek'], ['Gujarati', 'Gujarati'], ['Gurmukhi', 'Gurmukhi'], ['Hangul', 'Hangul'], ['Han', 'Han'], ['Hanunoo', 'Hanunoo'], ['Hatran', 'Hatran'], ['Hebrew', 'Hebrew'], ['Hiragana', 'Hiragana'], ['Anatolian_Hieroglyphs', 'Anatolian_Hieroglyphs'], ['Pahawh_Hmong', 'Pahawh_Hmong'], ['Nyiakeng_Puachue_Hmong', 'Nyiakeng_Puachue_Hmong'], ['Katakana_Or_Hiragana', 'Katakana_Or_Hiragana'], ['Old_Hungarian', 'Old_Hungarian'], ['Old_Italic', 'Old_Italic'], ['Javanese', 'Javanese'], ['Kayah_Li', 'Kayah_Li'], ['Katakana', 'Katakana'], ['Kharoshthi', 'Kharoshthi'], ['Khmer', 'Khmer'], ['Khojki', 'Khojki'], ['Khitan_Small_Script', 'Khitan_Small_Script'], ['Kannada', 'Kannada'], ['Kaithi', 'Kaithi'], ['Tai_Tham', 'Tai_Tham'], ['Lao', 'Lao'], ['Latin', 'Latin'], ['Lepcha', 'Lepcha'], ['Limbu', 'Limbu'], ['Linear_A', 'Linear_A'], ['Linear_B', 'Linear_B'], ['Lycian', 'Lycian'], ['Lydian', 'Lydian'], ['Mahajani', 'Mahajani'], ['Makasar', 'Makasar'], ['Mandaic', 'Mandaic'], ['Manichaean', 'Manichaean'], ['Marchen', 'Marchen'], ['Medefaidrin', 'Medefaidrin'], ['Mende_Kikakui', 'Mende_Kikakui'], ['Meroitic_Cursive', 'Meroitic_Cursive'], ['Meroitic_Hieroglyphs', 'Meroitic_Hieroglyphs'], ['Malayalam', 'Malayalam'], ['Mongolian', 'Mongolian'], ['Mro', 'Mro'], ['Meetei_Mayek', 'Meetei_Mayek'], ['Multani', 'Multani'], ['Myanmar', 'Myanmar'], ['Nandinagari', 'Nandinagari'], ['Old_North_Arabian', 'Old_North_Arabian'], ['Nabataean', 'Nabataean'], ['Nko', 'Nko'], ['Nushu', 'Nushu'], ['Ogham', 'Ogham'], ['Ol_Chiki', 'Ol_Chiki'], ['Old_Turkic', 'Old_Turkic'], ['Oriya', 'Oriya'], ['Osage', 'Osage'], ['Osmanya', 'Osmanya'], ['Palmyrene', 'Palmyrene'], ['Pau_Cin_Hau', 'Pau_Cin_Hau'], ['Old_Permic', 'Old_Permic'], ['Phags_Pa', 'Phags_Pa'], ['Inscriptional_Pahlavi', 'Inscriptional_Pahlavi'], ['Psalter_Pahlavi', 'Psalter_Pahlavi'], ['Phoenician', 'Phoenician'], ['Miao', 'Miao'], ['Inscriptional_Parthian', 'Inscriptional_Parthian'], ['Rejang', 'Rejang'], ['Hanifi_Rohingya', 'Hanifi_Rohingya'], ['Runic', 'Runic'], ['Samaritan', 'Samaritan'], ['Old_South_Arabian', 'Old_South_Arabian'], ['Saurashtra', 'Saurashtra'], ['SignWriting', 'SignWriting'], ['Shavian', 'Shavian'], ['Sharada', 'Sharada'], ['Siddham', 'Siddham'], ['Khudawadi', 'Khudawadi'], ['Sinhala', 'Sinhala'], ['Sogdian', 'Sogdian'], ['Old_Sogdian', 'Old_Sogdian'], ['Sora_Sompeng', 'Sora_Sompeng'], ['Soyombo', 'Soyombo'], ['Sundanese', 'Sundanese'], ['Syloti_Nagri', 'Syloti_Nagri'], ['Syriac', 'Syriac'], ['Tagbanwa', 'Tagbanwa'], ['Takri', 'Takri'], ['Tai_Le', 'Tai_Le'], ['New_Tai_Lue', 'New_Tai_Lue'], ['Tamil', 'Tamil'], ['Tangut', 'Tangut'], ['Tai_Viet', 'Tai_Viet'], ['Telugu', 'Telugu'], ['Tifinagh', 'Tifinagh'], ['Tagalog', 'Tagalog'], ['Thaana', 'Thaana'], ['Tibetan', 'Tibetan'], ['Tirhuta', 'Tirhuta'], ['Ugaritic', 'Ugaritic'], ['Vai', 'Vai'], ['Warang_Citi', 'Warang_Citi'], ['Wancho', 'Wancho'], ['Old_Persian', 'Old_Persian'], ['Cuneiform', 'Cuneiform'], ['Yezidi', 'Yezidi'], ['Yi', 'Yi'], ['Zanabazar_Square', 'Zanabazar_Square'], ['Inherited', 'Inherited'], ['Common', 'Common'], ['Unknown', 'Unknown']])], ['Script_Extensions', new Map([['Adlm', 'Adlam'], ['Aghb', 'Caucasian_Albanian'], ['Ahom', 'Ahom'], ['Arab', 'Arabic'], ['Armi', 'Imperial_Aramaic'], ['Armn', 'Armenian'], ['Avst', 'Avestan'], ['Bali', 'Balinese'], ['Bamu', 'Bamum'], ['Bass', 'Bassa_Vah'], ['Batk', 'Batak'], ['Beng', 'Bengali'], ['Bhks', 'Bhaiksuki'], ['Bopo', 'Bopomofo'], ['Brah', 'Brahmi'], ['Brai', 'Braille'], ['Bugi', 'Buginese'], ['Buhd', 'Buhid'], ['Cakm', 'Chakma'], ['Cans', 'Canadian_Aboriginal'], ['Cari', 'Carian'], ['Cham', 'Cham'], ['Cher', 'Cherokee'], ['Chrs', 'Chorasmian'], ['Copt', 'Coptic'], ['Qaac', 'Coptic'], ['Cprt', 'Cypriot'], ['Cyrl', 'Cyrillic'], ['Deva', 'Devanagari'], ['Diak', 'Dives_Akuru'], ['Dogr', 'Dogra'], ['Dsrt', 'Deseret'], ['Dupl', 'Duployan'], ['Egyp', 'Egyptian_Hieroglyphs'], ['Elba', 'Elbasan'], ['Elym', 'Elymaic'], ['Ethi', 'Ethiopic'], ['Geor', 'Georgian'], ['Glag', 'Glagolitic'], ['Gong', 'Gunjala_Gondi'], ['Gonm', 'Masaram_Gondi'], ['Goth', 'Gothic'], ['Gran', 'Grantha'], ['Grek', 'Greek'], ['Gujr', 'Gujarati'], ['Guru', 'Gurmukhi'], ['Hang', 'Hangul'], ['Hani', 'Han'], ['Hano', 'Hanunoo'], ['Hatr', 'Hatran'], ['Hebr', 'Hebrew'], ['Hira', 'Hiragana'], ['Hluw', 'Anatolian_Hieroglyphs'], ['Hmng', 'Pahawh_Hmong'], ['Hmnp', 'Nyiakeng_Puachue_Hmong'], ['Hrkt', 'Katakana_Or_Hiragana'], ['Hung', 'Old_Hungarian'], ['Ital', 'Old_Italic'], ['Java', 'Javanese'], ['Kali', 'Kayah_Li'], ['Kana', 'Katakana'], ['Khar', 'Kharoshthi'], ['Khmr', 'Khmer'], ['Khoj', 'Khojki'], ['Kits', 'Khitan_Small_Script'], ['Knda', 'Kannada'], ['Kthi', 'Kaithi'], ['Lana', 'Tai_Tham'], ['Laoo', 'Lao'], ['Latn', 'Latin'], ['Lepc', 'Lepcha'], ['Limb', 'Limbu'], ['Lina', 'Linear_A'], ['Linb', 'Linear_B'], ['Lisu', 'Lisu'], ['Lyci', 'Lycian'], ['Lydi', 'Lydian'], ['Mahj', 'Mahajani'], ['Maka', 'Makasar'], ['Mand', 'Mandaic'], ['Mani', 'Manichaean'], ['Marc', 'Marchen'], ['Medf', 'Medefaidrin'], ['Mend', 'Mende_Kikakui'], ['Merc', 'Meroitic_Cursive'], ['Mero', 'Meroitic_Hieroglyphs'], ['Mlym', 'Malayalam'], ['Modi', 'Modi'], ['Mong', 'Mongolian'], ['Mroo', 'Mro'], ['Mtei', 'Meetei_Mayek'], ['Mult', 'Multani'], ['Mymr', 'Myanmar'], ['Nand', 'Nandinagari'], ['Narb', 'Old_North_Arabian'], ['Nbat', 'Nabataean'], ['Newa', 'Newa'], ['Nkoo', 'Nko'], ['Nshu', 'Nushu'], ['Ogam', 'Ogham'], ['Olck', 'Ol_Chiki'], ['Orkh', 'Old_Turkic'], ['Orya', 'Oriya'], ['Osge', 'Osage'], ['Osma', 'Osmanya'], ['Palm', 'Palmyrene'], ['Pauc', 'Pau_Cin_Hau'], ['Perm', 'Old_Permic'], ['Phag', 'Phags_Pa'], ['Phli', 'Inscriptional_Pahlavi'], ['Phlp', 'Psalter_Pahlavi'], ['Phnx', 'Phoenician'], ['Plrd', 'Miao'], ['Prti', 'Inscriptional_Parthian'], ['Rjng', 'Rejang'], ['Rohg', 'Hanifi_Rohingya'], ['Runr', 'Runic'], ['Samr', 'Samaritan'], ['Sarb', 'Old_South_Arabian'], ['Saur', 'Saurashtra'], ['Sgnw', 'SignWriting'], ['Shaw', 'Shavian'], ['Shrd', 'Sharada'], ['Sidd', 'Siddham'], ['Sind', 'Khudawadi'], ['Sinh', 'Sinhala'], ['Sogd', 'Sogdian'], ['Sogo', 'Old_Sogdian'], ['Sora', 'Sora_Sompeng'], ['Soyo', 'Soyombo'], ['Sund', 'Sundanese'], ['Sylo', 'Syloti_Nagri'], ['Syrc', 'Syriac'], ['Tagb', 'Tagbanwa'], ['Takr', 'Takri'], ['Tale', 'Tai_Le'], ['Talu', 'New_Tai_Lue'], ['Taml', 'Tamil'], ['Tang', 'Tangut'], ['Tavt', 'Tai_Viet'], ['Telu', 'Telugu'], ['Tfng', 'Tifinagh'], ['Tglg', 'Tagalog'], ['Thaa', 'Thaana'], ['Thai', 'Thai'], ['Tibt', 'Tibetan'], ['Tirh', 'Tirhuta'], ['Ugar', 'Ugaritic'], ['Vaii', 'Vai'], ['Wara', 'Warang_Citi'], ['Wcho', 'Wancho'], ['Xpeo', 'Old_Persian'], ['Xsux', 'Cuneiform'], ['Yezi', 'Yezidi'], ['Yiii', 'Yi'], ['Zanb', 'Zanabazar_Square'], ['Zinh', 'Inherited'], ['Qaai', 'Inherited'], ['Zyyy', 'Common'], ['Zzzz', 'Unknown'], ['Adlam', 'Adlam'], ['Caucasian_Albanian', 'Caucasian_Albanian'], ['Arabic', 'Arabic'], ['Imperial_Aramaic', 'Imperial_Aramaic'], ['Armenian', 'Armenian'], ['Avestan', 'Avestan'], ['Balinese', 'Balinese'], ['Bamum', 'Bamum'], ['Bassa_Vah', 'Bassa_Vah'], ['Batak', 'Batak'], ['Bengali', 'Bengali'], ['Bhaiksuki', 'Bhaiksuki'], ['Bopomofo', 'Bopomofo'], ['Brahmi', 'Brahmi'], ['Braille', 'Braille'], ['Buginese', 'Buginese'], ['Buhid', 'Buhid'], ['Chakma', 'Chakma'], ['Canadian_Aboriginal', 'Canadian_Aboriginal'], ['Carian', 'Carian'], ['Cherokee', 'Cherokee'], ['Chorasmian', 'Chorasmian'], ['Coptic', 'Coptic'], ['Cypriot', 'Cypriot'], ['Cyrillic', 'Cyrillic'], ['Devanagari', 'Devanagari'], ['Dives_Akuru', 'Dives_Akuru'], ['Dogra', 'Dogra'], ['Deseret', 'Deseret'], ['Duployan', 'Duployan'], ['Egyptian_Hieroglyphs', 'Egyptian_Hieroglyphs'], ['Elbasan', 'Elbasan'], ['Elymaic', 'Elymaic'], ['Ethiopic', 'Ethiopic'], ['Georgian', 'Georgian'], ['Glagolitic', 'Glagolitic'], ['Gunjala_Gondi', 'Gunjala_Gondi'], ['Masaram_Gondi', 'Masaram_Gondi'], ['Gothic', 'Gothic'], ['Grantha', 'Grantha'], ['Greek', 'Greek'], ['Gujarati', 'Gujarati'], ['Gurmukhi', 'Gurmukhi'], ['Hangul', 'Hangul'], ['Han', 'Han'], ['Hanunoo', 'Hanunoo'], ['Hatran', 'Hatran'], ['Hebrew', 'Hebrew'], ['Hiragana', 'Hiragana'], ['Anatolian_Hieroglyphs', 'Anatolian_Hieroglyphs'], ['Pahawh_Hmong', 'Pahawh_Hmong'], ['Nyiakeng_Puachue_Hmong', 'Nyiakeng_Puachue_Hmong'], ['Katakana_Or_Hiragana', 'Katakana_Or_Hiragana'], ['Old_Hungarian', 'Old_Hungarian'], ['Old_Italic', 'Old_Italic'], ['Javanese', 'Javanese'], ['Kayah_Li', 'Kayah_Li'], ['Katakana', 'Katakana'], ['Kharoshthi', 'Kharoshthi'], ['Khmer', 'Khmer'], ['Khojki', 'Khojki'], ['Khitan_Small_Script', 'Khitan_Small_Script'], ['Kannada', 'Kannada'], ['Kaithi', 'Kaithi'], ['Tai_Tham', 'Tai_Tham'], ['Lao', 'Lao'], ['Latin', 'Latin'], ['Lepcha', 'Lepcha'], ['Limbu', 'Limbu'], ['Linear_A', 'Linear_A'], ['Linear_B', 'Linear_B'], ['Lycian', 'Lycian'], ['Lydian', 'Lydian'], ['Mahajani', 'Mahajani'], ['Makasar', 'Makasar'], ['Mandaic', 'Mandaic'], ['Manichaean', 'Manichaean'], ['Marchen', 'Marchen'], ['Medefaidrin', 'Medefaidrin'], ['Mende_Kikakui', 'Mende_Kikakui'], ['Meroitic_Cursive', 'Meroitic_Cursive'], ['Meroitic_Hieroglyphs', 'Meroitic_Hieroglyphs'], ['Malayalam', 'Malayalam'], ['Mongolian', 'Mongolian'], ['Mro', 'Mro'], ['Meetei_Mayek', 'Meetei_Mayek'], ['Multani', 'Multani'], ['Myanmar', 'Myanmar'], ['Nandinagari', 'Nandinagari'], ['Old_North_Arabian', 'Old_North_Arabian'], ['Nabataean', 'Nabataean'], ['Nko', 'Nko'], ['Nushu', 'Nushu'], ['Ogham', 'Ogham'], ['Ol_Chiki', 'Ol_Chiki'], ['Old_Turkic', 'Old_Turkic'], ['Oriya', 'Oriya'], ['Osage', 'Osage'], ['Osmanya', 'Osmanya'], ['Palmyrene', 'Palmyrene'], ['Pau_Cin_Hau', 'Pau_Cin_Hau'], ['Old_Permic', 'Old_Permic'], ['Phags_Pa', 'Phags_Pa'], ['Inscriptional_Pahlavi', 'Inscriptional_Pahlavi'], ['Psalter_Pahlavi', 'Psalter_Pahlavi'], ['Phoenician', 'Phoenician'], ['Miao', 'Miao'], ['Inscriptional_Parthian', 'Inscriptional_Parthian'], ['Rejang', 'Rejang'], ['Hanifi_Rohingya', 'Hanifi_Rohingya'], ['Runic', 'Runic'], ['Samaritan', 'Samaritan'], ['Old_South_Arabian', 'Old_South_Arabian'], ['Saurashtra', 'Saurashtra'], ['SignWriting', 'SignWriting'], ['Shavian', 'Shavian'], ['Sharada', 'Sharada'], ['Siddham', 'Siddham'], ['Khudawadi', 'Khudawadi'], ['Sinhala', 'Sinhala'], ['Sogdian', 'Sogdian'], ['Old_Sogdian', 'Old_Sogdian'], ['Sora_Sompeng', 'Sora_Sompeng'], ['Soyombo', 'Soyombo'], ['Sundanese', 'Sundanese'], ['Syloti_Nagri', 'Syloti_Nagri'], ['Syriac', 'Syriac'], ['Tagbanwa', 'Tagbanwa'], ['Takri', 'Takri'], ['Tai_Le', 'Tai_Le'], ['New_Tai_Lue', 'New_Tai_Lue'], ['Tamil', 'Tamil'], ['Tangut', 'Tangut'], ['Tai_Viet', 'Tai_Viet'], ['Telugu', 'Telugu'], ['Tifinagh', 'Tifinagh'], ['Tagalog', 'Tagalog'], ['Thaana', 'Thaana'], ['Tibetan', 'Tibetan'], ['Tirhuta', 'Tirhuta'], ['Ugaritic', 'Ugaritic'], ['Vai', 'Vai'], ['Warang_Citi', 'Warang_Citi'], ['Wancho', 'Wancho'], ['Old_Persian', 'Old_Persian'], ['Cuneiform', 'Cuneiform'], ['Yezidi', 'Yezidi'], ['Yi', 'Yi'], ['Zanabazar_Square', 'Zanabazar_Square'], ['Inherited', 'Inherited'], ['Common', 'Common'], ['Unknown', 'Unknown']])]]);

/***/ }),
/* 585 */
/***/ (function(module, exports) {

module.exports = new Map([[0x4B, 0x212A], [0x53, 0x17F], [0x6B, 0x212A], [0x73, 0x17F], [0xB5, 0x39C], [0xC5, 0x212B], [0xDF, 0x1E9E], [0xE5, 0x212B], [0x17F, 0x53], [0x1C4, 0x1C5], [0x1C5, 0x1C4], [0x1C7, 0x1C8], [0x1C8, 0x1C7], [0x1CA, 0x1CB], [0x1CB, 0x1CA], [0x1F1, 0x1F2], [0x1F2, 0x1F1], [0x345, 0x1FBE], [0x392, 0x3D0], [0x395, 0x3F5], [0x398, 0x3F4], [0x399, 0x1FBE], [0x39A, 0x3F0], [0x39C, 0xB5], [0x3A0, 0x3D6], [0x3A1, 0x3F1], [0x3A3, 0x3C2], [0x3A6, 0x3D5], [0x3A9, 0x2126], [0x3B8, 0x3F4], [0x3C2, 0x3A3], [0x3C9, 0x2126], [0x3D0, 0x392], [0x3D1, 0x3F4], [0x3D5, 0x3A6], [0x3D6, 0x3A0], [0x3F0, 0x39A], [0x3F1, 0x3A1], [0x3F4, [0x398, 0x3D1, 0x3B8]], [0x3F5, 0x395], [0x412, 0x1C80], [0x414, 0x1C81], [0x41E, 0x1C82], [0x421, 0x1C83], [0x422, 0x1C85], [0x42A, 0x1C86], [0x462, 0x1C87], [0x1C80, 0x412], [0x1C81, 0x414], [0x1C82, 0x41E], [0x1C83, 0x421], [0x1C84, 0x1C85], [0x1C85, [0x422, 0x1C84]], [0x1C86, 0x42A], [0x1C87, 0x462], [0x1C88, 0xA64A], [0x1E60, 0x1E9B], [0x1E9B, 0x1E60], [0x1E9E, 0xDF], [0x1F80, 0x1F88], [0x1F81, 0x1F89], [0x1F82, 0x1F8A], [0x1F83, 0x1F8B], [0x1F84, 0x1F8C], [0x1F85, 0x1F8D], [0x1F86, 0x1F8E], [0x1F87, 0x1F8F], [0x1F88, 0x1F80], [0x1F89, 0x1F81], [0x1F8A, 0x1F82], [0x1F8B, 0x1F83], [0x1F8C, 0x1F84], [0x1F8D, 0x1F85], [0x1F8E, 0x1F86], [0x1F8F, 0x1F87], [0x1F90, 0x1F98], [0x1F91, 0x1F99], [0x1F92, 0x1F9A], [0x1F93, 0x1F9B], [0x1F94, 0x1F9C], [0x1F95, 0x1F9D], [0x1F96, 0x1F9E], [0x1F97, 0x1F9F], [0x1F98, 0x1F90], [0x1F99, 0x1F91], [0x1F9A, 0x1F92], [0x1F9B, 0x1F93], [0x1F9C, 0x1F94], [0x1F9D, 0x1F95], [0x1F9E, 0x1F96], [0x1F9F, 0x1F97], [0x1FA0, 0x1FA8], [0x1FA1, 0x1FA9], [0x1FA2, 0x1FAA], [0x1FA3, 0x1FAB], [0x1FA4, 0x1FAC], [0x1FA5, 0x1FAD], [0x1FA6, 0x1FAE], [0x1FA7, 0x1FAF], [0x1FA8, 0x1FA0], [0x1FA9, 0x1FA1], [0x1FAA, 0x1FA2], [0x1FAB, 0x1FA3], [0x1FAC, 0x1FA4], [0x1FAD, 0x1FA5], [0x1FAE, 0x1FA6], [0x1FAF, 0x1FA7], [0x1FB3, 0x1FBC], [0x1FBC, 0x1FB3], [0x1FBE, [0x345, 0x399]], [0x1FC3, 0x1FCC], [0x1FCC, 0x1FC3], [0x1FF3, 0x1FFC], [0x1FFC, 0x1FF3], [0x2126, [0x3A9, 0x3C9]], [0x212A, 0x4B], [0x212B, [0xC5, 0xE5]], [0xA64A, 0x1C88], [0x10400, 0x10428], [0x10401, 0x10429], [0x10402, 0x1042A], [0x10403, 0x1042B], [0x10404, 0x1042C], [0x10405, 0x1042D], [0x10406, 0x1042E], [0x10407, 0x1042F], [0x10408, 0x10430], [0x10409, 0x10431], [0x1040A, 0x10432], [0x1040B, 0x10433], [0x1040C, 0x10434], [0x1040D, 0x10435], [0x1040E, 0x10436], [0x1040F, 0x10437], [0x10410, 0x10438], [0x10411, 0x10439], [0x10412, 0x1043A], [0x10413, 0x1043B], [0x10414, 0x1043C], [0x10415, 0x1043D], [0x10416, 0x1043E], [0x10417, 0x1043F], [0x10418, 0x10440], [0x10419, 0x10441], [0x1041A, 0x10442], [0x1041B, 0x10443], [0x1041C, 0x10444], [0x1041D, 0x10445], [0x1041E, 0x10446], [0x1041F, 0x10447], [0x10420, 0x10448], [0x10421, 0x10449], [0x10422, 0x1044A], [0x10423, 0x1044B], [0x10424, 0x1044C], [0x10425, 0x1044D], [0x10426, 0x1044E], [0x10427, 0x1044F], [0x10428, 0x10400], [0x10429, 0x10401], [0x1042A, 0x10402], [0x1042B, 0x10403], [0x1042C, 0x10404], [0x1042D, 0x10405], [0x1042E, 0x10406], [0x1042F, 0x10407], [0x10430, 0x10408], [0x10431, 0x10409], [0x10432, 0x1040A], [0x10433, 0x1040B], [0x10434, 0x1040C], [0x10435, 0x1040D], [0x10436, 0x1040E], [0x10437, 0x1040F], [0x10438, 0x10410], [0x10439, 0x10411], [0x1043A, 0x10412], [0x1043B, 0x10413], [0x1043C, 0x10414], [0x1043D, 0x10415], [0x1043E, 0x10416], [0x1043F, 0x10417], [0x10440, 0x10418], [0x10441, 0x10419], [0x10442, 0x1041A], [0x10443, 0x1041B], [0x10444, 0x1041C], [0x10445, 0x1041D], [0x10446, 0x1041E], [0x10447, 0x1041F], [0x10448, 0x10420], [0x10449, 0x10421], [0x1044A, 0x10422], [0x1044B, 0x10423], [0x1044C, 0x10424], [0x1044D, 0x10425], [0x1044E, 0x10426], [0x1044F, 0x10427], [0x104B0, 0x104D8], [0x104B1, 0x104D9], [0x104B2, 0x104DA], [0x104B3, 0x104DB], [0x104B4, 0x104DC], [0x104B5, 0x104DD], [0x104B6, 0x104DE], [0x104B7, 0x104DF], [0x104B8, 0x104E0], [0x104B9, 0x104E1], [0x104BA, 0x104E2], [0x104BB, 0x104E3], [0x104BC, 0x104E4], [0x104BD, 0x104E5], [0x104BE, 0x104E6], [0x104BF, 0x104E7], [0x104C0, 0x104E8], [0x104C1, 0x104E9], [0x104C2, 0x104EA], [0x104C3, 0x104EB], [0x104C4, 0x104EC], [0x104C5, 0x104ED], [0x104C6, 0x104EE], [0x104C7, 0x104EF], [0x104C8, 0x104F0], [0x104C9, 0x104F1], [0x104CA, 0x104F2], [0x104CB, 0x104F3], [0x104CC, 0x104F4], [0x104CD, 0x104F5], [0x104CE, 0x104F6], [0x104CF, 0x104F7], [0x104D0, 0x104F8], [0x104D1, 0x104F9], [0x104D2, 0x104FA], [0x104D3, 0x104FB], [0x104D8, 0x104B0], [0x104D9, 0x104B1], [0x104DA, 0x104B2], [0x104DB, 0x104B3], [0x104DC, 0x104B4], [0x104DD, 0x104B5], [0x104DE, 0x104B6], [0x104DF, 0x104B7], [0x104E0, 0x104B8], [0x104E1, 0x104B9], [0x104E2, 0x104BA], [0x104E3, 0x104BB], [0x104E4, 0x104BC], [0x104E5, 0x104BD], [0x104E6, 0x104BE], [0x104E7, 0x104BF], [0x104E8, 0x104C0], [0x104E9, 0x104C1], [0x104EA, 0x104C2], [0x104EB, 0x104C3], [0x104EC, 0x104C4], [0x104ED, 0x104C5], [0x104EE, 0x104C6], [0x104EF, 0x104C7], [0x104F0, 0x104C8], [0x104F1, 0x104C9], [0x104F2, 0x104CA], [0x104F3, 0x104CB], [0x104F4, 0x104CC], [0x104F5, 0x104CD], [0x104F6, 0x104CE], [0x104F7, 0x104CF], [0x104F8, 0x104D0], [0x104F9, 0x104D1], [0x104FA, 0x104D2], [0x104FB, 0x104D3], [0x10C80, 0x10CC0], [0x10C81, 0x10CC1], [0x10C82, 0x10CC2], [0x10C83, 0x10CC3], [0x10C84, 0x10CC4], [0x10C85, 0x10CC5], [0x10C86, 0x10CC6], [0x10C87, 0x10CC7], [0x10C88, 0x10CC8], [0x10C89, 0x10CC9], [0x10C8A, 0x10CCA], [0x10C8B, 0x10CCB], [0x10C8C, 0x10CCC], [0x10C8D, 0x10CCD], [0x10C8E, 0x10CCE], [0x10C8F, 0x10CCF], [0x10C90, 0x10CD0], [0x10C91, 0x10CD1], [0x10C92, 0x10CD2], [0x10C93, 0x10CD3], [0x10C94, 0x10CD4], [0x10C95, 0x10CD5], [0x10C96, 0x10CD6], [0x10C97, 0x10CD7], [0x10C98, 0x10CD8], [0x10C99, 0x10CD9], [0x10C9A, 0x10CDA], [0x10C9B, 0x10CDB], [0x10C9C, 0x10CDC], [0x10C9D, 0x10CDD], [0x10C9E, 0x10CDE], [0x10C9F, 0x10CDF], [0x10CA0, 0x10CE0], [0x10CA1, 0x10CE1], [0x10CA2, 0x10CE2], [0x10CA3, 0x10CE3], [0x10CA4, 0x10CE4], [0x10CA5, 0x10CE5], [0x10CA6, 0x10CE6], [0x10CA7, 0x10CE7], [0x10CA8, 0x10CE8], [0x10CA9, 0x10CE9], [0x10CAA, 0x10CEA], [0x10CAB, 0x10CEB], [0x10CAC, 0x10CEC], [0x10CAD, 0x10CED], [0x10CAE, 0x10CEE], [0x10CAF, 0x10CEF], [0x10CB0, 0x10CF0], [0x10CB1, 0x10CF1], [0x10CB2, 0x10CF2], [0x10CC0, 0x10C80], [0x10CC1, 0x10C81], [0x10CC2, 0x10C82], [0x10CC3, 0x10C83], [0x10CC4, 0x10C84], [0x10CC5, 0x10C85], [0x10CC6, 0x10C86], [0x10CC7, 0x10C87], [0x10CC8, 0x10C88], [0x10CC9, 0x10C89], [0x10CCA, 0x10C8A], [0x10CCB, 0x10C8B], [0x10CCC, 0x10C8C], [0x10CCD, 0x10C8D], [0x10CCE, 0x10C8E], [0x10CCF, 0x10C8F], [0x10CD0, 0x10C90], [0x10CD1, 0x10C91], [0x10CD2, 0x10C92], [0x10CD3, 0x10C93], [0x10CD4, 0x10C94], [0x10CD5, 0x10C95], [0x10CD6, 0x10C96], [0x10CD7, 0x10C97], [0x10CD8, 0x10C98], [0x10CD9, 0x10C99], [0x10CDA, 0x10C9A], [0x10CDB, 0x10C9B], [0x10CDC, 0x10C9C], [0x10CDD, 0x10C9D], [0x10CDE, 0x10C9E], [0x10CDF, 0x10C9F], [0x10CE0, 0x10CA0], [0x10CE1, 0x10CA1], [0x10CE2, 0x10CA2], [0x10CE3, 0x10CA3], [0x10CE4, 0x10CA4], [0x10CE5, 0x10CA5], [0x10CE6, 0x10CA6], [0x10CE7, 0x10CA7], [0x10CE8, 0x10CA8], [0x10CE9, 0x10CA9], [0x10CEA, 0x10CAA], [0x10CEB, 0x10CAB], [0x10CEC, 0x10CAC], [0x10CED, 0x10CAD], [0x10CEE, 0x10CAE], [0x10CEF, 0x10CAF], [0x10CF0, 0x10CB0], [0x10CF1, 0x10CB1], [0x10CF2, 0x10CB2], [0x118A0, 0x118C0], [0x118A1, 0x118C1], [0x118A2, 0x118C2], [0x118A3, 0x118C3], [0x118A4, 0x118C4], [0x118A5, 0x118C5], [0x118A6, 0x118C6], [0x118A7, 0x118C7], [0x118A8, 0x118C8], [0x118A9, 0x118C9], [0x118AA, 0x118CA], [0x118AB, 0x118CB], [0x118AC, 0x118CC], [0x118AD, 0x118CD], [0x118AE, 0x118CE], [0x118AF, 0x118CF], [0x118B0, 0x118D0], [0x118B1, 0x118D1], [0x118B2, 0x118D2], [0x118B3, 0x118D3], [0x118B4, 0x118D4], [0x118B5, 0x118D5], [0x118B6, 0x118D6], [0x118B7, 0x118D7], [0x118B8, 0x118D8], [0x118B9, 0x118D9], [0x118BA, 0x118DA], [0x118BB, 0x118DB], [0x118BC, 0x118DC], [0x118BD, 0x118DD], [0x118BE, 0x118DE], [0x118BF, 0x118DF], [0x118C0, 0x118A0], [0x118C1, 0x118A1], [0x118C2, 0x118A2], [0x118C3, 0x118A3], [0x118C4, 0x118A4], [0x118C5, 0x118A5], [0x118C6, 0x118A6], [0x118C7, 0x118A7], [0x118C8, 0x118A8], [0x118C9, 0x118A9], [0x118CA, 0x118AA], [0x118CB, 0x118AB], [0x118CC, 0x118AC], [0x118CD, 0x118AD], [0x118CE, 0x118AE], [0x118CF, 0x118AF], [0x118D0, 0x118B0], [0x118D1, 0x118B1], [0x118D2, 0x118B2], [0x118D3, 0x118B3], [0x118D4, 0x118B4], [0x118D5, 0x118B5], [0x118D6, 0x118B6], [0x118D7, 0x118B7], [0x118D8, 0x118B8], [0x118D9, 0x118B9], [0x118DA, 0x118BA], [0x118DB, 0x118BB], [0x118DC, 0x118BC], [0x118DD, 0x118BD], [0x118DE, 0x118BE], [0x118DF, 0x118BF], [0x16E40, 0x16E60], [0x16E41, 0x16E61], [0x16E42, 0x16E62], [0x16E43, 0x16E63], [0x16E44, 0x16E64], [0x16E45, 0x16E65], [0x16E46, 0x16E66], [0x16E47, 0x16E67], [0x16E48, 0x16E68], [0x16E49, 0x16E69], [0x16E4A, 0x16E6A], [0x16E4B, 0x16E6B], [0x16E4C, 0x16E6C], [0x16E4D, 0x16E6D], [0x16E4E, 0x16E6E], [0x16E4F, 0x16E6F], [0x16E50, 0x16E70], [0x16E51, 0x16E71], [0x16E52, 0x16E72], [0x16E53, 0x16E73], [0x16E54, 0x16E74], [0x16E55, 0x16E75], [0x16E56, 0x16E76], [0x16E57, 0x16E77], [0x16E58, 0x16E78], [0x16E59, 0x16E79], [0x16E5A, 0x16E7A], [0x16E5B, 0x16E7B], [0x16E5C, 0x16E7C], [0x16E5D, 0x16E7D], [0x16E5E, 0x16E7E], [0x16E5F, 0x16E7F], [0x16E60, 0x16E40], [0x16E61, 0x16E41], [0x16E62, 0x16E42], [0x16E63, 0x16E43], [0x16E64, 0x16E44], [0x16E65, 0x16E45], [0x16E66, 0x16E46], [0x16E67, 0x16E47], [0x16E68, 0x16E48], [0x16E69, 0x16E49], [0x16E6A, 0x16E4A], [0x16E6B, 0x16E4B], [0x16E6C, 0x16E4C], [0x16E6D, 0x16E4D], [0x16E6E, 0x16E4E], [0x16E6F, 0x16E4F], [0x16E70, 0x16E50], [0x16E71, 0x16E51], [0x16E72, 0x16E52], [0x16E73, 0x16E53], [0x16E74, 0x16E54], [0x16E75, 0x16E55], [0x16E76, 0x16E56], [0x16E77, 0x16E57], [0x16E78, 0x16E58], [0x16E79, 0x16E59], [0x16E7A, 0x16E5A], [0x16E7B, 0x16E5B], [0x16E7C, 0x16E5C], [0x16E7D, 0x16E5D], [0x16E7E, 0x16E5E], [0x16E7F, 0x16E5F], [0x1E900, 0x1E922], [0x1E901, 0x1E923], [0x1E902, 0x1E924], [0x1E903, 0x1E925], [0x1E904, 0x1E926], [0x1E905, 0x1E927], [0x1E906, 0x1E928], [0x1E907, 0x1E929], [0x1E908, 0x1E92A], [0x1E909, 0x1E92B], [0x1E90A, 0x1E92C], [0x1E90B, 0x1E92D], [0x1E90C, 0x1E92E], [0x1E90D, 0x1E92F], [0x1E90E, 0x1E930], [0x1E90F, 0x1E931], [0x1E910, 0x1E932], [0x1E911, 0x1E933], [0x1E912, 0x1E934], [0x1E913, 0x1E935], [0x1E914, 0x1E936], [0x1E915, 0x1E937], [0x1E916, 0x1E938], [0x1E917, 0x1E939], [0x1E918, 0x1E93A], [0x1E919, 0x1E93B], [0x1E91A, 0x1E93C], [0x1E91B, 0x1E93D], [0x1E91C, 0x1E93E], [0x1E91D, 0x1E93F], [0x1E91E, 0x1E940], [0x1E91F, 0x1E941], [0x1E920, 0x1E942], [0x1E921, 0x1E943], [0x1E922, 0x1E900], [0x1E923, 0x1E901], [0x1E924, 0x1E902], [0x1E925, 0x1E903], [0x1E926, 0x1E904], [0x1E927, 0x1E905], [0x1E928, 0x1E906], [0x1E929, 0x1E907], [0x1E92A, 0x1E908], [0x1E92B, 0x1E909], [0x1E92C, 0x1E90A], [0x1E92D, 0x1E90B], [0x1E92E, 0x1E90C], [0x1E92F, 0x1E90D], [0x1E930, 0x1E90E], [0x1E931, 0x1E90F], [0x1E932, 0x1E910], [0x1E933, 0x1E911], [0x1E934, 0x1E912], [0x1E935, 0x1E913], [0x1E936, 0x1E914], [0x1E937, 0x1E915], [0x1E938, 0x1E916], [0x1E939, 0x1E917], [0x1E93A, 0x1E918], [0x1E93B, 0x1E919], [0x1E93C, 0x1E91A], [0x1E93D, 0x1E91B], [0x1E93E, 0x1E91C], [0x1E93F, 0x1E91D], [0x1E940, 0x1E91E], [0x1E941, 0x1E91F], [0x1E942, 0x1E920], [0x1E943, 0x1E921]]);

/***/ }),
/* 586 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Generated using `npm run build`. Do not edit.


var regenerate = __webpack_require__(0);

exports.REGULAR = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0xFFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0xFFFF)], ['w', regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0xFFFF)]]);
exports.UNICODE = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF)], ['w', regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)]]);
exports.UNICODE_IGNORE_CASE = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF)], ['w', regenerate(0x5F, 0x17F, 0x212A).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x17E).addRange(0x180, 0x2129).addRange(0x212B, 0x10FFFF)]]);

/***/ }),
/* 587 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Binary_Property/ASCII.js": 588,
	"./Binary_Property/ASCII_Hex_Digit.js": 589,
	"./Binary_Property/Alphabetic.js": 590,
	"./Binary_Property/Any.js": 591,
	"./Binary_Property/Assigned.js": 592,
	"./Binary_Property/Bidi_Control.js": 593,
	"./Binary_Property/Bidi_Mirrored.js": 594,
	"./Binary_Property/Case_Ignorable.js": 595,
	"./Binary_Property/Cased.js": 596,
	"./Binary_Property/Changes_When_Casefolded.js": 597,
	"./Binary_Property/Changes_When_Casemapped.js": 598,
	"./Binary_Property/Changes_When_Lowercased.js": 599,
	"./Binary_Property/Changes_When_NFKC_Casefolded.js": 600,
	"./Binary_Property/Changes_When_Titlecased.js": 601,
	"./Binary_Property/Changes_When_Uppercased.js": 602,
	"./Binary_Property/Dash.js": 603,
	"./Binary_Property/Default_Ignorable_Code_Point.js": 604,
	"./Binary_Property/Deprecated.js": 605,
	"./Binary_Property/Diacritic.js": 606,
	"./Binary_Property/Emoji.js": 607,
	"./Binary_Property/Emoji_Component.js": 608,
	"./Binary_Property/Emoji_Modifier.js": 609,
	"./Binary_Property/Emoji_Modifier_Base.js": 610,
	"./Binary_Property/Emoji_Presentation.js": 611,
	"./Binary_Property/Extended_Pictographic.js": 612,
	"./Binary_Property/Extender.js": 613,
	"./Binary_Property/Grapheme_Base.js": 614,
	"./Binary_Property/Grapheme_Extend.js": 615,
	"./Binary_Property/Hex_Digit.js": 616,
	"./Binary_Property/IDS_Binary_Operator.js": 617,
	"./Binary_Property/IDS_Trinary_Operator.js": 618,
	"./Binary_Property/ID_Continue.js": 619,
	"./Binary_Property/ID_Start.js": 620,
	"./Binary_Property/Ideographic.js": 621,
	"./Binary_Property/Join_Control.js": 622,
	"./Binary_Property/Logical_Order_Exception.js": 623,
	"./Binary_Property/Lowercase.js": 624,
	"./Binary_Property/Math.js": 625,
	"./Binary_Property/Noncharacter_Code_Point.js": 626,
	"./Binary_Property/Pattern_Syntax.js": 627,
	"./Binary_Property/Pattern_White_Space.js": 628,
	"./Binary_Property/Quotation_Mark.js": 629,
	"./Binary_Property/Radical.js": 630,
	"./Binary_Property/Regional_Indicator.js": 631,
	"./Binary_Property/Sentence_Terminal.js": 632,
	"./Binary_Property/Soft_Dotted.js": 633,
	"./Binary_Property/Terminal_Punctuation.js": 634,
	"./Binary_Property/Unified_Ideograph.js": 635,
	"./Binary_Property/Uppercase.js": 636,
	"./Binary_Property/Variation_Selector.js": 637,
	"./Binary_Property/White_Space.js": 638,
	"./Binary_Property/XID_Continue.js": 639,
	"./Binary_Property/XID_Start.js": 640,
	"./General_Category/Cased_Letter.js": 641,
	"./General_Category/Close_Punctuation.js": 642,
	"./General_Category/Connector_Punctuation.js": 643,
	"./General_Category/Control.js": 644,
	"./General_Category/Currency_Symbol.js": 645,
	"./General_Category/Dash_Punctuation.js": 646,
	"./General_Category/Decimal_Number.js": 647,
	"./General_Category/Enclosing_Mark.js": 648,
	"./General_Category/Final_Punctuation.js": 649,
	"./General_Category/Format.js": 650,
	"./General_Category/Initial_Punctuation.js": 651,
	"./General_Category/Letter.js": 652,
	"./General_Category/Letter_Number.js": 653,
	"./General_Category/Line_Separator.js": 654,
	"./General_Category/Lowercase_Letter.js": 655,
	"./General_Category/Mark.js": 656,
	"./General_Category/Math_Symbol.js": 657,
	"./General_Category/Modifier_Letter.js": 658,
	"./General_Category/Modifier_Symbol.js": 659,
	"./General_Category/Nonspacing_Mark.js": 660,
	"./General_Category/Number.js": 661,
	"./General_Category/Open_Punctuation.js": 662,
	"./General_Category/Other.js": 663,
	"./General_Category/Other_Letter.js": 664,
	"./General_Category/Other_Number.js": 665,
	"./General_Category/Other_Punctuation.js": 666,
	"./General_Category/Other_Symbol.js": 667,
	"./General_Category/Paragraph_Separator.js": 668,
	"./General_Category/Private_Use.js": 669,
	"./General_Category/Punctuation.js": 670,
	"./General_Category/Separator.js": 671,
	"./General_Category/Space_Separator.js": 672,
	"./General_Category/Spacing_Mark.js": 673,
	"./General_Category/Surrogate.js": 674,
	"./General_Category/Symbol.js": 675,
	"./General_Category/Titlecase_Letter.js": 676,
	"./General_Category/Unassigned.js": 677,
	"./General_Category/Uppercase_Letter.js": 678,
	"./Script/Adlam.js": 679,
	"./Script/Ahom.js": 680,
	"./Script/Anatolian_Hieroglyphs.js": 681,
	"./Script/Arabic.js": 682,
	"./Script/Armenian.js": 683,
	"./Script/Avestan.js": 684,
	"./Script/Balinese.js": 685,
	"./Script/Bamum.js": 686,
	"./Script/Bassa_Vah.js": 687,
	"./Script/Batak.js": 688,
	"./Script/Bengali.js": 689,
	"./Script/Bhaiksuki.js": 690,
	"./Script/Bopomofo.js": 691,
	"./Script/Brahmi.js": 692,
	"./Script/Braille.js": 693,
	"./Script/Buginese.js": 694,
	"./Script/Buhid.js": 695,
	"./Script/Canadian_Aboriginal.js": 696,
	"./Script/Carian.js": 697,
	"./Script/Caucasian_Albanian.js": 698,
	"./Script/Chakma.js": 699,
	"./Script/Cham.js": 700,
	"./Script/Cherokee.js": 701,
	"./Script/Chorasmian.js": 702,
	"./Script/Common.js": 703,
	"./Script/Coptic.js": 704,
	"./Script/Cuneiform.js": 705,
	"./Script/Cypriot.js": 706,
	"./Script/Cyrillic.js": 707,
	"./Script/Deseret.js": 708,
	"./Script/Devanagari.js": 709,
	"./Script/Dives_Akuru.js": 710,
	"./Script/Dogra.js": 711,
	"./Script/Duployan.js": 712,
	"./Script/Egyptian_Hieroglyphs.js": 713,
	"./Script/Elbasan.js": 714,
	"./Script/Elymaic.js": 715,
	"./Script/Ethiopic.js": 716,
	"./Script/Georgian.js": 717,
	"./Script/Glagolitic.js": 718,
	"./Script/Gothic.js": 719,
	"./Script/Grantha.js": 720,
	"./Script/Greek.js": 721,
	"./Script/Gujarati.js": 722,
	"./Script/Gunjala_Gondi.js": 723,
	"./Script/Gurmukhi.js": 724,
	"./Script/Han.js": 725,
	"./Script/Hangul.js": 726,
	"./Script/Hanifi_Rohingya.js": 727,
	"./Script/Hanunoo.js": 728,
	"./Script/Hatran.js": 729,
	"./Script/Hebrew.js": 730,
	"./Script/Hiragana.js": 731,
	"./Script/Imperial_Aramaic.js": 732,
	"./Script/Inherited.js": 733,
	"./Script/Inscriptional_Pahlavi.js": 734,
	"./Script/Inscriptional_Parthian.js": 735,
	"./Script/Javanese.js": 736,
	"./Script/Kaithi.js": 737,
	"./Script/Kannada.js": 738,
	"./Script/Katakana.js": 739,
	"./Script/Kayah_Li.js": 740,
	"./Script/Kharoshthi.js": 741,
	"./Script/Khitan_Small_Script.js": 742,
	"./Script/Khmer.js": 743,
	"./Script/Khojki.js": 744,
	"./Script/Khudawadi.js": 745,
	"./Script/Lao.js": 746,
	"./Script/Latin.js": 747,
	"./Script/Lepcha.js": 748,
	"./Script/Limbu.js": 749,
	"./Script/Linear_A.js": 750,
	"./Script/Linear_B.js": 751,
	"./Script/Lisu.js": 752,
	"./Script/Lycian.js": 753,
	"./Script/Lydian.js": 754,
	"./Script/Mahajani.js": 755,
	"./Script/Makasar.js": 756,
	"./Script/Malayalam.js": 757,
	"./Script/Mandaic.js": 758,
	"./Script/Manichaean.js": 759,
	"./Script/Marchen.js": 760,
	"./Script/Masaram_Gondi.js": 761,
	"./Script/Medefaidrin.js": 762,
	"./Script/Meetei_Mayek.js": 763,
	"./Script/Mende_Kikakui.js": 764,
	"./Script/Meroitic_Cursive.js": 765,
	"./Script/Meroitic_Hieroglyphs.js": 766,
	"./Script/Miao.js": 767,
	"./Script/Modi.js": 768,
	"./Script/Mongolian.js": 769,
	"./Script/Mro.js": 770,
	"./Script/Multani.js": 771,
	"./Script/Myanmar.js": 772,
	"./Script/Nabataean.js": 773,
	"./Script/Nandinagari.js": 774,
	"./Script/New_Tai_Lue.js": 775,
	"./Script/Newa.js": 776,
	"./Script/Nko.js": 777,
	"./Script/Nushu.js": 778,
	"./Script/Nyiakeng_Puachue_Hmong.js": 779,
	"./Script/Ogham.js": 780,
	"./Script/Ol_Chiki.js": 781,
	"./Script/Old_Hungarian.js": 782,
	"./Script/Old_Italic.js": 783,
	"./Script/Old_North_Arabian.js": 784,
	"./Script/Old_Permic.js": 785,
	"./Script/Old_Persian.js": 786,
	"./Script/Old_Sogdian.js": 787,
	"./Script/Old_South_Arabian.js": 788,
	"./Script/Old_Turkic.js": 789,
	"./Script/Oriya.js": 790,
	"./Script/Osage.js": 791,
	"./Script/Osmanya.js": 792,
	"./Script/Pahawh_Hmong.js": 793,
	"./Script/Palmyrene.js": 794,
	"./Script/Pau_Cin_Hau.js": 795,
	"./Script/Phags_Pa.js": 796,
	"./Script/Phoenician.js": 797,
	"./Script/Psalter_Pahlavi.js": 798,
	"./Script/Rejang.js": 799,
	"./Script/Runic.js": 800,
	"./Script/Samaritan.js": 801,
	"./Script/Saurashtra.js": 802,
	"./Script/Sharada.js": 803,
	"./Script/Shavian.js": 804,
	"./Script/Siddham.js": 805,
	"./Script/SignWriting.js": 806,
	"./Script/Sinhala.js": 807,
	"./Script/Sogdian.js": 808,
	"./Script/Sora_Sompeng.js": 809,
	"./Script/Soyombo.js": 810,
	"./Script/Sundanese.js": 811,
	"./Script/Syloti_Nagri.js": 812,
	"./Script/Syriac.js": 813,
	"./Script/Tagalog.js": 814,
	"./Script/Tagbanwa.js": 815,
	"./Script/Tai_Le.js": 816,
	"./Script/Tai_Tham.js": 817,
	"./Script/Tai_Viet.js": 818,
	"./Script/Takri.js": 819,
	"./Script/Tamil.js": 820,
	"./Script/Tangut.js": 821,
	"./Script/Telugu.js": 822,
	"./Script/Thaana.js": 823,
	"./Script/Thai.js": 824,
	"./Script/Tibetan.js": 825,
	"./Script/Tifinagh.js": 826,
	"./Script/Tirhuta.js": 827,
	"./Script/Ugaritic.js": 828,
	"./Script/Vai.js": 829,
	"./Script/Wancho.js": 830,
	"./Script/Warang_Citi.js": 831,
	"./Script/Yezidi.js": 832,
	"./Script/Yi.js": 833,
	"./Script/Zanabazar_Square.js": 834,
	"./Script_Extensions/Adlam.js": 835,
	"./Script_Extensions/Ahom.js": 836,
	"./Script_Extensions/Anatolian_Hieroglyphs.js": 837,
	"./Script_Extensions/Arabic.js": 838,
	"./Script_Extensions/Armenian.js": 839,
	"./Script_Extensions/Avestan.js": 840,
	"./Script_Extensions/Balinese.js": 841,
	"./Script_Extensions/Bamum.js": 842,
	"./Script_Extensions/Bassa_Vah.js": 843,
	"./Script_Extensions/Batak.js": 844,
	"./Script_Extensions/Bengali.js": 845,
	"./Script_Extensions/Bhaiksuki.js": 846,
	"./Script_Extensions/Bopomofo.js": 847,
	"./Script_Extensions/Brahmi.js": 848,
	"./Script_Extensions/Braille.js": 849,
	"./Script_Extensions/Buginese.js": 850,
	"./Script_Extensions/Buhid.js": 851,
	"./Script_Extensions/Canadian_Aboriginal.js": 852,
	"./Script_Extensions/Carian.js": 853,
	"./Script_Extensions/Caucasian_Albanian.js": 854,
	"./Script_Extensions/Chakma.js": 855,
	"./Script_Extensions/Cham.js": 856,
	"./Script_Extensions/Cherokee.js": 857,
	"./Script_Extensions/Chorasmian.js": 858,
	"./Script_Extensions/Common.js": 859,
	"./Script_Extensions/Coptic.js": 860,
	"./Script_Extensions/Cuneiform.js": 861,
	"./Script_Extensions/Cypriot.js": 862,
	"./Script_Extensions/Cyrillic.js": 863,
	"./Script_Extensions/Deseret.js": 864,
	"./Script_Extensions/Devanagari.js": 865,
	"./Script_Extensions/Dives_Akuru.js": 866,
	"./Script_Extensions/Dogra.js": 867,
	"./Script_Extensions/Duployan.js": 868,
	"./Script_Extensions/Egyptian_Hieroglyphs.js": 869,
	"./Script_Extensions/Elbasan.js": 870,
	"./Script_Extensions/Elymaic.js": 871,
	"./Script_Extensions/Ethiopic.js": 872,
	"./Script_Extensions/Georgian.js": 873,
	"./Script_Extensions/Glagolitic.js": 874,
	"./Script_Extensions/Gothic.js": 875,
	"./Script_Extensions/Grantha.js": 876,
	"./Script_Extensions/Greek.js": 877,
	"./Script_Extensions/Gujarati.js": 878,
	"./Script_Extensions/Gunjala_Gondi.js": 879,
	"./Script_Extensions/Gurmukhi.js": 880,
	"./Script_Extensions/Han.js": 881,
	"./Script_Extensions/Hangul.js": 882,
	"./Script_Extensions/Hanifi_Rohingya.js": 883,
	"./Script_Extensions/Hanunoo.js": 884,
	"./Script_Extensions/Hatran.js": 885,
	"./Script_Extensions/Hebrew.js": 886,
	"./Script_Extensions/Hiragana.js": 887,
	"./Script_Extensions/Imperial_Aramaic.js": 888,
	"./Script_Extensions/Inherited.js": 889,
	"./Script_Extensions/Inscriptional_Pahlavi.js": 890,
	"./Script_Extensions/Inscriptional_Parthian.js": 891,
	"./Script_Extensions/Javanese.js": 892,
	"./Script_Extensions/Kaithi.js": 893,
	"./Script_Extensions/Kannada.js": 894,
	"./Script_Extensions/Katakana.js": 895,
	"./Script_Extensions/Kayah_Li.js": 896,
	"./Script_Extensions/Kharoshthi.js": 897,
	"./Script_Extensions/Khitan_Small_Script.js": 898,
	"./Script_Extensions/Khmer.js": 899,
	"./Script_Extensions/Khojki.js": 900,
	"./Script_Extensions/Khudawadi.js": 901,
	"./Script_Extensions/Lao.js": 902,
	"./Script_Extensions/Latin.js": 903,
	"./Script_Extensions/Lepcha.js": 904,
	"./Script_Extensions/Limbu.js": 905,
	"./Script_Extensions/Linear_A.js": 906,
	"./Script_Extensions/Linear_B.js": 907,
	"./Script_Extensions/Lisu.js": 908,
	"./Script_Extensions/Lycian.js": 909,
	"./Script_Extensions/Lydian.js": 910,
	"./Script_Extensions/Mahajani.js": 911,
	"./Script_Extensions/Makasar.js": 912,
	"./Script_Extensions/Malayalam.js": 913,
	"./Script_Extensions/Mandaic.js": 914,
	"./Script_Extensions/Manichaean.js": 915,
	"./Script_Extensions/Marchen.js": 916,
	"./Script_Extensions/Masaram_Gondi.js": 917,
	"./Script_Extensions/Medefaidrin.js": 918,
	"./Script_Extensions/Meetei_Mayek.js": 919,
	"./Script_Extensions/Mende_Kikakui.js": 920,
	"./Script_Extensions/Meroitic_Cursive.js": 921,
	"./Script_Extensions/Meroitic_Hieroglyphs.js": 922,
	"./Script_Extensions/Miao.js": 923,
	"./Script_Extensions/Modi.js": 924,
	"./Script_Extensions/Mongolian.js": 925,
	"./Script_Extensions/Mro.js": 926,
	"./Script_Extensions/Multani.js": 927,
	"./Script_Extensions/Myanmar.js": 928,
	"./Script_Extensions/Nabataean.js": 929,
	"./Script_Extensions/Nandinagari.js": 930,
	"./Script_Extensions/New_Tai_Lue.js": 931,
	"./Script_Extensions/Newa.js": 932,
	"./Script_Extensions/Nko.js": 933,
	"./Script_Extensions/Nushu.js": 934,
	"./Script_Extensions/Nyiakeng_Puachue_Hmong.js": 935,
	"./Script_Extensions/Ogham.js": 936,
	"./Script_Extensions/Ol_Chiki.js": 937,
	"./Script_Extensions/Old_Hungarian.js": 938,
	"./Script_Extensions/Old_Italic.js": 939,
	"./Script_Extensions/Old_North_Arabian.js": 940,
	"./Script_Extensions/Old_Permic.js": 941,
	"./Script_Extensions/Old_Persian.js": 942,
	"./Script_Extensions/Old_Sogdian.js": 943,
	"./Script_Extensions/Old_South_Arabian.js": 944,
	"./Script_Extensions/Old_Turkic.js": 945,
	"./Script_Extensions/Oriya.js": 946,
	"./Script_Extensions/Osage.js": 947,
	"./Script_Extensions/Osmanya.js": 948,
	"./Script_Extensions/Pahawh_Hmong.js": 949,
	"./Script_Extensions/Palmyrene.js": 950,
	"./Script_Extensions/Pau_Cin_Hau.js": 951,
	"./Script_Extensions/Phags_Pa.js": 952,
	"./Script_Extensions/Phoenician.js": 953,
	"./Script_Extensions/Psalter_Pahlavi.js": 954,
	"./Script_Extensions/Rejang.js": 955,
	"./Script_Extensions/Runic.js": 956,
	"./Script_Extensions/Samaritan.js": 957,
	"./Script_Extensions/Saurashtra.js": 958,
	"./Script_Extensions/Sharada.js": 959,
	"./Script_Extensions/Shavian.js": 960,
	"./Script_Extensions/Siddham.js": 961,
	"./Script_Extensions/SignWriting.js": 962,
	"./Script_Extensions/Sinhala.js": 963,
	"./Script_Extensions/Sogdian.js": 964,
	"./Script_Extensions/Sora_Sompeng.js": 965,
	"./Script_Extensions/Soyombo.js": 966,
	"./Script_Extensions/Sundanese.js": 967,
	"./Script_Extensions/Syloti_Nagri.js": 968,
	"./Script_Extensions/Syriac.js": 969,
	"./Script_Extensions/Tagalog.js": 970,
	"./Script_Extensions/Tagbanwa.js": 971,
	"./Script_Extensions/Tai_Le.js": 972,
	"./Script_Extensions/Tai_Tham.js": 973,
	"./Script_Extensions/Tai_Viet.js": 974,
	"./Script_Extensions/Takri.js": 975,
	"./Script_Extensions/Tamil.js": 976,
	"./Script_Extensions/Tangut.js": 977,
	"./Script_Extensions/Telugu.js": 978,
	"./Script_Extensions/Thaana.js": 979,
	"./Script_Extensions/Thai.js": 980,
	"./Script_Extensions/Tibetan.js": 981,
	"./Script_Extensions/Tifinagh.js": 982,
	"./Script_Extensions/Tirhuta.js": 983,
	"./Script_Extensions/Ugaritic.js": 984,
	"./Script_Extensions/Vai.js": 985,
	"./Script_Extensions/Wancho.js": 986,
	"./Script_Extensions/Warang_Citi.js": 987,
	"./Script_Extensions/Yezidi.js": 988,
	"./Script_Extensions/Yi.js": 989,
	"./Script_Extensions/Zanabazar_Square.js": 990,
	"./index.js": 991,
	"./unicode-version.js": 992
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 587;

/***/ }),
/* 588 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x0, 0x7F);
module.exports = set;

/***/ }),
/* 589 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x30, 0x39).addRange(0x41, 0x46).addRange(0x61, 0x66);
module.exports = set;

/***/ }),
/* 590 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x2EC, 0x2EE, 0x345, 0x37F, 0x386, 0x38C, 0x559, 0x5BF, 0x5C7, 0x6FF, 0x7FA, 0x9B2, 0x9CE, 0x9D7, 0x9FC, 0xA51, 0xA5E, 0xAD0, 0xB71, 0xB9C, 0xBD0, 0xBD7, 0xCDE, 0xD4E, 0xDBD, 0xDD6, 0xE4D, 0xE84, 0xEA5, 0xEC6, 0xECD, 0xF00, 0x1038, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x17DC, 0x1AA7, 0x1CFA, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2071, 0x207F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0x2E2F, 0xA8C5, 0xA8FB, 0xA9CF, 0xAAC0, 0xAAC2, 0xFB3E, 0x10808, 0x1083C, 0x10F27, 0x11176, 0x111DA, 0x111DC, 0x11237, 0x1123E, 0x11288, 0x11350, 0x11357, 0x114C7, 0x11640, 0x11644, 0x116B8, 0x11909, 0x119E1, 0x11A9D, 0x11C40, 0x11D3A, 0x11D43, 0x11D98, 0x11FB0, 0x16FE3, 0x1BC9E, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E14E, 0x1E947, 0x1E94B, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x370, 0x374).addRange(0x376, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x5B0, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x610, 0x61A).addRange(0x620, 0x657).addRange(0x659, 0x65F).addRange(0x66E, 0x6D3).addRange(0x6D5, 0x6DC).addRange(0x6E1, 0x6E8).addRange(0x6ED, 0x6EF).addRange(0x6FA, 0x6FC).addRange(0x710, 0x73F).addRange(0x74D, 0x7B1).addRange(0x7CA, 0x7EA).addRange(0x7F4, 0x7F5).addRange(0x800, 0x817).addRange(0x81A, 0x82C).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D4, 0x8DF).addRange(0x8E3, 0x8E9).addRange(0x8F0, 0x93B).addRange(0x93D, 0x94C).addRange(0x94E, 0x950).addRange(0x955, 0x963).addRange(0x971, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0);
set.addRange(0x9B6, 0x9B9).addRange(0x9BD, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CC).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E3).addRange(0x9F0, 0x9F1).addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4C).addRange(0xA59, 0xA5C).addRange(0xA70, 0xA75).addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABD, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACC).addRange(0xAE0, 0xAE3).addRange(0xAF9, 0xAFC).addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3D, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4C).addRange(0xB56, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F);
set.addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCC).addRange(0xC00, 0xC03).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4C).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC80, 0xC83).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBD, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCC).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCF1, 0xCF2).addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD3D, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4C).addRange(0xD54, 0xD57).addRange(0xD5F, 0xD63).addRange(0xD7A, 0xD7F).addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDF2, 0xDF3).addRange(0xE01, 0xE3A).addRange(0xE40, 0xE46).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3);
set.addRange(0xEA7, 0xEB9).addRange(0xEBB, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEDC, 0xEDF).addRange(0xF40, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF81).addRange(0xF88, 0xF97).addRange(0xF99, 0xFBC).addRange(0x1000, 0x1036).addRange(0x103B, 0x103F).addRange(0x1050, 0x108F).addRange(0x109A, 0x109D).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1713).addRange(0x1720, 0x1733).addRange(0x1740, 0x1753).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773).addRange(0x1780, 0x17B3).addRange(0x17B6, 0x17C8).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1920, 0x192B);
set.addRange(0x1930, 0x1938).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x1A00, 0x1A1B).addRange(0x1A20, 0x1A5E).addRange(0x1A61, 0x1A74).addRange(0x1ABF, 0x1AC0).addRange(0x1B00, 0x1B33).addRange(0x1B35, 0x1B43).addRange(0x1B45, 0x1B4B).addRange(0x1B80, 0x1BA9).addRange(0x1BAC, 0x1BAF).addRange(0x1BBA, 0x1BE5).addRange(0x1BE7, 0x1BF1).addRange(0x1C00, 0x1C36).addRange(0x1C4D, 0x1C4F).addRange(0x1C5A, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF6).addRange(0x1D00, 0x1DBF).addRange(0x1DE7, 0x1DF4).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x2090, 0x209C).addRange(0x210A, 0x2113).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x212F, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2160, 0x2188).addRange(0x24B6, 0x24E9);
set.addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x2DE0, 0x2DFF).addRange(0x3005, 0x3007).addRange(0x3021, 0x3029).addRange(0x3031, 0x3035).addRange(0x3038, 0x303C).addRange(0x3041, 0x3096).addRange(0x309D, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA61F).addRange(0xA62A, 0xA62B).addRange(0xA640, 0xA66E).addRange(0xA674, 0xA67B).addRange(0xA67F, 0xA6EF).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA805).addRange(0xA807, 0xA827).addRange(0xA840, 0xA873).addRange(0xA880, 0xA8C3).addRange(0xA8F2, 0xA8F7).addRange(0xA8FD, 0xA8FF).addRange(0xA90A, 0xA92A).addRange(0xA930, 0xA952);
set.addRange(0xA960, 0xA97C).addRange(0xA980, 0xA9B2).addRange(0xA9B4, 0xA9BF).addRange(0xA9E0, 0xA9EF).addRange(0xA9FA, 0xA9FE).addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA60, 0xAA76).addRange(0xAA7A, 0xAABE).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEF).addRange(0xAAF2, 0xAAF5).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABEA).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1D, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFB).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D);
set.addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10140, 0x10174).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x1037A).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x103D1, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE4).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D27).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAC);
set.addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F45).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11000, 0x11045).addRange(0x11082, 0x110B8).addRange(0x110D0, 0x110E8).addRange(0x11100, 0x11132).addRange(0x11144, 0x11147).addRange(0x11150, 0x11172).addRange(0x11180, 0x111BF).addRange(0x111C1, 0x111C4).addRange(0x111CE, 0x111CF).addRange(0x11200, 0x11211).addRange(0x11213, 0x11234).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112E8).addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133D, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134C).addRange(0x1135D, 0x11363).addRange(0x11400, 0x11441).addRange(0x11443, 0x11445).addRange(0x11447, 0x1144A).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114C1).addRange(0x114C4, 0x114C5).addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115BE).addRange(0x115D8, 0x115DD).addRange(0x11600, 0x1163E).addRange(0x11680, 0x116B5).addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172A).addRange(0x11800, 0x11838).addRange(0x118A0, 0x118DF).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935);
set.addRange(0x11937, 0x11938).addRange(0x1193B, 0x1193C).addRange(0x1193F, 0x11942).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119DF).addRange(0x119E3, 0x119E4).addRange(0x11A00, 0x11A32).addRange(0x11A35, 0x11A3E).addRange(0x11A50, 0x11A97).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C3E).addRange(0x11C72, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D41).addRange(0x11D46, 0x11D47).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D96).addRange(0x11EE0, 0x11EF6).addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B40, 0x16B43).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x16FF0, 0x16FF1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E);
set.addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E100, 0x1E12C).addRange(0x1E137, 0x1E13D).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E800, 0x1E8C4).addRange(0x1E900, 0x1E943).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52);
set.addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1F130, 0x1F149).addRange(0x1F150, 0x1F169).addRange(0x1F170, 0x1F189).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 591 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x0, 0x10FFFF);
module.exports = set;

/***/ }),
/* 592 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x38C, 0x85E, 0x9B2, 0x9D7, 0xA3C, 0xA51, 0xA5E, 0xAD0, 0xB9C, 0xBD0, 0xBD7, 0xCDE, 0xDBD, 0xDCA, 0xDD6, 0xE84, 0xEA5, 0xEC6, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x1940, 0x1F59, 0x1F5B, 0x1F5D, 0x2D27, 0x2D2D, 0xFB3E, 0xFEFF, 0x101A0, 0x1056F, 0x10808, 0x1083C, 0x1093F, 0x110CD, 0x11288, 0x11350, 0x11357, 0x11909, 0x11D3A, 0x11FB0, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E2FF, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E, 0xE0001);

set.addRange(0x0, 0x377).addRange(0x37A, 0x37F).addRange(0x384, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x52F).addRange(0x531, 0x556).addRange(0x559, 0x58A).addRange(0x58D, 0x58F).addRange(0x591, 0x5C7).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F4).addRange(0x600, 0x61C).addRange(0x61E, 0x70D).addRange(0x70F, 0x74A).addRange(0x74D, 0x7B1).addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x82D).addRange(0x830, 0x83E).addRange(0x840, 0x85B).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D3, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BC, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CE).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E3).addRange(0x9E6, 0x9FE).addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA76).addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8);
set.addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABC, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE0, 0xAE3).addRange(0xAE6, 0xAF1).addRange(0xAF9, 0xAFF).addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3C, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB66, 0xB77).addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xBE6, 0xBFA).addRange(0xC00, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC66, 0xC6F).addRange(0xC77, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3);
set.addRange(0xCB5, 0xCB9).addRange(0xCBC, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2).addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4F).addRange(0xD54, 0xD63).addRange(0xD66, 0xD7F).addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF4).addRange(0xE01, 0xE3A).addRange(0xE3F, 0xE5B).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEC8, 0xECD).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF).addRange(0xF00, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF97).addRange(0xF99, 0xFBC).addRange(0xFBE, 0xFCC).addRange(0xFCE, 0xFDA).addRange(0x1000, 0x10C5).addRange(0x10D0, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5);
set.addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x135D, 0x137C).addRange(0x1380, 0x1399).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1400, 0x169C).addRange(0x16A0, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1714).addRange(0x1720, 0x1736).addRange(0x1740, 0x1753).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773).addRange(0x1780, 0x17DD).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x1800, 0x180E).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1944, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x19DE, 0x1A1B).addRange(0x1A1E, 0x1A5E).addRange(0x1A60, 0x1A7C).addRange(0x1A7F, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AA0, 0x1AAD).addRange(0x1AB0, 0x1AC0).addRange(0x1B00, 0x1B4B).addRange(0x1B50, 0x1B7C).addRange(0x1B80, 0x1BF3).addRange(0x1BFC, 0x1C37).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CC7).addRange(0x1CD0, 0x1CFA).addRange(0x1D00, 0x1DF9).addRange(0x1DFB, 0x1F15);
set.addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FC4).addRange(0x1FC6, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FDD, 0x1FEF).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFE).addRange(0x2000, 0x2064).addRange(0x2066, 0x2071).addRange(0x2074, 0x208E).addRange(0x2090, 0x209C).addRange(0x20A0, 0x20BF).addRange(0x20D0, 0x20F0).addRange(0x2100, 0x218B).addRange(0x2190, 0x2426).addRange(0x2440, 0x244A).addRange(0x2460, 0x2B73).addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CF3).addRange(0x2CF9, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D6F, 0x2D70).addRange(0x2D7F, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x2DE0, 0x2E52).addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x2FF0, 0x2FFB).addRange(0x3000, 0x303F).addRange(0x3041, 0x3096).addRange(0x3099, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x3190, 0x31E3).addRange(0x31F0, 0x321E).addRange(0x3220, 0x9FFC);
set.addRange(0xA000, 0xA48C).addRange(0xA490, 0xA4C6).addRange(0xA4D0, 0xA62B).addRange(0xA640, 0xA6F7).addRange(0xA700, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA82C).addRange(0xA830, 0xA839).addRange(0xA840, 0xA877).addRange(0xA880, 0xA8C5).addRange(0xA8CE, 0xA8D9).addRange(0xA8E0, 0xA953).addRange(0xA95F, 0xA97C).addRange(0xA980, 0xA9CD).addRange(0xA9CF, 0xA9D9).addRange(0xA9DE, 0xA9FE).addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA5C, 0xAAC2).addRange(0xAADB, 0xAAF6).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB6B).addRange(0xAB70, 0xABED).addRange(0xABF0, 0xABF9).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xD800, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1D, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBC1).addRange(0xFBD3, 0xFD3F).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFD).addRange(0xFE00, 0xFE19).addRange(0xFE20, 0xFE52).addRange(0xFE54, 0xFE66).addRange(0xFE68, 0xFE6B).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC);
set.addRange(0xFF01, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0xFFE0, 0xFFE6).addRange(0xFFE8, 0xFFEE).addRange(0xFFF9, 0xFFFD).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10100, 0x10102).addRange(0x10107, 0x10133).addRange(0x10137, 0x1018E).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FD).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x102E0, 0x102FB).addRange(0x10300, 0x10323).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x1037A).addRange(0x10380, 0x1039D).addRange(0x1039F, 0x103C3).addRange(0x103C8, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104A0, 0x104A9).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10857, 0x1089E).addRange(0x108A7, 0x108AF).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x108FB, 0x1091B).addRange(0x1091F, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BC, 0x109CF).addRange(0x109D2, 0x10A03);
set.addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A).addRange(0x10A3F, 0x10A48).addRange(0x10A50, 0x10A58).addRange(0x10A60, 0x10A9F).addRange(0x10AC0, 0x10AE6).addRange(0x10AEB, 0x10AF6).addRange(0x10B00, 0x10B35).addRange(0x10B39, 0x10B55).addRange(0x10B58, 0x10B72).addRange(0x10B78, 0x10B91).addRange(0x10B99, 0x10B9C).addRange(0x10BA9, 0x10BAF).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10CFA, 0x10D27).addRange(0x10D30, 0x10D39).addRange(0x10E60, 0x10E7E).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAD).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F27).addRange(0x10F30, 0x10F59).addRange(0x10FB0, 0x10FCB).addRange(0x10FE0, 0x10FF6).addRange(0x11000, 0x1104D).addRange(0x11052, 0x1106F).addRange(0x1107F, 0x110C1).addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9).addRange(0x11100, 0x11134).addRange(0x11136, 0x11147).addRange(0x11150, 0x11176).addRange(0x11180, 0x111DF).addRange(0x111E1, 0x111F4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1123E).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A9).addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9).addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328);
set.addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133B, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11400, 0x1145B).addRange(0x1145D, 0x11461).addRange(0x11480, 0x114C7).addRange(0x114D0, 0x114D9).addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115DD).addRange(0x11600, 0x11644).addRange(0x11650, 0x11659).addRange(0x11660, 0x1166C).addRange(0x11680, 0x116B8).addRange(0x116C0, 0x116C9).addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x1173F).addRange(0x11800, 0x1183B).addRange(0x118A0, 0x118F2).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x11946).addRange(0x11950, 0x11959).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119E4).addRange(0x11A00, 0x11A47).addRange(0x11A50, 0x11AA2).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C45).addRange(0x11C50, 0x11C6C).addRange(0x11C70, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D47).addRange(0x11D50, 0x11D59);
set.addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D98).addRange(0x11DA0, 0x11DA9).addRange(0x11EE0, 0x11EF8).addRange(0x11FC0, 0x11FF1).addRange(0x11FFF, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12470, 0x12474).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x13430, 0x13438).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16A6E, 0x16A6F).addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF5).addRange(0x16B00, 0x16B45).addRange(0x16B50, 0x16B59).addRange(0x16B5B, 0x16B61).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E9A).addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F).addRange(0x16FE0, 0x16FE4).addRange(0x16FF0, 0x16FF1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1BC9C, 0x1BCA3).addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D1E8).addRange(0x1D200, 0x1D245).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D300, 0x1D356).addRange(0x1D360, 0x1D378);
set.addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1DA8B).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E14E, 0x1E14F).addRange(0x1E2C0, 0x1E2F9).addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8D6).addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F).addRange(0x1EC71, 0x1ECB4).addRange(0x1ED01, 0x1ED3D).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B);
set.addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1EEF0, 0x1EEF1).addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093).addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F100, 0x1F1AD).addRange(0x1F1E6, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1F260, 0x1F265).addRange(0x1F300, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773).addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92).addRange(0x1FB94, 0x1FBCA).addRange(0x1FBF0, 0x1FBF9).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A).addRange(0xE0020, 0xE007F).addRange(0xE0100, 0xE01EF);
set.addRange(0xF0000, 0xFFFFD).addRange(0x100000, 0x10FFFD);
module.exports = set;

/***/ }),
/* 593 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x61C);

set.addRange(0x200E, 0x200F).addRange(0x202A, 0x202E).addRange(0x2066, 0x2069);
module.exports = set;

/***/ }),
/* 594 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3C, 0x3E, 0x5B, 0x5D, 0x7B, 0x7D, 0xAB, 0xBB, 0x2140, 0x2211, 0x2224, 0x2226, 0x2239, 0x2262, 0x2298, 0x27C0, 0x29B8, 0x29C9, 0x29E1, 0x2A24, 0x2A26, 0x2A29, 0x2ADC, 0x2ADE, 0x2AF3, 0x2AFD, 0x2BFE, 0xFF1C, 0xFF1E, 0xFF3B, 0xFF3D, 0xFF5B, 0xFF5D, 0x1D6DB, 0x1D715, 0x1D74F, 0x1D789, 0x1D7C3);

set.addRange(0x28, 0x29).addRange(0xF3A, 0xF3D).addRange(0x169B, 0x169C).addRange(0x2039, 0x203A).addRange(0x2045, 0x2046).addRange(0x207D, 0x207E).addRange(0x208D, 0x208E).addRange(0x2201, 0x2204).addRange(0x2208, 0x220D).addRange(0x2215, 0x2216).addRange(0x221A, 0x221D).addRange(0x221F, 0x2222).addRange(0x222B, 0x2233).addRange(0x223B, 0x224C).addRange(0x2252, 0x2255).addRange(0x225F, 0x2260).addRange(0x2264, 0x226B).addRange(0x226E, 0x228C).addRange(0x228F, 0x2292).addRange(0x22A2, 0x22A3).addRange(0x22A6, 0x22B8).addRange(0x22BE, 0x22BF).addRange(0x22C9, 0x22CD).addRange(0x22D0, 0x22D1).addRange(0x22D6, 0x22ED).addRange(0x22F0, 0x22FF).addRange(0x2308, 0x230B).addRange(0x2320, 0x2321).addRange(0x2329, 0x232A).addRange(0x2768, 0x2775).addRange(0x27C3, 0x27C6).addRange(0x27C8, 0x27C9).addRange(0x27CB, 0x27CD).addRange(0x27D3, 0x27D6).addRange(0x27DC, 0x27DE).addRange(0x27E2, 0x27EF).addRange(0x2983, 0x2998).addRange(0x299B, 0x29A0).addRange(0x29A2, 0x29AF).addRange(0x29C0, 0x29C5).addRange(0x29CE, 0x29D2).addRange(0x29D4, 0x29D5).addRange(0x29D8, 0x29DC).addRange(0x29E3, 0x29E5).addRange(0x29E8, 0x29E9).addRange(0x29F4, 0x29F9).addRange(0x29FC, 0x29FD).addRange(0x2A0A, 0x2A1C).addRange(0x2A1E, 0x2A21).addRange(0x2A2B, 0x2A2E).addRange(0x2A34, 0x2A35);
set.addRange(0x2A3C, 0x2A3E).addRange(0x2A57, 0x2A58).addRange(0x2A64, 0x2A65).addRange(0x2A6A, 0x2A6D).addRange(0x2A6F, 0x2A70).addRange(0x2A73, 0x2A74).addRange(0x2A79, 0x2AA3).addRange(0x2AA6, 0x2AAD).addRange(0x2AAF, 0x2AD6).addRange(0x2AE2, 0x2AE6).addRange(0x2AEC, 0x2AEE).addRange(0x2AF7, 0x2AFB).addRange(0x2E02, 0x2E05).addRange(0x2E09, 0x2E0A).addRange(0x2E0C, 0x2E0D).addRange(0x2E1C, 0x2E1D).addRange(0x2E20, 0x2E29).addRange(0x3008, 0x3011).addRange(0x3014, 0x301B).addRange(0xFE59, 0xFE5E).addRange(0xFE64, 0xFE65).addRange(0xFF08, 0xFF09).addRange(0xFF5F, 0xFF60).addRange(0xFF62, 0xFF63);
module.exports = set;

/***/ }),
/* 595 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x27, 0x2E, 0x3A, 0x5E, 0x60, 0xA8, 0xAD, 0xAF, 0xB4, 0x37A, 0x387, 0x559, 0x55F, 0x5BF, 0x5C7, 0x5F4, 0x61C, 0x640, 0x670, 0x70F, 0x711, 0x7FA, 0x7FD, 0x93A, 0x93C, 0x94D, 0x971, 0x981, 0x9BC, 0x9CD, 0x9FE, 0xA3C, 0xA51, 0xA75, 0xABC, 0xACD, 0xB01, 0xB3C, 0xB3F, 0xB4D, 0xB82, 0xBC0, 0xBCD, 0xC00, 0xC04, 0xC81, 0xCBC, 0xCBF, 0xCC6, 0xD4D, 0xD81, 0xDCA, 0xDD6, 0xE31, 0xEB1, 0xEC6, 0xF35, 0xF37, 0xF39, 0xFC6, 0x1082, 0x108D, 0x109D, 0x10FC, 0x17C6, 0x17D7, 0x17DD, 0x1843, 0x18A9, 0x1932, 0x1A1B, 0x1A56, 0x1A60, 0x1A62, 0x1A7F, 0x1AA7, 0x1B34, 0x1B3C, 0x1B42, 0x1BE6, 0x1BED, 0x1CED, 0x1CF4, 0x1D78, 0x1FBD, 0x2024, 0x2027, 0x2071, 0x207F, 0x2D6F, 0x2D7F, 0x2E2F, 0x3005, 0x303B, 0xA015, 0xA60C, 0xA67F, 0xA770, 0xA802, 0xA806, 0xA80B, 0xA82C, 0xA8FF, 0xA9B3, 0xA9CF, 0xAA43, 0xAA4C, 0xAA70, 0xAA7C, 0xAAB0, 0xAAC1, 0xAADD, 0xAAF6, 0xABE5, 0xABE8, 0xABED, 0xFB1E, 0xFE13, 0xFE52, 0xFE55, 0xFEFF, 0xFF07, 0xFF0E, 0xFF1A, 0xFF3E, 0xFF40, 0xFF70, 0xFFE3, 0x101FD, 0x102E0, 0x10A3F, 0x11001, 0x110BD, 0x110CD, 0x11173, 0x111CF, 0x11234, 0x1123E, 0x112DF, 0x11340, 0x11446, 0x1145E, 0x114BA, 0x1163D, 0x116AB, 0x116AD, 0x116B7, 0x1193E, 0x11943, 0x119E0, 0x11A47, 0x11C3F, 0x11D3A, 0x11D47, 0x11D95, 0x11D97, 0x16F4F, 0x1DA75, 0x1DA84, 0xE0001);

set.addRange(0xB7, 0xB8).addRange(0x2B0, 0x36F).addRange(0x374, 0x375).addRange(0x384, 0x385).addRange(0x483, 0x489).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x600, 0x605).addRange(0x610, 0x61A).addRange(0x64B, 0x65F).addRange(0x6D6, 0x6DD).addRange(0x6DF, 0x6E8).addRange(0x6EA, 0x6ED).addRange(0x730, 0x74A).addRange(0x7A6, 0x7B0).addRange(0x7EB, 0x7F5).addRange(0x816, 0x82D).addRange(0x859, 0x85B).addRange(0x8D3, 0x902).addRange(0x941, 0x948).addRange(0x951, 0x957).addRange(0x962, 0x963).addRange(0x9C1, 0x9C4).addRange(0x9E2, 0x9E3).addRange(0xA01, 0xA02).addRange(0xA41, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA70, 0xA71).addRange(0xA81, 0xA82).addRange(0xAC1, 0xAC5).addRange(0xAC7, 0xAC8).addRange(0xAE2, 0xAE3).addRange(0xAFA, 0xAFF).addRange(0xB41, 0xB44).addRange(0xB55, 0xB56).addRange(0xB62, 0xB63).addRange(0xC3E, 0xC40).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC62, 0xC63).addRange(0xCCC, 0xCCD).addRange(0xCE2, 0xCE3).addRange(0xD00, 0xD01).addRange(0xD3B, 0xD3C).addRange(0xD41, 0xD44).addRange(0xD62, 0xD63).addRange(0xDD2, 0xDD4).addRange(0xE34, 0xE3A);
set.addRange(0xE46, 0xE4E).addRange(0xEB4, 0xEBC).addRange(0xEC8, 0xECD).addRange(0xF18, 0xF19).addRange(0xF71, 0xF7E).addRange(0xF80, 0xF84).addRange(0xF86, 0xF87).addRange(0xF8D, 0xF97).addRange(0xF99, 0xFBC).addRange(0x102D, 0x1030).addRange(0x1032, 0x1037).addRange(0x1039, 0x103A).addRange(0x103D, 0x103E).addRange(0x1058, 0x1059).addRange(0x105E, 0x1060).addRange(0x1071, 0x1074).addRange(0x1085, 0x1086).addRange(0x135D, 0x135F).addRange(0x1712, 0x1714).addRange(0x1732, 0x1734).addRange(0x1752, 0x1753).addRange(0x1772, 0x1773).addRange(0x17B4, 0x17B5).addRange(0x17B7, 0x17BD).addRange(0x17C9, 0x17D3).addRange(0x180B, 0x180E).addRange(0x1885, 0x1886).addRange(0x1920, 0x1922).addRange(0x1927, 0x1928).addRange(0x1939, 0x193B).addRange(0x1A17, 0x1A18).addRange(0x1A58, 0x1A5E).addRange(0x1A65, 0x1A6C).addRange(0x1A73, 0x1A7C).addRange(0x1AB0, 0x1AC0).addRange(0x1B00, 0x1B03).addRange(0x1B36, 0x1B3A).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1B81).addRange(0x1BA2, 0x1BA5).addRange(0x1BA8, 0x1BA9).addRange(0x1BAB, 0x1BAD).addRange(0x1BE8, 0x1BE9).addRange(0x1BEF, 0x1BF1).addRange(0x1C2C, 0x1C33).addRange(0x1C36, 0x1C37).addRange(0x1C78, 0x1C7D).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CE0).addRange(0x1CE2, 0x1CE8).addRange(0x1CF8, 0x1CF9);
set.addRange(0x1D2C, 0x1D6A).addRange(0x1D9B, 0x1DF9).addRange(0x1DFB, 0x1DFF).addRange(0x1FBF, 0x1FC1).addRange(0x1FCD, 0x1FCF).addRange(0x1FDD, 0x1FDF).addRange(0x1FED, 0x1FEF).addRange(0x1FFD, 0x1FFE).addRange(0x200B, 0x200F).addRange(0x2018, 0x2019).addRange(0x202A, 0x202E).addRange(0x2060, 0x2064).addRange(0x2066, 0x206F).addRange(0x2090, 0x209C).addRange(0x20D0, 0x20F0).addRange(0x2C7C, 0x2C7D).addRange(0x2CEF, 0x2CF1).addRange(0x2DE0, 0x2DFF).addRange(0x302A, 0x302D).addRange(0x3031, 0x3035).addRange(0x3099, 0x309E).addRange(0x30FC, 0x30FE).addRange(0xA4F8, 0xA4FD).addRange(0xA66F, 0xA672).addRange(0xA674, 0xA67D).addRange(0xA69C, 0xA69F).addRange(0xA6F0, 0xA6F1).addRange(0xA700, 0xA721).addRange(0xA788, 0xA78A).addRange(0xA7F8, 0xA7F9).addRange(0xA825, 0xA826).addRange(0xA8C4, 0xA8C5).addRange(0xA8E0, 0xA8F1).addRange(0xA926, 0xA92D).addRange(0xA947, 0xA951).addRange(0xA980, 0xA982).addRange(0xA9B6, 0xA9B9).addRange(0xA9BC, 0xA9BD).addRange(0xA9E5, 0xA9E6).addRange(0xAA29, 0xAA2E).addRange(0xAA31, 0xAA32).addRange(0xAA35, 0xAA36).addRange(0xAAB2, 0xAAB4).addRange(0xAAB7, 0xAAB8).addRange(0xAABE, 0xAABF).addRange(0xAAEC, 0xAAED).addRange(0xAAF3, 0xAAF4).addRange(0xAB5B, 0xAB5F).addRange(0xAB69, 0xAB6B).addRange(0xFBB2, 0xFBC1).addRange(0xFE00, 0xFE0F);
set.addRange(0xFE20, 0xFE2F).addRange(0xFF9E, 0xFF9F).addRange(0xFFF9, 0xFFFB).addRange(0x10376, 0x1037A).addRange(0x10A01, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A0F).addRange(0x10A38, 0x10A3A).addRange(0x10AE5, 0x10AE6).addRange(0x10D24, 0x10D27).addRange(0x10EAB, 0x10EAC).addRange(0x10F46, 0x10F50).addRange(0x11038, 0x11046).addRange(0x1107F, 0x11081).addRange(0x110B3, 0x110B6).addRange(0x110B9, 0x110BA).addRange(0x11100, 0x11102).addRange(0x11127, 0x1112B).addRange(0x1112D, 0x11134).addRange(0x11180, 0x11181).addRange(0x111B6, 0x111BE).addRange(0x111C9, 0x111CC).addRange(0x1122F, 0x11231).addRange(0x11236, 0x11237).addRange(0x112E3, 0x112EA).addRange(0x11300, 0x11301).addRange(0x1133B, 0x1133C).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11438, 0x1143F).addRange(0x11442, 0x11444).addRange(0x114B3, 0x114B8).addRange(0x114BF, 0x114C0).addRange(0x114C2, 0x114C3).addRange(0x115B2, 0x115B5).addRange(0x115BC, 0x115BD).addRange(0x115BF, 0x115C0).addRange(0x115DC, 0x115DD).addRange(0x11633, 0x1163A).addRange(0x1163F, 0x11640).addRange(0x116B0, 0x116B5).addRange(0x1171D, 0x1171F).addRange(0x11722, 0x11725).addRange(0x11727, 0x1172B).addRange(0x1182F, 0x11837).addRange(0x11839, 0x1183A).addRange(0x1193B, 0x1193C).addRange(0x119D4, 0x119D7).addRange(0x119DA, 0x119DB).addRange(0x11A01, 0x11A0A).addRange(0x11A33, 0x11A38);
set.addRange(0x11A3B, 0x11A3E).addRange(0x11A51, 0x11A56).addRange(0x11A59, 0x11A5B).addRange(0x11A8A, 0x11A96).addRange(0x11A98, 0x11A99).addRange(0x11C30, 0x11C36).addRange(0x11C38, 0x11C3D).addRange(0x11C92, 0x11CA7).addRange(0x11CAA, 0x11CB0).addRange(0x11CB2, 0x11CB3).addRange(0x11CB5, 0x11CB6).addRange(0x11D31, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D45).addRange(0x11D90, 0x11D91).addRange(0x11EF3, 0x11EF4).addRange(0x13430, 0x13438).addRange(0x16AF0, 0x16AF4).addRange(0x16B30, 0x16B36).addRange(0x16B40, 0x16B43).addRange(0x16F8F, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x16FE3, 0x16FE4).addRange(0x1BC9D, 0x1BC9E).addRange(0x1BCA0, 0x1BCA3).addRange(0x1D167, 0x1D169).addRange(0x1D173, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244).addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E130, 0x1E13D).addRange(0x1E2EC, 0x1E2EF).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E944, 0x1E94B).addRange(0x1F3FB, 0x1F3FF).addRange(0xE0020, 0xE007F).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 596 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x345, 0x37F, 0x386, 0x38C, 0x10C7, 0x10CD, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2071, 0x207F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x2139, 0x214E, 0x2D27, 0x2D2D, 0x1D4A2, 0x1D4BB, 0x1D546);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x1BA).addRange(0x1BC, 0x1BF).addRange(0x1C4, 0x293).addRange(0x295, 0x2B8).addRange(0x2C0, 0x2C1).addRange(0x2E0, 0x2E4).addRange(0x370, 0x373).addRange(0x376, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1D00, 0x1DBF).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x2090, 0x209C).addRange(0x210A, 0x2113).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x212F, 0x2134).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149);
set.addRange(0x2160, 0x217F).addRange(0x2183, 0x2184).addRange(0x24B6, 0x24E9).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0xA640, 0xA66D).addRange(0xA680, 0xA69D).addRange(0xA722, 0xA787).addRange(0xA78B, 0xA78E).addRange(0xA790, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA7F6).addRange(0xA7F8, 0xA7FA).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB68).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0x10400, 0x1044F).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x118A0, 0x118DF).addRange(0x16E40, 0x16E7F).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714);
set.addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E900, 0x1E943).addRange(0x1F130, 0x1F149).addRange(0x1F150, 0x1F169).addRange(0x1F170, 0x1F189);
module.exports = set;

/***/ }),
/* 597 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x100, 0x102, 0x104, 0x106, 0x108, 0x10A, 0x10C, 0x10E, 0x110, 0x112, 0x114, 0x116, 0x118, 0x11A, 0x11C, 0x11E, 0x120, 0x122, 0x124, 0x126, 0x128, 0x12A, 0x12C, 0x12E, 0x130, 0x132, 0x134, 0x136, 0x139, 0x13B, 0x13D, 0x13F, 0x141, 0x143, 0x145, 0x147, 0x14C, 0x14E, 0x150, 0x152, 0x154, 0x156, 0x158, 0x15A, 0x15C, 0x15E, 0x160, 0x162, 0x164, 0x166, 0x168, 0x16A, 0x16C, 0x16E, 0x170, 0x172, 0x174, 0x176, 0x17B, 0x17D, 0x17F, 0x184, 0x1A2, 0x1A4, 0x1A9, 0x1AC, 0x1B5, 0x1BC, 0x1CD, 0x1CF, 0x1D1, 0x1D3, 0x1D5, 0x1D7, 0x1D9, 0x1DB, 0x1DE, 0x1E0, 0x1E2, 0x1E4, 0x1E6, 0x1E8, 0x1EA, 0x1EC, 0x1EE, 0x1F4, 0x1FA, 0x1FC, 0x1FE, 0x200, 0x202, 0x204, 0x206, 0x208, 0x20A, 0x20C, 0x20E, 0x210, 0x212, 0x214, 0x216, 0x218, 0x21A, 0x21C, 0x21E, 0x220, 0x222, 0x224, 0x226, 0x228, 0x22A, 0x22C, 0x22E, 0x230, 0x232, 0x241, 0x248, 0x24A, 0x24C, 0x24E, 0x345, 0x370, 0x372, 0x376, 0x37F, 0x386, 0x38C, 0x3C2, 0x3D8, 0x3DA, 0x3DC, 0x3DE, 0x3E0, 0x3E2, 0x3E4, 0x3E6, 0x3E8, 0x3EA, 0x3EC, 0x3EE, 0x3F7, 0x460, 0x462, 0x464, 0x466, 0x468, 0x46A, 0x46C, 0x46E, 0x470, 0x472, 0x474, 0x476, 0x478, 0x47A, 0x47C, 0x47E, 0x480, 0x48A, 0x48C, 0x48E, 0x490, 0x492, 0x494, 0x496, 0x498, 0x49A, 0x49C, 0x49E, 0x4A0, 0x4A2, 0x4A4, 0x4A6, 0x4A8, 0x4AA, 0x4AC, 0x4AE, 0x4B0, 0x4B2, 0x4B4, 0x4B6, 0x4B8, 0x4BA, 0x4BC, 0x4BE, 0x4C3, 0x4C5, 0x4C7, 0x4C9, 0x4CB, 0x4CD, 0x4D0, 0x4D2, 0x4D4, 0x4D6, 0x4D8, 0x4DA, 0x4DC, 0x4DE, 0x4E0, 0x4E2, 0x4E4, 0x4E6, 0x4E8, 0x4EA, 0x4EC, 0x4EE, 0x4F0, 0x4F2, 0x4F4, 0x4F6, 0x4F8, 0x4FA, 0x4FC, 0x4FE, 0x500, 0x502, 0x504, 0x506, 0x508, 0x50A, 0x50C, 0x50E, 0x510, 0x512, 0x514, 0x516, 0x518, 0x51A, 0x51C, 0x51E, 0x520, 0x522, 0x524, 0x526, 0x528, 0x52A, 0x52C, 0x52E, 0x587, 0x10C7, 0x10CD, 0x1E00, 0x1E02, 0x1E04, 0x1E06, 0x1E08, 0x1E0A, 0x1E0C, 0x1E0E, 0x1E10, 0x1E12, 0x1E14, 0x1E16, 0x1E18, 0x1E1A, 0x1E1C, 0x1E1E, 0x1E20, 0x1E22, 0x1E24, 0x1E26, 0x1E28, 0x1E2A, 0x1E2C, 0x1E2E, 0x1E30, 0x1E32, 0x1E34, 0x1E36, 0x1E38, 0x1E3A, 0x1E3C, 0x1E3E, 0x1E40, 0x1E42, 0x1E44, 0x1E46, 0x1E48, 0x1E4A, 0x1E4C, 0x1E4E, 0x1E50, 0x1E52, 0x1E54, 0x1E56, 0x1E58, 0x1E5A, 0x1E5C, 0x1E5E, 0x1E60, 0x1E62, 0x1E64, 0x1E66, 0x1E68, 0x1E6A, 0x1E6C, 0x1E6E, 0x1E70, 0x1E72, 0x1E74, 0x1E76, 0x1E78, 0x1E7A, 0x1E7C, 0x1E7E, 0x1E80, 0x1E82, 0x1E84, 0x1E86, 0x1E88, 0x1E8A, 0x1E8C, 0x1E8E, 0x1E90, 0x1E92, 0x1E94, 0x1E9E, 0x1EA0, 0x1EA2, 0x1EA4, 0x1EA6, 0x1EA8, 0x1EAA, 0x1EAC, 0x1EAE, 0x1EB0, 0x1EB2, 0x1EB4, 0x1EB6, 0x1EB8, 0x1EBA, 0x1EBC, 0x1EBE, 0x1EC0, 0x1EC2, 0x1EC4, 0x1EC6, 0x1EC8, 0x1ECA, 0x1ECC, 0x1ECE, 0x1ED0, 0x1ED2, 0x1ED4, 0x1ED6, 0x1ED8, 0x1EDA, 0x1EDC, 0x1EDE, 0x1EE0, 0x1EE2, 0x1EE4, 0x1EE6, 0x1EE8, 0x1EEA, 0x1EEC, 0x1EEE, 0x1EF0, 0x1EF2, 0x1EF4, 0x1EF6, 0x1EF8, 0x1EFA, 0x1EFC, 0x1EFE, 0x1F59, 0x1F5B, 0x1F5D, 0x1F5F, 0x2126, 0x2132, 0x2183, 0x2C60, 0x2C67, 0x2C69, 0x2C6B, 0x2C72, 0x2C75, 0x2C82, 0x2C84, 0x2C86, 0x2C88, 0x2C8A, 0x2C8C, 0x2C8E, 0x2C90, 0x2C92, 0x2C94, 0x2C96, 0x2C98, 0x2C9A, 0x2C9C, 0x2C9E, 0x2CA0, 0x2CA2, 0x2CA4, 0x2CA6, 0x2CA8, 0x2CAA, 0x2CAC, 0x2CAE, 0x2CB0, 0x2CB2, 0x2CB4, 0x2CB6, 0x2CB8, 0x2CBA, 0x2CBC, 0x2CBE, 0x2CC0, 0x2CC2, 0x2CC4, 0x2CC6, 0x2CC8, 0x2CCA, 0x2CCC, 0x2CCE, 0x2CD0, 0x2CD2, 0x2CD4, 0x2CD6, 0x2CD8, 0x2CDA, 0x2CDC, 0x2CDE, 0x2CE0, 0x2CE2, 0x2CEB, 0x2CED, 0x2CF2, 0xA640, 0xA642, 0xA644, 0xA646, 0xA648, 0xA64A, 0xA64C, 0xA64E, 0xA650, 0xA652, 0xA654, 0xA656, 0xA658, 0xA65A, 0xA65C, 0xA65E, 0xA660, 0xA662, 0xA664, 0xA666, 0xA668, 0xA66A, 0xA66C, 0xA680, 0xA682, 0xA684, 0xA686, 0xA688, 0xA68A, 0xA68C, 0xA68E, 0xA690, 0xA692, 0xA694, 0xA696, 0xA698, 0xA69A, 0xA722, 0xA724, 0xA726, 0xA728, 0xA72A, 0xA72C, 0xA72E, 0xA732, 0xA734, 0xA736, 0xA738, 0xA73A, 0xA73C, 0xA73E, 0xA740, 0xA742, 0xA744, 0xA746, 0xA748, 0xA74A, 0xA74C, 0xA74E, 0xA750, 0xA752, 0xA754, 0xA756, 0xA758, 0xA75A, 0xA75C, 0xA75E, 0xA760, 0xA762, 0xA764, 0xA766, 0xA768, 0xA76A, 0xA76C, 0xA76E, 0xA779, 0xA77B, 0xA780, 0xA782, 0xA784, 0xA786, 0xA78B, 0xA78D, 0xA790, 0xA792, 0xA796, 0xA798, 0xA79A, 0xA79C, 0xA79E, 0xA7A0, 0xA7A2, 0xA7A4, 0xA7A6, 0xA7A8, 0xA7B6, 0xA7B8, 0xA7BA, 0xA7BC, 0xA7BE, 0xA7C2, 0xA7C9, 0xA7F5);

set.addRange(0x41, 0x5A).addRange(0xC0, 0xD6).addRange(0xD8, 0xDF).addRange(0x149, 0x14A).addRange(0x178, 0x179).addRange(0x181, 0x182).addRange(0x186, 0x187).addRange(0x189, 0x18B).addRange(0x18E, 0x191).addRange(0x193, 0x194).addRange(0x196, 0x198).addRange(0x19C, 0x19D).addRange(0x19F, 0x1A0).addRange(0x1A6, 0x1A7).addRange(0x1AE, 0x1AF).addRange(0x1B1, 0x1B3).addRange(0x1B7, 0x1B8).addRange(0x1C4, 0x1C5).addRange(0x1C7, 0x1C8).addRange(0x1CA, 0x1CB).addRange(0x1F1, 0x1F2).addRange(0x1F6, 0x1F8).addRange(0x23A, 0x23B).addRange(0x23D, 0x23E).addRange(0x243, 0x246).addRange(0x388, 0x38A).addRange(0x38E, 0x38F).addRange(0x391, 0x3A1).addRange(0x3A3, 0x3AB).addRange(0x3CF, 0x3D1).addRange(0x3D5, 0x3D6).addRange(0x3F0, 0x3F1).addRange(0x3F4, 0x3F5).addRange(0x3F9, 0x3FA).addRange(0x3FD, 0x42F).addRange(0x4C0, 0x4C1).addRange(0x531, 0x556).addRange(0x10A0, 0x10C5).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1E9A, 0x1E9B).addRange(0x1F08, 0x1F0F).addRange(0x1F18, 0x1F1D).addRange(0x1F28, 0x1F2F).addRange(0x1F38, 0x1F3F).addRange(0x1F48, 0x1F4D).addRange(0x1F68, 0x1F6F).addRange(0x1F80, 0x1FAF).addRange(0x1FB2, 0x1FB4);
set.addRange(0x1FB7, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC7, 0x1FCC).addRange(0x1FD8, 0x1FDB).addRange(0x1FE8, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF7, 0x1FFC).addRange(0x212A, 0x212B).addRange(0x2160, 0x216F).addRange(0x24B6, 0x24CF).addRange(0x2C00, 0x2C2E).addRange(0x2C62, 0x2C64).addRange(0x2C6D, 0x2C70).addRange(0x2C7E, 0x2C80).addRange(0xA77D, 0xA77E).addRange(0xA7AA, 0xA7AE).addRange(0xA7B0, 0xA7B4).addRange(0xA7C4, 0xA7C7).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF21, 0xFF3A).addRange(0x10400, 0x10427).addRange(0x104B0, 0x104D3).addRange(0x10C80, 0x10CB2).addRange(0x118A0, 0x118BF).addRange(0x16E40, 0x16E5F).addRange(0x1E900, 0x1E921);
module.exports = set;

/***/ }),
/* 598 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x1BF, 0x259, 0x263, 0x26F, 0x275, 0x27D, 0x280, 0x292, 0x345, 0x37F, 0x386, 0x38C, 0x10C7, 0x10CD, 0x1D79, 0x1D7D, 0x1D8E, 0x1E9E, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2126, 0x2132, 0x214E, 0x2D27, 0x2D2D, 0xAB53);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x137).addRange(0x139, 0x18C).addRange(0x18E, 0x19A).addRange(0x19C, 0x1A9).addRange(0x1AC, 0x1B9).addRange(0x1BC, 0x1BD).addRange(0x1C4, 0x220).addRange(0x222, 0x233).addRange(0x23A, 0x254).addRange(0x256, 0x257).addRange(0x25B, 0x25C).addRange(0x260, 0x261).addRange(0x265, 0x266).addRange(0x268, 0x26C).addRange(0x271, 0x272).addRange(0x282, 0x283).addRange(0x287, 0x28C).addRange(0x29D, 0x29E).addRange(0x370, 0x373).addRange(0x376, 0x377).addRange(0x37B, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3D1).addRange(0x3D5, 0x3F5).addRange(0x3F7, 0x3FB).addRange(0x3FD, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x561, 0x587).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1E00, 0x1E9B).addRange(0x1EA0, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC);
set.addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x212A, 0x212B).addRange(0x2160, 0x217F).addRange(0x2183, 0x2184).addRange(0x24B6, 0x24E9).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2C70).addRange(0x2C72, 0x2C73).addRange(0x2C75, 0x2C76).addRange(0x2C7E, 0x2CE3).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0xA640, 0xA66D).addRange(0xA680, 0xA69B).addRange(0xA722, 0xA72F).addRange(0xA732, 0xA76F).addRange(0xA779, 0xA787).addRange(0xA78B, 0xA78D).addRange(0xA790, 0xA794).addRange(0xA796, 0xA7AE).addRange(0xA7B0, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA7F6).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0x10400, 0x1044F).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x118A0, 0x118DF).addRange(0x16E40, 0x16E7F).addRange(0x1E900, 0x1E943);
module.exports = set;

/***/ }),
/* 599 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x100, 0x102, 0x104, 0x106, 0x108, 0x10A, 0x10C, 0x10E, 0x110, 0x112, 0x114, 0x116, 0x118, 0x11A, 0x11C, 0x11E, 0x120, 0x122, 0x124, 0x126, 0x128, 0x12A, 0x12C, 0x12E, 0x130, 0x132, 0x134, 0x136, 0x139, 0x13B, 0x13D, 0x13F, 0x141, 0x143, 0x145, 0x147, 0x14A, 0x14C, 0x14E, 0x150, 0x152, 0x154, 0x156, 0x158, 0x15A, 0x15C, 0x15E, 0x160, 0x162, 0x164, 0x166, 0x168, 0x16A, 0x16C, 0x16E, 0x170, 0x172, 0x174, 0x176, 0x17B, 0x17D, 0x184, 0x1A2, 0x1A4, 0x1A9, 0x1AC, 0x1B5, 0x1BC, 0x1CD, 0x1CF, 0x1D1, 0x1D3, 0x1D5, 0x1D7, 0x1D9, 0x1DB, 0x1DE, 0x1E0, 0x1E2, 0x1E4, 0x1E6, 0x1E8, 0x1EA, 0x1EC, 0x1EE, 0x1F4, 0x1FA, 0x1FC, 0x1FE, 0x200, 0x202, 0x204, 0x206, 0x208, 0x20A, 0x20C, 0x20E, 0x210, 0x212, 0x214, 0x216, 0x218, 0x21A, 0x21C, 0x21E, 0x220, 0x222, 0x224, 0x226, 0x228, 0x22A, 0x22C, 0x22E, 0x230, 0x232, 0x241, 0x248, 0x24A, 0x24C, 0x24E, 0x370, 0x372, 0x376, 0x37F, 0x386, 0x38C, 0x3CF, 0x3D8, 0x3DA, 0x3DC, 0x3DE, 0x3E0, 0x3E2, 0x3E4, 0x3E6, 0x3E8, 0x3EA, 0x3EC, 0x3EE, 0x3F4, 0x3F7, 0x460, 0x462, 0x464, 0x466, 0x468, 0x46A, 0x46C, 0x46E, 0x470, 0x472, 0x474, 0x476, 0x478, 0x47A, 0x47C, 0x47E, 0x480, 0x48A, 0x48C, 0x48E, 0x490, 0x492, 0x494, 0x496, 0x498, 0x49A, 0x49C, 0x49E, 0x4A0, 0x4A2, 0x4A4, 0x4A6, 0x4A8, 0x4AA, 0x4AC, 0x4AE, 0x4B0, 0x4B2, 0x4B4, 0x4B6, 0x4B8, 0x4BA, 0x4BC, 0x4BE, 0x4C3, 0x4C5, 0x4C7, 0x4C9, 0x4CB, 0x4CD, 0x4D0, 0x4D2, 0x4D4, 0x4D6, 0x4D8, 0x4DA, 0x4DC, 0x4DE, 0x4E0, 0x4E2, 0x4E4, 0x4E6, 0x4E8, 0x4EA, 0x4EC, 0x4EE, 0x4F0, 0x4F2, 0x4F4, 0x4F6, 0x4F8, 0x4FA, 0x4FC, 0x4FE, 0x500, 0x502, 0x504, 0x506, 0x508, 0x50A, 0x50C, 0x50E, 0x510, 0x512, 0x514, 0x516, 0x518, 0x51A, 0x51C, 0x51E, 0x520, 0x522, 0x524, 0x526, 0x528, 0x52A, 0x52C, 0x52E, 0x10C7, 0x10CD, 0x1E00, 0x1E02, 0x1E04, 0x1E06, 0x1E08, 0x1E0A, 0x1E0C, 0x1E0E, 0x1E10, 0x1E12, 0x1E14, 0x1E16, 0x1E18, 0x1E1A, 0x1E1C, 0x1E1E, 0x1E20, 0x1E22, 0x1E24, 0x1E26, 0x1E28, 0x1E2A, 0x1E2C, 0x1E2E, 0x1E30, 0x1E32, 0x1E34, 0x1E36, 0x1E38, 0x1E3A, 0x1E3C, 0x1E3E, 0x1E40, 0x1E42, 0x1E44, 0x1E46, 0x1E48, 0x1E4A, 0x1E4C, 0x1E4E, 0x1E50, 0x1E52, 0x1E54, 0x1E56, 0x1E58, 0x1E5A, 0x1E5C, 0x1E5E, 0x1E60, 0x1E62, 0x1E64, 0x1E66, 0x1E68, 0x1E6A, 0x1E6C, 0x1E6E, 0x1E70, 0x1E72, 0x1E74, 0x1E76, 0x1E78, 0x1E7A, 0x1E7C, 0x1E7E, 0x1E80, 0x1E82, 0x1E84, 0x1E86, 0x1E88, 0x1E8A, 0x1E8C, 0x1E8E, 0x1E90, 0x1E92, 0x1E94, 0x1E9E, 0x1EA0, 0x1EA2, 0x1EA4, 0x1EA6, 0x1EA8, 0x1EAA, 0x1EAC, 0x1EAE, 0x1EB0, 0x1EB2, 0x1EB4, 0x1EB6, 0x1EB8, 0x1EBA, 0x1EBC, 0x1EBE, 0x1EC0, 0x1EC2, 0x1EC4, 0x1EC6, 0x1EC8, 0x1ECA, 0x1ECC, 0x1ECE, 0x1ED0, 0x1ED2, 0x1ED4, 0x1ED6, 0x1ED8, 0x1EDA, 0x1EDC, 0x1EDE, 0x1EE0, 0x1EE2, 0x1EE4, 0x1EE6, 0x1EE8, 0x1EEA, 0x1EEC, 0x1EEE, 0x1EF0, 0x1EF2, 0x1EF4, 0x1EF6, 0x1EF8, 0x1EFA, 0x1EFC, 0x1EFE, 0x1F59, 0x1F5B, 0x1F5D, 0x1F5F, 0x2126, 0x2132, 0x2183, 0x2C60, 0x2C67, 0x2C69, 0x2C6B, 0x2C72, 0x2C75, 0x2C82, 0x2C84, 0x2C86, 0x2C88, 0x2C8A, 0x2C8C, 0x2C8E, 0x2C90, 0x2C92, 0x2C94, 0x2C96, 0x2C98, 0x2C9A, 0x2C9C, 0x2C9E, 0x2CA0, 0x2CA2, 0x2CA4, 0x2CA6, 0x2CA8, 0x2CAA, 0x2CAC, 0x2CAE, 0x2CB0, 0x2CB2, 0x2CB4, 0x2CB6, 0x2CB8, 0x2CBA, 0x2CBC, 0x2CBE, 0x2CC0, 0x2CC2, 0x2CC4, 0x2CC6, 0x2CC8, 0x2CCA, 0x2CCC, 0x2CCE, 0x2CD0, 0x2CD2, 0x2CD4, 0x2CD6, 0x2CD8, 0x2CDA, 0x2CDC, 0x2CDE, 0x2CE0, 0x2CE2, 0x2CEB, 0x2CED, 0x2CF2, 0xA640, 0xA642, 0xA644, 0xA646, 0xA648, 0xA64A, 0xA64C, 0xA64E, 0xA650, 0xA652, 0xA654, 0xA656, 0xA658, 0xA65A, 0xA65C, 0xA65E, 0xA660, 0xA662, 0xA664, 0xA666, 0xA668, 0xA66A, 0xA66C, 0xA680, 0xA682, 0xA684, 0xA686, 0xA688, 0xA68A, 0xA68C, 0xA68E, 0xA690, 0xA692, 0xA694, 0xA696, 0xA698, 0xA69A, 0xA722, 0xA724, 0xA726, 0xA728, 0xA72A, 0xA72C, 0xA72E, 0xA732, 0xA734, 0xA736, 0xA738, 0xA73A, 0xA73C, 0xA73E, 0xA740, 0xA742, 0xA744, 0xA746, 0xA748, 0xA74A, 0xA74C, 0xA74E, 0xA750, 0xA752, 0xA754, 0xA756, 0xA758, 0xA75A, 0xA75C, 0xA75E, 0xA760, 0xA762, 0xA764, 0xA766, 0xA768, 0xA76A, 0xA76C, 0xA76E, 0xA779, 0xA77B, 0xA780, 0xA782, 0xA784, 0xA786, 0xA78B, 0xA78D, 0xA790, 0xA792, 0xA796, 0xA798, 0xA79A, 0xA79C, 0xA79E, 0xA7A0, 0xA7A2, 0xA7A4, 0xA7A6, 0xA7A8, 0xA7B6, 0xA7B8, 0xA7BA, 0xA7BC, 0xA7BE, 0xA7C2, 0xA7C9, 0xA7F5);

set.addRange(0x41, 0x5A).addRange(0xC0, 0xD6).addRange(0xD8, 0xDE).addRange(0x178, 0x179).addRange(0x181, 0x182).addRange(0x186, 0x187).addRange(0x189, 0x18B).addRange(0x18E, 0x191).addRange(0x193, 0x194).addRange(0x196, 0x198).addRange(0x19C, 0x19D).addRange(0x19F, 0x1A0).addRange(0x1A6, 0x1A7).addRange(0x1AE, 0x1AF).addRange(0x1B1, 0x1B3).addRange(0x1B7, 0x1B8).addRange(0x1C4, 0x1C5).addRange(0x1C7, 0x1C8).addRange(0x1CA, 0x1CB).addRange(0x1F1, 0x1F2).addRange(0x1F6, 0x1F8).addRange(0x23A, 0x23B).addRange(0x23D, 0x23E).addRange(0x243, 0x246).addRange(0x388, 0x38A).addRange(0x38E, 0x38F).addRange(0x391, 0x3A1).addRange(0x3A3, 0x3AB).addRange(0x3F9, 0x3FA).addRange(0x3FD, 0x42F).addRange(0x4C0, 0x4C1).addRange(0x531, 0x556).addRange(0x10A0, 0x10C5).addRange(0x13A0, 0x13F5).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1F08, 0x1F0F).addRange(0x1F18, 0x1F1D).addRange(0x1F28, 0x1F2F).addRange(0x1F38, 0x1F3F).addRange(0x1F48, 0x1F4D).addRange(0x1F68, 0x1F6F).addRange(0x1F88, 0x1F8F).addRange(0x1F98, 0x1F9F).addRange(0x1FA8, 0x1FAF).addRange(0x1FB8, 0x1FBC).addRange(0x1FC8, 0x1FCC).addRange(0x1FD8, 0x1FDB).addRange(0x1FE8, 0x1FEC).addRange(0x1FF8, 0x1FFC).addRange(0x212A, 0x212B);
set.addRange(0x2160, 0x216F).addRange(0x24B6, 0x24CF).addRange(0x2C00, 0x2C2E).addRange(0x2C62, 0x2C64).addRange(0x2C6D, 0x2C70).addRange(0x2C7E, 0x2C80).addRange(0xA77D, 0xA77E).addRange(0xA7AA, 0xA7AE).addRange(0xA7B0, 0xA7B4).addRange(0xA7C4, 0xA7C7).addRange(0xFF21, 0xFF3A).addRange(0x10400, 0x10427).addRange(0x104B0, 0x104D3).addRange(0x10C80, 0x10CB2).addRange(0x118A0, 0x118BF).addRange(0x16E40, 0x16E5F).addRange(0x1E900, 0x1E921);
module.exports = set;

/***/ }),
/* 600 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA0, 0xA8, 0xAA, 0xAD, 0xAF, 0x100, 0x102, 0x104, 0x106, 0x108, 0x10A, 0x10C, 0x10E, 0x110, 0x112, 0x114, 0x116, 0x118, 0x11A, 0x11C, 0x11E, 0x120, 0x122, 0x124, 0x126, 0x128, 0x12A, 0x12C, 0x12E, 0x130, 0x136, 0x139, 0x13B, 0x13D, 0x143, 0x145, 0x147, 0x14C, 0x14E, 0x150, 0x152, 0x154, 0x156, 0x158, 0x15A, 0x15C, 0x15E, 0x160, 0x162, 0x164, 0x166, 0x168, 0x16A, 0x16C, 0x16E, 0x170, 0x172, 0x174, 0x176, 0x17B, 0x17D, 0x17F, 0x184, 0x1A2, 0x1A4, 0x1A9, 0x1AC, 0x1B5, 0x1BC, 0x1CF, 0x1D1, 0x1D3, 0x1D5, 0x1D7, 0x1D9, 0x1DB, 0x1DE, 0x1E0, 0x1E2, 0x1E4, 0x1E6, 0x1E8, 0x1EA, 0x1EC, 0x1EE, 0x1FA, 0x1FC, 0x1FE, 0x200, 0x202, 0x204, 0x206, 0x208, 0x20A, 0x20C, 0x20E, 0x210, 0x212, 0x214, 0x216, 0x218, 0x21A, 0x21C, 0x21E, 0x220, 0x222, 0x224, 0x226, 0x228, 0x22A, 0x22C, 0x22E, 0x230, 0x232, 0x241, 0x248, 0x24A, 0x24C, 0x24E, 0x34F, 0x370, 0x372, 0x374, 0x376, 0x37A, 0x38C, 0x3C2, 0x3D8, 0x3DA, 0x3DC, 0x3DE, 0x3E0, 0x3E2, 0x3E4, 0x3E6, 0x3E8, 0x3EA, 0x3EC, 0x3EE, 0x3F7, 0x460, 0x462, 0x464, 0x466, 0x468, 0x46A, 0x46C, 0x46E, 0x470, 0x472, 0x474, 0x476, 0x478, 0x47A, 0x47C, 0x47E, 0x480, 0x48A, 0x48C, 0x48E, 0x490, 0x492, 0x494, 0x496, 0x498, 0x49A, 0x49C, 0x49E, 0x4A0, 0x4A2, 0x4A4, 0x4A6, 0x4A8, 0x4AA, 0x4AC, 0x4AE, 0x4B0, 0x4B2, 0x4B4, 0x4B6, 0x4B8, 0x4BA, 0x4BC, 0x4BE, 0x4C3, 0x4C5, 0x4C7, 0x4C9, 0x4CB, 0x4CD, 0x4D0, 0x4D2, 0x4D4, 0x4D6, 0x4D8, 0x4DA, 0x4DC, 0x4DE, 0x4E0, 0x4E2, 0x4E4, 0x4E6, 0x4E8, 0x4EA, 0x4EC, 0x4EE, 0x4F0, 0x4F2, 0x4F4, 0x4F6, 0x4F8, 0x4FA, 0x4FC, 0x4FE, 0x500, 0x502, 0x504, 0x506, 0x508, 0x50A, 0x50C, 0x50E, 0x510, 0x512, 0x514, 0x516, 0x518, 0x51A, 0x51C, 0x51E, 0x520, 0x522, 0x524, 0x526, 0x528, 0x52A, 0x52C, 0x52E, 0x587, 0x61C, 0x9DF, 0xA33, 0xA36, 0xA5E, 0xE33, 0xEB3, 0xF0C, 0xF43, 0xF4D, 0xF52, 0xF57, 0xF5C, 0xF69, 0xF73, 0xF81, 0xF93, 0xF9D, 0xFA2, 0xFA7, 0xFAC, 0xFB9, 0x10C7, 0x10CD, 0x10FC, 0x1D78, 0x1E00, 0x1E02, 0x1E04, 0x1E06, 0x1E08, 0x1E0A, 0x1E0C, 0x1E0E, 0x1E10, 0x1E12, 0x1E14, 0x1E16, 0x1E18, 0x1E1A, 0x1E1C, 0x1E1E, 0x1E20, 0x1E22, 0x1E24, 0x1E26, 0x1E28, 0x1E2A, 0x1E2C, 0x1E2E, 0x1E30, 0x1E32, 0x1E34, 0x1E36, 0x1E38, 0x1E3A, 0x1E3C, 0x1E3E, 0x1E40, 0x1E42, 0x1E44, 0x1E46, 0x1E48, 0x1E4A, 0x1E4C, 0x1E4E, 0x1E50, 0x1E52, 0x1E54, 0x1E56, 0x1E58, 0x1E5A, 0x1E5C, 0x1E5E, 0x1E60, 0x1E62, 0x1E64, 0x1E66, 0x1E68, 0x1E6A, 0x1E6C, 0x1E6E, 0x1E70, 0x1E72, 0x1E74, 0x1E76, 0x1E78, 0x1E7A, 0x1E7C, 0x1E7E, 0x1E80, 0x1E82, 0x1E84, 0x1E86, 0x1E88, 0x1E8A, 0x1E8C, 0x1E8E, 0x1E90, 0x1E92, 0x1E94, 0x1E9E, 0x1EA0, 0x1EA2, 0x1EA4, 0x1EA6, 0x1EA8, 0x1EAA, 0x1EAC, 0x1EAE, 0x1EB0, 0x1EB2, 0x1EB4, 0x1EB6, 0x1EB8, 0x1EBA, 0x1EBC, 0x1EBE, 0x1EC0, 0x1EC2, 0x1EC4, 0x1EC6, 0x1EC8, 0x1ECA, 0x1ECC, 0x1ECE, 0x1ED0, 0x1ED2, 0x1ED4, 0x1ED6, 0x1ED8, 0x1EDA, 0x1EDC, 0x1EDE, 0x1EE0, 0x1EE2, 0x1EE4, 0x1EE6, 0x1EE8, 0x1EEA, 0x1EEC, 0x1EEE, 0x1EF0, 0x1EF2, 0x1EF4, 0x1EF6, 0x1EF8, 0x1EFA, 0x1EFC, 0x1EFE, 0x1F59, 0x1F5B, 0x1F5D, 0x1F5F, 0x1F71, 0x1F73, 0x1F75, 0x1F77, 0x1F79, 0x1F7B, 0x1F7D, 0x1FD3, 0x1FE3, 0x2011, 0x2017, 0x203C, 0x203E, 0x2057, 0x20A8, 0x2124, 0x2126, 0x2128, 0x2183, 0x2189, 0x2A0C, 0x2ADC, 0x2C60, 0x2C67, 0x2C69, 0x2C6B, 0x2C72, 0x2C75, 0x2C82, 0x2C84, 0x2C86, 0x2C88, 0x2C8A, 0x2C8C, 0x2C8E, 0x2C90, 0x2C92, 0x2C94, 0x2C96, 0x2C98, 0x2C9A, 0x2C9C, 0x2C9E, 0x2CA0, 0x2CA2, 0x2CA4, 0x2CA6, 0x2CA8, 0x2CAA, 0x2CAC, 0x2CAE, 0x2CB0, 0x2CB2, 0x2CB4, 0x2CB6, 0x2CB8, 0x2CBA, 0x2CBC, 0x2CBE, 0x2CC0, 0x2CC2, 0x2CC4, 0x2CC6, 0x2CC8, 0x2CCA, 0x2CCC, 0x2CCE, 0x2CD0, 0x2CD2, 0x2CD4, 0x2CD6, 0x2CD8, 0x2CDA, 0x2CDC, 0x2CDE, 0x2CE0, 0x2CE2, 0x2CEB, 0x2CED, 0x2CF2, 0x2D6F, 0x2E9F, 0x2EF3, 0x3000, 0x3036, 0x309F, 0x30FF, 0xA640, 0xA642, 0xA644, 0xA646, 0xA648, 0xA64A, 0xA64C, 0xA64E, 0xA650, 0xA652, 0xA654, 0xA656, 0xA658, 0xA65A, 0xA65C, 0xA65E, 0xA660, 0xA662, 0xA664, 0xA666, 0xA668, 0xA66A, 0xA66C, 0xA680, 0xA682, 0xA684, 0xA686, 0xA688, 0xA68A, 0xA68C, 0xA68E, 0xA690, 0xA692, 0xA694, 0xA696, 0xA698, 0xA69A, 0xA722, 0xA724, 0xA726, 0xA728, 0xA72A, 0xA72C, 0xA72E, 0xA732, 0xA734, 0xA736, 0xA738, 0xA73A, 0xA73C, 0xA73E, 0xA740, 0xA742, 0xA744, 0xA746, 0xA748, 0xA74A, 0xA74C, 0xA74E, 0xA750, 0xA752, 0xA754, 0xA756, 0xA758, 0xA75A, 0xA75C, 0xA75E, 0xA760, 0xA762, 0xA764, 0xA766, 0xA768, 0xA76A, 0xA76C, 0xA76E, 0xA770, 0xA779, 0xA77B, 0xA780, 0xA782, 0xA784, 0xA786, 0xA78B, 0xA78D, 0xA790, 0xA792, 0xA796, 0xA798, 0xA79A, 0xA79C, 0xA79E, 0xA7A0, 0xA7A2, 0xA7A4, 0xA7A6, 0xA7A8, 0xA7B6, 0xA7B8, 0xA7BA, 0xA7BC, 0xA7BE, 0xA7C2, 0xA7C9, 0xA7F5, 0xAB69, 0xFA10, 0xFA12, 0xFA20, 0xFA22, 0xFB1D, 0xFB3E, 0xFE74, 0xFEFF, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E, 0x1F190);

set.addRange(0x41, 0x5A).addRange(0xB2, 0xB5).addRange(0xB8, 0xBA).addRange(0xBC, 0xBE).addRange(0xC0, 0xD6).addRange(0xD8, 0xDF).addRange(0x132, 0x134).addRange(0x13F, 0x141).addRange(0x149, 0x14A).addRange(0x178, 0x179).addRange(0x181, 0x182).addRange(0x186, 0x187).addRange(0x189, 0x18B).addRange(0x18E, 0x191).addRange(0x193, 0x194).addRange(0x196, 0x198).addRange(0x19C, 0x19D).addRange(0x19F, 0x1A0).addRange(0x1A6, 0x1A7).addRange(0x1AE, 0x1AF).addRange(0x1B1, 0x1B3).addRange(0x1B7, 0x1B8).addRange(0x1C4, 0x1CD).addRange(0x1F1, 0x1F4).addRange(0x1F6, 0x1F8).addRange(0x23A, 0x23B).addRange(0x23D, 0x23E).addRange(0x243, 0x246).addRange(0x2B0, 0x2B8).addRange(0x2D8, 0x2DD).addRange(0x2E0, 0x2E4).addRange(0x340, 0x341).addRange(0x343, 0x345).addRange(0x37E, 0x37F).addRange(0x384, 0x38A).addRange(0x38E, 0x38F).addRange(0x391, 0x3A1).addRange(0x3A3, 0x3AB).addRange(0x3CF, 0x3D6).addRange(0x3F0, 0x3F2).addRange(0x3F4, 0x3F5).addRange(0x3F9, 0x3FA).addRange(0x3FD, 0x42F).addRange(0x4C0, 0x4C1).addRange(0x531, 0x556).addRange(0x675, 0x678).addRange(0x958, 0x95F).addRange(0x9DC, 0x9DD).addRange(0xA59, 0xA5B).addRange(0xB5C, 0xB5D).addRange(0xEDC, 0xEDD);
set.addRange(0xF75, 0xF79).addRange(0x10A0, 0x10C5).addRange(0x115F, 0x1160).addRange(0x13F8, 0x13FD).addRange(0x17B4, 0x17B5).addRange(0x180B, 0x180E).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1D2C, 0x1D2E).addRange(0x1D30, 0x1D3A).addRange(0x1D3C, 0x1D4D).addRange(0x1D4F, 0x1D6A).addRange(0x1D9B, 0x1DBF).addRange(0x1E9A, 0x1E9B).addRange(0x1F08, 0x1F0F).addRange(0x1F18, 0x1F1D).addRange(0x1F28, 0x1F2F).addRange(0x1F38, 0x1F3F).addRange(0x1F48, 0x1F4D).addRange(0x1F68, 0x1F6F).addRange(0x1F80, 0x1FAF).addRange(0x1FB2, 0x1FB4).addRange(0x1FB7, 0x1FC4).addRange(0x1FC7, 0x1FCF).addRange(0x1FD8, 0x1FDB).addRange(0x1FDD, 0x1FDF).addRange(0x1FE8, 0x1FEF).addRange(0x1FF2, 0x1FF4).addRange(0x1FF7, 0x1FFE).addRange(0x2000, 0x200F).addRange(0x2024, 0x2026).addRange(0x202A, 0x202F).addRange(0x2033, 0x2034).addRange(0x2036, 0x2037).addRange(0x2047, 0x2049).addRange(0x205F, 0x2071).addRange(0x2074, 0x208E).addRange(0x2090, 0x209C).addRange(0x2100, 0x2103).addRange(0x2105, 0x2107).addRange(0x2109, 0x2113).addRange(0x2115, 0x2116).addRange(0x2119, 0x211D).addRange(0x2120, 0x2122).addRange(0x212A, 0x212D).addRange(0x212F, 0x2139).addRange(0x213B, 0x2140).addRange(0x2145, 0x2149).addRange(0x2150, 0x217F).addRange(0x222C, 0x222D);
set.addRange(0x222F, 0x2230).addRange(0x2329, 0x232A).addRange(0x2460, 0x24EA).addRange(0x2A74, 0x2A76).addRange(0x2C00, 0x2C2E).addRange(0x2C62, 0x2C64).addRange(0x2C6D, 0x2C70).addRange(0x2C7C, 0x2C80).addRange(0x2F00, 0x2FD5).addRange(0x3038, 0x303A).addRange(0x309B, 0x309C).addRange(0x3131, 0x318E).addRange(0x3192, 0x319F).addRange(0x3200, 0x321E).addRange(0x3220, 0x3247).addRange(0x3250, 0x327E).addRange(0x3280, 0x33FF).addRange(0xA69C, 0xA69D).addRange(0xA77D, 0xA77E).addRange(0xA7AA, 0xA7AE).addRange(0xA7B0, 0xA7B4).addRange(0xA7C4, 0xA7C7).addRange(0xA7F8, 0xA7F9).addRange(0xAB5C, 0xAB5F).addRange(0xAB70, 0xABBF).addRange(0xF900, 0xFA0D).addRange(0xFA15, 0xFA1E).addRange(0xFA25, 0xFA26).addRange(0xFA2A, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1F, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFC).addRange(0xFE00, 0xFE19).addRange(0xFE30, 0xFE44).addRange(0xFE47, 0xFE52).addRange(0xFE54, 0xFE66).addRange(0xFE68, 0xFE6B).addRange(0xFE70, 0xFE72).addRange(0xFE76, 0xFEFC).addRange(0xFF01, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF);
set.addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0xFFE0, 0xFFE6).addRange(0xFFE8, 0xFFEE).addRange(0xFFF0, 0xFFF8).addRange(0x10400, 0x10427).addRange(0x104B0, 0x104D3).addRange(0x10C80, 0x10CB2).addRange(0x118A0, 0x118BF).addRange(0x16E40, 0x16E5F).addRange(0x1BCA0, 0x1BCA3).addRange(0x1D15E, 0x1D164).addRange(0x1D173, 0x1D17A).addRange(0x1D1BB, 0x1D1C0).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1E900, 0x1E921).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1F100, 0x1F10A);
set.addRange(0x1F110, 0x1F12E).addRange(0x1F130, 0x1F14F).addRange(0x1F16A, 0x1F16C).addRange(0x1F200, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1FBF0, 0x1FBF9).addRange(0x2F800, 0x2FA1D).addRange(0xE0000, 0xE0FFF);
module.exports = set;

/***/ }),
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x101, 0x103, 0x105, 0x107, 0x109, 0x10B, 0x10D, 0x10F, 0x111, 0x113, 0x115, 0x117, 0x119, 0x11B, 0x11D, 0x11F, 0x121, 0x123, 0x125, 0x127, 0x129, 0x12B, 0x12D, 0x12F, 0x131, 0x133, 0x135, 0x137, 0x13A, 0x13C, 0x13E, 0x140, 0x142, 0x144, 0x146, 0x14B, 0x14D, 0x14F, 0x151, 0x153, 0x155, 0x157, 0x159, 0x15B, 0x15D, 0x15F, 0x161, 0x163, 0x165, 0x167, 0x169, 0x16B, 0x16D, 0x16F, 0x171, 0x173, 0x175, 0x177, 0x17A, 0x17C, 0x183, 0x185, 0x188, 0x18C, 0x192, 0x195, 0x19E, 0x1A1, 0x1A3, 0x1A5, 0x1A8, 0x1AD, 0x1B0, 0x1B4, 0x1B6, 0x1B9, 0x1BD, 0x1BF, 0x1C4, 0x1CC, 0x1CE, 0x1D0, 0x1D2, 0x1D4, 0x1D6, 0x1D8, 0x1DA, 0x1DF, 0x1E1, 0x1E3, 0x1E5, 0x1E7, 0x1E9, 0x1EB, 0x1ED, 0x1F3, 0x1F5, 0x1F9, 0x1FB, 0x1FD, 0x1FF, 0x201, 0x203, 0x205, 0x207, 0x209, 0x20B, 0x20D, 0x20F, 0x211, 0x213, 0x215, 0x217, 0x219, 0x21B, 0x21D, 0x21F, 0x223, 0x225, 0x227, 0x229, 0x22B, 0x22D, 0x22F, 0x231, 0x233, 0x23C, 0x242, 0x247, 0x249, 0x24B, 0x24D, 0x259, 0x263, 0x26F, 0x275, 0x27D, 0x280, 0x292, 0x345, 0x371, 0x373, 0x377, 0x390, 0x3D9, 0x3DB, 0x3DD, 0x3DF, 0x3E1, 0x3E3, 0x3E5, 0x3E7, 0x3E9, 0x3EB, 0x3ED, 0x3F5, 0x3F8, 0x3FB, 0x461, 0x463, 0x465, 0x467, 0x469, 0x46B, 0x46D, 0x46F, 0x471, 0x473, 0x475, 0x477, 0x479, 0x47B, 0x47D, 0x47F, 0x481, 0x48B, 0x48D, 0x48F, 0x491, 0x493, 0x495, 0x497, 0x499, 0x49B, 0x49D, 0x49F, 0x4A1, 0x4A3, 0x4A5, 0x4A7, 0x4A9, 0x4AB, 0x4AD, 0x4AF, 0x4B1, 0x4B3, 0x4B5, 0x4B7, 0x4B9, 0x4BB, 0x4BD, 0x4BF, 0x4C2, 0x4C4, 0x4C6, 0x4C8, 0x4CA, 0x4CC, 0x4D1, 0x4D3, 0x4D5, 0x4D7, 0x4D9, 0x4DB, 0x4DD, 0x4DF, 0x4E1, 0x4E3, 0x4E5, 0x4E7, 0x4E9, 0x4EB, 0x4ED, 0x4EF, 0x4F1, 0x4F3, 0x4F5, 0x4F7, 0x4F9, 0x4FB, 0x4FD, 0x4FF, 0x501, 0x503, 0x505, 0x507, 0x509, 0x50B, 0x50D, 0x50F, 0x511, 0x513, 0x515, 0x517, 0x519, 0x51B, 0x51D, 0x51F, 0x521, 0x523, 0x525, 0x527, 0x529, 0x52B, 0x52D, 0x52F, 0x1D79, 0x1D7D, 0x1D8E, 0x1E01, 0x1E03, 0x1E05, 0x1E07, 0x1E09, 0x1E0B, 0x1E0D, 0x1E0F, 0x1E11, 0x1E13, 0x1E15, 0x1E17, 0x1E19, 0x1E1B, 0x1E1D, 0x1E1F, 0x1E21, 0x1E23, 0x1E25, 0x1E27, 0x1E29, 0x1E2B, 0x1E2D, 0x1E2F, 0x1E31, 0x1E33, 0x1E35, 0x1E37, 0x1E39, 0x1E3B, 0x1E3D, 0x1E3F, 0x1E41, 0x1E43, 0x1E45, 0x1E47, 0x1E49, 0x1E4B, 0x1E4D, 0x1E4F, 0x1E51, 0x1E53, 0x1E55, 0x1E57, 0x1E59, 0x1E5B, 0x1E5D, 0x1E5F, 0x1E61, 0x1E63, 0x1E65, 0x1E67, 0x1E69, 0x1E6B, 0x1E6D, 0x1E6F, 0x1E71, 0x1E73, 0x1E75, 0x1E77, 0x1E79, 0x1E7B, 0x1E7D, 0x1E7F, 0x1E81, 0x1E83, 0x1E85, 0x1E87, 0x1E89, 0x1E8B, 0x1E8D, 0x1E8F, 0x1E91, 0x1E93, 0x1EA1, 0x1EA3, 0x1EA5, 0x1EA7, 0x1EA9, 0x1EAB, 0x1EAD, 0x1EAF, 0x1EB1, 0x1EB3, 0x1EB5, 0x1EB7, 0x1EB9, 0x1EBB, 0x1EBD, 0x1EBF, 0x1EC1, 0x1EC3, 0x1EC5, 0x1EC7, 0x1EC9, 0x1ECB, 0x1ECD, 0x1ECF, 0x1ED1, 0x1ED3, 0x1ED5, 0x1ED7, 0x1ED9, 0x1EDB, 0x1EDD, 0x1EDF, 0x1EE1, 0x1EE3, 0x1EE5, 0x1EE7, 0x1EE9, 0x1EEB, 0x1EED, 0x1EEF, 0x1EF1, 0x1EF3, 0x1EF5, 0x1EF7, 0x1EF9, 0x1EFB, 0x1EFD, 0x1FBE, 0x214E, 0x2184, 0x2C61, 0x2C68, 0x2C6A, 0x2C6C, 0x2C73, 0x2C76, 0x2C81, 0x2C83, 0x2C85, 0x2C87, 0x2C89, 0x2C8B, 0x2C8D, 0x2C8F, 0x2C91, 0x2C93, 0x2C95, 0x2C97, 0x2C99, 0x2C9B, 0x2C9D, 0x2C9F, 0x2CA1, 0x2CA3, 0x2CA5, 0x2CA7, 0x2CA9, 0x2CAB, 0x2CAD, 0x2CAF, 0x2CB1, 0x2CB3, 0x2CB5, 0x2CB7, 0x2CB9, 0x2CBB, 0x2CBD, 0x2CBF, 0x2CC1, 0x2CC3, 0x2CC5, 0x2CC7, 0x2CC9, 0x2CCB, 0x2CCD, 0x2CCF, 0x2CD1, 0x2CD3, 0x2CD5, 0x2CD7, 0x2CD9, 0x2CDB, 0x2CDD, 0x2CDF, 0x2CE1, 0x2CE3, 0x2CEC, 0x2CEE, 0x2CF3, 0x2D27, 0x2D2D, 0xA641, 0xA643, 0xA645, 0xA647, 0xA649, 0xA64B, 0xA64D, 0xA64F, 0xA651, 0xA653, 0xA655, 0xA657, 0xA659, 0xA65B, 0xA65D, 0xA65F, 0xA661, 0xA663, 0xA665, 0xA667, 0xA669, 0xA66B, 0xA66D, 0xA681, 0xA683, 0xA685, 0xA687, 0xA689, 0xA68B, 0xA68D, 0xA68F, 0xA691, 0xA693, 0xA695, 0xA697, 0xA699, 0xA69B, 0xA723, 0xA725, 0xA727, 0xA729, 0xA72B, 0xA72D, 0xA72F, 0xA733, 0xA735, 0xA737, 0xA739, 0xA73B, 0xA73D, 0xA73F, 0xA741, 0xA743, 0xA745, 0xA747, 0xA749, 0xA74B, 0xA74D, 0xA74F, 0xA751, 0xA753, 0xA755, 0xA757, 0xA759, 0xA75B, 0xA75D, 0xA75F, 0xA761, 0xA763, 0xA765, 0xA767, 0xA769, 0xA76B, 0xA76D, 0xA76F, 0xA77A, 0xA77C, 0xA77F, 0xA781, 0xA783, 0xA785, 0xA787, 0xA78C, 0xA791, 0xA797, 0xA799, 0xA79B, 0xA79D, 0xA79F, 0xA7A1, 0xA7A3, 0xA7A5, 0xA7A7, 0xA7A9, 0xA7B5, 0xA7B7, 0xA7B9, 0xA7BB, 0xA7BD, 0xA7BF, 0xA7C3, 0xA7C8, 0xA7CA, 0xA7F6, 0xAB53);

set.addRange(0x61, 0x7A).addRange(0xDF, 0xF6).addRange(0xF8, 0xFF).addRange(0x148, 0x149).addRange(0x17E, 0x180).addRange(0x199, 0x19A).addRange(0x1C6, 0x1C7).addRange(0x1C9, 0x1CA).addRange(0x1DC, 0x1DD).addRange(0x1EF, 0x1F1).addRange(0x23F, 0x240).addRange(0x24F, 0x254).addRange(0x256, 0x257).addRange(0x25B, 0x25C).addRange(0x260, 0x261).addRange(0x265, 0x266).addRange(0x268, 0x26C).addRange(0x271, 0x272).addRange(0x282, 0x283).addRange(0x287, 0x28C).addRange(0x29D, 0x29E).addRange(0x37B, 0x37D).addRange(0x3AC, 0x3CE).addRange(0x3D0, 0x3D1).addRange(0x3D5, 0x3D7).addRange(0x3EF, 0x3F3).addRange(0x430, 0x45F).addRange(0x4CE, 0x4CF).addRange(0x561, 0x587).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1E95, 0x1E9B).addRange(0x1EFF, 0x1F07).addRange(0x1F10, 0x1F15).addRange(0x1F20, 0x1F27).addRange(0x1F30, 0x1F37).addRange(0x1F40, 0x1F45).addRange(0x1F50, 0x1F57).addRange(0x1F60, 0x1F67).addRange(0x1F70, 0x1F7D).addRange(0x1F80, 0x1F87).addRange(0x1F90, 0x1F97).addRange(0x1FA0, 0x1FA7).addRange(0x1FB0, 0x1FB4).addRange(0x1FB6, 0x1FB7).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FC7).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FD7).addRange(0x1FE0, 0x1FE7).addRange(0x1FF2, 0x1FF4);
set.addRange(0x1FF6, 0x1FF7).addRange(0x2170, 0x217F).addRange(0x24D0, 0x24E9).addRange(0x2C30, 0x2C5E).addRange(0x2C65, 0x2C66).addRange(0x2D00, 0x2D25).addRange(0xA793, 0xA794).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF41, 0xFF5A).addRange(0x10428, 0x1044F).addRange(0x104D8, 0x104FB).addRange(0x10CC0, 0x10CF2).addRange(0x118C0, 0x118DF).addRange(0x16E60, 0x16E7F).addRange(0x1E922, 0x1E943);
module.exports = set;

/***/ }),
/* 602 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x101, 0x103, 0x105, 0x107, 0x109, 0x10B, 0x10D, 0x10F, 0x111, 0x113, 0x115, 0x117, 0x119, 0x11B, 0x11D, 0x11F, 0x121, 0x123, 0x125, 0x127, 0x129, 0x12B, 0x12D, 0x12F, 0x131, 0x133, 0x135, 0x137, 0x13A, 0x13C, 0x13E, 0x140, 0x142, 0x144, 0x146, 0x14B, 0x14D, 0x14F, 0x151, 0x153, 0x155, 0x157, 0x159, 0x15B, 0x15D, 0x15F, 0x161, 0x163, 0x165, 0x167, 0x169, 0x16B, 0x16D, 0x16F, 0x171, 0x173, 0x175, 0x177, 0x17A, 0x17C, 0x183, 0x185, 0x188, 0x18C, 0x192, 0x195, 0x19E, 0x1A1, 0x1A3, 0x1A5, 0x1A8, 0x1AD, 0x1B0, 0x1B4, 0x1B6, 0x1B9, 0x1BD, 0x1BF, 0x1CE, 0x1D0, 0x1D2, 0x1D4, 0x1D6, 0x1D8, 0x1DA, 0x1DF, 0x1E1, 0x1E3, 0x1E5, 0x1E7, 0x1E9, 0x1EB, 0x1ED, 0x1F5, 0x1F9, 0x1FB, 0x1FD, 0x1FF, 0x201, 0x203, 0x205, 0x207, 0x209, 0x20B, 0x20D, 0x20F, 0x211, 0x213, 0x215, 0x217, 0x219, 0x21B, 0x21D, 0x21F, 0x223, 0x225, 0x227, 0x229, 0x22B, 0x22D, 0x22F, 0x231, 0x233, 0x23C, 0x242, 0x247, 0x249, 0x24B, 0x24D, 0x259, 0x263, 0x26F, 0x275, 0x27D, 0x280, 0x292, 0x345, 0x371, 0x373, 0x377, 0x390, 0x3D9, 0x3DB, 0x3DD, 0x3DF, 0x3E1, 0x3E3, 0x3E5, 0x3E7, 0x3E9, 0x3EB, 0x3ED, 0x3F5, 0x3F8, 0x3FB, 0x461, 0x463, 0x465, 0x467, 0x469, 0x46B, 0x46D, 0x46F, 0x471, 0x473, 0x475, 0x477, 0x479, 0x47B, 0x47D, 0x47F, 0x481, 0x48B, 0x48D, 0x48F, 0x491, 0x493, 0x495, 0x497, 0x499, 0x49B, 0x49D, 0x49F, 0x4A1, 0x4A3, 0x4A5, 0x4A7, 0x4A9, 0x4AB, 0x4AD, 0x4AF, 0x4B1, 0x4B3, 0x4B5, 0x4B7, 0x4B9, 0x4BB, 0x4BD, 0x4BF, 0x4C2, 0x4C4, 0x4C6, 0x4C8, 0x4CA, 0x4CC, 0x4D1, 0x4D3, 0x4D5, 0x4D7, 0x4D9, 0x4DB, 0x4DD, 0x4DF, 0x4E1, 0x4E3, 0x4E5, 0x4E7, 0x4E9, 0x4EB, 0x4ED, 0x4EF, 0x4F1, 0x4F3, 0x4F5, 0x4F7, 0x4F9, 0x4FB, 0x4FD, 0x4FF, 0x501, 0x503, 0x505, 0x507, 0x509, 0x50B, 0x50D, 0x50F, 0x511, 0x513, 0x515, 0x517, 0x519, 0x51B, 0x51D, 0x51F, 0x521, 0x523, 0x525, 0x527, 0x529, 0x52B, 0x52D, 0x52F, 0x1D79, 0x1D7D, 0x1D8E, 0x1E01, 0x1E03, 0x1E05, 0x1E07, 0x1E09, 0x1E0B, 0x1E0D, 0x1E0F, 0x1E11, 0x1E13, 0x1E15, 0x1E17, 0x1E19, 0x1E1B, 0x1E1D, 0x1E1F, 0x1E21, 0x1E23, 0x1E25, 0x1E27, 0x1E29, 0x1E2B, 0x1E2D, 0x1E2F, 0x1E31, 0x1E33, 0x1E35, 0x1E37, 0x1E39, 0x1E3B, 0x1E3D, 0x1E3F, 0x1E41, 0x1E43, 0x1E45, 0x1E47, 0x1E49, 0x1E4B, 0x1E4D, 0x1E4F, 0x1E51, 0x1E53, 0x1E55, 0x1E57, 0x1E59, 0x1E5B, 0x1E5D, 0x1E5F, 0x1E61, 0x1E63, 0x1E65, 0x1E67, 0x1E69, 0x1E6B, 0x1E6D, 0x1E6F, 0x1E71, 0x1E73, 0x1E75, 0x1E77, 0x1E79, 0x1E7B, 0x1E7D, 0x1E7F, 0x1E81, 0x1E83, 0x1E85, 0x1E87, 0x1E89, 0x1E8B, 0x1E8D, 0x1E8F, 0x1E91, 0x1E93, 0x1EA1, 0x1EA3, 0x1EA5, 0x1EA7, 0x1EA9, 0x1EAB, 0x1EAD, 0x1EAF, 0x1EB1, 0x1EB3, 0x1EB5, 0x1EB7, 0x1EB9, 0x1EBB, 0x1EBD, 0x1EBF, 0x1EC1, 0x1EC3, 0x1EC5, 0x1EC7, 0x1EC9, 0x1ECB, 0x1ECD, 0x1ECF, 0x1ED1, 0x1ED3, 0x1ED5, 0x1ED7, 0x1ED9, 0x1EDB, 0x1EDD, 0x1EDF, 0x1EE1, 0x1EE3, 0x1EE5, 0x1EE7, 0x1EE9, 0x1EEB, 0x1EED, 0x1EEF, 0x1EF1, 0x1EF3, 0x1EF5, 0x1EF7, 0x1EF9, 0x1EFB, 0x1EFD, 0x1FBC, 0x1FBE, 0x1FCC, 0x1FFC, 0x214E, 0x2184, 0x2C61, 0x2C68, 0x2C6A, 0x2C6C, 0x2C73, 0x2C76, 0x2C81, 0x2C83, 0x2C85, 0x2C87, 0x2C89, 0x2C8B, 0x2C8D, 0x2C8F, 0x2C91, 0x2C93, 0x2C95, 0x2C97, 0x2C99, 0x2C9B, 0x2C9D, 0x2C9F, 0x2CA1, 0x2CA3, 0x2CA5, 0x2CA7, 0x2CA9, 0x2CAB, 0x2CAD, 0x2CAF, 0x2CB1, 0x2CB3, 0x2CB5, 0x2CB7, 0x2CB9, 0x2CBB, 0x2CBD, 0x2CBF, 0x2CC1, 0x2CC3, 0x2CC5, 0x2CC7, 0x2CC9, 0x2CCB, 0x2CCD, 0x2CCF, 0x2CD1, 0x2CD3, 0x2CD5, 0x2CD7, 0x2CD9, 0x2CDB, 0x2CDD, 0x2CDF, 0x2CE1, 0x2CE3, 0x2CEC, 0x2CEE, 0x2CF3, 0x2D27, 0x2D2D, 0xA641, 0xA643, 0xA645, 0xA647, 0xA649, 0xA64B, 0xA64D, 0xA64F, 0xA651, 0xA653, 0xA655, 0xA657, 0xA659, 0xA65B, 0xA65D, 0xA65F, 0xA661, 0xA663, 0xA665, 0xA667, 0xA669, 0xA66B, 0xA66D, 0xA681, 0xA683, 0xA685, 0xA687, 0xA689, 0xA68B, 0xA68D, 0xA68F, 0xA691, 0xA693, 0xA695, 0xA697, 0xA699, 0xA69B, 0xA723, 0xA725, 0xA727, 0xA729, 0xA72B, 0xA72D, 0xA72F, 0xA733, 0xA735, 0xA737, 0xA739, 0xA73B, 0xA73D, 0xA73F, 0xA741, 0xA743, 0xA745, 0xA747, 0xA749, 0xA74B, 0xA74D, 0xA74F, 0xA751, 0xA753, 0xA755, 0xA757, 0xA759, 0xA75B, 0xA75D, 0xA75F, 0xA761, 0xA763, 0xA765, 0xA767, 0xA769, 0xA76B, 0xA76D, 0xA76F, 0xA77A, 0xA77C, 0xA77F, 0xA781, 0xA783, 0xA785, 0xA787, 0xA78C, 0xA791, 0xA797, 0xA799, 0xA79B, 0xA79D, 0xA79F, 0xA7A1, 0xA7A3, 0xA7A5, 0xA7A7, 0xA7A9, 0xA7B5, 0xA7B7, 0xA7B9, 0xA7BB, 0xA7BD, 0xA7BF, 0xA7C3, 0xA7C8, 0xA7CA, 0xA7F6, 0xAB53);

set.addRange(0x61, 0x7A).addRange(0xDF, 0xF6).addRange(0xF8, 0xFF).addRange(0x148, 0x149).addRange(0x17E, 0x180).addRange(0x199, 0x19A).addRange(0x1C5, 0x1C6).addRange(0x1C8, 0x1C9).addRange(0x1CB, 0x1CC).addRange(0x1DC, 0x1DD).addRange(0x1EF, 0x1F0).addRange(0x1F2, 0x1F3).addRange(0x23F, 0x240).addRange(0x24F, 0x254).addRange(0x256, 0x257).addRange(0x25B, 0x25C).addRange(0x260, 0x261).addRange(0x265, 0x266).addRange(0x268, 0x26C).addRange(0x271, 0x272).addRange(0x282, 0x283).addRange(0x287, 0x28C).addRange(0x29D, 0x29E).addRange(0x37B, 0x37D).addRange(0x3AC, 0x3CE).addRange(0x3D0, 0x3D1).addRange(0x3D5, 0x3D7).addRange(0x3EF, 0x3F3).addRange(0x430, 0x45F).addRange(0x4CE, 0x4CF).addRange(0x561, 0x587).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1E95, 0x1E9B).addRange(0x1EFF, 0x1F07).addRange(0x1F10, 0x1F15).addRange(0x1F20, 0x1F27).addRange(0x1F30, 0x1F37).addRange(0x1F40, 0x1F45).addRange(0x1F50, 0x1F57).addRange(0x1F60, 0x1F67).addRange(0x1F70, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FB7).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FC7).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FD7).addRange(0x1FE0, 0x1FE7);
set.addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FF7).addRange(0x2170, 0x217F).addRange(0x24D0, 0x24E9).addRange(0x2C30, 0x2C5E).addRange(0x2C65, 0x2C66).addRange(0x2D00, 0x2D25).addRange(0xA793, 0xA794).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF41, 0xFF5A).addRange(0x10428, 0x1044F).addRange(0x104D8, 0x104FB).addRange(0x10CC0, 0x10CF2).addRange(0x118C0, 0x118DF).addRange(0x16E60, 0x16E7F).addRange(0x1E922, 0x1E943);
module.exports = set;

/***/ }),
/* 603 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2D, 0x58A, 0x5BE, 0x1400, 0x1806, 0x2053, 0x207B, 0x208B, 0x2212, 0x2E17, 0x2E1A, 0x2E40, 0x301C, 0x3030, 0x30A0, 0xFE58, 0xFE63, 0xFF0D, 0x10EAD);

set.addRange(0x2010, 0x2015).addRange(0x2E3A, 0x2E3B).addRange(0xFE31, 0xFE32);
module.exports = set;

/***/ }),
/* 604 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAD, 0x34F, 0x61C, 0x3164, 0xFEFF, 0xFFA0);

set.addRange(0x115F, 0x1160).addRange(0x17B4, 0x17B5).addRange(0x180B, 0x180E).addRange(0x200B, 0x200F).addRange(0x202A, 0x202E).addRange(0x2060, 0x206F).addRange(0xFE00, 0xFE0F).addRange(0xFFF0, 0xFFF8).addRange(0x1BCA0, 0x1BCA3).addRange(0x1D173, 0x1D17A).addRange(0xE0000, 0xE0FFF);
module.exports = set;

/***/ }),
/* 605 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x149, 0x673, 0xF77, 0xF79, 0xE0001);

set.addRange(0x17A3, 0x17A4).addRange(0x206A, 0x206F).addRange(0x2329, 0x232A);
module.exports = set;

/***/ }),
/* 606 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5E, 0x60, 0xA8, 0xAF, 0xB4, 0x37A, 0x559, 0x5BF, 0x5C4, 0x93C, 0x94D, 0x971, 0x9BC, 0x9CD, 0xA3C, 0xA4D, 0xABC, 0xACD, 0xB3C, 0xB4D, 0xB55, 0xBCD, 0xC4D, 0xCBC, 0xCCD, 0xD4D, 0xDCA, 0xE4E, 0xEBA, 0xF35, 0xF37, 0xF39, 0xFC6, 0x1037, 0x108F, 0x17DD, 0x1A7F, 0x1B34, 0x1B44, 0x1CED, 0x1CF4, 0x1FBD, 0x2E2F, 0x30FC, 0xA66F, 0xA67F, 0xA8C4, 0xA953, 0xA9B3, 0xA9C0, 0xA9E5, 0xAAF6, 0xFB1E, 0xFF3E, 0xFF40, 0xFF70, 0xFFE3, 0x102E0, 0x11173, 0x111C0, 0x1133C, 0x1134D, 0x11442, 0x11446, 0x1163F, 0x1172B, 0x11943, 0x119E0, 0x11A34, 0x11A47, 0x11A99, 0x11C3F, 0x11D42, 0x11D97);

set.addRange(0xB7, 0xB8).addRange(0x2B0, 0x34E).addRange(0x350, 0x357).addRange(0x35D, 0x362).addRange(0x374, 0x375).addRange(0x384, 0x385).addRange(0x483, 0x487).addRange(0x591, 0x5A1).addRange(0x5A3, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x64B, 0x652).addRange(0x657, 0x658).addRange(0x6DF, 0x6E0).addRange(0x6E5, 0x6E6).addRange(0x6EA, 0x6EC).addRange(0x730, 0x74A).addRange(0x7A6, 0x7B0).addRange(0x7EB, 0x7F5).addRange(0x818, 0x819).addRange(0x8E3, 0x8FE).addRange(0x951, 0x954).addRange(0xAFD, 0xAFF).addRange(0xD3B, 0xD3C).addRange(0xE47, 0xE4C).addRange(0xEC8, 0xECC).addRange(0xF18, 0xF19).addRange(0xF3E, 0xF3F).addRange(0xF82, 0xF84).addRange(0xF86, 0xF87).addRange(0x1039, 0x103A).addRange(0x1063, 0x1064).addRange(0x1069, 0x106D).addRange(0x1087, 0x108D).addRange(0x109A, 0x109B).addRange(0x135D, 0x135F).addRange(0x17C9, 0x17D3).addRange(0x1939, 0x193B).addRange(0x1A75, 0x1A7C).addRange(0x1AB0, 0x1ABD).addRange(0x1B6B, 0x1B73).addRange(0x1BAA, 0x1BAB).addRange(0x1C36, 0x1C37).addRange(0x1C78, 0x1C7D).addRange(0x1CD0, 0x1CE8).addRange(0x1CF7, 0x1CF9).addRange(0x1D2C, 0x1D6A).addRange(0x1DC4, 0x1DCF).addRange(0x1DF5, 0x1DF9).addRange(0x1DFD, 0x1DFF).addRange(0x1FBF, 0x1FC1).addRange(0x1FCD, 0x1FCF);
set.addRange(0x1FDD, 0x1FDF).addRange(0x1FED, 0x1FEF).addRange(0x1FFD, 0x1FFE).addRange(0x2CEF, 0x2CF1).addRange(0x302A, 0x302F).addRange(0x3099, 0x309C).addRange(0xA67C, 0xA67D).addRange(0xA69C, 0xA69D).addRange(0xA6F0, 0xA6F1).addRange(0xA700, 0xA721).addRange(0xA788, 0xA78A).addRange(0xA7F8, 0xA7F9).addRange(0xA8E0, 0xA8F1).addRange(0xA92B, 0xA92E).addRange(0xAA7B, 0xAA7D).addRange(0xAABF, 0xAAC2).addRange(0xAB5B, 0xAB5F).addRange(0xAB69, 0xAB6B).addRange(0xABEC, 0xABED).addRange(0xFE20, 0xFE2F).addRange(0xFF9E, 0xFF9F).addRange(0x10AE5, 0x10AE6).addRange(0x10D22, 0x10D27).addRange(0x10F46, 0x10F50).addRange(0x110B9, 0x110BA).addRange(0x11133, 0x11134).addRange(0x111CA, 0x111CC).addRange(0x11235, 0x11236).addRange(0x112E9, 0x112EA).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x114C2, 0x114C3).addRange(0x115BF, 0x115C0).addRange(0x116B6, 0x116B7).addRange(0x11839, 0x1183A).addRange(0x1193D, 0x1193E).addRange(0x11D44, 0x11D45).addRange(0x16AF0, 0x16AF4).addRange(0x16B30, 0x16B36).addRange(0x16F8F, 0x16F9F).addRange(0x16FF0, 0x16FF1).addRange(0x1D167, 0x1D169).addRange(0x1D16D, 0x1D172).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1E130, 0x1E136).addRange(0x1E2EC, 0x1E2EF).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E944, 0x1E946).addRange(0x1E948, 0x1E94A);
set;
module.exports = set;

/***/ }),
/* 607 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x23, 0x2A, 0xA9, 0xAE, 0x203C, 0x2049, 0x2122, 0x2139, 0x2328, 0x23CF, 0x24C2, 0x25B6, 0x25C0, 0x260E, 0x2611, 0x2618, 0x261D, 0x2620, 0x2626, 0x262A, 0x2640, 0x2642, 0x2663, 0x2668, 0x267B, 0x2699, 0x26A7, 0x26C8, 0x26D1, 0x26FD, 0x2702, 0x2705, 0x270F, 0x2712, 0x2714, 0x2716, 0x271D, 0x2721, 0x2728, 0x2744, 0x2747, 0x274C, 0x274E, 0x2757, 0x27A1, 0x27B0, 0x27BF, 0x2B50, 0x2B55, 0x3030, 0x303D, 0x3297, 0x3299, 0x1F004, 0x1F0CF, 0x1F18E, 0x1F21A, 0x1F22F, 0x1F587, 0x1F590, 0x1F5A8, 0x1F5BC, 0x1F5E1, 0x1F5E3, 0x1F5E8, 0x1F5EF, 0x1F5F3, 0x1F6E9, 0x1F6F0);

set.addRange(0x30, 0x39).addRange(0x2194, 0x2199).addRange(0x21A9, 0x21AA).addRange(0x231A, 0x231B).addRange(0x23E9, 0x23F3).addRange(0x23F8, 0x23FA).addRange(0x25AA, 0x25AB).addRange(0x25FB, 0x25FE).addRange(0x2600, 0x2604).addRange(0x2614, 0x2615).addRange(0x2622, 0x2623).addRange(0x262E, 0x262F).addRange(0x2638, 0x263A).addRange(0x2648, 0x2653).addRange(0x265F, 0x2660).addRange(0x2665, 0x2666).addRange(0x267E, 0x267F).addRange(0x2692, 0x2697).addRange(0x269B, 0x269C).addRange(0x26A0, 0x26A1).addRange(0x26AA, 0x26AB).addRange(0x26B0, 0x26B1).addRange(0x26BD, 0x26BE).addRange(0x26C4, 0x26C5).addRange(0x26CE, 0x26CF).addRange(0x26D3, 0x26D4).addRange(0x26E9, 0x26EA).addRange(0x26F0, 0x26F5).addRange(0x26F7, 0x26FA).addRange(0x2708, 0x270D).addRange(0x2733, 0x2734).addRange(0x2753, 0x2755).addRange(0x2763, 0x2764).addRange(0x2795, 0x2797).addRange(0x2934, 0x2935).addRange(0x2B05, 0x2B07).addRange(0x2B1B, 0x2B1C).addRange(0x1F170, 0x1F171).addRange(0x1F17E, 0x1F17F).addRange(0x1F191, 0x1F19A).addRange(0x1F1E6, 0x1F1FF).addRange(0x1F201, 0x1F202).addRange(0x1F232, 0x1F23A).addRange(0x1F250, 0x1F251).addRange(0x1F300, 0x1F321).addRange(0x1F324, 0x1F393).addRange(0x1F396, 0x1F397).addRange(0x1F399, 0x1F39B).addRange(0x1F39E, 0x1F3F0).addRange(0x1F3F3, 0x1F3F5).addRange(0x1F3F7, 0x1F4FD);
set.addRange(0x1F4FF, 0x1F53D).addRange(0x1F549, 0x1F54E).addRange(0x1F550, 0x1F567).addRange(0x1F56F, 0x1F570).addRange(0x1F573, 0x1F57A).addRange(0x1F58A, 0x1F58D).addRange(0x1F595, 0x1F596).addRange(0x1F5A4, 0x1F5A5).addRange(0x1F5B1, 0x1F5B2).addRange(0x1F5C2, 0x1F5C4).addRange(0x1F5D1, 0x1F5D3).addRange(0x1F5DC, 0x1F5DE).addRange(0x1F5FA, 0x1F64F).addRange(0x1F680, 0x1F6C5).addRange(0x1F6CB, 0x1F6D2).addRange(0x1F6D5, 0x1F6D7).addRange(0x1F6E0, 0x1F6E5).addRange(0x1F6EB, 0x1F6EC).addRange(0x1F6F3, 0x1F6FC).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F90C, 0x1F93A).addRange(0x1F93C, 0x1F945).addRange(0x1F947, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1F9FF).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6);
module.exports = set;

/***/ }),
/* 608 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x23, 0x2A, 0x200D, 0x20E3, 0xFE0F);

set.addRange(0x30, 0x39).addRange(0x1F1E6, 0x1F1FF).addRange(0x1F3FB, 0x1F3FF).addRange(0x1F9B0, 0x1F9B3).addRange(0xE0020, 0xE007F);
module.exports = set;

/***/ }),
/* 609 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1F3FB, 0x1F3FF);
module.exports = set;

/***/ }),
/* 610 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x261D, 0x26F9, 0x1F385, 0x1F3C7, 0x1F47C, 0x1F48F, 0x1F491, 0x1F4AA, 0x1F57A, 0x1F590, 0x1F6A3, 0x1F6C0, 0x1F6CC, 0x1F90C, 0x1F90F, 0x1F926, 0x1F977, 0x1F9BB);

set.addRange(0x270A, 0x270D).addRange(0x1F3C2, 0x1F3C4).addRange(0x1F3CA, 0x1F3CC).addRange(0x1F442, 0x1F443).addRange(0x1F446, 0x1F450).addRange(0x1F466, 0x1F478).addRange(0x1F481, 0x1F483).addRange(0x1F485, 0x1F487).addRange(0x1F574, 0x1F575).addRange(0x1F595, 0x1F596).addRange(0x1F645, 0x1F647).addRange(0x1F64B, 0x1F64F).addRange(0x1F6B4, 0x1F6B6).addRange(0x1F918, 0x1F91F).addRange(0x1F930, 0x1F939).addRange(0x1F93C, 0x1F93E).addRange(0x1F9B5, 0x1F9B6).addRange(0x1F9B8, 0x1F9B9).addRange(0x1F9CD, 0x1F9CF).addRange(0x1F9D1, 0x1F9DD);
module.exports = set;

/***/ }),
/* 611 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x23F0, 0x23F3, 0x267F, 0x2693, 0x26A1, 0x26CE, 0x26D4, 0x26EA, 0x26F5, 0x26FA, 0x26FD, 0x2705, 0x2728, 0x274C, 0x274E, 0x2757, 0x27B0, 0x27BF, 0x2B50, 0x2B55, 0x1F004, 0x1F0CF, 0x1F18E, 0x1F201, 0x1F21A, 0x1F22F, 0x1F3F4, 0x1F440, 0x1F57A, 0x1F5A4, 0x1F6CC);

set.addRange(0x231A, 0x231B).addRange(0x23E9, 0x23EC).addRange(0x25FD, 0x25FE).addRange(0x2614, 0x2615).addRange(0x2648, 0x2653).addRange(0x26AA, 0x26AB).addRange(0x26BD, 0x26BE).addRange(0x26C4, 0x26C5).addRange(0x26F2, 0x26F3).addRange(0x270A, 0x270B).addRange(0x2753, 0x2755).addRange(0x2795, 0x2797).addRange(0x2B1B, 0x2B1C).addRange(0x1F191, 0x1F19A).addRange(0x1F1E6, 0x1F1FF).addRange(0x1F232, 0x1F236).addRange(0x1F238, 0x1F23A).addRange(0x1F250, 0x1F251).addRange(0x1F300, 0x1F320).addRange(0x1F32D, 0x1F335).addRange(0x1F337, 0x1F37C).addRange(0x1F37E, 0x1F393).addRange(0x1F3A0, 0x1F3CA).addRange(0x1F3CF, 0x1F3D3).addRange(0x1F3E0, 0x1F3F0).addRange(0x1F3F8, 0x1F43E).addRange(0x1F442, 0x1F4FC).addRange(0x1F4FF, 0x1F53D).addRange(0x1F54B, 0x1F54E).addRange(0x1F550, 0x1F567).addRange(0x1F595, 0x1F596).addRange(0x1F5FB, 0x1F64F).addRange(0x1F680, 0x1F6C5).addRange(0x1F6D0, 0x1F6D2).addRange(0x1F6D5, 0x1F6D7).addRange(0x1F6EB, 0x1F6EC).addRange(0x1F6F4, 0x1F6FC).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F90C, 0x1F93A).addRange(0x1F93C, 0x1F945).addRange(0x1F947, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1F9FF).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6);
module.exports = set;

/***/ }),
/* 612 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA9, 0xAE, 0x203C, 0x2049, 0x2122, 0x2139, 0x2328, 0x2388, 0x23CF, 0x24C2, 0x25B6, 0x25C0, 0x2714, 0x2716, 0x271D, 0x2721, 0x2728, 0x2744, 0x2747, 0x274C, 0x274E, 0x2757, 0x27A1, 0x27B0, 0x27BF, 0x2B50, 0x2B55, 0x3030, 0x303D, 0x3297, 0x3299, 0x1F12F, 0x1F18E, 0x1F21A, 0x1F22F);

set.addRange(0x2194, 0x2199).addRange(0x21A9, 0x21AA).addRange(0x231A, 0x231B).addRange(0x23E9, 0x23F3).addRange(0x23F8, 0x23FA).addRange(0x25AA, 0x25AB).addRange(0x25FB, 0x25FE).addRange(0x2600, 0x2605).addRange(0x2607, 0x2612).addRange(0x2614, 0x2685).addRange(0x2690, 0x2705).addRange(0x2708, 0x2712).addRange(0x2733, 0x2734).addRange(0x2753, 0x2755).addRange(0x2763, 0x2767).addRange(0x2795, 0x2797).addRange(0x2934, 0x2935).addRange(0x2B05, 0x2B07).addRange(0x2B1B, 0x2B1C).addRange(0x1F000, 0x1F0FF).addRange(0x1F10D, 0x1F10F).addRange(0x1F16C, 0x1F171).addRange(0x1F17E, 0x1F17F).addRange(0x1F191, 0x1F19A).addRange(0x1F1AD, 0x1F1E5).addRange(0x1F201, 0x1F20F).addRange(0x1F232, 0x1F23A).addRange(0x1F23C, 0x1F23F).addRange(0x1F249, 0x1F3FA).addRange(0x1F400, 0x1F53D).addRange(0x1F546, 0x1F64F).addRange(0x1F680, 0x1F6FF).addRange(0x1F774, 0x1F77F).addRange(0x1F7D5, 0x1F7FF).addRange(0x1F80C, 0x1F80F).addRange(0x1F848, 0x1F84F).addRange(0x1F85A, 0x1F85F).addRange(0x1F888, 0x1F88F).addRange(0x1F8AE, 0x1F8FF).addRange(0x1F90C, 0x1F93A).addRange(0x1F93C, 0x1F945).addRange(0x1F947, 0x1FAFF).addRange(0x1FC00, 0x1FFFD);
module.exports = set;

/***/ }),
/* 613 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB7, 0x640, 0x7FA, 0xB55, 0xE46, 0xEC6, 0x180A, 0x1843, 0x1AA7, 0x1C36, 0x1C7B, 0x3005, 0xA015, 0xA60C, 0xA9CF, 0xA9E6, 0xAA70, 0xAADD, 0xFF70, 0x1135D, 0x11A98, 0x16FE3);

set.addRange(0x2D0, 0x2D1).addRange(0x3031, 0x3035).addRange(0x309D, 0x309E).addRange(0x30FC, 0x30FE).addRange(0xAAF3, 0xAAF4).addRange(0x115C6, 0x115C8).addRange(0x16B42, 0x16B43).addRange(0x16FE0, 0x16FE1).addRange(0x1E13C, 0x1E13D).addRange(0x1E944, 0x1E946);
module.exports = set;

/***/ }),
/* 614 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x38C, 0x5BE, 0x5C0, 0x5C3, 0x5C6, 0x61B, 0x6DE, 0x6E9, 0x710, 0x7B1, 0x81A, 0x824, 0x828, 0x85E, 0x93B, 0x9B2, 0x9BD, 0x9CE, 0xA03, 0xA5E, 0xA76, 0xA83, 0xAC9, 0xAD0, 0xAF9, 0xB3D, 0xB40, 0xB83, 0xB9C, 0xBBF, 0xBD0, 0xC3D, 0xCDE, 0xD3D, 0xDBD, 0xE84, 0xEA5, 0xEBD, 0xEC6, 0xF36, 0xF38, 0xF7F, 0xF85, 0x1031, 0x1038, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17B6, 0x18AA, 0x1940, 0x1A57, 0x1A61, 0x1B3B, 0x1BAA, 0x1BE7, 0x1BEE, 0x1CD3, 0x1CE1, 0x1CFA, 0x1F59, 0x1F5B, 0x1F5D, 0x2D27, 0x2D2D, 0xA673, 0xAA4D, 0xAAB1, 0xAAC0, 0xAAC2, 0xFB1D, 0xFB3E, 0x101A0, 0x1056F, 0x10808, 0x1083C, 0x1093F, 0x10EAD, 0x11000, 0x1112C, 0x11235, 0x11288, 0x1133D, 0x1133F, 0x11350, 0x11445, 0x1145D, 0x114B9, 0x114BE, 0x114C1, 0x115BE, 0x1163E, 0x116AC, 0x116B6, 0x116B8, 0x11726, 0x11838, 0x1183B, 0x11909, 0x1193D, 0x11A00, 0x11A50, 0x11A97, 0x11C3E, 0x11CA9, 0x11CB1, 0x11CB4, 0x11D46, 0x11D96, 0x11D98, 0x11FB0, 0x16AF5, 0x1BC9C, 0x1BC9F, 0x1D166, 0x1D245, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E2FF, 0x1E94B, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x20, 0x7E).addRange(0xA0, 0xAC).addRange(0xAE, 0x2FF).addRange(0x370, 0x377).addRange(0x37A, 0x37F).addRange(0x384, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x482).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x559, 0x58A).addRange(0x58D, 0x58F).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F4).addRange(0x606, 0x60F).addRange(0x61E, 0x64A).addRange(0x660, 0x66F).addRange(0x671, 0x6D5).addRange(0x6E5, 0x6E6).addRange(0x6EE, 0x70D).addRange(0x712, 0x72F).addRange(0x74D, 0x7A5).addRange(0x7C0, 0x7EA).addRange(0x7F4, 0x7FA).addRange(0x7FE, 0x815).addRange(0x830, 0x83E).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x903, 0x939).addRange(0x93D, 0x940).addRange(0x949, 0x94C).addRange(0x94E, 0x950).addRange(0x958, 0x961).addRange(0x964, 0x980).addRange(0x982, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BF, 0x9C0).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CC).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E1).addRange(0x9E6, 0x9FD).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28);
set.addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA40).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA6F).addRange(0xA72, 0xA74).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABD, 0xAC0).addRange(0xACB, 0xACC).addRange(0xAE0, 0xAE1).addRange(0xAE6, 0xAF1).addRange(0xB02, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4C).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB61).addRange(0xB66, 0xB77).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xBC1, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCC).addRange(0xBE6, 0xBFA).addRange(0xC01, 0xC03).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC41, 0xC44).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC61).addRange(0xC66, 0xC6F);
set.addRange(0xC77, 0xC80).addRange(0xC82, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBD, 0xCBE).addRange(0xCC0, 0xCC1).addRange(0xCC3, 0xCC4).addRange(0xCC7, 0xCC8).addRange(0xCCA, 0xCCB).addRange(0xCE0, 0xCE1).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2).addRange(0xD02, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD3F, 0xD40).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4C).addRange(0xD4E, 0xD4F).addRange(0xD54, 0xD56).addRange(0xD58, 0xD61).addRange(0xD66, 0xD7F).addRange(0xD82, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDD0, 0xDD1).addRange(0xDD8, 0xDDE).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF4).addRange(0xE01, 0xE30).addRange(0xE32, 0xE33).addRange(0xE3F, 0xE46).addRange(0xE4F, 0xE5B).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEB0).addRange(0xEB2, 0xEB3).addRange(0xEC0, 0xEC4).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF).addRange(0xF00, 0xF17).addRange(0xF1A, 0xF34).addRange(0xF3A, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF88, 0xF8C).addRange(0xFBE, 0xFC5);
set.addRange(0xFC7, 0xFCC).addRange(0xFCE, 0xFDA).addRange(0x1000, 0x102C).addRange(0x103B, 0x103C).addRange(0x103F, 0x1057).addRange(0x105A, 0x105D).addRange(0x1061, 0x1070).addRange(0x1075, 0x1081).addRange(0x1083, 0x1084).addRange(0x1087, 0x108C).addRange(0x108E, 0x109C).addRange(0x109E, 0x10C5).addRange(0x10D0, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1360, 0x137C).addRange(0x1380, 0x1399).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1400, 0x169C).addRange(0x16A0, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1711).addRange(0x1720, 0x1731).addRange(0x1735, 0x1736).addRange(0x1740, 0x1751).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1780, 0x17B3).addRange(0x17BE, 0x17C5).addRange(0x17C7, 0x17C8).addRange(0x17D4, 0x17DC).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x1800, 0x180A).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x1884).addRange(0x1887, 0x18A8).addRange(0x18B0, 0x18F5);
set.addRange(0x1900, 0x191E).addRange(0x1923, 0x1926).addRange(0x1929, 0x192B).addRange(0x1930, 0x1931).addRange(0x1933, 0x1938).addRange(0x1944, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x19DE, 0x1A16).addRange(0x1A19, 0x1A1A).addRange(0x1A1E, 0x1A55).addRange(0x1A63, 0x1A64).addRange(0x1A6D, 0x1A72).addRange(0x1A80, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AA0, 0x1AAD).addRange(0x1B04, 0x1B33).addRange(0x1B3D, 0x1B41).addRange(0x1B43, 0x1B4B).addRange(0x1B50, 0x1B6A).addRange(0x1B74, 0x1B7C).addRange(0x1B82, 0x1BA1).addRange(0x1BA6, 0x1BA7).addRange(0x1BAE, 0x1BE5).addRange(0x1BEA, 0x1BEC).addRange(0x1BF2, 0x1BF3).addRange(0x1BFC, 0x1C2B).addRange(0x1C34, 0x1C35).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CC7).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF7).addRange(0x1D00, 0x1DBF).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FC4).addRange(0x1FC6, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FDD, 0x1FEF).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFE);
set.addRange(0x2000, 0x200A).addRange(0x2010, 0x2027).addRange(0x202F, 0x205F).addRange(0x2070, 0x2071).addRange(0x2074, 0x208E).addRange(0x2090, 0x209C).addRange(0x20A0, 0x20BF).addRange(0x2100, 0x218B).addRange(0x2190, 0x2426).addRange(0x2440, 0x244A).addRange(0x2460, 0x2B73).addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2CF9, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D6F, 0x2D70).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x2E00, 0x2E52).addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x2FF0, 0x2FFB).addRange(0x3000, 0x3029).addRange(0x3030, 0x303F).addRange(0x3041, 0x3096).addRange(0x309B, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x3190, 0x31E3).addRange(0x31F0, 0x321E).addRange(0x3220, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA490, 0xA4C6).addRange(0xA4D0, 0xA62B).addRange(0xA640, 0xA66E).addRange(0xA67E, 0xA69D).addRange(0xA6A0, 0xA6EF).addRange(0xA6F2, 0xA6F7).addRange(0xA700, 0xA7BF).addRange(0xA7C2, 0xA7CA);
set.addRange(0xA7F5, 0xA801).addRange(0xA803, 0xA805).addRange(0xA807, 0xA80A).addRange(0xA80C, 0xA824).addRange(0xA827, 0xA82B).addRange(0xA830, 0xA839).addRange(0xA840, 0xA877).addRange(0xA880, 0xA8C3).addRange(0xA8CE, 0xA8D9).addRange(0xA8F2, 0xA8FE).addRange(0xA900, 0xA925).addRange(0xA92E, 0xA946).addRange(0xA952, 0xA953).addRange(0xA95F, 0xA97C).addRange(0xA983, 0xA9B2).addRange(0xA9B4, 0xA9B5).addRange(0xA9BA, 0xA9BB).addRange(0xA9BE, 0xA9CD).addRange(0xA9CF, 0xA9D9).addRange(0xA9DE, 0xA9E4).addRange(0xA9E6, 0xA9FE).addRange(0xAA00, 0xAA28).addRange(0xAA2F, 0xAA30).addRange(0xAA33, 0xAA34).addRange(0xAA40, 0xAA42).addRange(0xAA44, 0xAA4B).addRange(0xAA50, 0xAA59).addRange(0xAA5C, 0xAA7B).addRange(0xAA7D, 0xAAAF).addRange(0xAAB5, 0xAAB6).addRange(0xAAB9, 0xAABD).addRange(0xAADB, 0xAAEB).addRange(0xAAEE, 0xAAF5).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB6B).addRange(0xAB70, 0xABE4).addRange(0xABE6, 0xABE7).addRange(0xABE9, 0xABEC).addRange(0xABF0, 0xABF9).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1F, 0xFB36);
set.addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBC1).addRange(0xFBD3, 0xFD3F).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFD).addRange(0xFE10, 0xFE19).addRange(0xFE30, 0xFE52).addRange(0xFE54, 0xFE66).addRange(0xFE68, 0xFE6B).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF01, 0xFF9D).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0xFFE0, 0xFFE6).addRange(0xFFE8, 0xFFEE).addRange(0xFFFC, 0xFFFD).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10100, 0x10102).addRange(0x10107, 0x10133).addRange(0x10137, 0x1018E).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FC).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x102E1, 0x102FB).addRange(0x10300, 0x10323).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x10375).addRange(0x10380, 0x1039D).addRange(0x1039F, 0x103C3).addRange(0x103C8, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104A0, 0x104A9).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736);
set.addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10857, 0x1089E).addRange(0x108A7, 0x108AF).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x108FB, 0x1091B).addRange(0x1091F, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BC, 0x109CF).addRange(0x109D2, 0x10A00).addRange(0x10A10, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A40, 0x10A48).addRange(0x10A50, 0x10A58).addRange(0x10A60, 0x10A9F).addRange(0x10AC0, 0x10AE4).addRange(0x10AEB, 0x10AF6).addRange(0x10B00, 0x10B35).addRange(0x10B39, 0x10B55).addRange(0x10B58, 0x10B72).addRange(0x10B78, 0x10B91).addRange(0x10B99, 0x10B9C).addRange(0x10BA9, 0x10BAF).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10CFA, 0x10D23).addRange(0x10D30, 0x10D39).addRange(0x10E60, 0x10E7E).addRange(0x10E80, 0x10EA9).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F27).addRange(0x10F30, 0x10F45).addRange(0x10F51, 0x10F59).addRange(0x10FB0, 0x10FCB).addRange(0x10FE0, 0x10FF6).addRange(0x11002, 0x11037).addRange(0x11047, 0x1104D).addRange(0x11052, 0x1106F).addRange(0x11082, 0x110B2).addRange(0x110B7, 0x110B8).addRange(0x110BB, 0x110BC).addRange(0x110BE, 0x110C1).addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9);
set.addRange(0x11103, 0x11126).addRange(0x11136, 0x11147).addRange(0x11150, 0x11172).addRange(0x11174, 0x11176).addRange(0x11182, 0x111B5).addRange(0x111BF, 0x111C8).addRange(0x111CD, 0x111CE).addRange(0x111D0, 0x111DF).addRange(0x111E1, 0x111F4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1122E).addRange(0x11232, 0x11233).addRange(0x11238, 0x1123D).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A9).addRange(0x112B0, 0x112DE).addRange(0x112E0, 0x112E2).addRange(0x112F0, 0x112F9).addRange(0x11302, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x11341, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363).addRange(0x11400, 0x11437).addRange(0x11440, 0x11441).addRange(0x11447, 0x1145B).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114AF).addRange(0x114B1, 0x114B2).addRange(0x114BB, 0x114BC).addRange(0x114C4, 0x114C7).addRange(0x114D0, 0x114D9).addRange(0x11580, 0x115AE).addRange(0x115B0, 0x115B1).addRange(0x115B8, 0x115BB).addRange(0x115C1, 0x115DB).addRange(0x11600, 0x11632).addRange(0x1163B, 0x1163C).addRange(0x11641, 0x11644).addRange(0x11650, 0x11659).addRange(0x11660, 0x1166C).addRange(0x11680, 0x116AA).addRange(0x116AE, 0x116AF);
set.addRange(0x116C0, 0x116C9).addRange(0x11700, 0x1171A).addRange(0x11720, 0x11721).addRange(0x11730, 0x1173F).addRange(0x11800, 0x1182E).addRange(0x118A0, 0x118F2).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x1192F).addRange(0x11931, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193F, 0x11942).addRange(0x11944, 0x11946).addRange(0x11950, 0x11959).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D3).addRange(0x119DC, 0x119DF).addRange(0x119E1, 0x119E4).addRange(0x11A0B, 0x11A32).addRange(0x11A39, 0x11A3A).addRange(0x11A3F, 0x11A46).addRange(0x11A57, 0x11A58).addRange(0x11A5C, 0x11A89).addRange(0x11A9A, 0x11AA2).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C2F).addRange(0x11C40, 0x11C45).addRange(0x11C50, 0x11C6C).addRange(0x11C70, 0x11C8F).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D30).addRange(0x11D50, 0x11D59).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D93, 0x11D94).addRange(0x11DA0, 0x11DA9).addRange(0x11EE0, 0x11EF2).addRange(0x11EF5, 0x11EF8).addRange(0x11FC0, 0x11FF1).addRange(0x11FFF, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12470, 0x12474).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E);
set.addRange(0x16A60, 0x16A69).addRange(0x16A6E, 0x16A6F).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B37, 0x16B45).addRange(0x16B50, 0x16B59).addRange(0x16B5B, 0x16B61).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E9A).addRange(0x16F00, 0x16F4A).addRange(0x16F50, 0x16F87).addRange(0x16F93, 0x16F9F).addRange(0x16FE0, 0x16FE3).addRange(0x16FF0, 0x16FF1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D164).addRange(0x1D16A, 0x1D16D).addRange(0x1D183, 0x1D184).addRange(0x1D18C, 0x1D1A9).addRange(0x1D1AE, 0x1D1E8).addRange(0x1D200, 0x1D241).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D300, 0x1D356).addRange(0x1D360, 0x1D378).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544);
set.addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1D9FF).addRange(0x1DA37, 0x1DA3A).addRange(0x1DA6D, 0x1DA74).addRange(0x1DA76, 0x1DA83).addRange(0x1DA85, 0x1DA8B).addRange(0x1E100, 0x1E12C).addRange(0x1E137, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E14E, 0x1E14F).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E2F0, 0x1E2F9).addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8CF).addRange(0x1E900, 0x1E943).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F).addRange(0x1EC71, 0x1ECB4).addRange(0x1ED01, 0x1ED3D).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1EEF0, 0x1EEF1).addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093).addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F100, 0x1F1AD).addRange(0x1F1E6, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1F260, 0x1F265);
set.addRange(0x1F300, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773).addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92).addRange(0x1FB94, 0x1FBCA).addRange(0x1FBF0, 0x1FBF9).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 615 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5BF, 0x5C7, 0x670, 0x711, 0x7FD, 0x93A, 0x93C, 0x94D, 0x981, 0x9BC, 0x9BE, 0x9CD, 0x9D7, 0x9FE, 0xA3C, 0xA51, 0xA75, 0xABC, 0xACD, 0xB01, 0xB3C, 0xB4D, 0xB82, 0xBBE, 0xBC0, 0xBCD, 0xBD7, 0xC00, 0xC04, 0xC81, 0xCBC, 0xCBF, 0xCC2, 0xCC6, 0xD3E, 0xD4D, 0xD57, 0xD81, 0xDCA, 0xDCF, 0xDD6, 0xDDF, 0xE31, 0xEB1, 0xF35, 0xF37, 0xF39, 0xFC6, 0x1082, 0x108D, 0x109D, 0x17C6, 0x17DD, 0x18A9, 0x1932, 0x1A1B, 0x1A56, 0x1A60, 0x1A62, 0x1A7F, 0x1B3C, 0x1B42, 0x1BE6, 0x1BED, 0x1CED, 0x1CF4, 0x200C, 0x2D7F, 0xA802, 0xA806, 0xA80B, 0xA82C, 0xA8FF, 0xA9B3, 0xA9E5, 0xAA43, 0xAA4C, 0xAA7C, 0xAAB0, 0xAAC1, 0xAAF6, 0xABE5, 0xABE8, 0xABED, 0xFB1E, 0x101FD, 0x102E0, 0x10A3F, 0x11001, 0x11173, 0x111CF, 0x11234, 0x1123E, 0x112DF, 0x1133E, 0x11340, 0x11357, 0x11446, 0x1145E, 0x114B0, 0x114BA, 0x114BD, 0x115AF, 0x1163D, 0x116AB, 0x116AD, 0x116B7, 0x11930, 0x1193E, 0x11943, 0x119E0, 0x11A47, 0x11C3F, 0x11D3A, 0x11D47, 0x11D95, 0x11D97, 0x16F4F, 0x16FE4, 0x1D165, 0x1DA75, 0x1DA84);

set.addRange(0x300, 0x36F).addRange(0x483, 0x489).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x610, 0x61A).addRange(0x64B, 0x65F).addRange(0x6D6, 0x6DC).addRange(0x6DF, 0x6E4).addRange(0x6E7, 0x6E8).addRange(0x6EA, 0x6ED).addRange(0x730, 0x74A).addRange(0x7A6, 0x7B0).addRange(0x7EB, 0x7F3).addRange(0x816, 0x819).addRange(0x81B, 0x823).addRange(0x825, 0x827).addRange(0x829, 0x82D).addRange(0x859, 0x85B).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x902).addRange(0x941, 0x948).addRange(0x951, 0x957).addRange(0x962, 0x963).addRange(0x9C1, 0x9C4).addRange(0x9E2, 0x9E3).addRange(0xA01, 0xA02).addRange(0xA41, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA70, 0xA71).addRange(0xA81, 0xA82).addRange(0xAC1, 0xAC5).addRange(0xAC7, 0xAC8).addRange(0xAE2, 0xAE3).addRange(0xAFA, 0xAFF).addRange(0xB3E, 0xB3F).addRange(0xB41, 0xB44).addRange(0xB55, 0xB57).addRange(0xB62, 0xB63).addRange(0xC3E, 0xC40).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC62, 0xC63).addRange(0xCCC, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE2, 0xCE3).addRange(0xD00, 0xD01).addRange(0xD3B, 0xD3C).addRange(0xD41, 0xD44);
set.addRange(0xD62, 0xD63).addRange(0xDD2, 0xDD4).addRange(0xE34, 0xE3A).addRange(0xE47, 0xE4E).addRange(0xEB4, 0xEBC).addRange(0xEC8, 0xECD).addRange(0xF18, 0xF19).addRange(0xF71, 0xF7E).addRange(0xF80, 0xF84).addRange(0xF86, 0xF87).addRange(0xF8D, 0xF97).addRange(0xF99, 0xFBC).addRange(0x102D, 0x1030).addRange(0x1032, 0x1037).addRange(0x1039, 0x103A).addRange(0x103D, 0x103E).addRange(0x1058, 0x1059).addRange(0x105E, 0x1060).addRange(0x1071, 0x1074).addRange(0x1085, 0x1086).addRange(0x135D, 0x135F).addRange(0x1712, 0x1714).addRange(0x1732, 0x1734).addRange(0x1752, 0x1753).addRange(0x1772, 0x1773).addRange(0x17B4, 0x17B5).addRange(0x17B7, 0x17BD).addRange(0x17C9, 0x17D3).addRange(0x180B, 0x180D).addRange(0x1885, 0x1886).addRange(0x1920, 0x1922).addRange(0x1927, 0x1928).addRange(0x1939, 0x193B).addRange(0x1A17, 0x1A18).addRange(0x1A58, 0x1A5E).addRange(0x1A65, 0x1A6C).addRange(0x1A73, 0x1A7C).addRange(0x1AB0, 0x1AC0).addRange(0x1B00, 0x1B03).addRange(0x1B34, 0x1B3A).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1B81).addRange(0x1BA2, 0x1BA5).addRange(0x1BA8, 0x1BA9).addRange(0x1BAB, 0x1BAD).addRange(0x1BE8, 0x1BE9).addRange(0x1BEF, 0x1BF1).addRange(0x1C2C, 0x1C33).addRange(0x1C36, 0x1C37).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CE0);
set.addRange(0x1CE2, 0x1CE8).addRange(0x1CF8, 0x1CF9).addRange(0x1DC0, 0x1DF9).addRange(0x1DFB, 0x1DFF).addRange(0x20D0, 0x20F0).addRange(0x2CEF, 0x2CF1).addRange(0x2DE0, 0x2DFF).addRange(0x302A, 0x302F).addRange(0x3099, 0x309A).addRange(0xA66F, 0xA672).addRange(0xA674, 0xA67D).addRange(0xA69E, 0xA69F).addRange(0xA6F0, 0xA6F1).addRange(0xA825, 0xA826).addRange(0xA8C4, 0xA8C5).addRange(0xA8E0, 0xA8F1).addRange(0xA926, 0xA92D).addRange(0xA947, 0xA951).addRange(0xA980, 0xA982).addRange(0xA9B6, 0xA9B9).addRange(0xA9BC, 0xA9BD).addRange(0xAA29, 0xAA2E).addRange(0xAA31, 0xAA32).addRange(0xAA35, 0xAA36).addRange(0xAAB2, 0xAAB4).addRange(0xAAB7, 0xAAB8).addRange(0xAABE, 0xAABF).addRange(0xAAEC, 0xAAED).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2F).addRange(0xFF9E, 0xFF9F).addRange(0x10376, 0x1037A).addRange(0x10A01, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A0F).addRange(0x10A38, 0x10A3A).addRange(0x10AE5, 0x10AE6).addRange(0x10D24, 0x10D27).addRange(0x10EAB, 0x10EAC).addRange(0x10F46, 0x10F50).addRange(0x11038, 0x11046).addRange(0x1107F, 0x11081).addRange(0x110B3, 0x110B6).addRange(0x110B9, 0x110BA).addRange(0x11100, 0x11102).addRange(0x11127, 0x1112B).addRange(0x1112D, 0x11134).addRange(0x11180, 0x11181).addRange(0x111B6, 0x111BE).addRange(0x111C9, 0x111CC).addRange(0x1122F, 0x11231);
set.addRange(0x11236, 0x11237).addRange(0x112E3, 0x112EA).addRange(0x11300, 0x11301).addRange(0x1133B, 0x1133C).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11438, 0x1143F).addRange(0x11442, 0x11444).addRange(0x114B3, 0x114B8).addRange(0x114BF, 0x114C0).addRange(0x114C2, 0x114C3).addRange(0x115B2, 0x115B5).addRange(0x115BC, 0x115BD).addRange(0x115BF, 0x115C0).addRange(0x115DC, 0x115DD).addRange(0x11633, 0x1163A).addRange(0x1163F, 0x11640).addRange(0x116B0, 0x116B5).addRange(0x1171D, 0x1171F).addRange(0x11722, 0x11725).addRange(0x11727, 0x1172B).addRange(0x1182F, 0x11837).addRange(0x11839, 0x1183A).addRange(0x1193B, 0x1193C).addRange(0x119D4, 0x119D7).addRange(0x119DA, 0x119DB).addRange(0x11A01, 0x11A0A).addRange(0x11A33, 0x11A38).addRange(0x11A3B, 0x11A3E).addRange(0x11A51, 0x11A56).addRange(0x11A59, 0x11A5B).addRange(0x11A8A, 0x11A96).addRange(0x11A98, 0x11A99).addRange(0x11C30, 0x11C36).addRange(0x11C38, 0x11C3D).addRange(0x11C92, 0x11CA7).addRange(0x11CAA, 0x11CB0).addRange(0x11CB2, 0x11CB3).addRange(0x11CB5, 0x11CB6).addRange(0x11D31, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D45).addRange(0x11D90, 0x11D91).addRange(0x11EF3, 0x11EF4).addRange(0x16AF0, 0x16AF4).addRange(0x16B30, 0x16B36).addRange(0x16F8F, 0x16F92).addRange(0x1BC9D, 0x1BC9E).addRange(0x1D167, 0x1D169).addRange(0x1D16E, 0x1D172).addRange(0x1D17B, 0x1D182);
set.addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244).addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E130, 0x1E136).addRange(0x1E2EC, 0x1E2EF).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E944, 0x1E94A).addRange(0xE0020, 0xE007F).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 616 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x30, 0x39).addRange(0x41, 0x46).addRange(0x61, 0x66).addRange(0xFF10, 0xFF19).addRange(0xFF21, 0xFF26).addRange(0xFF41, 0xFF46);
module.exports = set;

/***/ }),
/* 617 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2FF0, 0x2FF1).addRange(0x2FF4, 0x2FFB);
module.exports = set;

/***/ }),
/* 618 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2FF2, 0x2FF3);
module.exports = set;

/***/ }),
/* 619 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5F, 0xAA, 0xB5, 0xB7, 0xBA, 0x2EC, 0x2EE, 0x37F, 0x38C, 0x559, 0x5BF, 0x5C7, 0x6FF, 0x7FA, 0x7FD, 0x9B2, 0x9D7, 0x9FC, 0x9FE, 0xA3C, 0xA51, 0xA5E, 0xAD0, 0xB71, 0xB9C, 0xBD0, 0xBD7, 0xCDE, 0xDBD, 0xDCA, 0xDD6, 0xE84, 0xEA5, 0xEC6, 0xF00, 0xF35, 0xF37, 0xF39, 0xFC6, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x1AA7, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2054, 0x2071, 0x207F, 0x20E1, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0xA82C, 0xA8FB, 0xFB3E, 0xFF3F, 0x101FD, 0x102E0, 0x10808, 0x1083C, 0x10A3F, 0x10F27, 0x11176, 0x111DC, 0x1123E, 0x11288, 0x11350, 0x11357, 0x114C7, 0x11644, 0x11909, 0x11A47, 0x11A9D, 0x11D3A, 0x11FB0, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1DA75, 0x1DA84, 0x1E14E, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x300, 0x374).addRange(0x376, 0x377).addRange(0x37A, 0x37D).addRange(0x386, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x483, 0x487).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x610, 0x61A).addRange(0x620, 0x669).addRange(0x66E, 0x6D3).addRange(0x6D5, 0x6DC).addRange(0x6DF, 0x6E8).addRange(0x6EA, 0x6FC).addRange(0x710, 0x74A).addRange(0x74D, 0x7B1).addRange(0x7C0, 0x7F5).addRange(0x800, 0x82D).addRange(0x840, 0x85B).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x963).addRange(0x966, 0x96F).addRange(0x971, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BC, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CE).addRange(0x9DC, 0x9DD);
set.addRange(0x9DF, 0x9E3).addRange(0x9E6, 0x9F1).addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA75).addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABC, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE0, 0xAE3).addRange(0xAE6, 0xAEF).addRange(0xAF9, 0xAFF).addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3C, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB66, 0xB6F).addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9);
set.addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xBE6, 0xBEF).addRange(0xC00, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC66, 0xC6F).addRange(0xC80, 0xC83).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBC, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2).addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4E).addRange(0xD54, 0xD57).addRange(0xD5F, 0xD63).addRange(0xD66, 0xD6F).addRange(0xD7A, 0xD7F).addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF3).addRange(0xE01, 0xE3A).addRange(0xE40, 0xE4E).addRange(0xE50, 0xE59).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A);
set.addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEC8, 0xECD).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF).addRange(0xF18, 0xF19).addRange(0xF20, 0xF29).addRange(0xF3E, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF84).addRange(0xF86, 0xF97).addRange(0xF99, 0xFBC).addRange(0x1000, 0x1049).addRange(0x1050, 0x109D).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x135D, 0x135F).addRange(0x1369, 0x1371).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1714).addRange(0x1720, 0x1734).addRange(0x1740, 0x1753).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773).addRange(0x1780, 0x17D3).addRange(0x17DC, 0x17DD).addRange(0x17E0, 0x17E9);
set.addRange(0x180B, 0x180D).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1946, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x1A00, 0x1A1B).addRange(0x1A20, 0x1A5E).addRange(0x1A60, 0x1A7C).addRange(0x1A7F, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AB0, 0x1ABD).addRange(0x1ABF, 0x1AC0).addRange(0x1B00, 0x1B4B).addRange(0x1B50, 0x1B59).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1BF3).addRange(0x1C00, 0x1C37).addRange(0x1C40, 0x1C49).addRange(0x1C4D, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CFA).addRange(0x1D00, 0x1DF9).addRange(0x1DFB, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x203F, 0x2040).addRange(0x2090, 0x209C).addRange(0x20D0, 0x20DC);
set.addRange(0x20E5, 0x20F0).addRange(0x210A, 0x2113).addRange(0x2118, 0x211D).addRange(0x212A, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2160, 0x2188).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D7F, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x2DE0, 0x2DFF).addRange(0x3005, 0x3007).addRange(0x3021, 0x302F).addRange(0x3031, 0x3035).addRange(0x3038, 0x303C).addRange(0x3041, 0x3096).addRange(0x3099, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA62B).addRange(0xA640, 0xA66F).addRange(0xA674, 0xA67D).addRange(0xA67F, 0xA6F1).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA827).addRange(0xA840, 0xA873).addRange(0xA880, 0xA8C5);
set.addRange(0xA8D0, 0xA8D9).addRange(0xA8E0, 0xA8F7).addRange(0xA8FD, 0xA92D).addRange(0xA930, 0xA953).addRange(0xA960, 0xA97C).addRange(0xA980, 0xA9C0).addRange(0xA9CF, 0xA9D9).addRange(0xA9E0, 0xA9FE).addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA60, 0xAA76).addRange(0xAA7A, 0xAAC2).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEF).addRange(0xAAF2, 0xAAF6).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABEA).addRange(0xABEC, 0xABED).addRange(0xABF0, 0xABF9).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1D, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFB).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2F).addRange(0xFE33, 0xFE34).addRange(0xFE4D, 0xFE4F).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF10, 0xFF19).addRange(0xFF21, 0xFF3A);
set.addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10140, 0x10174).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x1037A).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x103D1, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104A0, 0x104A9).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A).addRange(0x10A60, 0x10A7C);
set.addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE6).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAC).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F50).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11000, 0x11046).addRange(0x11066, 0x1106F).addRange(0x1107F, 0x110BA).addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9).addRange(0x11100, 0x11134).addRange(0x11136, 0x1113F).addRange(0x11144, 0x11147).addRange(0x11150, 0x11173).addRange(0x11180, 0x111C4).addRange(0x111C9, 0x111CC).addRange(0x111CE, 0x111DA).addRange(0x11200, 0x11211).addRange(0x11213, 0x11237).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9).addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133B, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363).addRange(0x11366, 0x1136C);
set.addRange(0x11370, 0x11374).addRange(0x11400, 0x1144A).addRange(0x11450, 0x11459).addRange(0x1145E, 0x11461).addRange(0x11480, 0x114C5).addRange(0x114D0, 0x114D9).addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115C0).addRange(0x115D8, 0x115DD).addRange(0x11600, 0x11640).addRange(0x11650, 0x11659).addRange(0x11680, 0x116B8).addRange(0x116C0, 0x116C9).addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x11739).addRange(0x11800, 0x1183A).addRange(0x118A0, 0x118E9).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x11943).addRange(0x11950, 0x11959).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119E1).addRange(0x119E3, 0x119E4).addRange(0x11A00, 0x11A3E).addRange(0x11A50, 0x11A99).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C40).addRange(0x11C50, 0x11C59).addRange(0x11C72, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D47).addRange(0x11D50, 0x11D59).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D98).addRange(0x11DA0, 0x11DA9);
set.addRange(0x11EE0, 0x11EF6).addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF4).addRange(0x16B00, 0x16B36).addRange(0x16B40, 0x16B43).addRange(0x16B50, 0x16B59).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x16FE3, 0x16FE4).addRange(0x16FF0, 0x16FF1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1BC9D, 0x1BC9E).addRange(0x1D165, 0x1D169).addRange(0x1D16D, 0x1D172).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514);
set.addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E2C0, 0x1E2F9).addRange(0x1E800, 0x1E8C4).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9);
set.addRange(0x1EEAB, 0x1EEBB).addRange(0x1FBF0, 0x1FBF9).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 620 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x2EC, 0x2EE, 0x37F, 0x386, 0x38C, 0x559, 0x6D5, 0x6FF, 0x710, 0x7B1, 0x7FA, 0x81A, 0x824, 0x828, 0x93D, 0x950, 0x9B2, 0x9BD, 0x9CE, 0x9FC, 0xA5E, 0xABD, 0xAD0, 0xAF9, 0xB3D, 0xB71, 0xB83, 0xB9C, 0xBD0, 0xC3D, 0xC80, 0xCBD, 0xCDE, 0xD3D, 0xD4E, 0xDBD, 0xE84, 0xEA5, 0xEBD, 0xEC6, 0xF00, 0x103F, 0x1061, 0x108E, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x17DC, 0x18AA, 0x1AA7, 0x1CFA, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2071, 0x207F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0xA8FB, 0xA9CF, 0xAA7A, 0xAAB1, 0xAAC0, 0xAAC2, 0xFB1D, 0xFB3E, 0x10808, 0x1083C, 0x10A00, 0x10F27, 0x11144, 0x11147, 0x11176, 0x111DA, 0x111DC, 0x11288, 0x1133D, 0x11350, 0x114C7, 0x11644, 0x116B8, 0x11909, 0x1193F, 0x11941, 0x119E1, 0x119E3, 0x11A00, 0x11A3A, 0x11A50, 0x11A9D, 0x11C40, 0x11D46, 0x11D98, 0x11FB0, 0x16F50, 0x16FE3, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E14E, 0x1E94B, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x370, 0x374).addRange(0x376, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x620, 0x64A).addRange(0x66E, 0x66F).addRange(0x671, 0x6D3).addRange(0x6E5, 0x6E6).addRange(0x6EE, 0x6EF).addRange(0x6FA, 0x6FC).addRange(0x712, 0x72F).addRange(0x74D, 0x7A5).addRange(0x7CA, 0x7EA).addRange(0x7F4, 0x7F5).addRange(0x800, 0x815).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x904, 0x939).addRange(0x958, 0x961).addRange(0x971, 0x980).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E1).addRange(0x9F0, 0x9F1).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36);
set.addRange(0xA38, 0xA39).addRange(0xA59, 0xA5C).addRange(0xA72, 0xA74).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xAE0, 0xAE1).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB61).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC61).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCE0, 0xCE1).addRange(0xCF1, 0xCF2).addRange(0xD04, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD54, 0xD56).addRange(0xD5F, 0xD61).addRange(0xD7A, 0xD7F).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xE01, 0xE30).addRange(0xE32, 0xE33);
set.addRange(0xE40, 0xE46).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEB0).addRange(0xEB2, 0xEB3).addRange(0xEC0, 0xEC4).addRange(0xEDC, 0xEDF).addRange(0xF40, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF88, 0xF8C).addRange(0x1000, 0x102A).addRange(0x1050, 0x1055).addRange(0x105A, 0x105D).addRange(0x1065, 0x1066).addRange(0x106E, 0x1070).addRange(0x1075, 0x1081).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1711).addRange(0x1720, 0x1731).addRange(0x1740, 0x1751).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1780, 0x17B3).addRange(0x1820, 0x1878).addRange(0x1880, 0x18A8).addRange(0x18B0, 0x18F5);
set.addRange(0x1900, 0x191E).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x1A00, 0x1A16).addRange(0x1A20, 0x1A54).addRange(0x1B05, 0x1B33).addRange(0x1B45, 0x1B4B).addRange(0x1B83, 0x1BA0).addRange(0x1BAE, 0x1BAF).addRange(0x1BBA, 0x1BE5).addRange(0x1C00, 0x1C23).addRange(0x1C4D, 0x1C4F).addRange(0x1C5A, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF6).addRange(0x1D00, 0x1DBF).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x2090, 0x209C).addRange(0x210A, 0x2113).addRange(0x2118, 0x211D).addRange(0x212A, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2160, 0x2188).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67);
set.addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x3005, 0x3007).addRange(0x3021, 0x3029).addRange(0x3031, 0x3035).addRange(0x3038, 0x303C).addRange(0x3041, 0x3096).addRange(0x309B, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA61F).addRange(0xA62A, 0xA62B).addRange(0xA640, 0xA66E).addRange(0xA67F, 0xA69D).addRange(0xA6A0, 0xA6EF).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA801).addRange(0xA803, 0xA805).addRange(0xA807, 0xA80A).addRange(0xA80C, 0xA822).addRange(0xA840, 0xA873).addRange(0xA882, 0xA8B3).addRange(0xA8F2, 0xA8F7).addRange(0xA8FD, 0xA8FE).addRange(0xA90A, 0xA925).addRange(0xA930, 0xA946).addRange(0xA960, 0xA97C).addRange(0xA984, 0xA9B2).addRange(0xA9E0, 0xA9E4).addRange(0xA9E6, 0xA9EF).addRange(0xA9FA, 0xA9FE).addRange(0xAA00, 0xAA28);
set.addRange(0xAA40, 0xAA42).addRange(0xAA44, 0xAA4B).addRange(0xAA60, 0xAA76).addRange(0xAA7E, 0xAAAF).addRange(0xAAB5, 0xAAB6).addRange(0xAAB9, 0xAABD).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEA).addRange(0xAAF2, 0xAAF4).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABE2).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1F, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFB).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10140, 0x10174);
set.addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x10375).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x103D1, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A10, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE4).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D23).addRange(0x10E80, 0x10EA9).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F45).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11003, 0x11037);
set.addRange(0x11083, 0x110AF).addRange(0x110D0, 0x110E8).addRange(0x11103, 0x11126).addRange(0x11150, 0x11172).addRange(0x11183, 0x111B2).addRange(0x111C1, 0x111C4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1122B).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112DE).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1135D, 0x11361).addRange(0x11400, 0x11434).addRange(0x11447, 0x1144A).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114AF).addRange(0x114C4, 0x114C5).addRange(0x11580, 0x115AE).addRange(0x115D8, 0x115DB).addRange(0x11600, 0x1162F).addRange(0x11680, 0x116AA).addRange(0x11700, 0x1171A).addRange(0x11800, 0x1182B).addRange(0x118A0, 0x118DF).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x1192F).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D0).addRange(0x11A0B, 0x11A32).addRange(0x11A5C, 0x11A89).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C2E).addRange(0x11C72, 0x11C8F).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D30).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D89).addRange(0x11EE0, 0x11EF2);
set.addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B40, 0x16B43).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F93, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788);
set.addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E100, 0x1E12C).addRange(0x1E137, 0x1E13D).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E800, 0x1E8C4).addRange(0x1E900, 0x1E943).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 621 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE4);

set.addRange(0x3006, 0x3007).addRange(0x3021, 0x3029).addRange(0x3038, 0x303A).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B170, 0x1B2FB).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 622 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x200C, 0x200D);
module.exports = set;

/***/ }),
/* 623 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x19BA, 0xAAB9);

set.addRange(0xE40, 0xE44).addRange(0xEC0, 0xEC4).addRange(0x19B5, 0x19B7).addRange(0xAAB5, 0xAAB6).addRange(0xAABB, 0xAABC);
module.exports = set;

/***/ }),
/* 624 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x101, 0x103, 0x105, 0x107, 0x109, 0x10B, 0x10D, 0x10F, 0x111, 0x113, 0x115, 0x117, 0x119, 0x11B, 0x11D, 0x11F, 0x121, 0x123, 0x125, 0x127, 0x129, 0x12B, 0x12D, 0x12F, 0x131, 0x133, 0x135, 0x13A, 0x13C, 0x13E, 0x140, 0x142, 0x144, 0x146, 0x14B, 0x14D, 0x14F, 0x151, 0x153, 0x155, 0x157, 0x159, 0x15B, 0x15D, 0x15F, 0x161, 0x163, 0x165, 0x167, 0x169, 0x16B, 0x16D, 0x16F, 0x171, 0x173, 0x175, 0x177, 0x17A, 0x17C, 0x183, 0x185, 0x188, 0x192, 0x195, 0x19E, 0x1A1, 0x1A3, 0x1A5, 0x1A8, 0x1AD, 0x1B0, 0x1B4, 0x1B6, 0x1C6, 0x1C9, 0x1CC, 0x1CE, 0x1D0, 0x1D2, 0x1D4, 0x1D6, 0x1D8, 0x1DA, 0x1DF, 0x1E1, 0x1E3, 0x1E5, 0x1E7, 0x1E9, 0x1EB, 0x1ED, 0x1F3, 0x1F5, 0x1F9, 0x1FB, 0x1FD, 0x1FF, 0x201, 0x203, 0x205, 0x207, 0x209, 0x20B, 0x20D, 0x20F, 0x211, 0x213, 0x215, 0x217, 0x219, 0x21B, 0x21D, 0x21F, 0x221, 0x223, 0x225, 0x227, 0x229, 0x22B, 0x22D, 0x22F, 0x231, 0x23C, 0x242, 0x247, 0x249, 0x24B, 0x24D, 0x345, 0x371, 0x373, 0x377, 0x390, 0x3D9, 0x3DB, 0x3DD, 0x3DF, 0x3E1, 0x3E3, 0x3E5, 0x3E7, 0x3E9, 0x3EB, 0x3ED, 0x3F5, 0x3F8, 0x461, 0x463, 0x465, 0x467, 0x469, 0x46B, 0x46D, 0x46F, 0x471, 0x473, 0x475, 0x477, 0x479, 0x47B, 0x47D, 0x47F, 0x481, 0x48B, 0x48D, 0x48F, 0x491, 0x493, 0x495, 0x497, 0x499, 0x49B, 0x49D, 0x49F, 0x4A1, 0x4A3, 0x4A5, 0x4A7, 0x4A9, 0x4AB, 0x4AD, 0x4AF, 0x4B1, 0x4B3, 0x4B5, 0x4B7, 0x4B9, 0x4BB, 0x4BD, 0x4BF, 0x4C2, 0x4C4, 0x4C6, 0x4C8, 0x4CA, 0x4CC, 0x4D1, 0x4D3, 0x4D5, 0x4D7, 0x4D9, 0x4DB, 0x4DD, 0x4DF, 0x4E1, 0x4E3, 0x4E5, 0x4E7, 0x4E9, 0x4EB, 0x4ED, 0x4EF, 0x4F1, 0x4F3, 0x4F5, 0x4F7, 0x4F9, 0x4FB, 0x4FD, 0x4FF, 0x501, 0x503, 0x505, 0x507, 0x509, 0x50B, 0x50D, 0x50F, 0x511, 0x513, 0x515, 0x517, 0x519, 0x51B, 0x51D, 0x51F, 0x521, 0x523, 0x525, 0x527, 0x529, 0x52B, 0x52D, 0x52F, 0x1E01, 0x1E03, 0x1E05, 0x1E07, 0x1E09, 0x1E0B, 0x1E0D, 0x1E0F, 0x1E11, 0x1E13, 0x1E15, 0x1E17, 0x1E19, 0x1E1B, 0x1E1D, 0x1E1F, 0x1E21, 0x1E23, 0x1E25, 0x1E27, 0x1E29, 0x1E2B, 0x1E2D, 0x1E2F, 0x1E31, 0x1E33, 0x1E35, 0x1E37, 0x1E39, 0x1E3B, 0x1E3D, 0x1E3F, 0x1E41, 0x1E43, 0x1E45, 0x1E47, 0x1E49, 0x1E4B, 0x1E4D, 0x1E4F, 0x1E51, 0x1E53, 0x1E55, 0x1E57, 0x1E59, 0x1E5B, 0x1E5D, 0x1E5F, 0x1E61, 0x1E63, 0x1E65, 0x1E67, 0x1E69, 0x1E6B, 0x1E6D, 0x1E6F, 0x1E71, 0x1E73, 0x1E75, 0x1E77, 0x1E79, 0x1E7B, 0x1E7D, 0x1E7F, 0x1E81, 0x1E83, 0x1E85, 0x1E87, 0x1E89, 0x1E8B, 0x1E8D, 0x1E8F, 0x1E91, 0x1E93, 0x1E9F, 0x1EA1, 0x1EA3, 0x1EA5, 0x1EA7, 0x1EA9, 0x1EAB, 0x1EAD, 0x1EAF, 0x1EB1, 0x1EB3, 0x1EB5, 0x1EB7, 0x1EB9, 0x1EBB, 0x1EBD, 0x1EBF, 0x1EC1, 0x1EC3, 0x1EC5, 0x1EC7, 0x1EC9, 0x1ECB, 0x1ECD, 0x1ECF, 0x1ED1, 0x1ED3, 0x1ED5, 0x1ED7, 0x1ED9, 0x1EDB, 0x1EDD, 0x1EDF, 0x1EE1, 0x1EE3, 0x1EE5, 0x1EE7, 0x1EE9, 0x1EEB, 0x1EED, 0x1EEF, 0x1EF1, 0x1EF3, 0x1EF5, 0x1EF7, 0x1EF9, 0x1EFB, 0x1EFD, 0x1FBE, 0x2071, 0x207F, 0x210A, 0x2113, 0x212F, 0x2134, 0x2139, 0x214E, 0x2184, 0x2C61, 0x2C68, 0x2C6A, 0x2C6C, 0x2C71, 0x2C81, 0x2C83, 0x2C85, 0x2C87, 0x2C89, 0x2C8B, 0x2C8D, 0x2C8F, 0x2C91, 0x2C93, 0x2C95, 0x2C97, 0x2C99, 0x2C9B, 0x2C9D, 0x2C9F, 0x2CA1, 0x2CA3, 0x2CA5, 0x2CA7, 0x2CA9, 0x2CAB, 0x2CAD, 0x2CAF, 0x2CB1, 0x2CB3, 0x2CB5, 0x2CB7, 0x2CB9, 0x2CBB, 0x2CBD, 0x2CBF, 0x2CC1, 0x2CC3, 0x2CC5, 0x2CC7, 0x2CC9, 0x2CCB, 0x2CCD, 0x2CCF, 0x2CD1, 0x2CD3, 0x2CD5, 0x2CD7, 0x2CD9, 0x2CDB, 0x2CDD, 0x2CDF, 0x2CE1, 0x2CEC, 0x2CEE, 0x2CF3, 0x2D27, 0x2D2D, 0xA641, 0xA643, 0xA645, 0xA647, 0xA649, 0xA64B, 0xA64D, 0xA64F, 0xA651, 0xA653, 0xA655, 0xA657, 0xA659, 0xA65B, 0xA65D, 0xA65F, 0xA661, 0xA663, 0xA665, 0xA667, 0xA669, 0xA66B, 0xA66D, 0xA681, 0xA683, 0xA685, 0xA687, 0xA689, 0xA68B, 0xA68D, 0xA68F, 0xA691, 0xA693, 0xA695, 0xA697, 0xA699, 0xA723, 0xA725, 0xA727, 0xA729, 0xA72B, 0xA72D, 0xA733, 0xA735, 0xA737, 0xA739, 0xA73B, 0xA73D, 0xA73F, 0xA741, 0xA743, 0xA745, 0xA747, 0xA749, 0xA74B, 0xA74D, 0xA74F, 0xA751, 0xA753, 0xA755, 0xA757, 0xA759, 0xA75B, 0xA75D, 0xA75F, 0xA761, 0xA763, 0xA765, 0xA767, 0xA769, 0xA76B, 0xA76D, 0xA77A, 0xA77C, 0xA77F, 0xA781, 0xA783, 0xA785, 0xA787, 0xA78C, 0xA78E, 0xA791, 0xA797, 0xA799, 0xA79B, 0xA79D, 0xA79F, 0xA7A1, 0xA7A3, 0xA7A5, 0xA7A7, 0xA7A9, 0xA7AF, 0xA7B5, 0xA7B7, 0xA7B9, 0xA7BB, 0xA7BD, 0xA7BF, 0xA7C3, 0xA7C8, 0xA7CA, 0xA7F6, 0x1D4BB, 0x1D7CB);

set.addRange(0x61, 0x7A).addRange(0xDF, 0xF6).addRange(0xF8, 0xFF).addRange(0x137, 0x138).addRange(0x148, 0x149).addRange(0x17E, 0x180).addRange(0x18C, 0x18D).addRange(0x199, 0x19B).addRange(0x1AA, 0x1AB).addRange(0x1B9, 0x1BA).addRange(0x1BD, 0x1BF).addRange(0x1DC, 0x1DD).addRange(0x1EF, 0x1F0).addRange(0x233, 0x239).addRange(0x23F, 0x240).addRange(0x24F, 0x293).addRange(0x295, 0x2B8).addRange(0x2C0, 0x2C1).addRange(0x2E0, 0x2E4).addRange(0x37A, 0x37D).addRange(0x3AC, 0x3CE).addRange(0x3D0, 0x3D1).addRange(0x3D5, 0x3D7).addRange(0x3EF, 0x3F3).addRange(0x3FB, 0x3FC).addRange(0x430, 0x45F).addRange(0x4CE, 0x4CF).addRange(0x560, 0x588).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1D00, 0x1DBF).addRange(0x1E95, 0x1E9D).addRange(0x1EFF, 0x1F07).addRange(0x1F10, 0x1F15).addRange(0x1F20, 0x1F27).addRange(0x1F30, 0x1F37).addRange(0x1F40, 0x1F45).addRange(0x1F50, 0x1F57).addRange(0x1F60, 0x1F67).addRange(0x1F70, 0x1F7D).addRange(0x1F80, 0x1F87).addRange(0x1F90, 0x1F97).addRange(0x1FA0, 0x1FA7).addRange(0x1FB0, 0x1FB4).addRange(0x1FB6, 0x1FB7).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FC7).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FD7);
set.addRange(0x1FE0, 0x1FE7).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FF7).addRange(0x2090, 0x209C).addRange(0x210E, 0x210F).addRange(0x213C, 0x213D).addRange(0x2146, 0x2149).addRange(0x2170, 0x217F).addRange(0x24D0, 0x24E9).addRange(0x2C30, 0x2C5E).addRange(0x2C65, 0x2C66).addRange(0x2C73, 0x2C74).addRange(0x2C76, 0x2C7D).addRange(0x2CE3, 0x2CE4).addRange(0x2D00, 0x2D25).addRange(0xA69B, 0xA69D).addRange(0xA72F, 0xA731).addRange(0xA76F, 0xA778).addRange(0xA793, 0xA795).addRange(0xA7F8, 0xA7FA).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB68).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF41, 0xFF5A).addRange(0x10428, 0x1044F).addRange(0x104D8, 0x104FB).addRange(0x10CC0, 0x10CF2).addRange(0x118C0, 0x118DF).addRange(0x16E60, 0x16E7F).addRange(0x1D41A, 0x1D433).addRange(0x1D44E, 0x1D454).addRange(0x1D456, 0x1D467).addRange(0x1D482, 0x1D49B).addRange(0x1D4B6, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D4CF).addRange(0x1D4EA, 0x1D503).addRange(0x1D51E, 0x1D537).addRange(0x1D552, 0x1D56B).addRange(0x1D586, 0x1D59F).addRange(0x1D5BA, 0x1D5D3).addRange(0x1D5EE, 0x1D607).addRange(0x1D622, 0x1D63B).addRange(0x1D656, 0x1D66F).addRange(0x1D68A, 0x1D6A5).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6E1).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D71B);
set.addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D755).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D78F).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7C9).addRange(0x1E922, 0x1E943);
module.exports = set;

/***/ }),
/* 625 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2B, 0x5E, 0x7C, 0x7E, 0xAC, 0xB1, 0xD7, 0xF7, 0x3D5, 0x2016, 0x2040, 0x2044, 0x2052, 0x20E1, 0x2102, 0x2107, 0x2115, 0x2124, 0x214B, 0x21DD, 0x237C, 0x23B7, 0x23D0, 0x25E2, 0x25E4, 0x2640, 0x2642, 0xFB29, 0xFE68, 0xFF0B, 0xFF3C, 0xFF3E, 0xFF5C, 0xFF5E, 0xFFE2, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x3C, 0x3E).addRange(0x3D0, 0x3D2).addRange(0x3F0, 0x3F1).addRange(0x3F4, 0x3F6).addRange(0x606, 0x608).addRange(0x2032, 0x2034).addRange(0x2061, 0x2064).addRange(0x207A, 0x207E).addRange(0x208A, 0x208E).addRange(0x20D0, 0x20DC).addRange(0x20E5, 0x20E6).addRange(0x20EB, 0x20EF).addRange(0x210A, 0x2113).addRange(0x2118, 0x211D).addRange(0x2128, 0x2129).addRange(0x212C, 0x212D).addRange(0x212F, 0x2131).addRange(0x2133, 0x2138).addRange(0x213C, 0x2149).addRange(0x2190, 0x21A7).addRange(0x21A9, 0x21AE).addRange(0x21B0, 0x21B1).addRange(0x21B6, 0x21B7).addRange(0x21BC, 0x21DB).addRange(0x21E4, 0x21E5).addRange(0x21F4, 0x22FF).addRange(0x2308, 0x230B).addRange(0x2320, 0x2321).addRange(0x239B, 0x23B5).addRange(0x23DC, 0x23E2).addRange(0x25A0, 0x25A1).addRange(0x25AE, 0x25B7).addRange(0x25BC, 0x25C1).addRange(0x25C6, 0x25C7).addRange(0x25CA, 0x25CB).addRange(0x25CF, 0x25D3).addRange(0x25E7, 0x25EC).addRange(0x25F8, 0x25FF).addRange(0x2605, 0x2606).addRange(0x2660, 0x2663).addRange(0x266D, 0x266F).addRange(0x27C0, 0x27FF).addRange(0x2900, 0x2AFF).addRange(0x2B30, 0x2B44).addRange(0x2B47, 0x2B4C).addRange(0xFE61, 0xFE66).addRange(0xFF1C, 0xFF1E).addRange(0xFFE9, 0xFFEC).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F);
set.addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1EEF0, 0x1EEF1);
module.exports = set;

/***/ }),
/* 626 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xFDD0, 0xFDEF).addRange(0xFFFE, 0xFFFF).addRange(0x1FFFE, 0x1FFFF).addRange(0x2FFFE, 0x2FFFF).addRange(0x3FFFE, 0x3FFFF).addRange(0x4FFFE, 0x4FFFF).addRange(0x5FFFE, 0x5FFFF).addRange(0x6FFFE, 0x6FFFF).addRange(0x7FFFE, 0x7FFFF).addRange(0x8FFFE, 0x8FFFF).addRange(0x9FFFE, 0x9FFFF).addRange(0xAFFFE, 0xAFFFF).addRange(0xBFFFE, 0xBFFFF).addRange(0xCFFFE, 0xCFFFF).addRange(0xDFFFE, 0xDFFFF).addRange(0xEFFFE, 0xEFFFF).addRange(0xFFFFE, 0xFFFFF).addRange(0x10FFFE, 0x10FFFF);
module.exports = set;

/***/ }),
/* 627 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x60, 0xA9, 0xAE, 0xB6, 0xBB, 0xBF, 0xD7, 0xF7, 0x3030);

set.addRange(0x21, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x7E).addRange(0xA1, 0xA7).addRange(0xAB, 0xAC).addRange(0xB0, 0xB1).addRange(0x2010, 0x2027).addRange(0x2030, 0x203E).addRange(0x2041, 0x2053).addRange(0x2055, 0x205E).addRange(0x2190, 0x245F).addRange(0x2500, 0x2775).addRange(0x2794, 0x2BFF).addRange(0x2E00, 0x2E7F).addRange(0x3001, 0x3003).addRange(0x3008, 0x3020).addRange(0xFD3E, 0xFD3F).addRange(0xFE45, 0xFE46);
module.exports = set;

/***/ }),
/* 628 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x20, 0x85);

set.addRange(0x9, 0xD).addRange(0x200E, 0x200F).addRange(0x2028, 0x2029);
module.exports = set;

/***/ }),
/* 629 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x22, 0x27, 0xAB, 0xBB, 0x2E42, 0xFF02, 0xFF07);

set.addRange(0x2018, 0x201F).addRange(0x2039, 0x203A).addRange(0x300C, 0x300F).addRange(0x301D, 0x301F).addRange(0xFE41, 0xFE44).addRange(0xFF62, 0xFF63);
module.exports = set;

/***/ }),
/* 630 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5);
module.exports = set;

/***/ }),
/* 631 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1F1E6, 0x1F1FF);
module.exports = set;

/***/ }),
/* 632 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x21, 0x2E, 0x3F, 0x589, 0x6D4, 0x7F9, 0x837, 0x839, 0x1362, 0x166E, 0x1803, 0x1809, 0x2E2E, 0x2E3C, 0x3002, 0xA4FF, 0xA6F3, 0xA6F7, 0xA92F, 0xABEB, 0xFE52, 0xFF01, 0xFF0E, 0xFF1F, 0xFF61, 0x111CD, 0x112A9, 0x11944, 0x11946, 0x16AF5, 0x16B44, 0x16E98, 0x1BC9F, 0x1DA88);

set.addRange(0x61E, 0x61F).addRange(0x700, 0x702).addRange(0x83D, 0x83E).addRange(0x964, 0x965).addRange(0x104A, 0x104B).addRange(0x1367, 0x1368).addRange(0x1735, 0x1736).addRange(0x1944, 0x1945).addRange(0x1AA8, 0x1AAB).addRange(0x1B5A, 0x1B5B).addRange(0x1B5E, 0x1B5F).addRange(0x1C3B, 0x1C3C).addRange(0x1C7E, 0x1C7F).addRange(0x203C, 0x203D).addRange(0x2047, 0x2049).addRange(0xA60E, 0xA60F).addRange(0xA876, 0xA877).addRange(0xA8CE, 0xA8CF).addRange(0xA9C8, 0xA9C9).addRange(0xAA5D, 0xAA5F).addRange(0xAAF0, 0xAAF1).addRange(0xFE56, 0xFE57).addRange(0x10A56, 0x10A57).addRange(0x10F55, 0x10F59).addRange(0x11047, 0x11048).addRange(0x110BE, 0x110C1).addRange(0x11141, 0x11143).addRange(0x111C5, 0x111C6).addRange(0x111DE, 0x111DF).addRange(0x11238, 0x11239).addRange(0x1123B, 0x1123C).addRange(0x1144B, 0x1144C).addRange(0x115C2, 0x115C3).addRange(0x115C9, 0x115D7).addRange(0x11641, 0x11642).addRange(0x1173C, 0x1173E).addRange(0x11A42, 0x11A43).addRange(0x11A9B, 0x11A9C).addRange(0x11C41, 0x11C42).addRange(0x11EF7, 0x11EF8).addRange(0x16A6E, 0x16A6F).addRange(0x16B37, 0x16B38);
module.exports = set;

/***/ }),
/* 633 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x12F, 0x249, 0x268, 0x29D, 0x2B2, 0x3F3, 0x456, 0x458, 0x1D62, 0x1D96, 0x1DA4, 0x1DA8, 0x1E2D, 0x1ECB, 0x2071, 0x2C7C);

set.addRange(0x69, 0x6A).addRange(0x2148, 0x2149).addRange(0x1D422, 0x1D423).addRange(0x1D456, 0x1D457).addRange(0x1D48A, 0x1D48B).addRange(0x1D4BE, 0x1D4BF).addRange(0x1D4F2, 0x1D4F3).addRange(0x1D526, 0x1D527).addRange(0x1D55A, 0x1D55B).addRange(0x1D58E, 0x1D58F).addRange(0x1D5C2, 0x1D5C3).addRange(0x1D5F6, 0x1D5F7).addRange(0x1D62A, 0x1D62B).addRange(0x1D65E, 0x1D65F).addRange(0x1D692, 0x1D693);
module.exports = set;

/***/ }),
/* 634 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x21, 0x2C, 0x2E, 0x3F, 0x37E, 0x387, 0x589, 0x5C3, 0x60C, 0x61B, 0x6D4, 0x70C, 0x85E, 0xF08, 0x166E, 0x17DA, 0x2E2E, 0x2E3C, 0x2E41, 0x2E4C, 0xA92F, 0xAADF, 0xABEB, 0xFF01, 0xFF0C, 0xFF0E, 0xFF1F, 0xFF61, 0xFF64, 0x1039F, 0x103D0, 0x10857, 0x1091F, 0x111CD, 0x112A9, 0x11944, 0x11946, 0x11C71, 0x16AF5, 0x16B44, 0x1BC9F);

set.addRange(0x3A, 0x3B).addRange(0x61E, 0x61F).addRange(0x700, 0x70A).addRange(0x7F8, 0x7F9).addRange(0x830, 0x83E).addRange(0x964, 0x965).addRange(0xE5A, 0xE5B).addRange(0xF0D, 0xF12).addRange(0x104A, 0x104B).addRange(0x1361, 0x1368).addRange(0x16EB, 0x16ED).addRange(0x1735, 0x1736).addRange(0x17D4, 0x17D6).addRange(0x1802, 0x1805).addRange(0x1808, 0x1809).addRange(0x1944, 0x1945).addRange(0x1AA8, 0x1AAB).addRange(0x1B5A, 0x1B5B).addRange(0x1B5D, 0x1B5F).addRange(0x1C3B, 0x1C3F).addRange(0x1C7E, 0x1C7F).addRange(0x203C, 0x203D).addRange(0x2047, 0x2049).addRange(0x2E4E, 0x2E4F).addRange(0x3001, 0x3002).addRange(0xA4FE, 0xA4FF).addRange(0xA60D, 0xA60F).addRange(0xA6F3, 0xA6F7).addRange(0xA876, 0xA877).addRange(0xA8CE, 0xA8CF).addRange(0xA9C7, 0xA9C9).addRange(0xAA5D, 0xAA5F).addRange(0xAAF0, 0xAAF1).addRange(0xFE50, 0xFE52).addRange(0xFE54, 0xFE57).addRange(0xFF1A, 0xFF1B).addRange(0x10A56, 0x10A57).addRange(0x10AF0, 0x10AF5).addRange(0x10B3A, 0x10B3F).addRange(0x10B99, 0x10B9C).addRange(0x10F55, 0x10F59).addRange(0x11047, 0x1104D).addRange(0x110BE, 0x110C1).addRange(0x11141, 0x11143).addRange(0x111C5, 0x111C6).addRange(0x111DE, 0x111DF).addRange(0x11238, 0x1123C).addRange(0x1144B, 0x1144D).addRange(0x1145A, 0x1145B).addRange(0x115C2, 0x115C5).addRange(0x115C9, 0x115D7);
set.addRange(0x11641, 0x11642).addRange(0x1173C, 0x1173E).addRange(0x11A42, 0x11A43).addRange(0x11A9B, 0x11A9C).addRange(0x11AA1, 0x11AA2).addRange(0x11C41, 0x11C43).addRange(0x11EF7, 0x11EF8).addRange(0x12470, 0x12474).addRange(0x16A6E, 0x16A6F).addRange(0x16B37, 0x16B39).addRange(0x16E97, 0x16E98).addRange(0x1DA87, 0x1DA8A);
module.exports = set;

/***/ }),
/* 635 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xFA11, 0xFA1F, 0xFA21);

set.addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xFA0E, 0xFA0F).addRange(0xFA13, 0xFA14).addRange(0xFA23, 0xFA24).addRange(0xFA27, 0xFA29).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 636 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x100, 0x102, 0x104, 0x106, 0x108, 0x10A, 0x10C, 0x10E, 0x110, 0x112, 0x114, 0x116, 0x118, 0x11A, 0x11C, 0x11E, 0x120, 0x122, 0x124, 0x126, 0x128, 0x12A, 0x12C, 0x12E, 0x130, 0x132, 0x134, 0x136, 0x139, 0x13B, 0x13D, 0x13F, 0x141, 0x143, 0x145, 0x147, 0x14A, 0x14C, 0x14E, 0x150, 0x152, 0x154, 0x156, 0x158, 0x15A, 0x15C, 0x15E, 0x160, 0x162, 0x164, 0x166, 0x168, 0x16A, 0x16C, 0x16E, 0x170, 0x172, 0x174, 0x176, 0x17B, 0x17D, 0x184, 0x1A2, 0x1A4, 0x1A9, 0x1AC, 0x1B5, 0x1BC, 0x1C4, 0x1C7, 0x1CA, 0x1CD, 0x1CF, 0x1D1, 0x1D3, 0x1D5, 0x1D7, 0x1D9, 0x1DB, 0x1DE, 0x1E0, 0x1E2, 0x1E4, 0x1E6, 0x1E8, 0x1EA, 0x1EC, 0x1EE, 0x1F1, 0x1F4, 0x1FA, 0x1FC, 0x1FE, 0x200, 0x202, 0x204, 0x206, 0x208, 0x20A, 0x20C, 0x20E, 0x210, 0x212, 0x214, 0x216, 0x218, 0x21A, 0x21C, 0x21E, 0x220, 0x222, 0x224, 0x226, 0x228, 0x22A, 0x22C, 0x22E, 0x230, 0x232, 0x241, 0x248, 0x24A, 0x24C, 0x24E, 0x370, 0x372, 0x376, 0x37F, 0x386, 0x38C, 0x3CF, 0x3D8, 0x3DA, 0x3DC, 0x3DE, 0x3E0, 0x3E2, 0x3E4, 0x3E6, 0x3E8, 0x3EA, 0x3EC, 0x3EE, 0x3F4, 0x3F7, 0x460, 0x462, 0x464, 0x466, 0x468, 0x46A, 0x46C, 0x46E, 0x470, 0x472, 0x474, 0x476, 0x478, 0x47A, 0x47C, 0x47E, 0x480, 0x48A, 0x48C, 0x48E, 0x490, 0x492, 0x494, 0x496, 0x498, 0x49A, 0x49C, 0x49E, 0x4A0, 0x4A2, 0x4A4, 0x4A6, 0x4A8, 0x4AA, 0x4AC, 0x4AE, 0x4B0, 0x4B2, 0x4B4, 0x4B6, 0x4B8, 0x4BA, 0x4BC, 0x4BE, 0x4C3, 0x4C5, 0x4C7, 0x4C9, 0x4CB, 0x4CD, 0x4D0, 0x4D2, 0x4D4, 0x4D6, 0x4D8, 0x4DA, 0x4DC, 0x4DE, 0x4E0, 0x4E2, 0x4E4, 0x4E6, 0x4E8, 0x4EA, 0x4EC, 0x4EE, 0x4F0, 0x4F2, 0x4F4, 0x4F6, 0x4F8, 0x4FA, 0x4FC, 0x4FE, 0x500, 0x502, 0x504, 0x506, 0x508, 0x50A, 0x50C, 0x50E, 0x510, 0x512, 0x514, 0x516, 0x518, 0x51A, 0x51C, 0x51E, 0x520, 0x522, 0x524, 0x526, 0x528, 0x52A, 0x52C, 0x52E, 0x10C7, 0x10CD, 0x1E00, 0x1E02, 0x1E04, 0x1E06, 0x1E08, 0x1E0A, 0x1E0C, 0x1E0E, 0x1E10, 0x1E12, 0x1E14, 0x1E16, 0x1E18, 0x1E1A, 0x1E1C, 0x1E1E, 0x1E20, 0x1E22, 0x1E24, 0x1E26, 0x1E28, 0x1E2A, 0x1E2C, 0x1E2E, 0x1E30, 0x1E32, 0x1E34, 0x1E36, 0x1E38, 0x1E3A, 0x1E3C, 0x1E3E, 0x1E40, 0x1E42, 0x1E44, 0x1E46, 0x1E48, 0x1E4A, 0x1E4C, 0x1E4E, 0x1E50, 0x1E52, 0x1E54, 0x1E56, 0x1E58, 0x1E5A, 0x1E5C, 0x1E5E, 0x1E60, 0x1E62, 0x1E64, 0x1E66, 0x1E68, 0x1E6A, 0x1E6C, 0x1E6E, 0x1E70, 0x1E72, 0x1E74, 0x1E76, 0x1E78, 0x1E7A, 0x1E7C, 0x1E7E, 0x1E80, 0x1E82, 0x1E84, 0x1E86, 0x1E88, 0x1E8A, 0x1E8C, 0x1E8E, 0x1E90, 0x1E92, 0x1E94, 0x1E9E, 0x1EA0, 0x1EA2, 0x1EA4, 0x1EA6, 0x1EA8, 0x1EAA, 0x1EAC, 0x1EAE, 0x1EB0, 0x1EB2, 0x1EB4, 0x1EB6, 0x1EB8, 0x1EBA, 0x1EBC, 0x1EBE, 0x1EC0, 0x1EC2, 0x1EC4, 0x1EC6, 0x1EC8, 0x1ECA, 0x1ECC, 0x1ECE, 0x1ED0, 0x1ED2, 0x1ED4, 0x1ED6, 0x1ED8, 0x1EDA, 0x1EDC, 0x1EDE, 0x1EE0, 0x1EE2, 0x1EE4, 0x1EE6, 0x1EE8, 0x1EEA, 0x1EEC, 0x1EEE, 0x1EF0, 0x1EF2, 0x1EF4, 0x1EF6, 0x1EF8, 0x1EFA, 0x1EFC, 0x1EFE, 0x1F59, 0x1F5B, 0x1F5D, 0x1F5F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x2145, 0x2183, 0x2C60, 0x2C67, 0x2C69, 0x2C6B, 0x2C72, 0x2C75, 0x2C82, 0x2C84, 0x2C86, 0x2C88, 0x2C8A, 0x2C8C, 0x2C8E, 0x2C90, 0x2C92, 0x2C94, 0x2C96, 0x2C98, 0x2C9A, 0x2C9C, 0x2C9E, 0x2CA0, 0x2CA2, 0x2CA4, 0x2CA6, 0x2CA8, 0x2CAA, 0x2CAC, 0x2CAE, 0x2CB0, 0x2CB2, 0x2CB4, 0x2CB6, 0x2CB8, 0x2CBA, 0x2CBC, 0x2CBE, 0x2CC0, 0x2CC2, 0x2CC4, 0x2CC6, 0x2CC8, 0x2CCA, 0x2CCC, 0x2CCE, 0x2CD0, 0x2CD2, 0x2CD4, 0x2CD6, 0x2CD8, 0x2CDA, 0x2CDC, 0x2CDE, 0x2CE0, 0x2CE2, 0x2CEB, 0x2CED, 0x2CF2, 0xA640, 0xA642, 0xA644, 0xA646, 0xA648, 0xA64A, 0xA64C, 0xA64E, 0xA650, 0xA652, 0xA654, 0xA656, 0xA658, 0xA65A, 0xA65C, 0xA65E, 0xA660, 0xA662, 0xA664, 0xA666, 0xA668, 0xA66A, 0xA66C, 0xA680, 0xA682, 0xA684, 0xA686, 0xA688, 0xA68A, 0xA68C, 0xA68E, 0xA690, 0xA692, 0xA694, 0xA696, 0xA698, 0xA69A, 0xA722, 0xA724, 0xA726, 0xA728, 0xA72A, 0xA72C, 0xA72E, 0xA732, 0xA734, 0xA736, 0xA738, 0xA73A, 0xA73C, 0xA73E, 0xA740, 0xA742, 0xA744, 0xA746, 0xA748, 0xA74A, 0xA74C, 0xA74E, 0xA750, 0xA752, 0xA754, 0xA756, 0xA758, 0xA75A, 0xA75C, 0xA75E, 0xA760, 0xA762, 0xA764, 0xA766, 0xA768, 0xA76A, 0xA76C, 0xA76E, 0xA779, 0xA77B, 0xA780, 0xA782, 0xA784, 0xA786, 0xA78B, 0xA78D, 0xA790, 0xA792, 0xA796, 0xA798, 0xA79A, 0xA79C, 0xA79E, 0xA7A0, 0xA7A2, 0xA7A4, 0xA7A6, 0xA7A8, 0xA7B6, 0xA7B8, 0xA7BA, 0xA7BC, 0xA7BE, 0xA7C2, 0xA7C9, 0xA7F5, 0x1D49C, 0x1D4A2, 0x1D546, 0x1D7CA);

set.addRange(0x41, 0x5A).addRange(0xC0, 0xD6).addRange(0xD8, 0xDE).addRange(0x178, 0x179).addRange(0x181, 0x182).addRange(0x186, 0x187).addRange(0x189, 0x18B).addRange(0x18E, 0x191).addRange(0x193, 0x194).addRange(0x196, 0x198).addRange(0x19C, 0x19D).addRange(0x19F, 0x1A0).addRange(0x1A6, 0x1A7).addRange(0x1AE, 0x1AF).addRange(0x1B1, 0x1B3).addRange(0x1B7, 0x1B8).addRange(0x1F6, 0x1F8).addRange(0x23A, 0x23B).addRange(0x23D, 0x23E).addRange(0x243, 0x246).addRange(0x388, 0x38A).addRange(0x38E, 0x38F).addRange(0x391, 0x3A1).addRange(0x3A3, 0x3AB).addRange(0x3D2, 0x3D4).addRange(0x3F9, 0x3FA).addRange(0x3FD, 0x42F).addRange(0x4C0, 0x4C1).addRange(0x531, 0x556).addRange(0x10A0, 0x10C5).addRange(0x13A0, 0x13F5).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1F08, 0x1F0F).addRange(0x1F18, 0x1F1D).addRange(0x1F28, 0x1F2F).addRange(0x1F38, 0x1F3F).addRange(0x1F48, 0x1F4D).addRange(0x1F68, 0x1F6F).addRange(0x1FB8, 0x1FBB).addRange(0x1FC8, 0x1FCB).addRange(0x1FD8, 0x1FDB).addRange(0x1FE8, 0x1FEC).addRange(0x1FF8, 0x1FFB).addRange(0x210B, 0x210D).addRange(0x2110, 0x2112).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x2130, 0x2133).addRange(0x213E, 0x213F).addRange(0x2160, 0x216F);
set.addRange(0x24B6, 0x24CF).addRange(0x2C00, 0x2C2E).addRange(0x2C62, 0x2C64).addRange(0x2C6D, 0x2C70).addRange(0x2C7E, 0x2C80).addRange(0xA77D, 0xA77E).addRange(0xA7AA, 0xA7AE).addRange(0xA7B0, 0xA7B4).addRange(0xA7C4, 0xA7C7).addRange(0xFF21, 0xFF3A).addRange(0x10400, 0x10427).addRange(0x104B0, 0x104D3).addRange(0x10C80, 0x10CB2).addRange(0x118A0, 0x118BF).addRange(0x16E40, 0x16E5F).addRange(0x1D400, 0x1D419).addRange(0x1D434, 0x1D44D).addRange(0x1D468, 0x1D481).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B5).addRange(0x1D4D0, 0x1D4E9).addRange(0x1D504, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D538, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D56C, 0x1D585).addRange(0x1D5A0, 0x1D5B9).addRange(0x1D5D4, 0x1D5ED).addRange(0x1D608, 0x1D621).addRange(0x1D63C, 0x1D655).addRange(0x1D670, 0x1D689).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6E2, 0x1D6FA).addRange(0x1D71C, 0x1D734).addRange(0x1D756, 0x1D76E).addRange(0x1D790, 0x1D7A8).addRange(0x1E900, 0x1E921).addRange(0x1F130, 0x1F149).addRange(0x1F150, 0x1F169).addRange(0x1F170, 0x1F189);
module.exports = set;

/***/ }),
/* 637 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x180B, 0x180D).addRange(0xFE00, 0xFE0F).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 638 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x20, 0x85, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000);

set.addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029);
module.exports = set;

/***/ }),
/* 639 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5F, 0xAA, 0xB5, 0xB7, 0xBA, 0x2EC, 0x2EE, 0x37F, 0x38C, 0x559, 0x5BF, 0x5C7, 0x6FF, 0x7FA, 0x7FD, 0x9B2, 0x9D7, 0x9FC, 0x9FE, 0xA3C, 0xA51, 0xA5E, 0xAD0, 0xB71, 0xB9C, 0xBD0, 0xBD7, 0xCDE, 0xDBD, 0xDCA, 0xDD6, 0xE84, 0xEA5, 0xEC6, 0xF00, 0xF35, 0xF37, 0xF39, 0xFC6, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x1AA7, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2054, 0x2071, 0x207F, 0x20E1, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0xA82C, 0xA8FB, 0xFB3E, 0xFE71, 0xFE73, 0xFE77, 0xFE79, 0xFE7B, 0xFE7D, 0xFF3F, 0x101FD, 0x102E0, 0x10808, 0x1083C, 0x10A3F, 0x10F27, 0x11176, 0x111DC, 0x1123E, 0x11288, 0x11350, 0x11357, 0x114C7, 0x11644, 0x11909, 0x11A47, 0x11A9D, 0x11D3A, 0x11FB0, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1DA75, 0x1DA84, 0x1E14E, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x300, 0x374).addRange(0x376, 0x377).addRange(0x37B, 0x37D).addRange(0x386, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x483, 0x487).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x610, 0x61A).addRange(0x620, 0x669).addRange(0x66E, 0x6D3).addRange(0x6D5, 0x6DC).addRange(0x6DF, 0x6E8).addRange(0x6EA, 0x6FC).addRange(0x710, 0x74A).addRange(0x74D, 0x7B1).addRange(0x7C0, 0x7F5).addRange(0x800, 0x82D).addRange(0x840, 0x85B).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x963).addRange(0x966, 0x96F).addRange(0x971, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BC, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CE).addRange(0x9DC, 0x9DD);
set.addRange(0x9DF, 0x9E3).addRange(0x9E6, 0x9F1).addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA75).addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABC, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE0, 0xAE3).addRange(0xAE6, 0xAEF).addRange(0xAF9, 0xAFF).addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3C, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB66, 0xB6F).addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9);
set.addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xBE6, 0xBEF).addRange(0xC00, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC66, 0xC6F).addRange(0xC80, 0xC83).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBC, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2).addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4E).addRange(0xD54, 0xD57).addRange(0xD5F, 0xD63).addRange(0xD66, 0xD6F).addRange(0xD7A, 0xD7F).addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF3).addRange(0xE01, 0xE3A).addRange(0xE40, 0xE4E).addRange(0xE50, 0xE59).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A);
set.addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEC8, 0xECD).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF).addRange(0xF18, 0xF19).addRange(0xF20, 0xF29).addRange(0xF3E, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF84).addRange(0xF86, 0xF97).addRange(0xF99, 0xFBC).addRange(0x1000, 0x1049).addRange(0x1050, 0x109D).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x135D, 0x135F).addRange(0x1369, 0x1371).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1714).addRange(0x1720, 0x1734).addRange(0x1740, 0x1753).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773).addRange(0x1780, 0x17D3).addRange(0x17DC, 0x17DD).addRange(0x17E0, 0x17E9);
set.addRange(0x180B, 0x180D).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1946, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x1A00, 0x1A1B).addRange(0x1A20, 0x1A5E).addRange(0x1A60, 0x1A7C).addRange(0x1A7F, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AB0, 0x1ABD).addRange(0x1ABF, 0x1AC0).addRange(0x1B00, 0x1B4B).addRange(0x1B50, 0x1B59).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1BF3).addRange(0x1C00, 0x1C37).addRange(0x1C40, 0x1C49).addRange(0x1C4D, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CFA).addRange(0x1D00, 0x1DF9).addRange(0x1DFB, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x203F, 0x2040).addRange(0x2090, 0x209C).addRange(0x20D0, 0x20DC);
set.addRange(0x20E5, 0x20F0).addRange(0x210A, 0x2113).addRange(0x2118, 0x211D).addRange(0x212A, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2160, 0x2188).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D7F, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x2DE0, 0x2DFF).addRange(0x3005, 0x3007).addRange(0x3021, 0x302F).addRange(0x3031, 0x3035).addRange(0x3038, 0x303C).addRange(0x3041, 0x3096).addRange(0x3099, 0x309A).addRange(0x309D, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA62B).addRange(0xA640, 0xA66F).addRange(0xA674, 0xA67D).addRange(0xA67F, 0xA6F1).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA827).addRange(0xA840, 0xA873);
set.addRange(0xA880, 0xA8C5).addRange(0xA8D0, 0xA8D9).addRange(0xA8E0, 0xA8F7).addRange(0xA8FD, 0xA92D).addRange(0xA930, 0xA953).addRange(0xA960, 0xA97C).addRange(0xA980, 0xA9C0).addRange(0xA9CF, 0xA9D9).addRange(0xA9E0, 0xA9FE).addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA60, 0xAA76).addRange(0xAA7A, 0xAAC2).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEF).addRange(0xAAF2, 0xAAF6).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABEA).addRange(0xABEC, 0xABED).addRange(0xABF0, 0xABF9).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1D, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFC5D).addRange(0xFC64, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDF9).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2F).addRange(0xFE33, 0xFE34).addRange(0xFE4D, 0xFE4F).addRange(0xFE7F, 0xFEFC).addRange(0xFF10, 0xFF19);
set.addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10140, 0x10174).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x1037A).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x103D1, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104A0, 0x104A9).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A);
set.addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE6).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAC).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F50).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11000, 0x11046).addRange(0x11066, 0x1106F).addRange(0x1107F, 0x110BA).addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9).addRange(0x11100, 0x11134).addRange(0x11136, 0x1113F).addRange(0x11144, 0x11147).addRange(0x11150, 0x11173).addRange(0x11180, 0x111C4).addRange(0x111C9, 0x111CC).addRange(0x111CE, 0x111DA).addRange(0x11200, 0x11211).addRange(0x11213, 0x11237).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9).addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133B, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363);
set.addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11400, 0x1144A).addRange(0x11450, 0x11459).addRange(0x1145E, 0x11461).addRange(0x11480, 0x114C5).addRange(0x114D0, 0x114D9).addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115C0).addRange(0x115D8, 0x115DD).addRange(0x11600, 0x11640).addRange(0x11650, 0x11659).addRange(0x11680, 0x116B8).addRange(0x116C0, 0x116C9).addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x11739).addRange(0x11800, 0x1183A).addRange(0x118A0, 0x118E9).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x11943).addRange(0x11950, 0x11959).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119E1).addRange(0x119E3, 0x119E4).addRange(0x11A00, 0x11A3E).addRange(0x11A50, 0x11A99).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C40).addRange(0x11C50, 0x11C59).addRange(0x11C72, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D47).addRange(0x11D50, 0x11D59).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D98);
set.addRange(0x11DA0, 0x11DA9).addRange(0x11EE0, 0x11EF6).addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF4).addRange(0x16B00, 0x16B36).addRange(0x16B40, 0x16B43).addRange(0x16B50, 0x16B59).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x16FE3, 0x16FE4).addRange(0x16FF0, 0x16FF1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1BC9D, 0x1BC9E).addRange(0x1D165, 0x1D169).addRange(0x1D16D, 0x1D172).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A);
set.addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E2C0, 0x1E2F9).addRange(0x1E800, 0x1E8C4).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3);
set.addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1FBF0, 0x1FBF9).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 640 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x2EC, 0x2EE, 0x37F, 0x386, 0x38C, 0x559, 0x6D5, 0x6FF, 0x710, 0x7B1, 0x7FA, 0x81A, 0x824, 0x828, 0x93D, 0x950, 0x9B2, 0x9BD, 0x9CE, 0x9FC, 0xA5E, 0xABD, 0xAD0, 0xAF9, 0xB3D, 0xB71, 0xB83, 0xB9C, 0xBD0, 0xC3D, 0xC80, 0xCBD, 0xCDE, 0xD3D, 0xD4E, 0xDBD, 0xE32, 0xE84, 0xEA5, 0xEB2, 0xEBD, 0xEC6, 0xF00, 0x103F, 0x1061, 0x108E, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x17DC, 0x18AA, 0x1AA7, 0x1CFA, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2071, 0x207F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0xA8FB, 0xA9CF, 0xAA7A, 0xAAB1, 0xAAC0, 0xAAC2, 0xFB1D, 0xFB3E, 0xFE71, 0xFE73, 0xFE77, 0xFE79, 0xFE7B, 0xFE7D, 0x10808, 0x1083C, 0x10A00, 0x10F27, 0x11144, 0x11147, 0x11176, 0x111DA, 0x111DC, 0x11288, 0x1133D, 0x11350, 0x114C7, 0x11644, 0x116B8, 0x11909, 0x1193F, 0x11941, 0x119E1, 0x119E3, 0x11A00, 0x11A3A, 0x11A50, 0x11A9D, 0x11C40, 0x11D46, 0x11D98, 0x11FB0, 0x16F50, 0x16FE3, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E14E, 0x1E94B, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x370, 0x374).addRange(0x376, 0x377).addRange(0x37B, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x620, 0x64A).addRange(0x66E, 0x66F).addRange(0x671, 0x6D3).addRange(0x6E5, 0x6E6).addRange(0x6EE, 0x6EF).addRange(0x6FA, 0x6FC).addRange(0x712, 0x72F).addRange(0x74D, 0x7A5).addRange(0x7CA, 0x7EA).addRange(0x7F4, 0x7F5).addRange(0x800, 0x815).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x904, 0x939).addRange(0x958, 0x961).addRange(0x971, 0x980).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E1).addRange(0x9F0, 0x9F1).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36);
set.addRange(0xA38, 0xA39).addRange(0xA59, 0xA5C).addRange(0xA72, 0xA74).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xAE0, 0xAE1).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB61).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC61).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCE0, 0xCE1).addRange(0xCF1, 0xCF2).addRange(0xD04, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD54, 0xD56).addRange(0xD5F, 0xD61).addRange(0xD7A, 0xD7F).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xE01, 0xE30).addRange(0xE40, 0xE46);
set.addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEB0).addRange(0xEC0, 0xEC4).addRange(0xEDC, 0xEDF).addRange(0xF40, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF88, 0xF8C).addRange(0x1000, 0x102A).addRange(0x1050, 0x1055).addRange(0x105A, 0x105D).addRange(0x1065, 0x1066).addRange(0x106E, 0x1070).addRange(0x1075, 0x1081).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1711).addRange(0x1720, 0x1731).addRange(0x1740, 0x1751).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1780, 0x17B3).addRange(0x1820, 0x1878).addRange(0x1880, 0x18A8).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1950, 0x196D);
set.addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x1A00, 0x1A16).addRange(0x1A20, 0x1A54).addRange(0x1B05, 0x1B33).addRange(0x1B45, 0x1B4B).addRange(0x1B83, 0x1BA0).addRange(0x1BAE, 0x1BAF).addRange(0x1BBA, 0x1BE5).addRange(0x1C00, 0x1C23).addRange(0x1C4D, 0x1C4F).addRange(0x1C5A, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF6).addRange(0x1D00, 0x1DBF).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x2090, 0x209C).addRange(0x210A, 0x2113).addRange(0x2118, 0x211D).addRange(0x212A, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2160, 0x2188).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6);
set.addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x3005, 0x3007).addRange(0x3021, 0x3029).addRange(0x3031, 0x3035).addRange(0x3038, 0x303C).addRange(0x3041, 0x3096).addRange(0x309D, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA61F).addRange(0xA62A, 0xA62B).addRange(0xA640, 0xA66E).addRange(0xA67F, 0xA69D).addRange(0xA6A0, 0xA6EF).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA801).addRange(0xA803, 0xA805).addRange(0xA807, 0xA80A).addRange(0xA80C, 0xA822).addRange(0xA840, 0xA873).addRange(0xA882, 0xA8B3).addRange(0xA8F2, 0xA8F7).addRange(0xA8FD, 0xA8FE).addRange(0xA90A, 0xA925).addRange(0xA930, 0xA946).addRange(0xA960, 0xA97C).addRange(0xA984, 0xA9B2).addRange(0xA9E0, 0xA9E4).addRange(0xA9E6, 0xA9EF).addRange(0xA9FA, 0xA9FE).addRange(0xAA00, 0xAA28).addRange(0xAA40, 0xAA42).addRange(0xAA44, 0xAA4B);
set.addRange(0xAA60, 0xAA76).addRange(0xAA7E, 0xAAAF).addRange(0xAAB5, 0xAAB6).addRange(0xAAB9, 0xAABD).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEA).addRange(0xAAF2, 0xAAF4).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABE2).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1F, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFC5D).addRange(0xFC64, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDF9).addRange(0xFE7F, 0xFEFC).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFF9D).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10140, 0x10174).addRange(0x10280, 0x1029C);
set.addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x1034A).addRange(0x10350, 0x10375).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x103D1, 0x103D5).addRange(0x10400, 0x1049D).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A10, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE4).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D23).addRange(0x10E80, 0x10EA9).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F45).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11003, 0x11037).addRange(0x11083, 0x110AF);
set.addRange(0x110D0, 0x110E8).addRange(0x11103, 0x11126).addRange(0x11150, 0x11172).addRange(0x11183, 0x111B2).addRange(0x111C1, 0x111C4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1122B).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112DE).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1135D, 0x11361).addRange(0x11400, 0x11434).addRange(0x11447, 0x1144A).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114AF).addRange(0x114C4, 0x114C5).addRange(0x11580, 0x115AE).addRange(0x115D8, 0x115DB).addRange(0x11600, 0x1162F).addRange(0x11680, 0x116AA).addRange(0x11700, 0x1171A).addRange(0x11800, 0x1182B).addRange(0x118A0, 0x118DF).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x1192F).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D0).addRange(0x11A0B, 0x11A32).addRange(0x11A5C, 0x11A89).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C2E).addRange(0x11C72, 0x11C8F).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D30).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D89).addRange(0x11EE0, 0x11EF2).addRange(0x12000, 0x12399);
set.addRange(0x12400, 0x1246E).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B40, 0x16B43).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F93, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8);
set.addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E100, 0x1E12C).addRange(0x1E137, 0x1E13D).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E800, 0x1E8C4).addRange(0x1E900, 0x1E943).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 641 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x37F, 0x386, 0x38C, 0x10C7, 0x10CD, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x2139, 0x214E, 0x2D27, 0x2D2D, 0xA7FA, 0x1D4A2, 0x1D4BB, 0x1D546);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x1BA).addRange(0x1BC, 0x1BF).addRange(0x1C4, 0x293).addRange(0x295, 0x2AF).addRange(0x370, 0x373).addRange(0x376, 0x377).addRange(0x37B, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1D00, 0x1D2B).addRange(0x1D6B, 0x1D77).addRange(0x1D79, 0x1D9A).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x210A, 0x2113).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x212F, 0x2134).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2183, 0x2184);
set.addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2C7B).addRange(0x2C7E, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3).addRange(0x2D00, 0x2D25).addRange(0xA640, 0xA66D).addRange(0xA680, 0xA69B).addRange(0xA722, 0xA76F).addRange(0xA771, 0xA787).addRange(0xA78B, 0xA78E).addRange(0xA790, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA7F6).addRange(0xAB30, 0xAB5A).addRange(0xAB60, 0xAB68).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0x10400, 0x1044F).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x118A0, 0x118DF).addRange(0x16E40, 0x16E7F).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E);
set.addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8).addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E900, 0x1E943);
module.exports = set;

/***/ }),
/* 642 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x29, 0x5D, 0x7D, 0xF3B, 0xF3D, 0x169C, 0x2046, 0x207E, 0x208E, 0x2309, 0x230B, 0x232A, 0x2769, 0x276B, 0x276D, 0x276F, 0x2771, 0x2773, 0x2775, 0x27C6, 0x27E7, 0x27E9, 0x27EB, 0x27ED, 0x27EF, 0x2984, 0x2986, 0x2988, 0x298A, 0x298C, 0x298E, 0x2990, 0x2992, 0x2994, 0x2996, 0x2998, 0x29D9, 0x29DB, 0x29FD, 0x2E23, 0x2E25, 0x2E27, 0x2E29, 0x3009, 0x300B, 0x300D, 0x300F, 0x3011, 0x3015, 0x3017, 0x3019, 0x301B, 0xFD3E, 0xFE18, 0xFE36, 0xFE38, 0xFE3A, 0xFE3C, 0xFE3E, 0xFE40, 0xFE42, 0xFE44, 0xFE48, 0xFE5A, 0xFE5C, 0xFE5E, 0xFF09, 0xFF3D, 0xFF5D, 0xFF60, 0xFF63);

set.addRange(0x301E, 0x301F);
module.exports = set;

/***/ }),
/* 643 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5F, 0x2054, 0xFF3F);

set.addRange(0x203F, 0x2040).addRange(0xFE33, 0xFE34).addRange(0xFE4D, 0xFE4F);
module.exports = set;

/***/ }),
/* 644 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x0, 0x1F).addRange(0x7F, 0x9F);
module.exports = set;

/***/ }),
/* 645 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x24, 0x58F, 0x60B, 0x9FB, 0xAF1, 0xBF9, 0xE3F, 0x17DB, 0xA838, 0xFDFC, 0xFE69, 0xFF04, 0x1E2FF, 0x1ECB0);

set.addRange(0xA2, 0xA5).addRange(0x7FE, 0x7FF).addRange(0x9F2, 0x9F3).addRange(0x20A0, 0x20BF).addRange(0xFFE0, 0xFFE1).addRange(0xFFE5, 0xFFE6).addRange(0x11FDD, 0x11FE0);
module.exports = set;

/***/ }),
/* 646 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2D, 0x58A, 0x5BE, 0x1400, 0x1806, 0x2E17, 0x2E1A, 0x2E40, 0x301C, 0x3030, 0x30A0, 0xFE58, 0xFE63, 0xFF0D, 0x10EAD);

set.addRange(0x2010, 0x2015).addRange(0x2E3A, 0x2E3B).addRange(0xFE31, 0xFE32);
module.exports = set;

/***/ }),
/* 647 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x30, 0x39).addRange(0x660, 0x669).addRange(0x6F0, 0x6F9).addRange(0x7C0, 0x7C9).addRange(0x966, 0x96F).addRange(0x9E6, 0x9EF).addRange(0xA66, 0xA6F).addRange(0xAE6, 0xAEF).addRange(0xB66, 0xB6F).addRange(0xBE6, 0xBEF).addRange(0xC66, 0xC6F).addRange(0xCE6, 0xCEF).addRange(0xD66, 0xD6F).addRange(0xDE6, 0xDEF).addRange(0xE50, 0xE59).addRange(0xED0, 0xED9).addRange(0xF20, 0xF29).addRange(0x1040, 0x1049).addRange(0x1090, 0x1099).addRange(0x17E0, 0x17E9).addRange(0x1810, 0x1819).addRange(0x1946, 0x194F).addRange(0x19D0, 0x19D9).addRange(0x1A80, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1B50, 0x1B59).addRange(0x1BB0, 0x1BB9).addRange(0x1C40, 0x1C49).addRange(0x1C50, 0x1C59).addRange(0xA620, 0xA629).addRange(0xA8D0, 0xA8D9).addRange(0xA900, 0xA909).addRange(0xA9D0, 0xA9D9).addRange(0xA9F0, 0xA9F9).addRange(0xAA50, 0xAA59).addRange(0xABF0, 0xABF9).addRange(0xFF10, 0xFF19).addRange(0x104A0, 0x104A9).addRange(0x10D30, 0x10D39).addRange(0x11066, 0x1106F).addRange(0x110F0, 0x110F9).addRange(0x11136, 0x1113F).addRange(0x111D0, 0x111D9).addRange(0x112F0, 0x112F9).addRange(0x11450, 0x11459).addRange(0x114D0, 0x114D9).addRange(0x11650, 0x11659).addRange(0x116C0, 0x116C9).addRange(0x11730, 0x11739).addRange(0x118E0, 0x118E9).addRange(0x11950, 0x11959);
set.addRange(0x11C50, 0x11C59).addRange(0x11D50, 0x11D59).addRange(0x11DA0, 0x11DA9).addRange(0x16A60, 0x16A69).addRange(0x16B50, 0x16B59).addRange(0x1D7CE, 0x1D7FF).addRange(0x1E140, 0x1E149).addRange(0x1E2F0, 0x1E2F9).addRange(0x1E950, 0x1E959).addRange(0x1FBF0, 0x1FBF9);
module.exports = set;

/***/ }),
/* 648 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1ABE);

set.addRange(0x488, 0x489).addRange(0x20DD, 0x20E0).addRange(0x20E2, 0x20E4).addRange(0xA670, 0xA672);
module.exports = set;

/***/ }),
/* 649 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xBB, 0x2019, 0x201D, 0x203A, 0x2E03, 0x2E05, 0x2E0A, 0x2E0D, 0x2E1D, 0x2E21);

module.exports = set;

/***/ }),
/* 650 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAD, 0x61C, 0x6DD, 0x70F, 0x8E2, 0x180E, 0xFEFF, 0x110BD, 0x110CD, 0xE0001);

set.addRange(0x600, 0x605).addRange(0x200B, 0x200F).addRange(0x202A, 0x202E).addRange(0x2060, 0x2064).addRange(0x2066, 0x206F).addRange(0xFFF9, 0xFFFB).addRange(0x13430, 0x13438).addRange(0x1BCA0, 0x1BCA3).addRange(0x1D173, 0x1D17A).addRange(0xE0020, 0xE007F);
module.exports = set;

/***/ }),
/* 651 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAB, 0x2018, 0x201F, 0x2039, 0x2E02, 0x2E04, 0x2E09, 0x2E0C, 0x2E1C, 0x2E20);

set.addRange(0x201B, 0x201C);
module.exports = set;

/***/ }),
/* 652 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xB5, 0xBA, 0x2EC, 0x2EE, 0x37F, 0x386, 0x38C, 0x559, 0x6D5, 0x6FF, 0x710, 0x7B1, 0x7FA, 0x81A, 0x824, 0x828, 0x93D, 0x950, 0x9B2, 0x9BD, 0x9CE, 0x9FC, 0xA5E, 0xABD, 0xAD0, 0xAF9, 0xB3D, 0xB71, 0xB83, 0xB9C, 0xBD0, 0xC3D, 0xC80, 0xCBD, 0xCDE, 0xD3D, 0xD4E, 0xDBD, 0xE84, 0xEA5, 0xEBD, 0xEC6, 0xF00, 0x103F, 0x1061, 0x108E, 0x10C7, 0x10CD, 0x1258, 0x12C0, 0x17D7, 0x17DC, 0x18AA, 0x1AA7, 0x1CFA, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2071, 0x207F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x214E, 0x2D27, 0x2D2D, 0x2D6F, 0x2E2F, 0xA8FB, 0xA9CF, 0xAA7A, 0xAAB1, 0xAAC0, 0xAAC2, 0xFB1D, 0xFB3E, 0x10808, 0x1083C, 0x10A00, 0x10F27, 0x11144, 0x11147, 0x11176, 0x111DA, 0x111DC, 0x11288, 0x1133D, 0x11350, 0x114C7, 0x11644, 0x116B8, 0x11909, 0x1193F, 0x11941, 0x119E1, 0x119E3, 0x11A00, 0x11A3A, 0x11A50, 0x11A9D, 0x11C40, 0x11D46, 0x11D98, 0x11FB0, 0x16F50, 0x16FE3, 0x1D4A2, 0x1D4BB, 0x1D546, 0x1E14E, 0x1E94B, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x370, 0x374).addRange(0x376, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3F5).addRange(0x3F7, 0x481).addRange(0x48A, 0x52F).addRange(0x531, 0x556).addRange(0x560, 0x588).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x620, 0x64A).addRange(0x66E, 0x66F).addRange(0x671, 0x6D3).addRange(0x6E5, 0x6E6).addRange(0x6EE, 0x6EF).addRange(0x6FA, 0x6FC).addRange(0x712, 0x72F).addRange(0x74D, 0x7A5).addRange(0x7CA, 0x7EA).addRange(0x7F4, 0x7F5).addRange(0x800, 0x815).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x904, 0x939).addRange(0x958, 0x961).addRange(0x971, 0x980).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E1).addRange(0x9F0, 0x9F1).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36);
set.addRange(0xA38, 0xA39).addRange(0xA59, 0xA5C).addRange(0xA72, 0xA74).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xAE0, 0xAE1).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB61).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC61).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCE0, 0xCE1).addRange(0xCF1, 0xCF2).addRange(0xD04, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD54, 0xD56).addRange(0xD5F, 0xD61).addRange(0xD7A, 0xD7F).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xE01, 0xE30).addRange(0xE32, 0xE33);
set.addRange(0xE40, 0xE46).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEB0).addRange(0xEB2, 0xEB3).addRange(0xEC0, 0xEC4).addRange(0xEDC, 0xEDF).addRange(0xF40, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF88, 0xF8C).addRange(0x1000, 0x102A).addRange(0x1050, 0x1055).addRange(0x105A, 0x105D).addRange(0x1065, 0x1066).addRange(0x106E, 0x1070).addRange(0x1075, 0x1081).addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1380, 0x138F).addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16F1, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1711).addRange(0x1720, 0x1731).addRange(0x1740, 0x1751).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1780, 0x17B3).addRange(0x1820, 0x1878).addRange(0x1880, 0x1884).addRange(0x1887, 0x18A8);
set.addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x1A00, 0x1A16).addRange(0x1A20, 0x1A54).addRange(0x1B05, 0x1B33).addRange(0x1B45, 0x1B4B).addRange(0x1B83, 0x1BA0).addRange(0x1BAE, 0x1BAF).addRange(0x1BBA, 0x1BE5).addRange(0x1C00, 0x1C23).addRange(0x1C4D, 0x1C4F).addRange(0x1C5A, 0x1C7D).addRange(0x1C80, 0x1C88).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF6).addRange(0x1D00, 0x1DBF).addRange(0x1E00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FBC).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FCC).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FE0, 0x1FEC).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFC).addRange(0x2090, 0x209C).addRange(0x210A, 0x2113).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x212F, 0x2139).addRange(0x213C, 0x213F).addRange(0x2145, 0x2149).addRange(0x2183, 0x2184).addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x2C60, 0x2CE4).addRange(0x2CEB, 0x2CEE).addRange(0x2CF2, 0x2CF3);
set.addRange(0x2D00, 0x2D25).addRange(0x2D30, 0x2D67).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x3005, 0x3006).addRange(0x3031, 0x3035).addRange(0x303B, 0x303C).addRange(0x3041, 0x3096).addRange(0x309D, 0x309F).addRange(0x30A1, 0x30FA).addRange(0x30FC, 0x30FF).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA48C).addRange(0xA4D0, 0xA4FD).addRange(0xA500, 0xA60C).addRange(0xA610, 0xA61F).addRange(0xA62A, 0xA62B).addRange(0xA640, 0xA66E).addRange(0xA67F, 0xA69D).addRange(0xA6A0, 0xA6E5).addRange(0xA717, 0xA71F).addRange(0xA722, 0xA788).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA801).addRange(0xA803, 0xA805).addRange(0xA807, 0xA80A).addRange(0xA80C, 0xA822).addRange(0xA840, 0xA873).addRange(0xA882, 0xA8B3).addRange(0xA8F2, 0xA8F7).addRange(0xA8FD, 0xA8FE).addRange(0xA90A, 0xA925).addRange(0xA930, 0xA946).addRange(0xA960, 0xA97C).addRange(0xA984, 0xA9B2).addRange(0xA9E0, 0xA9E4).addRange(0xA9E6, 0xA9EF).addRange(0xA9FA, 0xA9FE);
set.addRange(0xAA00, 0xAA28).addRange(0xAA40, 0xAA42).addRange(0xAA44, 0xAA4B).addRange(0xAA60, 0xAA76).addRange(0xAA7E, 0xAAAF).addRange(0xAAB5, 0xAAB6).addRange(0xAAB9, 0xAABD).addRange(0xAADB, 0xAADD).addRange(0xAAE0, 0xAAEA).addRange(0xAAF2, 0xAAF4).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB69).addRange(0xAB70, 0xABE2).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFB1F, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFB).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A).addRange(0xFF66, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA);
set.addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x10340).addRange(0x10342, 0x10349).addRange(0x10350, 0x10375).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x10400, 0x1049D).addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A10, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE4).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10D00, 0x10D23).addRange(0x10E80, 0x10EA9).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F45).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11003, 0x11037);
set.addRange(0x11083, 0x110AF).addRange(0x110D0, 0x110E8).addRange(0x11103, 0x11126).addRange(0x11150, 0x11172).addRange(0x11183, 0x111B2).addRange(0x111C1, 0x111C4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1122B).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112DE).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1135D, 0x11361).addRange(0x11400, 0x11434).addRange(0x11447, 0x1144A).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114AF).addRange(0x114C4, 0x114C5).addRange(0x11580, 0x115AE).addRange(0x115D8, 0x115DB).addRange(0x11600, 0x1162F).addRange(0x11680, 0x116AA).addRange(0x11700, 0x1171A).addRange(0x11800, 0x1182B).addRange(0x118A0, 0x118DF).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x1192F).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D0).addRange(0x11A0B, 0x11A32).addRange(0x11A5C, 0x11A89).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C2E).addRange(0x11C72, 0x11C8F).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D30).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D89).addRange(0x11EE0, 0x11EF2);
set.addRange(0x12000, 0x12399).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B40, 0x16B43).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16E40, 0x16E7F).addRange(0x16F00, 0x16F4A).addRange(0x16F93, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6FA).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D734).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D76E).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D7A8);
set.addRange(0x1D7AA, 0x1D7C2).addRange(0x1D7C4, 0x1D7CB).addRange(0x1E100, 0x1E12C).addRange(0x1E137, 0x1E13D).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E800, 0x1E8C4).addRange(0x1E900, 0x1E943).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 653 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3007, 0x10341, 0x1034A);

set.addRange(0x16EE, 0x16F0).addRange(0x2160, 0x2182).addRange(0x2185, 0x2188).addRange(0x3021, 0x3029).addRange(0x3038, 0x303A).addRange(0xA6E6, 0xA6EF).addRange(0x10140, 0x10174).addRange(0x103D1, 0x103D5).addRange(0x12400, 0x1246E);
module.exports = set;

/***/ }),
/* 654 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2028);

module.exports = set;

/***/ }),
/* 655 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB5, 0x101, 0x103, 0x105, 0x107, 0x109, 0x10B, 0x10D, 0x10F, 0x111, 0x113, 0x115, 0x117, 0x119, 0x11B, 0x11D, 0x11F, 0x121, 0x123, 0x125, 0x127, 0x129, 0x12B, 0x12D, 0x12F, 0x131, 0x133, 0x135, 0x13A, 0x13C, 0x13E, 0x140, 0x142, 0x144, 0x146, 0x14B, 0x14D, 0x14F, 0x151, 0x153, 0x155, 0x157, 0x159, 0x15B, 0x15D, 0x15F, 0x161, 0x163, 0x165, 0x167, 0x169, 0x16B, 0x16D, 0x16F, 0x171, 0x173, 0x175, 0x177, 0x17A, 0x17C, 0x183, 0x185, 0x188, 0x192, 0x195, 0x19E, 0x1A1, 0x1A3, 0x1A5, 0x1A8, 0x1AD, 0x1B0, 0x1B4, 0x1B6, 0x1C6, 0x1C9, 0x1CC, 0x1CE, 0x1D0, 0x1D2, 0x1D4, 0x1D6, 0x1D8, 0x1DA, 0x1DF, 0x1E1, 0x1E3, 0x1E5, 0x1E7, 0x1E9, 0x1EB, 0x1ED, 0x1F3, 0x1F5, 0x1F9, 0x1FB, 0x1FD, 0x1FF, 0x201, 0x203, 0x205, 0x207, 0x209, 0x20B, 0x20D, 0x20F, 0x211, 0x213, 0x215, 0x217, 0x219, 0x21B, 0x21D, 0x21F, 0x221, 0x223, 0x225, 0x227, 0x229, 0x22B, 0x22D, 0x22F, 0x231, 0x23C, 0x242, 0x247, 0x249, 0x24B, 0x24D, 0x371, 0x373, 0x377, 0x390, 0x3D9, 0x3DB, 0x3DD, 0x3DF, 0x3E1, 0x3E3, 0x3E5, 0x3E7, 0x3E9, 0x3EB, 0x3ED, 0x3F5, 0x3F8, 0x461, 0x463, 0x465, 0x467, 0x469, 0x46B, 0x46D, 0x46F, 0x471, 0x473, 0x475, 0x477, 0x479, 0x47B, 0x47D, 0x47F, 0x481, 0x48B, 0x48D, 0x48F, 0x491, 0x493, 0x495, 0x497, 0x499, 0x49B, 0x49D, 0x49F, 0x4A1, 0x4A3, 0x4A5, 0x4A7, 0x4A9, 0x4AB, 0x4AD, 0x4AF, 0x4B1, 0x4B3, 0x4B5, 0x4B7, 0x4B9, 0x4BB, 0x4BD, 0x4BF, 0x4C2, 0x4C4, 0x4C6, 0x4C8, 0x4CA, 0x4CC, 0x4D1, 0x4D3, 0x4D5, 0x4D7, 0x4D9, 0x4DB, 0x4DD, 0x4DF, 0x4E1, 0x4E3, 0x4E5, 0x4E7, 0x4E9, 0x4EB, 0x4ED, 0x4EF, 0x4F1, 0x4F3, 0x4F5, 0x4F7, 0x4F9, 0x4FB, 0x4FD, 0x4FF, 0x501, 0x503, 0x505, 0x507, 0x509, 0x50B, 0x50D, 0x50F, 0x511, 0x513, 0x515, 0x517, 0x519, 0x51B, 0x51D, 0x51F, 0x521, 0x523, 0x525, 0x527, 0x529, 0x52B, 0x52D, 0x52F, 0x1E01, 0x1E03, 0x1E05, 0x1E07, 0x1E09, 0x1E0B, 0x1E0D, 0x1E0F, 0x1E11, 0x1E13, 0x1E15, 0x1E17, 0x1E19, 0x1E1B, 0x1E1D, 0x1E1F, 0x1E21, 0x1E23, 0x1E25, 0x1E27, 0x1E29, 0x1E2B, 0x1E2D, 0x1E2F, 0x1E31, 0x1E33, 0x1E35, 0x1E37, 0x1E39, 0x1E3B, 0x1E3D, 0x1E3F, 0x1E41, 0x1E43, 0x1E45, 0x1E47, 0x1E49, 0x1E4B, 0x1E4D, 0x1E4F, 0x1E51, 0x1E53, 0x1E55, 0x1E57, 0x1E59, 0x1E5B, 0x1E5D, 0x1E5F, 0x1E61, 0x1E63, 0x1E65, 0x1E67, 0x1E69, 0x1E6B, 0x1E6D, 0x1E6F, 0x1E71, 0x1E73, 0x1E75, 0x1E77, 0x1E79, 0x1E7B, 0x1E7D, 0x1E7F, 0x1E81, 0x1E83, 0x1E85, 0x1E87, 0x1E89, 0x1E8B, 0x1E8D, 0x1E8F, 0x1E91, 0x1E93, 0x1E9F, 0x1EA1, 0x1EA3, 0x1EA5, 0x1EA7, 0x1EA9, 0x1EAB, 0x1EAD, 0x1EAF, 0x1EB1, 0x1EB3, 0x1EB5, 0x1EB7, 0x1EB9, 0x1EBB, 0x1EBD, 0x1EBF, 0x1EC1, 0x1EC3, 0x1EC5, 0x1EC7, 0x1EC9, 0x1ECB, 0x1ECD, 0x1ECF, 0x1ED1, 0x1ED3, 0x1ED5, 0x1ED7, 0x1ED9, 0x1EDB, 0x1EDD, 0x1EDF, 0x1EE1, 0x1EE3, 0x1EE5, 0x1EE7, 0x1EE9, 0x1EEB, 0x1EED, 0x1EEF, 0x1EF1, 0x1EF3, 0x1EF5, 0x1EF7, 0x1EF9, 0x1EFB, 0x1EFD, 0x1FBE, 0x210A, 0x2113, 0x212F, 0x2134, 0x2139, 0x214E, 0x2184, 0x2C61, 0x2C68, 0x2C6A, 0x2C6C, 0x2C71, 0x2C81, 0x2C83, 0x2C85, 0x2C87, 0x2C89, 0x2C8B, 0x2C8D, 0x2C8F, 0x2C91, 0x2C93, 0x2C95, 0x2C97, 0x2C99, 0x2C9B, 0x2C9D, 0x2C9F, 0x2CA1, 0x2CA3, 0x2CA5, 0x2CA7, 0x2CA9, 0x2CAB, 0x2CAD, 0x2CAF, 0x2CB1, 0x2CB3, 0x2CB5, 0x2CB7, 0x2CB9, 0x2CBB, 0x2CBD, 0x2CBF, 0x2CC1, 0x2CC3, 0x2CC5, 0x2CC7, 0x2CC9, 0x2CCB, 0x2CCD, 0x2CCF, 0x2CD1, 0x2CD3, 0x2CD5, 0x2CD7, 0x2CD9, 0x2CDB, 0x2CDD, 0x2CDF, 0x2CE1, 0x2CEC, 0x2CEE, 0x2CF3, 0x2D27, 0x2D2D, 0xA641, 0xA643, 0xA645, 0xA647, 0xA649, 0xA64B, 0xA64D, 0xA64F, 0xA651, 0xA653, 0xA655, 0xA657, 0xA659, 0xA65B, 0xA65D, 0xA65F, 0xA661, 0xA663, 0xA665, 0xA667, 0xA669, 0xA66B, 0xA66D, 0xA681, 0xA683, 0xA685, 0xA687, 0xA689, 0xA68B, 0xA68D, 0xA68F, 0xA691, 0xA693, 0xA695, 0xA697, 0xA699, 0xA69B, 0xA723, 0xA725, 0xA727, 0xA729, 0xA72B, 0xA72D, 0xA733, 0xA735, 0xA737, 0xA739, 0xA73B, 0xA73D, 0xA73F, 0xA741, 0xA743, 0xA745, 0xA747, 0xA749, 0xA74B, 0xA74D, 0xA74F, 0xA751, 0xA753, 0xA755, 0xA757, 0xA759, 0xA75B, 0xA75D, 0xA75F, 0xA761, 0xA763, 0xA765, 0xA767, 0xA769, 0xA76B, 0xA76D, 0xA76F, 0xA77A, 0xA77C, 0xA77F, 0xA781, 0xA783, 0xA785, 0xA787, 0xA78C, 0xA78E, 0xA791, 0xA797, 0xA799, 0xA79B, 0xA79D, 0xA79F, 0xA7A1, 0xA7A3, 0xA7A5, 0xA7A7, 0xA7A9, 0xA7AF, 0xA7B5, 0xA7B7, 0xA7B9, 0xA7BB, 0xA7BD, 0xA7BF, 0xA7C3, 0xA7C8, 0xA7CA, 0xA7F6, 0xA7FA, 0x1D4BB, 0x1D7CB);

set.addRange(0x61, 0x7A).addRange(0xDF, 0xF6).addRange(0xF8, 0xFF).addRange(0x137, 0x138).addRange(0x148, 0x149).addRange(0x17E, 0x180).addRange(0x18C, 0x18D).addRange(0x199, 0x19B).addRange(0x1AA, 0x1AB).addRange(0x1B9, 0x1BA).addRange(0x1BD, 0x1BF).addRange(0x1DC, 0x1DD).addRange(0x1EF, 0x1F0).addRange(0x233, 0x239).addRange(0x23F, 0x240).addRange(0x24F, 0x293).addRange(0x295, 0x2AF).addRange(0x37B, 0x37D).addRange(0x3AC, 0x3CE).addRange(0x3D0, 0x3D1).addRange(0x3D5, 0x3D7).addRange(0x3EF, 0x3F3).addRange(0x3FB, 0x3FC).addRange(0x430, 0x45F).addRange(0x4CE, 0x4CF).addRange(0x560, 0x588).addRange(0x10D0, 0x10FA).addRange(0x10FD, 0x10FF).addRange(0x13F8, 0x13FD).addRange(0x1C80, 0x1C88).addRange(0x1D00, 0x1D2B).addRange(0x1D6B, 0x1D77).addRange(0x1D79, 0x1D9A).addRange(0x1E95, 0x1E9D).addRange(0x1EFF, 0x1F07).addRange(0x1F10, 0x1F15).addRange(0x1F20, 0x1F27).addRange(0x1F30, 0x1F37).addRange(0x1F40, 0x1F45).addRange(0x1F50, 0x1F57).addRange(0x1F60, 0x1F67).addRange(0x1F70, 0x1F7D).addRange(0x1F80, 0x1F87).addRange(0x1F90, 0x1F97).addRange(0x1FA0, 0x1FA7).addRange(0x1FB0, 0x1FB4).addRange(0x1FB6, 0x1FB7).addRange(0x1FC2, 0x1FC4).addRange(0x1FC6, 0x1FC7).addRange(0x1FD0, 0x1FD3).addRange(0x1FD6, 0x1FD7);
set.addRange(0x1FE0, 0x1FE7).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FF7).addRange(0x210E, 0x210F).addRange(0x213C, 0x213D).addRange(0x2146, 0x2149).addRange(0x2C30, 0x2C5E).addRange(0x2C65, 0x2C66).addRange(0x2C73, 0x2C74).addRange(0x2C76, 0x2C7B).addRange(0x2CE3, 0x2CE4).addRange(0x2D00, 0x2D25).addRange(0xA72F, 0xA731).addRange(0xA771, 0xA778).addRange(0xA793, 0xA795).addRange(0xAB30, 0xAB5A).addRange(0xAB60, 0xAB68).addRange(0xAB70, 0xABBF).addRange(0xFB00, 0xFB06).addRange(0xFB13, 0xFB17).addRange(0xFF41, 0xFF5A).addRange(0x10428, 0x1044F).addRange(0x104D8, 0x104FB).addRange(0x10CC0, 0x10CF2).addRange(0x118C0, 0x118DF).addRange(0x16E60, 0x16E7F).addRange(0x1D41A, 0x1D433).addRange(0x1D44E, 0x1D454).addRange(0x1D456, 0x1D467).addRange(0x1D482, 0x1D49B).addRange(0x1D4B6, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D4CF).addRange(0x1D4EA, 0x1D503).addRange(0x1D51E, 0x1D537).addRange(0x1D552, 0x1D56B).addRange(0x1D586, 0x1D59F).addRange(0x1D5BA, 0x1D5D3).addRange(0x1D5EE, 0x1D607).addRange(0x1D622, 0x1D63B).addRange(0x1D656, 0x1D66F).addRange(0x1D68A, 0x1D6A5).addRange(0x1D6C2, 0x1D6DA).addRange(0x1D6DC, 0x1D6E1).addRange(0x1D6FC, 0x1D714).addRange(0x1D716, 0x1D71B).addRange(0x1D736, 0x1D74E).addRange(0x1D750, 0x1D755).addRange(0x1D770, 0x1D788).addRange(0x1D78A, 0x1D78F).addRange(0x1D7AA, 0x1D7C2);
set.addRange(0x1D7C4, 0x1D7C9).addRange(0x1E922, 0x1E943);
module.exports = set;

/***/ }),
/* 656 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5BF, 0x5C7, 0x670, 0x711, 0x7FD, 0x9BC, 0x9D7, 0x9FE, 0xA3C, 0xA51, 0xA75, 0xABC, 0xB3C, 0xB82, 0xBD7, 0xCBC, 0xD57, 0xDCA, 0xDD6, 0xE31, 0xEB1, 0xF35, 0xF37, 0xF39, 0xFC6, 0x108F, 0x17DD, 0x18A9, 0x1A7F, 0x1CED, 0x1CF4, 0x2D7F, 0xA802, 0xA806, 0xA80B, 0xA82C, 0xA8FF, 0xA9E5, 0xAA43, 0xAAB0, 0xAAC1, 0xFB1E, 0x101FD, 0x102E0, 0x10A3F, 0x11173, 0x1123E, 0x11357, 0x1145E, 0x11940, 0x119E4, 0x11A47, 0x11D3A, 0x11D47, 0x16F4F, 0x16FE4, 0x1DA75, 0x1DA84);

set.addRange(0x300, 0x36F).addRange(0x483, 0x489).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x610, 0x61A).addRange(0x64B, 0x65F).addRange(0x6D6, 0x6DC).addRange(0x6DF, 0x6E4).addRange(0x6E7, 0x6E8).addRange(0x6EA, 0x6ED).addRange(0x730, 0x74A).addRange(0x7A6, 0x7B0).addRange(0x7EB, 0x7F3).addRange(0x816, 0x819).addRange(0x81B, 0x823).addRange(0x825, 0x827).addRange(0x829, 0x82D).addRange(0x859, 0x85B).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x903).addRange(0x93A, 0x93C).addRange(0x93E, 0x94F).addRange(0x951, 0x957).addRange(0x962, 0x963).addRange(0x981, 0x983).addRange(0x9BE, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CD).addRange(0x9E2, 0x9E3).addRange(0xA01, 0xA03).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA70, 0xA71).addRange(0xA81, 0xA83).addRange(0xABE, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE2, 0xAE3).addRange(0xAFA, 0xAFF).addRange(0xB01, 0xB03).addRange(0xB3E, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB62, 0xB63).addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xC00, 0xC04);
set.addRange(0xC3E, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC62, 0xC63).addRange(0xC81, 0xC83).addRange(0xCBE, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE2, 0xCE3).addRange(0xD00, 0xD03).addRange(0xD3B, 0xD3C).addRange(0xD3E, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4D).addRange(0xD62, 0xD63).addRange(0xD81, 0xD83).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDF2, 0xDF3).addRange(0xE34, 0xE3A).addRange(0xE47, 0xE4E).addRange(0xEB4, 0xEBC).addRange(0xEC8, 0xECD).addRange(0xF18, 0xF19).addRange(0xF3E, 0xF3F).addRange(0xF71, 0xF84).addRange(0xF86, 0xF87).addRange(0xF8D, 0xF97).addRange(0xF99, 0xFBC).addRange(0x102B, 0x103E).addRange(0x1056, 0x1059).addRange(0x105E, 0x1060).addRange(0x1062, 0x1064).addRange(0x1067, 0x106D).addRange(0x1071, 0x1074).addRange(0x1082, 0x108D).addRange(0x109A, 0x109D).addRange(0x135D, 0x135F).addRange(0x1712, 0x1714).addRange(0x1732, 0x1734).addRange(0x1752, 0x1753).addRange(0x1772, 0x1773).addRange(0x17B4, 0x17D3).addRange(0x180B, 0x180D).addRange(0x1885, 0x1886).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1A17, 0x1A1B).addRange(0x1A55, 0x1A5E);
set.addRange(0x1A60, 0x1A7C).addRange(0x1AB0, 0x1AC0).addRange(0x1B00, 0x1B04).addRange(0x1B34, 0x1B44).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1B82).addRange(0x1BA1, 0x1BAD).addRange(0x1BE6, 0x1BF3).addRange(0x1C24, 0x1C37).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CE8).addRange(0x1CF7, 0x1CF9).addRange(0x1DC0, 0x1DF9).addRange(0x1DFB, 0x1DFF).addRange(0x20D0, 0x20F0).addRange(0x2CEF, 0x2CF1).addRange(0x2DE0, 0x2DFF).addRange(0x302A, 0x302F).addRange(0x3099, 0x309A).addRange(0xA66F, 0xA672).addRange(0xA674, 0xA67D).addRange(0xA69E, 0xA69F).addRange(0xA6F0, 0xA6F1).addRange(0xA823, 0xA827).addRange(0xA880, 0xA881).addRange(0xA8B4, 0xA8C5).addRange(0xA8E0, 0xA8F1).addRange(0xA926, 0xA92D).addRange(0xA947, 0xA953).addRange(0xA980, 0xA983).addRange(0xA9B3, 0xA9C0).addRange(0xAA29, 0xAA36).addRange(0xAA4C, 0xAA4D).addRange(0xAA7B, 0xAA7D).addRange(0xAAB2, 0xAAB4).addRange(0xAAB7, 0xAAB8).addRange(0xAABE, 0xAABF).addRange(0xAAEB, 0xAAEF).addRange(0xAAF5, 0xAAF6).addRange(0xABE3, 0xABEA).addRange(0xABEC, 0xABED).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2F).addRange(0x10376, 0x1037A).addRange(0x10A01, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A0F).addRange(0x10A38, 0x10A3A).addRange(0x10AE5, 0x10AE6).addRange(0x10D24, 0x10D27).addRange(0x10EAB, 0x10EAC);
set.addRange(0x10F46, 0x10F50).addRange(0x11000, 0x11002).addRange(0x11038, 0x11046).addRange(0x1107F, 0x11082).addRange(0x110B0, 0x110BA).addRange(0x11100, 0x11102).addRange(0x11127, 0x11134).addRange(0x11145, 0x11146).addRange(0x11180, 0x11182).addRange(0x111B3, 0x111C0).addRange(0x111C9, 0x111CC).addRange(0x111CE, 0x111CF).addRange(0x1122C, 0x11237).addRange(0x112DF, 0x112EA).addRange(0x11300, 0x11303).addRange(0x1133B, 0x1133C).addRange(0x1133E, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x11362, 0x11363).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11435, 0x11446).addRange(0x114B0, 0x114C3).addRange(0x115AF, 0x115B5).addRange(0x115B8, 0x115C0).addRange(0x115DC, 0x115DD).addRange(0x11630, 0x11640).addRange(0x116AB, 0x116B7).addRange(0x1171D, 0x1172B).addRange(0x1182C, 0x1183A).addRange(0x11930, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x1193E).addRange(0x11942, 0x11943).addRange(0x119D1, 0x119D7).addRange(0x119DA, 0x119E0).addRange(0x11A01, 0x11A0A).addRange(0x11A33, 0x11A39).addRange(0x11A3B, 0x11A3E).addRange(0x11A51, 0x11A5B).addRange(0x11A8A, 0x11A99).addRange(0x11C2F, 0x11C36).addRange(0x11C38, 0x11C3F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6).addRange(0x11D31, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D45).addRange(0x11D8A, 0x11D8E).addRange(0x11D90, 0x11D91);
set.addRange(0x11D93, 0x11D97).addRange(0x11EF3, 0x11EF6).addRange(0x16AF0, 0x16AF4).addRange(0x16B30, 0x16B36).addRange(0x16F51, 0x16F87).addRange(0x16F8F, 0x16F92).addRange(0x16FF0, 0x16FF1).addRange(0x1BC9D, 0x1BC9E).addRange(0x1D165, 0x1D169).addRange(0x1D16D, 0x1D172).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244).addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E130, 0x1E136).addRange(0x1E2EC, 0x1E2EF).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E944, 0x1E94A).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 657 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2B, 0x7C, 0x7E, 0xAC, 0xB1, 0xD7, 0xF7, 0x3F6, 0x2044, 0x2052, 0x2118, 0x214B, 0x21A0, 0x21A3, 0x21A6, 0x21AE, 0x21D2, 0x21D4, 0x237C, 0x25B7, 0x25C1, 0x266F, 0xFB29, 0xFE62, 0xFF0B, 0xFF5C, 0xFF5E, 0xFFE2, 0x1D6C1, 0x1D6DB, 0x1D6FB, 0x1D715, 0x1D735, 0x1D74F, 0x1D76F, 0x1D789, 0x1D7A9, 0x1D7C3);

set.addRange(0x3C, 0x3E).addRange(0x606, 0x608).addRange(0x207A, 0x207C).addRange(0x208A, 0x208C).addRange(0x2140, 0x2144).addRange(0x2190, 0x2194).addRange(0x219A, 0x219B).addRange(0x21CE, 0x21CF).addRange(0x21F4, 0x22FF).addRange(0x2320, 0x2321).addRange(0x239B, 0x23B3).addRange(0x23DC, 0x23E1).addRange(0x25F8, 0x25FF).addRange(0x27C0, 0x27C4).addRange(0x27C7, 0x27E5).addRange(0x27F0, 0x27FF).addRange(0x2900, 0x2982).addRange(0x2999, 0x29D7).addRange(0x29DC, 0x29FB).addRange(0x29FE, 0x2AFF).addRange(0x2B30, 0x2B44).addRange(0x2B47, 0x2B4C).addRange(0xFE64, 0xFE66).addRange(0xFF1C, 0xFF1E).addRange(0xFFE9, 0xFFEC).addRange(0x1EEF0, 0x1EEF1);
module.exports = set;

/***/ }),
/* 658 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2EC, 0x2EE, 0x374, 0x37A, 0x559, 0x640, 0x7FA, 0x81A, 0x824, 0x828, 0x971, 0xE46, 0xEC6, 0x10FC, 0x17D7, 0x1843, 0x1AA7, 0x1D78, 0x2071, 0x207F, 0x2D6F, 0x2E2F, 0x3005, 0x303B, 0xA015, 0xA60C, 0xA67F, 0xA770, 0xA788, 0xA9CF, 0xA9E6, 0xAA70, 0xAADD, 0xAB69, 0xFF70, 0x16FE3, 0x1E94B);

set.addRange(0x2B0, 0x2C1).addRange(0x2C6, 0x2D1).addRange(0x2E0, 0x2E4).addRange(0x6E5, 0x6E6).addRange(0x7F4, 0x7F5).addRange(0x1C78, 0x1C7D).addRange(0x1D2C, 0x1D6A).addRange(0x1D9B, 0x1DBF).addRange(0x2090, 0x209C).addRange(0x2C7C, 0x2C7D).addRange(0x3031, 0x3035).addRange(0x309D, 0x309E).addRange(0x30FC, 0x30FE).addRange(0xA4F8, 0xA4FD).addRange(0xA69C, 0xA69D).addRange(0xA717, 0xA71F).addRange(0xA7F8, 0xA7F9).addRange(0xAAF3, 0xAAF4).addRange(0xAB5C, 0xAB5F).addRange(0xFF9E, 0xFF9F).addRange(0x16B40, 0x16B43).addRange(0x16F93, 0x16F9F).addRange(0x16FE0, 0x16FE1).addRange(0x1E137, 0x1E13D);
module.exports = set;

/***/ }),
/* 659 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5E, 0x60, 0xA8, 0xAF, 0xB4, 0xB8, 0x2ED, 0x375, 0x1FBD, 0xAB5B, 0xFF3E, 0xFF40, 0xFFE3);

set.addRange(0x2C2, 0x2C5).addRange(0x2D2, 0x2DF).addRange(0x2E5, 0x2EB).addRange(0x2EF, 0x2FF).addRange(0x384, 0x385).addRange(0x1FBF, 0x1FC1).addRange(0x1FCD, 0x1FCF).addRange(0x1FDD, 0x1FDF).addRange(0x1FED, 0x1FEF).addRange(0x1FFD, 0x1FFE).addRange(0x309B, 0x309C).addRange(0xA700, 0xA716).addRange(0xA720, 0xA721).addRange(0xA789, 0xA78A).addRange(0xAB6A, 0xAB6B).addRange(0xFBB2, 0xFBC1).addRange(0x1F3FB, 0x1F3FF);
module.exports = set;

/***/ }),
/* 660 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5BF, 0x5C7, 0x670, 0x711, 0x7FD, 0x93A, 0x93C, 0x94D, 0x981, 0x9BC, 0x9CD, 0x9FE, 0xA3C, 0xA51, 0xA75, 0xABC, 0xACD, 0xB01, 0xB3C, 0xB3F, 0xB4D, 0xB82, 0xBC0, 0xBCD, 0xC00, 0xC04, 0xC81, 0xCBC, 0xCBF, 0xCC6, 0xD4D, 0xD81, 0xDCA, 0xDD6, 0xE31, 0xEB1, 0xF35, 0xF37, 0xF39, 0xFC6, 0x1082, 0x108D, 0x109D, 0x17C6, 0x17DD, 0x18A9, 0x1932, 0x1A1B, 0x1A56, 0x1A60, 0x1A62, 0x1A7F, 0x1B34, 0x1B3C, 0x1B42, 0x1BE6, 0x1BED, 0x1CED, 0x1CF4, 0x20E1, 0x2D7F, 0xA66F, 0xA802, 0xA806, 0xA80B, 0xA82C, 0xA8FF, 0xA9B3, 0xA9E5, 0xAA43, 0xAA4C, 0xAA7C, 0xAAB0, 0xAAC1, 0xAAF6, 0xABE5, 0xABE8, 0xABED, 0xFB1E, 0x101FD, 0x102E0, 0x10A3F, 0x11001, 0x11173, 0x111CF, 0x11234, 0x1123E, 0x112DF, 0x11340, 0x11446, 0x1145E, 0x114BA, 0x1163D, 0x116AB, 0x116AD, 0x116B7, 0x1193E, 0x11943, 0x119E0, 0x11A47, 0x11C3F, 0x11D3A, 0x11D47, 0x11D95, 0x11D97, 0x16F4F, 0x16FE4, 0x1DA75, 0x1DA84);

set.addRange(0x300, 0x36F).addRange(0x483, 0x487).addRange(0x591, 0x5BD).addRange(0x5C1, 0x5C2).addRange(0x5C4, 0x5C5).addRange(0x610, 0x61A).addRange(0x64B, 0x65F).addRange(0x6D6, 0x6DC).addRange(0x6DF, 0x6E4).addRange(0x6E7, 0x6E8).addRange(0x6EA, 0x6ED).addRange(0x730, 0x74A).addRange(0x7A6, 0x7B0).addRange(0x7EB, 0x7F3).addRange(0x816, 0x819).addRange(0x81B, 0x823).addRange(0x825, 0x827).addRange(0x829, 0x82D).addRange(0x859, 0x85B).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x902).addRange(0x941, 0x948).addRange(0x951, 0x957).addRange(0x962, 0x963).addRange(0x9C1, 0x9C4).addRange(0x9E2, 0x9E3).addRange(0xA01, 0xA02).addRange(0xA41, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA70, 0xA71).addRange(0xA81, 0xA82).addRange(0xAC1, 0xAC5).addRange(0xAC7, 0xAC8).addRange(0xAE2, 0xAE3).addRange(0xAFA, 0xAFF).addRange(0xB41, 0xB44).addRange(0xB55, 0xB56).addRange(0xB62, 0xB63).addRange(0xC3E, 0xC40).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC62, 0xC63).addRange(0xCCC, 0xCCD).addRange(0xCE2, 0xCE3).addRange(0xD00, 0xD01).addRange(0xD3B, 0xD3C).addRange(0xD41, 0xD44).addRange(0xD62, 0xD63).addRange(0xDD2, 0xDD4);
set.addRange(0xE34, 0xE3A).addRange(0xE47, 0xE4E).addRange(0xEB4, 0xEBC).addRange(0xEC8, 0xECD).addRange(0xF18, 0xF19).addRange(0xF71, 0xF7E).addRange(0xF80, 0xF84).addRange(0xF86, 0xF87).addRange(0xF8D, 0xF97).addRange(0xF99, 0xFBC).addRange(0x102D, 0x1030).addRange(0x1032, 0x1037).addRange(0x1039, 0x103A).addRange(0x103D, 0x103E).addRange(0x1058, 0x1059).addRange(0x105E, 0x1060).addRange(0x1071, 0x1074).addRange(0x1085, 0x1086).addRange(0x135D, 0x135F).addRange(0x1712, 0x1714).addRange(0x1732, 0x1734).addRange(0x1752, 0x1753).addRange(0x1772, 0x1773).addRange(0x17B4, 0x17B5).addRange(0x17B7, 0x17BD).addRange(0x17C9, 0x17D3).addRange(0x180B, 0x180D).addRange(0x1885, 0x1886).addRange(0x1920, 0x1922).addRange(0x1927, 0x1928).addRange(0x1939, 0x193B).addRange(0x1A17, 0x1A18).addRange(0x1A58, 0x1A5E).addRange(0x1A65, 0x1A6C).addRange(0x1A73, 0x1A7C).addRange(0x1AB0, 0x1ABD).addRange(0x1ABF, 0x1AC0).addRange(0x1B00, 0x1B03).addRange(0x1B36, 0x1B3A).addRange(0x1B6B, 0x1B73).addRange(0x1B80, 0x1B81).addRange(0x1BA2, 0x1BA5).addRange(0x1BA8, 0x1BA9).addRange(0x1BAB, 0x1BAD).addRange(0x1BE8, 0x1BE9).addRange(0x1BEF, 0x1BF1).addRange(0x1C2C, 0x1C33).addRange(0x1C36, 0x1C37).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CE0).addRange(0x1CE2, 0x1CE8);
set.addRange(0x1CF8, 0x1CF9).addRange(0x1DC0, 0x1DF9).addRange(0x1DFB, 0x1DFF).addRange(0x20D0, 0x20DC).addRange(0x20E5, 0x20F0).addRange(0x2CEF, 0x2CF1).addRange(0x2DE0, 0x2DFF).addRange(0x302A, 0x302D).addRange(0x3099, 0x309A).addRange(0xA674, 0xA67D).addRange(0xA69E, 0xA69F).addRange(0xA6F0, 0xA6F1).addRange(0xA825, 0xA826).addRange(0xA8C4, 0xA8C5).addRange(0xA8E0, 0xA8F1).addRange(0xA926, 0xA92D).addRange(0xA947, 0xA951).addRange(0xA980, 0xA982).addRange(0xA9B6, 0xA9B9).addRange(0xA9BC, 0xA9BD).addRange(0xAA29, 0xAA2E).addRange(0xAA31, 0xAA32).addRange(0xAA35, 0xAA36).addRange(0xAAB2, 0xAAB4).addRange(0xAAB7, 0xAAB8).addRange(0xAABE, 0xAABF).addRange(0xAAEC, 0xAAED).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2F).addRange(0x10376, 0x1037A).addRange(0x10A01, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A0F).addRange(0x10A38, 0x10A3A).addRange(0x10AE5, 0x10AE6).addRange(0x10D24, 0x10D27).addRange(0x10EAB, 0x10EAC).addRange(0x10F46, 0x10F50).addRange(0x11038, 0x11046).addRange(0x1107F, 0x11081).addRange(0x110B3, 0x110B6).addRange(0x110B9, 0x110BA).addRange(0x11100, 0x11102).addRange(0x11127, 0x1112B).addRange(0x1112D, 0x11134).addRange(0x11180, 0x11181).addRange(0x111B6, 0x111BE).addRange(0x111C9, 0x111CC).addRange(0x1122F, 0x11231).addRange(0x11236, 0x11237).addRange(0x112E3, 0x112EA);
set.addRange(0x11300, 0x11301).addRange(0x1133B, 0x1133C).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11438, 0x1143F).addRange(0x11442, 0x11444).addRange(0x114B3, 0x114B8).addRange(0x114BF, 0x114C0).addRange(0x114C2, 0x114C3).addRange(0x115B2, 0x115B5).addRange(0x115BC, 0x115BD).addRange(0x115BF, 0x115C0).addRange(0x115DC, 0x115DD).addRange(0x11633, 0x1163A).addRange(0x1163F, 0x11640).addRange(0x116B0, 0x116B5).addRange(0x1171D, 0x1171F).addRange(0x11722, 0x11725).addRange(0x11727, 0x1172B).addRange(0x1182F, 0x11837).addRange(0x11839, 0x1183A).addRange(0x1193B, 0x1193C).addRange(0x119D4, 0x119D7).addRange(0x119DA, 0x119DB).addRange(0x11A01, 0x11A0A).addRange(0x11A33, 0x11A38).addRange(0x11A3B, 0x11A3E).addRange(0x11A51, 0x11A56).addRange(0x11A59, 0x11A5B).addRange(0x11A8A, 0x11A96).addRange(0x11A98, 0x11A99).addRange(0x11C30, 0x11C36).addRange(0x11C38, 0x11C3D).addRange(0x11C92, 0x11CA7).addRange(0x11CAA, 0x11CB0).addRange(0x11CB2, 0x11CB3).addRange(0x11CB5, 0x11CB6).addRange(0x11D31, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D45).addRange(0x11D90, 0x11D91).addRange(0x11EF3, 0x11EF4).addRange(0x16AF0, 0x16AF4).addRange(0x16B30, 0x16B36).addRange(0x16F8F, 0x16F92).addRange(0x1BC9D, 0x1BC9E).addRange(0x1D167, 0x1D169).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0x1D242, 0x1D244);
set.addRange(0x1DA00, 0x1DA36).addRange(0x1DA3B, 0x1DA6C).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A).addRange(0x1E130, 0x1E136).addRange(0x1E2EC, 0x1E2EF).addRange(0x1E8D0, 0x1E8D6).addRange(0x1E944, 0x1E94A).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 661 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB9, 0x2070, 0x2CFD, 0x3007, 0x10341, 0x1034A);

set.addRange(0x30, 0x39).addRange(0xB2, 0xB3).addRange(0xBC, 0xBE).addRange(0x660, 0x669).addRange(0x6F0, 0x6F9).addRange(0x7C0, 0x7C9).addRange(0x966, 0x96F).addRange(0x9E6, 0x9EF).addRange(0x9F4, 0x9F9).addRange(0xA66, 0xA6F).addRange(0xAE6, 0xAEF).addRange(0xB66, 0xB6F).addRange(0xB72, 0xB77).addRange(0xBE6, 0xBF2).addRange(0xC66, 0xC6F).addRange(0xC78, 0xC7E).addRange(0xCE6, 0xCEF).addRange(0xD58, 0xD5E).addRange(0xD66, 0xD78).addRange(0xDE6, 0xDEF).addRange(0xE50, 0xE59).addRange(0xED0, 0xED9).addRange(0xF20, 0xF33).addRange(0x1040, 0x1049).addRange(0x1090, 0x1099).addRange(0x1369, 0x137C).addRange(0x16EE, 0x16F0).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x1810, 0x1819).addRange(0x1946, 0x194F).addRange(0x19D0, 0x19DA).addRange(0x1A80, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1B50, 0x1B59).addRange(0x1BB0, 0x1BB9).addRange(0x1C40, 0x1C49).addRange(0x1C50, 0x1C59).addRange(0x2074, 0x2079).addRange(0x2080, 0x2089).addRange(0x2150, 0x2182).addRange(0x2185, 0x2189).addRange(0x2460, 0x249B).addRange(0x24EA, 0x24FF).addRange(0x2776, 0x2793).addRange(0x3021, 0x3029).addRange(0x3038, 0x303A).addRange(0x3192, 0x3195).addRange(0x3220, 0x3229).addRange(0x3248, 0x324F).addRange(0x3251, 0x325F);
set.addRange(0x3280, 0x3289).addRange(0x32B1, 0x32BF).addRange(0xA620, 0xA629).addRange(0xA6E6, 0xA6EF).addRange(0xA830, 0xA835).addRange(0xA8D0, 0xA8D9).addRange(0xA900, 0xA909).addRange(0xA9D0, 0xA9D9).addRange(0xA9F0, 0xA9F9).addRange(0xAA50, 0xAA59).addRange(0xABF0, 0xABF9).addRange(0xFF10, 0xFF19).addRange(0x10107, 0x10133).addRange(0x10140, 0x10178).addRange(0x1018A, 0x1018B).addRange(0x102E1, 0x102FB).addRange(0x10320, 0x10323).addRange(0x103D1, 0x103D5).addRange(0x104A0, 0x104A9).addRange(0x10858, 0x1085F).addRange(0x10879, 0x1087F).addRange(0x108A7, 0x108AF).addRange(0x108FB, 0x108FF).addRange(0x10916, 0x1091B).addRange(0x109BC, 0x109BD).addRange(0x109C0, 0x109CF).addRange(0x109D2, 0x109FF).addRange(0x10A40, 0x10A48).addRange(0x10A7D, 0x10A7E).addRange(0x10A9D, 0x10A9F).addRange(0x10AEB, 0x10AEF).addRange(0x10B58, 0x10B5F).addRange(0x10B78, 0x10B7F).addRange(0x10BA9, 0x10BAF).addRange(0x10CFA, 0x10CFF).addRange(0x10D30, 0x10D39).addRange(0x10E60, 0x10E7E).addRange(0x10F1D, 0x10F26).addRange(0x10F51, 0x10F54).addRange(0x10FC5, 0x10FCB).addRange(0x11052, 0x1106F).addRange(0x110F0, 0x110F9).addRange(0x11136, 0x1113F).addRange(0x111D0, 0x111D9).addRange(0x111E1, 0x111F4).addRange(0x112F0, 0x112F9).addRange(0x11450, 0x11459).addRange(0x114D0, 0x114D9).addRange(0x11650, 0x11659).addRange(0x116C0, 0x116C9).addRange(0x11730, 0x1173B);
set.addRange(0x118E0, 0x118F2).addRange(0x11950, 0x11959).addRange(0x11C50, 0x11C6C).addRange(0x11D50, 0x11D59).addRange(0x11DA0, 0x11DA9).addRange(0x11FC0, 0x11FD4).addRange(0x12400, 0x1246E).addRange(0x16A60, 0x16A69).addRange(0x16B50, 0x16B59).addRange(0x16B5B, 0x16B61).addRange(0x16E80, 0x16E96).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D360, 0x1D378).addRange(0x1D7CE, 0x1D7FF).addRange(0x1E140, 0x1E149).addRange(0x1E2F0, 0x1E2F9).addRange(0x1E8C7, 0x1E8CF).addRange(0x1E950, 0x1E959).addRange(0x1EC71, 0x1ECAB).addRange(0x1ECAD, 0x1ECAF).addRange(0x1ECB1, 0x1ECB4).addRange(0x1ED01, 0x1ED2D).addRange(0x1ED2F, 0x1ED3D).addRange(0x1F100, 0x1F10C).addRange(0x1FBF0, 0x1FBF9);
module.exports = set;

/***/ }),
/* 662 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x28, 0x5B, 0x7B, 0xF3A, 0xF3C, 0x169B, 0x201A, 0x201E, 0x2045, 0x207D, 0x208D, 0x2308, 0x230A, 0x2329, 0x2768, 0x276A, 0x276C, 0x276E, 0x2770, 0x2772, 0x2774, 0x27C5, 0x27E6, 0x27E8, 0x27EA, 0x27EC, 0x27EE, 0x2983, 0x2985, 0x2987, 0x2989, 0x298B, 0x298D, 0x298F, 0x2991, 0x2993, 0x2995, 0x2997, 0x29D8, 0x29DA, 0x29FC, 0x2E22, 0x2E24, 0x2E26, 0x2E28, 0x2E42, 0x3008, 0x300A, 0x300C, 0x300E, 0x3010, 0x3014, 0x3016, 0x3018, 0x301A, 0x301D, 0xFD3F, 0xFE17, 0xFE35, 0xFE37, 0xFE39, 0xFE3B, 0xFE3D, 0xFE3F, 0xFE41, 0xFE43, 0xFE47, 0xFE59, 0xFE5B, 0xFE5D, 0xFF08, 0xFF3B, 0xFF5B, 0xFF5F, 0xFF62);

module.exports = set;

/***/ }),
/* 663 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAD, 0x38B, 0x38D, 0x3A2, 0x530, 0x590, 0x6DD, 0x83F, 0x85F, 0x8B5, 0x8E2, 0x984, 0x9A9, 0x9B1, 0x9DE, 0xA04, 0xA29, 0xA31, 0xA34, 0xA37, 0xA3D, 0xA5D, 0xA84, 0xA8E, 0xA92, 0xAA9, 0xAB1, 0xAB4, 0xAC6, 0xACA, 0xB00, 0xB04, 0xB29, 0xB31, 0xB34, 0xB5E, 0xB84, 0xB91, 0xB9B, 0xB9D, 0xBC9, 0xC0D, 0xC11, 0xC29, 0xC45, 0xC49, 0xC57, 0xC8D, 0xC91, 0xCA9, 0xCB4, 0xCC5, 0xCC9, 0xCDF, 0xCF0, 0xD0D, 0xD11, 0xD45, 0xD49, 0xD80, 0xD84, 0xDB2, 0xDBC, 0xDD5, 0xDD7, 0xE83, 0xE85, 0xE8B, 0xEA4, 0xEA6, 0xEC5, 0xEC7, 0xF48, 0xF98, 0xFBD, 0xFCD, 0x10C6, 0x1249, 0x1257, 0x1259, 0x1289, 0x12B1, 0x12BF, 0x12C1, 0x12D7, 0x1311, 0x170D, 0x176D, 0x1771, 0x191F, 0x1A5F, 0x1DFA, 0x1F58, 0x1F5A, 0x1F5C, 0x1F5E, 0x1FB5, 0x1FC5, 0x1FDC, 0x1FF5, 0x1FFF, 0x208F, 0x2B96, 0x2C2F, 0x2C5F, 0x2D26, 0x2DA7, 0x2DAF, 0x2DB7, 0x2DBF, 0x2DC7, 0x2DCF, 0x2DD7, 0x2DDF, 0x2E9A, 0x3040, 0x3130, 0x318F, 0x321F, 0xA9CE, 0xA9FF, 0xAB27, 0xAB2F, 0xFB37, 0xFB3D, 0xFB3F, 0xFB42, 0xFB45, 0xFE53, 0xFE67, 0xFE75, 0xFFE7, 0x1000C, 0x10027, 0x1003B, 0x1003E, 0x1018F, 0x1039E, 0x10809, 0x10836, 0x10856, 0x108F3, 0x10A04, 0x10A14, 0x10A18, 0x10E7F, 0x10EAA, 0x110BD, 0x11135, 0x111E0, 0x11212, 0x11287, 0x11289, 0x1128E, 0x1129E, 0x11304, 0x11329, 0x11331, 0x11334, 0x1133A, 0x1145C, 0x11914, 0x11917, 0x11936, 0x11C09, 0x11C37, 0x11CA8, 0x11D07, 0x11D0A, 0x11D3B, 0x11D3E, 0x11D66, 0x11D69, 0x11D8F, 0x11D92, 0x1246F, 0x16A5F, 0x16B5A, 0x16B62, 0x1D455, 0x1D49D, 0x1D4AD, 0x1D4BA, 0x1D4BC, 0x1D4C4, 0x1D506, 0x1D515, 0x1D51D, 0x1D53A, 0x1D53F, 0x1D545, 0x1D551, 0x1DAA0, 0x1E007, 0x1E022, 0x1E025, 0x1EE04, 0x1EE20, 0x1EE23, 0x1EE28, 0x1EE33, 0x1EE38, 0x1EE3A, 0x1EE48, 0x1EE4A, 0x1EE4C, 0x1EE50, 0x1EE53, 0x1EE58, 0x1EE5A, 0x1EE5C, 0x1EE5E, 0x1EE60, 0x1EE63, 0x1EE6B, 0x1EE73, 0x1EE78, 0x1EE7D, 0x1EE7F, 0x1EE8A, 0x1EEA4, 0x1EEAA, 0x1F0C0, 0x1F0D0, 0x1F979, 0x1F9CC, 0x1FB93);

set.addRange(0x0, 0x1F).addRange(0x7F, 0x9F).addRange(0x378, 0x379).addRange(0x380, 0x383).addRange(0x557, 0x558).addRange(0x58B, 0x58C).addRange(0x5C8, 0x5CF).addRange(0x5EB, 0x5EE).addRange(0x5F5, 0x605).addRange(0x61C, 0x61D).addRange(0x70E, 0x70F).addRange(0x74B, 0x74C).addRange(0x7B2, 0x7BF).addRange(0x7FB, 0x7FC).addRange(0x82E, 0x82F).addRange(0x85C, 0x85D).addRange(0x86B, 0x89F).addRange(0x8C8, 0x8D2).addRange(0x98D, 0x98E).addRange(0x991, 0x992).addRange(0x9B3, 0x9B5).addRange(0x9BA, 0x9BB).addRange(0x9C5, 0x9C6).addRange(0x9C9, 0x9CA).addRange(0x9CF, 0x9D6).addRange(0x9D8, 0x9DB).addRange(0x9E4, 0x9E5).addRange(0x9FF, 0xA00).addRange(0xA0B, 0xA0E).addRange(0xA11, 0xA12).addRange(0xA3A, 0xA3B).addRange(0xA43, 0xA46).addRange(0xA49, 0xA4A).addRange(0xA4E, 0xA50).addRange(0xA52, 0xA58).addRange(0xA5F, 0xA65).addRange(0xA77, 0xA80).addRange(0xABA, 0xABB).addRange(0xACE, 0xACF).addRange(0xAD1, 0xADF).addRange(0xAE4, 0xAE5).addRange(0xAF2, 0xAF8).addRange(0xB0D, 0xB0E).addRange(0xB11, 0xB12).addRange(0xB3A, 0xB3B).addRange(0xB45, 0xB46).addRange(0xB49, 0xB4A).addRange(0xB4E, 0xB54).addRange(0xB58, 0xB5B).addRange(0xB64, 0xB65).addRange(0xB78, 0xB81);
set.addRange(0xB8B, 0xB8D).addRange(0xB96, 0xB98).addRange(0xBA0, 0xBA2).addRange(0xBA5, 0xBA7).addRange(0xBAB, 0xBAD).addRange(0xBBA, 0xBBD).addRange(0xBC3, 0xBC5).addRange(0xBCE, 0xBCF).addRange(0xBD1, 0xBD6).addRange(0xBD8, 0xBE5).addRange(0xBFB, 0xBFF).addRange(0xC3A, 0xC3C).addRange(0xC4E, 0xC54).addRange(0xC5B, 0xC5F).addRange(0xC64, 0xC65).addRange(0xC70, 0xC76).addRange(0xCBA, 0xCBB).addRange(0xCCE, 0xCD4).addRange(0xCD7, 0xCDD).addRange(0xCE4, 0xCE5).addRange(0xCF3, 0xCFF).addRange(0xD50, 0xD53).addRange(0xD64, 0xD65).addRange(0xD97, 0xD99).addRange(0xDBE, 0xDBF).addRange(0xDC7, 0xDC9).addRange(0xDCB, 0xDCE).addRange(0xDE0, 0xDE5).addRange(0xDF0, 0xDF1).addRange(0xDF5, 0xE00).addRange(0xE3B, 0xE3E).addRange(0xE5C, 0xE80).addRange(0xEBE, 0xEBF).addRange(0xECE, 0xECF).addRange(0xEDA, 0xEDB).addRange(0xEE0, 0xEFF).addRange(0xF6D, 0xF70).addRange(0xFDB, 0xFFF).addRange(0x10C8, 0x10CC).addRange(0x10CE, 0x10CF).addRange(0x124E, 0x124F).addRange(0x125E, 0x125F).addRange(0x128E, 0x128F).addRange(0x12B6, 0x12B7).addRange(0x12C6, 0x12C7).addRange(0x1316, 0x1317).addRange(0x135B, 0x135C).addRange(0x137D, 0x137F).addRange(0x139A, 0x139F).addRange(0x13F6, 0x13F7).addRange(0x13FE, 0x13FF);
set.addRange(0x169D, 0x169F).addRange(0x16F9, 0x16FF).addRange(0x1715, 0x171F).addRange(0x1737, 0x173F).addRange(0x1754, 0x175F).addRange(0x1774, 0x177F).addRange(0x17DE, 0x17DF).addRange(0x17EA, 0x17EF).addRange(0x17FA, 0x17FF).addRange(0x180E, 0x180F).addRange(0x181A, 0x181F).addRange(0x1879, 0x187F).addRange(0x18AB, 0x18AF).addRange(0x18F6, 0x18FF).addRange(0x192C, 0x192F).addRange(0x193C, 0x193F).addRange(0x1941, 0x1943).addRange(0x196E, 0x196F).addRange(0x1975, 0x197F).addRange(0x19AC, 0x19AF).addRange(0x19CA, 0x19CF).addRange(0x19DB, 0x19DD).addRange(0x1A1C, 0x1A1D).addRange(0x1A7D, 0x1A7E).addRange(0x1A8A, 0x1A8F).addRange(0x1A9A, 0x1A9F).addRange(0x1AAE, 0x1AAF).addRange(0x1AC1, 0x1AFF).addRange(0x1B4C, 0x1B4F).addRange(0x1B7D, 0x1B7F).addRange(0x1BF4, 0x1BFB).addRange(0x1C38, 0x1C3A).addRange(0x1C4A, 0x1C4C).addRange(0x1C89, 0x1C8F).addRange(0x1CBB, 0x1CBC).addRange(0x1CC8, 0x1CCF).addRange(0x1CFB, 0x1CFF).addRange(0x1F16, 0x1F17).addRange(0x1F1E, 0x1F1F).addRange(0x1F46, 0x1F47).addRange(0x1F4E, 0x1F4F).addRange(0x1F7E, 0x1F7F).addRange(0x1FD4, 0x1FD5).addRange(0x1FF0, 0x1FF1).addRange(0x200B, 0x200F).addRange(0x202A, 0x202E).addRange(0x2060, 0x206F).addRange(0x2072, 0x2073).addRange(0x209D, 0x209F).addRange(0x20C0, 0x20CF).addRange(0x20F1, 0x20FF);
set.addRange(0x218C, 0x218F).addRange(0x2427, 0x243F).addRange(0x244B, 0x245F).addRange(0x2B74, 0x2B75).addRange(0x2CF4, 0x2CF8).addRange(0x2D28, 0x2D2C).addRange(0x2D2E, 0x2D2F).addRange(0x2D68, 0x2D6E).addRange(0x2D71, 0x2D7E).addRange(0x2D97, 0x2D9F).addRange(0x2E53, 0x2E7F).addRange(0x2EF4, 0x2EFF).addRange(0x2FD6, 0x2FEF).addRange(0x2FFC, 0x2FFF).addRange(0x3097, 0x3098).addRange(0x3100, 0x3104).addRange(0x31E4, 0x31EF).addRange(0x9FFD, 0x9FFF).addRange(0xA48D, 0xA48F).addRange(0xA4C7, 0xA4CF).addRange(0xA62C, 0xA63F).addRange(0xA6F8, 0xA6FF).addRange(0xA7C0, 0xA7C1).addRange(0xA7CB, 0xA7F4).addRange(0xA82D, 0xA82F).addRange(0xA83A, 0xA83F).addRange(0xA878, 0xA87F).addRange(0xA8C6, 0xA8CD).addRange(0xA8DA, 0xA8DF).addRange(0xA954, 0xA95E).addRange(0xA97D, 0xA97F).addRange(0xA9DA, 0xA9DD).addRange(0xAA37, 0xAA3F).addRange(0xAA4E, 0xAA4F).addRange(0xAA5A, 0xAA5B).addRange(0xAAC3, 0xAADA).addRange(0xAAF7, 0xAB00).addRange(0xAB07, 0xAB08).addRange(0xAB0F, 0xAB10).addRange(0xAB17, 0xAB1F).addRange(0xAB6C, 0xAB6F).addRange(0xABEE, 0xABEF).addRange(0xABFA, 0xABFF).addRange(0xD7A4, 0xD7AF).addRange(0xD7C7, 0xD7CA).addRange(0xD7FC, 0xF8FF).addRange(0xFA6E, 0xFA6F).addRange(0xFADA, 0xFAFF).addRange(0xFB07, 0xFB12).addRange(0xFB18, 0xFB1C).addRange(0xFBC2, 0xFBD2);
set.addRange(0xFD40, 0xFD4F).addRange(0xFD90, 0xFD91).addRange(0xFDC8, 0xFDEF).addRange(0xFDFE, 0xFDFF).addRange(0xFE1A, 0xFE1F).addRange(0xFE6C, 0xFE6F).addRange(0xFEFD, 0xFF00).addRange(0xFFBF, 0xFFC1).addRange(0xFFC8, 0xFFC9).addRange(0xFFD0, 0xFFD1).addRange(0xFFD8, 0xFFD9).addRange(0xFFDD, 0xFFDF).addRange(0xFFEF, 0xFFFB).addRange(0xFFFE, 0xFFFF).addRange(0x1004E, 0x1004F).addRange(0x1005E, 0x1007F).addRange(0x100FB, 0x100FF).addRange(0x10103, 0x10106).addRange(0x10134, 0x10136).addRange(0x1019D, 0x1019F).addRange(0x101A1, 0x101CF).addRange(0x101FE, 0x1027F).addRange(0x1029D, 0x1029F).addRange(0x102D1, 0x102DF).addRange(0x102FC, 0x102FF).addRange(0x10324, 0x1032C).addRange(0x1034B, 0x1034F).addRange(0x1037B, 0x1037F).addRange(0x103C4, 0x103C7).addRange(0x103D6, 0x103FF).addRange(0x1049E, 0x1049F).addRange(0x104AA, 0x104AF).addRange(0x104D4, 0x104D7).addRange(0x104FC, 0x104FF).addRange(0x10528, 0x1052F).addRange(0x10564, 0x1056E).addRange(0x10570, 0x105FF).addRange(0x10737, 0x1073F).addRange(0x10756, 0x1075F).addRange(0x10768, 0x107FF).addRange(0x10806, 0x10807).addRange(0x10839, 0x1083B).addRange(0x1083D, 0x1083E).addRange(0x1089F, 0x108A6).addRange(0x108B0, 0x108DF).addRange(0x108F6, 0x108FA).addRange(0x1091C, 0x1091E).addRange(0x1093A, 0x1093E).addRange(0x10940, 0x1097F).addRange(0x109B8, 0x109BB).addRange(0x109D0, 0x109D1);
set.addRange(0x10A07, 0x10A0B).addRange(0x10A36, 0x10A37).addRange(0x10A3B, 0x10A3E).addRange(0x10A49, 0x10A4F).addRange(0x10A59, 0x10A5F).addRange(0x10AA0, 0x10ABF).addRange(0x10AE7, 0x10AEA).addRange(0x10AF7, 0x10AFF).addRange(0x10B36, 0x10B38).addRange(0x10B56, 0x10B57).addRange(0x10B73, 0x10B77).addRange(0x10B92, 0x10B98).addRange(0x10B9D, 0x10BA8).addRange(0x10BB0, 0x10BFF).addRange(0x10C49, 0x10C7F).addRange(0x10CB3, 0x10CBF).addRange(0x10CF3, 0x10CF9).addRange(0x10D28, 0x10D2F).addRange(0x10D3A, 0x10E5F).addRange(0x10EAE, 0x10EAF).addRange(0x10EB2, 0x10EFF).addRange(0x10F28, 0x10F2F).addRange(0x10F5A, 0x10FAF).addRange(0x10FCC, 0x10FDF).addRange(0x10FF7, 0x10FFF).addRange(0x1104E, 0x11051).addRange(0x11070, 0x1107E).addRange(0x110C2, 0x110CF).addRange(0x110E9, 0x110EF).addRange(0x110FA, 0x110FF).addRange(0x11148, 0x1114F).addRange(0x11177, 0x1117F).addRange(0x111F5, 0x111FF).addRange(0x1123F, 0x1127F).addRange(0x112AA, 0x112AF).addRange(0x112EB, 0x112EF).addRange(0x112FA, 0x112FF).addRange(0x1130D, 0x1130E).addRange(0x11311, 0x11312).addRange(0x11345, 0x11346).addRange(0x11349, 0x1134A).addRange(0x1134E, 0x1134F).addRange(0x11351, 0x11356).addRange(0x11358, 0x1135C).addRange(0x11364, 0x11365).addRange(0x1136D, 0x1136F).addRange(0x11375, 0x113FF).addRange(0x11462, 0x1147F).addRange(0x114C8, 0x114CF).addRange(0x114DA, 0x1157F).addRange(0x115B6, 0x115B7);
set.addRange(0x115DE, 0x115FF).addRange(0x11645, 0x1164F).addRange(0x1165A, 0x1165F).addRange(0x1166D, 0x1167F).addRange(0x116B9, 0x116BF).addRange(0x116CA, 0x116FF).addRange(0x1171B, 0x1171C).addRange(0x1172C, 0x1172F).addRange(0x11740, 0x117FF).addRange(0x1183C, 0x1189F).addRange(0x118F3, 0x118FE).addRange(0x11907, 0x11908).addRange(0x1190A, 0x1190B).addRange(0x11939, 0x1193A).addRange(0x11947, 0x1194F).addRange(0x1195A, 0x1199F).addRange(0x119A8, 0x119A9).addRange(0x119D8, 0x119D9).addRange(0x119E5, 0x119FF).addRange(0x11A48, 0x11A4F).addRange(0x11AA3, 0x11ABF).addRange(0x11AF9, 0x11BFF).addRange(0x11C46, 0x11C4F).addRange(0x11C6D, 0x11C6F).addRange(0x11C90, 0x11C91).addRange(0x11CB7, 0x11CFF).addRange(0x11D37, 0x11D39).addRange(0x11D48, 0x11D4F).addRange(0x11D5A, 0x11D5F).addRange(0x11D99, 0x11D9F).addRange(0x11DAA, 0x11EDF).addRange(0x11EF9, 0x11FAF).addRange(0x11FB1, 0x11FBF).addRange(0x11FF2, 0x11FFE).addRange(0x1239A, 0x123FF).addRange(0x12475, 0x1247F).addRange(0x12544, 0x12FFF).addRange(0x1342F, 0x143FF).addRange(0x14647, 0x167FF).addRange(0x16A39, 0x16A3F).addRange(0x16A6A, 0x16A6D).addRange(0x16A70, 0x16ACF).addRange(0x16AEE, 0x16AEF).addRange(0x16AF6, 0x16AFF).addRange(0x16B46, 0x16B4F).addRange(0x16B78, 0x16B7C).addRange(0x16B90, 0x16E3F).addRange(0x16E9B, 0x16EFF).addRange(0x16F4B, 0x16F4E).addRange(0x16F88, 0x16F8E).addRange(0x16FA0, 0x16FDF);
set.addRange(0x16FE5, 0x16FEF).addRange(0x16FF2, 0x16FFF).addRange(0x187F8, 0x187FF).addRange(0x18CD6, 0x18CFF).addRange(0x18D09, 0x1AFFF).addRange(0x1B11F, 0x1B14F).addRange(0x1B153, 0x1B163).addRange(0x1B168, 0x1B16F).addRange(0x1B2FC, 0x1BBFF).addRange(0x1BC6B, 0x1BC6F).addRange(0x1BC7D, 0x1BC7F).addRange(0x1BC89, 0x1BC8F).addRange(0x1BC9A, 0x1BC9B).addRange(0x1BCA0, 0x1CFFF).addRange(0x1D0F6, 0x1D0FF).addRange(0x1D127, 0x1D128).addRange(0x1D173, 0x1D17A).addRange(0x1D1E9, 0x1D1FF).addRange(0x1D246, 0x1D2DF).addRange(0x1D2F4, 0x1D2FF).addRange(0x1D357, 0x1D35F).addRange(0x1D379, 0x1D3FF).addRange(0x1D4A0, 0x1D4A1).addRange(0x1D4A3, 0x1D4A4).addRange(0x1D4A7, 0x1D4A8).addRange(0x1D50B, 0x1D50C).addRange(0x1D547, 0x1D549).addRange(0x1D6A6, 0x1D6A7).addRange(0x1D7CC, 0x1D7CD).addRange(0x1DA8C, 0x1DA9A).addRange(0x1DAB0, 0x1DFFF).addRange(0x1E019, 0x1E01A).addRange(0x1E02B, 0x1E0FF).addRange(0x1E12D, 0x1E12F).addRange(0x1E13E, 0x1E13F).addRange(0x1E14A, 0x1E14D).addRange(0x1E150, 0x1E2BF).addRange(0x1E2FA, 0x1E2FE).addRange(0x1E300, 0x1E7FF).addRange(0x1E8C5, 0x1E8C6).addRange(0x1E8D7, 0x1E8FF).addRange(0x1E94C, 0x1E94F).addRange(0x1E95A, 0x1E95D).addRange(0x1E960, 0x1EC70).addRange(0x1ECB5, 0x1ED00).addRange(0x1ED3E, 0x1EDFF).addRange(0x1EE25, 0x1EE26).addRange(0x1EE3C, 0x1EE41).addRange(0x1EE43, 0x1EE46).addRange(0x1EE55, 0x1EE56).addRange(0x1EE65, 0x1EE66);
set.addRange(0x1EE9C, 0x1EEA0).addRange(0x1EEBC, 0x1EEEF).addRange(0x1EEF2, 0x1EFFF).addRange(0x1F02C, 0x1F02F).addRange(0x1F094, 0x1F09F).addRange(0x1F0AF, 0x1F0B0).addRange(0x1F0F6, 0x1F0FF).addRange(0x1F1AE, 0x1F1E5).addRange(0x1F203, 0x1F20F).addRange(0x1F23C, 0x1F23F).addRange(0x1F249, 0x1F24F).addRange(0x1F252, 0x1F25F).addRange(0x1F266, 0x1F2FF).addRange(0x1F6D8, 0x1F6DF).addRange(0x1F6ED, 0x1F6EF).addRange(0x1F6FD, 0x1F6FF).addRange(0x1F774, 0x1F77F).addRange(0x1F7D9, 0x1F7DF).addRange(0x1F7EC, 0x1F7FF).addRange(0x1F80C, 0x1F80F).addRange(0x1F848, 0x1F84F).addRange(0x1F85A, 0x1F85F).addRange(0x1F888, 0x1F88F).addRange(0x1F8AE, 0x1F8AF).addRange(0x1F8B2, 0x1F8FF).addRange(0x1FA54, 0x1FA5F).addRange(0x1FA6E, 0x1FA6F).addRange(0x1FA75, 0x1FA77).addRange(0x1FA7B, 0x1FA7F).addRange(0x1FA87, 0x1FA8F).addRange(0x1FAA9, 0x1FAAF).addRange(0x1FAB7, 0x1FABF).addRange(0x1FAC3, 0x1FACF).addRange(0x1FAD7, 0x1FAFF).addRange(0x1FBCB, 0x1FBEF).addRange(0x1FBFA, 0x1FFFF).addRange(0x2A6DE, 0x2A6FF).addRange(0x2B735, 0x2B73F).addRange(0x2B81E, 0x2B81F).addRange(0x2CEA2, 0x2CEAF).addRange(0x2EBE1, 0x2F7FF).addRange(0x2FA1E, 0x2FFFF).addRange(0x3134B, 0xE00FF).addRange(0xE01F0, 0x10FFFF);
module.exports = set;

/***/ }),
/* 664 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xBA, 0x1BB, 0x294, 0x6D5, 0x6FF, 0x710, 0x7B1, 0x93D, 0x950, 0x9B2, 0x9BD, 0x9CE, 0x9FC, 0xA5E, 0xABD, 0xAD0, 0xAF9, 0xB3D, 0xB71, 0xB83, 0xB9C, 0xBD0, 0xC3D, 0xC80, 0xCBD, 0xCDE, 0xD3D, 0xD4E, 0xDBD, 0xE84, 0xEA5, 0xEBD, 0xF00, 0x103F, 0x1061, 0x108E, 0x1258, 0x12C0, 0x17DC, 0x18AA, 0x1CFA, 0x3006, 0x303C, 0x309F, 0x30FF, 0xA66E, 0xA78F, 0xA7F7, 0xA8FB, 0xAA7A, 0xAAB1, 0xAAC0, 0xAAC2, 0xAAF2, 0xFB1D, 0xFB3E, 0x10808, 0x1083C, 0x10A00, 0x10F27, 0x11144, 0x11147, 0x11176, 0x111DA, 0x111DC, 0x11288, 0x1133D, 0x11350, 0x114C7, 0x11644, 0x116B8, 0x11909, 0x1193F, 0x11941, 0x119E1, 0x119E3, 0x11A00, 0x11A3A, 0x11A50, 0x11A9D, 0x11C40, 0x11D46, 0x11D98, 0x11FB0, 0x16F50, 0x1E14E, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x1C0, 0x1C3).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F2).addRange(0x620, 0x63F).addRange(0x641, 0x64A).addRange(0x66E, 0x66F).addRange(0x671, 0x6D3).addRange(0x6EE, 0x6EF).addRange(0x6FA, 0x6FC).addRange(0x712, 0x72F).addRange(0x74D, 0x7A5).addRange(0x7CA, 0x7EA).addRange(0x800, 0x815).addRange(0x840, 0x858).addRange(0x860, 0x86A).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x904, 0x939).addRange(0x958, 0x961).addRange(0x972, 0x980).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E1).addRange(0x9F0, 0x9F1).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA59, 0xA5C).addRange(0xA72, 0xA74).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xAE0, 0xAE1).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB5C, 0xB5D);
set.addRange(0xB5F, 0xB61).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xC05, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC61).addRange(0xC85, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCE0, 0xCE1).addRange(0xCF1, 0xCF2).addRange(0xD04, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD3A).addRange(0xD54, 0xD56).addRange(0xD5F, 0xD61).addRange(0xD7A, 0xD7F).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xE01, 0xE30).addRange(0xE32, 0xE33).addRange(0xE40, 0xE45).addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEB0).addRange(0xEB2, 0xEB3).addRange(0xEC0, 0xEC4).addRange(0xEDC, 0xEDF).addRange(0xF40, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF88, 0xF8C).addRange(0x1000, 0x102A).addRange(0x1050, 0x1055).addRange(0x105A, 0x105D).addRange(0x1065, 0x1066).addRange(0x106E, 0x1070).addRange(0x1075, 0x1081);
set.addRange(0x1100, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x1380, 0x138F).addRange(0x1401, 0x166C).addRange(0x166F, 0x167F).addRange(0x1681, 0x169A).addRange(0x16A0, 0x16EA).addRange(0x16F1, 0x16F8).addRange(0x1700, 0x170C).addRange(0x170E, 0x1711).addRange(0x1720, 0x1731).addRange(0x1740, 0x1751).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1780, 0x17B3).addRange(0x1820, 0x1842).addRange(0x1844, 0x1878).addRange(0x1880, 0x1884).addRange(0x1887, 0x18A8).addRange(0x18B0, 0x18F5).addRange(0x1900, 0x191E).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974).addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x1A00, 0x1A16).addRange(0x1A20, 0x1A54).addRange(0x1B05, 0x1B33).addRange(0x1B45, 0x1B4B).addRange(0x1B83, 0x1BA0).addRange(0x1BAE, 0x1BAF).addRange(0x1BBA, 0x1BE5).addRange(0x1C00, 0x1C23).addRange(0x1C4D, 0x1C4F).addRange(0x1C5A, 0x1C77).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF6).addRange(0x2135, 0x2138);
set.addRange(0x2D30, 0x2D67).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0x3041, 0x3096).addRange(0x30A1, 0x30FA).addRange(0x3105, 0x312F).addRange(0x3131, 0x318E).addRange(0x31A0, 0x31BF).addRange(0x31F0, 0x31FF).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA000, 0xA014).addRange(0xA016, 0xA48C).addRange(0xA4D0, 0xA4F7).addRange(0xA500, 0xA60B).addRange(0xA610, 0xA61F).addRange(0xA62A, 0xA62B).addRange(0xA6A0, 0xA6E5).addRange(0xA7FB, 0xA801).addRange(0xA803, 0xA805).addRange(0xA807, 0xA80A).addRange(0xA80C, 0xA822).addRange(0xA840, 0xA873).addRange(0xA882, 0xA8B3).addRange(0xA8F2, 0xA8F7).addRange(0xA8FD, 0xA8FE).addRange(0xA90A, 0xA925).addRange(0xA930, 0xA946).addRange(0xA960, 0xA97C).addRange(0xA984, 0xA9B2).addRange(0xA9E0, 0xA9E4).addRange(0xA9E7, 0xA9EF).addRange(0xA9FA, 0xA9FE).addRange(0xAA00, 0xAA28).addRange(0xAA40, 0xAA42).addRange(0xAA44, 0xAA4B).addRange(0xAA60, 0xAA6F).addRange(0xAA71, 0xAA76).addRange(0xAA7E, 0xAAAF).addRange(0xAAB5, 0xAAB6).addRange(0xAAB9, 0xAABD).addRange(0xAADB, 0xAADC).addRange(0xAAE0, 0xAAEA).addRange(0xAB01, 0xAB06);
set.addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E).addRange(0xABC0, 0xABE2).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFB1F, 0xFB28).addRange(0xFB2A, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFBB1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFB).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0xFF66, 0xFF6F).addRange(0xFF71, 0xFF9D).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC).addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10280, 0x1029C).addRange(0x102A0, 0x102D0).addRange(0x10300, 0x1031F).addRange(0x1032D, 0x10340).addRange(0x10342, 0x10349).addRange(0x10350, 0x10375).addRange(0x10380, 0x1039D).addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103CF).addRange(0x10450, 0x1049D).addRange(0x10500, 0x10527).addRange(0x10530, 0x10563).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767);
set.addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838).addRange(0x1083F, 0x10855).addRange(0x10860, 0x10876).addRange(0x10880, 0x1089E).addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x10900, 0x10915).addRange(0x10920, 0x10939).addRange(0x10980, 0x109B7).addRange(0x109BE, 0x109BF).addRange(0x10A10, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A60, 0x10A7C).addRange(0x10A80, 0x10A9C).addRange(0x10AC0, 0x10AC7).addRange(0x10AC9, 0x10AE4).addRange(0x10B00, 0x10B35).addRange(0x10B40, 0x10B55).addRange(0x10B60, 0x10B72).addRange(0x10B80, 0x10B91).addRange(0x10C00, 0x10C48).addRange(0x10D00, 0x10D23).addRange(0x10E80, 0x10EA9).addRange(0x10EB0, 0x10EB1).addRange(0x10F00, 0x10F1C).addRange(0x10F30, 0x10F45).addRange(0x10FB0, 0x10FC4).addRange(0x10FE0, 0x10FF6).addRange(0x11003, 0x11037).addRange(0x11083, 0x110AF).addRange(0x110D0, 0x110E8).addRange(0x11103, 0x11126).addRange(0x11150, 0x11172).addRange(0x11183, 0x111B2).addRange(0x111C1, 0x111C4).addRange(0x11200, 0x11211).addRange(0x11213, 0x1122B).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A8).addRange(0x112B0, 0x112DE).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339);
set.addRange(0x1135D, 0x11361).addRange(0x11400, 0x11434).addRange(0x11447, 0x1144A).addRange(0x1145F, 0x11461).addRange(0x11480, 0x114AF).addRange(0x114C4, 0x114C5).addRange(0x11580, 0x115AE).addRange(0x115D8, 0x115DB).addRange(0x11600, 0x1162F).addRange(0x11680, 0x116AA).addRange(0x11700, 0x1171A).addRange(0x11800, 0x1182B).addRange(0x118FF, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x1192F).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D0).addRange(0x11A0B, 0x11A32).addRange(0x11A5C, 0x11A89).addRange(0x11AC0, 0x11AF8).addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C2E).addRange(0x11C72, 0x11C8F).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D30).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D89).addRange(0x11EE0, 0x11EF2).addRange(0x12000, 0x12399).addRange(0x12480, 0x12543).addRange(0x13000, 0x1342E).addRange(0x14400, 0x14646).addRange(0x16800, 0x16A38).addRange(0x16A40, 0x16A5E).addRange(0x16AD0, 0x16AED).addRange(0x16B00, 0x16B2F).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F).addRange(0x16F00, 0x16F4A).addRange(0x17000, 0x187F7).addRange(0x18800, 0x18CD5).addRange(0x18D00, 0x18D08).addRange(0x1B000, 0x1B11E).addRange(0x1B150, 0x1B152).addRange(0x1B164, 0x1B167).addRange(0x1B170, 0x1B2FB).addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C);
set.addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1E100, 0x1E12C).addRange(0x1E2C0, 0x1E2EB).addRange(0x1E800, 0x1E8C4).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 665 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB9, 0x19DA, 0x2070, 0x2189, 0x2CFD);

set.addRange(0xB2, 0xB3).addRange(0xBC, 0xBE).addRange(0x9F4, 0x9F9).addRange(0xB72, 0xB77).addRange(0xBF0, 0xBF2).addRange(0xC78, 0xC7E).addRange(0xD58, 0xD5E).addRange(0xD70, 0xD78).addRange(0xF2A, 0xF33).addRange(0x1369, 0x137C).addRange(0x17F0, 0x17F9).addRange(0x2074, 0x2079).addRange(0x2080, 0x2089).addRange(0x2150, 0x215F).addRange(0x2460, 0x249B).addRange(0x24EA, 0x24FF).addRange(0x2776, 0x2793).addRange(0x3192, 0x3195).addRange(0x3220, 0x3229).addRange(0x3248, 0x324F).addRange(0x3251, 0x325F).addRange(0x3280, 0x3289).addRange(0x32B1, 0x32BF).addRange(0xA830, 0xA835).addRange(0x10107, 0x10133).addRange(0x10175, 0x10178).addRange(0x1018A, 0x1018B).addRange(0x102E1, 0x102FB).addRange(0x10320, 0x10323).addRange(0x10858, 0x1085F).addRange(0x10879, 0x1087F).addRange(0x108A7, 0x108AF).addRange(0x108FB, 0x108FF).addRange(0x10916, 0x1091B).addRange(0x109BC, 0x109BD).addRange(0x109C0, 0x109CF).addRange(0x109D2, 0x109FF).addRange(0x10A40, 0x10A48).addRange(0x10A7D, 0x10A7E).addRange(0x10A9D, 0x10A9F).addRange(0x10AEB, 0x10AEF).addRange(0x10B58, 0x10B5F).addRange(0x10B78, 0x10B7F).addRange(0x10BA9, 0x10BAF).addRange(0x10CFA, 0x10CFF).addRange(0x10E60, 0x10E7E).addRange(0x10F1D, 0x10F26).addRange(0x10F51, 0x10F54).addRange(0x10FC5, 0x10FCB).addRange(0x11052, 0x11065).addRange(0x111E1, 0x111F4);
set.addRange(0x1173A, 0x1173B).addRange(0x118EA, 0x118F2).addRange(0x11C5A, 0x11C6C).addRange(0x11FC0, 0x11FD4).addRange(0x16B5B, 0x16B61).addRange(0x16E80, 0x16E96).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D360, 0x1D378).addRange(0x1E8C7, 0x1E8CF).addRange(0x1EC71, 0x1ECAB).addRange(0x1ECAD, 0x1ECAF).addRange(0x1ECB1, 0x1ECB4).addRange(0x1ED01, 0x1ED2D).addRange(0x1ED2F, 0x1ED3D).addRange(0x1F100, 0x1F10C);
module.exports = set;

/***/ }),
/* 666 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2A, 0x2C, 0x5C, 0xA1, 0xA7, 0xBF, 0x37E, 0x387, 0x589, 0x5C0, 0x5C3, 0x5C6, 0x61B, 0x6D4, 0x85E, 0x970, 0x9FD, 0xA76, 0xAF0, 0xC77, 0xC84, 0xDF4, 0xE4F, 0xF14, 0xF85, 0x10FB, 0x166E, 0x1CD3, 0x2053, 0x2D70, 0x2E0B, 0x2E1B, 0x2E41, 0x2E52, 0x303D, 0x30FB, 0xA673, 0xA67E, 0xA8FC, 0xA95F, 0xABEB, 0xFE19, 0xFE30, 0xFE68, 0xFF0A, 0xFF0C, 0xFF3C, 0xFF61, 0x1039F, 0x103D0, 0x1056F, 0x10857, 0x1091F, 0x1093F, 0x10A7F, 0x111CD, 0x111DB, 0x112A9, 0x1145D, 0x114C6, 0x1183B, 0x119E2, 0x11FFF, 0x16AF5, 0x16B44, 0x16FE2, 0x1BC9F);

set.addRange(0x21, 0x23).addRange(0x25, 0x27).addRange(0x2E, 0x2F).addRange(0x3A, 0x3B).addRange(0x3F, 0x40).addRange(0xB6, 0xB7).addRange(0x55A, 0x55F).addRange(0x5F3, 0x5F4).addRange(0x609, 0x60A).addRange(0x60C, 0x60D).addRange(0x61E, 0x61F).addRange(0x66A, 0x66D).addRange(0x700, 0x70D).addRange(0x7F7, 0x7F9).addRange(0x830, 0x83E).addRange(0x964, 0x965).addRange(0xE5A, 0xE5B).addRange(0xF04, 0xF12).addRange(0xFD0, 0xFD4).addRange(0xFD9, 0xFDA).addRange(0x104A, 0x104F).addRange(0x1360, 0x1368).addRange(0x16EB, 0x16ED).addRange(0x1735, 0x1736).addRange(0x17D4, 0x17D6).addRange(0x17D8, 0x17DA).addRange(0x1800, 0x1805).addRange(0x1807, 0x180A).addRange(0x1944, 0x1945).addRange(0x1A1E, 0x1A1F).addRange(0x1AA0, 0x1AA6).addRange(0x1AA8, 0x1AAD).addRange(0x1B5A, 0x1B60).addRange(0x1BFC, 0x1BFF).addRange(0x1C3B, 0x1C3F).addRange(0x1C7E, 0x1C7F).addRange(0x1CC0, 0x1CC7).addRange(0x2016, 0x2017).addRange(0x2020, 0x2027).addRange(0x2030, 0x2038).addRange(0x203B, 0x203E).addRange(0x2041, 0x2043).addRange(0x2047, 0x2051).addRange(0x2055, 0x205E).addRange(0x2CF9, 0x2CFC).addRange(0x2CFE, 0x2CFF).addRange(0x2E00, 0x2E01).addRange(0x2E06, 0x2E08).addRange(0x2E0E, 0x2E16).addRange(0x2E18, 0x2E19).addRange(0x2E1E, 0x2E1F);
set.addRange(0x2E2A, 0x2E2E).addRange(0x2E30, 0x2E39).addRange(0x2E3C, 0x2E3F).addRange(0x2E43, 0x2E4F).addRange(0x3001, 0x3003).addRange(0xA4FE, 0xA4FF).addRange(0xA60D, 0xA60F).addRange(0xA6F2, 0xA6F7).addRange(0xA874, 0xA877).addRange(0xA8CE, 0xA8CF).addRange(0xA8F8, 0xA8FA).addRange(0xA92E, 0xA92F).addRange(0xA9C1, 0xA9CD).addRange(0xA9DE, 0xA9DF).addRange(0xAA5C, 0xAA5F).addRange(0xAADE, 0xAADF).addRange(0xAAF0, 0xAAF1).addRange(0xFE10, 0xFE16).addRange(0xFE45, 0xFE46).addRange(0xFE49, 0xFE4C).addRange(0xFE50, 0xFE52).addRange(0xFE54, 0xFE57).addRange(0xFE5F, 0xFE61).addRange(0xFE6A, 0xFE6B).addRange(0xFF01, 0xFF03).addRange(0xFF05, 0xFF07).addRange(0xFF0E, 0xFF0F).addRange(0xFF1A, 0xFF1B).addRange(0xFF1F, 0xFF20).addRange(0xFF64, 0xFF65).addRange(0x10100, 0x10102).addRange(0x10A50, 0x10A58).addRange(0x10AF0, 0x10AF6).addRange(0x10B39, 0x10B3F).addRange(0x10B99, 0x10B9C).addRange(0x10F55, 0x10F59).addRange(0x11047, 0x1104D).addRange(0x110BB, 0x110BC).addRange(0x110BE, 0x110C1).addRange(0x11140, 0x11143).addRange(0x11174, 0x11175).addRange(0x111C5, 0x111C8).addRange(0x111DD, 0x111DF).addRange(0x11238, 0x1123D).addRange(0x1144B, 0x1144F).addRange(0x1145A, 0x1145B).addRange(0x115C1, 0x115D7).addRange(0x11641, 0x11643).addRange(0x11660, 0x1166C).addRange(0x1173C, 0x1173E).addRange(0x11944, 0x11946);
set.addRange(0x11A3F, 0x11A46).addRange(0x11A9A, 0x11A9C).addRange(0x11A9E, 0x11AA2).addRange(0x11C41, 0x11C45).addRange(0x11C70, 0x11C71).addRange(0x11EF7, 0x11EF8).addRange(0x12470, 0x12474).addRange(0x16A6E, 0x16A6F).addRange(0x16B37, 0x16B3B).addRange(0x16E97, 0x16E9A).addRange(0x1DA87, 0x1DA8B).addRange(0x1E95E, 0x1E95F);
module.exports = set;

/***/ }),
/* 667 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA6, 0xA9, 0xAE, 0xB0, 0x482, 0x6DE, 0x6E9, 0x7F6, 0x9FA, 0xB70, 0xBFA, 0xC7F, 0xD4F, 0xD79, 0xF13, 0xF34, 0xF36, 0xF38, 0x166D, 0x1940, 0x2114, 0x2125, 0x2127, 0x2129, 0x212E, 0x214A, 0x214F, 0x21D3, 0x3004, 0x3020, 0x3250, 0xA839, 0xFDFD, 0xFFE4, 0xFFE8, 0x101A0, 0x10AC8, 0x1173F, 0x16B45, 0x1BC9C, 0x1D245, 0x1E14F, 0x1ECAC, 0x1ED2E);

set.addRange(0x58D, 0x58E).addRange(0x60E, 0x60F).addRange(0x6FD, 0x6FE).addRange(0xBF3, 0xBF8).addRange(0xF01, 0xF03).addRange(0xF15, 0xF17).addRange(0xF1A, 0xF1F).addRange(0xFBE, 0xFC5).addRange(0xFC7, 0xFCC).addRange(0xFCE, 0xFCF).addRange(0xFD5, 0xFD8).addRange(0x109E, 0x109F).addRange(0x1390, 0x1399).addRange(0x19DE, 0x19FF).addRange(0x1B61, 0x1B6A).addRange(0x1B74, 0x1B7C).addRange(0x2100, 0x2101).addRange(0x2103, 0x2106).addRange(0x2108, 0x2109).addRange(0x2116, 0x2117).addRange(0x211E, 0x2123).addRange(0x213A, 0x213B).addRange(0x214C, 0x214D).addRange(0x218A, 0x218B).addRange(0x2195, 0x2199).addRange(0x219C, 0x219F).addRange(0x21A1, 0x21A2).addRange(0x21A4, 0x21A5).addRange(0x21A7, 0x21AD).addRange(0x21AF, 0x21CD).addRange(0x21D0, 0x21D1).addRange(0x21D5, 0x21F3).addRange(0x2300, 0x2307).addRange(0x230C, 0x231F).addRange(0x2322, 0x2328).addRange(0x232B, 0x237B).addRange(0x237D, 0x239A).addRange(0x23B4, 0x23DB).addRange(0x23E2, 0x2426).addRange(0x2440, 0x244A).addRange(0x249C, 0x24E9).addRange(0x2500, 0x25B6).addRange(0x25B8, 0x25C0).addRange(0x25C2, 0x25F7).addRange(0x2600, 0x266E).addRange(0x2670, 0x2767).addRange(0x2794, 0x27BF).addRange(0x2800, 0x28FF).addRange(0x2B00, 0x2B2F).addRange(0x2B45, 0x2B46).addRange(0x2B4D, 0x2B73);
set.addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2BFF).addRange(0x2CE5, 0x2CEA).addRange(0x2E50, 0x2E51).addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x2FF0, 0x2FFB).addRange(0x3012, 0x3013).addRange(0x3036, 0x3037).addRange(0x303E, 0x303F).addRange(0x3190, 0x3191).addRange(0x3196, 0x319F).addRange(0x31C0, 0x31E3).addRange(0x3200, 0x321E).addRange(0x322A, 0x3247).addRange(0x3260, 0x327F).addRange(0x328A, 0x32B0).addRange(0x32C0, 0x33FF).addRange(0x4DC0, 0x4DFF).addRange(0xA490, 0xA4C6).addRange(0xA828, 0xA82B).addRange(0xA836, 0xA837).addRange(0xAA77, 0xAA79).addRange(0xFFED, 0xFFEE).addRange(0xFFFC, 0xFFFD).addRange(0x10137, 0x1013F).addRange(0x10179, 0x10189).addRange(0x1018C, 0x1018E).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FC).addRange(0x10877, 0x10878).addRange(0x11FD5, 0x11FDC).addRange(0x11FE1, 0x11FF1).addRange(0x16B3C, 0x16B3F).addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D164).addRange(0x1D16A, 0x1D16C).addRange(0x1D183, 0x1D184).addRange(0x1D18C, 0x1D1A9).addRange(0x1D1AE, 0x1D1E8).addRange(0x1D200, 0x1D241).addRange(0x1D300, 0x1D356).addRange(0x1D800, 0x1D9FF).addRange(0x1DA37, 0x1DA3A).addRange(0x1DA6D, 0x1DA74).addRange(0x1DA76, 0x1DA83).addRange(0x1DA85, 0x1DA86).addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093);
set.addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F10D, 0x1F1AD).addRange(0x1F1E6, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1F260, 0x1F265).addRange(0x1F300, 0x1F3FA).addRange(0x1F400, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773).addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92).addRange(0x1FB94, 0x1FBCA);
module.exports = set;

/***/ }),
/* 668 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2029);

module.exports = set;

/***/ }),
/* 669 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xE000, 0xF8FF).addRange(0xF0000, 0xFFFFD).addRange(0x100000, 0x10FFFD);
module.exports = set;

/***/ }),
/* 670 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x5F, 0x7B, 0x7D, 0xA1, 0xA7, 0xAB, 0xBB, 0xBF, 0x37E, 0x387, 0x5BE, 0x5C0, 0x5C3, 0x5C6, 0x61B, 0x6D4, 0x85E, 0x970, 0x9FD, 0xA76, 0xAF0, 0xC77, 0xC84, 0xDF4, 0xE4F, 0xF14, 0xF85, 0x10FB, 0x1400, 0x166E, 0x1CD3, 0x2D70, 0x2E52, 0x3030, 0x303D, 0x30A0, 0x30FB, 0xA673, 0xA67E, 0xA8FC, 0xA95F, 0xABEB, 0xFE63, 0xFE68, 0xFF3F, 0xFF5B, 0xFF5D, 0x1039F, 0x103D0, 0x1056F, 0x10857, 0x1091F, 0x1093F, 0x10A7F, 0x10EAD, 0x111CD, 0x111DB, 0x112A9, 0x1145D, 0x114C6, 0x1183B, 0x119E2, 0x11FFF, 0x16AF5, 0x16B44, 0x16FE2, 0x1BC9F);

set.addRange(0x21, 0x23).addRange(0x25, 0x2A).addRange(0x2C, 0x2F).addRange(0x3A, 0x3B).addRange(0x3F, 0x40).addRange(0x5B, 0x5D).addRange(0xB6, 0xB7).addRange(0x55A, 0x55F).addRange(0x589, 0x58A).addRange(0x5F3, 0x5F4).addRange(0x609, 0x60A).addRange(0x60C, 0x60D).addRange(0x61E, 0x61F).addRange(0x66A, 0x66D).addRange(0x700, 0x70D).addRange(0x7F7, 0x7F9).addRange(0x830, 0x83E).addRange(0x964, 0x965).addRange(0xE5A, 0xE5B).addRange(0xF04, 0xF12).addRange(0xF3A, 0xF3D).addRange(0xFD0, 0xFD4).addRange(0xFD9, 0xFDA).addRange(0x104A, 0x104F).addRange(0x1360, 0x1368).addRange(0x169B, 0x169C).addRange(0x16EB, 0x16ED).addRange(0x1735, 0x1736).addRange(0x17D4, 0x17D6).addRange(0x17D8, 0x17DA).addRange(0x1800, 0x180A).addRange(0x1944, 0x1945).addRange(0x1A1E, 0x1A1F).addRange(0x1AA0, 0x1AA6).addRange(0x1AA8, 0x1AAD).addRange(0x1B5A, 0x1B60).addRange(0x1BFC, 0x1BFF).addRange(0x1C3B, 0x1C3F).addRange(0x1C7E, 0x1C7F).addRange(0x1CC0, 0x1CC7).addRange(0x2010, 0x2027).addRange(0x2030, 0x2043).addRange(0x2045, 0x2051).addRange(0x2053, 0x205E).addRange(0x207D, 0x207E).addRange(0x208D, 0x208E).addRange(0x2308, 0x230B).addRange(0x2329, 0x232A).addRange(0x2768, 0x2775).addRange(0x27C5, 0x27C6).addRange(0x27E6, 0x27EF);
set.addRange(0x2983, 0x2998).addRange(0x29D8, 0x29DB).addRange(0x29FC, 0x29FD).addRange(0x2CF9, 0x2CFC).addRange(0x2CFE, 0x2CFF).addRange(0x2E00, 0x2E2E).addRange(0x2E30, 0x2E4F).addRange(0x3001, 0x3003).addRange(0x3008, 0x3011).addRange(0x3014, 0x301F).addRange(0xA4FE, 0xA4FF).addRange(0xA60D, 0xA60F).addRange(0xA6F2, 0xA6F7).addRange(0xA874, 0xA877).addRange(0xA8CE, 0xA8CF).addRange(0xA8F8, 0xA8FA).addRange(0xA92E, 0xA92F).addRange(0xA9C1, 0xA9CD).addRange(0xA9DE, 0xA9DF).addRange(0xAA5C, 0xAA5F).addRange(0xAADE, 0xAADF).addRange(0xAAF0, 0xAAF1).addRange(0xFD3E, 0xFD3F).addRange(0xFE10, 0xFE19).addRange(0xFE30, 0xFE52).addRange(0xFE54, 0xFE61).addRange(0xFE6A, 0xFE6B).addRange(0xFF01, 0xFF03).addRange(0xFF05, 0xFF0A).addRange(0xFF0C, 0xFF0F).addRange(0xFF1A, 0xFF1B).addRange(0xFF1F, 0xFF20).addRange(0xFF3B, 0xFF3D).addRange(0xFF5F, 0xFF65).addRange(0x10100, 0x10102).addRange(0x10A50, 0x10A58).addRange(0x10AF0, 0x10AF6).addRange(0x10B39, 0x10B3F).addRange(0x10B99, 0x10B9C).addRange(0x10F55, 0x10F59).addRange(0x11047, 0x1104D).addRange(0x110BB, 0x110BC).addRange(0x110BE, 0x110C1).addRange(0x11140, 0x11143).addRange(0x11174, 0x11175).addRange(0x111C5, 0x111C8).addRange(0x111DD, 0x111DF).addRange(0x11238, 0x1123D).addRange(0x1144B, 0x1144F).addRange(0x1145A, 0x1145B).addRange(0x115C1, 0x115D7);
set.addRange(0x11641, 0x11643).addRange(0x11660, 0x1166C).addRange(0x1173C, 0x1173E).addRange(0x11944, 0x11946).addRange(0x11A3F, 0x11A46).addRange(0x11A9A, 0x11A9C).addRange(0x11A9E, 0x11AA2).addRange(0x11C41, 0x11C45).addRange(0x11C70, 0x11C71).addRange(0x11EF7, 0x11EF8).addRange(0x12470, 0x12474).addRange(0x16A6E, 0x16A6F).addRange(0x16B37, 0x16B3B).addRange(0x16E97, 0x16E9A).addRange(0x1DA87, 0x1DA8B).addRange(0x1E95E, 0x1E95F);
module.exports = set;

/***/ }),
/* 671 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000);

set.addRange(0x2000, 0x200A).addRange(0x2028, 0x2029);
module.exports = set;

/***/ }),
/* 672 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000);

set.addRange(0x2000, 0x200A);
module.exports = set;

/***/ }),
/* 673 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x903, 0x93B, 0x9D7, 0xA03, 0xA83, 0xAC9, 0xB3E, 0xB40, 0xB57, 0xBD7, 0xCBE, 0xD57, 0xF7F, 0x1031, 0x1038, 0x108F, 0x17B6, 0x1A55, 0x1A57, 0x1A61, 0x1B04, 0x1B35, 0x1B3B, 0x1B82, 0x1BA1, 0x1BAA, 0x1BE7, 0x1BEE, 0x1CE1, 0x1CF7, 0xA827, 0xA983, 0xAA4D, 0xAA7B, 0xAA7D, 0xAAEB, 0xAAF5, 0xABEC, 0x11000, 0x11002, 0x11082, 0x1112C, 0x11182, 0x111CE, 0x11235, 0x11357, 0x11445, 0x114B9, 0x114C1, 0x115BE, 0x1163E, 0x116AC, 0x116B6, 0x11726, 0x11838, 0x1193D, 0x11940, 0x11942, 0x119E4, 0x11A39, 0x11A97, 0x11C2F, 0x11C3E, 0x11CA9, 0x11CB1, 0x11CB4, 0x11D96);

set.addRange(0x93E, 0x940).addRange(0x949, 0x94C).addRange(0x94E, 0x94F).addRange(0x982, 0x983).addRange(0x9BE, 0x9C0).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CC).addRange(0xA3E, 0xA40).addRange(0xABE, 0xAC0).addRange(0xACB, 0xACC).addRange(0xB02, 0xB03).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4C).addRange(0xBBE, 0xBBF).addRange(0xBC1, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCC).addRange(0xC01, 0xC03).addRange(0xC41, 0xC44).addRange(0xC82, 0xC83).addRange(0xCC0, 0xCC4).addRange(0xCC7, 0xCC8).addRange(0xCCA, 0xCCB).addRange(0xCD5, 0xCD6).addRange(0xD02, 0xD03).addRange(0xD3E, 0xD40).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4C).addRange(0xD82, 0xD83).addRange(0xDCF, 0xDD1).addRange(0xDD8, 0xDDF).addRange(0xDF2, 0xDF3).addRange(0xF3E, 0xF3F).addRange(0x102B, 0x102C).addRange(0x103B, 0x103C).addRange(0x1056, 0x1057).addRange(0x1062, 0x1064).addRange(0x1067, 0x106D).addRange(0x1083, 0x1084).addRange(0x1087, 0x108C).addRange(0x109A, 0x109C).addRange(0x17BE, 0x17C5).addRange(0x17C7, 0x17C8).addRange(0x1923, 0x1926).addRange(0x1929, 0x192B).addRange(0x1930, 0x1931).addRange(0x1933, 0x1938).addRange(0x1A19, 0x1A1A).addRange(0x1A63, 0x1A64).addRange(0x1A6D, 0x1A72).addRange(0x1B3D, 0x1B41);
set.addRange(0x1B43, 0x1B44).addRange(0x1BA6, 0x1BA7).addRange(0x1BEA, 0x1BEC).addRange(0x1BF2, 0x1BF3).addRange(0x1C24, 0x1C2B).addRange(0x1C34, 0x1C35).addRange(0x302E, 0x302F).addRange(0xA823, 0xA824).addRange(0xA880, 0xA881).addRange(0xA8B4, 0xA8C3).addRange(0xA952, 0xA953).addRange(0xA9B4, 0xA9B5).addRange(0xA9BA, 0xA9BB).addRange(0xA9BE, 0xA9C0).addRange(0xAA2F, 0xAA30).addRange(0xAA33, 0xAA34).addRange(0xAAEE, 0xAAEF).addRange(0xABE3, 0xABE4).addRange(0xABE6, 0xABE7).addRange(0xABE9, 0xABEA).addRange(0x110B0, 0x110B2).addRange(0x110B7, 0x110B8).addRange(0x11145, 0x11146).addRange(0x111B3, 0x111B5).addRange(0x111BF, 0x111C0).addRange(0x1122C, 0x1122E).addRange(0x11232, 0x11233).addRange(0x112E0, 0x112E2).addRange(0x11302, 0x11303).addRange(0x1133E, 0x1133F).addRange(0x11341, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x11362, 0x11363).addRange(0x11435, 0x11437).addRange(0x11440, 0x11441).addRange(0x114B0, 0x114B2).addRange(0x114BB, 0x114BE).addRange(0x115AF, 0x115B1).addRange(0x115B8, 0x115BB).addRange(0x11630, 0x11632).addRange(0x1163B, 0x1163C).addRange(0x116AE, 0x116AF).addRange(0x11720, 0x11721).addRange(0x1182C, 0x1182E).addRange(0x11930, 0x11935).addRange(0x11937, 0x11938).addRange(0x119D1, 0x119D3).addRange(0x119DC, 0x119DF).addRange(0x11A57, 0x11A58).addRange(0x11D8A, 0x11D8E);
set.addRange(0x11D93, 0x11D94).addRange(0x11EF5, 0x11EF6).addRange(0x16F51, 0x16F87).addRange(0x16FF0, 0x16FF1).addRange(0x1D165, 0x1D166).addRange(0x1D16D, 0x1D172);
module.exports = set;

/***/ }),
/* 674 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xD800, 0xDFFF);
module.exports = set;

/***/ }),
/* 675 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x24, 0x2B, 0x5E, 0x60, 0x7C, 0x7E, 0xAC, 0xB4, 0xB8, 0xD7, 0xF7, 0x2ED, 0x375, 0x3F6, 0x482, 0x60B, 0x6DE, 0x6E9, 0x7F6, 0xAF1, 0xB70, 0xC7F, 0xD4F, 0xD79, 0xE3F, 0xF13, 0xF34, 0xF36, 0xF38, 0x166D, 0x17DB, 0x1940, 0x1FBD, 0x2044, 0x2052, 0x2114, 0x2125, 0x2127, 0x2129, 0x212E, 0x214F, 0x3004, 0x3020, 0x3250, 0xAB5B, 0xFB29, 0xFE62, 0xFE69, 0xFF04, 0xFF0B, 0xFF3E, 0xFF40, 0xFF5C, 0xFF5E, 0x101A0, 0x10AC8, 0x1173F, 0x16B45, 0x1BC9C, 0x1D245, 0x1D6C1, 0x1D6DB, 0x1D6FB, 0x1D715, 0x1D735, 0x1D74F, 0x1D76F, 0x1D789, 0x1D7A9, 0x1D7C3, 0x1E14F, 0x1E2FF, 0x1ECAC, 0x1ECB0, 0x1ED2E);

set.addRange(0x3C, 0x3E).addRange(0xA2, 0xA6).addRange(0xA8, 0xA9).addRange(0xAE, 0xB1).addRange(0x2C2, 0x2C5).addRange(0x2D2, 0x2DF).addRange(0x2E5, 0x2EB).addRange(0x2EF, 0x2FF).addRange(0x384, 0x385).addRange(0x58D, 0x58F).addRange(0x606, 0x608).addRange(0x60E, 0x60F).addRange(0x6FD, 0x6FE).addRange(0x7FE, 0x7FF).addRange(0x9F2, 0x9F3).addRange(0x9FA, 0x9FB).addRange(0xBF3, 0xBFA).addRange(0xF01, 0xF03).addRange(0xF15, 0xF17).addRange(0xF1A, 0xF1F).addRange(0xFBE, 0xFC5).addRange(0xFC7, 0xFCC).addRange(0xFCE, 0xFCF).addRange(0xFD5, 0xFD8).addRange(0x109E, 0x109F).addRange(0x1390, 0x1399).addRange(0x19DE, 0x19FF).addRange(0x1B61, 0x1B6A).addRange(0x1B74, 0x1B7C).addRange(0x1FBF, 0x1FC1).addRange(0x1FCD, 0x1FCF).addRange(0x1FDD, 0x1FDF).addRange(0x1FED, 0x1FEF).addRange(0x1FFD, 0x1FFE).addRange(0x207A, 0x207C).addRange(0x208A, 0x208C).addRange(0x20A0, 0x20BF).addRange(0x2100, 0x2101).addRange(0x2103, 0x2106).addRange(0x2108, 0x2109).addRange(0x2116, 0x2118).addRange(0x211E, 0x2123).addRange(0x213A, 0x213B).addRange(0x2140, 0x2144).addRange(0x214A, 0x214D).addRange(0x218A, 0x218B).addRange(0x2190, 0x2307).addRange(0x230C, 0x2328).addRange(0x232B, 0x2426).addRange(0x2440, 0x244A).addRange(0x249C, 0x24E9);
set.addRange(0x2500, 0x2767).addRange(0x2794, 0x27C4).addRange(0x27C7, 0x27E5).addRange(0x27F0, 0x2982).addRange(0x2999, 0x29D7).addRange(0x29DC, 0x29FB).addRange(0x29FE, 0x2B73).addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2BFF).addRange(0x2CE5, 0x2CEA).addRange(0x2E50, 0x2E51).addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x2FF0, 0x2FFB).addRange(0x3012, 0x3013).addRange(0x3036, 0x3037).addRange(0x303E, 0x303F).addRange(0x309B, 0x309C).addRange(0x3190, 0x3191).addRange(0x3196, 0x319F).addRange(0x31C0, 0x31E3).addRange(0x3200, 0x321E).addRange(0x322A, 0x3247).addRange(0x3260, 0x327F).addRange(0x328A, 0x32B0).addRange(0x32C0, 0x33FF).addRange(0x4DC0, 0x4DFF).addRange(0xA490, 0xA4C6).addRange(0xA700, 0xA716).addRange(0xA720, 0xA721).addRange(0xA789, 0xA78A).addRange(0xA828, 0xA82B).addRange(0xA836, 0xA839).addRange(0xAA77, 0xAA79).addRange(0xAB6A, 0xAB6B).addRange(0xFBB2, 0xFBC1).addRange(0xFDFC, 0xFDFD).addRange(0xFE64, 0xFE66).addRange(0xFF1C, 0xFF1E).addRange(0xFFE0, 0xFFE6).addRange(0xFFE8, 0xFFEE).addRange(0xFFFC, 0xFFFD).addRange(0x10137, 0x1013F).addRange(0x10179, 0x10189).addRange(0x1018C, 0x1018E).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FC).addRange(0x10877, 0x10878).addRange(0x11FD5, 0x11FF1).addRange(0x16B3C, 0x16B3F);
set.addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D164).addRange(0x1D16A, 0x1D16C).addRange(0x1D183, 0x1D184).addRange(0x1D18C, 0x1D1A9).addRange(0x1D1AE, 0x1D1E8).addRange(0x1D200, 0x1D241).addRange(0x1D300, 0x1D356).addRange(0x1D800, 0x1D9FF).addRange(0x1DA37, 0x1DA3A).addRange(0x1DA6D, 0x1DA74).addRange(0x1DA76, 0x1DA83).addRange(0x1DA85, 0x1DA86).addRange(0x1EEF0, 0x1EEF1).addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093).addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F10D, 0x1F1AD).addRange(0x1F1E6, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1F260, 0x1F265).addRange(0x1F300, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773).addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92);
set.addRange(0x1FB94, 0x1FBCA);
module.exports = set;

/***/ }),
/* 676 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1C5, 0x1C8, 0x1CB, 0x1F2, 0x1FBC, 0x1FCC, 0x1FFC);

set.addRange(0x1F88, 0x1F8F).addRange(0x1F98, 0x1F9F).addRange(0x1FA8, 0x1FAF);
module.exports = set;

/***/ }),
/* 677 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x38B, 0x38D, 0x3A2, 0x530, 0x590, 0x61D, 0x70E, 0x83F, 0x85F, 0x8B5, 0x984, 0x9A9, 0x9B1, 0x9DE, 0xA04, 0xA29, 0xA31, 0xA34, 0xA37, 0xA3D, 0xA5D, 0xA84, 0xA8E, 0xA92, 0xAA9, 0xAB1, 0xAB4, 0xAC6, 0xACA, 0xB00, 0xB04, 0xB29, 0xB31, 0xB34, 0xB5E, 0xB84, 0xB91, 0xB9B, 0xB9D, 0xBC9, 0xC0D, 0xC11, 0xC29, 0xC45, 0xC49, 0xC57, 0xC8D, 0xC91, 0xCA9, 0xCB4, 0xCC5, 0xCC9, 0xCDF, 0xCF0, 0xD0D, 0xD11, 0xD45, 0xD49, 0xD80, 0xD84, 0xDB2, 0xDBC, 0xDD5, 0xDD7, 0xE83, 0xE85, 0xE8B, 0xEA4, 0xEA6, 0xEC5, 0xEC7, 0xF48, 0xF98, 0xFBD, 0xFCD, 0x10C6, 0x1249, 0x1257, 0x1259, 0x1289, 0x12B1, 0x12BF, 0x12C1, 0x12D7, 0x1311, 0x170D, 0x176D, 0x1771, 0x180F, 0x191F, 0x1A5F, 0x1DFA, 0x1F58, 0x1F5A, 0x1F5C, 0x1F5E, 0x1FB5, 0x1FC5, 0x1FDC, 0x1FF5, 0x1FFF, 0x2065, 0x208F, 0x2B96, 0x2C2F, 0x2C5F, 0x2D26, 0x2DA7, 0x2DAF, 0x2DB7, 0x2DBF, 0x2DC7, 0x2DCF, 0x2DD7, 0x2DDF, 0x2E9A, 0x3040, 0x3130, 0x318F, 0x321F, 0xA9CE, 0xA9FF, 0xAB27, 0xAB2F, 0xFB37, 0xFB3D, 0xFB3F, 0xFB42, 0xFB45, 0xFE53, 0xFE67, 0xFE75, 0xFF00, 0xFFE7, 0x1000C, 0x10027, 0x1003B, 0x1003E, 0x1018F, 0x1039E, 0x10809, 0x10836, 0x10856, 0x108F3, 0x10A04, 0x10A14, 0x10A18, 0x10E7F, 0x10EAA, 0x11135, 0x111E0, 0x11212, 0x11287, 0x11289, 0x1128E, 0x1129E, 0x11304, 0x11329, 0x11331, 0x11334, 0x1133A, 0x1145C, 0x11914, 0x11917, 0x11936, 0x11C09, 0x11C37, 0x11CA8, 0x11D07, 0x11D0A, 0x11D3B, 0x11D3E, 0x11D66, 0x11D69, 0x11D8F, 0x11D92, 0x1246F, 0x1342F, 0x16A5F, 0x16B5A, 0x16B62, 0x1D455, 0x1D49D, 0x1D4AD, 0x1D4BA, 0x1D4BC, 0x1D4C4, 0x1D506, 0x1D515, 0x1D51D, 0x1D53A, 0x1D53F, 0x1D545, 0x1D551, 0x1DAA0, 0x1E007, 0x1E022, 0x1E025, 0x1EE04, 0x1EE20, 0x1EE23, 0x1EE28, 0x1EE33, 0x1EE38, 0x1EE3A, 0x1EE48, 0x1EE4A, 0x1EE4C, 0x1EE50, 0x1EE53, 0x1EE58, 0x1EE5A, 0x1EE5C, 0x1EE5E, 0x1EE60, 0x1EE63, 0x1EE6B, 0x1EE73, 0x1EE78, 0x1EE7D, 0x1EE7F, 0x1EE8A, 0x1EEA4, 0x1EEAA, 0x1F0C0, 0x1F0D0, 0x1F979, 0x1F9CC, 0x1FB93);

set.addRange(0x378, 0x379).addRange(0x380, 0x383).addRange(0x557, 0x558).addRange(0x58B, 0x58C).addRange(0x5C8, 0x5CF).addRange(0x5EB, 0x5EE).addRange(0x5F5, 0x5FF).addRange(0x74B, 0x74C).addRange(0x7B2, 0x7BF).addRange(0x7FB, 0x7FC).addRange(0x82E, 0x82F).addRange(0x85C, 0x85D).addRange(0x86B, 0x89F).addRange(0x8C8, 0x8D2).addRange(0x98D, 0x98E).addRange(0x991, 0x992).addRange(0x9B3, 0x9B5).addRange(0x9BA, 0x9BB).addRange(0x9C5, 0x9C6).addRange(0x9C9, 0x9CA).addRange(0x9CF, 0x9D6).addRange(0x9D8, 0x9DB).addRange(0x9E4, 0x9E5).addRange(0x9FF, 0xA00).addRange(0xA0B, 0xA0E).addRange(0xA11, 0xA12).addRange(0xA3A, 0xA3B).addRange(0xA43, 0xA46).addRange(0xA49, 0xA4A).addRange(0xA4E, 0xA50).addRange(0xA52, 0xA58).addRange(0xA5F, 0xA65).addRange(0xA77, 0xA80).addRange(0xABA, 0xABB).addRange(0xACE, 0xACF).addRange(0xAD1, 0xADF).addRange(0xAE4, 0xAE5).addRange(0xAF2, 0xAF8).addRange(0xB0D, 0xB0E).addRange(0xB11, 0xB12).addRange(0xB3A, 0xB3B).addRange(0xB45, 0xB46).addRange(0xB49, 0xB4A).addRange(0xB4E, 0xB54).addRange(0xB58, 0xB5B).addRange(0xB64, 0xB65).addRange(0xB78, 0xB81).addRange(0xB8B, 0xB8D).addRange(0xB96, 0xB98).addRange(0xBA0, 0xBA2).addRange(0xBA5, 0xBA7);
set.addRange(0xBAB, 0xBAD).addRange(0xBBA, 0xBBD).addRange(0xBC3, 0xBC5).addRange(0xBCE, 0xBCF).addRange(0xBD1, 0xBD6).addRange(0xBD8, 0xBE5).addRange(0xBFB, 0xBFF).addRange(0xC3A, 0xC3C).addRange(0xC4E, 0xC54).addRange(0xC5B, 0xC5F).addRange(0xC64, 0xC65).addRange(0xC70, 0xC76).addRange(0xCBA, 0xCBB).addRange(0xCCE, 0xCD4).addRange(0xCD7, 0xCDD).addRange(0xCE4, 0xCE5).addRange(0xCF3, 0xCFF).addRange(0xD50, 0xD53).addRange(0xD64, 0xD65).addRange(0xD97, 0xD99).addRange(0xDBE, 0xDBF).addRange(0xDC7, 0xDC9).addRange(0xDCB, 0xDCE).addRange(0xDE0, 0xDE5).addRange(0xDF0, 0xDF1).addRange(0xDF5, 0xE00).addRange(0xE3B, 0xE3E).addRange(0xE5C, 0xE80).addRange(0xEBE, 0xEBF).addRange(0xECE, 0xECF).addRange(0xEDA, 0xEDB).addRange(0xEE0, 0xEFF).addRange(0xF6D, 0xF70).addRange(0xFDB, 0xFFF).addRange(0x10C8, 0x10CC).addRange(0x10CE, 0x10CF).addRange(0x124E, 0x124F).addRange(0x125E, 0x125F).addRange(0x128E, 0x128F).addRange(0x12B6, 0x12B7).addRange(0x12C6, 0x12C7).addRange(0x1316, 0x1317).addRange(0x135B, 0x135C).addRange(0x137D, 0x137F).addRange(0x139A, 0x139F).addRange(0x13F6, 0x13F7).addRange(0x13FE, 0x13FF).addRange(0x169D, 0x169F).addRange(0x16F9, 0x16FF).addRange(0x1715, 0x171F).addRange(0x1737, 0x173F);
set.addRange(0x1754, 0x175F).addRange(0x1774, 0x177F).addRange(0x17DE, 0x17DF).addRange(0x17EA, 0x17EF).addRange(0x17FA, 0x17FF).addRange(0x181A, 0x181F).addRange(0x1879, 0x187F).addRange(0x18AB, 0x18AF).addRange(0x18F6, 0x18FF).addRange(0x192C, 0x192F).addRange(0x193C, 0x193F).addRange(0x1941, 0x1943).addRange(0x196E, 0x196F).addRange(0x1975, 0x197F).addRange(0x19AC, 0x19AF).addRange(0x19CA, 0x19CF).addRange(0x19DB, 0x19DD).addRange(0x1A1C, 0x1A1D).addRange(0x1A7D, 0x1A7E).addRange(0x1A8A, 0x1A8F).addRange(0x1A9A, 0x1A9F).addRange(0x1AAE, 0x1AAF).addRange(0x1AC1, 0x1AFF).addRange(0x1B4C, 0x1B4F).addRange(0x1B7D, 0x1B7F).addRange(0x1BF4, 0x1BFB).addRange(0x1C38, 0x1C3A).addRange(0x1C4A, 0x1C4C).addRange(0x1C89, 0x1C8F).addRange(0x1CBB, 0x1CBC).addRange(0x1CC8, 0x1CCF).addRange(0x1CFB, 0x1CFF).addRange(0x1F16, 0x1F17).addRange(0x1F1E, 0x1F1F).addRange(0x1F46, 0x1F47).addRange(0x1F4E, 0x1F4F).addRange(0x1F7E, 0x1F7F).addRange(0x1FD4, 0x1FD5).addRange(0x1FF0, 0x1FF1).addRange(0x2072, 0x2073).addRange(0x209D, 0x209F).addRange(0x20C0, 0x20CF).addRange(0x20F1, 0x20FF).addRange(0x218C, 0x218F).addRange(0x2427, 0x243F).addRange(0x244B, 0x245F).addRange(0x2B74, 0x2B75).addRange(0x2CF4, 0x2CF8).addRange(0x2D28, 0x2D2C).addRange(0x2D2E, 0x2D2F).addRange(0x2D68, 0x2D6E);
set.addRange(0x2D71, 0x2D7E).addRange(0x2D97, 0x2D9F).addRange(0x2E53, 0x2E7F).addRange(0x2EF4, 0x2EFF).addRange(0x2FD6, 0x2FEF).addRange(0x2FFC, 0x2FFF).addRange(0x3097, 0x3098).addRange(0x3100, 0x3104).addRange(0x31E4, 0x31EF).addRange(0x9FFD, 0x9FFF).addRange(0xA48D, 0xA48F).addRange(0xA4C7, 0xA4CF).addRange(0xA62C, 0xA63F).addRange(0xA6F8, 0xA6FF).addRange(0xA7C0, 0xA7C1).addRange(0xA7CB, 0xA7F4).addRange(0xA82D, 0xA82F).addRange(0xA83A, 0xA83F).addRange(0xA878, 0xA87F).addRange(0xA8C6, 0xA8CD).addRange(0xA8DA, 0xA8DF).addRange(0xA954, 0xA95E).addRange(0xA97D, 0xA97F).addRange(0xA9DA, 0xA9DD).addRange(0xAA37, 0xAA3F).addRange(0xAA4E, 0xAA4F).addRange(0xAA5A, 0xAA5B).addRange(0xAAC3, 0xAADA).addRange(0xAAF7, 0xAB00).addRange(0xAB07, 0xAB08).addRange(0xAB0F, 0xAB10).addRange(0xAB17, 0xAB1F).addRange(0xAB6C, 0xAB6F).addRange(0xABEE, 0xABEF).addRange(0xABFA, 0xABFF).addRange(0xD7A4, 0xD7AF).addRange(0xD7C7, 0xD7CA).addRange(0xD7FC, 0xD7FF).addRange(0xFA6E, 0xFA6F).addRange(0xFADA, 0xFAFF).addRange(0xFB07, 0xFB12).addRange(0xFB18, 0xFB1C).addRange(0xFBC2, 0xFBD2).addRange(0xFD40, 0xFD4F).addRange(0xFD90, 0xFD91).addRange(0xFDC8, 0xFDEF).addRange(0xFDFE, 0xFDFF).addRange(0xFE1A, 0xFE1F).addRange(0xFE6C, 0xFE6F).addRange(0xFEFD, 0xFEFE).addRange(0xFFBF, 0xFFC1);
set.addRange(0xFFC8, 0xFFC9).addRange(0xFFD0, 0xFFD1).addRange(0xFFD8, 0xFFD9).addRange(0xFFDD, 0xFFDF).addRange(0xFFEF, 0xFFF8).addRange(0xFFFE, 0xFFFF).addRange(0x1004E, 0x1004F).addRange(0x1005E, 0x1007F).addRange(0x100FB, 0x100FF).addRange(0x10103, 0x10106).addRange(0x10134, 0x10136).addRange(0x1019D, 0x1019F).addRange(0x101A1, 0x101CF).addRange(0x101FE, 0x1027F).addRange(0x1029D, 0x1029F).addRange(0x102D1, 0x102DF).addRange(0x102FC, 0x102FF).addRange(0x10324, 0x1032C).addRange(0x1034B, 0x1034F).addRange(0x1037B, 0x1037F).addRange(0x103C4, 0x103C7).addRange(0x103D6, 0x103FF).addRange(0x1049E, 0x1049F).addRange(0x104AA, 0x104AF).addRange(0x104D4, 0x104D7).addRange(0x104FC, 0x104FF).addRange(0x10528, 0x1052F).addRange(0x10564, 0x1056E).addRange(0x10570, 0x105FF).addRange(0x10737, 0x1073F).addRange(0x10756, 0x1075F).addRange(0x10768, 0x107FF).addRange(0x10806, 0x10807).addRange(0x10839, 0x1083B).addRange(0x1083D, 0x1083E).addRange(0x1089F, 0x108A6).addRange(0x108B0, 0x108DF).addRange(0x108F6, 0x108FA).addRange(0x1091C, 0x1091E).addRange(0x1093A, 0x1093E).addRange(0x10940, 0x1097F).addRange(0x109B8, 0x109BB).addRange(0x109D0, 0x109D1).addRange(0x10A07, 0x10A0B).addRange(0x10A36, 0x10A37).addRange(0x10A3B, 0x10A3E).addRange(0x10A49, 0x10A4F).addRange(0x10A59, 0x10A5F).addRange(0x10AA0, 0x10ABF).addRange(0x10AE7, 0x10AEA).addRange(0x10AF7, 0x10AFF);
set.addRange(0x10B36, 0x10B38).addRange(0x10B56, 0x10B57).addRange(0x10B73, 0x10B77).addRange(0x10B92, 0x10B98).addRange(0x10B9D, 0x10BA8).addRange(0x10BB0, 0x10BFF).addRange(0x10C49, 0x10C7F).addRange(0x10CB3, 0x10CBF).addRange(0x10CF3, 0x10CF9).addRange(0x10D28, 0x10D2F).addRange(0x10D3A, 0x10E5F).addRange(0x10EAE, 0x10EAF).addRange(0x10EB2, 0x10EFF).addRange(0x10F28, 0x10F2F).addRange(0x10F5A, 0x10FAF).addRange(0x10FCC, 0x10FDF).addRange(0x10FF7, 0x10FFF).addRange(0x1104E, 0x11051).addRange(0x11070, 0x1107E).addRange(0x110C2, 0x110CC).addRange(0x110CE, 0x110CF).addRange(0x110E9, 0x110EF).addRange(0x110FA, 0x110FF).addRange(0x11148, 0x1114F).addRange(0x11177, 0x1117F).addRange(0x111F5, 0x111FF).addRange(0x1123F, 0x1127F).addRange(0x112AA, 0x112AF).addRange(0x112EB, 0x112EF).addRange(0x112FA, 0x112FF).addRange(0x1130D, 0x1130E).addRange(0x11311, 0x11312).addRange(0x11345, 0x11346).addRange(0x11349, 0x1134A).addRange(0x1134E, 0x1134F).addRange(0x11351, 0x11356).addRange(0x11358, 0x1135C).addRange(0x11364, 0x11365).addRange(0x1136D, 0x1136F).addRange(0x11375, 0x113FF).addRange(0x11462, 0x1147F).addRange(0x114C8, 0x114CF).addRange(0x114DA, 0x1157F).addRange(0x115B6, 0x115B7).addRange(0x115DE, 0x115FF).addRange(0x11645, 0x1164F).addRange(0x1165A, 0x1165F).addRange(0x1166D, 0x1167F).addRange(0x116B9, 0x116BF).addRange(0x116CA, 0x116FF).addRange(0x1171B, 0x1171C);
set.addRange(0x1172C, 0x1172F).addRange(0x11740, 0x117FF).addRange(0x1183C, 0x1189F).addRange(0x118F3, 0x118FE).addRange(0x11907, 0x11908).addRange(0x1190A, 0x1190B).addRange(0x11939, 0x1193A).addRange(0x11947, 0x1194F).addRange(0x1195A, 0x1199F).addRange(0x119A8, 0x119A9).addRange(0x119D8, 0x119D9).addRange(0x119E5, 0x119FF).addRange(0x11A48, 0x11A4F).addRange(0x11AA3, 0x11ABF).addRange(0x11AF9, 0x11BFF).addRange(0x11C46, 0x11C4F).addRange(0x11C6D, 0x11C6F).addRange(0x11C90, 0x11C91).addRange(0x11CB7, 0x11CFF).addRange(0x11D37, 0x11D39).addRange(0x11D48, 0x11D4F).addRange(0x11D5A, 0x11D5F).addRange(0x11D99, 0x11D9F).addRange(0x11DAA, 0x11EDF).addRange(0x11EF9, 0x11FAF).addRange(0x11FB1, 0x11FBF).addRange(0x11FF2, 0x11FFE).addRange(0x1239A, 0x123FF).addRange(0x12475, 0x1247F).addRange(0x12544, 0x12FFF).addRange(0x13439, 0x143FF).addRange(0x14647, 0x167FF).addRange(0x16A39, 0x16A3F).addRange(0x16A6A, 0x16A6D).addRange(0x16A70, 0x16ACF).addRange(0x16AEE, 0x16AEF).addRange(0x16AF6, 0x16AFF).addRange(0x16B46, 0x16B4F).addRange(0x16B78, 0x16B7C).addRange(0x16B90, 0x16E3F).addRange(0x16E9B, 0x16EFF).addRange(0x16F4B, 0x16F4E).addRange(0x16F88, 0x16F8E).addRange(0x16FA0, 0x16FDF).addRange(0x16FE5, 0x16FEF).addRange(0x16FF2, 0x16FFF).addRange(0x187F8, 0x187FF).addRange(0x18CD6, 0x18CFF).addRange(0x18D09, 0x1AFFF).addRange(0x1B11F, 0x1B14F).addRange(0x1B153, 0x1B163);
set.addRange(0x1B168, 0x1B16F).addRange(0x1B2FC, 0x1BBFF).addRange(0x1BC6B, 0x1BC6F).addRange(0x1BC7D, 0x1BC7F).addRange(0x1BC89, 0x1BC8F).addRange(0x1BC9A, 0x1BC9B).addRange(0x1BCA4, 0x1CFFF).addRange(0x1D0F6, 0x1D0FF).addRange(0x1D127, 0x1D128).addRange(0x1D1E9, 0x1D1FF).addRange(0x1D246, 0x1D2DF).addRange(0x1D2F4, 0x1D2FF).addRange(0x1D357, 0x1D35F).addRange(0x1D379, 0x1D3FF).addRange(0x1D4A0, 0x1D4A1).addRange(0x1D4A3, 0x1D4A4).addRange(0x1D4A7, 0x1D4A8).addRange(0x1D50B, 0x1D50C).addRange(0x1D547, 0x1D549).addRange(0x1D6A6, 0x1D6A7).addRange(0x1D7CC, 0x1D7CD).addRange(0x1DA8C, 0x1DA9A).addRange(0x1DAB0, 0x1DFFF).addRange(0x1E019, 0x1E01A).addRange(0x1E02B, 0x1E0FF).addRange(0x1E12D, 0x1E12F).addRange(0x1E13E, 0x1E13F).addRange(0x1E14A, 0x1E14D).addRange(0x1E150, 0x1E2BF).addRange(0x1E2FA, 0x1E2FE).addRange(0x1E300, 0x1E7FF).addRange(0x1E8C5, 0x1E8C6).addRange(0x1E8D7, 0x1E8FF).addRange(0x1E94C, 0x1E94F).addRange(0x1E95A, 0x1E95D).addRange(0x1E960, 0x1EC70).addRange(0x1ECB5, 0x1ED00).addRange(0x1ED3E, 0x1EDFF).addRange(0x1EE25, 0x1EE26).addRange(0x1EE3C, 0x1EE41).addRange(0x1EE43, 0x1EE46).addRange(0x1EE55, 0x1EE56).addRange(0x1EE65, 0x1EE66).addRange(0x1EE9C, 0x1EEA0).addRange(0x1EEBC, 0x1EEEF).addRange(0x1EEF2, 0x1EFFF).addRange(0x1F02C, 0x1F02F).addRange(0x1F094, 0x1F09F).addRange(0x1F0AF, 0x1F0B0).addRange(0x1F0F6, 0x1F0FF).addRange(0x1F1AE, 0x1F1E5);
set.addRange(0x1F203, 0x1F20F).addRange(0x1F23C, 0x1F23F).addRange(0x1F249, 0x1F24F).addRange(0x1F252, 0x1F25F).addRange(0x1F266, 0x1F2FF).addRange(0x1F6D8, 0x1F6DF).addRange(0x1F6ED, 0x1F6EF).addRange(0x1F6FD, 0x1F6FF).addRange(0x1F774, 0x1F77F).addRange(0x1F7D9, 0x1F7DF).addRange(0x1F7EC, 0x1F7FF).addRange(0x1F80C, 0x1F80F).addRange(0x1F848, 0x1F84F).addRange(0x1F85A, 0x1F85F).addRange(0x1F888, 0x1F88F).addRange(0x1F8AE, 0x1F8AF).addRange(0x1F8B2, 0x1F8FF).addRange(0x1FA54, 0x1FA5F).addRange(0x1FA6E, 0x1FA6F).addRange(0x1FA75, 0x1FA77).addRange(0x1FA7B, 0x1FA7F).addRange(0x1FA87, 0x1FA8F).addRange(0x1FAA9, 0x1FAAF).addRange(0x1FAB7, 0x1FABF).addRange(0x1FAC3, 0x1FACF).addRange(0x1FAD7, 0x1FAFF).addRange(0x1FBCB, 0x1FBEF).addRange(0x1FBFA, 0x1FFFF).addRange(0x2A6DE, 0x2A6FF).addRange(0x2B735, 0x2B73F).addRange(0x2B81E, 0x2B81F).addRange(0x2CEA2, 0x2CEAF).addRange(0x2EBE1, 0x2F7FF).addRange(0x2FA1E, 0x2FFFF).addRange(0x3134B, 0xE0000).addRange(0xE0002, 0xE001F).addRange(0xE0080, 0xE00FF).addRange(0xE01F0, 0xEFFFF).addRange(0xFFFFE, 0xFFFFF).addRange(0x10FFFE, 0x10FFFF);
module.exports = set;

/***/ }),
/* 678 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x100, 0x102, 0x104, 0x106, 0x108, 0x10A, 0x10C, 0x10E, 0x110, 0x112, 0x114, 0x116, 0x118, 0x11A, 0x11C, 0x11E, 0x120, 0x122, 0x124, 0x126, 0x128, 0x12A, 0x12C, 0x12E, 0x130, 0x132, 0x134, 0x136, 0x139, 0x13B, 0x13D, 0x13F, 0x141, 0x143, 0x145, 0x147, 0x14A, 0x14C, 0x14E, 0x150, 0x152, 0x154, 0x156, 0x158, 0x15A, 0x15C, 0x15E, 0x160, 0x162, 0x164, 0x166, 0x168, 0x16A, 0x16C, 0x16E, 0x170, 0x172, 0x174, 0x176, 0x17B, 0x17D, 0x184, 0x1A2, 0x1A4, 0x1A9, 0x1AC, 0x1B5, 0x1BC, 0x1C4, 0x1C7, 0x1CA, 0x1CD, 0x1CF, 0x1D1, 0x1D3, 0x1D5, 0x1D7, 0x1D9, 0x1DB, 0x1DE, 0x1E0, 0x1E2, 0x1E4, 0x1E6, 0x1E8, 0x1EA, 0x1EC, 0x1EE, 0x1F1, 0x1F4, 0x1FA, 0x1FC, 0x1FE, 0x200, 0x202, 0x204, 0x206, 0x208, 0x20A, 0x20C, 0x20E, 0x210, 0x212, 0x214, 0x216, 0x218, 0x21A, 0x21C, 0x21E, 0x220, 0x222, 0x224, 0x226, 0x228, 0x22A, 0x22C, 0x22E, 0x230, 0x232, 0x241, 0x248, 0x24A, 0x24C, 0x24E, 0x370, 0x372, 0x376, 0x37F, 0x386, 0x38C, 0x3CF, 0x3D8, 0x3DA, 0x3DC, 0x3DE, 0x3E0, 0x3E2, 0x3E4, 0x3E6, 0x3E8, 0x3EA, 0x3EC, 0x3EE, 0x3F4, 0x3F7, 0x460, 0x462, 0x464, 0x466, 0x468, 0x46A, 0x46C, 0x46E, 0x470, 0x472, 0x474, 0x476, 0x478, 0x47A, 0x47C, 0x47E, 0x480, 0x48A, 0x48C, 0x48E, 0x490, 0x492, 0x494, 0x496, 0x498, 0x49A, 0x49C, 0x49E, 0x4A0, 0x4A2, 0x4A4, 0x4A6, 0x4A8, 0x4AA, 0x4AC, 0x4AE, 0x4B0, 0x4B2, 0x4B4, 0x4B6, 0x4B8, 0x4BA, 0x4BC, 0x4BE, 0x4C3, 0x4C5, 0x4C7, 0x4C9, 0x4CB, 0x4CD, 0x4D0, 0x4D2, 0x4D4, 0x4D6, 0x4D8, 0x4DA, 0x4DC, 0x4DE, 0x4E0, 0x4E2, 0x4E4, 0x4E6, 0x4E8, 0x4EA, 0x4EC, 0x4EE, 0x4F0, 0x4F2, 0x4F4, 0x4F6, 0x4F8, 0x4FA, 0x4FC, 0x4FE, 0x500, 0x502, 0x504, 0x506, 0x508, 0x50A, 0x50C, 0x50E, 0x510, 0x512, 0x514, 0x516, 0x518, 0x51A, 0x51C, 0x51E, 0x520, 0x522, 0x524, 0x526, 0x528, 0x52A, 0x52C, 0x52E, 0x10C7, 0x10CD, 0x1E00, 0x1E02, 0x1E04, 0x1E06, 0x1E08, 0x1E0A, 0x1E0C, 0x1E0E, 0x1E10, 0x1E12, 0x1E14, 0x1E16, 0x1E18, 0x1E1A, 0x1E1C, 0x1E1E, 0x1E20, 0x1E22, 0x1E24, 0x1E26, 0x1E28, 0x1E2A, 0x1E2C, 0x1E2E, 0x1E30, 0x1E32, 0x1E34, 0x1E36, 0x1E38, 0x1E3A, 0x1E3C, 0x1E3E, 0x1E40, 0x1E42, 0x1E44, 0x1E46, 0x1E48, 0x1E4A, 0x1E4C, 0x1E4E, 0x1E50, 0x1E52, 0x1E54, 0x1E56, 0x1E58, 0x1E5A, 0x1E5C, 0x1E5E, 0x1E60, 0x1E62, 0x1E64, 0x1E66, 0x1E68, 0x1E6A, 0x1E6C, 0x1E6E, 0x1E70, 0x1E72, 0x1E74, 0x1E76, 0x1E78, 0x1E7A, 0x1E7C, 0x1E7E, 0x1E80, 0x1E82, 0x1E84, 0x1E86, 0x1E88, 0x1E8A, 0x1E8C, 0x1E8E, 0x1E90, 0x1E92, 0x1E94, 0x1E9E, 0x1EA0, 0x1EA2, 0x1EA4, 0x1EA6, 0x1EA8, 0x1EAA, 0x1EAC, 0x1EAE, 0x1EB0, 0x1EB2, 0x1EB4, 0x1EB6, 0x1EB8, 0x1EBA, 0x1EBC, 0x1EBE, 0x1EC0, 0x1EC2, 0x1EC4, 0x1EC6, 0x1EC8, 0x1ECA, 0x1ECC, 0x1ECE, 0x1ED0, 0x1ED2, 0x1ED4, 0x1ED6, 0x1ED8, 0x1EDA, 0x1EDC, 0x1EDE, 0x1EE0, 0x1EE2, 0x1EE4, 0x1EE6, 0x1EE8, 0x1EEA, 0x1EEC, 0x1EEE, 0x1EF0, 0x1EF2, 0x1EF4, 0x1EF6, 0x1EF8, 0x1EFA, 0x1EFC, 0x1EFE, 0x1F59, 0x1F5B, 0x1F5D, 0x1F5F, 0x2102, 0x2107, 0x2115, 0x2124, 0x2126, 0x2128, 0x2145, 0x2183, 0x2C60, 0x2C67, 0x2C69, 0x2C6B, 0x2C72, 0x2C75, 0x2C82, 0x2C84, 0x2C86, 0x2C88, 0x2C8A, 0x2C8C, 0x2C8E, 0x2C90, 0x2C92, 0x2C94, 0x2C96, 0x2C98, 0x2C9A, 0x2C9C, 0x2C9E, 0x2CA0, 0x2CA2, 0x2CA4, 0x2CA6, 0x2CA8, 0x2CAA, 0x2CAC, 0x2CAE, 0x2CB0, 0x2CB2, 0x2CB4, 0x2CB6, 0x2CB8, 0x2CBA, 0x2CBC, 0x2CBE, 0x2CC0, 0x2CC2, 0x2CC4, 0x2CC6, 0x2CC8, 0x2CCA, 0x2CCC, 0x2CCE, 0x2CD0, 0x2CD2, 0x2CD4, 0x2CD6, 0x2CD8, 0x2CDA, 0x2CDC, 0x2CDE, 0x2CE0, 0x2CE2, 0x2CEB, 0x2CED, 0x2CF2, 0xA640, 0xA642, 0xA644, 0xA646, 0xA648, 0xA64A, 0xA64C, 0xA64E, 0xA650, 0xA652, 0xA654, 0xA656, 0xA658, 0xA65A, 0xA65C, 0xA65E, 0xA660, 0xA662, 0xA664, 0xA666, 0xA668, 0xA66A, 0xA66C, 0xA680, 0xA682, 0xA684, 0xA686, 0xA688, 0xA68A, 0xA68C, 0xA68E, 0xA690, 0xA692, 0xA694, 0xA696, 0xA698, 0xA69A, 0xA722, 0xA724, 0xA726, 0xA728, 0xA72A, 0xA72C, 0xA72E, 0xA732, 0xA734, 0xA736, 0xA738, 0xA73A, 0xA73C, 0xA73E, 0xA740, 0xA742, 0xA744, 0xA746, 0xA748, 0xA74A, 0xA74C, 0xA74E, 0xA750, 0xA752, 0xA754, 0xA756, 0xA758, 0xA75A, 0xA75C, 0xA75E, 0xA760, 0xA762, 0xA764, 0xA766, 0xA768, 0xA76A, 0xA76C, 0xA76E, 0xA779, 0xA77B, 0xA780, 0xA782, 0xA784, 0xA786, 0xA78B, 0xA78D, 0xA790, 0xA792, 0xA796, 0xA798, 0xA79A, 0xA79C, 0xA79E, 0xA7A0, 0xA7A2, 0xA7A4, 0xA7A6, 0xA7A8, 0xA7B6, 0xA7B8, 0xA7BA, 0xA7BC, 0xA7BE, 0xA7C2, 0xA7C9, 0xA7F5, 0x1D49C, 0x1D4A2, 0x1D546, 0x1D7CA);

set.addRange(0x41, 0x5A).addRange(0xC0, 0xD6).addRange(0xD8, 0xDE).addRange(0x178, 0x179).addRange(0x181, 0x182).addRange(0x186, 0x187).addRange(0x189, 0x18B).addRange(0x18E, 0x191).addRange(0x193, 0x194).addRange(0x196, 0x198).addRange(0x19C, 0x19D).addRange(0x19F, 0x1A0).addRange(0x1A6, 0x1A7).addRange(0x1AE, 0x1AF).addRange(0x1B1, 0x1B3).addRange(0x1B7, 0x1B8).addRange(0x1F6, 0x1F8).addRange(0x23A, 0x23B).addRange(0x23D, 0x23E).addRange(0x243, 0x246).addRange(0x388, 0x38A).addRange(0x38E, 0x38F).addRange(0x391, 0x3A1).addRange(0x3A3, 0x3AB).addRange(0x3D2, 0x3D4).addRange(0x3F9, 0x3FA).addRange(0x3FD, 0x42F).addRange(0x4C0, 0x4C1).addRange(0x531, 0x556).addRange(0x10A0, 0x10C5).addRange(0x13A0, 0x13F5).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x1F08, 0x1F0F).addRange(0x1F18, 0x1F1D).addRange(0x1F28, 0x1F2F).addRange(0x1F38, 0x1F3F).addRange(0x1F48, 0x1F4D).addRange(0x1F68, 0x1F6F).addRange(0x1FB8, 0x1FBB).addRange(0x1FC8, 0x1FCB).addRange(0x1FD8, 0x1FDB).addRange(0x1FE8, 0x1FEC).addRange(0x1FF8, 0x1FFB).addRange(0x210B, 0x210D).addRange(0x2110, 0x2112).addRange(0x2119, 0x211D).addRange(0x212A, 0x212D).addRange(0x2130, 0x2133).addRange(0x213E, 0x213F).addRange(0x2C00, 0x2C2E);
set.addRange(0x2C62, 0x2C64).addRange(0x2C6D, 0x2C70).addRange(0x2C7E, 0x2C80).addRange(0xA77D, 0xA77E).addRange(0xA7AA, 0xA7AE).addRange(0xA7B0, 0xA7B4).addRange(0xA7C4, 0xA7C7).addRange(0xFF21, 0xFF3A).addRange(0x10400, 0x10427).addRange(0x104B0, 0x104D3).addRange(0x10C80, 0x10CB2).addRange(0x118A0, 0x118BF).addRange(0x16E40, 0x16E5F).addRange(0x1D400, 0x1D419).addRange(0x1D434, 0x1D44D).addRange(0x1D468, 0x1D481).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B5).addRange(0x1D4D0, 0x1D4E9).addRange(0x1D504, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D538, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D56C, 0x1D585).addRange(0x1D5A0, 0x1D5B9).addRange(0x1D5D4, 0x1D5ED).addRange(0x1D608, 0x1D621).addRange(0x1D63C, 0x1D655).addRange(0x1D670, 0x1D689).addRange(0x1D6A8, 0x1D6C0).addRange(0x1D6E2, 0x1D6FA).addRange(0x1D71C, 0x1D734).addRange(0x1D756, 0x1D76E).addRange(0x1D790, 0x1D7A8).addRange(0x1E900, 0x1E921);
module.exports = set;

/***/ }),
/* 679 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F);
module.exports = set;

/***/ }),
/* 680 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x1173F);
module.exports = set;

/***/ }),
/* 681 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x14400, 0x14646);
module.exports = set;

/***/ }),
/* 682 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x61C, 0x61E, 0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x600, 0x604).addRange(0x606, 0x60B).addRange(0x60D, 0x61A).addRange(0x620, 0x63F).addRange(0x641, 0x64A).addRange(0x656, 0x66F).addRange(0x671, 0x6DC).addRange(0x6DE, 0x6FF).addRange(0x750, 0x77F).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x8FF).addRange(0xFB50, 0xFBC1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFD).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0x10E60, 0x10E7E).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1EEF0, 0x1EEF1);
module.exports = set;

/***/ }),
/* 683 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x531, 0x556).addRange(0x559, 0x58A).addRange(0x58D, 0x58F).addRange(0xFB13, 0xFB17);
module.exports = set;

/***/ }),
/* 684 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B00, 0x10B35).addRange(0x10B39, 0x10B3F);
module.exports = set;

/***/ }),
/* 685 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1B00, 0x1B4B).addRange(0x1B50, 0x1B7C);
module.exports = set;

/***/ }),
/* 686 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA6A0, 0xA6F7).addRange(0x16800, 0x16A38);
module.exports = set;

/***/ }),
/* 687 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF5);
module.exports = set;

/***/ }),
/* 688 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1BC0, 0x1BF3).addRange(0x1BFC, 0x1BFF);
module.exports = set;

/***/ }),
/* 689 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x9B2, 0x9D7);

set.addRange(0x980, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BC, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CE).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E3).addRange(0x9E6, 0x9FE);
module.exports = set;

/***/ }),
/* 690 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C45).addRange(0x11C50, 0x11C6C);
module.exports = set;

/***/ }),
/* 691 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2EA, 0x2EB).addRange(0x3105, 0x312F).addRange(0x31A0, 0x31BF);
module.exports = set;

/***/ }),
/* 692 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1107F);

set.addRange(0x11000, 0x1104D).addRange(0x11052, 0x1106F);
module.exports = set;

/***/ }),
/* 693 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2800, 0x28FF);
module.exports = set;

/***/ }),
/* 694 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1A00, 0x1A1B).addRange(0x1A1E, 0x1A1F);
module.exports = set;

/***/ }),
/* 695 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1740, 0x1753);
module.exports = set;

/***/ }),
/* 696 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1400, 0x167F).addRange(0x18B0, 0x18F5);
module.exports = set;

/***/ }),
/* 697 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x102A0, 0x102D0);
module.exports = set;

/***/ }),
/* 698 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1056F);

set.addRange(0x10530, 0x10563);
module.exports = set;

/***/ }),
/* 699 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11100, 0x11134).addRange(0x11136, 0x11147);
module.exports = set;

/***/ }),
/* 700 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA5C, 0xAA5F);
module.exports = set;

/***/ }),
/* 701 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0xAB70, 0xABBF);
module.exports = set;

/***/ }),
/* 702 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10FB0, 0x10FCB);
module.exports = set;

/***/ }),
/* 703 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xD7, 0xF7, 0x374, 0x37E, 0x385, 0x387, 0x605, 0x60C, 0x61B, 0x61F, 0x640, 0x6DD, 0x8E2, 0xE3F, 0x10FB, 0x1805, 0x1CD3, 0x1CE1, 0x1CFA, 0x3006, 0x30A0, 0x32FF, 0xA92E, 0xA9CF, 0xAB5B, 0xFEFF, 0xFF70, 0x1D4A2, 0x1D4BB, 0x1D546, 0xE0001);

set.addRange(0x0, 0x40).addRange(0x5B, 0x60).addRange(0x7B, 0xA9).addRange(0xAB, 0xB9).addRange(0xBB, 0xBF).addRange(0x2B9, 0x2DF).addRange(0x2E5, 0x2E9).addRange(0x2EC, 0x2FF).addRange(0x964, 0x965).addRange(0xFD5, 0xFD8).addRange(0x16EB, 0x16ED).addRange(0x1735, 0x1736).addRange(0x1802, 0x1803).addRange(0x1CE9, 0x1CEC).addRange(0x1CEE, 0x1CF3).addRange(0x1CF5, 0x1CF7).addRange(0x2000, 0x200B).addRange(0x200E, 0x2064).addRange(0x2066, 0x2070).addRange(0x2074, 0x207E).addRange(0x2080, 0x208E).addRange(0x20A0, 0x20BF).addRange(0x2100, 0x2125).addRange(0x2127, 0x2129).addRange(0x212C, 0x2131).addRange(0x2133, 0x214D).addRange(0x214F, 0x215F).addRange(0x2189, 0x218B).addRange(0x2190, 0x2426).addRange(0x2440, 0x244A).addRange(0x2460, 0x27FF).addRange(0x2900, 0x2B73).addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2BFF).addRange(0x2E00, 0x2E52).addRange(0x2FF0, 0x2FFB).addRange(0x3000, 0x3004).addRange(0x3008, 0x3020).addRange(0x3030, 0x3037).addRange(0x303C, 0x303F).addRange(0x309B, 0x309C).addRange(0x30FB, 0x30FC).addRange(0x3190, 0x319F).addRange(0x31C0, 0x31E3).addRange(0x3220, 0x325F).addRange(0x327F, 0x32CF).addRange(0x3358, 0x33FF).addRange(0x4DC0, 0x4DFF).addRange(0xA700, 0xA721).addRange(0xA788, 0xA78A).addRange(0xA830, 0xA839);
set.addRange(0xAB6A, 0xAB6B).addRange(0xFD3E, 0xFD3F).addRange(0xFE10, 0xFE19).addRange(0xFE30, 0xFE52).addRange(0xFE54, 0xFE66).addRange(0xFE68, 0xFE6B).addRange(0xFF01, 0xFF20).addRange(0xFF3B, 0xFF40).addRange(0xFF5B, 0xFF65).addRange(0xFF9E, 0xFF9F).addRange(0xFFE0, 0xFFE6).addRange(0xFFE8, 0xFFEE).addRange(0xFFF9, 0xFFFD).addRange(0x10100, 0x10102).addRange(0x10107, 0x10133).addRange(0x10137, 0x1013F).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FC).addRange(0x102E1, 0x102FB).addRange(0x16FE2, 0x16FE3).addRange(0x1BCA0, 0x1BCA3).addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D166).addRange(0x1D16A, 0x1D17A).addRange(0x1D183, 0x1D184).addRange(0x1D18C, 0x1D1A9).addRange(0x1D1AE, 0x1D1E8).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D300, 0x1D356).addRange(0x1D360, 0x1D378).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1EC71, 0x1ECB4).addRange(0x1ED01, 0x1ED3D);
set.addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093).addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F100, 0x1F1AD).addRange(0x1F1E6, 0x1F1FF).addRange(0x1F201, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F250, 0x1F251).addRange(0x1F260, 0x1F265).addRange(0x1F300, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773).addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92).addRange(0x1FB94, 0x1FBCA).addRange(0x1FBF0, 0x1FBF9).addRange(0xE0020, 0xE007F);
module.exports = set;

/***/ }),
/* 704 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x3E2, 0x3EF).addRange(0x2C80, 0x2CF3).addRange(0x2CF9, 0x2CFF);
module.exports = set;

/***/ }),
/* 705 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12470, 0x12474).addRange(0x12480, 0x12543);
module.exports = set;

/***/ }),
/* 706 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x10808, 0x1083C, 0x1083F);

set.addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838);
module.exports = set;

/***/ }),
/* 707 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1D2B, 0x1D78);

set.addRange(0x400, 0x484).addRange(0x487, 0x52F).addRange(0x1C80, 0x1C88).addRange(0x2DE0, 0x2DFF).addRange(0xA640, 0xA69F).addRange(0xFE2E, 0xFE2F);
module.exports = set;

/***/ }),
/* 708 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10400, 0x1044F);
module.exports = set;

/***/ }),
/* 709 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x900, 0x950).addRange(0x955, 0x963).addRange(0x966, 0x97F).addRange(0xA8E0, 0xA8FF);
module.exports = set;

/***/ }),
/* 710 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11909);

set.addRange(0x11900, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x11946).addRange(0x11950, 0x11959);
module.exports = set;

/***/ }),
/* 711 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11800, 0x1183B);
module.exports = set;

/***/ }),
/* 712 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1BC9C, 0x1BC9F);
module.exports = set;

/***/ }),
/* 713 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x13000, 0x1342E).addRange(0x13430, 0x13438);
module.exports = set;

/***/ }),
/* 714 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10500, 0x10527);
module.exports = set;

/***/ }),
/* 715 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10FE0, 0x10FF6);
module.exports = set;

/***/ }),
/* 716 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1258, 0x12C0);

set.addRange(0x1200, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x135D, 0x137C).addRange(0x1380, 0x1399).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E);
module.exports = set;

/***/ }),
/* 717 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x10C7, 0x10CD, 0x2D27, 0x2D2D);

set.addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FA).addRange(0x10FC, 0x10FF).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x2D00, 0x2D25);
module.exports = set;

/***/ }),
/* 718 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A);
module.exports = set;

/***/ }),
/* 719 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10330, 0x1034A);
module.exports = set;

/***/ }),
/* 720 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11350, 0x11357);

set.addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133C, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374);
module.exports = set;

/***/ }),
/* 721 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x37F, 0x384, 0x386, 0x38C, 0x1DBF, 0x1F59, 0x1F5B, 0x1F5D, 0x2126, 0xAB65, 0x101A0);

set.addRange(0x370, 0x373).addRange(0x375, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3E1).addRange(0x3F0, 0x3FF).addRange(0x1D26, 0x1D2A).addRange(0x1D5D, 0x1D61).addRange(0x1D66, 0x1D6A).addRange(0x1F00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FC4).addRange(0x1FC6, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FDD, 0x1FEF).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFE).addRange(0x10140, 0x1018E).addRange(0x1D200, 0x1D245);
module.exports = set;

/***/ }),
/* 722 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAD0);

set.addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABC, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE0, 0xAE3).addRange(0xAE6, 0xAF1).addRange(0xAF9, 0xAFF);
module.exports = set;

/***/ }),
/* 723 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D98).addRange(0x11DA0, 0x11DA9);
module.exports = set;

/***/ }),
/* 724 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA3C, 0xA51, 0xA5E);

set.addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA76);
module.exports = set;

/***/ }),
/* 725 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3005, 0x3007);

set.addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x3021, 0x3029).addRange(0x3038, 0x303B).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0x16FF0, 0x16FF1).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 726 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1100, 0x11FF).addRange(0x302E, 0x302F).addRange(0x3131, 0x318E).addRange(0x3200, 0x321E).addRange(0x3260, 0x327E).addRange(0xA960, 0xA97C).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC);
module.exports = set;

/***/ }),
/* 727 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39);
module.exports = set;

/***/ }),
/* 728 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1720, 0x1734);
module.exports = set;

/***/ }),
/* 729 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x108FB, 0x108FF);
module.exports = set;

/***/ }),
/* 730 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xFB3E);

set.addRange(0x591, 0x5C7).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F4).addRange(0xFB1D, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFB4F);
module.exports = set;

/***/ }),
/* 731 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1F200);

set.addRange(0x3041, 0x3096).addRange(0x309D, 0x309F).addRange(0x1B001, 0x1B11E).addRange(0x1B150, 0x1B152);
module.exports = set;

/***/ }),
/* 732 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10840, 0x10855).addRange(0x10857, 0x1085F);
module.exports = set;

/***/ }),
/* 733 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x670, 0x1CED, 0x1CF4, 0x101FD, 0x102E0, 0x1133B);

set.addRange(0x300, 0x36F).addRange(0x485, 0x486).addRange(0x64B, 0x655).addRange(0x951, 0x954).addRange(0x1AB0, 0x1AC0).addRange(0x1CD0, 0x1CD2).addRange(0x1CD4, 0x1CE0).addRange(0x1CE2, 0x1CE8).addRange(0x1CF8, 0x1CF9).addRange(0x1DC0, 0x1DF9).addRange(0x1DFB, 0x1DFF).addRange(0x200C, 0x200D).addRange(0x20D0, 0x20F0).addRange(0x302A, 0x302D).addRange(0x3099, 0x309A).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2D).addRange(0x1D167, 0x1D169).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 734 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B60, 0x10B72).addRange(0x10B78, 0x10B7F);
module.exports = set;

/***/ }),
/* 735 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B40, 0x10B55).addRange(0x10B58, 0x10B5F);
module.exports = set;

/***/ }),
/* 736 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA980, 0xA9CD).addRange(0xA9D0, 0xA9D9).addRange(0xA9DE, 0xA9DF);
module.exports = set;

/***/ }),
/* 737 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x110CD);

set.addRange(0x11080, 0x110C1);
module.exports = set;

/***/ }),
/* 738 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xCDE);

set.addRange(0xC80, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBC, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2);
module.exports = set;

/***/ }),
/* 739 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1B000);

set.addRange(0x30A1, 0x30FA).addRange(0x30FD, 0x30FF).addRange(0x31F0, 0x31FF).addRange(0x32D0, 0x32FE).addRange(0x3300, 0x3357).addRange(0xFF66, 0xFF6F).addRange(0xFF71, 0xFF9D).addRange(0x1B164, 0x1B167);
module.exports = set;

/***/ }),
/* 740 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA92F);

set.addRange(0xA900, 0xA92D);
module.exports = set;

/***/ }),
/* 741 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A).addRange(0x10A3F, 0x10A48).addRange(0x10A50, 0x10A58);
module.exports = set;

/***/ }),
/* 742 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE4);

set.addRange(0x18B00, 0x18CD5);
module.exports = set;

/***/ }),
/* 743 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1780, 0x17DD).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x19E0, 0x19FF);
module.exports = set;

/***/ }),
/* 744 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11200, 0x11211).addRange(0x11213, 0x1123E);
module.exports = set;

/***/ }),
/* 745 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9);
module.exports = set;

/***/ }),
/* 746 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xE84, 0xEA5, 0xEC6);

set.addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEC8, 0xECD).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF);
module.exports = set;

/***/ }),
/* 747 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xBA, 0x2071, 0x207F, 0x2132, 0x214E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2B8).addRange(0x2E0, 0x2E4).addRange(0x1D00, 0x1D25).addRange(0x1D2C, 0x1D5C).addRange(0x1D62, 0x1D65).addRange(0x1D6B, 0x1D77).addRange(0x1D79, 0x1DBE).addRange(0x1E00, 0x1EFF).addRange(0x2090, 0x209C).addRange(0x212A, 0x212B).addRange(0x2160, 0x2188).addRange(0x2C60, 0x2C7F).addRange(0xA722, 0xA787).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA7FF).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB64).addRange(0xAB66, 0xAB69).addRange(0xFB00, 0xFB06).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A);
module.exports = set;

/***/ }),
/* 748 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1C00, 0x1C37).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C4F);
module.exports = set;

/***/ }),
/* 749 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1940);

set.addRange(0x1900, 0x191E).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1944, 0x194F);
module.exports = set;

/***/ }),
/* 750 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767);
module.exports = set;

/***/ }),
/* 751 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA);
module.exports = set;

/***/ }),
/* 752 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11FB0);

set.addRange(0xA4D0, 0xA4FF);
module.exports = set;

/***/ }),
/* 753 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10280, 0x1029C);
module.exports = set;

/***/ }),
/* 754 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1093F);

set.addRange(0x10920, 0x10939);
module.exports = set;

/***/ }),
/* 755 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11150, 0x11176);
module.exports = set;

/***/ }),
/* 756 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11EE0, 0x11EF8);
module.exports = set;

/***/ }),
/* 757 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4F).addRange(0xD54, 0xD63).addRange(0xD66, 0xD7F);
module.exports = set;

/***/ }),
/* 758 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x85E);

set.addRange(0x840, 0x85B);
module.exports = set;

/***/ }),
/* 759 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10AC0, 0x10AE6).addRange(0x10AEB, 0x10AF6);
module.exports = set;

/***/ }),
/* 760 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11C70, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6);
module.exports = set;

/***/ }),
/* 761 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11D3A);

set.addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D47).addRange(0x11D50, 0x11D59);
module.exports = set;

/***/ }),
/* 762 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16E40, 0x16E9A);
module.exports = set;

/***/ }),
/* 763 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAAE0, 0xAAF6).addRange(0xABC0, 0xABED).addRange(0xABF0, 0xABF9);
module.exports = set;

/***/ }),
/* 764 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8D6);
module.exports = set;

/***/ }),
/* 765 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x109A0, 0x109B7).addRange(0x109BC, 0x109CF).addRange(0x109D2, 0x109FF);
module.exports = set;

/***/ }),
/* 766 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10980, 0x1099F);
module.exports = set;

/***/ }),
/* 767 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F);
module.exports = set;

/***/ }),
/* 768 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11600, 0x11644).addRange(0x11650, 0x11659);
module.exports = set;

/***/ }),
/* 769 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1804);

set.addRange(0x1800, 0x1801).addRange(0x1806, 0x180E).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x11660, 0x1166C);
module.exports = set;

/***/ }),
/* 770 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16A6E, 0x16A6F);
module.exports = set;

/***/ }),
/* 771 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11288);

set.addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A9);
module.exports = set;

/***/ }),
/* 772 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1000, 0x109F).addRange(0xA9E0, 0xA9FE).addRange(0xAA60, 0xAA7F);
module.exports = set;

/***/ }),
/* 773 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10880, 0x1089E).addRange(0x108A7, 0x108AF);
module.exports = set;

/***/ }),
/* 774 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119E4);
module.exports = set;

/***/ }),
/* 775 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x19DE, 0x19DF);
module.exports = set;

/***/ }),
/* 776 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11400, 0x1145B).addRange(0x1145D, 0x11461);
module.exports = set;

/***/ }),
/* 777 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x7FF);
module.exports = set;

/***/ }),
/* 778 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE1);

set.addRange(0x1B170, 0x1B2FB);
module.exports = set;

/***/ }),
/* 779 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E14E, 0x1E14F);
module.exports = set;

/***/ }),
/* 780 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1680, 0x169C);
module.exports = set;

/***/ }),
/* 781 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1C50, 0x1C7F);
module.exports = set;

/***/ }),
/* 782 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10CFA, 0x10CFF);
module.exports = set;

/***/ }),
/* 783 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10300, 0x10323).addRange(0x1032D, 0x1032F);
module.exports = set;

/***/ }),
/* 784 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A80, 0x10A9F);
module.exports = set;

/***/ }),
/* 785 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10350, 0x1037A);
module.exports = set;

/***/ }),
/* 786 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103D5);
module.exports = set;

/***/ }),
/* 787 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10F00, 0x10F27);
module.exports = set;

/***/ }),
/* 788 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A60, 0x10A7F);
module.exports = set;

/***/ }),
/* 789 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10C00, 0x10C48);
module.exports = set;

/***/ }),
/* 790 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3C, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB66, 0xB77);
module.exports = set;

/***/ }),
/* 791 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB);
module.exports = set;

/***/ }),
/* 792 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10480, 0x1049D).addRange(0x104A0, 0x104A9);
module.exports = set;

/***/ }),
/* 793 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16B00, 0x16B45).addRange(0x16B50, 0x16B59).addRange(0x16B5B, 0x16B61).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F);
module.exports = set;

/***/ }),
/* 794 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10860, 0x1087F);
module.exports = set;

/***/ }),
/* 795 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11AC0, 0x11AF8);
module.exports = set;

/***/ }),
/* 796 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA840, 0xA877);
module.exports = set;

/***/ }),
/* 797 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1091F);

set.addRange(0x10900, 0x1091B);
module.exports = set;

/***/ }),
/* 798 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B80, 0x10B91).addRange(0x10B99, 0x10B9C).addRange(0x10BA9, 0x10BAF);
module.exports = set;

/***/ }),
/* 799 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA95F);

set.addRange(0xA930, 0xA953);
module.exports = set;

/***/ }),
/* 800 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8);
module.exports = set;

/***/ }),
/* 801 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x800, 0x82D).addRange(0x830, 0x83E);
module.exports = set;

/***/ }),
/* 802 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA880, 0xA8C5).addRange(0xA8CE, 0xA8D9);
module.exports = set;

/***/ }),
/* 803 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11180, 0x111DF);
module.exports = set;

/***/ }),
/* 804 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10450, 0x1047F);
module.exports = set;

/***/ }),
/* 805 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115DD);
module.exports = set;

/***/ }),
/* 806 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1D800, 0x1DA8B).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF);
module.exports = set;

/***/ }),
/* 807 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xDBD, 0xDCA, 0xDD6);

set.addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF4).addRange(0x111E1, 0x111F4);
module.exports = set;

/***/ }),
/* 808 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10F30, 0x10F59);
module.exports = set;

/***/ }),
/* 809 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9);
module.exports = set;

/***/ }),
/* 810 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11A50, 0x11AA2);
module.exports = set;

/***/ }),
/* 811 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1B80, 0x1BBF).addRange(0x1CC0, 0x1CC7);
module.exports = set;

/***/ }),
/* 812 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA800, 0xA82C);
module.exports = set;

/***/ }),
/* 813 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x700, 0x70D).addRange(0x70F, 0x74A).addRange(0x74D, 0x74F).addRange(0x860, 0x86A);
module.exports = set;

/***/ }),
/* 814 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1700, 0x170C).addRange(0x170E, 0x1714);
module.exports = set;

/***/ }),
/* 815 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773);
module.exports = set;

/***/ }),
/* 816 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1950, 0x196D).addRange(0x1970, 0x1974);
module.exports = set;

/***/ }),
/* 817 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1A20, 0x1A5E).addRange(0x1A60, 0x1A7C).addRange(0x1A7F, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AA0, 0x1AAD);
module.exports = set;

/***/ }),
/* 818 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAA80, 0xAAC2).addRange(0xAADB, 0xAADF);
module.exports = set;

/***/ }),
/* 819 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11680, 0x116B8).addRange(0x116C0, 0x116C9);
module.exports = set;

/***/ }),
/* 820 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB9C, 0xBD0, 0xBD7, 0x11FFF);

set.addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xBE6, 0xBFA).addRange(0x11FC0, 0x11FF1);
module.exports = set;

/***/ }),
/* 821 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE0);

set.addRange(0x17000, 0x187F7).addRange(0x18800, 0x18AFF).addRange(0x18D00, 0x18D08);
module.exports = set;

/***/ }),
/* 822 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xC00, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC66, 0xC6F).addRange(0xC77, 0xC7F);
module.exports = set;

/***/ }),
/* 823 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x780, 0x7B1);
module.exports = set;

/***/ }),
/* 824 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xE01, 0xE3A).addRange(0xE40, 0xE5B);
module.exports = set;

/***/ }),
/* 825 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xF00, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF97).addRange(0xF99, 0xFBC).addRange(0xFBE, 0xFCC).addRange(0xFCE, 0xFD4).addRange(0xFD9, 0xFDA);
module.exports = set;

/***/ }),
/* 826 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2D7F);

set.addRange(0x2D30, 0x2D67).addRange(0x2D6F, 0x2D70);
module.exports = set;

/***/ }),
/* 827 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11480, 0x114C7).addRange(0x114D0, 0x114D9);
module.exports = set;

/***/ }),
/* 828 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1039F);

set.addRange(0x10380, 0x1039D);
module.exports = set;

/***/ }),
/* 829 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA500, 0xA62B);
module.exports = set;

/***/ }),
/* 830 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1E2FF);

set.addRange(0x1E2C0, 0x1E2F9);
module.exports = set;

/***/ }),
/* 831 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x118FF);

set.addRange(0x118A0, 0x118F2);
module.exports = set;

/***/ }),
/* 832 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAD).addRange(0x10EB0, 0x10EB1);
module.exports = set;

/***/ }),
/* 833 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA000, 0xA48C).addRange(0xA490, 0xA4C6);
module.exports = set;

/***/ }),
/* 834 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11A00, 0x11A47);
module.exports = set;

/***/ }),
/* 835 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x640);

set.addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F);
module.exports = set;

/***/ }),
/* 836 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x1173F);
module.exports = set;

/***/ }),
/* 837 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x14400, 0x14646);
module.exports = set;

/***/ }),
/* 838 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1EE24, 0x1EE27, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE64, 0x1EE7E);

set.addRange(0x600, 0x604).addRange(0x606, 0x61C).addRange(0x61E, 0x6DC).addRange(0x6DE, 0x6FF).addRange(0x750, 0x77F).addRange(0x8A0, 0x8B4).addRange(0x8B6, 0x8C7).addRange(0x8D3, 0x8E1).addRange(0x8E3, 0x8FF).addRange(0xFB50, 0xFBC1).addRange(0xFBD3, 0xFD3D).addRange(0xFD50, 0xFD8F).addRange(0xFD92, 0xFDC7).addRange(0xFDF0, 0xFDFD).addRange(0xFE70, 0xFE74).addRange(0xFE76, 0xFEFC).addRange(0x102E0, 0x102FB).addRange(0x10E60, 0x10E7E).addRange(0x1EE00, 0x1EE03).addRange(0x1EE05, 0x1EE1F).addRange(0x1EE21, 0x1EE22).addRange(0x1EE29, 0x1EE32).addRange(0x1EE34, 0x1EE37).addRange(0x1EE4D, 0x1EE4F).addRange(0x1EE51, 0x1EE52).addRange(0x1EE61, 0x1EE62).addRange(0x1EE67, 0x1EE6A).addRange(0x1EE6C, 0x1EE72).addRange(0x1EE74, 0x1EE77).addRange(0x1EE79, 0x1EE7C).addRange(0x1EE80, 0x1EE89).addRange(0x1EE8B, 0x1EE9B).addRange(0x1EEA1, 0x1EEA3).addRange(0x1EEA5, 0x1EEA9).addRange(0x1EEAB, 0x1EEBB).addRange(0x1EEF0, 0x1EEF1);
module.exports = set;

/***/ }),
/* 839 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x531, 0x556).addRange(0x559, 0x58A).addRange(0x58D, 0x58F).addRange(0xFB13, 0xFB17);
module.exports = set;

/***/ }),
/* 840 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B00, 0x10B35).addRange(0x10B39, 0x10B3F);
module.exports = set;

/***/ }),
/* 841 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1B00, 0x1B4B).addRange(0x1B50, 0x1B7C);
module.exports = set;

/***/ }),
/* 842 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA6A0, 0xA6F7).addRange(0x16800, 0x16A38);
module.exports = set;

/***/ }),
/* 843 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF5);
module.exports = set;

/***/ }),
/* 844 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1BC0, 0x1BF3).addRange(0x1BFC, 0x1BFF);
module.exports = set;

/***/ }),
/* 845 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x9B2, 0x9D7, 0x1CD0, 0x1CD2, 0x1CD8, 0x1CE1, 0x1CEA, 0x1CED, 0x1CF2, 0xA8F1);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0x980, 0x983).addRange(0x985, 0x98C).addRange(0x98F, 0x990).addRange(0x993, 0x9A8).addRange(0x9AA, 0x9B0).addRange(0x9B6, 0x9B9).addRange(0x9BC, 0x9C4).addRange(0x9C7, 0x9C8).addRange(0x9CB, 0x9CE).addRange(0x9DC, 0x9DD).addRange(0x9DF, 0x9E3).addRange(0x9E6, 0x9FE).addRange(0x1CD5, 0x1CD6).addRange(0x1CF5, 0x1CF7);
module.exports = set;

/***/ }),
/* 846 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11C00, 0x11C08).addRange(0x11C0A, 0x11C36).addRange(0x11C38, 0x11C45).addRange(0x11C50, 0x11C6C);
module.exports = set;

/***/ }),
/* 847 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3030, 0x3037, 0x30FB);

set.addRange(0x2EA, 0x2EB).addRange(0x3001, 0x3003).addRange(0x3008, 0x3011).addRange(0x3013, 0x301F).addRange(0x302A, 0x302D).addRange(0x3105, 0x312F).addRange(0x31A0, 0x31BF).addRange(0xFE45, 0xFE46).addRange(0xFF61, 0xFF65);
module.exports = set;

/***/ }),
/* 848 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1107F);

set.addRange(0x11000, 0x1104D).addRange(0x11052, 0x1106F);
module.exports = set;

/***/ }),
/* 849 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x2800, 0x28FF);
module.exports = set;

/***/ }),
/* 850 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA9CF);

set.addRange(0x1A00, 0x1A1B).addRange(0x1A1E, 0x1A1F);
module.exports = set;

/***/ }),
/* 851 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1735, 0x1736).addRange(0x1740, 0x1753);
module.exports = set;

/***/ }),
/* 852 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1400, 0x167F).addRange(0x18B0, 0x18F5);
module.exports = set;

/***/ }),
/* 853 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x102A0, 0x102D0);
module.exports = set;

/***/ }),
/* 854 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1056F);

set.addRange(0x10530, 0x10563);
module.exports = set;

/***/ }),
/* 855 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x9E6, 0x9EF).addRange(0x1040, 0x1049).addRange(0x11100, 0x11134).addRange(0x11136, 0x11147);
module.exports = set;

/***/ }),
/* 856 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA5C, 0xAA5F);
module.exports = set;

/***/ }),
/* 857 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0xAB70, 0xABBF);
module.exports = set;

/***/ }),
/* 858 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10FB0, 0x10FCB);
module.exports = set;

/***/ }),
/* 859 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xD7, 0xF7, 0x374, 0x37E, 0x385, 0x387, 0x605, 0x6DD, 0x8E2, 0xE3F, 0x3000, 0x3004, 0x3012, 0x3020, 0x3036, 0x327F, 0x33FF, 0xAB5B, 0xFEFF, 0x1D4A2, 0x1D4BB, 0x1D546, 0xE0001);

set.addRange(0x0, 0x40).addRange(0x5B, 0x60).addRange(0x7B, 0xA9).addRange(0xAB, 0xB9).addRange(0xBB, 0xBF).addRange(0x2B9, 0x2DF).addRange(0x2E5, 0x2E9).addRange(0x2EC, 0x2FF).addRange(0xFD5, 0xFD8).addRange(0x16EB, 0x16ED).addRange(0x2000, 0x200B).addRange(0x200E, 0x202E).addRange(0x2030, 0x2064).addRange(0x2066, 0x2070).addRange(0x2074, 0x207E).addRange(0x2080, 0x208E).addRange(0x20A0, 0x20BF).addRange(0x2100, 0x2125).addRange(0x2127, 0x2129).addRange(0x212C, 0x2131).addRange(0x2133, 0x214D).addRange(0x214F, 0x215F).addRange(0x2189, 0x218B).addRange(0x2190, 0x2426).addRange(0x2440, 0x244A).addRange(0x2460, 0x27FF).addRange(0x2900, 0x2B73).addRange(0x2B76, 0x2B95).addRange(0x2B97, 0x2BFF).addRange(0x2E00, 0x2E42).addRange(0x2E44, 0x2E52).addRange(0x2FF0, 0x2FFB).addRange(0x3248, 0x325F).addRange(0x32B1, 0x32BF).addRange(0x32CC, 0x32CF).addRange(0x3371, 0x337A).addRange(0x3380, 0x33DF).addRange(0x4DC0, 0x4DFF).addRange(0xA708, 0xA721).addRange(0xA788, 0xA78A).addRange(0xAB6A, 0xAB6B).addRange(0xFD3E, 0xFD3F).addRange(0xFE10, 0xFE19).addRange(0xFE30, 0xFE44).addRange(0xFE47, 0xFE52).addRange(0xFE54, 0xFE66).addRange(0xFE68, 0xFE6B).addRange(0xFF01, 0xFF20).addRange(0xFF3B, 0xFF40).addRange(0xFF5B, 0xFF60).addRange(0xFFE0, 0xFFE6);
set.addRange(0xFFE8, 0xFFEE).addRange(0xFFF9, 0xFFFD).addRange(0x10190, 0x1019C).addRange(0x101D0, 0x101FC).addRange(0x16FE2, 0x16FE3).addRange(0x1D000, 0x1D0F5).addRange(0x1D100, 0x1D126).addRange(0x1D129, 0x1D166).addRange(0x1D16A, 0x1D17A).addRange(0x1D183, 0x1D184).addRange(0x1D18C, 0x1D1A9).addRange(0x1D1AE, 0x1D1E8).addRange(0x1D2E0, 0x1D2F3).addRange(0x1D300, 0x1D356).addRange(0x1D372, 0x1D378).addRange(0x1D400, 0x1D454).addRange(0x1D456, 0x1D49C).addRange(0x1D49E, 0x1D49F).addRange(0x1D4A5, 0x1D4A6).addRange(0x1D4A9, 0x1D4AC).addRange(0x1D4AE, 0x1D4B9).addRange(0x1D4BD, 0x1D4C3).addRange(0x1D4C5, 0x1D505).addRange(0x1D507, 0x1D50A).addRange(0x1D50D, 0x1D514).addRange(0x1D516, 0x1D51C).addRange(0x1D51E, 0x1D539).addRange(0x1D53B, 0x1D53E).addRange(0x1D540, 0x1D544).addRange(0x1D54A, 0x1D550).addRange(0x1D552, 0x1D6A5).addRange(0x1D6A8, 0x1D7CB).addRange(0x1D7CE, 0x1D7FF).addRange(0x1EC71, 0x1ECB4).addRange(0x1ED01, 0x1ED3D).addRange(0x1F000, 0x1F02B).addRange(0x1F030, 0x1F093).addRange(0x1F0A0, 0x1F0AE).addRange(0x1F0B1, 0x1F0BF).addRange(0x1F0C1, 0x1F0CF).addRange(0x1F0D1, 0x1F0F5).addRange(0x1F100, 0x1F1AD).addRange(0x1F1E6, 0x1F1FF).addRange(0x1F201, 0x1F202).addRange(0x1F210, 0x1F23B).addRange(0x1F240, 0x1F248).addRange(0x1F260, 0x1F265).addRange(0x1F300, 0x1F6D7).addRange(0x1F6E0, 0x1F6EC).addRange(0x1F6F0, 0x1F6FC).addRange(0x1F700, 0x1F773);
set.addRange(0x1F780, 0x1F7D8).addRange(0x1F7E0, 0x1F7EB).addRange(0x1F800, 0x1F80B).addRange(0x1F810, 0x1F847).addRange(0x1F850, 0x1F859).addRange(0x1F860, 0x1F887).addRange(0x1F890, 0x1F8AD).addRange(0x1F8B0, 0x1F8B1).addRange(0x1F900, 0x1F978).addRange(0x1F97A, 0x1F9CB).addRange(0x1F9CD, 0x1FA53).addRange(0x1FA60, 0x1FA6D).addRange(0x1FA70, 0x1FA74).addRange(0x1FA78, 0x1FA7A).addRange(0x1FA80, 0x1FA86).addRange(0x1FA90, 0x1FAA8).addRange(0x1FAB0, 0x1FAB6).addRange(0x1FAC0, 0x1FAC2).addRange(0x1FAD0, 0x1FAD6).addRange(0x1FB00, 0x1FB92).addRange(0x1FB94, 0x1FBCA).addRange(0x1FBF0, 0x1FBF9).addRange(0xE0020, 0xE007F);
module.exports = set;

/***/ }),
/* 860 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x3E2, 0x3EF).addRange(0x2C80, 0x2CF3).addRange(0x2CF9, 0x2CFF).addRange(0x102E0, 0x102FB);
module.exports = set;

/***/ }),
/* 861 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12470, 0x12474).addRange(0x12480, 0x12543);
module.exports = set;

/***/ }),
/* 862 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x10808, 0x1083C, 0x1083F);

set.addRange(0x10100, 0x10102).addRange(0x10107, 0x10133).addRange(0x10137, 0x1013F).addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838);
module.exports = set;

/***/ }),
/* 863 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1D2B, 0x1D78, 0x1DF8, 0x2E43);

set.addRange(0x400, 0x52F).addRange(0x1C80, 0x1C88).addRange(0x2DE0, 0x2DFF).addRange(0xA640, 0xA69F).addRange(0xFE2E, 0xFE2F);
module.exports = set;

/***/ }),
/* 864 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10400, 0x1044F);
module.exports = set;

/***/ }),
/* 865 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x20F0);

set.addRange(0x900, 0x952).addRange(0x955, 0x97F).addRange(0x1CD0, 0x1CF6).addRange(0x1CF8, 0x1CF9).addRange(0xA830, 0xA839).addRange(0xA8E0, 0xA8FF);
module.exports = set;

/***/ }),
/* 866 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11909);

set.addRange(0x11900, 0x11906).addRange(0x1190C, 0x11913).addRange(0x11915, 0x11916).addRange(0x11918, 0x11935).addRange(0x11937, 0x11938).addRange(0x1193B, 0x11946).addRange(0x11950, 0x11959);
module.exports = set;

/***/ }),
/* 867 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x96F).addRange(0xA830, 0xA839).addRange(0x11800, 0x1183B);
module.exports = set;

/***/ }),
/* 868 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1BC00, 0x1BC6A).addRange(0x1BC70, 0x1BC7C).addRange(0x1BC80, 0x1BC88).addRange(0x1BC90, 0x1BC99).addRange(0x1BC9C, 0x1BCA3);
module.exports = set;

/***/ }),
/* 869 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x13000, 0x1342E).addRange(0x13430, 0x13438);
module.exports = set;

/***/ }),
/* 870 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10500, 0x10527);
module.exports = set;

/***/ }),
/* 871 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10FE0, 0x10FF6);
module.exports = set;

/***/ }),
/* 872 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1258, 0x12C0);

set.addRange(0x1200, 0x1248).addRange(0x124A, 0x124D).addRange(0x1250, 0x1256).addRange(0x125A, 0x125D).addRange(0x1260, 0x1288).addRange(0x128A, 0x128D).addRange(0x1290, 0x12B0).addRange(0x12B2, 0x12B5).addRange(0x12B8, 0x12BE).addRange(0x12C2, 0x12C5).addRange(0x12C8, 0x12D6).addRange(0x12D8, 0x1310).addRange(0x1312, 0x1315).addRange(0x1318, 0x135A).addRange(0x135D, 0x137C).addRange(0x1380, 0x1399).addRange(0x2D80, 0x2D96).addRange(0x2DA0, 0x2DA6).addRange(0x2DA8, 0x2DAE).addRange(0x2DB0, 0x2DB6).addRange(0x2DB8, 0x2DBE).addRange(0x2DC0, 0x2DC6).addRange(0x2DC8, 0x2DCE).addRange(0x2DD0, 0x2DD6).addRange(0x2DD8, 0x2DDE).addRange(0xAB01, 0xAB06).addRange(0xAB09, 0xAB0E).addRange(0xAB11, 0xAB16).addRange(0xAB20, 0xAB26).addRange(0xAB28, 0xAB2E);
module.exports = set;

/***/ }),
/* 873 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x10C7, 0x10CD, 0x2D27, 0x2D2D);

set.addRange(0x10A0, 0x10C5).addRange(0x10D0, 0x10FF).addRange(0x1C90, 0x1CBA).addRange(0x1CBD, 0x1CBF).addRange(0x2D00, 0x2D25);
module.exports = set;

/***/ }),
/* 874 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x484, 0x487, 0x2E43, 0xA66F);

set.addRange(0x2C00, 0x2C2E).addRange(0x2C30, 0x2C5E).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A);
module.exports = set;

/***/ }),
/* 875 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10330, 0x1034A);
module.exports = set;

/***/ }),
/* 876 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CD0, 0x20F0, 0x11350, 0x11357, 0x11FD3);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xBE6, 0xBF3).addRange(0x1CD2, 0x1CD3).addRange(0x1CF2, 0x1CF4).addRange(0x1CF8, 0x1CF9).addRange(0x11300, 0x11303).addRange(0x11305, 0x1130C).addRange(0x1130F, 0x11310).addRange(0x11313, 0x11328).addRange(0x1132A, 0x11330).addRange(0x11332, 0x11333).addRange(0x11335, 0x11339).addRange(0x1133B, 0x11344).addRange(0x11347, 0x11348).addRange(0x1134B, 0x1134D).addRange(0x1135D, 0x11363).addRange(0x11366, 0x1136C).addRange(0x11370, 0x11374).addRange(0x11FD0, 0x11FD1);
module.exports = set;

/***/ }),
/* 877 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x342, 0x345, 0x37F, 0x384, 0x386, 0x38C, 0x1F59, 0x1F5B, 0x1F5D, 0x2126, 0xAB65, 0x101A0);

set.addRange(0x370, 0x373).addRange(0x375, 0x377).addRange(0x37A, 0x37D).addRange(0x388, 0x38A).addRange(0x38E, 0x3A1).addRange(0x3A3, 0x3E1).addRange(0x3F0, 0x3FF).addRange(0x1D26, 0x1D2A).addRange(0x1D5D, 0x1D61).addRange(0x1D66, 0x1D6A).addRange(0x1DBF, 0x1DC1).addRange(0x1F00, 0x1F15).addRange(0x1F18, 0x1F1D).addRange(0x1F20, 0x1F45).addRange(0x1F48, 0x1F4D).addRange(0x1F50, 0x1F57).addRange(0x1F5F, 0x1F7D).addRange(0x1F80, 0x1FB4).addRange(0x1FB6, 0x1FC4).addRange(0x1FC6, 0x1FD3).addRange(0x1FD6, 0x1FDB).addRange(0x1FDD, 0x1FEF).addRange(0x1FF2, 0x1FF4).addRange(0x1FF6, 0x1FFE).addRange(0x10140, 0x1018E).addRange(0x1D200, 0x1D245);
module.exports = set;

/***/ }),
/* 878 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAD0);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xA81, 0xA83).addRange(0xA85, 0xA8D).addRange(0xA8F, 0xA91).addRange(0xA93, 0xAA8).addRange(0xAAA, 0xAB0).addRange(0xAB2, 0xAB3).addRange(0xAB5, 0xAB9).addRange(0xABC, 0xAC5).addRange(0xAC7, 0xAC9).addRange(0xACB, 0xACD).addRange(0xAE0, 0xAE3).addRange(0xAE6, 0xAF1).addRange(0xAF9, 0xAFF).addRange(0xA830, 0xA839);
module.exports = set;

/***/ }),
/* 879 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x965).addRange(0x11D60, 0x11D65).addRange(0x11D67, 0x11D68).addRange(0x11D6A, 0x11D8E).addRange(0x11D90, 0x11D91).addRange(0x11D93, 0x11D98).addRange(0x11DA0, 0x11DA9);
module.exports = set;

/***/ }),
/* 880 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA3C, 0xA51, 0xA5E);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xA01, 0xA03).addRange(0xA05, 0xA0A).addRange(0xA0F, 0xA10).addRange(0xA13, 0xA28).addRange(0xA2A, 0xA30).addRange(0xA32, 0xA33).addRange(0xA35, 0xA36).addRange(0xA38, 0xA39).addRange(0xA3E, 0xA42).addRange(0xA47, 0xA48).addRange(0xA4B, 0xA4D).addRange(0xA59, 0xA5C).addRange(0xA66, 0xA76).addRange(0xA830, 0xA839);
module.exports = set;

/***/ }),
/* 881 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3030, 0x30FB, 0x32FF);

set.addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5).addRange(0x3001, 0x3003).addRange(0x3005, 0x3011).addRange(0x3013, 0x301F).addRange(0x3021, 0x302D).addRange(0x3037, 0x303F).addRange(0x3190, 0x319F).addRange(0x31C0, 0x31E3).addRange(0x3220, 0x3247).addRange(0x3280, 0x32B0).addRange(0x32C0, 0x32CB).addRange(0x3358, 0x3370).addRange(0x337B, 0x337F).addRange(0x33E0, 0x33FE).addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFC).addRange(0xA700, 0xA707).addRange(0xF900, 0xFA6D).addRange(0xFA70, 0xFAD9).addRange(0xFE45, 0xFE46).addRange(0xFF61, 0xFF65).addRange(0x16FF0, 0x16FF1).addRange(0x1D360, 0x1D371).addRange(0x1F250, 0x1F251).addRange(0x20000, 0x2A6DD).addRange(0x2A700, 0x2B734).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x2F800, 0x2FA1D).addRange(0x30000, 0x3134A);
module.exports = set;

/***/ }),
/* 882 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3037, 0x30FB);

set.addRange(0x1100, 0x11FF).addRange(0x3001, 0x3003).addRange(0x3008, 0x3011).addRange(0x3013, 0x301F).addRange(0x302E, 0x3030).addRange(0x3131, 0x318E).addRange(0x3200, 0x321E).addRange(0x3260, 0x327E).addRange(0xA960, 0xA97C).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xFE45, 0xFE46).addRange(0xFF61, 0xFF65).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC);
module.exports = set;

/***/ }),
/* 883 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x60C, 0x61B, 0x61F, 0x640, 0x6D4);

set.addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39);
module.exports = set;

/***/ }),
/* 884 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1720, 0x1736);
module.exports = set;

/***/ }),
/* 885 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x108FB, 0x108FF);
module.exports = set;

/***/ }),
/* 886 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xFB3E);

set.addRange(0x591, 0x5C7).addRange(0x5D0, 0x5EA).addRange(0x5EF, 0x5F4).addRange(0xFB1D, 0xFB36).addRange(0xFB38, 0xFB3C).addRange(0xFB40, 0xFB41).addRange(0xFB43, 0xFB44).addRange(0xFB46, 0xFB4F);
module.exports = set;

/***/ }),
/* 887 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3037, 0xFF70, 0x1F200);

set.addRange(0x3001, 0x3003).addRange(0x3008, 0x3011).addRange(0x3013, 0x301F).addRange(0x3030, 0x3035).addRange(0x303C, 0x303D).addRange(0x3041, 0x3096).addRange(0x3099, 0x30A0).addRange(0x30FB, 0x30FC).addRange(0xFE45, 0xFE46).addRange(0xFF61, 0xFF65).addRange(0xFF9E, 0xFF9F).addRange(0x1B001, 0x1B11E).addRange(0x1B150, 0x1B152);
module.exports = set;

/***/ }),
/* 888 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10840, 0x10855).addRange(0x10857, 0x1085F);
module.exports = set;

/***/ }),
/* 889 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1DF9, 0x101FD);

set.addRange(0x300, 0x341).addRange(0x343, 0x344).addRange(0x346, 0x362).addRange(0x953, 0x954).addRange(0x1AB0, 0x1AC0).addRange(0x1DC2, 0x1DF7).addRange(0x1DFB, 0x1DFF).addRange(0x200C, 0x200D).addRange(0x20D0, 0x20EF).addRange(0xFE00, 0xFE0F).addRange(0xFE20, 0xFE2D).addRange(0x1D167, 0x1D169).addRange(0x1D17B, 0x1D182).addRange(0x1D185, 0x1D18B).addRange(0x1D1AA, 0x1D1AD).addRange(0xE0100, 0xE01EF);
module.exports = set;

/***/ }),
/* 890 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B60, 0x10B72).addRange(0x10B78, 0x10B7F);
module.exports = set;

/***/ }),
/* 891 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10B40, 0x10B55).addRange(0x10B58, 0x10B5F);
module.exports = set;

/***/ }),
/* 892 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA980, 0xA9CD).addRange(0xA9CF, 0xA9D9).addRange(0xA9DE, 0xA9DF);
module.exports = set;

/***/ }),
/* 893 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x110CD);

set.addRange(0x966, 0x96F).addRange(0xA830, 0xA839).addRange(0x11080, 0x110C1);
module.exports = set;

/***/ }),
/* 894 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xCDE, 0x1CD0, 0x1CD2, 0x1CDA, 0x1CF2, 0x1CF4);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xC80, 0xC8C).addRange(0xC8E, 0xC90).addRange(0xC92, 0xCA8).addRange(0xCAA, 0xCB3).addRange(0xCB5, 0xCB9).addRange(0xCBC, 0xCC4).addRange(0xCC6, 0xCC8).addRange(0xCCA, 0xCCD).addRange(0xCD5, 0xCD6).addRange(0xCE0, 0xCE3).addRange(0xCE6, 0xCEF).addRange(0xCF1, 0xCF2).addRange(0xA830, 0xA835);
module.exports = set;

/***/ }),
/* 895 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x3037, 0x1B000);

set.addRange(0x3001, 0x3003).addRange(0x3008, 0x3011).addRange(0x3013, 0x301F).addRange(0x3030, 0x3035).addRange(0x303C, 0x303D).addRange(0x3099, 0x309C).addRange(0x30A0, 0x30FF).addRange(0x31F0, 0x31FF).addRange(0x32D0, 0x32FE).addRange(0x3300, 0x3357).addRange(0xFE45, 0xFE46).addRange(0xFF61, 0xFF9F).addRange(0x1B164, 0x1B167);
module.exports = set;

/***/ }),
/* 896 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA900, 0xA92F);
module.exports = set;

/***/ }),
/* 897 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A).addRange(0x10A3F, 0x10A48).addRange(0x10A50, 0x10A58);
module.exports = set;

/***/ }),
/* 898 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE4);

set.addRange(0x18B00, 0x18CD5);
module.exports = set;

/***/ }),
/* 899 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1780, 0x17DD).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x19E0, 0x19FF);
module.exports = set;

/***/ }),
/* 900 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAE6, 0xAEF).addRange(0xA830, 0xA839).addRange(0x11200, 0x11211).addRange(0x11213, 0x1123E);
module.exports = set;

/***/ }),
/* 901 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x965).addRange(0xA830, 0xA839).addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9);
module.exports = set;

/***/ }),
/* 902 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xE84, 0xEA5, 0xEC6);

set.addRange(0xE81, 0xE82).addRange(0xE86, 0xE8A).addRange(0xE8C, 0xEA3).addRange(0xEA7, 0xEBD).addRange(0xEC0, 0xEC4).addRange(0xEC8, 0xECD).addRange(0xED0, 0xED9).addRange(0xEDC, 0xEDF);
module.exports = set;

/***/ }),
/* 903 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xAA, 0xBA, 0x10FB, 0x202F, 0x2071, 0x207F, 0x20F0, 0x2132, 0x214E, 0xA92E);

set.addRange(0x41, 0x5A).addRange(0x61, 0x7A).addRange(0xC0, 0xD6).addRange(0xD8, 0xF6).addRange(0xF8, 0x2B8).addRange(0x2E0, 0x2E4).addRange(0x363, 0x36F).addRange(0x485, 0x486).addRange(0x951, 0x952).addRange(0x1D00, 0x1D25).addRange(0x1D2C, 0x1D5C).addRange(0x1D62, 0x1D65).addRange(0x1D6B, 0x1D77).addRange(0x1D79, 0x1DBE).addRange(0x1E00, 0x1EFF).addRange(0x2090, 0x209C).addRange(0x212A, 0x212B).addRange(0x2160, 0x2188).addRange(0x2C60, 0x2C7F).addRange(0xA700, 0xA707).addRange(0xA722, 0xA787).addRange(0xA78B, 0xA7BF).addRange(0xA7C2, 0xA7CA).addRange(0xA7F5, 0xA7FF).addRange(0xAB30, 0xAB5A).addRange(0xAB5C, 0xAB64).addRange(0xAB66, 0xAB69).addRange(0xFB00, 0xFB06).addRange(0xFF21, 0xFF3A).addRange(0xFF41, 0xFF5A);
module.exports = set;

/***/ }),
/* 904 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1C00, 0x1C37).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C4F);
module.exports = set;

/***/ }),
/* 905 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x965, 0x1940);

set.addRange(0x1900, 0x191E).addRange(0x1920, 0x192B).addRange(0x1930, 0x193B).addRange(0x1944, 0x194F);
module.exports = set;

/***/ }),
/* 906 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10107, 0x10133).addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767);
module.exports = set;

/***/ }),
/* 907 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA).addRange(0x10100, 0x10102).addRange(0x10107, 0x10133).addRange(0x10137, 0x1013F);
module.exports = set;

/***/ }),
/* 908 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11FB0);

set.addRange(0xA4D0, 0xA4FF);
module.exports = set;

/***/ }),
/* 909 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10280, 0x1029C);
module.exports = set;

/***/ }),
/* 910 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1093F);

set.addRange(0x10920, 0x10939);
module.exports = set;

/***/ }),
/* 911 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x96F).addRange(0xA830, 0xA839).addRange(0x11150, 0x11176);
module.exports = set;

/***/ }),
/* 912 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11EE0, 0x11EF8);
module.exports = set;

/***/ }),
/* 913 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CDA);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xD00, 0xD0C).addRange(0xD0E, 0xD10).addRange(0xD12, 0xD44).addRange(0xD46, 0xD48).addRange(0xD4A, 0xD4F).addRange(0xD54, 0xD63).addRange(0xD66, 0xD7F).addRange(0xA830, 0xA832);
module.exports = set;

/***/ }),
/* 914 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x640, 0x85E);

set.addRange(0x840, 0x85B);
module.exports = set;

/***/ }),
/* 915 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x640);

set.addRange(0x10AC0, 0x10AE6).addRange(0x10AEB, 0x10AF6);
module.exports = set;

/***/ }),
/* 916 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11C70, 0x11C8F).addRange(0x11C92, 0x11CA7).addRange(0x11CA9, 0x11CB6);
module.exports = set;

/***/ }),
/* 917 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11D3A);

set.addRange(0x964, 0x965).addRange(0x11D00, 0x11D06).addRange(0x11D08, 0x11D09).addRange(0x11D0B, 0x11D36).addRange(0x11D3C, 0x11D3D).addRange(0x11D3F, 0x11D47).addRange(0x11D50, 0x11D59);
module.exports = set;

/***/ }),
/* 918 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16E40, 0x16E9A);
module.exports = set;

/***/ }),
/* 919 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAAE0, 0xAAF6).addRange(0xABC0, 0xABED).addRange(0xABF0, 0xABF9);
module.exports = set;

/***/ }),
/* 920 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8D6);
module.exports = set;

/***/ }),
/* 921 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x109A0, 0x109B7).addRange(0x109BC, 0x109CF).addRange(0x109D2, 0x109FF);
module.exports = set;

/***/ }),
/* 922 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10980, 0x1099F);
module.exports = set;

/***/ }),
/* 923 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F);
module.exports = set;

/***/ }),
/* 924 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA830, 0xA839).addRange(0x11600, 0x11644).addRange(0x11650, 0x11659);
module.exports = set;

/***/ }),
/* 925 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x202F);

set.addRange(0x1800, 0x180E).addRange(0x1810, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x11660, 0x1166C);
module.exports = set;

/***/ }),
/* 926 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16A6E, 0x16A6F);
module.exports = set;

/***/ }),
/* 927 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x11288);

set.addRange(0xA66, 0xA6F).addRange(0x11280, 0x11286).addRange(0x1128A, 0x1128D).addRange(0x1128F, 0x1129D).addRange(0x1129F, 0x112A9);
module.exports = set;

/***/ }),
/* 928 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA92E);

set.addRange(0x1000, 0x109F).addRange(0xA9E0, 0xA9FE).addRange(0xAA60, 0xAA7F);
module.exports = set;

/***/ }),
/* 929 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10880, 0x1089E).addRange(0x108A7, 0x108AF);
module.exports = set;

/***/ }),
/* 930 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CE9, 0x1CF2, 0x1CFA);

set.addRange(0x964, 0x965).addRange(0xCE6, 0xCEF).addRange(0xA830, 0xA835).addRange(0x119A0, 0x119A7).addRange(0x119AA, 0x119D7).addRange(0x119DA, 0x119E4);
module.exports = set;

/***/ }),
/* 931 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1980, 0x19AB).addRange(0x19B0, 0x19C9).addRange(0x19D0, 0x19DA).addRange(0x19DE, 0x19DF);
module.exports = set;

/***/ }),
/* 932 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11400, 0x1145B).addRange(0x1145D, 0x11461);
module.exports = set;

/***/ }),
/* 933 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x7FF);
module.exports = set;

/***/ }),
/* 934 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE1);

set.addRange(0x1B170, 0x1B2FB);
module.exports = set;

/***/ }),
/* 935 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E14E, 0x1E14F);
module.exports = set;

/***/ }),
/* 936 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1680, 0x169C);
module.exports = set;

/***/ }),
/* 937 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1C50, 0x1C7F);
module.exports = set;

/***/ }),
/* 938 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10CFA, 0x10CFF);
module.exports = set;

/***/ }),
/* 939 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10300, 0x10323).addRange(0x1032D, 0x1032F);
module.exports = set;

/***/ }),
/* 940 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A80, 0x10A9F);
module.exports = set;

/***/ }),
/* 941 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x483);

set.addRange(0x10350, 0x1037A);
module.exports = set;

/***/ }),
/* 942 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103D5);
module.exports = set;

/***/ }),
/* 943 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10F00, 0x10F27);
module.exports = set;

/***/ }),
/* 944 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10A60, 0x10A7F);
module.exports = set;

/***/ }),
/* 945 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10C00, 0x10C48);
module.exports = set;

/***/ }),
/* 946 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CDA, 0x1CF2);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xB01, 0xB03).addRange(0xB05, 0xB0C).addRange(0xB0F, 0xB10).addRange(0xB13, 0xB28).addRange(0xB2A, 0xB30).addRange(0xB32, 0xB33).addRange(0xB35, 0xB39).addRange(0xB3C, 0xB44).addRange(0xB47, 0xB48).addRange(0xB4B, 0xB4D).addRange(0xB55, 0xB57).addRange(0xB5C, 0xB5D).addRange(0xB5F, 0xB63).addRange(0xB66, 0xB77);
module.exports = set;

/***/ }),
/* 947 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB);
module.exports = set;

/***/ }),
/* 948 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10480, 0x1049D).addRange(0x104A0, 0x104A9);
module.exports = set;

/***/ }),
/* 949 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16B00, 0x16B45).addRange(0x16B50, 0x16B59).addRange(0x16B5B, 0x16B61).addRange(0x16B63, 0x16B77).addRange(0x16B7D, 0x16B8F);
module.exports = set;

/***/ }),
/* 950 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10860, 0x1087F);
module.exports = set;

/***/ }),
/* 951 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11AC0, 0x11AF8);
module.exports = set;

/***/ }),
/* 952 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1805);

set.addRange(0x1802, 0x1803).addRange(0xA840, 0xA877);
module.exports = set;

/***/ }),
/* 953 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1091F);

set.addRange(0x10900, 0x1091B);
module.exports = set;

/***/ }),
/* 954 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x640);

set.addRange(0x10B80, 0x10B91).addRange(0x10B99, 0x10B9C).addRange(0x10BA9, 0x10BAF);
module.exports = set;

/***/ }),
/* 955 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xA95F);

set.addRange(0xA930, 0xA953);
module.exports = set;

/***/ }),
/* 956 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8);
module.exports = set;

/***/ }),
/* 957 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x800, 0x82D).addRange(0x830, 0x83E);
module.exports = set;

/***/ }),
/* 958 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA880, 0xA8C5).addRange(0xA8CE, 0xA8D9);
module.exports = set;

/***/ }),
/* 959 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x951, 0x1CD7, 0x1CD9, 0x1CE0);

set.addRange(0x1CDC, 0x1CDD).addRange(0x11180, 0x111DF);
module.exports = set;

/***/ }),
/* 960 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x10450, 0x1047F);
module.exports = set;

/***/ }),
/* 961 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115DD);
module.exports = set;

/***/ }),
/* 962 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1D800, 0x1DA8B).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF);
module.exports = set;

/***/ }),
/* 963 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xDBD, 0xDCA, 0xDD6);

set.addRange(0x964, 0x965).addRange(0xD81, 0xD83).addRange(0xD85, 0xD96).addRange(0xD9A, 0xDB1).addRange(0xDB3, 0xDBB).addRange(0xDC0, 0xDC6).addRange(0xDCF, 0xDD4).addRange(0xDD8, 0xDDF).addRange(0xDE6, 0xDEF).addRange(0xDF2, 0xDF4).addRange(0x111E1, 0x111F4);
module.exports = set;

/***/ }),
/* 964 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x640);

set.addRange(0x10F30, 0x10F59);
module.exports = set;

/***/ }),
/* 965 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9);
module.exports = set;

/***/ }),
/* 966 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11A50, 0x11AA2);
module.exports = set;

/***/ }),
/* 967 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1B80, 0x1BBF).addRange(0x1CC0, 0x1CC7);
module.exports = set;

/***/ }),
/* 968 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x965).addRange(0x9E6, 0x9EF).addRange(0xA800, 0xA82C);
module.exports = set;

/***/ }),
/* 969 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x60C, 0x61F, 0x640, 0x670, 0x1DF8);

set.addRange(0x61B, 0x61C).addRange(0x64B, 0x655).addRange(0x700, 0x70D).addRange(0x70F, 0x74A).addRange(0x74D, 0x74F).addRange(0x860, 0x86A);
module.exports = set;

/***/ }),
/* 970 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1700, 0x170C).addRange(0x170E, 0x1714).addRange(0x1735, 0x1736);
module.exports = set;

/***/ }),
/* 971 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1735, 0x1736).addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773);
module.exports = set;

/***/ }),
/* 972 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1040, 0x1049).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974);
module.exports = set;

/***/ }),
/* 973 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x1A20, 0x1A5E).addRange(0x1A60, 0x1A7C).addRange(0x1A7F, 0x1A89).addRange(0x1A90, 0x1A99).addRange(0x1AA0, 0x1AAD);
module.exports = set;

/***/ }),
/* 974 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xAA80, 0xAAC2).addRange(0xAADB, 0xAADF);
module.exports = set;

/***/ }),
/* 975 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x964, 0x965).addRange(0xA830, 0xA839).addRange(0x11680, 0x116B8).addRange(0x116C0, 0x116C9);
module.exports = set;

/***/ }),
/* 976 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0xB9C, 0xBD0, 0xBD7, 0x1CDA, 0xA8F3, 0x11301, 0x11303, 0x11FFF);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xB82, 0xB83).addRange(0xB85, 0xB8A).addRange(0xB8E, 0xB90).addRange(0xB92, 0xB95).addRange(0xB99, 0xB9A).addRange(0xB9E, 0xB9F).addRange(0xBA3, 0xBA4).addRange(0xBA8, 0xBAA).addRange(0xBAE, 0xBB9).addRange(0xBBE, 0xBC2).addRange(0xBC6, 0xBC8).addRange(0xBCA, 0xBCD).addRange(0xBE6, 0xBFA).addRange(0x1133B, 0x1133C).addRange(0x11FC0, 0x11FF1);
module.exports = set;

/***/ }),
/* 977 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x16FE0);

set.addRange(0x17000, 0x187F7).addRange(0x18800, 0x18AFF).addRange(0x18D00, 0x18D08);
module.exports = set;

/***/ }),
/* 978 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CDA, 0x1CF2);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xC00, 0xC0C).addRange(0xC0E, 0xC10).addRange(0xC12, 0xC28).addRange(0xC2A, 0xC39).addRange(0xC3D, 0xC44).addRange(0xC46, 0xC48).addRange(0xC4A, 0xC4D).addRange(0xC55, 0xC56).addRange(0xC58, 0xC5A).addRange(0xC60, 0xC63).addRange(0xC66, 0xC6F).addRange(0xC77, 0xC7F);
module.exports = set;

/***/ }),
/* 979 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x60C, 0x61F, 0xFDF2, 0xFDFD);

set.addRange(0x61B, 0x61C).addRange(0x660, 0x669).addRange(0x780, 0x7B1);
module.exports = set;

/***/ }),
/* 980 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xE01, 0xE3A).addRange(0xE40, 0xE5B);
module.exports = set;

/***/ }),
/* 981 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xF00, 0xF47).addRange(0xF49, 0xF6C).addRange(0xF71, 0xF97).addRange(0xF99, 0xFBC).addRange(0xFBE, 0xFCC).addRange(0xFCE, 0xFD4).addRange(0xFD9, 0xFDA);
module.exports = set;

/***/ }),
/* 982 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x2D7F);

set.addRange(0x2D30, 0x2D67).addRange(0x2D6F, 0x2D70);
module.exports = set;

/***/ }),
/* 983 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1CF2);

set.addRange(0x951, 0x952).addRange(0x964, 0x965).addRange(0xA830, 0xA839).addRange(0x11480, 0x114C7).addRange(0x114D0, 0x114D9);
module.exports = set;

/***/ }),
/* 984 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1039F);

set.addRange(0x10380, 0x1039D);
module.exports = set;

/***/ }),
/* 985 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0xA500, 0xA62B);
module.exports = set;

/***/ }),
/* 986 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x1E2FF);

set.addRange(0x1E2C0, 0x1E2F9);
module.exports = set;

/***/ }),
/* 987 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x118FF);

set.addRange(0x118A0, 0x118F2);
module.exports = set;

/***/ }),
/* 988 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x60C, 0x61B, 0x61F);

set.addRange(0x660, 0x669).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAD).addRange(0x10EB0, 0x10EB1);
module.exports = set;

/***/ }),
/* 989 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)(0x30FB);

set.addRange(0x3001, 0x3002).addRange(0x3008, 0x3011).addRange(0x3014, 0x301B).addRange(0xA000, 0xA48C).addRange(0xA490, 0xA4C6).addRange(0xFF61, 0xFF65);
module.exports = set;

/***/ }),
/* 990 */
/***/ (function(module, exports, __webpack_require__) {

var set = __webpack_require__(0)();

set.addRange(0x11A00, 0x11A47);
module.exports = set;

/***/ }),
/* 991 */
/***/ (function(module, exports) {

module.exports = new Map([['General_Category', ['Cased_Letter', 'Close_Punctuation', 'Connector_Punctuation', 'Control', 'Currency_Symbol', 'Dash_Punctuation', 'Decimal_Number', 'Enclosing_Mark', 'Final_Punctuation', 'Format', 'Initial_Punctuation', 'Letter', 'Letter_Number', 'Line_Separator', 'Lowercase_Letter', 'Mark', 'Math_Symbol', 'Modifier_Letter', 'Modifier_Symbol', 'Nonspacing_Mark', 'Number', 'Open_Punctuation', 'Other', 'Other_Letter', 'Other_Number', 'Other_Punctuation', 'Other_Symbol', 'Paragraph_Separator', 'Private_Use', 'Punctuation', 'Separator', 'Space_Separator', 'Spacing_Mark', 'Surrogate', 'Symbol', 'Titlecase_Letter', 'Unassigned', 'Uppercase_Letter']], ['Script', ['Adlam', 'Ahom', 'Anatolian_Hieroglyphs', 'Arabic', 'Armenian', 'Avestan', 'Balinese', 'Bamum', 'Bassa_Vah', 'Batak', 'Bengali', 'Bhaiksuki', 'Bopomofo', 'Brahmi', 'Braille', 'Buginese', 'Buhid', 'Canadian_Aboriginal', 'Carian', 'Caucasian_Albanian', 'Chakma', 'Cham', 'Cherokee', 'Chorasmian', 'Common', 'Coptic', 'Cuneiform', 'Cypriot', 'Cyrillic', 'Deseret', 'Devanagari', 'Dives_Akuru', 'Dogra', 'Duployan', 'Egyptian_Hieroglyphs', 'Elbasan', 'Elymaic', 'Ethiopic', 'Georgian', 'Glagolitic', 'Gothic', 'Grantha', 'Greek', 'Gujarati', 'Gunjala_Gondi', 'Gurmukhi', 'Han', 'Hangul', 'Hanifi_Rohingya', 'Hanunoo', 'Hatran', 'Hebrew', 'Hiragana', 'Imperial_Aramaic', 'Inherited', 'Inscriptional_Pahlavi', 'Inscriptional_Parthian', 'Javanese', 'Kaithi', 'Kannada', 'Katakana', 'Kayah_Li', 'Kharoshthi', 'Khitan_Small_Script', 'Khmer', 'Khojki', 'Khudawadi', 'Lao', 'Latin', 'Lepcha', 'Limbu', 'Linear_A', 'Linear_B', 'Lisu', 'Lycian', 'Lydian', 'Mahajani', 'Makasar', 'Malayalam', 'Mandaic', 'Manichaean', 'Marchen', 'Masaram_Gondi', 'Medefaidrin', 'Meetei_Mayek', 'Mende_Kikakui', 'Meroitic_Cursive', 'Meroitic_Hieroglyphs', 'Miao', 'Modi', 'Mongolian', 'Mro', 'Multani', 'Myanmar', 'Nabataean', 'Nandinagari', 'New_Tai_Lue', 'Newa', 'Nko', 'Nushu', 'Nyiakeng_Puachue_Hmong', 'Ogham', 'Ol_Chiki', 'Old_Hungarian', 'Old_Italic', 'Old_North_Arabian', 'Old_Permic', 'Old_Persian', 'Old_Sogdian', 'Old_South_Arabian', 'Old_Turkic', 'Oriya', 'Osage', 'Osmanya', 'Pahawh_Hmong', 'Palmyrene', 'Pau_Cin_Hau', 'Phags_Pa', 'Phoenician', 'Psalter_Pahlavi', 'Rejang', 'Runic', 'Samaritan', 'Saurashtra', 'Sharada', 'Shavian', 'Siddham', 'SignWriting', 'Sinhala', 'Sogdian', 'Sora_Sompeng', 'Soyombo', 'Sundanese', 'Syloti_Nagri', 'Syriac', 'Tagalog', 'Tagbanwa', 'Tai_Le', 'Tai_Tham', 'Tai_Viet', 'Takri', 'Tamil', 'Tangut', 'Telugu', 'Thaana', 'Thai', 'Tibetan', 'Tifinagh', 'Tirhuta', 'Ugaritic', 'Vai', 'Wancho', 'Warang_Citi', 'Yezidi', 'Yi', 'Zanabazar_Square']], ['Script_Extensions', ['Adlam', 'Ahom', 'Anatolian_Hieroglyphs', 'Arabic', 'Armenian', 'Avestan', 'Balinese', 'Bamum', 'Bassa_Vah', 'Batak', 'Bengali', 'Bhaiksuki', 'Bopomofo', 'Brahmi', 'Braille', 'Buginese', 'Buhid', 'Canadian_Aboriginal', 'Carian', 'Caucasian_Albanian', 'Chakma', 'Cham', 'Cherokee', 'Chorasmian', 'Common', 'Coptic', 'Cuneiform', 'Cypriot', 'Cyrillic', 'Deseret', 'Devanagari', 'Dives_Akuru', 'Dogra', 'Duployan', 'Egyptian_Hieroglyphs', 'Elbasan', 'Elymaic', 'Ethiopic', 'Georgian', 'Glagolitic', 'Gothic', 'Grantha', 'Greek', 'Gujarati', 'Gunjala_Gondi', 'Gurmukhi', 'Han', 'Hangul', 'Hanifi_Rohingya', 'Hanunoo', 'Hatran', 'Hebrew', 'Hiragana', 'Imperial_Aramaic', 'Inherited', 'Inscriptional_Pahlavi', 'Inscriptional_Parthian', 'Javanese', 'Kaithi', 'Kannada', 'Katakana', 'Kayah_Li', 'Kharoshthi', 'Khitan_Small_Script', 'Khmer', 'Khojki', 'Khudawadi', 'Lao', 'Latin', 'Lepcha', 'Limbu', 'Linear_A', 'Linear_B', 'Lisu', 'Lycian', 'Lydian', 'Mahajani', 'Makasar', 'Malayalam', 'Mandaic', 'Manichaean', 'Marchen', 'Masaram_Gondi', 'Medefaidrin', 'Meetei_Mayek', 'Mende_Kikakui', 'Meroitic_Cursive', 'Meroitic_Hieroglyphs', 'Miao', 'Modi', 'Mongolian', 'Mro', 'Multani', 'Myanmar', 'Nabataean', 'Nandinagari', 'New_Tai_Lue', 'Newa', 'Nko', 'Nushu', 'Nyiakeng_Puachue_Hmong', 'Ogham', 'Ol_Chiki', 'Old_Hungarian', 'Old_Italic', 'Old_North_Arabian', 'Old_Permic', 'Old_Persian', 'Old_Sogdian', 'Old_South_Arabian', 'Old_Turkic', 'Oriya', 'Osage', 'Osmanya', 'Pahawh_Hmong', 'Palmyrene', 'Pau_Cin_Hau', 'Phags_Pa', 'Phoenician', 'Psalter_Pahlavi', 'Rejang', 'Runic', 'Samaritan', 'Saurashtra', 'Sharada', 'Shavian', 'Siddham', 'SignWriting', 'Sinhala', 'Sogdian', 'Sora_Sompeng', 'Soyombo', 'Sundanese', 'Syloti_Nagri', 'Syriac', 'Tagalog', 'Tagbanwa', 'Tai_Le', 'Tai_Tham', 'Tai_Viet', 'Takri', 'Tamil', 'Tangut', 'Telugu', 'Thaana', 'Thai', 'Tibetan', 'Tifinagh', 'Tirhuta', 'Ugaritic', 'Vai', 'Wancho', 'Warang_Citi', 'Yezidi', 'Yi', 'Zanabazar_Square']], ['Binary_Property', ['ASCII', 'ASCII_Hex_Digit', 'Alphabetic', 'Any', 'Assigned', 'Bidi_Control', 'Bidi_Mirrored', 'Case_Ignorable', 'Cased', 'Changes_When_Casefolded', 'Changes_When_Casemapped', 'Changes_When_Lowercased', 'Changes_When_NFKC_Casefolded', 'Changes_When_Titlecased', 'Changes_When_Uppercased', 'Dash', 'Default_Ignorable_Code_Point', 'Deprecated', 'Diacritic', 'Emoji', 'Emoji_Component', 'Emoji_Modifier', 'Emoji_Modifier_Base', 'Emoji_Presentation', 'Extended_Pictographic', 'Extender', 'Grapheme_Base', 'Grapheme_Extend', 'Hex_Digit', 'IDS_Binary_Operator', 'IDS_Trinary_Operator', 'ID_Continue', 'ID_Start', 'Ideographic', 'Join_Control', 'Logical_Order_Exception', 'Lowercase', 'Math', 'Noncharacter_Code_Point', 'Pattern_Syntax', 'Pattern_White_Space', 'Quotation_Mark', 'Radical', 'Regional_Indicator', 'Sentence_Terminal', 'Soft_Dotted', 'Terminal_Punctuation', 'Unified_Ideograph', 'Uppercase', 'Variation_Selector', 'White_Space', 'XID_Continue', 'XID_Start']]]);

/***/ }),
/* 992 */
/***/ (function(module, exports) {

module.exports = '13.0.0';

/***/ }),
/* 993 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* unused harmony export Bundle */
/* unused harmony export SourceMap */
/* harmony import */ var core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(994);
/* harmony import */ var core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sourcemap_codec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(995);




var BitSet = function BitSet(arg) {
  this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
};

BitSet.prototype.add = function add(n) {
  this.bits[n >> 5] |= 1 << (n & 31);
};

BitSet.prototype.has = function has(n) {
  return !!(this.bits[n >> 5] & 1 << (n & 31));
};

var Chunk = function Chunk(start, end, content) {
  this.start = start;
  this.end = end;
  this.original = content;
  this.intro = '';
  this.outro = '';
  this.content = content;
  this.storeName = false;
  this.edited = false; // we make these non-enumerable, for sanity while debugging

  Object.defineProperties(this, {
    previous: {
      writable: true,
      value: null
    },
    next: {
      writable: true,
      value: null
    }
  });
};

Chunk.prototype.appendLeft = function appendLeft(content) {
  this.outro += content;
};

Chunk.prototype.appendRight = function appendRight(content) {
  this.intro = this.intro + content;
};

Chunk.prototype.clone = function clone() {
  var chunk = new Chunk(this.start, this.end, this.original);
  chunk.intro = this.intro;
  chunk.outro = this.outro;
  chunk.content = this.content;
  chunk.storeName = this.storeName;
  chunk.edited = this.edited;
  return chunk;
};

Chunk.prototype.contains = function contains(index) {
  return this.start < index && index < this.end;
};

Chunk.prototype.eachNext = function eachNext(fn) {
  var chunk = this;

  while (chunk) {
    fn(chunk);
    chunk = chunk.next;
  }
};

Chunk.prototype.eachPrevious = function eachPrevious(fn) {
  var chunk = this;

  while (chunk) {
    fn(chunk);
    chunk = chunk.previous;
  }
};

Chunk.prototype.edit = function edit(content, storeName, contentOnly) {
  this.content = content;

  if (!contentOnly) {
    this.intro = '';
    this.outro = '';
  }

  this.storeName = storeName;
  this.edited = true;
  return this;
};

Chunk.prototype.prependLeft = function prependLeft(content) {
  this.outro = content + this.outro;
};

Chunk.prototype.prependRight = function prependRight(content) {
  this.intro = content + this.intro;
};

Chunk.prototype.split = function split(index) {
  var sliceIndex = index - this.start;
  var originalBefore = this.original.slice(0, sliceIndex);
  var originalAfter = this.original.slice(sliceIndex);
  this.original = originalBefore;
  var newChunk = new Chunk(index, this.end, originalAfter);
  newChunk.outro = this.outro;
  this.outro = '';
  this.end = index;

  if (this.edited) {
    // TODO is this block necessary?...
    newChunk.edit('', false);
    this.content = '';
  } else {
    this.content = originalBefore;
  }

  newChunk.next = this.next;

  if (newChunk.next) {
    newChunk.next.previous = newChunk;
  }

  newChunk.previous = this;
  this.next = newChunk;
  return newChunk;
};

Chunk.prototype.toString = function toString() {
  return this.intro + this.content + this.outro;
};

Chunk.prototype.trimEnd = function trimEnd(rx) {
  this.outro = this.outro.replace(rx, '');

  if (this.outro.length) {
    return true;
  }

  var trimmed = this.content.replace(rx, '');

  if (trimmed.length) {
    if (trimmed !== this.content) {
      this.split(this.start + trimmed.length).edit('', undefined, true);
    }

    return true;
  } else {
    this.edit('', undefined, true);
    this.intro = this.intro.replace(rx, '');

    if (this.intro.length) {
      return true;
    }
  }
};

Chunk.prototype.trimStart = function trimStart(rx) {
  this.intro = this.intro.replace(rx, '');

  if (this.intro.length) {
    return true;
  }

  var trimmed = this.content.replace(rx, '');

  if (trimmed.length) {
    if (trimmed !== this.content) {
      this.split(this.end - trimmed.length);
      this.edit('', undefined, true);
    }

    return true;
  } else {
    this.edit('', undefined, true);
    this.outro = this.outro.replace(rx, '');

    if (this.outro.length) {
      return true;
    }
  }
};

var btoa = function btoa() {
  throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
};

if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
  btoa = function btoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  };
} else if (typeof Buffer === 'function') {
  btoa = function btoa(str) {
    return Buffer.from(str, 'utf-8').toString('base64');
  };
}

var SourceMap = function SourceMap(properties) {
  this.version = 3;
  this.file = properties.file;
  this.sources = properties.sources;
  this.sourcesContent = properties.sourcesContent;
  this.names = properties.names;
  this.mappings = Object(sourcemap_codec__WEBPACK_IMPORTED_MODULE_2__[/* encode */ "a"])(properties.mappings);
};

SourceMap.prototype.toString = function toString() {
  return JSON.stringify(this);
};

SourceMap.prototype.toUrl = function toUrl() {
  return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
};

function guessIndent(code) {
  var lines = code.split('\n');
  var tabbed = lines.filter(function (line) {
    return /^\t+/.test(line);
  });
  var spaced = lines.filter(function (line) {
    return /^ {2,}/.test(line);
  });

  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  } // More lines tabbed than spaced? Assume tabs, and
  // default to tabs in the case of a tie (or nothing
  // to go on)


  if (tabbed.length >= spaced.length) {
    return '\t';
  } // Otherwise, we need to guess the multiple


  var min = spaced.reduce(function (previous, current) {
    var numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(' ');
}

function getRelativePath(from, to) {
  var fromParts = from.split(/[/\\]/);
  var toParts = to.split(/[/\\]/);
  fromParts.pop(); // get dirname

  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }

  if (fromParts.length) {
    var i = fromParts.length;

    while (i--) {
      fromParts[i] = '..';
    }
  }

  return fromParts.concat(toParts).join('/');
}

var toString = Object.prototype.toString;

function isObject(thing) {
  return toString.call(thing) === '[object Object]';
}

function getLocator(source) {
  var originalLines = source.split('\n');
  var lineOffsets = [];

  for (var i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }

  return function locate(index) {
    var i = 0;
    var j = lineOffsets.length;

    while (i < j) {
      var m = i + j >> 1;

      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }

    var line = i - 1;
    var column = index - lineOffsets[line];
    return {
      line: line,
      column: column
    };
  };
}

var Mappings = function Mappings(hires) {
  this.hires = hires;
  this.generatedCodeLine = 0;
  this.generatedCodeColumn = 0;
  this.raw = [];
  this.rawSegments = this.raw[this.generatedCodeLine] = [];
  this.pending = null;
};

Mappings.prototype.addEdit = function addEdit(sourceIndex, content, loc, nameIndex) {
  if (content.length) {
    var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];

    if (nameIndex >= 0) {
      segment.push(nameIndex);
    }

    this.rawSegments.push(segment);
  } else if (this.pending) {
    this.rawSegments.push(this.pending);
  }

  this.advance(content);
  this.pending = null;
};

Mappings.prototype.addUneditedChunk = function addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
  var originalCharIndex = chunk.start;
  var first = true;

  while (originalCharIndex < chunk.end) {
    if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
      this.rawSegments.push([this.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
    }

    if (original[originalCharIndex] === '\n') {
      loc.line += 1;
      loc.column = 0;
      this.generatedCodeLine += 1;
      this.raw[this.generatedCodeLine] = this.rawSegments = [];
      this.generatedCodeColumn = 0;
      first = true;
    } else {
      loc.column += 1;
      this.generatedCodeColumn += 1;
      first = false;
    }

    originalCharIndex += 1;
  }

  this.pending = null;
};

Mappings.prototype.advance = function advance(str) {
  if (!str) {
    return;
  }

  var lines = str.split('\n');

  if (lines.length > 1) {
    for (var i = 0; i < lines.length - 1; i++) {
      this.generatedCodeLine++;
      this.raw[this.generatedCodeLine] = this.rawSegments = [];
    }

    this.generatedCodeColumn = 0;
  }

  this.generatedCodeColumn += lines[lines.length - 1].length;
};

var n = '\n';
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};

var MagicString = function MagicString(string, options) {
  if (options === void 0) options = {};
  var chunk = new Chunk(0, string.length, string);
  Object.defineProperties(this, {
    original: {
      writable: true,
      value: string
    },
    outro: {
      writable: true,
      value: ''
    },
    intro: {
      writable: true,
      value: ''
    },
    firstChunk: {
      writable: true,
      value: chunk
    },
    lastChunk: {
      writable: true,
      value: chunk
    },
    lastSearchedChunk: {
      writable: true,
      value: chunk
    },
    byStart: {
      writable: true,
      value: {}
    },
    byEnd: {
      writable: true,
      value: {}
    },
    filename: {
      writable: true,
      value: options.filename
    },
    indentExclusionRanges: {
      writable: true,
      value: options.indentExclusionRanges
    },
    sourcemapLocations: {
      writable: true,
      value: new BitSet()
    },
    storedNames: {
      writable: true,
      value: {}
    },
    indentStr: {
      writable: true,
      value: guessIndent(string)
    }
  });
  this.byStart[0] = chunk;
  this.byEnd[string.length] = chunk;
};

MagicString.prototype.addSourcemapLocation = function addSourcemapLocation(char) {
  this.sourcemapLocations.add(char);
};

MagicString.prototype.append = function append(content) {
  if (typeof content !== 'string') {
    throw new TypeError('outro content must be a string');
  }

  this.outro += content;
  return this;
};

MagicString.prototype.appendLeft = function appendLeft(index, content) {
  if (typeof content !== 'string') {
    throw new TypeError('inserted content must be a string');
  }

  this._split(index);

  var chunk = this.byEnd[index];

  if (chunk) {
    chunk.appendLeft(content);
  } else {
    this.intro += content;
  }

  return this;
};

MagicString.prototype.appendRight = function appendRight(index, content) {
  if (typeof content !== 'string') {
    throw new TypeError('inserted content must be a string');
  }

  this._split(index);

  var chunk = this.byStart[index];

  if (chunk) {
    chunk.appendRight(content);
  } else {
    this.outro += content;
  }

  return this;
};

MagicString.prototype.clone = function clone() {
  var cloned = new MagicString(this.original, {
    filename: this.filename
  });
  var originalChunk = this.firstChunk;
  var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();

  while (originalChunk) {
    cloned.byStart[clonedChunk.start] = clonedChunk;
    cloned.byEnd[clonedChunk.end] = clonedChunk;
    var nextOriginalChunk = originalChunk.next;
    var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

    if (nextClonedChunk) {
      clonedChunk.next = nextClonedChunk;
      nextClonedChunk.previous = clonedChunk;
      clonedChunk = nextClonedChunk;
    }

    originalChunk = nextOriginalChunk;
  }

  cloned.lastChunk = clonedChunk;

  if (this.indentExclusionRanges) {
    cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
  }

  cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
  cloned.intro = this.intro;
  cloned.outro = this.outro;
  return cloned;
};

MagicString.prototype.generateDecodedMap = function generateDecodedMap(options) {
  var this$1 = this;
  options = options || {};
  var sourceIndex = 0;
  var names = Object.keys(this.storedNames);
  var mappings = new Mappings(options.hires);
  var locate = getLocator(this.original);

  if (this.intro) {
    mappings.advance(this.intro);
  }

  this.firstChunk.eachNext(function (chunk) {
    var loc = locate(chunk.start);

    if (chunk.intro.length) {
      mappings.advance(chunk.intro);
    }

    if (chunk.edited) {
      mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
    } else {
      mappings.addUneditedChunk(sourceIndex, chunk, this$1.original, loc, this$1.sourcemapLocations);
    }

    if (chunk.outro.length) {
      mappings.advance(chunk.outro);
    }
  });
  return {
    file: options.file ? options.file.split(/[/\\]/).pop() : null,
    sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
    sourcesContent: options.includeContent ? [this.original] : [null],
    names: names,
    mappings: mappings.raw
  };
};

MagicString.prototype.generateMap = function generateMap(options) {
  return new SourceMap(this.generateDecodedMap(options));
};

MagicString.prototype.getIndentString = function getIndentString() {
  return this.indentStr === null ? '\t' : this.indentStr;
};

MagicString.prototype.indent = function indent(indentStr, options) {
  var pattern = /^[^\r\n]/gm;

  if (isObject(indentStr)) {
    options = indentStr;
    indentStr = undefined;
  }

  indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

  if (indentStr === '') {
    return this;
  } // noop


  options = options || {}; // Process exclusion ranges

  var isExcluded = {};

  if (options.exclude) {
    var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
    exclusions.forEach(function (exclusion) {
      for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
        isExcluded[i] = true;
      }
    });
  }

  var shouldIndentNextCharacter = options.indentStart !== false;

  var replacer = function replacer(match) {
    if (shouldIndentNextCharacter) {
      return "" + indentStr + match;
    }

    shouldIndentNextCharacter = true;
    return match;
  };

  this.intro = this.intro.replace(pattern, replacer);
  var charIndex = 0;
  var chunk = this.firstChunk;

  while (chunk) {
    var end = chunk.end;

    if (chunk.edited) {
      if (!isExcluded[charIndex]) {
        chunk.content = chunk.content.replace(pattern, replacer);

        if (chunk.content.length) {
          shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
        }
      }
    } else {
      charIndex = chunk.start;

      while (charIndex < end) {
        if (!isExcluded[charIndex]) {
          var char = this.original[charIndex];

          if (char === '\n') {
            shouldIndentNextCharacter = true;
          } else if (char !== '\r' && shouldIndentNextCharacter) {
            shouldIndentNextCharacter = false;

            if (charIndex === chunk.start) {
              chunk.prependRight(indentStr);
            } else {
              this._splitChunk(chunk, charIndex);

              chunk = chunk.next;
              chunk.prependRight(indentStr);
            }
          }
        }

        charIndex += 1;
      }
    }

    charIndex = chunk.end;
    chunk = chunk.next;
  }

  this.outro = this.outro.replace(pattern, replacer);
  return this;
};

MagicString.prototype.insert = function insert() {
  throw new Error('magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)');
};

MagicString.prototype.insertLeft = function insertLeft(index, content) {
  if (!warned.insertLeft) {
    console.warn('magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'); // eslint-disable-line no-console

    warned.insertLeft = true;
  }

  return this.appendLeft(index, content);
};

MagicString.prototype.insertRight = function insertRight(index, content) {
  if (!warned.insertRight) {
    console.warn('magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'); // eslint-disable-line no-console

    warned.insertRight = true;
  }

  return this.prependRight(index, content);
};

MagicString.prototype.move = function move(start, end, index) {
  if (index >= start && index <= end) {
    throw new Error('Cannot move a selection inside itself');
  }

  this._split(start);

  this._split(end);

  this._split(index);

  var first = this.byStart[start];
  var last = this.byEnd[end];
  var oldLeft = first.previous;
  var oldRight = last.next;
  var newRight = this.byStart[index];

  if (!newRight && last === this.lastChunk) {
    return this;
  }

  var newLeft = newRight ? newRight.previous : this.lastChunk;

  if (oldLeft) {
    oldLeft.next = oldRight;
  }

  if (oldRight) {
    oldRight.previous = oldLeft;
  }

  if (newLeft) {
    newLeft.next = first;
  }

  if (newRight) {
    newRight.previous = last;
  }

  if (!first.previous) {
    this.firstChunk = last.next;
  }

  if (!last.next) {
    this.lastChunk = first.previous;
    this.lastChunk.next = null;
  }

  first.previous = newLeft;
  last.next = newRight || null;

  if (!newLeft) {
    this.firstChunk = first;
  }

  if (!newRight) {
    this.lastChunk = last;
  }

  return this;
};

MagicString.prototype.overwrite = function overwrite(start, end, content, options) {
  if (typeof content !== 'string') {
    throw new TypeError('replacement content must be a string');
  }

  while (start < 0) {
    start += this.original.length;
  }

  while (end < 0) {
    end += this.original.length;
  }

  if (end > this.original.length) {
    throw new Error('end is out of bounds');
  }

  if (start === end) {
    throw new Error('Cannot overwrite a zero-length range – use appendLeft or prependRight instead');
  }

  this._split(start);

  this._split(end);

  if (options === true) {
    if (!warned.storeName) {
      console.warn('The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'); // eslint-disable-line no-console

      warned.storeName = true;
    }

    options = {
      storeName: true
    };
  }

  var storeName = options !== undefined ? options.storeName : false;
  var contentOnly = options !== undefined ? options.contentOnly : false;

  if (storeName) {
    var original = this.original.slice(start, end);
    this.storedNames[original] = true;
  }

  var first = this.byStart[start];
  var last = this.byEnd[end];

  if (first) {
    if (end > first.end && first.next !== this.byStart[first.end]) {
      throw new Error('Cannot overwrite across a split point');
    }

    first.edit(content, storeName, contentOnly);

    if (first !== last) {
      var chunk = first.next;

      while (chunk !== last) {
        chunk.edit('', false);
        chunk = chunk.next;
      }

      chunk.edit('', false);
    }
  } else {
    // must be inserting at the end
    var newChunk = new Chunk(start, end, '').edit(content, storeName); // TODO last chunk in the array may not be the last chunk, if it's moved...

    last.next = newChunk;
    newChunk.previous = last;
  }

  return this;
};

MagicString.prototype.prepend = function prepend(content) {
  if (typeof content !== 'string') {
    throw new TypeError('outro content must be a string');
  }

  this.intro = content + this.intro;
  return this;
};

MagicString.prototype.prependLeft = function prependLeft(index, content) {
  if (typeof content !== 'string') {
    throw new TypeError('inserted content must be a string');
  }

  this._split(index);

  var chunk = this.byEnd[index];

  if (chunk) {
    chunk.prependLeft(content);
  } else {
    this.intro = content + this.intro;
  }

  return this;
};

MagicString.prototype.prependRight = function prependRight(index, content) {
  if (typeof content !== 'string') {
    throw new TypeError('inserted content must be a string');
  }

  this._split(index);

  var chunk = this.byStart[index];

  if (chunk) {
    chunk.prependRight(content);
  } else {
    this.outro = content + this.outro;
  }

  return this;
};

MagicString.prototype.remove = function remove(start, end) {
  while (start < 0) {
    start += this.original.length;
  }

  while (end < 0) {
    end += this.original.length;
  }

  if (start === end) {
    return this;
  }

  if (start < 0 || end > this.original.length) {
    throw new Error('Character is out of bounds');
  }

  if (start > end) {
    throw new Error('end must be greater than start');
  }

  this._split(start);

  this._split(end);

  var chunk = this.byStart[start];

  while (chunk) {
    chunk.intro = '';
    chunk.outro = '';
    chunk.edit('');
    chunk = end > chunk.end ? this.byStart[chunk.end] : null;
  }

  return this;
};

MagicString.prototype.lastChar = function lastChar() {
  if (this.outro.length) {
    return this.outro[this.outro.length - 1];
  }

  var chunk = this.lastChunk;

  do {
    if (chunk.outro.length) {
      return chunk.outro[chunk.outro.length - 1];
    }

    if (chunk.content.length) {
      return chunk.content[chunk.content.length - 1];
    }

    if (chunk.intro.length) {
      return chunk.intro[chunk.intro.length - 1];
    }
  } while (chunk = chunk.previous);

  if (this.intro.length) {
    return this.intro[this.intro.length - 1];
  }

  return '';
};

MagicString.prototype.lastLine = function lastLine() {
  var lineIndex = this.outro.lastIndexOf(n);

  if (lineIndex !== -1) {
    return this.outro.substr(lineIndex + 1);
  }

  var lineStr = this.outro;
  var chunk = this.lastChunk;

  do {
    if (chunk.outro.length > 0) {
      lineIndex = chunk.outro.lastIndexOf(n);

      if (lineIndex !== -1) {
        return chunk.outro.substr(lineIndex + 1) + lineStr;
      }

      lineStr = chunk.outro + lineStr;
    }

    if (chunk.content.length > 0) {
      lineIndex = chunk.content.lastIndexOf(n);

      if (lineIndex !== -1) {
        return chunk.content.substr(lineIndex + 1) + lineStr;
      }

      lineStr = chunk.content + lineStr;
    }

    if (chunk.intro.length > 0) {
      lineIndex = chunk.intro.lastIndexOf(n);

      if (lineIndex !== -1) {
        return chunk.intro.substr(lineIndex + 1) + lineStr;
      }

      lineStr = chunk.intro + lineStr;
    }
  } while (chunk = chunk.previous);

  lineIndex = this.intro.lastIndexOf(n);

  if (lineIndex !== -1) {
    return this.intro.substr(lineIndex + 1) + lineStr;
  }

  return this.intro + lineStr;
};

MagicString.prototype.slice = function slice(start, end) {
  if (start === void 0) start = 0;
  if (end === void 0) end = this.original.length;

  while (start < 0) {
    start += this.original.length;
  }

  while (end < 0) {
    end += this.original.length;
  }

  var result = ''; // find start chunk

  var chunk = this.firstChunk;

  while (chunk && (chunk.start > start || chunk.end <= start)) {
    // found end chunk before start
    if (chunk.start < end && chunk.end >= end) {
      return result;
    }

    chunk = chunk.next;
  }

  if (chunk && chunk.edited && chunk.start !== start) {
    throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
  }

  var startChunk = chunk;

  while (chunk) {
    if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
      result += chunk.intro;
    }

    var containsEnd = chunk.start < end && chunk.end >= end;

    if (containsEnd && chunk.edited && chunk.end !== end) {
      throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
    }

    var sliceStart = startChunk === chunk ? start - chunk.start : 0;
    var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
    result += chunk.content.slice(sliceStart, sliceEnd);

    if (chunk.outro && (!containsEnd || chunk.end === end)) {
      result += chunk.outro;
    }

    if (containsEnd) {
      break;
    }

    chunk = chunk.next;
  }

  return result;
}; // TODO deprecate this? not really very useful


MagicString.prototype.snip = function snip(start, end) {
  var clone = this.clone();
  clone.remove(0, start);
  clone.remove(end, clone.original.length);
  return clone;
};

MagicString.prototype._split = function _split(index) {
  if (this.byStart[index] || this.byEnd[index]) {
    return;
  }

  var chunk = this.lastSearchedChunk;
  var searchForward = index > chunk.end;

  while (chunk) {
    if (chunk.contains(index)) {
      return this._splitChunk(chunk, index);
    }

    chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
  }
};

MagicString.prototype._splitChunk = function _splitChunk(chunk, index) {
  if (chunk.edited && chunk.content.length) {
    // zero-length edited chunks are a special case (overlapping replacements)
    var loc = getLocator(this.original)(index);
    throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + " – \"" + chunk.original + "\")");
  }

  var newChunk = chunk.split(index);
  this.byEnd[index] = chunk;
  this.byStart[index] = newChunk;
  this.byEnd[newChunk.end] = newChunk;

  if (chunk === this.lastChunk) {
    this.lastChunk = newChunk;
  }

  this.lastSearchedChunk = chunk;
  return true;
};

MagicString.prototype.toString = function toString() {
  var str = this.intro;
  var chunk = this.firstChunk;

  while (chunk) {
    str += chunk.toString();
    chunk = chunk.next;
  }

  return str + this.outro;
};

MagicString.prototype.isEmpty = function isEmpty() {
  var chunk = this.firstChunk;

  do {
    if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) {
      return false;
    }
  } while (chunk = chunk.next);

  return true;
};

MagicString.prototype.length = function length() {
  var chunk = this.firstChunk;
  var length = 0;

  do {
    length += chunk.intro.length + chunk.content.length + chunk.outro.length;
  } while (chunk = chunk.next);

  return length;
};

MagicString.prototype.trimLines = function trimLines() {
  return this.trim('[\\r\\n]');
};

MagicString.prototype.trim = function trim(charType) {
  return this.trimStart(charType).trimEnd(charType);
};

MagicString.prototype.trimEndAborted = function trimEndAborted(charType) {
  var rx = new RegExp((charType || '\\s') + '+$');
  this.outro = this.outro.replace(rx, '');

  if (this.outro.length) {
    return true;
  }

  var chunk = this.lastChunk;

  do {
    var end = chunk.end;
    var aborted = chunk.trimEnd(rx); // if chunk was trimmed, we have a new lastChunk

    if (chunk.end !== end) {
      if (this.lastChunk === chunk) {
        this.lastChunk = chunk.next;
      }

      this.byEnd[chunk.end] = chunk;
      this.byStart[chunk.next.start] = chunk.next;
      this.byEnd[chunk.next.end] = chunk.next;
    }

    if (aborted) {
      return true;
    }

    chunk = chunk.previous;
  } while (chunk);

  return false;
};

MagicString.prototype.trimEnd = function trimEnd(charType) {
  this.trimEndAborted(charType);
  return this;
};

MagicString.prototype.trimStartAborted = function trimStartAborted(charType) {
  var rx = new RegExp('^' + (charType || '\\s') + '+');
  this.intro = this.intro.replace(rx, '');

  if (this.intro.length) {
    return true;
  }

  var chunk = this.firstChunk;

  do {
    var end = chunk.end;
    var aborted = chunk.trimStart(rx);

    if (chunk.end !== end) {
      // special case...
      if (chunk === this.lastChunk) {
        this.lastChunk = chunk.next;
      }

      this.byEnd[chunk.end] = chunk;
      this.byStart[chunk.next.start] = chunk.next;
      this.byEnd[chunk.next.end] = chunk.next;
    }

    if (aborted) {
      return true;
    }

    chunk = chunk.next;
  } while (chunk);

  return false;
};

MagicString.prototype.trimStart = function trimStart(charType) {
  this.trimStartAborted(charType);
  return this;
};

var hasOwnProp = Object.prototype.hasOwnProperty;

var Bundle = function Bundle(options) {
  if (options === void 0) options = {};
  this.intro = options.intro || '';
  this.separator = options.separator !== undefined ? options.separator : '\n';
  this.sources = [];
  this.uniqueSources = [];
  this.uniqueSourceIndexByFilename = {};
};

Bundle.prototype.addSource = function addSource(source) {
  if (source instanceof MagicString) {
    return this.addSource({
      content: source,
      filename: source.filename,
      separator: this.separator
    });
  }

  if (!isObject(source) || !source.content) {
    throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
  }

  ['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
    if (!hasOwnProp.call(source, option)) {
      source[option] = source.content[option];
    }
  });

  if (source.separator === undefined) {
    // TODO there's a bunch of this sort of thing, needs cleaning up
    source.separator = this.separator;
  }

  if (source.filename) {
    if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
      this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
      this.uniqueSources.push({
        filename: source.filename,
        content: source.content.original
      });
    } else {
      var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];

      if (source.content.original !== uniqueSource.content) {
        throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
      }
    }
  }

  this.sources.push(source);
  return this;
};

Bundle.prototype.append = function append(str, options) {
  this.addSource({
    content: new MagicString(str),
    separator: options && options.separator || ''
  });
  return this;
};

Bundle.prototype.clone = function clone() {
  var bundle = new Bundle({
    intro: this.intro,
    separator: this.separator
  });
  this.sources.forEach(function (source) {
    bundle.addSource({
      filename: source.filename,
      content: source.content.clone(),
      separator: source.separator
    });
  });
  return bundle;
};

Bundle.prototype.generateDecodedMap = function generateDecodedMap(options) {
  var this$1 = this;
  if (options === void 0) options = {};
  var names = [];
  this.sources.forEach(function (source) {
    Object.keys(source.content.storedNames).forEach(function (name) {
      if (!~names.indexOf(name)) {
        names.push(name);
      }
    });
  });
  var mappings = new Mappings(options.hires);

  if (this.intro) {
    mappings.advance(this.intro);
  }

  this.sources.forEach(function (source, i) {
    if (i > 0) {
      mappings.advance(this$1.separator);
    }

    var sourceIndex = source.filename ? this$1.uniqueSourceIndexByFilename[source.filename] : -1;
    var magicString = source.content;
    var locate = getLocator(magicString.original);

    if (magicString.intro) {
      mappings.advance(magicString.intro);
    }

    magicString.firstChunk.eachNext(function (chunk) {
      var loc = locate(chunk.start);

      if (chunk.intro.length) {
        mappings.advance(chunk.intro);
      }

      if (source.filename) {
        if (chunk.edited) {
          mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
        } else {
          mappings.addUneditedChunk(sourceIndex, chunk, magicString.original, loc, magicString.sourcemapLocations);
        }
      } else {
        mappings.advance(chunk.content);
      }

      if (chunk.outro.length) {
        mappings.advance(chunk.outro);
      }
    });

    if (magicString.outro) {
      mappings.advance(magicString.outro);
    }
  });
  return {
    file: options.file ? options.file.split(/[/\\]/).pop() : null,
    sources: this.uniqueSources.map(function (source) {
      return options.file ? getRelativePath(options.file, source.filename) : source.filename;
    }),
    sourcesContent: this.uniqueSources.map(function (source) {
      return options.includeContent ? source.content : null;
    }),
    names: names,
    mappings: mappings.raw
  };
};

Bundle.prototype.generateMap = function generateMap(options) {
  return new SourceMap(this.generateDecodedMap(options));
};

Bundle.prototype.getIndentString = function getIndentString() {
  var indentStringCounts = {};
  this.sources.forEach(function (source) {
    var indentStr = source.content.indentStr;

    if (indentStr === null) {
      return;
    }

    if (!indentStringCounts[indentStr]) {
      indentStringCounts[indentStr] = 0;
    }

    indentStringCounts[indentStr] += 1;
  });
  return Object.keys(indentStringCounts).sort(function (a, b) {
    return indentStringCounts[a] - indentStringCounts[b];
  })[0] || '\t';
};

Bundle.prototype.indent = function indent(indentStr) {
  var this$1 = this;

  if (!arguments.length) {
    indentStr = this.getIndentString();
  }

  if (indentStr === '') {
    return this;
  } // noop


  var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';
  this.sources.forEach(function (source, i) {
    var separator = source.separator !== undefined ? source.separator : this$1.separator;
    var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
    source.content.indent(indentStr, {
      exclude: source.indentExclusionRanges,
      indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )

    });
    trailingNewline = source.content.lastChar() === '\n';
  });

  if (this.intro) {
    this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function (match, index) {
      return index > 0 ? indentStr + match : match;
    });
  }

  return this;
};

Bundle.prototype.prepend = function prepend(str) {
  this.intro = str + this.intro;
  return this;
};

Bundle.prototype.toString = function toString() {
  var this$1 = this;
  var body = this.sources.map(function (source, i) {
    var separator = source.separator !== undefined ? source.separator : this$1.separator;
    var str = (i > 0 ? separator : '') + source.content.toString();
    return str;
  }).join('');
  return this.intro + body;
};

Bundle.prototype.isEmpty = function isEmpty() {
  if (this.intro.length && this.intro.trim()) {
    return false;
  }

  if (this.sources.some(function (source) {
    return !source.content.isEmpty();
  })) {
    return false;
  }

  return true;
};

Bundle.prototype.length = function length() {
  return this.sources.reduce(function (length, source) {
    return length + source.content.length();
  }, this.intro.length);
};

Bundle.prototype.trimLines = function trimLines() {
  return this.trim('[\\r\\n]');
};

Bundle.prototype.trim = function trim(charType) {
  return this.trimStart(charType).trimEnd(charType);
};

Bundle.prototype.trimStart = function trimStart(charType) {
  var rx = new RegExp('^' + (charType || '\\s') + '+');
  this.intro = this.intro.replace(rx, '');

  if (!this.intro) {
    var source;
    var i = 0;

    do {
      source = this.sources[i++];

      if (!source) {
        break;
      }
    } while (!source.content.trimStartAborted(charType));
  }

  return this;
};

Bundle.prototype.trimEnd = function trimEnd(charType) {
  var rx = new RegExp((charType || '\\s') + '+$');
  var source;
  var i = this.sources.length - 1;

  do {
    source = this.sources[i--];

    if (!source) {
      this.intro = this.intro.replace(rx, '');
      break;
    }
  } while (!source.content.trimEndAborted(charType));

  return this;
};

/* harmony default export */ __webpack_exports__["a"] = (MagicString);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24).Buffer))

/***/ }),
/* 994 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(231);
var $trimStart = __webpack_require__(331).start;
var forcedStringTrimMethod = __webpack_require__(333);

var FORCED = forcedStringTrimMethod('trimStart');

var trimStart = FORCED ? function trimStart() {
  return $trimStart(this);
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});


/***/ }),
/* 995 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export decode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return encode; });
var charToInteger = {};
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

for (var i = 0; i < chars.length; i++) {
  charToInteger[chars.charCodeAt(i)] = i;
}

function decode(mappings) {
  var decoded = [];
  var line = [];
  var segment = [0, 0, 0, 0, 0];
  var j = 0;

  for (var i = 0, shift = 0, value = 0; i < mappings.length; i++) {
    var c = mappings.charCodeAt(i);

    if (c === 44) {
      // ","
      segmentify(line, segment, j);
      j = 0;
    } else if (c === 59) {
      // ";"
      segmentify(line, segment, j);
      j = 0;
      decoded.push(line);
      line = [];
      segment[0] = 0;
    } else {
      var integer = charToInteger[c];

      if (integer === undefined) {
        throw new Error('Invalid character (' + String.fromCharCode(c) + ')');
      }

      var hasContinuationBit = integer & 32;
      integer &= 31;
      value += integer << shift;

      if (hasContinuationBit) {
        shift += 5;
      } else {
        var shouldNegate = value & 1;
        value >>>= 1;

        if (shouldNegate) {
          value = value === 0 ? -0x80000000 : -value;
        }

        segment[j] += value;
        j++;
        value = shift = 0; // reset
      }
    }
  }

  segmentify(line, segment, j);
  decoded.push(line);
  return decoded;
}

function segmentify(line, segment, j) {
  // This looks ugly, but we're creating specialized arrays with a specific
  // length. This is much faster than creating a new array (which v8 expands to
  // a capacity of 17 after pushing the first item), or slicing out a subarray
  // (which is slow). Length 4 is assumed to be the most frequent, followed by
  // length 5 (since not everything will have an associated name), followed by
  // length 1 (it's probably rare for a source substring to not have an
  // associated segment data).
  if (j === 4) line.push([segment[0], segment[1], segment[2], segment[3]]);else if (j === 5) line.push([segment[0], segment[1], segment[2], segment[3], segment[4]]);else if (j === 1) line.push([segment[0]]);
}

function encode(decoded) {
  var sourceFileIndex = 0; // second field

  var sourceCodeLine = 0; // third field

  var sourceCodeColumn = 0; // fourth field

  var nameIndex = 0; // fifth field

  var mappings = '';

  for (var i = 0; i < decoded.length; i++) {
    var line = decoded[i];
    if (i > 0) mappings += ';';
    if (line.length === 0) continue;
    var generatedCodeColumn = 0; // first field

    var lineMappings = [];

    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
      var segment = line_1[_i];
      var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
      generatedCodeColumn = segment[0];

      if (segment.length > 1) {
        segmentMappings += encodeInteger(segment[1] - sourceFileIndex) + encodeInteger(segment[2] - sourceCodeLine) + encodeInteger(segment[3] - sourceCodeColumn);
        sourceFileIndex = segment[1];
        sourceCodeLine = segment[2];
        sourceCodeColumn = segment[3];
      }

      if (segment.length === 5) {
        segmentMappings += encodeInteger(segment[4] - nameIndex);
        nameIndex = segment[4];
      }

      lineMappings.push(segmentMappings);
    }

    mappings += lineMappings.join(',');
  }

  return mappings;
}

function encodeInteger(num) {
  var result = '';
  num = num < 0 ? -num << 1 | 1 : num << 1;

  do {
    var clamped = num & 31;
    num >>>= 5;

    if (num > 0) {
      clamped |= 32;
    }

    result += chars[clamped];
  } while (num > 0);

  return result;
}



/***/ }),
/* 996 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(997);
module.exports = __webpack_require__(170).Object.assign;


/***/ }),
/* 997 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(998);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(1010) });


/***/ }),
/* 998 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(169);
var core = __webpack_require__(170);
var hide = __webpack_require__(334);
var redefine = __webpack_require__(1005);
var ctx = __webpack_require__(1008);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 999 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1000);
var IE8_DOM_DEFINE = __webpack_require__(1001);
var toPrimitive = __webpack_require__(1003);
var dP = Object.defineProperty;

exports.f = __webpack_require__(171) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 1000 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(234);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 1001 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(171) && !__webpack_require__(235)(function () {
  return Object.defineProperty(__webpack_require__(1002)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 1002 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(234);
var document = __webpack_require__(169).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 1003 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(234);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 1004 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 1005 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(169);
var hide = __webpack_require__(334);
var has = __webpack_require__(335);
var SRC = __webpack_require__(336)('src');
var $toString = __webpack_require__(1006);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(170).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 1006 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(337)('native-function-to-string', Function.toString);


/***/ }),
/* 1007 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 1008 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(1009);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 1009 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 1010 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(171);
var getKeys = __webpack_require__(1011);
var gOPS = __webpack_require__(1019);
var pIE = __webpack_require__(1020);
var toObject = __webpack_require__(1021);
var IObject = __webpack_require__(339);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(235)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 1011 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(1012);
var enumBugKeys = __webpack_require__(1018);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 1012 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(335);
var toIObject = __webpack_require__(338);
var arrayIndexOf = __webpack_require__(1014)(false);
var IE_PROTO = __webpack_require__(1017)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 1013 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 1014 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(338);
var toLength = __webpack_require__(1015);
var toAbsoluteIndex = __webpack_require__(1016);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 1015 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(341);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 1016 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(341);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 1017 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(337)('keys');
var uid = __webpack_require__(336);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 1018 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 1019 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 1020 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 1021 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(340);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 1022 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(114);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(8));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(1023));

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), 'Menu');

exports.default = _default;

/***/ }),
/* 1023 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(114);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = _interopRequireDefault(__webpack_require__(209));

var _react = _interopRequireDefault(__webpack_require__(8));

var _SvgIcon = _interopRequireDefault(__webpack_require__(1108));

function createSvgIcon(path, displayName) {
  var Component = _react.default.memo(_react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
      ref: ref
    }, props), path);
  }));

  if (false) {}

  Component.muiName = _SvgIcon.default.muiName;
  return Component;
}

/***/ }),
/* 1024 */,
/* 1025 */,
/* 1026 */,
/* 1027 */,
/* 1028 */,
/* 1029 */,
/* 1030 */,
/* 1031 */,
/* 1032 */,
/* 1033 */,
/* 1034 */,
/* 1035 */,
/* 1036 */,
/* 1037 */,
/* 1038 */,
/* 1039 */,
/* 1040 */,
/* 1041 */,
/* 1042 */,
/* 1043 */,
/* 1044 */,
/* 1045 */,
/* 1046 */,
/* 1047 */,
/* 1048 */,
/* 1049 */,
/* 1050 */,
/* 1051 */,
/* 1052 */,
/* 1053 */,
/* 1054 */,
/* 1055 */,
/* 1056 */,
/* 1057 */,
/* 1058 */,
/* 1059 */,
/* 1060 */,
/* 1061 */,
/* 1062 */,
/* 1063 */,
/* 1064 */,
/* 1065 */,
/* 1066 */,
/* 1067 */,
/* 1068 */,
/* 1069 */,
/* 1070 */,
/* 1071 */,
/* 1072 */,
/* 1073 */,
/* 1074 */,
/* 1075 */,
/* 1076 */,
/* 1077 */,
/* 1078 */,
/* 1079 */,
/* 1080 */,
/* 1081 */,
/* 1082 */,
/* 1083 */,
/* 1084 */,
/* 1085 */,
/* 1086 */,
/* 1087 */,
/* 1088 */,
/* 1089 */,
/* 1090 */,
/* 1091 */,
/* 1092 */,
/* 1093 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "pageQuery", function() { return /* binding */ pageQuery; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(8);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(81);

// EXTERNAL MODULE: ./src/components/bio.tsx
var bio = __webpack_require__(281);

// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(96);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(83);

// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__(216);

// EXTERNAL MODULE: ./node_modules/gatsby-plugin-mdx/index.js
var gatsby_plugin_mdx = __webpack_require__(569);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(48);

// CONCATENATED MODULE: ./node_modules/prism-react-renderer/prism/index.js
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

/**
 * prism-react-renderer:
 * This file has been modified to remove:
 * - globals and window dependency
 * - worker support
 * - highlightAll and other element dependent methods
 * - _.hooks helpers
 * - UMD/node-specific hacks
 * It has also been run through prettier
 */
var Prism = function () {
  var uniqueId = 0;
  var _ = {
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
        } else if (_.util.type(tokens) === "Array") {
          return tokens.map(_.util.encode);
        } else {
          return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        }
      },
      type: function type(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },
      objId: function objId(obj) {
        if (!obj["__id"]) {
          Object.defineProperty(obj, "__id", {
            value: ++uniqueId
          });
        }

        return obj["__id"];
      },
      // Deep clone a language definition (e.g. to extend it)
      clone: function clone(o, visited) {
        var type = _.util.type(o);

        visited = visited || {};

        switch (type) {
          case "Object":
            if (visited[_.util.objId(o)]) {
              return visited[_.util.objId(o)];
            }

            var clone = {};
            visited[_.util.objId(o)] = clone;

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key], visited);
              }
            }

            return clone;

          case "Array":
            if (visited[_.util.objId(o)]) {
              return visited[_.util.objId(o)];
            }

            var clone = [];
            visited[_.util.objId(o)] = clone;
            o.forEach(function (v, i) {
              clone[i] = _.util.clone(v, visited);
            });
            return clone;
        }

        return o;
      }
    },
    languages: {
      extend: function extend(id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore: function insertBefore(inside, before, insert, root) {
        root = root || _.languages;
        var grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        var ret = {};

        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        } // Update references in other language definitions


        _.languages.DFS(_.languages, function (key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return root[inside] = ret;
      },
      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type, visited) {
        visited = visited || {};

        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === "Object" && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;

              _.languages.DFS(o[i], callback, null, visited);
            } else if (_.util.type(o[i]) === "Array" && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;

              _.languages.DFS(o[i], callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},
    highlight: function highlight(text, grammar, language) {
      var env = {
        code: text,
        grammar: grammar,
        language: language
      };
      env.tokens = _.tokenize(env.code, env.grammar);
      return Token.stringify(_.util.encode(env.tokens), env.language);
    },
    matchGrammar: function matchGrammar(text, strarr, grammar, index, startPos, oneshot, target) {
      var Token = _.Token;

      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        if (token == target) {
          return;
        }

        var patterns = grammar[token];
        patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
              inside = pattern.inside,
              lookbehind = !!pattern.lookbehind,
              greedy = !!pattern.greedy,
              lookbehindLength = 0,
              alias = pattern.alias;

          if (greedy && !pattern.pattern.global) {
            // Without the global flag, lastIndex won't work
            var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
            pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
          }

          pattern = pattern.pattern || pattern; // Don’t cache length as it changes during the loop

          for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
            var str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              return;
            }

            if (str instanceof Token) {
              continue;
            }

            if (greedy && i != strarr.length - 1) {
              pattern.lastIndex = pos;
              var match = pattern.exec(text);

              if (!match) {
                break;
              }

              var from = match.index + (lookbehind ? match[1].length : 0),
                  to = match.index + match[0].length,
                  k = i,
                  p = pos;

              for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                p += strarr[k].length; // Move the index i to the element in strarr that is closest to from

                if (from >= p) {
                  ++i;
                  pos = p;
                }
              } // If strarr[i] is a Token, then the match starts inside another Token, which is invalid


              if (strarr[i] instanceof Token) {
                continue;
              } // Number of tokens to delete and replace with the new match


              delNum = k - i;
              str = text.slice(pos, p);
              match.index -= pos;
            } else {
              pattern.lastIndex = 0;
              var match = pattern.exec(str),
                  delNum = 1;
            }

            if (!match) {
              if (oneshot) {
                break;
              }

              continue;
            }

            if (lookbehind) {
              lookbehindLength = match[1] ? match[1].length : 0;
            }

            var from = match.index + lookbehindLength,
                match = match[0].slice(lookbehindLength),
                to = from + match.length,
                before = str.slice(0, from),
                after = str.slice(to);
            var args = [i, delNum];

            if (before) {
              ++i;
              pos += before.length;
              args.push(before);
            }

            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
            args.push(wrapped);

            if (after) {
              args.push(after);
            }

            Array.prototype.splice.apply(strarr, args);

            if (delNum != 1) {
              _.matchGrammar(text, strarr, grammar, i, pos, true, token);
            }

            if (oneshot) {
              break;
            }
          }
        }
      }
    },
    hooks: {
      add: function add() {}
    },
    tokenize: function tokenize(text, grammar, language) {
      var strarr = [text];
      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      _.matchGrammar(text, strarr, grammar, 0, 0, false);

      return strarr;
    }
  };

  var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
    this.type = type;
    this.content = content;
    this.alias = alias; // Copy of the full string this token was created from

    this.length = (matchedStr || "").length | 0;
    this.greedy = !!greedy;
  };

  Token.stringify = function (o, language, parent) {
    if (typeof o == "string") {
      return o;
    }

    if (_.util.type(o) === "Array") {
      return o.map(function (element) {
        return Token.stringify(element, language, o);
      }).join("");
    }

    var env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: "span",
      classes: ["token", o.type],
      attributes: {},
      language: language,
      parent: parent
    };

    if (o.alias) {
      var aliases = _.util.type(o.alias) === "Array" ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    var attributes = Object.keys(env.attributes).map(function (name) {
      return name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
    }).join(" ");
    return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + (attributes ? " " + attributes : "") + ">" + env.content + "</" + env.tag + ">";
  };

  return _;
}();
/* This content is auto-generated to include some prismjs language components: */

/* "prismjs/components/prism-markup" */


Prism.languages.markup = {
  'comment': /<!--[\s\S]*?-->/,
  'prolog': /<\?[\s\S]+?\?>/,
  'doctype': /<!DOCTYPE[\s\S]+?>/i,
  'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          'punctuation': [/^=/, {
            pattern: /^(\s*)["']|["']$/,
            lookbehind: true
          }]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': /&#?[\da-z]{1,8};/i
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity']; // Plugin to make entity title show the real entity, idea by Roman Komarov

Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside
    };
    Prism.languages.insertBefore('markup', 'cdata', def);
  }
});
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
/* "prismjs/components/prism-bash" */

(function (Prism) {
  // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
  // + LC_ALL, RANDOM, REPLY, SECONDS.
  // + make sure PS1..4 are here as they are not always set,
  // - some useless things.
  var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';
  var insideString = {
    'environment': {
      pattern: RegExp("\\$" + envVars),
      alias: 'constant'
    },
    'variable': [// [0]: Arithmetic Environment
    {
      pattern: /\$?\(\([\s\S]+?\)\)/,
      greedy: true,
      inside: {
        // If there is a $ sign at the beginning highlight $(( and )) as variable
        'variable': [{
          pattern: /(^\$\(\([\s\S]+)\)\)/,
          lookbehind: true
        }, /^\$\(\(/],
        'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
        // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
        'operator': /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
        // If there is no $ sign at the beginning highlight (( and )) as punctuation
        'punctuation': /\(\(?|\)\)?|,|;/
      }
    }, // [1]: Command Substitution
    {
      pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
      greedy: true,
      inside: {
        'variable': /^\$\(|^`|\)$|`$/
      }
    }, // [2]: Brace expansion
    {
      pattern: /\$\{[^}]+\}/,
      greedy: true,
      inside: {
        'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
        'punctuation': /[\[\]]/,
        'environment': {
          pattern: RegExp("(\\{)" + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      }
    }, /\$(?:\w+|[#?*!@$])/],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
  };
  Prism.languages.bash = {
    'shebang': {
      pattern: /^#!\s*\/.*/,
      alias: 'important'
    },
    'comment': {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    'function-name': [// a) function foo {
    // b) foo() {
    // c) function foo() {
    // but not “foo {”
    {
      // a) and c)
      pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
      lookbehind: true,
      alias: 'function'
    }, {
      // b)
      pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
      alias: 'function'
    }],
    // Highlight variable names as variables in for and select beginnings.
    'for-or-select': {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: 'variable',
      lookbehind: true
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        'environment': {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      },
      alias: 'variable',
      lookbehind: true
    },
    'string': [// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
    {
      pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,
      lookbehind: true,
      greedy: true,
      inside: insideString
    }, // Here-document with quotes around the tag
    // → No expansion (so no “inside”).
    {
      pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,
      lookbehind: true,
      greedy: true
    }, // “Normal” string
    {
      pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
      greedy: true,
      inside: insideString
    }],
    'environment': {
      pattern: RegExp("\\$?" + envVars),
      alias: 'constant'
    },
    'variable': insideString.variable,
    'function': {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'keyword': {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    'builtin': {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: true,
      // Alias added to make those easier to distinguish from strings.
      alias: 'class-name'
    },
    'boolean': {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'file-descriptor': {
      pattern: /\B&\d\b/,
      alias: 'important'
    },
    'operator': {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: {
        'file-descriptor': {
          pattern: /^\d/,
          alias: 'important'
        }
      }
    },
    'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    'number': {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  /* Patterns in command substitution. */

  var toBeCopied = ['comment', 'function-name', 'for-or-select', 'assign-left', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'];
  var inside = insideString.variable[1].inside;

  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
  }

  Prism.languages.shell = Prism.languages.bash;
})(Prism);
/* "prismjs/components/prism-clike" */


Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /[.\\]/
    }
  },
  'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  'boolean': /\b(?:true|false)\b/,
  'function': /\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  'punctuation': /[{}[\];(),.:]/
};
/* "prismjs/components/prism-c" */

Prism.languages.c = Prism.languages.extend('clike', {
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+)\w+/,
    lookbehind: true
  },
  'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
  'number': /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
});
Prism.languages.insertBefore('c', 'string', {
  'macro': {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: true,
    alias: 'property',
    inside: {
      // highlight the path of the include statement as a string
      'string': {
        pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
        lookbehind: true
      },
      // highlight macro directives as keywords
      'directive': {
        pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
        lookbehind: true,
        alias: 'keyword'
      }
    }
  },
  // highlight predefined macros as constants
  'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
});
delete Prism.languages.c['boolean'];
/* "prismjs/components/prism-cpp" */

Prism.languages.cpp = Prism.languages.extend('c', {
  'class-name': {
    pattern: /(\b(?:class|enum|struct)\s+)\w+/,
    lookbehind: true
  },
  'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  'number': {
    pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
    greedy: true
  },
  'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
  'boolean': /\b(?:true|false)\b/
});
Prism.languages.insertBefore('cpp', 'string', {
  'raw-string': {
    pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
    alias: 'string',
    greedy: true
  }
});
/* "prismjs/components/prism-css" */

(function (Prism) {
  var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  Prism.languages.css = {
    'comment': /\/\*[\s\S]*?\*\//,
    'atrule': {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        'rule': /@[\w-]+/ // See rest below

      }
    },
    'url': {
      pattern: RegExp('url\\((?:' + string.source + '|[^\n\r()]*)\\)', 'i'),
      inside: {
        'function': /^url/i,
        'punctuation': /^\(|\)$/
      }
    },
    'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
    'string': {
      pattern: string,
      greedy: true
    },
    'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    'important': /!important\b/i,
    'function': /[-a-z0-9]+(?=\()/i,
    'punctuation': /[(){};:,]/
  };
  Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
  var markup = Prism.languages.markup;

  if (markup) {
    markup.tag.addInlined('style', 'css');
    Prism.languages.insertBefore('inside', 'attr-value', {
      'style-attr': {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
          'attr-name': {
            pattern: /^\s*style/i,
            inside: markup.tag.inside
          },
          'punctuation': /^\s*=\s*['"]|['"]\s*$/,
          'attr-value': {
            pattern: /.+/i,
            inside: Prism.languages.css
          }
        },
        alias: 'language-css'
      }
    }, markup.tag);
  }
})(Prism);
/* "prismjs/components/prism-css-extras" */


Prism.languages.css.selector = {
  pattern: Prism.languages.css.selector,
  inside: {
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+/,
    'class': /\.[-:.\w]+/,
    'id': /#[-:.\w]+/,
    'attribute': {
      pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
      greedy: true,
      inside: {
        'punctuation': /^\[|\]$/,
        'case-sensitivity': {
          pattern: /(\s)[si]$/i,
          lookbehind: true,
          alias: 'keyword'
        },
        'namespace': {
          pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
          lookbehind: true,
          inside: {
            'punctuation': /\|$/
          }
        },
        'attribute': {
          pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
          lookbehind: true
        },
        'value': [/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, {
          pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
          lookbehind: true
        }],
        'operator': /[|~*^$]?=/
      }
    },
    'n-th': [{
      pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
      lookbehind: true,
      inside: {
        'number': /[\dn]+/,
        'operator': /[+-]/
      }
    }, {
      pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
      lookbehind: true
    }],
    'punctuation': /[()]/
  }
};
Prism.languages.insertBefore('css', 'property', {
  'variable': {
    pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
    lookbehind: true
  }
});
Prism.languages.insertBefore('css', 'function', {
  'operator': {
    pattern: /(\s)[+\-*\/](?=\s)/,
    lookbehind: true
  },
  'hexcode': /#[\da-f]{3,8}/i,
  'entity': /\\[\da-f]{1,8}/i,
  'unit': {
    pattern: /(\d)(?:%|[a-z]+)/,
    lookbehind: true
  },
  'number': /-?[\d.]+/
});
/* "prismjs/components/prism-javascript" */

Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
    lookbehind: true
  }],
  'keyword': [{
    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
    lookbehind: true
  }, {
    pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: true
  }],
  'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: true,
    greedy: true
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [{
    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
  'template-string': {
    pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\${|}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  }
});

if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined('script', 'javascript');
}

Prism.languages.js = Prism.languages.javascript;
/* "prismjs/components/prism-jsx" */

(function (Prism) {
  var javascript = Prism.util.clone(Prism.languages.javascript);
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  Prism.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i;
  Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/i;
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i;
  Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism.languages.insertBefore('inside', 'attr-name', {
    'spread': {
      pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
      inside: {
        'punctuation': /\.{3}|[{}.]/,
        'attr-value': /\w+/
      }
    }
  }, Prism.languages.jsx.tag);
  Prism.languages.insertBefore('inside', 'attr-value', {
    'script': {
      // Allow for two levels of nesting
      pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
      inside: {
        'script-punctuation': {
          pattern: /^=(?={)/,
          alias: 'punctuation'
        },
        rest: Prism.languages.jsx
      },
      'alias': 'language-javascript'
    }
  }, Prism.languages.jsx.tag); // The following will handle plain text inside tags

  var stringifyToken = function stringifyToken(token) {
    if (!token) {
      return '';
    }

    if (typeof token === 'string') {
      return token;
    }

    if (typeof token.content === 'string') {
      return token.content;
    }

    return token.content.map(stringifyToken).join('');
  };

  var walkTokens = function walkTokens(tokens) {
    var openedTags = [];

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var notTagNorBrace = false;

      if (typeof token !== 'string') {
        if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
          // We found a tag, now find its kind
          if (token.content[0].content[0].content === '</') {
            // Closing tag
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              // Pop matching opening tag
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === '/>') ;else {
              // Opening tag
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
          // Here we might have entered a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
          // Here we might have left a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }

      if (notTagNorBrace || typeof token === 'string') {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          // Here we are inside a tag, and not inside a JSX context.
          // That's plain text: drop any tokens matched.
          var plainText = stringifyToken(token); // And merge text with adjacent text

          if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }

          if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }

          tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
        }
      }

      if (token.content && typeof token.content !== 'string') {
        walkTokens(token.content);
      }
    }
  };

  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'jsx' && env.language !== 'tsx') {
      return;
    }

    walkTokens(env.tokens);
  });
})(Prism);
/* "prismjs/components/prism-javadoclike" */


(function (Prism) {
  var javaDocLike = Prism.languages.javadoclike = {
    'parameter': {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
      lookbehind: true
    },
    'keyword': {
      // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.
      // @word, {@word}
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: true
    },
    'punctuation': /[{}]/
  };
  /**
   * Adds doc comment support to the given language and calls a given callback on each doc comment pattern.
   *
   * @param {string} lang the language add doc comment support to.
   * @param {(pattern: {inside: {rest: undefined}}) => void} callback the function called with each doc comment pattern as argument.
   */

  function docCommentSupport(lang, callback) {
    var tokenName = 'doc-comment';
    var grammar = Prism.languages[lang];

    if (!grammar) {
      return;
    }

    var token = grammar[tokenName];

    if (!token) {
      // add doc comment: /** */
      var definition = {};
      definition[tokenName] = {
        pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
        alias: 'comment'
      };
      grammar = Prism.languages.insertBefore(lang, 'comment', definition);
      token = grammar[tokenName];
    }

    if (token instanceof RegExp) {
      // convert regex to object
      token = grammar[tokenName] = {
        pattern: token
      };
    }

    if (Array.isArray(token)) {
      for (var i = 0, l = token.length; i < l; i++) {
        if (token[i] instanceof RegExp) {
          token[i] = {
            pattern: token[i]
          };
        }

        callback(token[i]);
      }
    } else {
      callback(token);
    }
  }
  /**
   * Adds doc-comment support to the given languages for the given documentation language.
   *
   * @param {string[]|string} languages
   * @param {Object} docLanguage
   */


  function addSupport(languages, docLanguage) {
    if (typeof languages === 'string') {
      languages = [languages];
    }

    languages.forEach(function (lang) {
      docCommentSupport(lang, function (pattern) {
        if (!pattern.inside) {
          pattern.inside = {};
        }

        pattern.inside.rest = docLanguage;
      });
    });
  }

  Object.defineProperty(javaDocLike, 'addSupport', {
    value: addSupport
  });
  javaDocLike.addSupport(['java', 'javascript', 'php'], javaDocLike);
})(Prism);
/* "prismjs/components/prism-java" */


(function (Prism) {
  var keywords = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/; // based on the java naming conventions

  var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
  Prism.languages.java = Prism.languages.extend('clike', {
    'class-name': [className, // variables and parameters
    // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
    /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
    'keyword': keywords,
    'function': [Prism.languages.clike.function, {
      pattern: /(\:\:)[a-z_]\w*/,
      lookbehind: true
    }],
    'number': /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    'operator': {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('java', 'class-name', {
    'annotation': {
      alias: 'punctuation',
      pattern: /(^|[^.])@\w+/,
      lookbehind: true
    },
    'namespace': {
      pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
      lookbehind: true,
      inside: {
        'punctuation': /\./
      }
    },
    'generics': {
      pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
      inside: {
        'class-name': className,
        'keyword': keywords,
        'punctuation': /[<>(),.:]/,
        'operator': /[?&|]/
      }
    }
  });
})(Prism);
/* "prismjs/components/prism-markup-templating" */


(function (Prism) {
  /**
   * Returns the placeholder for the given language id and index.
   *
   * @param {string} language
   * @param {string|number} index
   * @returns {string}
   */
  function getPlaceholder(language, index) {
    return '___' + language.toUpperCase() + index + '___';
  }

  Object.defineProperties(Prism.languages['markup-templating'] = {}, {
    buildPlaceholders: {
      /**
       * Tokenize all inline templating expressions matching `placeholderPattern`.
       *
       * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
       * `true` will be replaced.
       *
       * @param {object} env The environment of the `before-tokenize` hook.
       * @param {string} language The language id.
       * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
       * @param {(match: string) => boolean} [replaceFilter]
       */
      value: function value(env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }

        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function (match) {
          if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
            return match;
          }

          var i = tokenStack.length;
          var placeholder; // Check for existing strings

          while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
            ++i;
          } // Create a sparse array


          tokenStack[i] = match;
          return placeholder;
        }); // Switch the grammar to markup

        env.grammar = Prism.languages.markup;
      }
    },
    tokenizePlaceholders: {
      /**
       * Replace placeholders with proper tokens after tokenizing.
       *
       * @param {object} env The environment of the `after-tokenize` hook.
       * @param {string} language The language id.
       */
      value: function value(env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        } // Switch the grammar back


        env.grammar = Prism.languages[language];
        var j = 0;
        var keys = Object.keys(env.tokenStack);

        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            // all placeholders are replaced already
            if (j >= keys.length) {
              break;
            }

            var token = tokens[i];

            if (typeof token === 'string' || token.content && typeof token.content === 'string') {
              var k = keys[j];
              var t = env.tokenStack[k];
              var s = typeof token === 'string' ? token : token.content;
              var placeholder = getPlaceholder(language, k);
              var index = s.indexOf(placeholder);

              if (index > -1) {
                ++j;
                var before = s.substring(0, index);
                var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                var after = s.substring(index + placeholder.length);
                var replacement = [];

                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }

                replacement.push(middle);

                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }

                if (typeof token === 'string') {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content
            /* && typeof token.content !== 'string' */
            ) {
                walkTokens(token.content);
              }
          }

          return tokens;
        }

        walkTokens(env.tokens);
      }
    }
  });
})(Prism);
/* "prismjs/components/prism-php" */

/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 * 		- Extends clike syntax
 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
 * 		- Smarter constant and function matching
 *
 * Adds the following new token classes:
 * 		constant, delimiter, variable, function, package
 */


(function (Prism) {
  Prism.languages.php = Prism.languages.extend('clike', {
    'keyword': /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
    'boolean': {
      pattern: /\b(?:false|true)\b/i,
      alias: 'constant'
    },
    'constant': [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('php', 'string', {
    'shell-comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
      alias: 'comment'
    }
  });
  Prism.languages.insertBefore('php', 'comment', {
    'delimiter': {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: 'important'
    }
  });
  Prism.languages.insertBefore('php', 'keyword', {
    'variable': /\$+(?:\w+\b|(?={))/i,
    'package': {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: true,
      inside: {
        punctuation: /\\/
      }
    }
  }); // Must be defined after the function pattern

  Prism.languages.insertBefore('php', 'operator', {
    'property': {
      pattern: /(->)[\w]+/,
      lookbehind: true
    }
  });
  var string_interpolation = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
    lookbehind: true,
    inside: {
      rest: Prism.languages.php
    }
  };
  Prism.languages.insertBefore('php', 'string', {
    'nowdoc-string': {
      pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
      greedy: true,
      alias: 'string',
      inside: {
        'delimiter': {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: 'symbol',
          inside: {
            'punctuation': /^<<<'?|[';]$/
          }
        }
      }
    },
    'heredoc-string': {
      pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
      greedy: true,
      alias: 'string',
      inside: {
        'delimiter': {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: 'symbol',
          inside: {
            'punctuation': /^<<<"?|[";]$/
          }
        },
        'interpolation': string_interpolation // See below

      }
    },
    'single-quoted-string': {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: true,
      alias: 'string'
    },
    'double-quoted-string': {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: true,
      alias: 'string',
      inside: {
        'interpolation': string_interpolation // See below

      }
    }
  }); // The different types of PHP strings "replace" the C-like standard string

  delete Prism.languages.php['string'];
  Prism.hooks.add('before-tokenize', function (env) {
    if (!/<\?/.test(env.code)) {
      return;
    }

    var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/ig;
    Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
  });
  Prism.hooks.add('after-tokenize', function (env) {
    Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
  });
})(Prism);
/* "prismjs/components/prism-jsdoc" */


(function (Prism) {
  var javascript = Prism.languages.javascript;
  var type = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}/.source;
  var parameterPrefix = '(@(?:param|arg|argument|property)\\s+(?:' + type + '\\s+)?)';
  Prism.languages.jsdoc = Prism.languages.extend('javadoclike', {
    'parameter': {
      // @param {string} foo - foo bar
      pattern: RegExp(parameterPrefix + /[$\w\xA0-\uFFFF.]+(?=\s|$)/.source),
      lookbehind: true,
      inside: {
        'punctuation': /\./
      }
    }
  });
  Prism.languages.insertBefore('jsdoc', 'keyword', {
    'optional-parameter': {
      // @param {string} [baz.foo="bar"] foo bar
      pattern: RegExp(parameterPrefix + /\[[$\w\xA0-\uFFFF.]+(?:=[^[\]]+)?\](?=\s|$)/.source),
      lookbehind: true,
      inside: {
        'parameter': {
          pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
          lookbehind: true,
          inside: {
            'punctuation': /\./
          }
        },
        'code': {
          pattern: /(=)[\s\S]*(?=\]$)/,
          lookbehind: true,
          inside: javascript,
          alias: 'language-javascript'
        },
        'punctuation': /[=[\]]/
      }
    },
    'class-name': [{
      pattern: RegExp('(@[a-z]+\\s+)' + type),
      lookbehind: true,
      inside: {
        'punctuation': /[.,:?=<>|{}()[\]]/
      }
    }, {
      pattern: /(@(?:augments|extends|class|interface|memberof!?|this)\s+)[A-Z]\w*(?:\.[A-Z]\w*)*/,
      lookbehind: true,
      inside: {
        'punctuation': /\./
      }
    }],
    'example': {
      pattern: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
      lookbehind: true,
      inside: {
        'code': {
          pattern: /^(\s*(?:\*\s*)?).+$/m,
          lookbehind: true,
          inside: javascript,
          alias: 'language-javascript'
        }
      }
    }
  });
  Prism.languages.javadoclike.addSupport('javascript', Prism.languages.jsdoc);
})(Prism);
/* "prismjs/components/prism-actionscript" */


Prism.languages.actionscript = Prism.languages.extend('javascript', {
  'keyword': /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
  'operator': /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
});
Prism.languages.actionscript['class-name'].alias = 'function';

if (Prism.languages.markup) {
  Prism.languages.insertBefore('actionscript', 'string', {
    'xml': {
      pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
      lookbehind: true,
      inside: {
        rest: Prism.languages.markup
      }
    }
  });
}
/* "prismjs/components/prism-coffeescript" */


(function (Prism) {
  // Ignore comments starting with { to privilege string interpolation highlighting
  var comment = /#(?!\{).+/,
      interpolation = {
    pattern: /#\{[^}]+\}/,
    alias: 'variable'
  };
  Prism.languages.coffeescript = Prism.languages.extend('javascript', {
    'comment': comment,
    'string': [// Strings are multiline
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: true
    }, {
      // Strings are multiline
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }],
    'keyword': /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    'class-member': {
      pattern: /@(?!\d)\w+/,
      alias: 'variable'
    }
  });
  Prism.languages.insertBefore('coffeescript', 'comment', {
    'multiline-comment': {
      pattern: /###[\s\S]+?###/,
      alias: 'comment'
    },
    // Block regexp can contain comments and interpolation
    'block-regex': {
      pattern: /\/{3}[\s\S]*?\/{3}/,
      alias: 'regex',
      inside: {
        'comment': comment,
        'interpolation': interpolation
      }
    }
  });
  Prism.languages.insertBefore('coffeescript', 'string', {
    'inline-javascript': {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      inside: {
        'delimiter': {
          pattern: /^`|`$/,
          alias: 'punctuation'
        },
        rest: Prism.languages.javascript
      }
    },
    // Block strings
    'multiline-string': [{
      pattern: /'''[\s\S]*?'''/,
      greedy: true,
      alias: 'string'
    }, {
      pattern: /"""[\s\S]*?"""/,
      greedy: true,
      alias: 'string',
      inside: {
        interpolation: interpolation
      }
    }]
  });
  Prism.languages.insertBefore('coffeescript', 'keyword', {
    // Object property
    'property': /(?!\d)\w+(?=\s*:(?!:))/
  });
  delete Prism.languages.coffeescript['template-string'];
  Prism.languages.coffee = Prism.languages.coffeescript;
})(Prism);
/* "prismjs/components/prism-js-extras" */


(function (Prism) {
  Prism.languages.insertBefore('javascript', 'function-variable', {
    'method-variable': {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function-variable'].pattern.source),
      lookbehind: true,
      alias: ['function-variable', 'method', 'function', 'property-access']
    }
  });
  Prism.languages.insertBefore('javascript', 'function', {
    'method': {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function'].source),
      lookbehind: true,
      alias: ['function', 'property-access']
    }
  });
  Prism.languages.insertBefore('javascript', 'constant', {
    'known-class-name': [{
      // standard built-ins
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
      pattern: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
      alias: 'class-name'
    }, {
      // errors
      pattern: /\b(?:[A-Z]\w*)Error\b/,
      alias: 'class-name'
    }]
  });
  Prism.languages.javascript['keyword'].unshift({
    pattern: /\b(?:as|default|export|from|import)\b/,
    alias: 'module'
  }, {
    pattern: /\bnull\b/,
    alias: ['null', 'nil']
  }, {
    pattern: /\bundefined\b/,
    alias: 'nil'
  });
  Prism.languages.insertBefore('javascript', 'operator', {
    'spread': {
      pattern: /\.{3}/,
      alias: 'operator'
    },
    'arrow': {
      pattern: /=>/,
      alias: 'operator'
    }
  });
  Prism.languages.insertBefore('javascript', 'punctuation', {
    'property-access': {
      pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
      lookbehind: true
    },
    'maybe-class-name': {
      pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
      lookbehind: true
    },
    'dom': {
      // this contains only a few commonly used DOM variables
      pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
      alias: 'variable'
    },
    'console': {
      pattern: /\bconsole(?=\s*\.)/,
      alias: 'class-name'
    }
  }); // add 'maybe-class-name' to tokens which might be a class name

  var maybeClassNameTokens = ['function', 'function-variable', 'method', 'method-variable', 'property-access'];

  for (var i = 0; i < maybeClassNameTokens.length; i++) {
    var token = maybeClassNameTokens[i];
    var value = Prism.languages.javascript[token]; // convert regex to object

    if (Prism.util.type(value) === 'RegExp') {
      value = Prism.languages.javascript[token] = {
        pattern: value
      };
    } // keep in mind that we don't support arrays


    var inside = value.inside || {};
    value.inside = inside;
    inside['maybe-class-name'] = /^[A-Z][\s\S]*/;
  }
})(Prism);
/* "prismjs/components/prism-flow" */


(function (Prism) {
  Prism.languages.flow = Prism.languages.extend('javascript', {});
  Prism.languages.insertBefore('flow', 'keyword', {
    'type': [{
      pattern: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
      alias: 'tag'
    }]
  });
  Prism.languages.flow['function-variable'].pattern = /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i;
  delete Prism.languages.flow['parameter'];
  Prism.languages.insertBefore('flow', 'operator', {
    'flow-punctuation': {
      pattern: /\{\||\|\}/,
      alias: 'punctuation'
    }
  });

  if (!Array.isArray(Prism.languages.flow.keyword)) {
    Prism.languages.flow.keyword = [Prism.languages.flow.keyword];
  }

  Prism.languages.flow.keyword.unshift({
    pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/,
    lookbehind: true
  }, {
    pattern: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
    lookbehind: true
  });
})(Prism);
/* "prismjs/components/prism-n4js" */


Prism.languages.n4js = Prism.languages.extend('javascript', {
  // Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html
  'keyword': /\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/
});
Prism.languages.insertBefore('n4js', 'constant', {
  // Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations
  'annotation': {
    pattern: /@+\w+/,
    alias: 'operator'
  }
});
Prism.languages.n4jsd = Prism.languages.n4js;
/* "prismjs/components/prism-typescript" */

Prism.languages.typescript = Prism.languages.extend('javascript', {
  // From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
  'keyword': /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
  'builtin': /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
});
Prism.languages.ts = Prism.languages.typescript;
/* "prismjs/components/prism-js-templates" */

(function (Prism) {
  var templateString = Prism.languages.javascript['template-string']; // see the pattern in prism-javascript.js

  var templateLiteralPattern = templateString.pattern.source;
  var interpolationObject = templateString.inside['interpolation'];
  var interpolationPunctuationObject = interpolationObject.inside['interpolation-punctuation'];
  var interpolationPattern = interpolationObject.pattern.source;
  /**
   * Creates a new pattern to match a template string with a special tag.
   *
   * This will return `undefined` if there is no grammar with the given language id.
   *
   * @param {string} language The language id of the embedded language. E.g. `markdown`.
   * @param {string} tag The regex pattern to match the tag.
   * @returns {object | undefined}
   * @example
   * createTemplate('css', /\bcss/.source);
   */

  function createTemplate(language, tag) {
    if (!Prism.languages[language]) {
      return undefined;
    }

    return {
      pattern: RegExp('((?:' + tag + ')\\s*)' + templateLiteralPattern),
      lookbehind: true,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        'embedded-code': {
          pattern: /[\s\S]+/,
          alias: language
        }
      }
    };
  }

  Prism.languages.javascript['template-string'] = [// styled-jsx:
  //   css`a { color: #25F; }`
  // styled-components:
  //   styled.h1`color: red;`
  createTemplate('css', /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source), // html`<p></p>`
  // div.innerHTML = `<p></p>`
  createTemplate('html', /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source), // svg`<path fill="#fff" d="M55.37 ..."/>`
  createTemplate('svg', /\bsvg/.source), // md`# h1`, markdown`## h2`
  createTemplate('markdown', /\b(?:md|markdown)/.source), // gql`...`, graphql`...`, graphql.experimental`...`
  createTemplate('graphql', /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source), // vanilla template string
  templateString].filter(Boolean);
  /**
   * Returns a specific placeholder literal for the given language.
   *
   * @param {number} counter
   * @param {string} language
   * @returns {string}
   */

  function getPlaceholder(counter, language) {
    return '___' + language.toUpperCase() + '_' + counter + '___';
  }
  /**
   * Returns the tokens of `Prism.tokenize` but also runs the `before-tokenize` and `after-tokenize` hooks.
   *
   * @param {string} code
   * @param {any} grammar
   * @param {string} language
   * @returns {(string|Token)[]}
   */


  function tokenizeWithHooks(code, grammar, language) {
    var env = {
      code: code,
      grammar: grammar,
      language: language
    };
    Prism.hooks.run('before-tokenize', env);
    env.tokens = Prism.tokenize(env.code, env.grammar);
    Prism.hooks.run('after-tokenize', env);
    return env.tokens;
  }
  /**
   * Returns the token of the given JavaScript interpolation expression.
   *
   * @param {string} expression The code of the expression. E.g. `"${42}"`
   * @returns {Token}
   */


  function tokenizeInterpolationExpression(expression) {
    var tempGrammar = {};
    tempGrammar['interpolation-punctuation'] = interpolationPunctuationObject;
    /** @type {Array} */

    var tokens = Prism.tokenize(expression, tempGrammar);

    if (tokens.length === 3) {
      /**
       * The token array will look like this
       * [
       *     ["interpolation-punctuation", "${"]
       *     "..." // JavaScript expression of the interpolation
       *     ["interpolation-punctuation", "}"]
       * ]
       */
      var args = [1, 1];
      args.push.apply(args, tokenizeWithHooks(tokens[1], Prism.languages.javascript, 'javascript'));
      tokens.splice.apply(tokens, args);
    }

    return new Prism.Token('interpolation', tokens, interpolationObject.alias, expression);
  }
  /**
   * Tokenizes the given code with support for JavaScript interpolation expressions mixed in.
   *
   * This function has 3 phases:
   *
   * 1. Replace all JavaScript interpolation expression with a placeholder.
   *    The placeholder will have the syntax of a identify of the target language.
   * 2. Tokenize the code with placeholders.
   * 3. Tokenize the interpolation expressions and re-insert them into the tokenize code.
   *    The insertion only works if a placeholder hasn't been "ripped apart" meaning that the placeholder has been
   *    tokenized as two tokens by the grammar of the embedded language.
   *
   * @param {string} code
   * @param {object} grammar
   * @param {string} language
   * @returns {Token}
   */


  function tokenizeEmbedded(code, grammar, language) {
    // 1. First filter out all interpolations
    // because they might be escaped, we need a lookbehind, so we use Prism

    /** @type {(Token|string)[]} */
    var _tokens = Prism.tokenize(code, {
      'interpolation': {
        pattern: RegExp(interpolationPattern),
        lookbehind: true
      }
    }); // replace all interpolations with a placeholder which is not in the code already


    var placeholderCounter = 0;
    /** @type {Object<string, string>} */

    var placeholderMap = {};

    var embeddedCode = _tokens.map(function (token) {
      if (typeof token === 'string') {
        return token;
      } else {
        var interpolationExpression = token.content;
        var placeholder;

        while (code.indexOf(placeholder = getPlaceholder(placeholderCounter++, language)) !== -1) {}

        placeholderMap[placeholder] = interpolationExpression;
        return placeholder;
      }
    }).join(''); // 2. Tokenize the embedded code


    var embeddedTokens = tokenizeWithHooks(embeddedCode, grammar, language); // 3. Re-insert the interpolation

    var placeholders = Object.keys(placeholderMap);
    placeholderCounter = 0;
    /**
     *
     * @param {(Token|string)[]} tokens
     * @returns {void}
     */

    function walkTokens(tokens) {
      for (var i = 0; i < tokens.length; i++) {
        if (placeholderCounter >= placeholders.length) {
          return;
        }

        var token = tokens[i];

        if (typeof token === 'string' || typeof token.content === 'string') {
          var placeholder = placeholders[placeholderCounter];
          var s = typeof token === 'string' ? token :
          /** @type {string} */
          token.content;
          var index = s.indexOf(placeholder);

          if (index !== -1) {
            ++placeholderCounter;
            var before = s.substring(0, index);
            var middle = tokenizeInterpolationExpression(placeholderMap[placeholder]);
            var after = s.substring(index + placeholder.length);
            var replacement = [];

            if (before) {
              replacement.push(before);
            }

            replacement.push(middle);

            if (after) {
              var afterTokens = [after];
              walkTokens(afterTokens);
              replacement.push.apply(replacement, afterTokens);
            }

            if (typeof token === 'string') {
              tokens.splice.apply(tokens, [i, 1].concat(replacement));
              i += replacement.length - 1;
            } else {
              token.content = replacement;
            }
          }
        } else {
          var content = token.content;

          if (Array.isArray(content)) {
            walkTokens(content);
          } else {
            walkTokens([content]);
          }
        }
      }
    }

    walkTokens(embeddedTokens);
    return new Prism.Token(language, embeddedTokens, 'language-' + language, code);
  }
  /**
   * The languages for which JS templating will handle tagged template literals.
   *
   * JS templating isn't active for only JavaScript but also related languages like TypeScript, JSX, and TSX.
   */


  var supportedLanguages = {
    'javascript': true,
    'js': true,
    'typescript': true,
    'ts': true,
    'jsx': true,
    'tsx': true
  };
  Prism.hooks.add('after-tokenize', function (env) {
    if (!(env.language in supportedLanguages)) {
      return;
    }
    /**
     * Finds and tokenizes all template strings with an embedded languages.
     *
     * @param {(Token | string)[]} tokens
     * @returns {void}
     */


    function findTemplateStrings(tokens) {
      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          continue;
        }

        var content = token.content;

        if (!Array.isArray(content)) {
          if (typeof content !== 'string') {
            findTemplateStrings([content]);
          }

          continue;
        }

        if (token.type === 'template-string') {
          /**
           * A JavaScript template-string token will look like this:
           *
           * ["template-string", [
           *     ["template-punctuation", "`"],
           *     (
           *         An array of "string" and "interpolation" tokens. This is the simple string case.
           *         or
           *         ["embedded-code", "..."] This is the token containing the embedded code.
           *                                  It also has an alias which is the language of the embedded code.
           *     ),
           *     ["template-punctuation", "`"]
           * ]]
           */
          var embedded = content[1];

          if (content.length === 3 && typeof embedded !== 'string' && embedded.type === 'embedded-code') {
            // get string content
            var code = stringContent(embedded);
            var alias = embedded.alias;
            var language = Array.isArray(alias) ? alias[0] : alias;
            var grammar = Prism.languages[language];

            if (!grammar) {
              // the embedded language isn't registered.
              continue;
            }

            content[1] = tokenizeEmbedded(code, grammar, language);
          }
        } else {
          findTemplateStrings(content);
        }
      }
    }

    findTemplateStrings(env.tokens);
  });
  /**
   * Returns the string content of a token or token stream.
   *
   * @param {string | Token | (string | Token)[]} value
   * @returns {string}
   */

  function stringContent(value) {
    if (typeof value === 'string') {
      return value;
    } else if (Array.isArray(value)) {
      return value.map(stringContent).join('');
    } else {
      return stringContent(value.content);
    }
  }
})(Prism);
/* "prismjs/components/prism-graphql" */


Prism.languages.graphql = {
  'comment': /#.*/,
  'string': {
    pattern: /"(?:\\.|[^\\"\r\n])*"/,
    greedy: true
  },
  'number': /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  'boolean': /\b(?:true|false)\b/,
  'variable': /\$[a-z_]\w*/i,
  'directive': {
    pattern: /@[a-z_]\w*/i,
    alias: 'function'
  },
  'attr-name': {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
    lookbehind: true
  },
  'fragment': {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: 'function'
  },
  'keyword': /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
  'operator': /[!=|]|\.{3}/,
  'punctuation': /[!(){}\[\]:=,]/,
  'constant': /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
};
/* "prismjs/components/prism-markdown" */

(function (Prism) {
  // Allow only one line break
  var inner = /(?:\\.|[^\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))/.source;
  /**
   * This function is intended for the creation of the bold or italic pattern.
   *
   * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
   *
   * _Note:_ Keep in mind that this adds a capturing group.
   *
   * @param {string} pattern
   * @param {boolean} starAlternative Whether to also add an alternative where all `_`s are replaced with `*`s.
   * @returns {RegExp}
   */

  function createInline(pattern, starAlternative) {
    pattern = pattern.replace(/<inner>/g, inner);

    if (starAlternative) {
      pattern = pattern + '|' + pattern.replace(/_/g, '\\*');
    }

    return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
  }

  var tableCell = /(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
  var tableRow = /\|?__(?:\|__)+\|?(?:(?:\r?\n|\r)|$)/.source.replace(/__/g, tableCell);
  var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\r?\n|\r)/.source;
  Prism.languages.markdown = Prism.languages.extend('markup', {});
  Prism.languages.insertBefore('markdown', 'prolog', {
    'blockquote': {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: 'punctuation'
    },
    'table': {
      pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
      inside: {
        'table-data-rows': {
          pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
          lookbehind: true,
          inside: {
            'table-data': {
              pattern: RegExp(tableCell),
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        },
        'table-line': {
          pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
          lookbehind: true,
          inside: {
            'punctuation': /\||:?-{3,}:?/
          }
        },
        'table-header-row': {
          pattern: RegExp('^' + tableRow + '$'),
          inside: {
            'table-header': {
              pattern: RegExp(tableCell),
              alias: 'important',
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        }
      }
    },
    'code': [{
      // Prefixed by 4 spaces or 1 tab and preceded by an empty line
      pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,
      lookbehind: true,
      alias: 'keyword'
    }, {
      // `code`
      // ``code``
      pattern: /``.+?``|`[^`\r\n]+`/,
      alias: 'keyword'
    }, {
      // ```optional language
      // code block
      // ```
      pattern: /^```[\s\S]*?^```$/m,
      greedy: true,
      inside: {
        'code-block': {
          pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,
          lookbehind: true
        },
        'code-language': {
          pattern: /^(```).+/,
          lookbehind: true
        },
        'punctuation': /```/
      }
    }],
    'title': [{
      // title 1
      // =======
      // title 2
      // -------
      pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,
      alias: 'important',
      inside: {
        punctuation: /==+$|--+$/
      }
    }, {
      // # title 1
      // ###### title 6
      pattern: /(^\s*)#+.+/m,
      lookbehind: true,
      alias: 'important',
      inside: {
        punctuation: /^#+|#+$/
      }
    }],
    'hr': {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'list': {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'url-reference': {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        'variable': {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true
        },
        'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        'punctuation': /^[\[\]!:]|[<>]/
      },
      alias: 'url'
    },
    'bold': {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: createInline(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source, true),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /\*\*|__/
      }
    },
    'italic': {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: createInline(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source, true),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /[*_]/
      }
    },
    'strike': {
      // ~~strike through~~
      // ~strike~
      pattern: createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source, false),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /~~?/
      }
    },
    'url': {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source, false),
      lookbehind: true,
      greedy: true,
      inside: {
        'variable': {
          pattern: /(\[)[^\]]+(?=\]$)/,
          lookbehind: true
        },
        'content': {
          pattern: /(^!?\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {} // see below

        },
        'string': {
          pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
        }
      }
    }
  });
  ['url', 'bold', 'italic', 'strike'].forEach(function (token) {
    ['url', 'bold', 'italic', 'strike'].forEach(function (inside) {
      if (token !== inside) {
        Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
      }
    });
  });
  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'markdown' && env.language !== 'md') {
      return;
    }

    function walkTokens(tokens) {
      if (!tokens || typeof tokens === 'string') {
        return;
      }

      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];

        if (token.type !== 'code') {
          walkTokens(token.content);
          continue;
        }
        /*
         * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
         * is optional. But the grammar is defined so that there is only one case we have to handle:
         *
         * token.content = [
         *     <span class="punctuation">```</span>,
         *     <span class="code-language">xxxx</span>,
         *     '\n', // exactly one new lines (\r or \n or \r\n)
         *     <span class="code-block">...</span>,
         *     '\n', // exactly one new lines again
         *     <span class="punctuation">```</span>
         * ];
         */


        var codeLang = token.content[1];
        var codeBlock = token.content[3];

        if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
          // this might be a language that Prism does not support
          var alias = 'language-' + codeLang.content.trim().split(/\s+/)[0].toLowerCase(); // add alias

          if (!codeBlock.alias) {
            codeBlock.alias = [alias];
          } else if (typeof codeBlock.alias === 'string') {
            codeBlock.alias = [codeBlock.alias, alias];
          } else {
            codeBlock.alias.push(alias);
          }
        }
      }
    }

    walkTokens(env.tokens);
  });
  Prism.hooks.add('wrap', function (env) {
    if (env.type !== 'code-block') {
      return;
    }

    var codeLang = '';

    for (var i = 0, l = env.classes.length; i < l; i++) {
      var cls = env.classes[i];
      var match = /language-(.+)/.exec(cls);

      if (match) {
        codeLang = match[1];
        break;
      }
    }

    var grammar = Prism.languages[codeLang];

    if (!grammar) {
      if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
        var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
        env.attributes['id'] = id;
        Prism.plugins.autoloader.loadLanguages(codeLang, function () {
          var ele = document.getElementById(id);

          if (ele) {
            ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
          }
        });
      }
    } else {
      // reverse Prism.util.encode
      var code = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
      env.content = Prism.highlight(code, grammar, codeLang);
    }
  });
  Prism.languages.md = Prism.languages.markdown;
})(Prism);
/* "prismjs/components/prism-diff" */


(function (Prism) {
  Prism.languages.diff = {
    'coord': [// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
    /^(?:\*{3}|-{3}|\+{3}).*$/m, // Match "@@ ... @@" coord lines in unified diff.
    /^@@.*@@$/m, // Match coord lines in normal diff (starts with a number).
    /^\d+.*$/m] // deleted, inserted, unchanged, diff

  };
  /**
   * A map from the name of a block to its line prefix.
   *
   * @type {Object<string, string>}
   */

  var PREFIXES = {
    'deleted-sign': '-',
    'deleted-arrow': '<',
    'inserted-sign': '+',
    'inserted-arrow': '>',
    'unchanged': ' ',
    'diff': '!'
  }; // add a token for each prefix

  Object.keys(PREFIXES).forEach(function (name) {
    var prefix = PREFIXES[name];
    var alias = [];

    if (!/^\w+$/.test(name)) {
      // "deleted-sign" -> "deleted"
      alias.push(/\w+/.exec(name)[0]);
    }

    if (name === "diff") {
      alias.push("bold");
    }

    Prism.languages.diff[name] = {
      // pattern: /^(?:[_].*(?:\r\n?|\n|(?![\s\S])))+/m
      pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
      alias: alias
    };
  }); // make prefixes available to Diff plugin

  Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
    value: PREFIXES
  });
})(Prism);
/* "prismjs/components/prism-git" */


Prism.languages.git = {
  /*
   * A simple one line comment like in a git status command
   * For instance:
   * $ git status
   * # On branch infinite-scroll
   * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
   * # and have 1 and 2 different commits each, respectively.
   * nothing to commit (working directory clean)
   */
  'comment': /^#.*/m,

  /*
   * Regexp to match the changed lines in a git diff output. Check the example below.
   */
  'deleted': /^[-–].*/m,
  'inserted': /^\+.*/m,

  /*
   * a string (double and simple quote)
   */
  'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,

  /*
   * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
   * For instance:
   * $ git add file.txt
   */
  'command': {
    pattern: /^.*\$ git .*$/m,
    inside: {
      /*
       * A git command can contain a parameter starting by a single or a double dash followed by a string
       * For instance:
       * $ git diff --cached
       * $ git log -p
       */
      'parameter': /\s--?\w+/m
    }
  },

  /*
   * Coordinates displayed in a git diff command
   * For instance:
   * $ git diff
   * diff --git file.txt file.txt
   * index 6214953..1d54a52 100644
   * --- file.txt
   * +++ file.txt
   * @@ -1 +1,2 @@
   * -Here's my tetx file
   * +Here's my text file
   * +And this is the second line
   */
  'coord': /^@@.*@@$/m,

  /*
   * Match a "commit [SHA1]" line in a git log output.
   * For instance:
   * $ git log
   * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
   * Author: lgiraudel
   * Date:   Mon Feb 17 11:18:34 2014 +0100
   *
   *     Add of a new line
   */
  'commit_sha1': /^commit \w{40}$/m
};
/* "prismjs/components/prism-go" */

Prism.languages.go = Prism.languages.extend('clike', {
  'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  'builtin': /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
  'boolean': /\b(?:_|iota|nil|true|false)\b/,
  'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  'number': /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
  'string': {
    pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: true
  }
});
delete Prism.languages.go['class-name'];
/* "prismjs/components/prism-handlebars" */

(function (Prism) {
  Prism.languages.handlebars = {
    'comment': /\{\{![\s\S]*?\}\}/,
    'delimiter': {
      pattern: /^\{\{\{?|\}\}\}?$/i,
      alias: 'punctuation'
    },
    'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    'boolean': /\b(?:true|false)\b/,
    'block': {
      pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
      lookbehind: true,
      alias: 'keyword'
    },
    'brackets': {
      pattern: /\[[^\]]+\]/,
      inside: {
        punctuation: /\[|\]/,
        variable: /[\s\S]+/
      }
    },
    'punctuation': /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
    'variable': /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/
  };
  Prism.hooks.add('before-tokenize', function (env) {
    var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
    Prism.languages['markup-templating'].buildPlaceholders(env, 'handlebars', handlebarsPattern);
  });
  Prism.hooks.add('after-tokenize', function (env) {
    Prism.languages['markup-templating'].tokenizePlaceholders(env, 'handlebars');
  });
})(Prism);
/* "prismjs/components/prism-json" */


Prism.languages.json = {
  'property': {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    greedy: true
  },
  'string': {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    greedy: true
  },
  'comment': /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  'number': /-?\d+\.?\d*(e[+-]?\d+)?/i,
  'punctuation': /[{}[\],]/,
  'operator': /:/,
  'boolean': /\b(?:true|false)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  }
};
/* "prismjs/components/prism-less" */

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

Prism.languages.less = Prism.languages.extend('css', {
  'comment': [/\/\*[\s\S]*?\*\//, {
    pattern: /(^|[^\\])\/\/.*/,
    lookbehind: true
  }],
  'atrule': {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
    inside: {
      'punctuation': /[:()]/
    }
  },
  // selectors and mixins are considered the same
  'selector': {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: {
      // mixin parameters
      'variable': /@+[\w-]+/
    }
  },
  'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  'operator': /[+\-*\/]/
});
Prism.languages.insertBefore('less', 'property', {
  'variable': [// Variable declaration (the colon must be consumed!)
  {
    pattern: /@[\w-]+\s*:/,
    inside: {
      "punctuation": /:/
    }
  }, // Variable usage
  /@@?[\w-]+/],
  'mixin-usage': {
    pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
    lookbehind: true,
    alias: 'function'
  }
});
/* "prismjs/components/prism-makefile" */

Prism.languages.makefile = {
  'comment': {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: true
  },
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  // Built-in target names
  'builtin': /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
  // Targets
  'symbol': {
    pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
    inside: {
      'variable': /\$+(?:[^(){}:#=\s]+|(?=[({]))/
    }
  },
  'variable': /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  'keyword': [// Directives
  /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, // Functions
  {
    pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
    lookbehind: true
  }],
  'operator': /(?:::|[?:+!])?=|[|@]/,
  'punctuation': /[:;(){}]/
};
/* "prismjs/components/prism-objectivec" */

Prism.languages.objectivec = Prism.languages.extend('c', {
  'keyword': /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  'string': /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
  'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
delete Prism.languages.objectivec['class-name'];
/* "prismjs/components/prism-ocaml" */

Prism.languages.ocaml = {
  'comment': /\(\*[\s\S]*?\*\)/,
  'string': [{
    pattern: /"(?:\\.|[^\\\r\n"])*"/,
    greedy: true
  }, {
    pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
    greedy: true
  }],
  'number': /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
  'type': {
    pattern: /\B['`]\w*/,
    alias: 'variable'
  },
  'directive': {
    pattern: /\B#\w+/,
    alias: 'function'
  },
  'keyword': /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
  'boolean': /\b(?:false|true)\b/,
  // Custom operators are allowed
  'operator': /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
  'punctuation': /[(){}\[\]|_.,:;]/
};
/* "prismjs/components/prism-python" */

Prism.languages.python = {
  'comment': {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true
  },
  'string-interpolation': {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: true,
    inside: {
      'interpolation': {
        // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: true,
        inside: {
          'format-spec': {
            pattern: /(:)[^:(){}]+(?=}$)/,
            lookbehind: true
          },
          'conversion-option': {
            pattern: /![sra](?=[:}]$)/,
            alias: 'punctuation'
          },
          rest: null
        }
      },
      'string': /[\s\S]+/
    }
  },
  'triple-quoted-string': {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
    greedy: true,
    alias: 'string'
  },
  'string': {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: true
  },
  'function': {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: true
  },
  'class-name': {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: true
  },
  'decorator': {
    pattern: /(^\s*)@\w+(?:\.\w+)*/i,
    lookbehind: true,
    alias: ['annotation', 'punctuation'],
    inside: {
      'punctuation': /\./
    }
  },
  'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  'boolean': /\b(?:True|False|None)\b/,
  'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  'punctuation': /[{}[\];(),.:]/
};
Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
Prism.languages.py = Prism.languages.python;
/* "prismjs/components/prism-reason" */

Prism.languages.reason = Prism.languages.extend('clike', {
  'comment': {
    pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
    lookbehind: true
  },
  'string': {
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
    greedy: true
  },
  // 'class-name' must be matched *after* 'constructor' defined below
  'class-name': /\b[A-Z]\w*/,
  'keyword': /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
  'operator': /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
});
Prism.languages.insertBefore('reason', 'class-name', {
  'character': {
    pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
    alias: 'string'
  },
  'constructor': {
    // Negative look-ahead prevents from matching things like String.capitalize
    pattern: /\b[A-Z]\w*\b(?!\s*\.)/,
    alias: 'variable'
  },
  'label': {
    pattern: /\b[a-z]\w*(?=::)/,
    alias: 'symbol'
  }
}); // We can't match functions property, so let's not even try.

delete Prism.languages.reason.function;
/* "prismjs/components/prism-sass" */

(function (Prism) {
  Prism.languages.sass = Prism.languages.extend('css', {
    // Sass comments don't need to be closed, only indented
    'comment': {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('sass', 'atrule', {
    // We want to consume the whole line
    'atrule-line': {
      // Includes support for = and + shortcuts
      pattern: /^(?:[ \t]*)[@+=].+/m,
      inside: {
        'atrule': /(?:@[\w-]+|[+=])/m
      }
    }
  });
  delete Prism.languages.sass.atrule;
  var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
  var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
    pattern: /(\s+)-(?=\s)/,
    lookbehind: true
  }];
  Prism.languages.insertBefore('sass', 'property', {
    // We want to consume the whole line
    'variable-line': {
      pattern: /^[ \t]*\$.+/m,
      inside: {
        'punctuation': /:/,
        'variable': variable,
        'operator': operator
      }
    },
    // We want to consume the whole line
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
      inside: {
        'property': [/[^:\s]+(?=\s*:)/, {
          pattern: /(:)[^:\s]+/,
          lookbehind: true
        }],
        'punctuation': /:/,
        'variable': variable,
        'operator': operator,
        'important': Prism.languages.sass.important
      }
    }
  });
  delete Prism.languages.sass.property;
  delete Prism.languages.sass.important; // Now that whole lines for other patterns are consumed,
  // what's left should be selectors

  Prism.languages.insertBefore('sass', 'punctuation', {
    'selector': {
      pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
      lookbehind: true
    }
  });
})(Prism);
/* "prismjs/components/prism-scss" */


Prism.languages.scss = Prism.languages.extend('css', {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  },
  'atrule': {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: {
      'rule': /@[\w-]+/ // See rest below

    }
  },
  // url, compassified
  'url': /(?:[-a-z]+-)?url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  'selector': {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
      'parent': {
        pattern: /&/,
        alias: 'important'
      },
      'placeholder': /%[-\w]+/,
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  'property': {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: {
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  }
});
Prism.languages.insertBefore('scss', 'atrule', {
  'keyword': [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
    pattern: /( +)(?:from|through)(?= )/,
    lookbehind: true
  }]
});
Prism.languages.insertBefore('scss', 'important', {
  // var and interpolated vars
  'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});
Prism.languages.insertBefore('scss', 'function', {
  'placeholder': {
    pattern: /%[-\w]+/,
    alias: 'selector'
  },
  'statement': {
    pattern: /\B!(?:default|optional)\b/i,
    alias: 'keyword'
  },
  'boolean': /\b(?:true|false)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  },
  'operator': {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
    lookbehind: true
  }
});
Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;
/* "prismjs/components/prism-sql" */

Prism.languages.sql = {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: true
  },
  'variable': [{
    pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    greedy: true
  }, /@[\w.$]+/],
  'string': {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: true,
    lookbehind: true
  },
  'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  // Should we highlight user defined functions too?
  'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  'boolean': /\b(?:TRUE|FALSE|NULL)\b/i,
  'number': /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
  'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  'punctuation': /[;[\]()`,.]/
};
/* "prismjs/components/prism-stylus" */

(function (Prism) {
  var inside = {
    'url': /url\((["']?).*?\1\)/i,
    'string': {
      pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      greedy: true
    },
    'interpolation': null,
    // See below
    'func': null,
    // See below
    'important': /\B!(?:important|optional)\b/i,
    'keyword': {
      pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
      lookbehind: true
    },
    'hexcode': /#[\da-f]{3,6}/i,
    'number': /\b\d+(?:\.\d+)?%?/,
    'boolean': /\b(?:true|false)\b/,
    'operator': [// We want non-word chars around "-" because it is
    // accepted in property names.
    /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
    'punctuation': /[{}()\[\];:,]/
  };
  inside['interpolation'] = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: 'variable',
    inside: {
      'delimiter': {
        pattern: /^{|}$/,
        alias: 'punctuation'
      },
      rest: inside
    }
  };
  inside['func'] = {
    pattern: /[\w-]+\([^)]*\).*/,
    inside: {
      'function': /^[^(]+/,
      rest: inside
    }
  };
  Prism.languages.stylus = {
    'comment': {
      pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    },
    'atrule-declaration': {
      pattern: /(^\s*)@.+/m,
      lookbehind: true,
      inside: {
        'atrule': /^@[\w-]+/,
        rest: inside
      }
    },
    'variable-declaration': {
      pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
      lookbehind: true,
      inside: {
        'variable': /^\S+/,
        rest: inside
      }
    },
    'statement': {
      pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
      lookbehind: true,
      inside: {
        keyword: /^\S+/,
        rest: inside
      }
    },
    // A property/value pair cannot end with a comma or a brace
    // It cannot have indented content unless it ended with a semicolon
    'property-declaration': {
      pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
      lookbehind: true,
      inside: {
        'property': {
          pattern: /^[^\s:]+/,
          inside: {
            'interpolation': inside.interpolation
          }
        },
        rest: inside
      }
    },
    // A selector can contain parentheses only as part of a pseudo-element
    // It can span multiple lines.
    // It must end with a comma or an accolade or have indented content.
    'selector': {
      pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
      lookbehind: true,
      inside: {
        'interpolation': inside.interpolation,
        'punctuation': /[{},]/
      }
    },
    'func': inside.func,
    'string': inside.string,
    'interpolation': inside.interpolation,
    'punctuation': /[{}()\[\];:.]/
  };
})(Prism);
/* "prismjs/components/prism-tsx" */


var typescript = Prism.util.clone(Prism.languages.typescript);
Prism.languages.tsx = Prism.languages.extend('jsx', typescript);
/* "prismjs/components/prism-wasm" */

Prism.languages.wasm = {
  'comment': [/\(;[\s\S]*?;\)/, {
    pattern: /;;.*/,
    greedy: true
  }],
  'string': {
    pattern: /"(?:\\[\s\S]|[^"\\])*"/,
    greedy: true
  },
  'keyword': [{
    pattern: /\b(?:align|offset)=/,
    inside: {
      'operator': /=/
    }
  }, {
    pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
    inside: {
      'punctuation': /\./
    }
  }, /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/],
  'variable': /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
  'number': /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
  'punctuation': /[()]/
};
/* "prismjs/components/prism-yaml" */

Prism.languages.yaml = {
  'scalar': {
    pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
    lookbehind: true,
    alias: 'string'
  },
  'comment': /#.*/,
  'key': {
    pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
    lookbehind: true,
    alias: 'atrule'
  },
  'directive': {
    pattern: /(^[ \t]*)%.+/m,
    lookbehind: true,
    alias: 'important'
  },
  'datetime': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: true,
    alias: 'number'
  },
  'boolean': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
    lookbehind: true,
    alias: 'important'
  },
  'null': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
    lookbehind: true,
    alias: 'important'
  },
  'string': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
    lookbehind: true,
    greedy: true
  },
  'number': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
    lookbehind: true
  },
  'tag': /![^\s]+/,
  'important': /[&*][\w]+/,
  'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
};
Prism.languages.yml = Prism.languages.yaml;
/* harmony default export */ var prism = (Prism);
// CONCATENATED MODULE: ./node_modules/prism-react-renderer/themes/duotoneDark/index.js
// Duotone Dark
// Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
// Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
// Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)
var duotoneDark_theme = {
  plain: {
    backgroundColor: "#2a2734",
    color: "#9a86fd"
  },
  styles: [{
    types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
    style: {
      color: "#6c6783"
    }
  }, {
    types: ["namespace"],
    style: {
      opacity: 0.7
    }
  }, {
    types: ["tag", "operator", "number"],
    style: {
      color: "#e09142"
    }
  }, {
    types: ["property", "function"],
    style: {
      color: "#9a86fd"
    }
  }, {
    types: ["tag-id", "selector", "atrule-id"],
    style: {
      color: "#eeebff"
    }
  }, {
    types: ["attr-name"],
    style: {
      color: "#c4b9fe"
    }
  }, {
    types: ["boolean", "string", "entity", "url", "attr-value", "keyword", "control", "directive", "unit", "statement", "regex", "at-rule", "placeholder", "variable"],
    style: {
      color: "#ffcc99"
    }
  }, {
    types: ["deleted"],
    style: {
      textDecorationLine: "line-through"
    }
  }, {
    types: ["inserted"],
    style: {
      textDecorationLine: "underline"
    }
  }, {
    types: ["italic"],
    style: {
      fontStyle: "italic"
    }
  }, {
    types: ["important", "bold"],
    style: {
      fontWeight: "bold"
    }
  }, {
    types: ["important"],
    style: {
      color: "#c4b9fe"
    }
  }]
};
/* harmony default export */ var duotoneDark = (duotoneDark_theme);
// CONCATENATED MODULE: ./node_modules/prism-react-renderer/dist/index.js




var defaultProps = {
  // $FlowFixMe
  Prism: prism,
  theme: duotoneDark
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var newlineRe = /\r\n|\r|\n/; // Empty lines need to contain a single empty token, denoted with { empty: true }

var normalizeEmptyLines = function normalizeEmptyLines(line) {
  if (line.length === 0) {
    line.push({
      types: ["plain"],
      content: "",
      empty: true
    });
  } else if (line.length === 1 && line[0].content === "") {
    line[0].empty = true;
  }
};

var appendTypes = function appendTypes(types, add) {
  var typesSize = types.length;

  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types;
  }

  return types.concat(add);
}; // Takes an array of Prism's tokens and groups them by line, turning plain
// strings into tokens as well. Tokens can become recursive in some cases,
// which means that their types are concatenated. Plain-string tokens however
// are always of type "plain".
// This is not recursive to avoid exceeding the call-stack limit, since it's unclear
// how nested Prism's tokens can become


var normalizeTokens = function normalizeTokens(tokens) {
  var typeArrStack = [[]];
  var tokenArrStack = [tokens];
  var tokenArrIndexStack = [0];
  var tokenArrSizeStack = [tokens.length];
  var i = 0;
  var stackIndex = 0;
  var currentLine = [];
  var acc = [currentLine];

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      var content = void 0;
      var types = typeArrStack[stackIndex];
      var tokenArr = tokenArrStack[stackIndex];
      var token = tokenArr[i]; // Determine content and append type to types if necessary

      if (typeof token === "string") {
        types = stackIndex > 0 ? types : ["plain"];
        content = token;
      } else {
        types = appendTypes(types, token.type);

        if (token.alias) {
          types = appendTypes(types, token.alias);
        }

        content = token.content;
      } // If token.content is an array, increase the stack depth and repeat this while-loop


      if (typeof content !== "string") {
        stackIndex++;
        typeArrStack.push(types);
        tokenArrStack.push(content);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        continue;
      } // Split by newlines


      var splitByNewlines = content.split(newlineRe);
      var newlineCount = splitByNewlines.length;
      currentLine.push({
        types: types,
        content: splitByNewlines[0]
      }); // Create a new line for each string on a new line

      for (var i$1 = 1; i$1 < newlineCount; i$1++) {
        normalizeEmptyLines(currentLine);
        acc.push(currentLine = []);
        currentLine.push({
          types: types,
          content: splitByNewlines[i$1]
        });
      }
    } // Decreate the stack depth


    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  normalizeEmptyLines(currentLine);
  return acc;
};

var themeToDict = function themeToDict(theme, language) {
  var plain = theme.plain; // $FlowFixMe

  var base = Object.create(null);
  var themeDict = theme.styles.reduce(function (acc, themeEntry) {
    var languages = themeEntry.languages;
    var style = themeEntry.style;

    if (languages && !languages.includes(language)) {
      return acc;
    }

    themeEntry.types.forEach(function (type) {
      // $FlowFixMe
      var accStyle = _extends({}, acc[type], style);

      acc[type] = accStyle;
    });
    return acc;
  }, base); // $FlowFixMe

  themeDict.root = plain; // $FlowFixMe

  themeDict.plain = _extends({}, plain, {
    backgroundColor: null
  });
  return themeDict;
};

function objectWithoutProperties(obj, exclude) {
  var target = {};

  for (var k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];
  }

  return target;
}

var Highlight = /*@__PURE__*/function (Component) {
  function Highlight() {
    var this$1 = this;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    Component.apply(this, args);

    _defineProperty(this, "getThemeDict", function (props) {
      if (this$1.themeDict !== undefined && props.theme === this$1.prevTheme && props.language === this$1.prevLanguage) {
        return this$1.themeDict;
      }

      this$1.prevTheme = props.theme;
      this$1.prevLanguage = props.language;
      var themeDict = props.theme ? themeToDict(props.theme, props.language) : undefined;
      return this$1.themeDict = themeDict;
    });

    _defineProperty(this, "getLineProps", function (ref) {
      var key = ref.key;
      var className = ref.className;
      var style = ref.style;
      var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "line"]);
      var rest = rest$1;

      var output = _extends({}, rest, {
        className: "token-line",
        style: undefined,
        key: undefined
      });

      var themeDict = this$1.getThemeDict(this$1.props);

      if (themeDict !== undefined) {
        output.style = themeDict.plain;
      }

      if (style !== undefined) {
        output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
      }

      if (key !== undefined) {
        output.key = key;
      }

      if (className) {
        output.className += " " + className;
      }

      return output;
    });

    _defineProperty(this, "getStyleForToken", function (ref) {
      var types = ref.types;
      var empty = ref.empty;
      var typesSize = types.length;
      var themeDict = this$1.getThemeDict(this$1.props);

      if (themeDict === undefined) {
        return undefined;
      } else if (typesSize === 1 && types[0] === "plain") {
        return empty ? {
          display: "inline-block"
        } : undefined;
      } else if (typesSize === 1 && !empty) {
        return themeDict[types[0]];
      }

      var baseStyle = empty ? {
        display: "inline-block"
      } : {}; // $FlowFixMe

      var typeStyles = types.map(function (type) {
        return themeDict[type];
      });
      return Object.assign.apply(Object, [baseStyle].concat(typeStyles));
    });

    _defineProperty(this, "getTokenProps", function (ref) {
      var key = ref.key;
      var className = ref.className;
      var style = ref.style;
      var token = ref.token;
      var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "token"]);
      var rest = rest$1;

      var output = _extends({}, rest, {
        className: "token " + token.types.join(" "),
        children: token.content,
        style: this$1.getStyleForToken(token),
        key: undefined
      });

      if (style !== undefined) {
        output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
      }

      if (key !== undefined) {
        output.key = key;
      }

      if (className) {
        output.className += " " + className;
      }

      return output;
    });
  }

  if (Component) Highlight.__proto__ = Component;
  Highlight.prototype = Object.create(Component && Component.prototype);
  Highlight.prototype.constructor = Highlight;

  Highlight.prototype.render = function render() {
    var ref = this.props;
    var Prism = ref.Prism;
    var language = ref.language;
    var code = ref.code;
    var children = ref.children;
    var themeDict = this.getThemeDict(this.props);
    var grammar = Prism.languages[language];
    var mixedTokens = grammar !== undefined ? Prism.tokenize(code, grammar, language) : [code];
    var tokens = normalizeTokens(mixedTokens);
    return children({
      tokens: tokens,
      className: "prism-code language-" + language,
      style: themeDict !== undefined ? themeDict.root : {},
      getLineProps: this.getLineProps,
      getTokenProps: this.getTokenProps
    });
  };

  return Highlight;
}(react["Component"]);

/* harmony default export */ var dist = (Highlight);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Menu.js
var Menu = __webpack_require__(1022);
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var esm_objectWithoutProperties = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 2 modules
var withStyles = __webpack_require__(65);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Paper/Paper.js






var Paper_styles = function styles(theme) {
  var elevations = {};
  theme.shadows.forEach(function (shadow, index) {
    elevations["elevation".concat(index)] = {
      boxShadow: shadow
    };
  });
  return Object(esm_extends["a" /* default */])({
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('box-shadow')
    },

    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      border: "1px solid ".concat(theme.palette.divider)
    }
  }, elevations);
};
var Paper_Paper = /*#__PURE__*/react["forwardRef"](function Paper(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$square = props.square,
      square = _props$square === void 0 ? false : _props$square,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 1 : _props$elevation,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'elevation' : _props$variant,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["classes", "className", "component", "square", "elevation", "variant"]);

  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className, variant === 'outlined' ? classes.outlined : classes["elevation".concat(elevation)], !square && classes.rounded),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Paper_Paper = (Object(withStyles["a" /* default */])(Paper_styles, {
  name: 'MuiPaper'
})(Paper_Paper));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ScopedCssBaseline/ScopedCssBaseline.js + 1 modules
var ScopedCssBaseline = __webpack_require__(1107);

// EXTERNAL MODULE: ./node_modules/react-simple-code-editor/lib/index.js
var lib = __webpack_require__(575);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./.cache/create-react-context.js
var create_react_context = __webpack_require__(268);
var create_react_context_default = /*#__PURE__*/__webpack_require__.n(create_react_context);

// EXTERNAL MODULE: ./node_modules/buble/dist/buble-browser.es.js
var buble_browser_es = __webpack_require__(576);

// EXTERNAL MODULE: ./node_modules/react-live/node_modules/core-js/fn/object/assign.js
var object_assign = __webpack_require__(996);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/react-live/dist/react-live.es.js






var react_live_es_theme = {
  plain: {
    color: '#C5C8C6',
    backgroundColor: '#1D1F21'
  },
  styles: [{
    types: ['prolog', 'comment', 'doctype', 'cdata'],
    style: {
      color: 'hsl(30, 20%, 50%)'
    }
  }, {
    types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
    style: {
      color: 'hsl(350, 40%, 70%)'
    }
  }, {
    types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
    style: {
      color: 'hsl(75, 70%, 60%)'
    }
  }, {
    types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
    style: {
      color: 'hsl(40, 90%, 60%)'
    }
  }, {
    types: ['deleted'],
    style: {
      color: 'rgb(255, 85, 85)'
    }
  }, {
    types: ['italic'],
    style: {
      fontStyle: 'italic'
    }
  }, {
    types: ['important', 'bold'],
    style: {
      fontWeight: 'bold'
    }
  }, {
    types: ['regex', 'important'],
    style: {
      color: '#e90'
    }
  }, {
    types: ['atrule', 'attr-value', 'keyword'],
    style: {
      color: 'hsl(350, 40%, 70%)'
    }
  }, {
    types: ['punctuation', 'symbol'],
    style: {
      opacity: '0.7'
    }
  }]
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var react_live_es_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var react_live_es_objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var react_live_es_CodeEditor = function (_Component) {
  inherits(CodeEditor, _Component);

  function CodeEditor() {
    var _temp, _this, _ret;

    classCallCheck(this, CodeEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      code: ''
    }, _this.updateContent = function (code) {
      _this.setState({
        code: code
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(_this.state.code);
        }
      });
    }, _this.highlightCode = function (code) {
      return react_default.a.createElement(dist, {
        Prism: prism,
        code: code,
        theme: _this.props.theme || react_live_es_theme,
        language: _this.props.language
      }, function (_ref) {
        var tokens = _ref.tokens,
            getLineProps = _ref.getLineProps,
            getTokenProps = _ref.getTokenProps;
        return react_default.a.createElement(react["Fragment"], null, tokens.map(function (line, i) {
          return (// eslint-disable-next-line react/jsx-key
            react_default.a.createElement('div', getLineProps({
              line: line,
              key: i
            }), line.map(function (token, key) {
              return (// eslint-disable-next-line react/jsx-key
                react_default.a.createElement('span', getTokenProps({
                  token: token,
                  key: key
                }))
              );
            }))
          );
        }));
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  CodeEditor.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.code !== state.prevCodeProp) {
      return {
        code: props.code,
        prevCodeProp: props.code
      };
    }

    return null;
  };

  CodeEditor.prototype.render = function render() {
    // eslint-disable-next-line no-unused-vars
    var _props = this.props,
        style = _props.style,
        _code = _props.code,
        onChange = _props.onChange,
        language = _props.language,
        theme$$1 = _props.theme,
        rest = react_live_es_objectWithoutProperties(_props, ['style', 'code', 'onChange', 'language', 'theme']);
    var code = this.state.code;
    var baseTheme = theme$$1 && _typeof(theme$$1.plain) === 'object' ? theme$$1.plain : {};
    return react_default.a.createElement(lib_default.a, react_live_es_extends({
      value: code,
      padding: 10,
      highlight: this.highlightCode,
      onValueChange: this.updateContent,
      style: react_live_es_extends({
        whiteSpace: 'pre',
        fontFamily: 'monospace'
      }, baseTheme, style)
    }, rest));
  };

  return CodeEditor;
}(react["Component"]);

var LiveContext = create_react_context_default()({});
var _poly = {
  assign: assign_default.a
};
var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var react_live_es_transform$1 = function transform$1(code) {
  return Object(buble_browser_es["a" /* transform */])(code, opts).code;
};

var react_live_es_errorBoundary = function errorBoundary(Element, errorCallback) {
  return function (_Component) {
    inherits(ErrorBoundary, _Component);

    function ErrorBoundary() {
      classCallCheck(this, ErrorBoundary);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error);
    };

    ErrorBoundary.prototype.render = function render() {
      return typeof Element === 'function' ? react_default.a.createElement(Element, null) : Element;
    };

    return ErrorBoundary;
  }(react["Component"]);
};

var react_live_es_evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  }); // eslint-disable-next-line no-new-func

  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, react_default.a].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope; // NOTE: Remove trailing semicolon to get an actual expression.

  var codeTrimmed = code.trim().replace(/;$/, ''); // NOTE: Workaround for classes and arrow functions.

  var transformed = react_live_es_transform$1('return (' + codeTrimmed + ')').trim();
  return react_live_es_errorBoundary(react_live_es_evalCode(transformed, scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback // eslint-disable-next-line consistent-return
) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    if (typeof element === 'undefined') {
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'));
    } else {
      resultCallback(react_live_es_errorBoundary(element, errorCallback));
    }
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  react_live_es_evalCode(react_live_es_transform$1(code), react_live_es_extends({}, scope, {
    render: render
  }));
};

var react_live_es_LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({
        code: code,
        scope: scope,
        transformCode: transformCode,
        noInline: noInline
      });
    }, _this.onError = function (error) {
      _this.setState({
        error: error.toString()
      });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline; // Transpilation arguments

      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };

      var errorCallback = function errorCallback(err) {
        return _this.setState({
          element: undefined,
          error: err.toString()
        });
      };

      var renderElement = function renderElement(element) {
        return _this.setState(react_live_es_extends({}, state, {
          element: element
        }));
      }; // State reset object


      var state = {
        unsafeWrapperError: undefined,
        error: undefined
      };

      try {
        if (noInline) {
          _this.setState(react_live_es_extends({}, state, {
            element: null
          })); // Reset output for async (no inline) evaluation


          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(react_live_es_extends({}, state, {
          error: error.toString()
        }));
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  } // eslint-disable-next-line camelcase


  LiveProvider.prototype.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;
    this.transpile({
      code: code,
      scope: scope,
      transformCode: transformCode,
      noInline: noInline
    });
  };

  LiveProvider.prototype.componentDidUpdate = function componentDidUpdate(_ref2) {
    var prevCode = _ref2.code,
        prevScope = _ref2.scope,
        prevNoInline = _ref2.noInline,
        prevTransformCode = _ref2.transformCode;
    var _props2 = this.props,
        code = _props2.code,
        scope = _props2.scope,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode;

    if (code !== prevCode || scope !== prevScope || noInline !== prevNoInline || transformCode !== prevTransformCode) {
      this.transpile({
        code: code,
        scope: scope,
        transformCode: transformCode,
        noInline: noInline
      });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props3 = this.props,
        children = _props3.children,
        code = _props3.code,
        language = _props3.language,
        theme = _props3.theme,
        disabled = _props3.disabled;
    return react_default.a.createElement(LiveContext.Provider, {
      value: react_live_es_extends({}, this.state, {
        code: code,
        language: language,
        theme: theme,
        disabled: disabled,
        onError: this.onError,
        onChange: this.onChange
      })
    }, children);
  };

  return LiveProvider;
}(react["Component"]);

react_live_es_LiveProvider.defaultProps = {
  code: '',
  noInline: false,
  language: 'jsx',
  disabled: false
};

function LiveEditor(props) {
  return react_default.a.createElement(LiveContext.Consumer, null, function (_ref) {
    var code = _ref.code,
        language = _ref.language,
        theme = _ref.theme,
        disabled = _ref.disabled,
        onChange = _ref.onChange;
    return react_default.a.createElement(react_live_es_CodeEditor, react_live_es_extends({
      theme: theme,
      code: code,
      language: language,
      disabled: disabled,
      onChange: onChange
    }, props));
  });
}

function LiveError(props) {
  return react_default.a.createElement(LiveContext.Consumer, null, function (_ref) {
    var error = _ref.error;
    return error ? react_default.a.createElement('pre', props, error) : null;
  });
}

function LivePreview(_ref) {
  var Component$$1 = _ref.Component,
      rest = react_live_es_objectWithoutProperties(_ref, ['Component']);
  return react_default.a.createElement(Component$$1, rest, react_default.a.createElement(LiveContext.Consumer, null, function (_ref2) {
    var Element = _ref2.element;
    return Element && react_default.a.createElement(Element, null);
  }));
}

LivePreview.defaultProps = {
  Component: 'div'
};

function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var _this2 = this;

      return react_default.a.createElement(LiveContext.Consumer, null, function (live) {
        return react_default.a.createElement(WrappedComponent, react_live_es_extends({
          live: live
        }, _this2.props));
      });
    };

    return WithLive;
  }(react["Component"]);

  return WithLive;
}


// EXTERNAL MODULE: ./src/components/codeEditor/themes/prism-synthwave84.css
var prism_synthwave84 = __webpack_require__(574);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Card/Card.js






var Card_styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden'
  }
};
var Card_Card = /*#__PURE__*/react["forwardRef"](function Card(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$raised = props.raised,
      raised = _props$raised === void 0 ? false : _props$raised,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["classes", "className", "raised"]);

  return /*#__PURE__*/react["createElement"](esm_Paper_Paper, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className),
    elevation: raised ? 8 : 1,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Card_Card = (Object(withStyles["a" /* default */])(Card_styles, {
  name: 'MuiCard'
})(Card_Card));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/capitalize.js
var capitalize = __webpack_require__(131);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/AppBar/AppBar.js







var AppBar_styles = function styles(theme) {
  var backgroundColorDefault = theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
      // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0
    },

    /* Styles applied to the root element if `position="fixed"`. */
    positionFixed: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0,
      '@media print': {
        // Prevent the app bar to be visible on each printed page.
        position: 'absolute'
      }
    },

    /* Styles applied to the root element if `position="absolute"`. */
    positionAbsolute: {
      position: 'absolute',
      top: 0,
      left: 'auto',
      right: 0
    },

    /* Styles applied to the root element if `position="sticky"`. */
    positionSticky: {
      // ⚠️ sticky is not supported by IE 11.
      position: 'sticky',
      top: 0,
      left: 'auto',
      right: 0
    },

    /* Styles applied to the root element if `position="static"`. */
    positionStatic: {
      position: 'static'
    },

    /* Styles applied to the root element if `position="relative"`. */
    positionRelative: {
      position: 'relative'
    },

    /* Styles applied to the root element if `color="default"`. */
    colorDefault: {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault)
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },

    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: 'inherit'
    },

    /* Styles applied to the root element if `color="transparent"`. */
    colorTransparent: {
      backgroundColor: 'transparent',
      color: 'inherit'
    }
  };
};
var AppBar_AppBar = /*#__PURE__*/react["forwardRef"](function AppBar(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$position = props.position,
      position = _props$position === void 0 ? 'fixed' : _props$position,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["classes", "className", "color", "position"]);

  return /*#__PURE__*/react["createElement"](esm_Paper_Paper, Object(esm_extends["a" /* default */])({
    square: true,
    component: "header",
    elevation: 4,
    className: Object(clsx_m["a" /* default */])(classes.root, classes["position".concat(Object(capitalize["a" /* default */])(position))], classes["color".concat(Object(capitalize["a" /* default */])(color))], className, position === 'fixed' && 'mui-fixed'),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_AppBar_AppBar = (Object(withStyles["a" /* default */])(AppBar_styles, {
  name: 'MuiAppBar'
})(AppBar_AppBar));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js






var Toolbar_styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },

    /* Styles applied to the root element if `disableGutters={false}`. */
    gutters: Object(defineProperty["a" /* default */])({
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }, theme.breakpoints.up('sm'), {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }),

    /* Styles applied to the root element if `variant="regular"`. */
    regular: theme.mixins.toolbar,

    /* Styles applied to the root element if `variant="dense"`. */
    dense: {
      minHeight: 48
    }
  };
};
var Toolbar_Toolbar = /*#__PURE__*/react["forwardRef"](function Toolbar(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'regular' : _props$variant,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["classes", "className", "component", "disableGutters", "variant"]);

  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, classes[variant], className, !disableGutters && classes.gutters),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Toolbar_Toolbar = (Object(withStyles["a" /* default */])(Toolbar_styles, {
  name: 'MuiToolbar'
})(Toolbar_Toolbar));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/colorManipulator.js
var colorManipulator = __webpack_require__(206);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ButtonBase/ButtonBase.js + 7 modules
var ButtonBase = __webpack_require__(1124);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/IconButton/IconButton.js









var IconButton_styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: theme.typography.pxToRem(24),
      padding: 12,
      borderRadius: '50%',
      overflow: 'visible',
      // Explicitly set the default value to solve a bug on IE 11.
      color: theme.palette.action.active,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      '&:hover': {
        backgroundColor: Object(colorManipulator["b" /* fade */])(theme.palette.action.active, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$disabled': {
        backgroundColor: 'transparent',
        color: theme.palette.action.disabled
      }
    },

    /* Styles applied to the root element if `edge="start"`. */
    edgeStart: {
      marginLeft: -12,
      '$sizeSmall&': {
        marginLeft: -3
      }
    },

    /* Styles applied to the root element if `edge="end"`. */
    edgeEnd: {
      marginRight: -12,
      '$sizeSmall&': {
        marginRight: -3
      }
    },

    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: 'inherit'
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: Object(colorManipulator["b" /* fade */])(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: Object(colorManipulator["b" /* fade */])(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: 3,
      fontSize: theme.typography.pxToRem(18)
    },

    /* Styles applied to the children container element. */
    label: {
      width: '100%',
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    }
  };
};
/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 */

var IconButton_IconButton = /*#__PURE__*/react["forwardRef"](function IconButton(props, ref) {
  var _props$edge = props.edge,
      edge = _props$edge === void 0 ? false : _props$edge,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["edge", "children", "classes", "className", "color", "disabled", "disableFocusRipple", "size"]);

  return /*#__PURE__*/react["createElement"](ButtonBase["a" /* default */], Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className, color !== 'default' && classes["color".concat(Object(capitalize["a" /* default */])(color))], disabled && classes.disabled, size === "small" && classes["size".concat(Object(capitalize["a" /* default */])(size))], {
      'start': classes.edgeStart,
      'end': classes.edgeEnd
    }[edge]),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    ref: ref
  }, other), /*#__PURE__*/react["createElement"]("span", {
    className: classes.label
  }, children));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_IconButton_IconButton = (Object(withStyles["a" /* default */])(IconButton_styles, {
  name: 'MuiIconButton'
})(IconButton_IconButton));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js






var Typography_styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      margin: 0
    },

    /* Styles applied to the root element if `variant="body2"`. */
    body2: theme.typography.body2,

    /* Styles applied to the root element if `variant="body1"`. */
    body1: theme.typography.body1,

    /* Styles applied to the root element if `variant="caption"`. */
    caption: theme.typography.caption,

    /* Styles applied to the root element if `variant="button"`. */
    button: theme.typography.button,

    /* Styles applied to the root element if `variant="h1"`. */
    h1: theme.typography.h1,

    /* Styles applied to the root element if `variant="h2"`. */
    h2: theme.typography.h2,

    /* Styles applied to the root element if `variant="h3"`. */
    h3: theme.typography.h3,

    /* Styles applied to the root element if `variant="h4"`. */
    h4: theme.typography.h4,

    /* Styles applied to the root element if `variant="h5"`. */
    h5: theme.typography.h5,

    /* Styles applied to the root element if `variant="h6"`. */
    h6: theme.typography.h6,

    /* Styles applied to the root element if `variant="subtitle1"`. */
    subtitle1: theme.typography.subtitle1,

    /* Styles applied to the root element if `variant="subtitle2"`. */
    subtitle2: theme.typography.subtitle2,

    /* Styles applied to the root element if `variant="overline"`. */
    overline: theme.typography.overline,

    /* Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers. */
    srOnly: {
      position: 'absolute',
      height: 1,
      width: 1,
      overflow: 'hidden'
    },

    /* Styles applied to the root element if `align="left"`. */
    alignLeft: {
      textAlign: 'left'
    },

    /* Styles applied to the root element if `align="center"`. */
    alignCenter: {
      textAlign: 'center'
    },

    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: 'right'
    },

    /* Styles applied to the root element if `align="justify"`. */
    alignJustify: {
      textAlign: 'justify'
    },

    /* Styles applied to the root element if `nowrap={true}`. */
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the root element if `gutterBottom={true}`. */
    gutterBottom: {
      marginBottom: '0.35em'
    },

    /* Styles applied to the root element if `paragraph={true}`. */
    paragraph: {
      marginBottom: 16
    },

    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: 'inherit'
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: theme.palette.primary.main
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: theme.palette.secondary.main
    },

    /* Styles applied to the root element if `color="textPrimary"`. */
    colorTextPrimary: {
      color: theme.palette.text.primary
    },

    /* Styles applied to the root element if `color="textSecondary"`. */
    colorTextSecondary: {
      color: theme.palette.text.secondary
    },

    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: theme.palette.error.main
    },

    /* Styles applied to the root element if `display="inline"`. */
    displayInline: {
      display: 'inline'
    },

    /* Styles applied to the root element if `display="block"`. */
    displayBlock: {
      display: 'block'
    }
  };
};
var defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p'
};
var Typography_Typography = /*#__PURE__*/react["forwardRef"](function Typography(props, ref) {
  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'initial' : _props$color,
      component = props.component,
      _props$display = props.display,
      display = _props$display === void 0 ? 'initial' : _props$display,
      _props$gutterBottom = props.gutterBottom,
      gutterBottom = _props$gutterBottom === void 0 ? false : _props$gutterBottom,
      _props$noWrap = props.noWrap,
      noWrap = _props$noWrap === void 0 ? false : _props$noWrap,
      _props$paragraph = props.paragraph,
      paragraph = _props$paragraph === void 0 ? false : _props$paragraph,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'body1' : _props$variant,
      _props$variantMapping = props.variantMapping,
      variantMapping = _props$variantMapping === void 0 ? defaultVariantMapping : _props$variantMapping,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["align", "classes", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]);

  var Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className, variant !== 'inherit' && classes[variant], color !== 'initial' && classes["color".concat(Object(capitalize["a" /* default */])(color))], noWrap && classes.noWrap, gutterBottom && classes.gutterBottom, paragraph && classes.paragraph, align !== 'inherit' && classes["align".concat(Object(capitalize["a" /* default */])(align))], display !== 'initial' && classes["display".concat(Object(capitalize["a" /* default */])(display))]),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Typography_Typography = (Object(withStyles["a" /* default */])(Typography_styles, {
  name: 'MuiTypography'
})(Typography_Typography));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__(1120);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/merge.js
var merge = __webpack_require__(156);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/css.js





function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}

function css(styleFunction) {
  var newStyleFunction = function newStyleFunction(props) {
    var output = styleFunction(props);

    if (props.css) {
      return Object(esm_extends["a" /* default */])(Object(esm_extends["a" /* default */])({}, Object(merge["a" /* default */])(output, styleFunction(Object(esm_extends["a" /* default */])({
        theme: props.theme
      }, props.css)))), omit(props.css, [styleFunction.filterProps]));
    }

    return output;
  };

  newStyleFunction.propTypes =  false ? undefined : {};
  newStyleFunction.filterProps = ['css'].concat(Object(toConsumableArray["a" /* default */])(styleFunction.filterProps));
  return newStyleFunction;
}

/* harmony default export */ var esm_css = (css);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/compose.js



function compose() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var fn = function fn(props) {
    return styles.reduce(function (acc, style) {
      var output = style(props);

      if (output) {
        return Object(merge["a" /* default */])(acc, output);
      }

      return acc;
    }, {});
  }; // Alternative approach that doesn't yield any performance gain.
  // const handlers = styles.reduce((acc, style) => {
  //   style.filterProps.forEach(prop => {
  //     acc[prop] = style;
  //   });
  //   return acc;
  // }, {});
  // const fn = props => {
  //   return Object.keys(props).reduce((acc, prop) => {
  //     if (handlers[prop]) {
  //       return merge(acc, handlers[prop](props));
  //     }
  //     return acc;
  //   }, {});
  // };


  fn.propTypes =  false ? undefined : {};
  fn.filterProps = styles.reduce(function (acc, style) {
    return acc.concat(style.filterProps);
  }, []);
  return fn;
}

/* harmony default export */ var esm_compose = (compose);
// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/breakpoints.js
var breakpoints = __webpack_require__(265);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/style.js




function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce(function (acc, item) {
    return acc && acc[item] ? acc[item] : null;
  }, obj);
}

function style_style(options) {
  var prop = options.prop,
      _options$cssProperty = options.cssProperty,
      cssProperty = _options$cssProperty === void 0 ? options.prop : _options$cssProperty,
      themeKey = options.themeKey,
      transform = options.transform;

  var fn = function fn(props) {
    if (props[prop] == null) {
      return null;
    }

    var propValue = props[prop];
    var theme = props.theme;
    var themeMapping = getPath(theme, themeKey) || {};

    var styleFromPropValue = function styleFromPropValue(propValueFinal) {
      var value;

      if (typeof themeMapping === 'function') {
        value = themeMapping(propValueFinal);
      } else if (Array.isArray(themeMapping)) {
        value = themeMapping[propValueFinal] || propValueFinal;
      } else {
        value = getPath(themeMapping, propValueFinal) || propValueFinal;

        if (transform) {
          value = transform(value);
        }
      }

      if (cssProperty === false) {
        return value;
      }

      return Object(defineProperty["a" /* default */])({}, cssProperty, value);
    };

    return Object(breakpoints["a" /* handleBreakpoints */])(props, propValue, styleFromPropValue);
  };

  fn.propTypes =  false ? undefined : {};
  fn.filterProps = [prop];
  return fn;
}

/* harmony default export */ var esm_style = (style_style);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/borders.js



function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return "".concat(value, "px solid");
}

var border = esm_style({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
var borderTop = esm_style({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
var borderRight = esm_style({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
var borderBottom = esm_style({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
var borderLeft = esm_style({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
var borderColor = esm_style({
  prop: 'borderColor',
  themeKey: 'palette'
});
var borderRadius = esm_style({
  prop: 'borderRadius',
  themeKey: 'shape'
});
var borders = esm_compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius);
/* harmony default export */ var esm_borders = (borders);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/display.js


var displayPrint = esm_style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: function transform(value) {
    return {
      '@media print': {
        display: value
      }
    };
  }
});
var displayRaw = esm_style({
  prop: 'display'
});
var overflow = esm_style({
  prop: 'overflow'
});
var textOverflow = esm_style({
  prop: 'textOverflow'
});
var visibility = esm_style({
  prop: 'visibility'
});
var whiteSpace = esm_style({
  prop: 'whiteSpace'
});
/* harmony default export */ var esm_display = (esm_compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace));
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/flexbox.js


var flexBasis = esm_style({
  prop: 'flexBasis'
});
var flexDirection = esm_style({
  prop: 'flexDirection'
});
var flexWrap = esm_style({
  prop: 'flexWrap'
});
var justifyContent = esm_style({
  prop: 'justifyContent'
});
var flexbox_alignItems = esm_style({
  prop: 'alignItems'
});
var flexbox_alignContent = esm_style({
  prop: 'alignContent'
});
var order = esm_style({
  prop: 'order'
});
var flex = esm_style({
  prop: 'flex'
});
var flexGrow = esm_style({
  prop: 'flexGrow'
});
var flexShrink = esm_style({
  prop: 'flexShrink'
});
var alignSelf = esm_style({
  prop: 'alignSelf'
});
var justifyItems = esm_style({
  prop: 'justifyItems'
});
var justifySelf = esm_style({
  prop: 'justifySelf'
});
var flexbox = esm_compose(flexBasis, flexDirection, flexWrap, justifyContent, flexbox_alignItems, flexbox_alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
/* harmony default export */ var esm_flexbox = (flexbox);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/grid.js


var gridGap = esm_style({
  prop: 'gridGap'
});
var gridColumnGap = esm_style({
  prop: 'gridColumnGap'
});
var gridRowGap = esm_style({
  prop: 'gridRowGap'
});
var gridColumn = esm_style({
  prop: 'gridColumn'
});
var gridRow = esm_style({
  prop: 'gridRow'
});
var gridAutoFlow = esm_style({
  prop: 'gridAutoFlow'
});
var gridAutoColumns = esm_style({
  prop: 'gridAutoColumns'
});
var gridAutoRows = esm_style({
  prop: 'gridAutoRows'
});
var gridTemplateColumns = esm_style({
  prop: 'gridTemplateColumns'
});
var gridTemplateRows = esm_style({
  prop: 'gridTemplateRows'
});
var gridTemplateAreas = esm_style({
  prop: 'gridTemplateAreas'
});
var gridArea = esm_style({
  prop: 'gridArea'
});
var grid = esm_compose(gridGap, gridColumnGap, gridRowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
/* harmony default export */ var esm_grid = (grid);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/positions.js


var positions_position = esm_style({
  prop: 'position'
});
var zIndex = esm_style({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
var positions_top = esm_style({
  prop: 'top'
});
var right = esm_style({
  prop: 'right'
});
var bottom = esm_style({
  prop: 'bottom'
});
var left = esm_style({
  prop: 'left'
});
/* harmony default export */ var positions = (esm_compose(positions_position, zIndex, positions_top, right, bottom, left));
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/palette.js


var palette_color = esm_style({
  prop: 'color',
  themeKey: 'palette'
});
var bgcolor = esm_style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
var palette = esm_compose(palette_color, bgcolor);
/* harmony default export */ var esm_palette = (palette);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/shadows.js

var boxShadow = esm_style({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
/* harmony default export */ var shadows = (boxShadow);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/sizing.js



function sizing_transform(value) {
  return value <= 1 ? "".concat(value * 100, "%") : value;
}

var width = esm_style({
  prop: 'width',
  transform: sizing_transform
});
var maxWidth = esm_style({
  prop: 'maxWidth',
  transform: sizing_transform
});
var minWidth = esm_style({
  prop: 'minWidth',
  transform: sizing_transform
});
var height = esm_style({
  prop: 'height',
  transform: sizing_transform
});
var maxHeight = esm_style({
  prop: 'maxHeight',
  transform: sizing_transform
});
var minHeight = esm_style({
  prop: 'minHeight',
  transform: sizing_transform
});
var sizeWidth = esm_style({
  prop: 'size',
  cssProperty: 'width',
  transform: sizing_transform
});
var sizeHeight = esm_style({
  prop: 'size',
  cssProperty: 'height',
  transform: sizing_transform
});
var boxSizing = esm_style({
  prop: 'boxSizing'
});
var sizing = esm_compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
/* harmony default export */ var esm_sizing = (sizing);
// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/spacing.js + 1 modules
var esm_spacing = __webpack_require__(1129);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/typography.js


var fontFamily = esm_style({
  prop: 'fontFamily',
  themeKey: 'typography'
});
var fontSize = esm_style({
  prop: 'fontSize',
  themeKey: 'typography'
});
var fontStyle = esm_style({
  prop: 'fontStyle',
  themeKey: 'typography'
});
var fontWeight = esm_style({
  prop: 'fontWeight',
  themeKey: 'typography'
});
var letterSpacing = esm_style({
  prop: 'letterSpacing'
});
var lineHeight = esm_style({
  prop: 'lineHeight'
});
var textAlign = esm_style({
  prop: 'textAlign'
});
var typography_typography = esm_compose(fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
/* harmony default export */ var esm_typography = (typography_typography);
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(208);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js + 21 modules
var makeStyles = __webpack_require__(1123);

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/styled/styled.js








function styled_omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
} // styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.


function styled_styled(Component) {
  var componentCreator = function componentCreator(style) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var name = options.name,
        stylesOptions = Object(esm_objectWithoutProperties["a" /* default */])(options, ["name"]);

    if (false) {}

    var classNamePrefix = name;

    if (false) { var displayName; }

    var stylesOrCreator = typeof style === 'function' ? function (theme) {
      return {
        root: function root(props) {
          return style(Object(esm_extends["a" /* default */])({
            theme: theme
          }, props));
        }
      };
    } : {
      root: style
    };
    var useStyles = Object(makeStyles["a" /* default */])(stylesOrCreator, Object(esm_extends["a" /* default */])({
      Component: Component,
      name: name || Component.displayName,
      classNamePrefix: classNamePrefix
    }, stylesOptions));
    var filterProps;
    var propTypes = {};

    if (style.filterProps) {
      filterProps = style.filterProps;
      delete style.filterProps;
    }
    /* eslint-disable react/forbid-foreign-prop-types */


    if (style.propTypes) {
      propTypes = style.propTypes;
      delete style.propTypes;
    }
    /* eslint-enable react/forbid-foreign-prop-types */


    var StyledComponent = react_default.a.forwardRef(function StyledComponent(props, ref) {
      var children = props.children,
          classNameProp = props.className,
          clone = props.clone,
          ComponentProp = props.component,
          other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["children", "className", "clone", "component"]);

      var classes = useStyles(props);
      var className = Object(clsx_m["a" /* default */])(classes.root, classNameProp);
      var spread = other;

      if (filterProps) {
        spread = styled_omit(spread, filterProps);
      }

      if (clone) {
        return react_default.a.cloneElement(children, Object(esm_extends["a" /* default */])({
          className: Object(clsx_m["a" /* default */])(children.props.className, className)
        }, spread));
      }

      if (typeof children === 'function') {
        return children(Object(esm_extends["a" /* default */])({
          className: className
        }, spread));
      }

      var FinalComponent = ComponentProp || Component;
      return /*#__PURE__*/react_default.a.createElement(FinalComponent, Object(esm_extends["a" /* default */])({
        ref: ref,
        className: className
      }, spread), children);
    });
     false ? undefined : void 0;

    if (false) {}

    hoist_non_react_statics_cjs_default()(StyledComponent, Component);
    return StyledComponent;
  };

  return componentCreator;
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/defaultTheme.js + 18 modules
var defaultTheme = __webpack_require__(380);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/styled.js




var styles_styled_styled = function styled(Component) {
  var componentCreator = styled_styled(Component);
  return function (style, options) {
    return componentCreator(style, Object(esm_extends["a" /* default */])({
      defaultTheme: defaultTheme["a" /* default */]
    }, options));
  };
};

/* harmony default export */ var styles_styled = (styles_styled_styled);
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js


var Box_styleFunction = esm_css(esm_compose(esm_borders, esm_display, esm_flexbox, esm_grid, positions, esm_palette, shadows, esm_sizing, esm_spacing["b" /* default */], esm_typography));
/**
 * @ignore - do not document.
 */

var Box = styles_styled('div')(Box_styleFunction, {
  name: 'MuiBox'
});
/* harmony default export */ var Box_Box = (Box);
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/CardContent/CardContent.js





var CardContent_styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24
    }
  }
};
var CardContent_CardContent = /*#__PURE__*/react["forwardRef"](function CardContent(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["classes", "className", "component"]);

  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_CardContent_CardContent = (Object(withStyles["a" /* default */])(CardContent_styles, {
  name: 'MuiCardContent'
})(CardContent_CardContent));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js

 // A grid component using the following libs as inspiration.
//
// For the implementation:
// - https://getbootstrap.com/docs/4.3/layout/grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/





var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  var styles = {};
  GRID_SIZES.forEach(function (size) {
    var key = "grid-".concat(breakpoint, "-").concat(size);

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%'
      };
      return;
    }

    if (size === 'auto') {
      styles[key] = {
        flexBasis: 'auto',
        flexGrow: 0,
        maxWidth: 'none'
      };
      return;
    } // Keep 7 significant numbers.


    var width = "".concat(Math.round(size / 12 * 10e7) / 10e5, "%"); // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41

    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  }); // No need for a media query for the first size.

  if (breakpoint === 'xs') {
    Object(esm_extends["a" /* default */])(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function getOffset(val) {
  var div = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var parse = parseFloat(val);
  return "".concat(parse / div).concat(String(val).replace(String(parse), '') || 'px');
}

function generateGutter(theme, breakpoint) {
  var styles = {};
  SPACINGS.forEach(function (spacing) {
    var themeSpacing = theme.spacing(spacing);

    if (themeSpacing === 0) {
      return;
    }

    styles["spacing-".concat(breakpoint, "-").concat(spacing)] = {
      margin: "-".concat(getOffset(themeSpacing, 2)),
      width: "calc(100% + ".concat(getOffset(themeSpacing), ")"),
      '& > $item': {
        padding: getOffset(themeSpacing, 2)
      }
    };
  });
  return styles;
} // Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',


var Grid_styles = function styles(theme) {
  return Object(esm_extends["a" /* default */])({
    /* Styles applied to the root element. */
    root: {},

    /* Styles applied to the root element if `container={true}`. */
    container: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },

    /* Styles applied to the root element if `item={true}`. */
    item: {
      boxSizing: 'border-box',
      margin: '0' // For instance, it's useful when used with a `figure` element.

    },

    /* Styles applied to the root element if `zeroMinWidth={true}`. */
    zeroMinWidth: {
      minWidth: 0
    },

    /* Styles applied to the root element if `direction="column"`. */
    'direction-xs-column': {
      flexDirection: 'column'
    },

    /* Styles applied to the root element if `direction="column-reverse"`. */
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse'
    },

    /* Styles applied to the root element if `direction="row-reverse"`. */
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse'
    },

    /* Styles applied to the root element if `wrap="nowrap"`. */
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap'
    },

    /* Styles applied to the root element if `wrap="reverse"`. */
    'wrap-xs-wrap-reverse': {
      flexWrap: 'wrap-reverse'
    },

    /* Styles applied to the root element if `alignItems="center"`. */
    'align-items-xs-center': {
      alignItems: 'center'
    },

    /* Styles applied to the root element if `alignItems="flex-start"`. */
    'align-items-xs-flex-start': {
      alignItems: 'flex-start'
    },

    /* Styles applied to the root element if `alignItems="flex-end"`. */
    'align-items-xs-flex-end': {
      alignItems: 'flex-end'
    },

    /* Styles applied to the root element if `alignItems="baseline"`. */
    'align-items-xs-baseline': {
      alignItems: 'baseline'
    },

    /* Styles applied to the root element if `alignContent="center"`. */
    'align-content-xs-center': {
      alignContent: 'center'
    },

    /* Styles applied to the root element if `alignContent="flex-start"`. */
    'align-content-xs-flex-start': {
      alignContent: 'flex-start'
    },

    /* Styles applied to the root element if `alignContent="flex-end"`. */
    'align-content-xs-flex-end': {
      alignContent: 'flex-end'
    },

    /* Styles applied to the root element if `alignContent="space-between"`. */
    'align-content-xs-space-between': {
      alignContent: 'space-between'
    },

    /* Styles applied to the root element if `alignContent="space-around"`. */
    'align-content-xs-space-around': {
      alignContent: 'space-around'
    },

    /* Styles applied to the root element if `justify="center"`. */
    'justify-xs-center': {
      justifyContent: 'center'
    },

    /* Styles applied to the root element if `justify="flex-end"`. */
    'justify-xs-flex-end': {
      justifyContent: 'flex-end'
    },

    /* Styles applied to the root element if `justify="space-between"`. */
    'justify-xs-space-between': {
      justifyContent: 'space-between'
    },

    /* Styles applied to the root element if `justify="space-around"`. */
    'justify-xs-space-around': {
      justifyContent: 'space-around'
    },

    /* Styles applied to the root element if `justify="space-evenly"`. */
    'justify-xs-space-evenly': {
      justifyContent: 'space-evenly'
    }
  }, generateGutter(theme, 'xs'), theme.breakpoints.keys.reduce(function (accumulator, key) {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};
var Grid_Grid = /*#__PURE__*/react["forwardRef"](function Grid(props, ref) {
  var _props$alignContent = props.alignContent,
      alignContent = _props$alignContent === void 0 ? 'stretch' : _props$alignContent,
      _props$alignItems = props.alignItems,
      alignItems = _props$alignItems === void 0 ? 'stretch' : _props$alignItems,
      classes = props.classes,
      classNameProp = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$container = props.container,
      container = _props$container === void 0 ? false : _props$container,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'row' : _props$direction,
      _props$item = props.item,
      item = _props$item === void 0 ? false : _props$item,
      _props$justify = props.justify,
      justify = _props$justify === void 0 ? 'flex-start' : _props$justify,
      _props$lg = props.lg,
      lg = _props$lg === void 0 ? false : _props$lg,
      _props$md = props.md,
      md = _props$md === void 0 ? false : _props$md,
      _props$sm = props.sm,
      sm = _props$sm === void 0 ? false : _props$sm,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 0 : _props$spacing,
      _props$wrap = props.wrap,
      wrap = _props$wrap === void 0 ? 'wrap' : _props$wrap,
      _props$xl = props.xl,
      xl = _props$xl === void 0 ? false : _props$xl,
      _props$xs = props.xs,
      xs = _props$xs === void 0 ? false : _props$xs,
      _props$zeroMinWidth = props.zeroMinWidth,
      zeroMinWidth = _props$zeroMinWidth === void 0 ? false : _props$zeroMinWidth,
      other = Object(esm_objectWithoutProperties["a" /* default */])(props, ["alignContent", "alignItems", "classes", "className", "component", "container", "direction", "item", "justify", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]);

  var className = Object(clsx_m["a" /* default */])(classes.root, classNameProp, container && [classes.container, spacing !== 0 && classes["spacing-xs-".concat(String(spacing))]], item && classes.item, zeroMinWidth && classes.zeroMinWidth, direction !== 'row' && classes["direction-xs-".concat(String(direction))], wrap !== 'wrap' && classes["wrap-xs-".concat(String(wrap))], alignItems !== 'stretch' && classes["align-items-xs-".concat(String(alignItems))], alignContent !== 'stretch' && classes["align-content-xs-".concat(String(alignContent))], justify !== 'flex-start' && classes["justify-xs-".concat(String(justify))], xs !== false && classes["grid-xs-".concat(String(xs))], sm !== false && classes["grid-sm-".concat(String(sm))], md !== false && classes["grid-md-".concat(String(md))], lg !== false && classes["grid-lg-".concat(String(lg))], xl !== false && classes["grid-xl-".concat(String(xl))]);
  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: className,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
var StyledGrid = Object(withStyles["a" /* default */])(Grid_styles, {
  name: 'MuiGrid'
})(Grid_Grid);

if (false) { var requireProp; }

/* harmony default export */ var esm_Grid_Grid = (StyledGrid);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(95);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js + 1 modules
var wrapNativeSuper = __webpack_require__(113);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}
// CONCATENATED MODULE: ./node_modules/polished/dist/polished.esm.js






function last() {
  var _ref;

  return _ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref];
}

function negation(a) {
  return -a;
}

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function factorial(a) {
  if (a % 1 || !(+a >= 0)) return NaN;
  if (a > 170) return Infinity;else if (a === 0) return 1;else {
    return a * factorial(a - 1);
  }
}

function power(a, b) {
  return Math.pow(a, b);
}

function sqrt(a) {
  return Math.sqrt(a);
}

function max() {
  return Math.max.apply(Math, arguments);
}

function min() {
  return Math.min.apply(Math, arguments);
}

function comma() {
  return Array.of.apply(Array, arguments);
}

var defaultMathSymbols = {
  symbols: {
    '!': {
      postfix: {
        symbol: '!',
        f: factorial,
        notation: 'postfix',
        precedence: 6,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '!',
      regSymbol: '!'
    },
    '^': {
      infix: {
        symbol: '^',
        f: power,
        notation: 'infix',
        precedence: 5,
        rightToLeft: 1,
        argCount: 2
      },
      symbol: '^',
      regSymbol: '\\^'
    },
    '*': {
      infix: {
        symbol: '*',
        f: multiplication,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '*',
      regSymbol: '\\*'
    },
    '/': {
      infix: {
        symbol: '/',
        f: division,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '/',
      regSymbol: '/'
    },
    '+': {
      infix: {
        symbol: '+',
        f: addition,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '+',
        f: last,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '+',
      regSymbol: '\\+'
    },
    '-': {
      infix: {
        symbol: '-',
        f: subtraction,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '-',
        f: negation,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '-',
      regSymbol: '-'
    },
    ',': {
      infix: {
        symbol: ',',
        f: comma,
        notation: 'infix',
        precedence: 1,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: ',',
      regSymbol: ','
    },
    '(': {
      prefix: {
        symbol: '(',
        f: last,
        notation: 'prefix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '(',
      regSymbol: '\\('
    },
    ')': {
      postfix: {
        symbol: ')',
        f: undefined,
        notation: 'postfix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: ')',
      regSymbol: '\\)'
    },
    min: {
      func: {
        symbol: 'min',
        f: min,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'min',
      regSymbol: 'min\\b'
    },
    max: {
      func: {
        symbol: 'max',
        f: max,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'max',
      regSymbol: 'max\\b'
    },
    sqrt: {
      func: {
        symbol: 'sqrt',
        f: sqrt,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'sqrt',
      regSymbol: 'sqrt\\b'
    }
  }
}; // based on https://github.com/styled-components/styled-components/blob/fcf6f3804c57a14dd7984dfab7bc06ee2edca044/src/utils/error.js

/**
 * Parse errors.md and turn it into a simple hash of code: message
 * @private
 */

var ERRORS = {
  "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
  "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
  "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
  "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
  "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
  "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
  "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
  "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
  "9": "Please provide a number of steps to the modularScale helper.\n\n",
  "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "11": "Invalid value passed as base to modularScale, expected number or em string but got \"%s\"\n\n",
  "12": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got \"%s\" instead.\n\n",
  "13": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got \"%s\" instead.\n\n",
  "14": "Passed invalid pixel value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
  "15": "Passed invalid base value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
  "16": "You must provide a template to this method.\n\n",
  "17": "You passed an unsupported selector state to this method.\n\n",
  "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "23": "fontFace expects a name of a font-family.\n\n",
  "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "25": "fontFace expects localFonts to be an array.\n\n",
  "26": "fontFace expects fileFormats to be an array.\n\n",
  "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
  "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
  "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
  "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "35": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
  "36": "Property must be a string value.\n\n",
  "37": "Syntax Error at %s.\n\n",
  "38": "Formula contains a function that needs parentheses at %s.\n\n",
  "39": "Formula is missing closing parenthesis at %s.\n\n",
  "40": "Formula has too many closing parentheses at %s.\n\n",
  "41": "All values in a formula must have the same unit or be unitless.\n\n",
  "42": "Please provide a number of steps to the modularScale helper.\n\n",
  "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
  "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
  "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
  "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
  "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
  "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "53": "fontFace expects localFonts to be an array.\n\n",
  "54": "fontFace expects fileFormats to be an array.\n\n",
  "55": "fontFace expects a name of a font-family.\n\n",
  "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
  "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "61": "Property must be a string value.\n\n",
  "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "63": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
  "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
  "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
  "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
  "67": "You must provide a template to this method.\n\n",
  "68": "You passed an unsupported selector state to this method.\n\n",
  "69": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got %s instead.\n\n",
  "70": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got %s instead.\n\n",
  "71": "Passed invalid pixel value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
  "72": "Passed invalid base value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
  "73": "Please provide a valid CSS variable.\n\n",
  "74": "CSS variable not found.\n"
};
/**
 * super basic version of sprintf
 * @private
 */

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var a = args[0];
  var b = [];
  var c;

  for (c = 1; c < args.length; c += 1) {
    b.push(args[c]);
  }

  b.forEach(function (d) {
    a = a.replace(/%[a-z]/, d);
  });
  return a;
}
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */


var polished_esm_PolishedError = /*#__PURE__*/function (_Error) {
  Object(inheritsLoose["a" /* default */])(PolishedError, _Error);

  function PolishedError(code) {
    var _this;

    if (true) {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    } else { var _len2, args, _key2; }

    return Object(assertThisInitialized["a" /* default */])(_this);
  }

  return PolishedError;
}( /*#__PURE__*/Object(wrapNativeSuper["a" /* default */])(Error));

var unitRegExp = /((?!\w)a|na|hc|mc|dg|me[r]?|xe|ni(?![a-zA-Z])|mm|cp|tp|xp|q(?!s)|hv|xamv|nimv|wv|sm|s(?!\D|$)|ged|darg?|nrut)/g; // Merges additional math functionality into the defaults.

function mergeSymbolMaps(additionalSymbols) {
  var symbolMap = {};
  symbolMap.symbols = additionalSymbols ? Object(esm_extends["a" /* default */])({}, defaultMathSymbols.symbols, additionalSymbols.symbols) : Object(esm_extends["a" /* default */])({}, defaultMathSymbols.symbols);
  return symbolMap;
}

function exec(operators, values) {
  var _ref;

  var op = operators.pop();
  values.push(op.f.apply(op, (_ref = []).concat.apply(_ref, values.splice(-op.argCount))));
  return op.precedence;
}

function calculate(expression, additionalSymbols) {
  var symbolMap = mergeSymbolMaps(additionalSymbols);
  var match;
  var operators = [symbolMap.symbols['('].prefix];
  var values = [];
  var pattern = new RegExp( // Pattern for numbers
  "\\d+(?:\\.\\d+)?|" + // ...and patterns for individual operators/function names
  Object.keys(symbolMap.symbols).map(function (key) {
    return symbolMap.symbols[key];
  }) // longer symbols should be listed first
  // $FlowFixMe
  .sort(function (a, b) {
    return b.symbol.length - a.symbol.length;
  }) // $FlowFixMe
  .map(function (val) {
    return val.regSymbol;
  }).join('|') + "|(\\S)", 'g');
  pattern.lastIndex = 0; // Reset regular expression object

  var afterValue = false;

  do {
    match = pattern.exec(expression);

    var _ref2 = match || [')', undefined],
        token = _ref2[0],
        bad = _ref2[1];

    var notNumber = symbolMap.symbols[token];
    var notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
    var notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix; // Check for syntax errors:

    if (bad || (afterValue ? notAfterValue : notNewValue)) {
      throw new polished_esm_PolishedError(37, match ? match.index : expression.length, expression);
    }

    if (afterValue) {
      // We either have an infix or postfix operator (they should be mutually exclusive)
      var curr = notNumber.postfix || notNumber.infix;

      do {
        var prev = operators[operators.length - 1];
        if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0) break; // Apply previous operator, since it has precedence over current one
      } while (exec(operators, values)); // Exit loop after executing an opening parenthesis or function


      afterValue = curr.notation === 'postfix';

      if (curr.symbol !== ')') {
        operators.push(curr); // Postfix always has precedence over any operator that follows after it

        if (afterValue) exec(operators, values);
      }
    } else if (notNumber) {
      // prefix operator or function
      operators.push(notNumber.prefix || notNumber.func);

      if (notNumber.func) {
        // Require an opening parenthesis
        match = pattern.exec(expression);

        if (!match || match[0] !== '(') {
          throw new polished_esm_PolishedError(38, match ? match.index : expression.length, expression);
        }
      }
    } else {
      // number
      values.push(+token);
      afterValue = true;
    }
  } while (match && operators.length);

  if (operators.length) {
    throw new polished_esm_PolishedError(39, match ? match.index : expression.length, expression);
  } else if (match) {
    throw new polished_esm_PolishedError(40, match ? match.index : expression.length, expression);
  } else {
    return values.pop();
  }
}

function reverseString(str) {
  return str.split('').reverse().join('');
}
/**
 * Helper for doing math with CSS Units. Accepts a formula as a string. All values in the formula must have the same unit (or be unitless). Supports complex formulas utliziing addition, subtraction, multiplication, division, square root, powers, factorial, min, max, as well as parentheses for order of operation.
 *
 *In cases where you need to do calculations with mixed units where one unit is a [relative length unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Relative_length_units), you will want to use [CSS Calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc).
 *
 * *warning* While we've done everything possible to ensure math safely evalutes formulas expressed as strings, you should always use extreme caution when passing `math` user provided values.
 * @example
 * // Styles as object usage
 * const styles = {
 *   fontSize: math('12rem + 8rem'),
 *   fontSize: math('(12px + 2px) * 3'),
 *   fontSize: math('3px^2 + sqrt(4)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   fontSize: ${math('12rem + 8rem')};
 *   fontSize: ${math('(12px + 2px) * 3')};
 *   fontSize: ${math('3px^2 + sqrt(4)')};
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   fontSize: '20rem',
 *   fontSize: '42px',
 *   fontSize: '11px',
 * }
 */


function math(formula, additionalSymbols) {
  var reversedFormula = reverseString(formula);
  var formulaMatch = reversedFormula.match(unitRegExp); // Check that all units are the same

  if (formulaMatch && !formulaMatch.every(function (unit) {
    return unit === formulaMatch[0];
  })) {
    throw new polished_esm_PolishedError(41);
  }

  var cleanFormula = reverseString(reversedFormula.replace(unitRegExp, ''));
  return "" + calculate(cleanFormula, additionalSymbols) + (formulaMatch ? reverseString(formulaMatch[0]) : '');
}

var cssVariableRegex = /--[\S]*/g;
/**
 * Fetches the value of a passed CSS Variable.
 *
 * Passthrough can be enabled (off by default) for when you are unsure of the input and want non-variable values to be returned instead of an error.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'background': cssVar('--background-color'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${cssVar('--background-color')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'background': 'red'
 * }
 */

function cssVar(cssVariable, passThrough) {
  if (!cssVariable || !cssVariable.match(cssVariableRegex)) {
    if (passThrough) return cssVariable;
    throw new polished_esm_PolishedError(73);
  }

  var variableValue;
  /* eslint-disable */

  /* istanbul ignore next */

  if (typeof document !== 'undefined' && document.documentElement !== null) {
    variableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
  }
  /* eslint-enable */


  if (variableValue) {
    return variableValue.trim();
  } else {
    throw new polished_esm_PolishedError(74);
  }
} // @private


function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var positionMap = ['Top', 'Right', 'Bottom', 'Left'];

function generateProperty(property, position) {
  if (!property) return position.toLowerCase();
  var splitProperty = property.split('-');

  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position);
    return splitProperty.reduce(function (acc, val) {
      return "" + acc + capitalizeString(val);
    });
  }

  var joinedProperty = property.replace(/([a-z])([A-Z])/g, "$1" + position + "$2");
  return property === joinedProperty ? "" + property + position : joinedProperty;
}

function generateStyles(property, valuesWithDefaults) {
  var styles = {};

  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i];
    }
  }

  return styles;
}
/**
 * Enables shorthand for direction-based properties. It accepts a property (hyphenated or camelCased) and up to four values that map to top, right, bottom, and left, respectively. You can optionally pass an empty string to get only the directional values as properties. You can also optionally pass a null argument for a directional value to ignore it.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */


function directionalProperty(property) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  } //  prettier-ignore


  var firstValue = values[0],
      _values$ = values[1],
      secondValue = _values$ === void 0 ? firstValue : _values$,
      _values$2 = values[2],
      thirdValue = _values$2 === void 0 ? firstValue : _values$2,
      _values$3 = values[3],
      fourthValue = _values$3 === void 0 ? secondValue : _values$3;
  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}
/**
 * Check if a string ends with something
 * @private
 */


function endsWith(string, suffix) {
  return string.substr(-suffix.length) === suffix;
}

var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
/**
 * Returns a given CSS value minus its unit of measure.
 *
 * @deprecated - stripUnit's unitReturn functionality has been marked for deprecation in polished 4.0. It's functionality has been been moved to getValueAndUnit.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value, unitReturn) {
  if (typeof value !== 'string') return unitReturn ? [value, undefined] : value;
  var matchedValue = value.match(cssRegex);

  if (unitReturn) {
    // eslint-disable-next-line no-console
    console.warn("stripUnit's unitReturn functionality has been marked for deprecation in polished 4.0. It's functionality has been been moved to getValueAndUnit.");
    if (matchedValue) return [parseFloat(value), matchedValue[2]];
    return [value, undefined];
  }

  if (matchedValue) return parseFloat(value);
  return value;
}
/**
 * Factory function that creates pixel-to-x converters
 * @private
 */


var pxtoFactory = function pxtoFactory(to) {
  return function (pxval, base) {
    if (base === void 0) {
      base = '16px';
    }

    var newPxval = pxval;
    var newBase = base;

    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new polished_esm_PolishedError(69, to, pxval);
      }

      newPxval = stripUnit(pxval);
    }

    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new polished_esm_PolishedError(70, to, base);
      }

      newBase = stripUnit(base);
    }

    if (typeof newPxval === 'string') {
      throw new polished_esm_PolishedError(71, pxval, to);
    }

    if (typeof newBase === 'string') {
      throw new polished_esm_PolishedError(72, base, to);
    }

    return "" + newPxval / newBase + to;
  };
};
/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */


var em = /*#__PURE__*/pxtoFactory('em');
var cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
/**
 * Returns a given CSS value and its unit as elements of an array.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': getValueAndUnit('100px')[0],
 *   '--unit': getValueAndUnit('100px')[1],
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${getValueAndUnit('100px')[0]};
 *   --unit: ${getValueAndUnit('100px')[1]};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100,
 *   '--unit': 'px',
 * }
 */

function getValueAndUnit(value) {
  if (typeof value !== 'string') return [value, ''];
  var matchedValue = value.match(cssRegex$1);
  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
}

var ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
};

function getRatio(ratioName) {
  return ratioNames[ratioName];
}
/**
 * Establish consistent measurements and spacial relationships throughout your projects by incrementing an em or rem value up or down a defined scale. We provide a list of commonly used scales as pre-defined variables.
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'fontSize': '1.77689em'
 * }
 */


function modularScale(steps, base, ratio) {
  if (base === void 0) {
    base = '1em';
  }

  if (ratio === void 0) {
    ratio = 1.333;
  }

  if (typeof steps !== 'number') {
    throw new polished_esm_PolishedError(42);
  }

  if (typeof ratio === 'string' && !ratioNames[ratio]) {
    throw new polished_esm_PolishedError(43);
  }

  var _ref = typeof base === 'string' ? getValueAndUnit(base) : [base, ''],
      realBase = _ref[0],
      unit = _ref[1];

  var realRatio = typeof ratio === 'string' ? getRatio(ratio) : ratio;

  if (typeof realBase === 'string') {
    throw new polished_esm_PolishedError(44, base);
  }

  return "" + realBase * Math.pow(realRatio, steps) + (unit || '');
}
/**
 * Convert pixel value to rems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': rem('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${rem('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1rem'
 * }
 */


var rem = /*#__PURE__*/pxtoFactory('rem');
/**
 * Returns a CSS calc formula for linear interpolation of a property between two values. Accepts optional minScreen (defaults to '320px') and maxScreen (defaults to '1200px').
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   fontSize: between('20px', '100px', '400px', '1000px'),
 *   fontSize: between('20px', '100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   fontSize: ${between('20px', '100px', '400px', '1000px')};
 *   fontSize: ${between('20px', '100px')}
 * `
 *
 * // CSS as JS Output
 *
 * h1: {
 *   'fontSize': 'calc(-33.33333333333334px + 13.333333333333334vw)',
 *   'fontSize': 'calc(-9.090909090909093px + 9.090909090909092vw)'
 * }
 */

function between(fromSize, toSize, minScreen, maxScreen) {
  if (minScreen === void 0) {
    minScreen = '320px';
  }

  if (maxScreen === void 0) {
    maxScreen = '1200px';
  }

  var _getValueAndUnit = getValueAndUnit(fromSize),
      unitlessFromSize = _getValueAndUnit[0],
      fromSizeUnit = _getValueAndUnit[1];

  var _getValueAndUnit2 = getValueAndUnit(toSize),
      unitlessToSize = _getValueAndUnit2[0],
      toSizeUnit = _getValueAndUnit2[1];

  var _getValueAndUnit3 = getValueAndUnit(minScreen),
      unitlessMinScreen = _getValueAndUnit3[0],
      minScreenUnit = _getValueAndUnit3[1];

  var _getValueAndUnit4 = getValueAndUnit(maxScreen),
      unitlessMaxScreen = _getValueAndUnit4[0],
      maxScreenUnit = _getValueAndUnit4[1];

  if (typeof unitlessMinScreen !== 'number' || typeof unitlessMaxScreen !== 'number' || !minScreenUnit || !maxScreenUnit || minScreenUnit !== maxScreenUnit) {
    throw new polished_esm_PolishedError(47);
  }

  if (typeof unitlessFromSize !== 'number' || typeof unitlessToSize !== 'number' || fromSizeUnit !== toSizeUnit) {
    throw new polished_esm_PolishedError(48);
  }

  var slope = (unitlessFromSize - unitlessToSize) / (unitlessMinScreen - unitlessMaxScreen);
  var base = unitlessToSize - slope * unitlessMaxScreen;
  return "calc(" + base.toFixed(2) + (fromSizeUnit || '') + " + " + (100 * slope).toFixed(2) + "vw)";
}
/**
 * CSS to contain a float (credit to CSSMojo).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...clearFix(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${clearFix()}
 * `
 *
 * // CSS as JS Output
 *
 * '&::after': {
 *   'clear': 'both',
 *   'content': '""',
 *   'display': 'table'
 * }
 */


function clearFix(parent) {
  var _ref;

  if (parent === void 0) {
    parent = '&';
  }

  var pseudoSelector = parent + "::after";
  return _ref = {}, _ref[pseudoSelector] = {
    clear: 'both',
    content: '""',
    display: 'table'
  }, _ref;
}
/**
 * CSS to fully cover an area. Can optionally be passed an offset to act as a "padding".
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...cover()
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${cover()}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'position': 'absolute',
 *   'top': '0',
 *   'right: '0',
 *   'bottom': '0',
 *   'left: '0'
 * }
 */


function cover(offset) {
  if (offset === void 0) {
    offset = 0;
  }

  return {
    position: 'absolute',
    top: offset,
    right: offset,
    bottom: offset,
    left: offset
  };
}
/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */


function ellipsis(width) {
  if (width === void 0) {
    width = '100%';
  }

  return {
    display: 'inline-block',
    maxWidth: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  };
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
/**
 * Returns a set of media queries that resizes a property (or set of properties) between a provided fromSize and toSize. Accepts optional minScreen (defaults to '320px') and maxScreen (defaults to '1200px') to constrain the interpolation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...fluidRange(
 *    {
 *        prop: 'padding',
 *        fromSize: '20px',
 *        toSize: '100px',
 *      },
 *      '400px',
 *      '1000px',
 *    )
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${fluidRange(
 *      {
 *        prop: 'padding',
 *        fromSize: '20px',
 *        toSize: '100px',
 *      },
 *      '400px',
 *      '1000px',
 *    )}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   "@media (min-width: 1000px)": Object {
 *     "padding": "100px",
 *   },
 *   "@media (min-width: 400px)": Object {
 *     "padding": "calc(-33.33333333333334px + 13.333333333333334vw)",
 *   },
 *   "padding": "20px",
 * }
 */


function fluidRange(cssProp, minScreen, maxScreen) {
  if (minScreen === void 0) {
    minScreen = '320px';
  }

  if (maxScreen === void 0) {
    maxScreen = '1200px';
  }

  if (!Array.isArray(cssProp) && typeof cssProp !== 'object' || cssProp === null) {
    throw new polished_esm_PolishedError(49);
  }

  if (Array.isArray(cssProp)) {
    var mediaQueries = {};
    var fallbacks = {};

    for (var _iterator = _createForOfIteratorHelperLoose(cssProp), _step; !(_step = _iterator()).done;) {
      var _extends2, _extends3;

      var obj = _step.value;

      if (!obj.prop || !obj.fromSize || !obj.toSize) {
        throw new polished_esm_PolishedError(50);
      }

      fallbacks[obj.prop] = obj.fromSize;
      mediaQueries["@media (min-width: " + minScreen + ")"] = Object(esm_extends["a" /* default */])({}, mediaQueries["@media (min-width: " + minScreen + ")"], (_extends2 = {}, _extends2[obj.prop] = between(obj.fromSize, obj.toSize, minScreen, maxScreen), _extends2));
      mediaQueries["@media (min-width: " + maxScreen + ")"] = Object(esm_extends["a" /* default */])({}, mediaQueries["@media (min-width: " + maxScreen + ")"], (_extends3 = {}, _extends3[obj.prop] = obj.toSize, _extends3));
    }

    return Object(esm_extends["a" /* default */])({}, fallbacks, mediaQueries);
  } else {
    var _ref, _ref2, _ref3;

    if (!cssProp.prop || !cssProp.fromSize || !cssProp.toSize) {
      throw new polished_esm_PolishedError(51);
    }

    return _ref3 = {}, _ref3[cssProp.prop] = cssProp.fromSize, _ref3["@media (min-width: " + minScreen + ")"] = (_ref = {}, _ref[cssProp.prop] = between(cssProp.fromSize, cssProp.toSize, minScreen, maxScreen), _ref), _ref3["@media (min-width: " + maxScreen + ")"] = (_ref2 = {}, _ref2[cssProp.prop] = cssProp.toSize, _ref2), _ref3;
  }
}

var dataURIRegex = /^\s*data:([a-z]+\/[a-z-]+(;[a-z-]+=[a-z-]+)?)?(;charset=[a-z0-9-]+)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i;
var formatHintMap = {
  woff: 'woff',
  woff2: 'woff2',
  ttf: 'truetype',
  otf: 'opentype',
  eot: 'embedded-opentype',
  svg: 'svg',
  svgz: 'svg'
};

function generateFormatHint(format, formatHint) {
  if (!formatHint) return '';
  return " format(\"" + formatHintMap[format] + "\")";
}

function isDataURI(fontFilePath) {
  return !!fontFilePath.match(dataURIRegex);
}

function generateFileReferences(fontFilePath, fileFormats, formatHint) {
  if (isDataURI(fontFilePath)) {
    return "url(\"" + fontFilePath + "\")" + generateFormatHint(fileFormats[0], formatHint);
  }

  var fileFontReferences = fileFormats.map(function (format) {
    return "url(\"" + fontFilePath + "." + format + "\")" + generateFormatHint(format, formatHint);
  });
  return fileFontReferences.join(', ');
}

function generateLocalReferences(localFonts) {
  var localFontReferences = localFonts.map(function (font) {
    return "local(\"" + font + "\")";
  });
  return localFontReferences.join(', ');
}

function generateSources(fontFilePath, localFonts, fileFormats, formatHint) {
  var fontReferences = [];
  if (localFonts) fontReferences.push(generateLocalReferences(localFonts));

  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats, formatHint));
  }

  return fontReferences.join(', ');
}
/**
 * CSS for a @font-face declaration.
 *
 * @example
 * // Styles as object basic usage
 * const styles = {
 *    ...fontFace({
 *      'fontFamily': 'Sans-Pro',
 *      'fontFilePath': 'path/to/file'
 *    })
 * }
 *
 * // styled-components basic usage
 * const GlobalStyle = createGlobalStyle`${
 *   fontFace({
 *     'fontFamily': 'Sans-Pro',
 *     'fontFilePath': 'path/to/file'
 *   }
 * )}`
 *
 * // CSS as JS Output
 *
 * '@font-face': {
 *   'fontFamily': 'Sans-Pro',
 *   'src': 'url("path/to/file.eot"), url("path/to/file.woff2"), url("path/to/file.woff"), url("path/to/file.ttf"), url("path/to/file.svg")',
 * }
 */


function fontFace(_ref) {
  var fontFamily = _ref.fontFamily,
      fontFilePath = _ref.fontFilePath,
      fontStretch = _ref.fontStretch,
      fontStyle = _ref.fontStyle,
      fontVariant = _ref.fontVariant,
      fontWeight = _ref.fontWeight,
      _ref$fileFormats = _ref.fileFormats,
      fileFormats = _ref$fileFormats === void 0 ? ['eot', 'woff2', 'woff', 'ttf', 'svg'] : _ref$fileFormats,
      _ref$formatHint = _ref.formatHint,
      formatHint = _ref$formatHint === void 0 ? false : _ref$formatHint,
      localFonts = _ref.localFonts,
      unicodeRange = _ref.unicodeRange,
      fontDisplay = _ref.fontDisplay,
      fontVariationSettings = _ref.fontVariationSettings,
      fontFeatureSettings = _ref.fontFeatureSettings; // Error Handling

  if (!fontFamily) throw new polished_esm_PolishedError(55);

  if (!fontFilePath && !localFonts) {
    throw new polished_esm_PolishedError(52);
  }

  if (localFonts && !Array.isArray(localFonts)) {
    throw new polished_esm_PolishedError(53);
  }

  if (!Array.isArray(fileFormats)) {
    throw new polished_esm_PolishedError(54);
  }

  var fontFaceDeclaration = {
    '@font-face': {
      fontFamily: fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats, formatHint),
      unicodeRange: unicodeRange,
      fontStretch: fontStretch,
      fontStyle: fontStyle,
      fontVariant: fontVariant,
      fontWeight: fontWeight,
      fontDisplay: fontDisplay,
      fontVariationSettings: fontVariationSettings,
      fontFeatureSettings: fontFeatureSettings
    }
  }; // Removes undefined fields for cleaner css object.

  return JSON.parse(JSON.stringify(fontFaceDeclaration));
}
/**
 * CSS to hide text to show a background image in a SEO-friendly way.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'backgroundImage': 'url(logo.png)',
 *   ...hideText(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   backgroundImage: url(logo.png);
 *   ${hideText()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'backgroundImage': 'url(logo.png)',
 *   'textIndent': '101%',
 *   'overflow': 'hidden',
 *   'whiteSpace': 'nowrap',
 * }
 */


function hideText() {
  return {
    textIndent: '101%',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
}
/**
 * CSS to hide content visually but remain accessible to screen readers.
 * from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/9a176f57af1cfe8ec70300da4621fb9b07e5fa31/src/css/main.css#L121)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...hideVisually(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hideVisually()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'border': '0',
 *   'clip': 'rect(0 0 0 0)',
 *   'height': '1px',
 *   'margin': '-1px',
 *   'overflow': 'hidden',
 *   'padding': '0',
 *   'position': 'absolute',
 *   'whiteSpace': 'nowrap',
 *   'width': '1px',
 * }
 */


function hideVisually() {
  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  };
}
/**
 * Generates a media query to target HiDPI devices.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  [hiDPI(1.5)]: {
 *    width: 200px;
 *  }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hiDPI(1.5)} {
 *     width: 200px;
 *   }
 * `
 *
 * // CSS as JS Output
 *
 * '@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
 *  only screen and (min--moz-device-pixel-ratio: 1.5),
 *  only screen and (-o-min-device-pixel-ratio: 1.5/1),
 *  only screen and (min-resolution: 144dpi),
 *  only screen and (min-resolution: 1.5dppx)': {
 *   'width': '200px',
 * }
 */


function hiDPI(ratio) {
  if (ratio === void 0) {
    ratio = 1.3;
  }

  return "\n    @media only screen and (-webkit-min-device-pixel-ratio: " + ratio + "),\n    only screen and (min--moz-device-pixel-ratio: " + ratio + "),\n    only screen and (-o-min-device-pixel-ratio: " + ratio + "/1),\n    only screen and (min-resolution: " + Math.round(ratio * 96) + "dpi),\n    only screen and (min-resolution: " + ratio + "dppx)\n  ";
}

function constructGradientValue(literals) {
  var template = '';

  for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < literals.length; i += 1) {
    template += literals[i];

    if (i === substitutions.length - 1 && substitutions[i]) {
      var definedValues = substitutions.filter(function (substitute) {
        return !!substitute;
      }); // Adds leading coma if properties preceed color-stops

      if (definedValues.length > 1) {
        template = template.slice(0, -1);
        template += ", " + substitutions[i]; // No trailing space if color-stops is the only param provided
      } else if (definedValues.length === 1) {
        template += "" + substitutions[i];
      }
    } else if (substitutions[i]) {
      template += substitutions[i] + " ";
    }
  }

  return template.trim();
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["linear-gradient(", "", ")"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * CSS for declaring a linear gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...linearGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        toDirection: 'to top right',
        fallback: '#FFF',
      })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${linearGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        toDirection: 'to top right',
        fallback: '#FFF',
      })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#FFF',
 *   'backgroundImage': 'linear-gradient(to top right, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */


function linearGradient(_ref) {
  var colorStops = _ref.colorStops,
      fallback = _ref.fallback,
      _ref$toDirection = _ref.toDirection,
      toDirection = _ref$toDirection === void 0 ? '' : _ref$toDirection;

  if (!colorStops || colorStops.length < 2) {
    throw new polished_esm_PolishedError(56);
  }

  return {
    backgroundColor: fallback || colorStops[0].replace(/,\s+/g, ',').split(' ')[0].replace(/,(?=\S)/g, ', '),
    backgroundImage: constructGradientValue(_templateObject(), toDirection, colorStops.join(', ').replace(/,(?=\S)/g, ', '))
  };
}
/**
 * CSS to normalize abnormalities across browsers (normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...normalize(),
 * }
 *
 * // styled-components usage
 * const GlobalStyle = createGlobalStyle`${normalize()}`
 *
 * // CSS as JS Output
 *
 * html {
 *   lineHeight: 1.15,
 *   textSizeAdjust: 100%,
 * } ...
 */


function normalize() {
  var _ref;

  return [(_ref = {
    html: {
      lineHeight: '1.15',
      textSizeAdjust: '100%'
    },
    body: {
      margin: '0'
    },
    main: {
      display: 'block'
    },
    h1: {
      fontSize: '2em',
      margin: '0.67em 0'
    },
    hr: {
      boxSizing: 'content-box',
      height: '0',
      overflow: 'visible'
    },
    pre: {
      fontFamily: 'monospace, monospace',
      fontSize: '1em'
    },
    a: {
      backgroundColor: 'transparent'
    },
    'abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'underline'
    }
  }, _ref["b,\n    strong"] = {
    fontWeight: 'bolder'
  }, _ref["code,\n    kbd,\n    samp"] = {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  }, _ref.small = {
    fontSize: '80%'
  }, _ref["sub,\n    sup"] = {
    fontSize: '75%',
    lineHeight: '0',
    position: 'relative',
    verticalAlign: 'baseline'
  }, _ref.sub = {
    bottom: '-0.25em'
  }, _ref.sup = {
    top: '-0.5em'
  }, _ref.img = {
    borderStyle: 'none'
  }, _ref["button,\n    input,\n    optgroup,\n    select,\n    textarea"] = {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: '1.15',
    margin: '0'
  }, _ref["button,\n    input"] = {
    overflow: 'visible'
  }, _ref["button,\n    select"] = {
    textTransform: 'none'
  }, _ref["button,\n    html [type=\"button\"],\n    [type=\"reset\"],\n    [type=\"submit\"]"] = {
    WebkitAppearance: 'button'
  }, _ref["button::-moz-focus-inner,\n    [type=\"button\"]::-moz-focus-inner,\n    [type=\"reset\"]::-moz-focus-inner,\n    [type=\"submit\"]::-moz-focus-inner"] = {
    borderStyle: 'none',
    padding: '0'
  }, _ref["button:-moz-focusring,\n    [type=\"button\"]:-moz-focusring,\n    [type=\"reset\"]:-moz-focusring,\n    [type=\"submit\"]:-moz-focusring"] = {
    outline: '1px dotted ButtonText'
  }, _ref.fieldset = {
    padding: '0.35em 0.625em 0.75em'
  }, _ref.legend = {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: '0',
    whiteSpace: 'normal'
  }, _ref.progress = {
    verticalAlign: 'baseline'
  }, _ref.textarea = {
    overflow: 'auto'
  }, _ref["[type=\"checkbox\"],\n    [type=\"radio\"]"] = {
    boxSizing: 'border-box',
    padding: '0'
  }, _ref["[type=\"number\"]::-webkit-inner-spin-button,\n    [type=\"number\"]::-webkit-outer-spin-button"] = {
    height: 'auto'
  }, _ref['[type="search"]'] = {
    WebkitAppearance: 'textfield',
    outlineOffset: '-2px'
  }, _ref['[type="search"]::-webkit-search-decoration'] = {
    WebkitAppearance: 'none'
  }, _ref['::-webkit-file-upload-button'] = {
    WebkitAppearance: 'button',
    font: 'inherit'
  }, _ref.details = {
    display: 'block'
  }, _ref.summary = {
    display: 'list-item'
  }, _ref.template = {
    display: 'none'
  }, _ref['[hidden]'] = {
    display: 'none'
  }, _ref), {
    'abbr[title]': {
      textDecoration: 'underline dotted'
    }
  }];
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["radial-gradient(", "", "", "", ")"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * CSS for declaring a radial gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#00FFFF',
 *   'backgroundImage': 'radial-gradient(center ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */


function radialGradient(_ref) {
  var colorStops = _ref.colorStops,
      _ref$extent = _ref.extent,
      extent = _ref$extent === void 0 ? '' : _ref$extent,
      fallback = _ref.fallback,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? '' : _ref$position,
      _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? '' : _ref$shape;

  if (!colorStops || colorStops.length < 2) {
    throw new polished_esm_PolishedError(57);
  }

  return {
    backgroundColor: fallback || colorStops[0].split(' ')[0],
    backgroundImage: constructGradientValue(_templateObject$1(), position, shape, extent, colorStops.join(', '))
  };
}
/**
 * A helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png filename suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */


function retinaImage(filename, backgroundSize, extension, retinaFilename, retinaSuffix) {
  var _ref;

  if (extension === void 0) {
    extension = 'png';
  }

  if (retinaSuffix === void 0) {
    retinaSuffix = '_2x';
  }

  if (!filename) {
    throw new polished_esm_PolishedError(58);
  } // Replace the dot at the beginning of the passed extension if one exists


  var ext = extension.replace(/^\./, '');
  var rFilename = retinaFilename ? retinaFilename + "." + ext : "" + filename + retinaSuffix + "." + ext;
  return _ref = {
    backgroundImage: "url(" + filename + "." + ext + ")"
  }, _ref[hiDPI()] = Object(esm_extends["a" /* default */])({
    backgroundImage: "url(" + rFilename + ")"
  }, backgroundSize ? {
    backgroundSize: backgroundSize
  } : {}), _ref;
}
/* eslint-disable key-spacing */


var functionsMap = {
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeInCirc: 'cubic-bezier(0.600,  0.040, 0.980, 0.335)',
  easeInCubic: 'cubic-bezier(0.550,  0.055, 0.675, 0.190)',
  easeInExpo: 'cubic-bezier(0.950,  0.050, 0.795, 0.035)',
  easeInQuad: 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
  easeInQuart: 'cubic-bezier(0.895,  0.030, 0.685, 0.220)',
  easeInQuint: 'cubic-bezier(0.755,  0.050, 0.855, 0.060)',
  easeInSine: 'cubic-bezier(0.470,  0.000, 0.745, 0.715)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeOutCubic: 'cubic-bezier(0.215,  0.610, 0.355, 1.000)',
  easeOutCirc: 'cubic-bezier(0.075,  0.820, 0.165, 1.000)',
  easeOutExpo: 'cubic-bezier(0.190,  1.000, 0.220, 1.000)',
  easeOutQuad: 'cubic-bezier(0.250,  0.460, 0.450, 0.940)',
  easeOutQuart: 'cubic-bezier(0.165,  0.840, 0.440, 1.000)',
  easeOutQuint: 'cubic-bezier(0.230,  1.000, 0.320, 1.000)',
  easeOutSine: 'cubic-bezier(0.390,  0.575, 0.565, 1.000)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  easeInOutCirc: 'cubic-bezier(0.785,  0.135, 0.150, 0.860)',
  easeInOutCubic: 'cubic-bezier(0.645,  0.045, 0.355, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000,  0.000, 0.000, 1.000)',
  easeInOutQuad: 'cubic-bezier(0.455,  0.030, 0.515, 0.955)',
  easeInOutQuart: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860,  0.000, 0.070, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445,  0.050, 0.550, 0.950)'
};
/* eslint-enable key-spacing */

function getTimingFunction(functionName) {
  return functionsMap[functionName];
}
/**
 * String to represent common easing functions as demonstrated here: (github.com/jaukia/easie).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'transitionTimingFunction': timingFunctions('easeInQuad')
 * }
 *
 * // styled-components usage
 *  const div = styled.div`
 *   transitionTimingFunction: ${timingFunctions('easeInQuad')};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'transitionTimingFunction': 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
 * }
 */


function timingFunctions(timingFunction) {
  return getTimingFunction(timingFunction);
}

var getBorderWidth = function getBorderWidth(pointingDirection, height, width) {
  var fullWidth = "" + width[0] + (width[1] || '');
  var halfWidth = "" + width[0] / 2 + (width[1] || '');
  var fullHeight = "" + height[0] + (height[1] || '');
  var halfHeight = "" + height[0] / 2 + (height[1] || '');

  switch (pointingDirection) {
    case 'top':
      return "0 " + halfWidth + " " + fullHeight + " " + halfWidth;

    case 'topLeft':
      return fullWidth + " " + fullHeight + " 0 0";

    case 'left':
      return halfHeight + " " + fullWidth + " " + halfHeight + " 0";

    case 'bottomLeft':
      return fullWidth + " 0 0 " + fullHeight;

    case 'bottom':
      return fullHeight + " " + halfWidth + " 0 " + halfWidth;

    case 'bottomRight':
      return "0 0 " + fullWidth + " " + fullHeight;

    case 'right':
      return halfHeight + " 0 " + halfHeight + " " + fullWidth;

    case 'topRight':
    default:
      return "0 " + fullWidth + " " + fullHeight + " 0";
  }
};

var getBorderColor = function getBorderColor(pointingDirection, foregroundColor, backgroundColor) {
  switch (pointingDirection) {
    case 'top':
    case 'bottomRight':
      return backgroundColor + " " + backgroundColor + " " + foregroundColor + " " + backgroundColor;

    case 'right':
    case 'bottomLeft':
      return backgroundColor + " " + backgroundColor + " " + backgroundColor + " " + foregroundColor;

    case 'bottom':
    case 'topLeft':
      return foregroundColor + " " + backgroundColor + " " + backgroundColor + " " + backgroundColor;

    case 'left':
    case 'topRight':
      return backgroundColor + " " + foregroundColor + " " + backgroundColor + " " + backgroundColor;

    default:
      throw new polished_esm_PolishedError(59);
  }
};
/**
 * CSS to represent triangle with any pointing direction with an optional background color.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'borderColor': 'transparent transparent transparent red',
 *  'borderStyle': 'solid',
 *  'borderWidth': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */


function triangle(_ref) {
  var pointingDirection = _ref.pointingDirection,
      height = _ref.height,
      width = _ref.width,
      foregroundColor = _ref.foregroundColor,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? 'transparent' : _ref$backgroundColor;
  var widthAndUnit = getValueAndUnit(width);
  var heightAndUnit = getValueAndUnit(height);

  if (isNaN(heightAndUnit[0]) || isNaN(widthAndUnit[0])) {
    throw new polished_esm_PolishedError(60);
  }

  return {
    width: '0',
    height: '0',
    borderColor: getBorderColor(pointingDirection, foregroundColor, backgroundColor),
    borderStyle: 'solid',
    borderWidth: getBorderWidth(pointingDirection, heightAndUnit, widthAndUnit)
  };
}
/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-word')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-word')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-word',
 *   wordWrap: 'break-word',
 *   wordBreak: 'break-all',
 * }
 */


function wordWrap(wrap) {
  if (wrap === void 0) {
    wrap = 'break-word';
  }

  var wordBreak = wrap === 'break-word' ? 'break-all' : wrap;
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak: wordBreak
  };
}

function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV


  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};
/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */

function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}

var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */

function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new polished_esm_PolishedError(3);
  }

  var normalizedColor = nameToHex(color);

  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }

  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }

  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }

  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }

  var rgbMatched = rgbRegex.exec(normalizedColor);

  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }

  var rgbaMatched = rgbaRegex.exec(normalizedColor);

  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4])
    };
  }

  var hslMatched = hslRegex.exec(normalizedColor);

  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);

    if (!hslRgbMatched) {
      throw new polished_esm_PolishedError(4, normalizedColor, rgbColorString);
    }

    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }

  var hslaMatched = hslaRegex.exec(normalizedColor);

  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);

    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

    if (!_hslRgbMatched) {
      throw new polished_esm_PolishedError(4, normalizedColor, _rgbColorString);
    }

    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4])
    };
  }

  throw new polished_esm_PolishedError(5);
}

function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }

  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;

    case green:
      hue = (blue - red) / delta + 2;
      break;

    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;

  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }

  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}
/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */


function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}
/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */


var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }

  return value;
};

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */


function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new polished_esm_PolishedError(1);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */


function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }

  throw new polished_esm_PolishedError(2);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */


function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new polished_esm_PolishedError(6);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */


function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }

  throw new polished_esm_PolishedError(7);
}

var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};
/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */


function toColorString(color) {
  if (typeof color !== 'object') throw new polished_esm_PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new polished_esm_PolishedError(8);
} // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare


function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
} // eslint-disable-next-line no-redeclare


function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}
/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated around
 * the color wheel, always producing a positive hue value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue('180', 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue('180', 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */


function adjustHue(degree, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    hue: hslColor.hue + parseFloat(degree)
  }));
} // prettier-ignore


var curriedAdjustHue = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(adjustHue);
/**
 * Returns the complement of the provided color. This is identical to adjustHue(180, <color>).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: complement('#448'),
 *   background: complement('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${complement('#448')};
 *   background: ${complement('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#884";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */

function complement(color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    hue: (hslColor.hue + 180) % 360
  }));
}

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}
/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */


function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
} // prettier-ignore


var curriedDarken = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(darken);
/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */

function desaturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
  }));
} // prettier-ignore


var curriedDesaturate = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(desaturate);
/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 *
 * // CSS in JS Output
 *
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 */

function getLuminance(color) {
  if (color === 'transparent') return 0;
  var rgbColor = parseToRgb(color);

  var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
    var channel = rgbColor[key] / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }),
      r = _Object$keys$map[0],
      g = _Object$keys$map[1],
      b = _Object$keys$map[2];

  return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
}
/**
 * Returns the contrast ratio between two colors based on
 * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
 *
 * @example
 * const contrastRatio = getContrast('#444', '#fff');
 */


function getContrast(color1, color2) {
  var luminance1 = getLuminance(color1);
  var luminance2 = getLuminance(color2);
  return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
}
/**
 * Converts the color to a grayscale, by reducing its saturation to 0.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: grayscale('#CCCD64'),
 *   background: grayscale('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${grayscale('#CCCD64')};
 *   background: ${grayscale('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#999";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */


function grayscale(color) {
  if (color === 'transparent') return color;
  return toColorString(Object(esm_extends["a" /* default */])({}, parseToHsl(color), {
    saturation: 0
  }));
}
/**
 * Converts a HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hslToColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: hslToColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hslToColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${hslToColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */


function hslToColorString(color) {
  if (typeof color === 'object' && typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number') {
    if (color.alpha && typeof color.alpha === 'number') {
      return hsla({
        hue: color.hue,
        saturation: color.saturation,
        lightness: color.lightness,
        alpha: color.alpha
      });
    }

    return hsl({
      hue: color.hue,
      saturation: color.saturation,
      lightness: color.lightness
    });
  }

  throw new polished_esm_PolishedError(45);
}
/**
 * Inverts the red, green and blue values of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: invert('#CCCD64'),
 *   background: invert('rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${invert('#CCCD64')};
 *   background: ${invert('rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#33329b";
 *   background: "rgba(154,155,50,0.7)";
 * }
 */


function invert(color) {
  if (color === 'transparent') return color; // parse color string to rgb

  var value = parseToRgb(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, value, {
    red: 255 - value.red,
    green: 255 - value.green,
    blue: 255 - value.blue
  }));
}
/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */


function lighten(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
} // prettier-ignore


var curriedLighten = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(lighten);
/**
 * Determines which contrast guidelines have been met for two colors.
 * Based on the [contrast calculations recommended by W3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html).
 *
 * @example
 * const scores = meetsContrastGuidelines('#444', '#fff');
 */

function meetsContrastGuidelines(color1, color2) {
  var contrastRatio = getContrast(color1, color2);
  return {
    AA: contrastRatio >= 4.5,
    AALarge: contrastRatio >= 3,
    AAA: contrastRatio >= 7,
    AAALarge: contrastRatio >= 4.5
  };
}
/**
 * Mixes the two provided colors together by calculating the average of each of the RGB components weighted to the first color by the provided weight.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */


function mix(weight, color, otherColor) {
  if (color === 'transparent') return otherColor;
  if (otherColor === 'transparent') return color;
  if (weight === 0) return otherColor;
  var parsedColor1 = parseToRgb(color);

  var color1 = Object(esm_extends["a" /* default */])({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });

  var parsedColor2 = parseToRgb(otherColor);

  var color2 = Object(esm_extends["a" /* default */])({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1
  }); // The formula is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method


  var alphaDelta = color1.alpha - color2.alpha;
  var x = parseFloat(weight) * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;
  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha * (parseFloat(weight) / 1.0) + color2.alpha * (1 - parseFloat(weight) / 1.0)
  };
  return rgba(mixedColor);
} // prettier-ignore


var curriedMix = /*#__PURE__*/curry
/* ::<number | string, string, string, string> */
(mix);
/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify('0.5', 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify('0.5', 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */

function opacify(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = Object(esm_extends["a" /* default */])({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
  });

  return rgba(colorWithAlpha);
} // prettier-ignore


var curriedOpacify = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(opacify);
var defaultLightReturnColor = '#000';
var defaultDarkReturnColor = '#fff';
/**
 * Returns black or white (or optional light and dark return colors) for best
 * contrast depending on the luminosity of the given color.
 * When passing custom return colors, set `strict` to `true` to ensure that the
 * return color always meets or exceeds WCAG level AA or greater. If this test
 * fails, the default return color (black or white) is returned in place of the
 * custom return color.
 *
 * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   color: readableColor('#000'),
 *   color: readableColor('black', '#001', '#ff8'),
 *   color: readableColor('white', '#001', '#ff8'),
 *   color: readableColor('red', '#333', '#ddd', true)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   color: ${readableColor('#000')};
 *   color: ${readableColor('black', '#001', '#ff8')};
 *   color: ${readableColor('white', '#001', '#ff8')};
 *   color: ${readableColor('red', '#333', '#ddd', true)};
 * `
 *
 * // CSS in JS Output
 * element {
 *   color: "#fff";
 *   color: "#ff8";
 *   color: "#001";
 *   color: "#000";
 * }
 */

function readableColor(color, lightReturnColor, darkReturnColor, strict) {
  if (lightReturnColor === void 0) {
    lightReturnColor = defaultLightReturnColor;
  }

  if (darkReturnColor === void 0) {
    darkReturnColor = defaultDarkReturnColor;
  }

  if (strict === void 0) {
    strict = false;
  }

  var isLightColor = getLuminance(color) > 0.179;
  var preferredReturnColor = isLightColor ? lightReturnColor : darkReturnColor; // TODO: Make `strict` the default behaviour in the next major release.
  // Without `strict`, this may return a color that does not meet WCAG AA.

  if (!strict || getContrast(color, preferredReturnColor) >= 4.5) {
    return preferredReturnColor;
  }

  return isLightColor ? defaultLightReturnColor : defaultDarkReturnColor;
}
/**
 * Converts a RgbColor or RgbaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb` or `rgba`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgbToColorString({ red: 255, green: 205, blue: 100 }),
 *   background: rgbToColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgbToColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${rgbToColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 * }
 */


function rgbToColorString(color) {
  if (typeof color === 'object' && typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number') {
    if (typeof color.alpha === 'number') {
      return rgba({
        red: color.red,
        green: color.green,
        blue: color.blue,
        alpha: color.alpha
      });
    }

    return rgb({
      red: color.red,
      green: color.green,
      blue: color.blue
    });
  }

  throw new polished_esm_PolishedError(46);
}
/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */


function saturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(Object(esm_extends["a" /* default */])({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
  }));
} // prettier-ignore


var curriedSaturate = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(saturate);
/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue('244', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue('244', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */

function setHue(hue, color) {
  if (color === 'transparent') return color;
  return toColorString(Object(esm_extends["a" /* default */])({}, parseToHsl(color), {
    hue: parseFloat(hue)
  }));
} // prettier-ignore


var curriedSetHue = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(setHue);
/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */

function setLightness(lightness, color) {
  if (color === 'transparent') return color;
  return toColorString(Object(esm_extends["a" /* default */])({}, parseToHsl(color), {
    lightness: parseFloat(lightness)
  }));
} // prettier-ignore


var curriedSetLightness = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(setLightness);
/**
 * Sets the saturation of a color to the provided value. The saturation range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */

function setSaturation(saturation, color) {
  if (color === 'transparent') return color;
  return toColorString(Object(esm_extends["a" /* default */])({}, parseToHsl(color), {
    saturation: parseFloat(saturation)
  }));
} // prettier-ignore


var curriedSetSaturation = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(setSaturation);
/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (color === 'transparent') return color;
  return curriedMix(parseFloat(percentage), 'rgb(0, 0, 0)', color);
} // prettier-ignore


var curriedShade = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(shade);
/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  if (color === 'transparent') return color;
  return curriedMix(parseFloat(percentage), 'rgb(255, 255, 255)', color);
} // prettier-ignore


var curriedTint = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(tint);
/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */

function transparentize(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = Object(esm_extends["a" /* default */])({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 - parseFloat(amount) * 100) / 100)
  });

  return rgba(colorWithAlpha);
} // prettier-ignore


var curriedTransparentize = /*#__PURE__*/curry
/* ::<number | string, string, string> */
(transparentize);
/**
 * Shorthand for easily setting the animation property. Allows either multiple arrays with animations
 * or a single animation spread over the arguments.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out, colorchange 2s'
 * }
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation('rotate', '1s', 'ease-in-out')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation('rotate', '1s', 'ease-in-out')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out'
 * }
 */

function animation() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  } // Allow single or multiple animations passed


  var multiMode = Array.isArray(args[0]);

  if (!multiMode && args.length > 8) {
    throw new polished_esm_PolishedError(64);
  }

  var code = args.map(function (arg) {
    if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
      throw new polished_esm_PolishedError(65);
    }

    if (Array.isArray(arg) && arg.length > 8) {
      throw new polished_esm_PolishedError(66);
    }

    return Array.isArray(arg) ? arg.join(' ') : arg;
  }).join(', ');
  return {
    animation: code
  };
}
/**
 * Shorthand that accepts any number of backgroundImage values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'backgroundImage': 'url("/image/background.jpg"), linear-gradient(red, green)'
 * }
 */


function backgroundImages() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    backgroundImage: properties.join(', ')
  };
}
/**
 * Shorthand that accepts any number of background values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'background': 'url("/image/background.jpg"), linear-gradient(red, green), center no-repeat'
 * }
 */


function backgrounds() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    background: properties.join(', ')
  };
}

var sideMap = ['top', 'right', 'bottom', 'left'];
/**
 * Shorthand for the border property that splits out individual properties for use with tools like Fela and Styletron. A side keyword can optionally be passed to target only one side's border properties.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...border('1px', 'solid', 'red')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${border('1px', 'solid', 'red')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderColor': 'red',
 *   'borderStyle': 'solid',
 *   'borderWidth': `1px`,
 * }
 *
 * // Styles as object usage
 * const styles = {
 *   ...border('top', '1px', 'solid', 'red')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${border('top', '1px', 'solid', 'red')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderTopStyle': 'solid',
 *   'borderTopWidth': `1px`,
 * }
 */

function polished_esm_border(sideKeyword) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (typeof sideKeyword === 'string' && sideMap.indexOf(sideKeyword) >= 0) {
    var _ref;

    return _ref = {}, _ref["border" + capitalizeString(sideKeyword) + "Width"] = values[0], _ref["border" + capitalizeString(sideKeyword) + "Style"] = values[1], _ref["border" + capitalizeString(sideKeyword) + "Color"] = values[2], _ref;
  } else {
    values.unshift(sideKeyword);
    return {
      borderWidth: values[0],
      borderStyle: values[1],
      borderColor: values[2]
    };
  }
}
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderColor('red', 'green', 'blue', 'yellow')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderColor('red', 'green', 'blue', 'yellow')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderRightColor': 'green',
 *   'borderBottomColor': 'blue',
 *   'borderLeftColor': 'yellow'
 * }
 */


function polished_esm_borderColor() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(void 0, ['borderColor'].concat(values));
}
/**
 * Shorthand that accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopRightRadius': '5px',
 *   'borderTopLeftRadius': '5px',
 * }
 */


function polished_esm_borderRadius(side, radius) {
  var uppercaseSide = capitalizeString(side);

  if (!radius && radius !== 0) {
    throw new polished_esm_PolishedError(62);
  }

  if (uppercaseSide === 'Top' || uppercaseSide === 'Bottom') {
    var _ref;

    return _ref = {}, _ref["border" + uppercaseSide + "RightRadius"] = radius, _ref["border" + uppercaseSide + "LeftRadius"] = radius, _ref;
  }

  if (uppercaseSide === 'Left' || uppercaseSide === 'Right') {
    var _ref2;

    return _ref2 = {}, _ref2["borderTop" + uppercaseSide + "Radius"] = radius, _ref2["borderBottom" + uppercaseSide + "Radius"] = radius, _ref2;
  }

  throw new polished_esm_PolishedError(63);
}
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderStyle('solid', 'dashed', 'dotted', 'double')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderStyle('solid', 'dashed', 'dotted', 'double')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopStyle': 'solid',
 *   'borderRightStyle': 'dashed',
 *   'borderBottomStyle': 'dotted',
 *   'borderLeftStyle': 'double'
 * }
 */


function borderStyle() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(void 0, ['borderStyle'].concat(values));
}
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopWidth': '12px',
 *   'borderRightWidth': '24px',
 *   'borderBottomWidth': '36px',
 *   'borderLeftWidth': '48px'
 * }
 */


function borderWidth() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(void 0, ['borderWidth'].concat(values));
}

function generateSelectors(template, state) {
  var stateSuffix = state ? ":" + state : '';
  return template(stateSuffix);
}
/**
 * Function helper that adds an array of states to a template of selectors. Used in textInputs and buttons.
 * @private
 */


function statefulSelectors(states, template, stateMap) {
  if (!template) throw new polished_esm_PolishedError(67);
  if (states.length === 0) return generateSelectors(template, null);
  var selectors = [];

  for (var i = 0; i < states.length; i += 1) {
    if (stateMap && stateMap.indexOf(states[i]) < 0) {
      throw new polished_esm_PolishedError(68);
    }

    selectors.push(generateSelectors(template, states[i]));
  }

  selectors = selectors.join(',');
  return selectors;
}

var stateMap = [undefined, null, 'active', 'focus', 'hover'];

function template(state) {
  return "button" + state + ",\n  input[type=\"button\"]" + state + ",\n  input[type=\"reset\"]" + state + ",\n  input[type=\"submit\"]" + state;
}
/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */


function buttons() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template, stateMap);
}
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...margin('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${margin('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'marginTop': '12px',
 *   'marginRight': '24px',
 *   'marginBottom': '36px',
 *   'marginLeft': '48px'
 * }
 */


function margin() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(void 0, ['margin'].concat(values));
}
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...padding('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${padding('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */


function padding() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(void 0, ['padding'].concat(values));
}

var positionMap$1 = ['absolute', 'fixed', 'relative', 'static', 'sticky'];
/**
 * Shorthand accepts up to five values, including null to skip a value, and maps them to their respective directions. The first value can optionally be a position keyword.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...position('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 *
 * // Styles as object usage
 * const styles = {
 *   ...position('absolute', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('absolute', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'position': 'absolute',
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 */

function polished_esm_position(firstValue) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (positionMap$1.indexOf(firstValue) >= 0 && firstValue) {
    return Object(esm_extends["a" /* default */])({}, directionalProperty.apply(void 0, [''].concat(values)), {
      position: firstValue
    });
  } else {
    return directionalProperty.apply(void 0, ['', firstValue].concat(values));
  }
}
/**
 * Shorthand to set the height and width properties in a single statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...size('300px', '250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${size('300px', '250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'height': '300px',
 *   'width': '250px',
 * }
 */


function polished_esm_size(height, width) {
  if (width === void 0) {
    width = height;
  }

  return {
    height: height,
    width: width
  };
}

var stateMap$1 = [undefined, null, 'active', 'focus', 'hover'];

function template$1(state) {
  return "input[type=\"color\"]" + state + ",\n    input[type=\"date\"]" + state + ",\n    input[type=\"datetime\"]" + state + ",\n    input[type=\"datetime-local\"]" + state + ",\n    input[type=\"email\"]" + state + ",\n    input[type=\"month\"]" + state + ",\n    input[type=\"number\"]" + state + ",\n    input[type=\"password\"]" + state + ",\n    input[type=\"search\"]" + state + ",\n    input[type=\"tel\"]" + state + ",\n    input[type=\"text\"]" + state + ",\n    input[type=\"time\"]" + state + ",\n    input[type=\"url\"]" + state + ",\n    input[type=\"week\"]" + state + ",\n    input:not([type])" + state + ",\n    textarea" + state;
}
/**
 * Populates selectors that target all text inputs. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [textInputs('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${textInputs('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'input[type="color"]:active,
 *  input[type="date"]:active,
 *  input[type="datetime"]:active,
 *  input[type="datetime-local"]:active,
 *  input[type="email"]:active,
 *  input[type="month"]:active,
 *  input[type="number"]:active,
 *  input[type="password"]:active,
 *  input[type="search"]:active,
 *  input[type="tel"]:active,
 *  input[type="text"]:active,
 *  input[type="time"]:active,
 *  input[type="url"]:active,
 *  input[type="week"]:active,
 *  input:not([type]):active,
 *  textarea:active': {
 *   'border': 'none'
 * }
 */


function textInputs() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template$1, stateMap$1);
}
/**
 * Accepts any number of transition values as parameters for creating a single transition statement. You may also pass an array of properties as the first parameter that you would like to apply the same transition values to (second parameter).
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s'),
 *   ...transitions(['color', 'background-color'], '2.0s ease-in 2s')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')};
 *   ${transitions(['color', 'background-color'], '2.0s ease-in 2s'),};
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'transition': 'opacity 1.0s ease-in 0s, width 2.0s ease-in 2s'
 *   'transition': 'color 2.0s ease-in 2s, background-color 2.0s ease-in 2s',
 * }
 */


function transitions() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  if (Array.isArray(properties[0]) && properties.length === 2) {
    var value = properties[1];

    if (typeof value !== 'string') {
      throw new polished_esm_PolishedError(61);
    }

    var transitionsString = properties[0].map(function (property) {
      return property + " " + value;
    }).join(', ');
    return {
      transition: transitionsString
    };
  } else {
    return {
      transition: properties.join(', ')
    };
  }
}


// CONCATENATED MODULE: ./src/components/codeEditor/Container.tsx



var Container = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "Container",
  componentId: "dop8l8-0"
})(["margin:0 auto;max-width:100%;background:#12005e;width:", ";padding:", ";padding-bottom:", ";text-align:center;"], rem(1024), rem(20), rem(20));
var StyledProvider = Object(styled_components_browser_esm["b" /* default */])(react_live_es_LiveProvider).withConfig({
  displayName: "Container__StyledProvider",
  componentId: "dop8l8-1"
})(["border-radius:", ";box-shadow:1px 1px 20px rgba(20,20,20,0.27);overflow:hidden;margin-bottom:", ";"], rem(3), rem(100));
var RenderWrapper = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "Container__RenderWrapper",
  componentId: "dop8l8-2"
})(["display:flex;flex-direction:row;justify-content:center;align-items:center;@media (max-width:300px){flex-direction:column;}"]);
var column = Object(styled_components_browser_esm["a" /* css */])(["flex-basis:50%;width:50%;max-width:50%;@media (max-width:600px){flex-basis:auto;width:100%;max-width:100%;}"]);
var StyledPreview = Object(styled_components_browser_esm["b" /* default */])(LivePreview).withConfig({
  displayName: "Container__StyledPreview",
  componentId: "dop8l8-3"
})(["position:relative;padding:0.5rem;background:white;color:black;height:auto;overflow:hidden;", ";"], column);
var StyledEditorDiv = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "Container__StyledEditorDiv",
  componentId: "dop8l8-4"
})(["color:white;font-size:large;background-color:transparent !important;background-image:linear-gradient(to right bottom,#34294f 0%,#2a2139 30%);"]);
var StyledLiveErrorDiv = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "Container__StyledLiveErrorDiv",
  componentId: "dop8l8-5"
})(["color:white;font-size:large;background-color:transparent !important;background-image:linear-gradient(to right top,red 0%,#2a2139 30%);"]);
var StyledPreviewDiv = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "Container__StyledPreviewDiv",
  componentId: "dop8l8-6"
})(["color:black;padding:10px;background-color:grey !important;"]);
// CONCATENATED MODULE: ./src/components/codeEditor/CodeEditor.tsx




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











var StyledCard = Object(styled_components_browser_esm["b" /* default */])(esm_Card_Card).withConfig({
  displayName: "CodeEditor__StyledCard",
  componentId: "gctgi4-0"
})(["padding:0;.MuiPaper-root{}.MuiCardContent-root{padding:0;:last-child{padding:0;}}"]);
var CodeEditor_CodeEditor = function CodeEditor(_ref) {
  var children = _ref.children,
      live = _ref.live,
      render = _ref.render,
      className = _ref.className,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? "Example" : _ref$title;
  return live ? /*#__PURE__*/Object(jsx_runtime["jsx"])(ScopedCssBaseline["a" /* default */], {
    children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(esm_Paper_Paper, {
      elevation: 10,
      square: true,
      children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(esm_AppBar_AppBar, {
        position: "static",
        children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(esm_Toolbar_Toolbar, {
          children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(esm_IconButton_IconButton, {
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            children: /*#__PURE__*/Object(jsx_runtime["jsx"])(Menu_default.a, {})
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Typography_Typography, {
            variant: "h5",
            children: title
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])(Button["a" /* default */], {
            color: "inherit",
            children: "Reset"
          })]
        })
      }), /*#__PURE__*/Object(jsx_runtime["jsx"])(Box_Box, {
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(react_live_es_LiveProvider, {
          code: String(children).trim(),
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledCard, {
            square: true,
            children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(esm_CardContent_CardContent, {
              children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Paper_Paper, {
                square: true,
                children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledEditorDiv, {
                  children: /*#__PURE__*/Object(jsx_runtime["jsx"])(LiveEditor, {})
                })
              }), /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Paper_Paper, {
                square: true,
                children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledLiveErrorDiv, {
                  children: /*#__PURE__*/Object(jsx_runtime["jsx"])(LiveError, {})
                })
              }), /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Paper_Paper, {
                square: true,
                children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledPreviewDiv, {
                  children: /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Grid_Grid, {
                    container: true,
                    spacing: 3,
                    direction: "row",
                    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Grid_Grid, {
                      item: true,
                      xs: true,
                      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Paper_Paper, {
                        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(LivePreview, {
                          id: "live-copy"
                        })
                      })
                    })
                  })
                })
              })]
            })
          })
        })
      })]
    })
  }) : render ? /*#__PURE__*/Object(jsx_runtime["jsx"])(Container, {
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledProvider, {
      code: String(children).trim(),
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(RenderWrapper, {
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledPreview, {})
      })
    })
  }) : /*#__PURE__*/Object(jsx_runtime["jsx"])(dist, _objectSpread(_objectSpread({}, defaultProps), {}, {
    code: String(children).trim(),
    language: className === null || className === void 0 ? void 0 : className.replace(/language-/, ""),
    children: function children(_ref2) {
      var className = _ref2.className,
          style = _ref2.style,
          tokens = _ref2.tokens,
          getLineProps = _ref2.getLineProps,
          getTokenProps = _ref2.getTokenProps;
      return /*#__PURE__*/Object(jsx_runtime["jsx"])("pre", {
        className: className,
        style: _objectSpread(_objectSpread({}, style), {}, {
          padding: "20px"
        }),
        children: tokens.map(function (line, i) {
          return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", _objectSpread(_objectSpread({}, getLineProps({
            line: line,
            key: i
          })), {}, {
            children: line.map(function (token, key) {
              return /*#__PURE__*/Object(jsx_runtime["jsx"])("span", _objectSpread({}, getTokenProps({
                token: token,
                key: key
              })), key);
            })
          }), i);
        })
      });
    }
  }));
};
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(204);

// CONCATENATED MODULE: ./src/templates/blog-post.tsx




function blog_post_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function blog_post_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { blog_post_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { blog_post_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











var components = {
  pre: function PreComp(props) {
    return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", blog_post_objectSpread({}, props));
  },
  code: CodeEditor_CodeEditor
};
var StyledHeader = styled_components_browser_esm["b" /* default */].h1.withConfig({
  displayName: "blog-post__StyledHeader",
  componentId: "sc-1qbxoez-0"
})(["margin-top:", ";margin-bottom:0;"], Object(typography["a" /* rhythm */])(1));

var _scale = Object(typography["b" /* scale */])(1 / 5),
    blog_post_fontSize = _scale.fontSize,
    blog_post_lineHeight = _scale.lineHeight;

var StyledDate = styled_components_browser_esm["b" /* default */].p.withConfig({
  displayName: "blog-post__StyledDate",
  componentId: "sc-1qbxoez-1"
})(["font-size:", ";line-height:", ";display:block;margin-bottom:", ";"], blog_post_fontSize, blog_post_lineHeight, Object(typography["a" /* rhythm */])(1));
var Hr = styled_components_browser_esm["b" /* default */].hr.withConfig({
  displayName: "blog-post__Hr",
  componentId: "sc-1qbxoez-2"
})(["margin-bottom:", ";"], Object(typography["a" /* rhythm */])(1));

var blog_post_BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext;
  var post = data.mdx;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return /*#__PURE__*/Object(jsx_runtime["jsx"])(esm["MDXProvider"], {
      components: components,
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(gatsby_plugin_mdx["MDXRenderer"], {
        children: post.body
      })
    });
  };

  return /*#__PURE__*/Object(jsx_runtime["jsx"])(react["Fragment"], {
    children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(layout["a" /* Layout */], {
      children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(seo["a" /* SEO */], {
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt
      }), /*#__PURE__*/Object(jsx_runtime["jsxs"])("header", {
        children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(StyledHeader, {
          children: post.frontmatter.title
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])(StyledDate, {
          children: post.frontmatter.date
        })]
      }), /*#__PURE__*/Object(jsx_runtime["jsx"])(BlogPost, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(Hr, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])("footer", {
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(bio["a" /* Bio */], {})
      }), /*#__PURE__*/Object(jsx_runtime["jsx"])("nav", {
        children: /*#__PURE__*/Object(jsx_runtime["jsxs"])("ul", {
          children: [previous && /*#__PURE__*/Object(jsx_runtime["jsx"])("li", {
            children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(gatsby_browser_entry["Link"], {
              to: previous.fields.slug,
              rel: "prev",
              children: ["\u2190 ", previous.frontmatter.title]
            })
          }), next && /*#__PURE__*/Object(jsx_runtime["jsx"])("li", {
            children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(gatsby_browser_entry["Link"], {
              to: next.fields.slug,
              rel: "next",
              children: [next.frontmatter.title, " \u2192"]
            })
          })]
        })
      })]
    })
  });
};

/* harmony default export */ var blog_post = __webpack_exports__["default"] = (blog_post_BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),
/* 1094 */,
/* 1095 */,
/* 1096 */,
/* 1097 */,
/* 1098 */,
/* 1099 */,
/* 1100 */,
/* 1101 */,
/* 1102 */,
/* 1103 */,
/* 1104 */,
/* 1105 */,
/* 1106 */,
/* 1107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: styles

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 2 modules
var withStyles = __webpack_require__(65);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js




var html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box'
};
var CssBaseline_body = function body(theme) {
  return Object(esm_extends["a" /* default */])({
    color: theme.palette.text.primary
  }, theme.typography.body2, {
    backgroundColor: theme.palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: theme.palette.common.white
    }
  });
};
var CssBaseline_styles = function styles(theme) {
  return {
    '@global': {
      html: html,
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      'strong, b': {
        fontWeight: theme.typography.fontWeightBold
      },
      body: Object(esm_extends["a" /* default */])({
        margin: 0
      }, CssBaseline_body(theme), {
        // Add support for document.body.requestFullScreen().
        // Other elements, if background transparent, are not supported.
        '&::backdrop': {
          backgroundColor: theme.palette.background.default
        }
      })
    }
  };
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

function CssBaseline(props) {
  /* eslint-disable no-unused-vars */
  var _props$children = props.children,
      children = _props$children === void 0 ? null : _props$children,
      classes = props.classes;
  /* eslint-enable no-unused-vars */

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, children);
}

 false ? undefined : void 0;

if (false) {}

/* harmony default export */ var CssBaseline_CssBaseline = (Object(withStyles["a" /* default */])(CssBaseline_styles, {
  name: 'MuiCssBaseline'
})(CssBaseline));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/ScopedCssBaseline/ScopedCssBaseline.js






var ScopedCssBaseline_styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: Object(esm_extends["a" /* default */])({}, html, CssBaseline_body(theme), {
      '& *, & *::before, & *::after': {
        boxSizing: 'inherit'
      },
      '& strong, & b': {
        fontWeight: theme.typography.fontWeightBold
      }
    })
  };
};
var ScopedCssBaseline_ScopedCssBaseline = /*#__PURE__*/react["forwardRef"](function ScopedCssBaseline(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = Object(objectWithoutProperties["a" /* default */])(props, ["classes", "className"]);

  return /*#__PURE__*/react["createElement"]("div", Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_ScopedCssBaseline_ScopedCssBaseline = __webpack_exports__["a"] = (Object(withStyles["a" /* default */])(ScopedCssBaseline_styles, {
  name: 'MuiScopedCssBaseline'
})(ScopedCssBaseline_ScopedCssBaseline));

/***/ }),
/* 1108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* reexport */ esm_SvgIcon_SvgIcon; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 2 modules
var withStyles = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/capitalize.js
var capitalize = __webpack_require__(131);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/SvgIcon/SvgIcon.js






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      fontSize: theme.typography.pxToRem(24),
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shorter
      })
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: theme.palette.primary.main
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: theme.palette.secondary.main
    },

    /* Styles applied to the root element if `color="action"`. */
    colorAction: {
      color: theme.palette.action.active
    },

    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: theme.palette.error.main
    },

    /* Styles applied to the root element if `color="disabled"`. */
    colorDisabled: {
      color: theme.palette.action.disabled
    },

    /* Styles applied to the root element if `fontSize="inherit"`. */
    fontSizeInherit: {
      fontSize: 'inherit'
    },

    /* Styles applied to the root element if `fontSize="small"`. */
    fontSizeSmall: {
      fontSize: theme.typography.pxToRem(20)
    },

    /* Styles applied to the root element if `fontSize="large"`. */
    fontSizeLarge: {
      fontSize: theme.typography.pxToRem(35)
    }
  };
};
var SvgIcon_SvgIcon = /*#__PURE__*/react["forwardRef"](function SvgIcon(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'inherit' : _props$color,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'svg' : _props$component,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? 'default' : _props$fontSize,
      htmlColor = props.htmlColor,
      titleAccess = props.titleAccess,
      _props$viewBox = props.viewBox,
      viewBox = _props$viewBox === void 0 ? '0 0 24 24' : _props$viewBox,
      other = Object(objectWithoutProperties["a" /* default */])(props, ["children", "classes", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);

  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, className, color !== 'inherit' && classes["color".concat(Object(capitalize["a" /* default */])(color))], fontSize !== 'default' && classes["fontSize".concat(Object(capitalize["a" /* default */])(fontSize))]),
    focusable: "false",
    viewBox: viewBox,
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, other), children, titleAccess ? /*#__PURE__*/react["createElement"]("title", null, titleAccess) : null);
});
 false ? undefined : void 0;
SvgIcon_SvgIcon.muiName = 'SvgIcon';
/* harmony default export */ var esm_SvgIcon_SvgIcon = (Object(withStyles["a" /* default */])(styles, {
  name: 'MuiSvgIcon'
})(SvgIcon_SvgIcon));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/SvgIcon/index.js


/***/ })
]]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-9ac728e881b852dbaad0.js.map