(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[16],{

/***/ 1149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "cache", function() { return /* binding */ emotion_esm_cache; });
__webpack_require__.d(__webpack_exports__, "css", function() { return /* binding */ emotion_esm_css; });
__webpack_require__.d(__webpack_exports__, "cx", function() { return /* binding */ emotion_esm_cx; });
__webpack_require__.d(__webpack_exports__, "flush", function() { return /* binding */ flush; });
__webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return /* binding */ emotion_esm_getRegisteredStyles; });
__webpack_require__.d(__webpack_exports__, "hydrate", function() { return /* binding */ hydrate; });
__webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return /* binding */ emotion_esm_injectGlobal; });
__webpack_require__.d(__webpack_exports__, "keyframes", function() { return /* binding */ emotion_esm_keyframes; });
__webpack_require__.d(__webpack_exports__, "merge", function() { return /* binding */ emotion_esm_merge; });
__webpack_require__.d(__webpack_exports__, "sheet", function() { return /* binding */ sheet; });

// CONCATENATED MODULE: ./node_modules/@emotion/sheet/dist/sheet.browser.esm.js
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (false) {}
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();


// EXTERNAL MODULE: ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js
var stylis_browser_esm = __webpack_require__(295);

// CONCATENATED MODULE: ./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ var weak_memoize_browser_esm = (weakMemoize);
// CONCATENATED MODULE: ./node_modules/@emotion/cache/dist/cache.browser.esm.js


 // https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler

var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};

var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var cache_browser_esm_createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_browser_esm["a" /* default */](stylisOptions);

  if (false) {}

  var inserted = {}; // $FlowFixMe

  var container;
  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if (false) { var map; }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  if (false) { var commentEnd, commentStart; }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* harmony default export */ var cache_browser_esm = (cache_browser_esm_createCache);
// CONCATENATED MODULE: ./node_modules/@emotion/hash/dist/hash.browser.esm.js
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ var hash_browser_esm = (murmur2);
// EXTERNAL MODULE: ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitless_browser_esm = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js
var memoize_browser_esm = __webpack_require__(297);

// CONCATENATED MODULE: ./node_modules/@emotion/serialize/dist/serialize.browser.esm.js



var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = Object(memoize_browser_esm["a" /* default */])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var serialize_browser_esm_processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitless_browser_esm["a" /* default */][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (false) { var hyphenatedCache, hyphenPattern, msPattern, oldProcessStyleValue, contentValues, contentValuePattern; }

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (false) {}

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (false) {}

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (false) {}

        break;
      }

    case 'string':
      if (false) { var replaced, matched; }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (false) {}

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + serialize_browser_esm_processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + serialize_browser_esm_processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (false) {}

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (false) {} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;

var serialize_browser_esm_serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (false) {}

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (false) {}

      styles += strings[i];
    }
  }

  var sourceMap;

  if (false) {} // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = hash_browser_esm(styles) + identifierName;

  if (false) {}

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};


// CONCATENATED MODULE: ./node_modules/@emotion/utils/dist/utils.browser.esm.js
var isBrowser = "object" !== 'undefined';

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}

var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);
      current = current.next;
    } while (current !== undefined);
  }
};


// CONCATENATED MODULE: ./node_modules/create-emotion/dist/create-emotion.browser.esm.js




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var create_emotion_browser_esm_createEmotion = function createEmotion(options) {
  var cache = cache_browser_esm(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if (false) {}

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

/* harmony default export */ var create_emotion_browser_esm = (create_emotion_browser_esm_createEmotion);
// CONCATENATED MODULE: ./node_modules/emotion/dist/emotion.esm.js


var _createEmotion = create_emotion_browser_esm(),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    emotion_esm_cx = _createEmotion.cx,
    emotion_esm_merge = _createEmotion.merge,
    emotion_esm_getRegisteredStyles = _createEmotion.getRegisteredStyles,
    emotion_esm_injectGlobal = _createEmotion.injectGlobal,
    emotion_esm_keyframes = _createEmotion.keyframes,
    emotion_esm_css = _createEmotion.css,
    sheet = _createEmotion.sheet,
    emotion_esm_cache = _createEmotion.cache;



/***/ }),

/***/ 1151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(22);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(11);

// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(77);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(102);

// EXTERNAL MODULE: ./src/components/utils/sha256/sha256.worker.ts
var sha256_worker = __webpack_require__(556);

// CONCATENATED MODULE: ./src/components/utils/sha256/sha256.utils.ts



var sha256_utils_Sha256 = function Sha256(hashTable) {
  if (hashTable === void 0) {
    hashTable = {};
  }

  return {
    hash: function () {
      var _hash = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(input) {
        var strInput, hash, shorterHash, shortener;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shortener = function _shortener(hash) {
                  for (var i = 1; i < 64; i++) {
                    var _shorterHash = hash.substr(0, i);

                    if (hashTable[_shorterHash] === undefined) {
                      hashTable[_shorterHash] = hash;
                      return _shorterHash;
                    }

                    if (hashTable[_shorterHash] === hash) return _shorterHash;
                  }

                  return hash;
                };

                strInput = typeof input !== "string" ? JSON.stringify(input) : input;
                _context.next = 4;
                return sha256(strInput);

              case 4:
                hash = _context.sent;
                shorterHash = shortener(hash);
                hashTable[hash] = input;
                return _context.abrupt("return", shorterHash);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function hash(_x) {
        return _hash.apply(this, arguments);
      }

      return hash;
    }(),
    unHash: function () {
      var _unHash = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(hash) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", hashTable[hashTable[hash]]);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function unHash(_x2) {
        return _unHash.apply(this, arguments);
      }

      return unHash;
    }()
  };
};

function sha256(_x3) {
  return _sha.apply(this, arguments);
}

function _sha() {
  _sha = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(message) {
    var msgBuffer, hashBuffer, hashArray, hashHex;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            msgBuffer = new TextEncoder().encode(message);
            _context3.next = 3;
            return crypto.subtle.digest("SHA-256", msgBuffer);

          case 3:
            hashBuffer = _context3.sent;
            hashArray = Array.from(new Uint8Array(hashBuffer)); // convert bytes to hex string

            hashHex = hashArray.map(function (b) {
              return ("00" + b.toString(16)).slice(-2);
            }).join("");
            return _context3.abrupt("return", hashHex);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _sha.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/components/utils/sha.ts





var sha256W = typeof window !== "undefined" && sha256_worker["Sha256Worker"] || sha256_utils_Sha256;
var loadedModule;
var _hash$unHash = {
  hash: function () {
    var _hash = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(str) {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loadedModule) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return sha256W();

            case 3:
              loadedModule = _context.sent;

            case 4:
              return _context.abrupt("return", loadedModule.hash(str));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function hash(_x) {
      return _hash.apply(this, arguments);
    }

    return hash;
  }(),
  unHash: function () {
    var _unHash = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(hash) {
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (loadedModule) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return sha256W();

            case 3:
              loadedModule = _context2.sent;

            case 4:
              return _context2.abrupt("return", loadedModule.unHash(hash));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function unHash(_x2) {
      return _unHash.apply(this, arguments);
    }

    return unHash;
  }()
},
    sha_hash = _hash$unHash.hash,
    sha_unHash = _hash$unHash.unHash;

// EXTERNAL MODULE: ./src/components/utils/babel/babel.worker.ts
var babel_worker = __webpack_require__(557);

// EXTERNAL MODULE: ./node_modules/@babel/standalone/babel.js
var babel = __webpack_require__(558);

// CONCATENATED MODULE: ./src/components/utils/babel/babel.utils.ts




var TransformModule = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", {
              transform: function () {
                var _transform2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(code) {
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", Object(babel["transform"])(code, {
                            plugins: [],
                            presets: ["react", ["typescript", {
                              isTSX: true,
                              allExtensions: true
                            }]]
                          }).code);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function transform(_x) {
                  return _transform2.apply(this, arguments);
                }

                return transform;
              }()
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function TransformModule() {
    return _ref.apply(this, arguments);
  };
}();
// CONCATENATED MODULE: ./src/components/utils/babel.ts






var transformW = typeof window !== "undefined" && babel_worker["TransformWorker"] || TransformModule;
var babel_loadedModule;
var babel_transform = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(codeHash) {
    var code, transFormedCode, transformedCodeHash;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (babel_loadedModule) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return transformW();

          case 3:
            babel_loadedModule = _context.sent;

          case 4:
            _context.next = 6;
            return sha_unHash(codeHash);

          case 6:
            code = _context.sent;
            _context.prev = 7;
            _context.next = 10;
            return babel_loadedModule.transform(code);

          case 10:
            transFormedCode = _context.sent;
            _context.next = 13;
            return sha_hash(transFormedCode);

          case 13:
            transformedCodeHash = _context.sent;
            return _context.abrupt("return", transformedCodeHash);

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](7);
            console.log("Some babel error", _context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 17]]);
  }));

  return function transform(_x) {
    return _ref.apply(this, arguments);
  };
}();
// EXTERNAL MODULE: ./src/components/utils/renderer/renderer.worker.ts
var renderer_worker = __webpack_require__(577);

// EXTERNAL MODULE: ./node_modules/react-dom/server.browser.js
var server_browser = __webpack_require__(578);
var server_browser_default = /*#__PURE__*/__webpack_require__.n(server_browser);

// EXTERNAL MODULE: ./node_modules/pretty/index.js
var pretty = __webpack_require__(580);
var pretty_default = /*#__PURE__*/__webpack_require__.n(pretty);

// CONCATENATED MODULE: ./src/components/utils/renderer/renderer.utils.tsx






var RendererModule = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", {
              render: function () {
                var _render = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(code, props) {
                  var cf, Component;
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          cf = new Function("props", "React", code + "; return Component(props)");

                          Component = function Component(props) {
                            return cf(props, react);
                          };

                          return _context.abrupt("return", String(pretty_default()(server_browser_default.a.renderToString( /*#__PURE__*/react["createElement"](Component, props)), {
                            ocd: true
                          })).toString());

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function render(_x, _x2) {
                  return _render.apply(this, arguments);
                }

                return render;
              }()
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function RendererModule() {
    return _ref.apply(this, arguments);
  };
}();
// CONCATENATED MODULE: ./src/components/utils/renderer.ts






var rendererW = typeof window !== "undefined" && renderer_worker["RendererWorker"] || RendererModule;
var renderer_loadedModule;
var renderer_render = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(transformedCodeHash, defaultPropsHash) {
    var code, defaultProps, renderedString, renderedStringHash;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (renderer_loadedModule) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return rendererW();

          case 3:
            renderer_loadedModule = _context.sent;

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return sha_unHash(transformedCodeHash);

          case 7:
            code = _context.sent;
            _context.next = 10;
            return sha_unHash(defaultPropsHash);

          case 10:
            defaultProps = _context.sent;
            _context.next = 13;
            return renderer_loadedModule.render(code, defaultProps);

          case 13:
            renderedString = _context.sent;
            _context.next = 16;
            return sha_hash(renderedString);

          case 16:
            renderedStringHash = _context.sent;
            return _context.abrupt("return", renderedStringHash);

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](4);
            console.log("Error in render", _context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 20]]);
  }));

  return function render(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// EXTERNAL MODULE: ./node_modules/react-diff-viewer/lib/index.js
var lib = __webpack_require__(588);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/html-format/index.js
var html_format = __webpack_require__(594);
var html_format_default = /*#__PURE__*/__webpack_require__.n(html_format);

// CONCATENATED MODULE: ./src/pages/zoli.tsx






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // import ReactDOM from "react-dom";
// import Prism from "prismjs";






var MonacoEditor = /*#__PURE__*/react["lazy"](function () {
  return Promise.all(/* import() */[__webpack_require__.e(6), __webpack_require__.e(1), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, 1189));
});

var zoli_CodeEditorWithFailBack = function CodeEditorWithFailBack(_ref) {
  var code = _ref.code,
      _changeCode = _ref.changeCode;
  return /*#__PURE__*/react["createElement"]("div", null, /*#__PURE__*/react["createElement"](react["Suspense"], {
    fallback: /*#__PURE__*/react["createElement"]("div", null, "Loading...")
  }, /*#__PURE__*/react["createElement"](MonacoEditor, {
    value: code,
    changeCode: function changeCode(e) {
      return _changeCode(e);
    }
  })));
};

var counter = "\ntype DState = { counter: number}\n\nconst actions = {\n  \"+1\": (s: DState) => ({ ...s, counter: s.counter + 1 }),\n  \"-1\": (s: DState) => ({ ...s, counter: s.counter - 1 }),\n};\n\ntype ActionType = keyof typeof actions;\n\ninterface Props {\n    startState: DState\n    pastEvents: string[]\n    onEvent: (action: string)=>void \n}\n\nconst Component: React.FC<Props> = ({ startState, pastEvents, onEvent }) => {\n  const [state, setState] = React.useState({startState, pastEvents});\n\n  const calculatedState = state.pastEvents.reduce(\n    (prevValue, currentValue) => actions[currentValue](prevValue),\n    startState \n  );\n\n  return <div>\n    <button {...update(\"-1\")}>-</button>\n    {calculatedState.counter}\n    <button {...update(\"+1\")}>+</button>\n  </div>;\n\n\n  function update(action: ActionType) {\n    return {\n      \"data-onclick\": String(action),\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        onEvent(action);\n        setState({ ...state, pastEvents: [...state.pastEvents, action] });\n      },\n    };\n  }\n};\n\n\n\n";

var zoli_getComponent = function getComponent(code, props) {
  var componentFactory = new Function("props", "React", code + "; return Component(props)");

  var Component = function Component(props) {
    return componentFactory(props, react);
  };

  return Component;
};

var zoli_defaultProps = {
  startState: {
    counter: 0
  },
  pastEvents: new Array(10).fill("+1"),
  onEvent: function onEvent(action) {}
};

var zoli_Wrapper = function Wrapper(_ref2) {
  var code = _ref2.code,
      defaultProps = _ref2.defaultProps;
  if (!code) return /*#__PURE__*/react["createElement"]("div", null, "Loading");
  var Component = zoli_getComponent(code, defaultProps);
  return /*#__PURE__*/react["createElement"](Component, {
    startState: defaultProps.startState,
    pastEvents: defaultProps.pastEvents,
    onEvent: defaultProps.onEvent
  });
};

var zoli_ZedZoliPage = function ZedZoliPage() {
  var _React$useState = react["useState"]({
    code: "",
    transformedCode: "",
    mainCode: "",
    mainCodeHash: "",
    devCodeHash: "",
    defaultProps: zoli_defaultProps,
    defaultStateHash: "",
    codeHash: "",
    transformedMainCode: "",
    transformedHash: "",
    transformedMainHash: "",
    renderedHash: "",
    renderedContent: "",
    renderedMainHash: "",
    renderedContentMain: ""
  }),
      renderedComponent = _React$useState[0],
      changeWorkerRenderedComponent = _React$useState[1];

  var _React$useState2 = react["useState"](counter),
      code = _React$useState2[0],
      changeCode = _React$useState2[1];

  react["useEffect"](function () {
    var runner = /*#__PURE__*/function () {
      var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var devCodeHash, codeHash, mainCode, mainCodeHash, transformedHash, transformedMainHash, defaultStateHash, transformedCode, transformedMainCode, renderedHash, renderedMainHash, renderedContent, renderedContentMain;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sha_hash(code);

              case 2:
                devCodeHash = _context.sent;
                codeHash = devCodeHash;
                mainCode = renderedComponent.mainCode ? renderedComponent.mainCode : code;
                mainCodeHash = renderedComponent.mainCodeHash ? renderedComponent.mainCodeHash : devCodeHash;
                _context.next = 8;
                return babel_transform(codeHash);

              case 8:
                transformedHash = _context.sent;
                _context.next = 11;
                return babel_transform(mainCodeHash);

              case 11:
                transformedMainHash = _context.sent;
                _context.next = 14;
                return sha_hash(renderedComponent.defaultProps);

              case 14:
                defaultStateHash = _context.sent;
                _context.next = 17;
                return sha_unHash(transformedHash);

              case 17:
                transformedCode = _context.sent;
                _context.next = 20;
                return sha_unHash(transformedMainHash);

              case 20:
                transformedMainCode = _context.sent;
                _context.next = 23;
                return renderer_render(transformedHash, defaultStateHash);

              case 23:
                renderedHash = _context.sent;
                _context.next = 26;
                return renderer_render(transformedMainHash, defaultStateHash);

              case 26:
                renderedMainHash = _context.sent;
                _context.next = 29;
                return sha_unHash(renderedHash);

              case 29:
                renderedContent = _context.sent;
                _context.next = 32;
                return sha_unHash(renderedMainHash);

              case 32:
                renderedContentMain = _context.sent;
                changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
                  code: code,
                  devCodeHash: devCodeHash,
                  mainCode: mainCode,
                  mainCodeHash: mainCodeHash,
                  codeHash: codeHash,
                  transformedHash: transformedHash,
                  transformedMainCode: transformedMainCode,
                  transformedMainHash: transformedMainHash,
                  transformedCode: transformedCode,
                  defaultStateHash: defaultStateHash,
                  renderedHash: renderedHash,
                  renderedContent: renderedContent,
                  renderedMainHash: renderedMainHash,
                  renderedContentMain: renderedContentMain
                }));

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function runner() {
        return _ref3.apply(this, arguments);
      };
    }();

    if (typeof window !== "undefined") runner();
  }, [code, renderedComponent.defaultProps]);
  var isChangeAvailable = renderedComponent.renderedContent && renderedComponent.renderedMainHash !== renderedComponent.renderedHash;
  var isError = !renderedComponent.renderedContent; // const highlightSyntax = (str: string) =>
  //   <pre
  //     style={{ display: "inline" }}
  //     dangerouslySetInnerHTML={{
  //       __html: Prism.highlight((str), Prism.languages["html"], "html"),
  //     }}
  //   />;

  var onEvent = function onEvent(action) {
    return changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
      defaultProps: _objectSpread(_objectSpread({}, renderedComponent.defaultProps), {}, {
        pastEvents: [].concat(Object(toConsumableArray["a" /* default */])(renderedComponent.defaultProps.pastEvents), [action])
      })
    }));
  };

  return /*#__PURE__*/react["createElement"](layout["a" /* Layout */], null, /*#__PURE__*/react["createElement"](seo["a" /* SEO */], {
    title: "Test Worker side rendering"
  }), typeof window !== "undefined" && /*#__PURE__*/react["createElement"](zoli_CodeEditorWithFailBack, {
    code: code,
    changeCode: changeCode
  }), isError && /*#__PURE__*/react["createElement"]("h1", null, "Error"), !isChangeAvailable && /*#__PURE__*/react["createElement"]("div", null, /*#__PURE__*/react["createElement"]("h4", null, "Result"), /*#__PURE__*/react["createElement"](zoli_Wrapper, {
    key: renderedComponent.mainCodeHash,
    code: renderedComponent.transformedCode,
    defaultProps: _objectSpread(_objectSpread({}, renderedComponent.defaultProps), {}, {
      onEvent: onEvent
    })
  })), isChangeAvailable && /*#__PURE__*/react["createElement"]("div", null, /*#__PURE__*/react["createElement"](lib_default.a, {
    oldValue: html_format_default()(renderedComponent.renderedContent),
    newValue: html_format_default()(renderedComponent.renderedContentMain),
    showDiffOnly: true // renderContent={highlightSyntax}
    ,
    leftTitle: /*#__PURE__*/react["createElement"](zoli_Wrapper, {
      key: renderedComponent.codeHash,
      code: renderedComponent.transformedCode,
      defaultProps: _objectSpread(_objectSpread({}, renderedComponent.defaultProps), {}, {
        onEvent: onEvent
      })
    }),
    rightTitle: /*#__PURE__*/react["createElement"](zoli_Wrapper, {
      key: renderedComponent.mainCodeHash,
      code: renderedComponent.transformedMainCode,
      defaultProps: _objectSpread(_objectSpread({}, renderedComponent.defaultProps), {}, {
        onEvent: onEvent
      })
    }),
    hideLineNumbers: true,
    splitView: true
  }), /*#__PURE__*/react["createElement"]("button", {
    onClick: function onClick() {
      return changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
        mainCodeHash: renderedComponent.codeHash,
        renderedContentMain: renderedComponent.renderedContent,
        renderedMainHash: renderedComponent.renderedHash
      }));
    }
  }, "Save change - as main code"), /*#__PURE__*/react["createElement"]("button", {
    onClick: function onClick() {
      changeCode(renderedComponent.mainCode);
      changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
        code: renderedComponent.mainCode
      }));
    }
  }, "Restore")));
};

/* harmony default export */ var zoli = __webpack_exports__["default"] = (zoli_ZedZoliPage);

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

function addMethods(worker, methods) {
  var c = 0;
  var callbacks = {};
  worker.addEventListener('message', function (e) {
    var d = e.data;
    if (d.type !== 'RPC') return;

    if (d.id) {
      var f = callbacks[d.id];

      if (f) {
        delete callbacks[d.id];

        if (d.error) {
          f[1](Object.assign(Error(d.error.message), d.error));
        } else {
          f[0](d.result);
        }
      }
    } else {
      var evt = document.createEvent('Event');
      evt.initEvent(d.method, false, false);
      evt.data = d.params;
      worker.dispatchEvent(evt);
    }
  });
  methods.forEach(function (method) {
    worker[method] = function () {
      var _arguments = arguments;
      return new Promise(function (a, b) {
        var id = ++c;
        callbacks[id] = [a, b];
        worker.postMessage({
          type: 'RPC',
          id: id,
          method: method,
          params: [].slice.call(_arguments)
        });
      });
    };
  });
}

module.exports = addMethods;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */

/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@beautifier.io>
        https://beautifier.io/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/
// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/
(function () {
  /* GENERATED_BUILD_OUTPUT */
  var legacy_beautify_css =
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // The module cache

    /******/
    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "";
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/

    return __webpack_require__(__webpack_require__.s = 15);
    /******/
  }(
  /************************************************************************/

  /******/
  [,,
  /* 0 */

  /* 1 */

  /* 2 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0; // use indent_count as a marker for this.__lines that have preserved indentation

      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
      this.__items = [];
    }

    OutputLine.prototype.clone_empty = function () {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };

    OutputLine.prototype.item = function (index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };

    OutputLine.prototype.has_match = function (pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }

      return false;
    };

    OutputLine.prototype.set_indent = function (indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };

    OutputLine.prototype._set_wrap_point = function () {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };

    OutputLine.prototype._should_wrap = function () {
      return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };

    OutputLine.prototype._allow_wrap = function () {
      if (this._should_wrap()) {
        this.__parent.add_new_line();

        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;

        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);

          next.__character_count -= 1;
        }

        return true;
      }

      return false;
    };

    OutputLine.prototype.is_empty = function () {
      return this.__items.length === 0;
    };

    OutputLine.prototype.last = function () {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };

    OutputLine.prototype.push = function (item) {
      this.__items.push(item);

      var last_newline_index = item.lastIndexOf('\n');

      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };

    OutputLine.prototype.pop = function () {
      var item = null;

      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }

      return item;
    };

    OutputLine.prototype._remove_indent = function () {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };

    OutputLine.prototype._remove_wrap_indent = function () {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };

    OutputLine.prototype.trim = function () {
      while (this.last() === ' ') {
        this.__items.pop();

        this.__character_count -= 1;
      }
    };

    OutputLine.prototype.toString = function () {
      var result = '';

      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }

      return result;
    };

    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;

      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      } // Set to null to continue support for auto detection of base indent


      baseIndentString = baseIndentString || '';

      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }

      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }

    IndentStringCache.prototype.get_indent_size = function (indent, column) {
      var result = this.__base_string_length;
      column = column || 0;

      if (indent < 0) {
        result = 0;
      }

      result += indent * this.__indent_size;
      result += column;
      return result;
    };

    IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
      var result = this.__base_string;
      column = column || 0;

      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }

      column += indent_level * this.__indent_size;

      this.__ensure_cache(column);

      result += this.__cache[column];
      return result;
    };

    IndentStringCache.prototype.__ensure_cache = function (column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };

    IndentStringCache.prototype.__add_column = function () {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';

      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }

      if (column) {
        result += new Array(column + 1).join(' ');
      }

      this.__cache.push(result);
    };

    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false; // initialize

      this.__add_outputline();
    }

    Output.prototype.__add_outputline = function () {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();

      this.__lines.push(this.current_line);
    };

    Output.prototype.get_line_number = function () {
      return this.__lines.length;
    };

    Output.prototype.get_indent_string = function (indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };

    Output.prototype.get_indent_size = function (indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };

    Output.prototype.is_empty = function () {
      return !this.previous_line && this.current_line.is_empty();
    };

    Output.prototype.add_new_line = function (force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() || !force_newline && this.just_added_newline()) {
        return false;
      } // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had


      if (!this.raw) {
        this.__add_outputline();
      }

      return true;
    };

    Output.prototype.get_code = function (eol) {
      this.trim(true); // handle some edge cases where the last tokens
      // has text that ends with newline(s)

      var last_item = this.current_line.pop();

      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }

        this.current_line.push(last_item);
      }

      if (this._end_with_newline) {
        this.__add_outputline();
      }

      var sweet_code = this.__lines.join('\n');

      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }

      return sweet_code;
    };

    Output.prototype.set_wrap_point = function () {
      this.current_line._set_wrap_point();
    };

    Output.prototype.set_indent = function (indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0; // Next line stores alignment values

      this.next_line.set_indent(indent, alignment); // Never indent your first output indent at the start of the file

      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }

      this.current_line.set_indent();
      return false;
    };

    Output.prototype.add_raw_token = function (token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }

      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };

    Output.prototype.add_token = function (printable_token) {
      this.__add_space_before_token();

      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };

    Output.prototype.__add_space_before_token = function () {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }

        this.current_line.push(' ');
      }
    };

    Output.prototype.remove_indent = function (index) {
      var output_length = this.__lines.length;

      while (index < output_length) {
        this.__lines[index]._remove_indent();

        index++;
      }

      this.current_line._remove_wrap_indent();
    };

    Output.prototype.trim = function (eat_newlines) {
      eat_newlines = eat_newlines === undefined ? false : eat_newlines;
      this.current_line.trim();

      while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
        this.__lines.pop();

        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }

      this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
    };

    Output.prototype.just_added_newline = function () {
      return this.current_line.is_empty();
    };

    Output.prototype.just_added_blankline = function () {
      return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
    };

    Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
      var index = this.__lines.length - 2;

      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];

        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));

          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }

        index--;
      }
    };

    module.exports.Output = Output;
    /***/
  },,,,
  /* 3 */

  /* 4 */

  /* 5 */

  /* 6 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field); // Support passing the source text back with no change

      this.disabled = this._get_boolean('disabled');
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);

      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }

      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');

      if (this.indent_with_tabs) {
        this.indent_char = '\t'; // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.

        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      } // Backwards compat with 1.3.x


      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
      this.indent_empty_lines = this._get_boolean('indent_empty_lines'); // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored

      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }

    Options.prototype._get_array = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];

      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }

      return result;
    };

    Options.prototype._get_boolean = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };

    Options.prototype._get_characters = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';

      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }

      return result;
    };

    Options.prototype._get_number = function (name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);

      if (isNaN(default_value)) {
        default_value = 0;
      }

      var result = parseInt(option_value, 10);

      if (isNaN(result)) {
        result = default_value;
      }

      return result;
    };

    Options.prototype._get_selection = function (name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);

      if (result.length !== 1) {
        throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result[0];
    };

    Options.prototype._get_selection_list = function (name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }

      default_value = default_value || [selection_list[0]];

      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }

      var result = this._get_array(name, default_value);

      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result;
    };

    Options.prototype._is_valid_selection = function (result, selection_list) {
      return result.length && selection_list.length && !result.some(function (item) {
        return selection_list.indexOf(item) === -1;
      });
    }; // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}


    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;

      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      } //merge in the per type settings for the childFieldName


      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }

      return finalOpts;
    }

    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;

      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }

      return convertedOpts;
    }

    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    /***/
  },,
  /* 7 */

  /* 8 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }

    InputScanner.prototype.restart = function () {
      this.__position = 0;
    };

    InputScanner.prototype.back = function () {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };

    InputScanner.prototype.hasNext = function () {
      return this.__position < this.__input_length;
    };

    InputScanner.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }

      return val;
    };

    InputScanner.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }

      return val;
    }; // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.


    InputScanner.prototype.__match = function (pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }

      return pattern_match;
    };

    InputScanner.prototype.test = function (pattern, index) {
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };

    InputScanner.prototype.testChar = function (pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };

    InputScanner.prototype.match = function (pattern) {
      var pattern_match = this.__match(pattern, this.__position);

      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }

      return pattern_match;
    };

    InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;

      if (starting_pattern) {
        match = this.match(starting_pattern);

        if (match) {
          val += match[0];
        }
      }

      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }

      return val;
    };

    InputScanner.prototype.readUntil = function (pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match) {
        match_index = pattern_match.index;

        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }

      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };

    InputScanner.prototype.readUntilAfter = function (pattern) {
      return this.readUntil(pattern, true);
    };

    InputScanner.prototype.get_regexp = function (pattern, match_from) {
      var result = null;
      var flags = 'g';

      if (match_from && regexp_has_sticky) {
        flags = 'y';
      } // strings are converted to regexp


      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }

      return result;
    };

    InputScanner.prototype.get_literal_regexp = function (literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    /* css beautifier legacy helpers */


    InputScanner.prototype.peekUntilAfter = function (pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };

    InputScanner.prototype.lookBack = function (testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
    };

    module.exports.InputScanner = InputScanner;
    /***/
  },,,,,
  /* 9 */

  /* 10 */

  /* 11 */

  /* 12 */

  /* 13 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }

    Directives.prototype.get_directives = function (text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }

      var directives = {};
      this.__directive_pattern.lastIndex = 0;

      var directive_match = this.__directive_pattern.exec(text);

      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }

      return directives;
    };

    Directives.prototype.readIgnored = function (input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };

    module.exports.Directives = Directives;
    /***/
  },,
  /* 14 */

  /* 15 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Beautifier = __webpack_require__(16).Beautifier,
        Options = __webpack_require__(17).Options;

    function css_beautify(source_text, options) {
      var beautifier = new Beautifier(source_text, options);
      return beautifier.beautify();
    }

    module.exports = css_beautify;

    module.exports.defaultOptions = function () {
      return new Options();
    };
    /***/

  },
  /* 16 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Options = __webpack_require__(17).Options;

    var Output = __webpack_require__(2).Output;

    var InputScanner = __webpack_require__(8).InputScanner;

    var Directives = __webpack_require__(13).Directives;

    var directives_core = new Directives(/\/\*/, /\*\//);
    var lineBreak = /\r\n|[\r\n]/;
    var allLineBreaks = /\r\n|[\r\n]/g; // tokenizer

    var whitespaceChar = /\s/;
    var whitespacePattern = /(?:\s|\n)+/g;
    var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
    var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

    function Beautifier(source_text, options) {
      this._source_text = source_text || ''; // Allow the setting of language/file-type specific options
      // with inheritance of overall settings

      this._options = new Options(options);
      this._ch = null;
      this._input = null; // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule

      this.NESTED_AT_RULE = {
        "@page": true,
        "@font-face": true,
        "@keyframes": true,
        // also in CONDITIONAL_GROUP_RULE below
        "@media": true,
        "@supports": true,
        "@document": true
      };
      this.CONDITIONAL_GROUP_RULE = {
        "@media": true,
        "@supports": true,
        "@document": true
      };
    }

    Beautifier.prototype.eatString = function (endChars) {
      var result = '';
      this._ch = this._input.next();

      while (this._ch) {
        result += this._ch;

        if (this._ch === "\\") {
          result += this._input.next();
        } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
          break;
        }

        this._ch = this._input.next();
      }

      return result;
    }; // Skips any white space in the source text from the current position.
    // When allowAtLeastOneNewLine is true, will output new lines for each
    // newline character found; if the user has preserve_newlines off, only
    // the first newline will be output


    Beautifier.prototype.eatWhitespace = function (allowAtLeastOneNewLine) {
      var result = whitespaceChar.test(this._input.peek());
      var isFirstNewLine = true;

      while (whitespaceChar.test(this._input.peek())) {
        this._ch = this._input.next();

        if (allowAtLeastOneNewLine && this._ch === '\n') {
          if (this._options.preserve_newlines || isFirstNewLine) {
            isFirstNewLine = false;

            this._output.add_new_line(true);
          }
        }
      }

      return result;
    }; // Nested pseudo-class if we are insideRule
    // and the next special character found opens
    // a new block


    Beautifier.prototype.foundNestedPseudoClass = function () {
      var openParen = 0;
      var i = 1;

      var ch = this._input.peek(i);

      while (ch) {
        if (ch === "{") {
          return true;
        } else if (ch === '(') {
          // pseudoclasses can contain ()
          openParen += 1;
        } else if (ch === ')') {
          if (openParen === 0) {
            return false;
          }

          openParen -= 1;
        } else if (ch === ";" || ch === "}") {
          return false;
        }

        i++;
        ch = this._input.peek(i);
      }

      return false;
    };

    Beautifier.prototype.print_string = function (output_string) {
      this._output.set_indent(this._indentLevel);

      this._output.non_breaking_space = true;

      this._output.add_token(output_string);
    };

    Beautifier.prototype.preserveSingleSpace = function (isAfterSpace) {
      if (isAfterSpace) {
        this._output.space_before_token = true;
      }
    };

    Beautifier.prototype.indent = function () {
      this._indentLevel++;
    };

    Beautifier.prototype.outdent = function () {
      if (this._indentLevel > 0) {
        this._indentLevel--;
      }
    };
    /*_____________________--------------------_____________________*/


    Beautifier.prototype.beautify = function () {
      if (this._options.disabled) {
        return this._source_text;
      }

      var source_text = this._source_text;
      var eol = this._options.eol;

      if (eol === 'auto') {
        eol = '\n';

        if (source_text && lineBreak.test(source_text || '')) {
          eol = source_text.match(lineBreak)[0];
        }
      } // HACK: newline parsing inconsistent. This brute force normalizes the this._input.


      source_text = source_text.replace(allLineBreaks, '\n'); // reset

      var baseIndentString = source_text.match(/^[\t ]*/)[0];
      this._output = new Output(this._options, baseIndentString);
      this._input = new InputScanner(source_text);
      this._indentLevel = 0;
      this._nestedLevel = 0;
      this._ch = null;
      var parenLevel = 0;
      var insideRule = false; // This is the value side of a property value pair (blue in the following ex)
      // label { content: blue }

      var insidePropertyValue = false;
      var enteringConditionalGroup = false;
      var insideAtExtend = false;
      var insideAtImport = false;
      var topCharacter = this._ch;
      var whitespace;
      var isAfterSpace;
      var previous_ch;

      while (true) {
        whitespace = this._input.read(whitespacePattern);
        isAfterSpace = whitespace !== '';
        previous_ch = topCharacter;
        this._ch = this._input.next();

        if (this._ch === '\\' && this._input.hasNext()) {
          this._ch += this._input.next();
        }

        topCharacter = this._ch;

        if (!this._ch) {
          break;
        } else if (this._ch === '/' && this._input.peek() === '*') {
          // /* css comment */
          // Always start block comments on a new line.
          // This handles scenarios where a block comment immediately
          // follows a property definition on the same line or where
          // minified code is being beautified.
          this._output.add_new_line();

          this._input.back();

          var comment = this._input.read(block_comment_pattern); // Handle ignore directive


          var directives = directives_core.get_directives(comment);

          if (directives && directives.ignore === 'start') {
            comment += directives_core.readIgnored(this._input);
          }

          this.print_string(comment); // Ensures any new lines following the comment are preserved

          this.eatWhitespace(true); // Block comments are followed by a new line so they don't
          // share a line with other properties

          this._output.add_new_line();
        } else if (this._ch === '/' && this._input.peek() === '/') {
          // // single line comment
          // Preserves the space before a comment
          // on the same line as a rule
          this._output.space_before_token = true;

          this._input.back();

          this.print_string(this._input.read(comment_pattern)); // Ensures any new lines following the comment are preserved

          this.eatWhitespace(true);
        } else if (this._ch === '@') {
          this.preserveSingleSpace(isAfterSpace); // deal with less propery mixins @{...}

          if (this._input.peek() === '{') {
            this.print_string(this._ch + this.eatString('}'));
          } else {
            this.print_string(this._ch); // strip trailing space, if present, for hash property checks

            var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

            if (variableOrRule.match(/[ :]$/)) {
              // we have a variable or pseudo-class, add it and insert one space before continuing
              variableOrRule = this.eatString(": ").replace(/\s$/, '');
              this.print_string(variableOrRule);
              this._output.space_before_token = true;
            }

            variableOrRule = variableOrRule.replace(/\s$/, '');

            if (variableOrRule === 'extend') {
              insideAtExtend = true;
            } else if (variableOrRule === 'import') {
              insideAtImport = true;
            } // might be a nesting at-rule


            if (variableOrRule in this.NESTED_AT_RULE) {
              this._nestedLevel += 1;

              if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                enteringConditionalGroup = true;
              } // might be less variable

            } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
              insidePropertyValue = true;
              this.indent();
            }
          }
        } else if (this._ch === '#' && this._input.peek() === '{') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch + this.eatString('}'));
        } else if (this._ch === '{') {
          if (insidePropertyValue) {
            insidePropertyValue = false;
            this.outdent();
          } // when entering conditional groups, only rulesets are allowed


          if (enteringConditionalGroup) {
            enteringConditionalGroup = false;
            insideRule = this._indentLevel >= this._nestedLevel;
          } else {
            // otherwise, declarations are also allowed
            insideRule = this._indentLevel >= this._nestedLevel - 1;
          }

          if (this._options.newline_between_rules && insideRule) {
            if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
              this._output.ensure_empty_line_above('/', ',');
            }
          }

          this._output.space_before_token = true; // The difference in print_string and indent order is necessary to indent the '{' correctly

          if (this._options.brace_style === 'expand') {
            this._output.add_new_line();

            this.print_string(this._ch);
            this.indent();

            this._output.set_indent(this._indentLevel);
          } else {
            this.indent();
            this.print_string(this._ch);
          }

          this.eatWhitespace(true);

          this._output.add_new_line();
        } else if (this._ch === '}') {
          this.outdent();

          this._output.add_new_line();

          if (previous_ch === '{') {
            this._output.trim(true);
          }

          insideAtImport = false;
          insideAtExtend = false;

          if (insidePropertyValue) {
            this.outdent();
            insidePropertyValue = false;
          }

          this.print_string(this._ch);
          insideRule = false;

          if (this._nestedLevel) {
            this._nestedLevel--;
          }

          this.eatWhitespace(true);

          this._output.add_new_line();

          if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
            if (this._input.peek() !== '}') {
              this._output.add_new_line(true);
            }
          }
        } else if (this._ch === ":") {
          if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideAtExtend && parenLevel === 0) {
            // 'property: value' delimiter
            // which could be in a conditional group query
            this.print_string(':');

            if (!insidePropertyValue) {
              insidePropertyValue = true;
              this._output.space_before_token = true;
              this.eatWhitespace(true);
              this.indent();
            }
          } else {
            // sass/less parent reference don't use a space
            // sass nested pseudo-class don't use a space
            // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
            if (this._input.lookBack(" ")) {
              this._output.space_before_token = true;
            }

            if (this._input.peek() === ":") {
              // pseudo-element
              this._ch = this._input.next();
              this.print_string("::");
            } else {
              // pseudo-class
              this.print_string(':');
            }
          }
        } else if (this._ch === '"' || this._ch === '\'') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch + this.eatString(this._ch));
          this.eatWhitespace(true);
        } else if (this._ch === ';') {
          if (parenLevel === 0) {
            if (insidePropertyValue) {
              this.outdent();
              insidePropertyValue = false;
            }

            insideAtExtend = false;
            insideAtImport = false;
            this.print_string(this._ch);
            this.eatWhitespace(true); // This maintains single line comments on the same
            // line. Block comments are also affected, but
            // a new line is always output before one inside
            // that section

            if (this._input.peek() !== '/') {
              this._output.add_new_line();
            }
          } else {
            this.print_string(this._ch);
            this.eatWhitespace(true);
            this._output.space_before_token = true;
          }
        } else if (this._ch === '(') {
          // may be a url
          if (this._input.lookBack("url")) {
            this.print_string(this._ch);
            this.eatWhitespace();
            parenLevel++;
            this.indent();
            this._ch = this._input.next();

            if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
              this._input.back();
            } else if (this._ch) {
              this.print_string(this._ch + this.eatString(')'));

              if (parenLevel) {
                parenLevel--;
                this.outdent();
              }
            }
          } else {
            this.preserveSingleSpace(isAfterSpace);
            this.print_string(this._ch);
            this.eatWhitespace();
            parenLevel++;
            this.indent();
          }
        } else if (this._ch === ')') {
          if (parenLevel) {
            parenLevel--;
            this.outdent();
          }

          this.print_string(this._ch);
        } else if (this._ch === ',') {
          this.print_string(this._ch);
          this.eatWhitespace(true);

          if (this._options.selector_separator_newline && !insidePropertyValue && parenLevel === 0 && !insideAtImport) {
            this._output.add_new_line();
          } else {
            this._output.space_before_token = true;
          }
        } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
          //handle combinator spacing
          if (this._options.space_around_combinator) {
            this._output.space_before_token = true;
            this.print_string(this._ch);
            this._output.space_before_token = true;
          } else {
            this.print_string(this._ch);
            this.eatWhitespace(); // squash extra whitespace

            if (this._ch && whitespaceChar.test(this._ch)) {
              this._ch = '';
            }
          }
        } else if (this._ch === ']') {
          this.print_string(this._ch);
        } else if (this._ch === '[') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch);
        } else if (this._ch === '=') {
          // no whitespace before or after
          this.eatWhitespace();
          this.print_string('=');

          if (whitespaceChar.test(this._ch)) {
            this._ch = '';
          }
        } else if (this._ch === '!' && !this._input.lookBack("\\")) {
          // !important
          this.print_string(' ');
          this.print_string(this._ch);
        } else {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch);
        }
      }

      var sweetCode = this._output.get_code(eol);

      return sweetCode;
    };

    module.exports.Beautifier = Beautifier;
    /***/
  },
  /* 17 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseOptions = __webpack_require__(6).Options;

    function Options(options) {
      BaseOptions.call(this, options, 'css');
      this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
      this.newline_between_rules = this._get_boolean('newline_between_rules', true);

      var space_around_selector_separator = this._get_boolean('space_around_selector_separator');

      this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;

      var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);

      this.brace_style = 'collapse';

      for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] !== 'expand') {
          // default to collapse, as only collapse|expand is implemented for now
          this.brace_style = 'collapse';
        } else {
          this.brace_style = brace_style_split[bs];
        }
      }
    }

    Options.prototype = new BaseOptions();
    module.exports.Options = Options;
    /***/
  }
  /******/
  ]);

  var css_beautify = legacy_beautify_css;
  /* Footer */

  if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return {
        css_beautify: css_beautify
      };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(585);

module.exports = function extend(o
/*, objects*/
) {
  if (!isObject(o)) {
    o = {};
  }

  var len = arguments.length;

  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }

  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}
/**
 * Returns true if the given `key` is an own property of `obj`.
 */


function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(241)
				var methods = ["Sha256Worker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-sha256.1f00d7.worker.js", { name: "built-sha256.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(241)
				var methods = ["TransformWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-babel.208c99.worker.js", { name: "built-babel.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(241)
				var methods = ["RendererWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-renderer.a26295.worker.js", { name: "built-renderer.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * pretty <https://github.com/jonschlinkert/pretty>
 *
 * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */


var beautify = __webpack_require__(581);

var condense = __webpack_require__(583);

var extend = __webpack_require__(349);

var defaults = {
  unformatted: ['code', 'pre', 'em', 'strong', 'span'],
  indent_inner_html: true,
  indent_char: ' ',
  indent_size: 2,
  sep: '\n'
};

module.exports = function pretty(str, options) {
  var opts = extend({}, defaults, options);
  str = beautify.html(str, opts);

  if (opts.ocd === true) {
    if (opts.newlines) opts.sep = opts.newlines;
    return ocd(str, opts);
  }

  return str;
};

function ocd(str, options) {
  // Normalize and condense all newlines
  return condense(str, options) // Remove empty whitespace the top of a file.
  .replace(/^\s+/g, '') // Remove extra whitespace from eof
  .replace(/\s+$/g, '\n') // Add a space above each comment
  .replace(/(\s*<!--)/g, '\n$1') // Bring closing comments up to the same line as closing tag.
  .replace(/>(\s*)(?=<!--\s*\/)/g, '> ');
}

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint node:true */

/* globals define */

/*
  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
  // the default is js
  var beautify = function beautify(src, config) {
    return js_beautify.js_beautify(src, config);
  }; // short aliases


  beautify.js = js_beautify.js_beautify;
  beautify.css = css_beautify.css_beautify;
  beautify.html = html_beautify.html_beautify; // legacy aliases

  beautify.js_beautify = js_beautify.js_beautify;
  beautify.css_beautify = css_beautify.css_beautify;
  beautify.html_beautify = html_beautify.html_beautify;
  return beautify;
}

if (true) {
  // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(246), __webpack_require__(247), __webpack_require__(582)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (js_beautify, css_beautify, html_beautify) {
    return get_beautify(js_beautify, css_beautify, html_beautify);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */

/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@beautifier.io>
    https://beautifier.io/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    inline (defaults to inline tags) - list of tags to be considered inline tags
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to ["pre", "textarea"] tags) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/
(function () {
  /* GENERATED_BUILD_OUTPUT */
  var legacy_beautify_html =
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // The module cache

    /******/
    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "";
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/

    return __webpack_require__(__webpack_require__.s = 18);
    /******/
  }(
  /************************************************************************/

  /******/
  [,,
  /* 0 */

  /* 1 */

  /* 2 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0; // use indent_count as a marker for this.__lines that have preserved indentation

      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
      this.__items = [];
    }

    OutputLine.prototype.clone_empty = function () {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };

    OutputLine.prototype.item = function (index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };

    OutputLine.prototype.has_match = function (pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }

      return false;
    };

    OutputLine.prototype.set_indent = function (indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };

    OutputLine.prototype._set_wrap_point = function () {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };

    OutputLine.prototype._should_wrap = function () {
      return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };

    OutputLine.prototype._allow_wrap = function () {
      if (this._should_wrap()) {
        this.__parent.add_new_line();

        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;

        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);

          next.__character_count -= 1;
        }

        return true;
      }

      return false;
    };

    OutputLine.prototype.is_empty = function () {
      return this.__items.length === 0;
    };

    OutputLine.prototype.last = function () {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };

    OutputLine.prototype.push = function (item) {
      this.__items.push(item);

      var last_newline_index = item.lastIndexOf('\n');

      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };

    OutputLine.prototype.pop = function () {
      var item = null;

      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }

      return item;
    };

    OutputLine.prototype._remove_indent = function () {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };

    OutputLine.prototype._remove_wrap_indent = function () {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };

    OutputLine.prototype.trim = function () {
      while (this.last() === ' ') {
        this.__items.pop();

        this.__character_count -= 1;
      }
    };

    OutputLine.prototype.toString = function () {
      var result = '';

      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }

      return result;
    };

    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;

      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      } // Set to null to continue support for auto detection of base indent


      baseIndentString = baseIndentString || '';

      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }

      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }

    IndentStringCache.prototype.get_indent_size = function (indent, column) {
      var result = this.__base_string_length;
      column = column || 0;

      if (indent < 0) {
        result = 0;
      }

      result += indent * this.__indent_size;
      result += column;
      return result;
    };

    IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
      var result = this.__base_string;
      column = column || 0;

      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }

      column += indent_level * this.__indent_size;

      this.__ensure_cache(column);

      result += this.__cache[column];
      return result;
    };

    IndentStringCache.prototype.__ensure_cache = function (column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };

    IndentStringCache.prototype.__add_column = function () {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';

      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }

      if (column) {
        result += new Array(column + 1).join(' ');
      }

      this.__cache.push(result);
    };

    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false; // initialize

      this.__add_outputline();
    }

    Output.prototype.__add_outputline = function () {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();

      this.__lines.push(this.current_line);
    };

    Output.prototype.get_line_number = function () {
      return this.__lines.length;
    };

    Output.prototype.get_indent_string = function (indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };

    Output.prototype.get_indent_size = function (indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };

    Output.prototype.is_empty = function () {
      return !this.previous_line && this.current_line.is_empty();
    };

    Output.prototype.add_new_line = function (force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() || !force_newline && this.just_added_newline()) {
        return false;
      } // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had


      if (!this.raw) {
        this.__add_outputline();
      }

      return true;
    };

    Output.prototype.get_code = function (eol) {
      this.trim(true); // handle some edge cases where the last tokens
      // has text that ends with newline(s)

      var last_item = this.current_line.pop();

      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }

        this.current_line.push(last_item);
      }

      if (this._end_with_newline) {
        this.__add_outputline();
      }

      var sweet_code = this.__lines.join('\n');

      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }

      return sweet_code;
    };

    Output.prototype.set_wrap_point = function () {
      this.current_line._set_wrap_point();
    };

    Output.prototype.set_indent = function (indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0; // Next line stores alignment values

      this.next_line.set_indent(indent, alignment); // Never indent your first output indent at the start of the file

      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }

      this.current_line.set_indent();
      return false;
    };

    Output.prototype.add_raw_token = function (token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }

      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };

    Output.prototype.add_token = function (printable_token) {
      this.__add_space_before_token();

      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };

    Output.prototype.__add_space_before_token = function () {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }

        this.current_line.push(' ');
      }
    };

    Output.prototype.remove_indent = function (index) {
      var output_length = this.__lines.length;

      while (index < output_length) {
        this.__lines[index]._remove_indent();

        index++;
      }

      this.current_line._remove_wrap_indent();
    };

    Output.prototype.trim = function (eat_newlines) {
      eat_newlines = eat_newlines === undefined ? false : eat_newlines;
      this.current_line.trim();

      while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
        this.__lines.pop();

        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }

      this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
    };

    Output.prototype.just_added_newline = function () {
      return this.current_line.is_empty();
    };

    Output.prototype.just_added_blankline = function () {
      return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
    };

    Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
      var index = this.__lines.length - 2;

      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];

        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));

          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }

        index--;
      }
    };

    module.exports.Output = Output;
    /***/
  },
  /* 3 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Token(type, text, newlines, whitespace_before) {
      this.type = type;
      this.text = text; // comments_before are
      // comments that have a new line before them
      // and may or may not have a newline after
      // this is a set of comments before

      this.comments_before = null;
      /* inline comment*/
      // this.comments_after =  new TokenStream(); // no new line before and newline after

      this.newlines = newlines || 0;
      this.whitespace_before = whitespace_before || '';
      this.parent = null;
      this.next = null;
      this.previous = null;
      this.opened = null;
      this.closed = null;
      this.directives = null;
    }

    module.exports.Token = Token;
    /***/
  },,,
  /* 4 */

  /* 5 */

  /* 6 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field); // Support passing the source text back with no change

      this.disabled = this._get_boolean('disabled');
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);

      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }

      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');

      if (this.indent_with_tabs) {
        this.indent_char = '\t'; // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.

        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      } // Backwards compat with 1.3.x


      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
      this.indent_empty_lines = this._get_boolean('indent_empty_lines'); // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored

      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }

    Options.prototype._get_array = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];

      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }

      return result;
    };

    Options.prototype._get_boolean = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };

    Options.prototype._get_characters = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';

      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }

      return result;
    };

    Options.prototype._get_number = function (name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);

      if (isNaN(default_value)) {
        default_value = 0;
      }

      var result = parseInt(option_value, 10);

      if (isNaN(result)) {
        result = default_value;
      }

      return result;
    };

    Options.prototype._get_selection = function (name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);

      if (result.length !== 1) {
        throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result[0];
    };

    Options.prototype._get_selection_list = function (name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }

      default_value = default_value || [selection_list[0]];

      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }

      var result = this._get_array(name, default_value);

      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result;
    };

    Options.prototype._is_valid_selection = function (result, selection_list) {
      return result.length && selection_list.length && !result.some(function (item) {
        return selection_list.indexOf(item) === -1;
      });
    }; // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}


    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;

      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      } //merge in the per type settings for the childFieldName


      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }

      return finalOpts;
    }

    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;

      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }

      return convertedOpts;
    }

    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    /***/
  },,
  /* 7 */

  /* 8 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }

    InputScanner.prototype.restart = function () {
      this.__position = 0;
    };

    InputScanner.prototype.back = function () {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };

    InputScanner.prototype.hasNext = function () {
      return this.__position < this.__input_length;
    };

    InputScanner.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }

      return val;
    };

    InputScanner.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }

      return val;
    }; // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.


    InputScanner.prototype.__match = function (pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }

      return pattern_match;
    };

    InputScanner.prototype.test = function (pattern, index) {
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };

    InputScanner.prototype.testChar = function (pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };

    InputScanner.prototype.match = function (pattern) {
      var pattern_match = this.__match(pattern, this.__position);

      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }

      return pattern_match;
    };

    InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;

      if (starting_pattern) {
        match = this.match(starting_pattern);

        if (match) {
          val += match[0];
        }
      }

      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }

      return val;
    };

    InputScanner.prototype.readUntil = function (pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match) {
        match_index = pattern_match.index;

        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }

      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };

    InputScanner.prototype.readUntilAfter = function (pattern) {
      return this.readUntil(pattern, true);
    };

    InputScanner.prototype.get_regexp = function (pattern, match_from) {
      var result = null;
      var flags = 'g';

      if (match_from && regexp_has_sticky) {
        flags = 'y';
      } // strings are converted to regexp


      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }

      return result;
    };

    InputScanner.prototype.get_literal_regexp = function (literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    /* css beautifier legacy helpers */


    InputScanner.prototype.peekUntilAfter = function (pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };

    InputScanner.prototype.lookBack = function (testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
    };

    module.exports.InputScanner = InputScanner;
    /***/
  },
  /* 9 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var InputScanner = __webpack_require__(8).InputScanner;

    var Token = __webpack_require__(3).Token;

    var TokenStream = __webpack_require__(10).TokenStream;

    var WhitespacePattern = __webpack_require__(11).WhitespacePattern;

    var TOKEN = {
      START: 'TK_START',
      RAW: 'TK_RAW',
      EOF: 'TK_EOF'
    };

    var Tokenizer = function Tokenizer(input_string, options) {
      this._input = new InputScanner(input_string);
      this._options = options || {};
      this.__tokens = null;
      this._patterns = {};
      this._patterns.whitespace = new WhitespacePattern(this._input);
    };

    Tokenizer.prototype.tokenize = function () {
      this._input.restart();

      this.__tokens = new TokenStream();

      this._reset();

      var current;
      var previous = new Token(TOKEN.START, '');
      var open_token = null;
      var open_stack = [];
      var comments = new TokenStream();

      while (previous.type !== TOKEN.EOF) {
        current = this._get_next_token(previous, open_token);

        while (this._is_comment(current)) {
          comments.add(current);
          current = this._get_next_token(previous, open_token);
        }

        if (!comments.isEmpty()) {
          current.comments_before = comments;
          comments = new TokenStream();
        }

        current.parent = open_token;

        if (this._is_opening(current)) {
          open_stack.push(open_token);
          open_token = current;
        } else if (open_token && this._is_closing(current, open_token)) {
          current.opened = open_token;
          open_token.closed = current;
          open_token = open_stack.pop();
          current.parent = open_token;
        }

        current.previous = previous;
        previous.next = current;

        this.__tokens.add(current);

        previous = current;
      }

      return this.__tokens;
    };

    Tokenizer.prototype._is_first_token = function () {
      return this.__tokens.isEmpty();
    };

    Tokenizer.prototype._reset = function () {};

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      this._readWhitespace();

      var resulting_string = this._input.read(/.+/g);

      if (resulting_string) {
        return this._create_token(TOKEN.RAW, resulting_string);
      } else {
        return this._create_token(TOKEN.EOF, '');
      }
    };

    Tokenizer.prototype._is_comment = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._create_token = function (type, text) {
      var token = new Token(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
      return token;
    };

    Tokenizer.prototype._readWhitespace = function () {
      return this._patterns.whitespace.read();
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    /***/
  },
  /* 10 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function TokenStream(parent_token) {
      // private
      this.__tokens = [];
      this.__tokens_length = this.__tokens.length;
      this.__position = 0;
      this.__parent_token = parent_token;
    }

    TokenStream.prototype.restart = function () {
      this.__position = 0;
    };

    TokenStream.prototype.isEmpty = function () {
      return this.__tokens_length === 0;
    };

    TokenStream.prototype.hasNext = function () {
      return this.__position < this.__tokens_length;
    };

    TokenStream.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__tokens[this.__position];
        this.__position += 1;
      }

      return val;
    };

    TokenStream.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__tokens_length) {
        val = this.__tokens[index];
      }

      return val;
    };

    TokenStream.prototype.add = function (token) {
      if (this.__parent_token) {
        token.parent = this.__parent_token;
      }

      this.__tokens.push(token);

      this.__tokens_length += 1;
    };

    module.exports.TokenStream = TokenStream;
    /***/
  },
  /* 11 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    function WhitespacePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);

      if (parent) {
        this._line_regexp = this._input.get_regexp(parent._line_regexp);
      } else {
        this.__set_whitespace_patterns('', '');
      }

      this.newline_count = 0;
      this.whitespace_before_token = '';
    }

    WhitespacePattern.prototype = new Pattern();

    WhitespacePattern.prototype.__set_whitespace_patterns = function (whitespace_chars, newline_chars) {
      whitespace_chars += '\\t ';
      newline_chars += '\\n\\r';
      this._match_pattern = this._input.get_regexp('[' + whitespace_chars + newline_chars + ']+', true);
      this._newline_regexp = this._input.get_regexp('\\r\\n|[' + newline_chars + ']');
    };

    WhitespacePattern.prototype.read = function () {
      this.newline_count = 0;
      this.whitespace_before_token = '';

      var resulting_string = this._input.read(this._match_pattern);

      if (resulting_string === ' ') {
        this.whitespace_before_token = ' ';
      } else if (resulting_string) {
        var matches = this.__split(this._newline_regexp, resulting_string);

        this.newline_count = matches.length - 1;
        this.whitespace_before_token = matches[this.newline_count];
      }

      return resulting_string;
    };

    WhitespacePattern.prototype.matching = function (whitespace_chars, newline_chars) {
      var result = this._create();

      result.__set_whitespace_patterns(whitespace_chars, newline_chars);

      result._update();

      return result;
    };

    WhitespacePattern.prototype._create = function () {
      return new WhitespacePattern(this._input, this);
    };

    WhitespacePattern.prototype.__split = function (regexp, input_string) {
      regexp.lastIndex = 0;
      var start_index = 0;
      var result = [];
      var next_match = regexp.exec(input_string);

      while (next_match) {
        result.push(input_string.substring(start_index, next_match.index));
        start_index = next_match.index + next_match[0].length;
        next_match = regexp.exec(input_string);
      }

      if (start_index < input_string.length) {
        result.push(input_string.substring(start_index, input_string.length));
      } else {
        result.push('');
      }

      return result;
    };

    module.exports.WhitespacePattern = WhitespacePattern;
    /***/
  },
  /* 12 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Pattern(input_scanner, parent) {
      this._input = input_scanner;
      this._starting_pattern = null;
      this._match_pattern = null;
      this._until_pattern = null;
      this._until_after = false;

      if (parent) {
        this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
        this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
        this._until_pattern = this._input.get_regexp(parent._until_pattern);
        this._until_after = parent._until_after;
      }
    }

    Pattern.prototype.read = function () {
      var result = this._input.read(this._starting_pattern);

      if (!this._starting_pattern || result) {
        result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
      }

      return result;
    };

    Pattern.prototype.read_match = function () {
      return this._input.match(this._match_pattern);
    };

    Pattern.prototype.until_after = function (pattern) {
      var result = this._create();

      result._until_after = true;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.until = function (pattern) {
      var result = this._create();

      result._until_after = false;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.starting_with = function (pattern) {
      var result = this._create();

      result._starting_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype.matching = function (pattern) {
      var result = this._create();

      result._match_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype._create = function () {
      return new Pattern(this._input, this);
    };

    Pattern.prototype._update = function () {};

    module.exports.Pattern = Pattern;
    /***/
  },
  /* 13 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }

    Directives.prototype.get_directives = function (text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }

      var directives = {};
      this.__directive_pattern.lastIndex = 0;

      var directive_match = this.__directive_pattern.exec(text);

      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }

      return directives;
    };

    Directives.prototype.readIgnored = function (input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };

    module.exports.Directives = Directives;
    /***/
  },
  /* 14 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    var template_names = {
      django: false,
      erb: false,
      handlebars: false,
      php: false
    }; // This lets templates appear anywhere we would do a readUntil
    // The cost is higher but it is pay to play.

    function TemplatablePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      this.__template_pattern = null;
      this._disabled = Object.assign({}, template_names);
      this._excluded = Object.assign({}, template_names);

      if (parent) {
        this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
        this._excluded = Object.assign(this._excluded, parent._excluded);
        this._disabled = Object.assign(this._disabled, parent._disabled);
      }

      var pattern = new Pattern(input_scanner);
      this.__patterns = {
        handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
        handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
        handlebars: pattern.starting_with(/{{/).until_after(/}}/),
        php: pattern.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
        erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
        // django coflicts with handlebars a bit.
        django: pattern.starting_with(/{%/).until_after(/%}/),
        django_value: pattern.starting_with(/{{/).until_after(/}}/),
        django_comment: pattern.starting_with(/{#/).until_after(/#}/)
      };
    }

    TemplatablePattern.prototype = new Pattern();

    TemplatablePattern.prototype._create = function () {
      return new TemplatablePattern(this._input, this);
    };

    TemplatablePattern.prototype._update = function () {
      this.__set_templated_pattern();
    };

    TemplatablePattern.prototype.disable = function (language) {
      var result = this._create();

      result._disabled[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read_options = function (options) {
      var result = this._create();

      for (var language in template_names) {
        result._disabled[language] = options.templating.indexOf(language) === -1;
      }

      result._update();

      return result;
    };

    TemplatablePattern.prototype.exclude = function (language) {
      var result = this._create();

      result._excluded[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read = function () {
      var result = '';

      if (this._match_pattern) {
        result = this._input.read(this._starting_pattern);
      } else {
        result = this._input.read(this._starting_pattern, this.__template_pattern);
      }

      var next = this._read_template();

      while (next) {
        if (this._match_pattern) {
          next += this._input.read(this._match_pattern);
        } else {
          next += this._input.readUntil(this.__template_pattern);
        }

        result += next;
        next = this._read_template();
      }

      if (this._until_after) {
        result += this._input.readUntilAfter(this._until_pattern);
      }

      return result;
    };

    TemplatablePattern.prototype.__set_templated_pattern = function () {
      var items = [];

      if (!this._disabled.php) {
        items.push(this.__patterns.php._starting_pattern.source);
      }

      if (!this._disabled.handlebars) {
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }

      if (!this._disabled.erb) {
        items.push(this.__patterns.erb._starting_pattern.source);
      }

      if (!this._disabled.django) {
        items.push(this.__patterns.django._starting_pattern.source);
        items.push(this.__patterns.django_value._starting_pattern.source);
        items.push(this.__patterns.django_comment._starting_pattern.source);
      }

      if (this._until_pattern) {
        items.push(this._until_pattern.source);
      }

      this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
    };

    TemplatablePattern.prototype._read_template = function () {
      var resulting_string = '';

      var c = this._input.peek();

      if (c === '<') {
        var peek1 = this._input.peek(1); //if we're in a comment, do something special
        // We treat all comments as literals, even more than preformatted tags
        // we just look for the appropriate close tag


        if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
          resulting_string = resulting_string || this.__patterns.php.read();
        }

        if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
          resulting_string = resulting_string || this.__patterns.erb.read();
        }
      } else if (c === '{') {
        if (!this._disabled.handlebars && !this._excluded.handlebars) {
          resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
          resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
          resulting_string = resulting_string || this.__patterns.handlebars.read();
        }

        if (!this._disabled.django) {
          // django coflicts with handlebars a bit.
          if (!this._excluded.django && !this._excluded.handlebars) {
            resulting_string = resulting_string || this.__patterns.django_value.read();
          }

          if (!this._excluded.django) {
            resulting_string = resulting_string || this.__patterns.django_comment.read();
            resulting_string = resulting_string || this.__patterns.django.read();
          }
        }
      }

      return resulting_string;
    };

    module.exports.TemplatablePattern = TemplatablePattern;
    /***/
  },,,,
  /* 15 */

  /* 16 */

  /* 17 */

  /* 18 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Beautifier = __webpack_require__(19).Beautifier,
        Options = __webpack_require__(20).Options;

    function style_html(html_source, options, js_beautify, css_beautify) {
      var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
      return beautifier.beautify();
    }

    module.exports = style_html;

    module.exports.defaultOptions = function () {
      return new Options();
    };
    /***/

  },
  /* 19 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Options = __webpack_require__(20).Options;

    var Output = __webpack_require__(2).Output;

    var Tokenizer = __webpack_require__(21).Tokenizer;

    var TOKEN = __webpack_require__(21).TOKEN;

    var lineBreak = /\r\n|[\r\n]/;
    var allLineBreaks = /\r\n|[\r\n]/g;

    var Printer = function Printer(options, base_indent_string) {
      //handles input/output and some other printing functions
      this.indent_level = 0;
      this.alignment_size = 0;
      this.max_preserve_newlines = options.max_preserve_newlines;
      this.preserve_newlines = options.preserve_newlines;
      this._output = new Output(options, base_indent_string);
    };

    Printer.prototype.current_line_has_match = function (pattern) {
      return this._output.current_line.has_match(pattern);
    };

    Printer.prototype.set_space_before_token = function (value, non_breaking) {
      this._output.space_before_token = value;
      this._output.non_breaking_space = non_breaking;
    };

    Printer.prototype.set_wrap_point = function () {
      this._output.set_indent(this.indent_level, this.alignment_size);

      this._output.set_wrap_point();
    };

    Printer.prototype.add_raw_token = function (token) {
      this._output.add_raw_token(token);
    };

    Printer.prototype.print_preserved_newlines = function (raw_token) {
      var newlines = 0;

      if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
        newlines = raw_token.newlines ? 1 : 0;
      }

      if (this.preserve_newlines) {
        newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
      }

      for (var n = 0; n < newlines; n++) {
        this.print_newline(n > 0);
      }

      return newlines !== 0;
    };

    Printer.prototype.traverse_whitespace = function (raw_token) {
      if (raw_token.whitespace_before || raw_token.newlines) {
        if (!this.print_preserved_newlines(raw_token)) {
          this._output.space_before_token = true;
        }

        return true;
      }

      return false;
    };

    Printer.prototype.previous_token_wrapped = function () {
      return this._output.previous_token_wrapped;
    };

    Printer.prototype.print_newline = function (force) {
      this._output.add_new_line(force);
    };

    Printer.prototype.print_token = function (token) {
      if (token.text) {
        this._output.set_indent(this.indent_level, this.alignment_size);

        this._output.add_token(token.text);
      }
    };

    Printer.prototype.indent = function () {
      this.indent_level++;
    };

    Printer.prototype.get_full_indent = function (level) {
      level = this.indent_level + (level || 0);

      if (level < 1) {
        return '';
      }

      return this._output.get_indent_string(level);
    };

    var get_type_attribute = function get_type_attribute(start_token) {
      var result = null;
      var raw_token = start_token.next; // Search attributes for a type attribute

      while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
        if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === 'type') {
          if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
            result = raw_token.next.next.text;
          }

          break;
        }

        raw_token = raw_token.next;
      }

      return result;
    };

    var get_custom_beautifier_name = function get_custom_beautifier_name(tag_check, raw_token) {
      var typeAttribute = null;
      var result = null;

      if (!raw_token.closed) {
        return null;
      }

      if (tag_check === 'script') {
        typeAttribute = 'text/javascript';
      } else if (tag_check === 'style') {
        typeAttribute = 'text/css';
      }

      typeAttribute = get_type_attribute(raw_token) || typeAttribute; // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
      // For those without a type attribute use default;

      if (typeAttribute.search('text/css') > -1) {
        result = 'css';
      } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
        result = 'javascript';
      } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
        result = 'html';
      } else if (typeAttribute.search(/test\/null/) > -1) {
        // Test only mime-type for testing the beautifier when null is passed as beautifing function
        result = 'null';
      }

      return result;
    };

    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }

    function TagFrame(parent, parser_token, indent_level) {
      this.parent = parent || null;
      this.tag = parser_token ? parser_token.tag_name : '';
      this.indent_level = indent_level || 0;
      this.parser_token = parser_token || null;
    }

    function TagStack(printer) {
      this._printer = printer;
      this._current_frame = null;
    }

    TagStack.prototype.get_parser_token = function () {
      return this._current_frame ? this._current_frame.parser_token : null;
    };

    TagStack.prototype.record_tag = function (parser_token) {
      //function to record a tag and its parent in this.tags Object
      var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
      this._current_frame = new_frame;
    };

    TagStack.prototype._try_pop_frame = function (frame) {
      //function to retrieve the opening tag to the corresponding closer
      var parser_token = null;

      if (frame) {
        parser_token = frame.parser_token;
        this._printer.indent_level = frame.indent_level;
        this._current_frame = frame.parent;
      }

      return parser_token;
    };

    TagStack.prototype._get_frame = function (tag_list, stop_list) {
      //function to retrieve the opening tag to the corresponding closer
      var frame = this._current_frame;

      while (frame) {
        //till we reach '' (the initial value);
        if (tag_list.indexOf(frame.tag) !== -1) {
          //if this is it use it
          break;
        } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
          frame = null;
          break;
        }

        frame = frame.parent;
      }

      return frame;
    };

    TagStack.prototype.try_pop = function (tag, stop_list) {
      //function to retrieve the opening tag to the corresponding closer
      var frame = this._get_frame([tag], stop_list);

      return this._try_pop_frame(frame);
    };

    TagStack.prototype.indent_to_tag = function (tag_list) {
      var frame = this._get_frame(tag_list);

      if (frame) {
        this._printer.indent_level = frame.indent_level;
      }
    };

    function Beautifier(source_text, options, js_beautify, css_beautify) {
      //Wrapper function to invoke all the necessary constructors and deal with the output.
      this._source_text = source_text || '';
      options = options || {};
      this._js_beautify = js_beautify;
      this._css_beautify = css_beautify;
      this._tag_stack = null; // Allow the setting of language/file-type specific options
      // with inheritance of overall settings

      var optionHtml = new Options(options, 'html');
      this._options = optionHtml;
      this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
      this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === 'force-expand-multiline';
      this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === 'force-aligned';
      this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === 'aligned-multiple';
      this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 'preserve'.length) === 'preserve';
      this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === 'preserve-aligned';
    }

    Beautifier.prototype.beautify = function () {
      // if disabled, return the input unchanged.
      if (this._options.disabled) {
        return this._source_text;
      }

      var source_text = this._source_text;
      var eol = this._options.eol;

      if (this._options.eol === 'auto') {
        eol = '\n';

        if (source_text && lineBreak.test(source_text)) {
          eol = source_text.match(lineBreak)[0];
        }
      } // HACK: newline parsing inconsistent. This brute force normalizes the input.


      source_text = source_text.replace(allLineBreaks, '\n');
      var baseIndentString = source_text.match(/^[\t ]*/)[0];
      var last_token = {
        text: '',
        type: ''
      };
      var last_tag_token = new TagOpenParserToken();
      var printer = new Printer(this._options, baseIndentString);
      var tokens = new Tokenizer(source_text, this._options).tokenize();
      this._tag_stack = new TagStack(printer);
      var parser_token = null;
      var raw_token = tokens.next();

      while (raw_token.type !== TOKEN.EOF) {
        if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
          parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
          last_tag_token = parser_token;
        } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
          parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
        } else if (raw_token.type === TOKEN.TAG_CLOSE) {
          parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
        } else if (raw_token.type === TOKEN.TEXT) {
          parser_token = this._handle_text(printer, raw_token, last_tag_token);
        } else {
          // This should never happen, but if it does. Print the raw token
          printer.add_raw_token(raw_token);
        }

        last_token = parser_token;
        raw_token = tokens.next();
      }

      var sweet_code = printer._output.get_code(eol);

      return sweet_code;
    };

    Beautifier.prototype._handle_tag_close = function (printer, raw_token, last_tag_token) {
      var parser_token = {
        text: raw_token.text,
        type: raw_token.type
      };
      printer.alignment_size = 0;
      last_tag_token.tag_complete = true;
      printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);

      if (last_tag_token.is_unformatted) {
        printer.add_raw_token(raw_token);
      } else {
        if (last_tag_token.tag_start_char === '<') {
          printer.set_space_before_token(raw_token.text[0] === '/', true); // space before />, no space before >

          if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
            printer.print_newline(false);
          }
        }

        printer.print_token(raw_token);
      }

      if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
        printer.indent(); // only indent once per opened tag

        last_tag_token.indent_content = false;
      }

      if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
        printer.set_wrap_point();
      }

      return parser_token;
    };

    Beautifier.prototype._handle_inside_tag = function (printer, raw_token, last_tag_token, tokens) {
      var wrapped = last_tag_token.has_wrapped_attrs;
      var parser_token = {
        text: raw_token.text,
        type: raw_token.type
      };
      printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);

      if (last_tag_token.is_unformatted) {
        printer.add_raw_token(raw_token);
      } else if (last_tag_token.tag_start_char === '{' && raw_token.type === TOKEN.TEXT) {
        // For the insides of handlebars allow newlines or a single space between open and contents
        if (printer.print_preserved_newlines(raw_token)) {
          raw_token.newlines = 0;
          printer.add_raw_token(raw_token);
        } else {
          printer.print_token(raw_token);
        }
      } else {
        if (raw_token.type === TOKEN.ATTRIBUTE) {
          printer.set_space_before_token(true);
          last_tag_token.attr_count += 1;
        } else if (raw_token.type === TOKEN.EQUALS) {
          //no space before =
          printer.set_space_before_token(false);
        } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
          //no space before value
          printer.set_space_before_token(false);
        }

        if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === '<') {
          if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
            printer.traverse_whitespace(raw_token);
            wrapped = wrapped || raw_token.newlines !== 0;
          }

          if (this._is_wrap_attributes_force) {
            var force_attr_wrap = last_tag_token.attr_count > 1;

            if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
              var is_only_attribute = true;
              var peek_index = 0;
              var peek_token;

              do {
                peek_token = tokens.peek(peek_index);

                if (peek_token.type === TOKEN.ATTRIBUTE) {
                  is_only_attribute = false;
                  break;
                }

                peek_index += 1;
              } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);

              force_attr_wrap = !is_only_attribute;
            }

            if (force_attr_wrap) {
              printer.print_newline(false);
              wrapped = true;
            }
          }
        }

        printer.print_token(raw_token);
        wrapped = wrapped || printer.previous_token_wrapped();
        last_tag_token.has_wrapped_attrs = wrapped;
      }

      return parser_token;
    };

    Beautifier.prototype._handle_text = function (printer, raw_token, last_tag_token) {
      var parser_token = {
        text: raw_token.text,
        type: 'TK_CONTENT'
      };

      if (last_tag_token.custom_beautifier_name) {
        //check if we need to format javascript
        this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
      } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
        printer.add_raw_token(raw_token);
      } else {
        printer.traverse_whitespace(raw_token);
        printer.print_token(raw_token);
      }

      return parser_token;
    };

    Beautifier.prototype._print_custom_beatifier_text = function (printer, raw_token, last_tag_token) {
      var local = this;

      if (raw_token.text !== '') {
        var text = raw_token.text,
            _beautifier,
            script_indent_level = 1,
            pre = '',
            post = '';

        if (last_tag_token.custom_beautifier_name === 'javascript' && typeof this._js_beautify === 'function') {
          _beautifier = this._js_beautify;
        } else if (last_tag_token.custom_beautifier_name === 'css' && typeof this._css_beautify === 'function') {
          _beautifier = this._css_beautify;
        } else if (last_tag_token.custom_beautifier_name === 'html') {
          _beautifier = function _beautifier(html_source, options) {
            var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
            return beautifier.beautify();
          };
        }

        if (this._options.indent_scripts === "keep") {
          script_indent_level = 0;
        } else if (this._options.indent_scripts === "separate") {
          script_indent_level = -printer.indent_level;
        }

        var indentation = printer.get_full_indent(script_indent_level); // if there is at least one empty line at the end of this text, strip it
        // we'll be adding one back after the text but before the containing tag.

        text = text.replace(/\n[ \t]*$/, ''); // Handle the case where content is wrapped in a comment or cdata.

        if (last_tag_token.custom_beautifier_name !== 'html' && text[0] === '<' && text.match(/^(<!--|<!\[CDATA\[)/)) {
          var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text); // if we start to wrap but don't finish, print raw

          if (!matched) {
            printer.add_raw_token(raw_token);
            return;
          }

          pre = indentation + matched[1] + '\n';
          text = matched[4];

          if (matched[5]) {
            post = indentation + matched[5];
          } // if there is at least one empty line at the end of this text, strip it
          // we'll be adding one back after the text but before the containing tag.


          text = text.replace(/\n[ \t]*$/, '');

          if (matched[2] || matched[3].indexOf('\n') !== -1) {
            // if the first line of the non-comment text has spaces
            // use that as the basis for indenting in null case.
            matched = matched[3].match(/[ \t]+$/);

            if (matched) {
              raw_token.whitespace_before = matched[0];
            }
          }
        }

        if (text) {
          if (_beautifier) {
            // call the Beautifier if avaliable
            var Child_options = function Child_options() {
              this.eol = '\n';
            };

            Child_options.prototype = this._options.raw_options;
            var child_options = new Child_options();
            text = _beautifier(indentation + text, child_options);
          } else {
            // simply indent the string otherwise
            var white = raw_token.whitespace_before;

            if (white) {
              text = text.replace(new RegExp('\n(' + white + ')?', 'g'), '\n');
            }

            text = indentation + text.replace(/\n/g, '\n' + indentation);
          }
        }

        if (pre) {
          if (!text) {
            text = pre + post;
          } else {
            text = pre + text + '\n' + post;
          }
        }

        printer.print_newline(false);

        if (text) {
          raw_token.text = text;
          raw_token.whitespace_before = '';
          raw_token.newlines = 0;
          printer.add_raw_token(raw_token);
          printer.print_newline(true);
        }
      }
    };

    Beautifier.prototype._handle_tag_open = function (printer, raw_token, last_tag_token, last_token) {
      var parser_token = this._get_tag_open_token(raw_token);

      if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf('</') === 0) {
        // End element tags for unformatted or content_unformatted elements
        // are printed raw to keep any newlines inside them exactly the same.
        printer.add_raw_token(raw_token);
        parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
      } else {
        printer.traverse_whitespace(raw_token);

        this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);

        if (!parser_token.is_inline_element) {
          printer.set_wrap_point();
        }

        printer.print_token(raw_token);
      } //indent attributes an auto, forced, aligned or forced-align line-wrap


      if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
        parser_token.alignment_size = raw_token.text.length + 1;
      }

      if (!parser_token.tag_complete && !parser_token.is_unformatted) {
        printer.alignment_size = parser_token.alignment_size;
      }

      return parser_token;
    };

    var TagOpenParserToken = function TagOpenParserToken(parent, raw_token) {
      this.parent = parent || null;
      this.text = '';
      this.type = 'TK_TAG_OPEN';
      this.tag_name = '';
      this.is_inline_element = false;
      this.is_unformatted = false;
      this.is_content_unformatted = false;
      this.is_empty_element = false;
      this.is_start_tag = false;
      this.is_end_tag = false;
      this.indent_content = false;
      this.multiline_content = false;
      this.custom_beautifier_name = null;
      this.start_tag_token = null;
      this.attr_count = 0;
      this.has_wrapped_attrs = false;
      this.alignment_size = 0;
      this.tag_complete = false;
      this.tag_start_char = '';
      this.tag_check = '';

      if (!raw_token) {
        this.tag_complete = true;
      } else {
        var tag_check_match;
        this.tag_start_char = raw_token.text[0];
        this.text = raw_token.text;

        if (this.tag_start_char === '<') {
          tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
          this.tag_check = tag_check_match ? tag_check_match[1] : '';
        } else {
          tag_check_match = raw_token.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/);
          this.tag_check = tag_check_match ? tag_check_match[1] : ''; // handle "{{#> myPartial}}

          if (raw_token.text === '{{#>' && this.tag_check === '>' && raw_token.next !== null) {
            this.tag_check = raw_token.next.text;
          }
        }

        this.tag_check = this.tag_check.toLowerCase();

        if (raw_token.type === TOKEN.COMMENT) {
          this.tag_complete = true;
        }

        this.is_start_tag = this.tag_check.charAt(0) !== '/';
        this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
        this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === '/>'; // handlebars tags that don't start with # or ^ are single_tags, and so also start and end.

        this.is_end_tag = this.is_end_tag || this.tag_start_char === '{' && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)));
      }
    };

    Beautifier.prototype._get_tag_open_token = function (raw_token) {
      //function to get a full tag and parse its type
      var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
      parser_token.alignment_size = this._options.wrap_attributes_indent_size;
      parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
      parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
      parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
      parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
      parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === '{';
      return parser_token;
    };

    Beautifier.prototype._set_tag_position = function (printer, raw_token, parser_token, last_tag_token, last_token) {
      if (!parser_token.is_empty_element) {
        if (parser_token.is_end_tag) {
          //this tag is a double tag so check for tag-ending
          parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name); //remove it and all ancestors
        } else {
          // it's a start-tag
          // check if this tag is starting an element that has optional end element
          // and do an ending needed
          if (this._do_optional_end_element(parser_token)) {
            if (!parser_token.is_inline_element) {
              printer.print_newline(false);
            }
          }

          this._tag_stack.record_tag(parser_token); //push it on the tag stack


          if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
            parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
          }
        }
      }

      if (in_array(parser_token.tag_check, this._options.extra_liners)) {
        //check if this double needs an extra line
        printer.print_newline(false);

        if (!printer._output.just_added_blankline()) {
          printer.print_newline(true);
        }
      }

      if (parser_token.is_empty_element) {
        //if this tag name is a single tag type (either in the list or has a closing /)
        // if you hit an else case, reset the indent level if you are inside an:
        // 'if', 'unless', or 'each' block.
        if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
          this._tag_stack.indent_to_tag(['if', 'unless', 'each']);

          parser_token.indent_content = true; // Don't add a newline if opening {{#if}} tag is on the current line

          var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);

          if (!foundIfOnCurrentLine) {
            printer.print_newline(false);
          }
        } // Don't add a newline before elements that should remain where they are.


        if (parser_token.tag_name === '!--' && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) {//Do nothing. Leave comments on same line.
        } else {
          if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
            printer.print_newline(false);
          }

          this._calcluate_parent_multiline(printer, parser_token);
        }
      } else if (parser_token.is_end_tag) {
        //this tag is a double tag so check for tag-ending
        var do_end_expand = false; // deciding whether a block is multiline should not be this hard

        do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
        do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== 'TK_CONTENT';

        if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
          do_end_expand = false;
        }

        if (do_end_expand) {
          printer.print_newline(false);
        }
      } else {
        // it's a start-tag
        parser_token.indent_content = !parser_token.custom_beautifier_name;

        if (parser_token.tag_start_char === '<') {
          if (parser_token.tag_name === 'html') {
            parser_token.indent_content = this._options.indent_inner_html;
          } else if (parser_token.tag_name === 'head') {
            parser_token.indent_content = this._options.indent_head_inner_html;
          } else if (parser_token.tag_name === 'body') {
            parser_token.indent_content = this._options.indent_body_inner_html;
          }
        }

        if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== 'TK_CONTENT' || parser_token.is_content_unformatted)) {
          printer.print_newline(false);
        }

        this._calcluate_parent_multiline(printer, parser_token);
      }
    };

    Beautifier.prototype._calcluate_parent_multiline = function (printer, parser_token) {
      if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
        parser_token.parent.multiline_content = true;
      }
    }; //To be used for <p> tag special case:


    var p_closers = ['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'];
    var p_parent_excludes = ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'];

    Beautifier.prototype._do_optional_end_element = function (parser_token) {
      var result = null; // NOTE: cases of "if there is no more content in the parent element"
      // are handled automatically by the beautifier.
      // It assumes parent or ancestor close tag closes all children.
      // https://www.w3.org/TR/html5/syntax.html#optional-tags

      if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
        return;
      }

      if (parser_token.tag_name === 'body') {
        // A head element’s end tag may be omitted if the head element is not immediately followed by a space character or a comment.
        result = result || this._tag_stack.try_pop('head'); //} else if (parser_token.tag_name === 'body') {
        // DONE: A body element’s end tag may be omitted if the body element is not immediately followed by a comment.
      } else if (parser_token.tag_name === 'li') {
        // An li element’s end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('li', ['ol', 'ul']);
      } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
        // A dd element’s end tag may be omitted if the dd element is immediately followed by another dd element or a dt element, or if there is no more content in the parent element.
        // A dt element’s end tag may be omitted if the dt element is immediately followed by another dt element or a dd element.
        result = result || this._tag_stack.try_pop('dt', ['dl']);
        result = result || this._tag_stack.try_pop('dd', ['dl']);
      } else if (parser_token.parent.tag_name === 'p' && p_closers.indexOf(parser_token.tag_name) !== -1) {
        // IMPORTANT: this else-if works because p_closers has no overlap with any other element we look for in this method
        // check for the parent element is an HTML element that is not an <a>, <audio>, <del>, <ins>, <map>, <noscript>, or <video> element,  or an autonomous custom element.
        // To do this right, this needs to be coded as an inclusion of the inverse of the exclusion above.
        // But to start with (if we ignore "autonomous custom elements") the exclusion would be fine.
        var p_parent = parser_token.parent.parent;

        if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
          result = result || this._tag_stack.try_pop('p');
        }
      } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
        // An rt element’s end tag may be omitted if the rt element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
        // An rp element’s end tag may be omitted if the rp element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('rt', ['ruby', 'rtc']);
        result = result || this._tag_stack.try_pop('rp', ['ruby', 'rtc']);
      } else if (parser_token.tag_name === 'optgroup') {
        // An optgroup element’s end tag may be omitted if the optgroup element is immediately followed by another optgroup element, or if there is no more content in the parent element.
        // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('optgroup', ['select']); //result = result || this._tag_stack.try_pop('option', ['select']);
      } else if (parser_token.tag_name === 'option') {
        // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']);
      } else if (parser_token.tag_name === 'colgroup') {
        // DONE: A colgroup element’s end tag may be omitted if the colgroup element is not immediately followed by a space character or a comment.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
      } else if (parser_token.tag_name === 'thead') {
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']); //} else if (parser_token.tag_name === 'caption') {
        // DONE: A caption element’s end tag may be omitted if the caption element is not immediately followed by a space character or a comment.
      } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
        // A thead element’s end tag may be omitted if the thead element is immediately followed by a tbody or tfoot element.
        // A tbody element’s end tag may be omitted if the tbody element is immediately followed by a tbody or tfoot element, or if there is no more content in the parent element.
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']);
        result = result || this._tag_stack.try_pop('thead', ['table']);
        result = result || this._tag_stack.try_pop('tbody', ['table']); //} else if (parser_token.tag_name === 'tfoot') {
        // DONE: A tfoot element’s end tag may be omitted if there is no more content in the parent element.
      } else if (parser_token.tag_name === 'tr') {
        // A tr element’s end tag may be omitted if the tr element is immediately followed by another tr element, or if there is no more content in the parent element.
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']);
        result = result || this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']);
      } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
        // A td element’s end tag may be omitted if the td element is immediately followed by a td or th element, or if there is no more content in the parent element.
        // A th element’s end tag may be omitted if the th element is immediately followed by a td or th element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('td', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
        result = result || this._tag_stack.try_pop('th', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
      } // Start element omission not handled currently
      // A head element’s start tag may be omitted if the element is empty, or if the first thing inside the head element is an element.
      // A tbody element’s start tag may be omitted if the first thing inside the tbody element is a tr element, and if the element is not immediately preceded by a tbody, thead, or tfoot element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
      // A colgroup element’s start tag may be omitted if the first thing inside the colgroup element is a col element, and if the element is not immediately preceded by another colgroup element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
      // Fix up the parent of the parser token


      parser_token.parent = this._tag_stack.get_parser_token();
      return result;
    };

    module.exports.Beautifier = Beautifier;
    /***/
  },
  /* 20 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseOptions = __webpack_require__(6).Options;

    function Options(options) {
      BaseOptions.call(this, options, 'html');

      if (this.templating.length === 1 && this.templating[0] === 'auto') {
        this.templating = ['django', 'erb', 'handlebars', 'php'];
      }

      this.indent_inner_html = this._get_boolean('indent_inner_html');
      this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', true);
      this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', true);
      this.indent_handlebars = this._get_boolean('indent_handlebars', true);
      this.wrap_attributes = this._get_selection('wrap_attributes', ['auto', 'force', 'force-aligned', 'force-expand-multiline', 'aligned-multiple', 'preserve', 'preserve-aligned']);
      this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size);
      this.extra_liners = this._get_array('extra_liners', ['head', 'body', '/html']); // Block vs inline elements
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
      // https://www.w3.org/TR/html5/dom.html#phrasing-content

      this.inline = this._get_array('inline', ['a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp',
      /* 'script', */
      'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'text', // obsolete inline tags
      'acronym', 'big', 'strike', 'tt']);
      this.void_elements = this._get_array('void_elements', [// HTLM void elements - aka self-closing tags - aka singletons
      // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr', // NOTE: Optional tags are too complex for a simple list
      // they are hard coded in _do_optional_end_element
      // Doctype and xml elements
      '!doctype', '?xml', // obsolete tags
      // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
      // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
      'basefont', 'isindex']);
      this.unformatted = this._get_array('unformatted', []);
      this.content_unformatted = this._get_array('content_unformatted', ['pre', 'textarea']);
      this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter');
      this.indent_scripts = this._get_selection('indent_scripts', ['normal', 'keep', 'separate']);
    }

    Options.prototype = new BaseOptions();
    module.exports.Options = Options;
    /***/
  },
  /* 21 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseTokenizer = __webpack_require__(9).Tokenizer;

    var BASETOKEN = __webpack_require__(9).TOKEN;

    var Directives = __webpack_require__(13).Directives;

    var TemplatablePattern = __webpack_require__(14).TemplatablePattern;

    var Pattern = __webpack_require__(12).Pattern;

    var TOKEN = {
      TAG_OPEN: 'TK_TAG_OPEN',
      TAG_CLOSE: 'TK_TAG_CLOSE',
      ATTRIBUTE: 'TK_ATTRIBUTE',
      EQUALS: 'TK_EQUALS',
      VALUE: 'TK_VALUE',
      COMMENT: 'TK_COMMENT',
      TEXT: 'TK_TEXT',
      UNKNOWN: 'TK_UNKNOWN',
      START: BASETOKEN.START,
      RAW: BASETOKEN.RAW,
      EOF: BASETOKEN.EOF
    };
    var directives_core = new Directives(/<\!--/, /-->/);

    var Tokenizer = function Tokenizer(input_string, options) {
      BaseTokenizer.call(this, input_string, options);
      this._current_tag_name = ''; // Words end at whitespace or when a tag starts
      // if we are indenting handlebars, they are considered tags

      var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
      var pattern_reader = new Pattern(this._input);
      this.__patterns = {
        word: templatable_reader.until(/[\n\r\t <]/),
        single_quote: templatable_reader.until_after(/'/),
        double_quote: templatable_reader.until_after(/"/),
        attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
        element_name: templatable_reader.until(/[\n\r\t >\/]/),
        handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
        handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
        handlebars_open: pattern_reader.until(/[\n\r\t }]/),
        handlebars_raw_close: pattern_reader.until(/}}/),
        comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
        cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
        // https://en.wikipedia.org/wiki/Conditional_comment
        conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
        processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
      };

      if (this._options.indent_handlebars) {
        this.__patterns.word = this.__patterns.word.exclude('handlebars');
      }

      this._unformatted_content_delimiter = null;

      if (this._options.unformatted_content_delimiter) {
        var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);

        this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
      }
    };

    Tokenizer.prototype = new BaseTokenizer();

    Tokenizer.prototype._is_comment = function (current_token) {
      // jshint unused:false
      return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      return current_token.type === TOKEN.TAG_OPEN;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      return current_token.type === TOKEN.TAG_CLOSE && open_token && ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<' || current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{');
    };

    Tokenizer.prototype._reset = function () {
      this._current_tag_name = '';
    };

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      var token = null;

      this._readWhitespace();

      var c = this._input.peek();

      if (c === null) {
        return this._create_token(TOKEN.EOF, '');
      }

      token = token || this._read_open_handlebars(c, open_token);
      token = token || this._read_attribute(c, previous_token, open_token);
      token = token || this._read_close(c, open_token);
      token = token || this._read_raw_content(c, previous_token, open_token);
      token = token || this._read_content_word(c);
      token = token || this._read_comment_or_cdata(c);
      token = token || this._read_processing(c);
      token = token || this._read_open(c, open_token);
      token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
      return token;
    };

    Tokenizer.prototype._read_comment_or_cdata = function (c) {
      // jshint unused:false
      var token = null;
      var resulting_string = null;
      var directives = null;

      if (c === '<') {
        var peek1 = this._input.peek(1); // We treat all comments as literals, even more than preformatted tags
        // we only look for the appropriate closing marker


        if (peek1 === '!') {
          resulting_string = this.__patterns.comment.read(); // only process directive on html comments

          if (resulting_string) {
            directives = directives_core.get_directives(resulting_string);

            if (directives && directives.ignore === 'start') {
              resulting_string += directives_core.readIgnored(this._input);
            }
          } else {
            resulting_string = this.__patterns.cdata.read();
          }
        }

        if (resulting_string) {
          token = this._create_token(TOKEN.COMMENT, resulting_string);
          token.directives = directives;
        }
      }

      return token;
    };

    Tokenizer.prototype._read_processing = function (c) {
      // jshint unused:false
      var token = null;
      var resulting_string = null;
      var directives = null;

      if (c === '<') {
        var peek1 = this._input.peek(1);

        if (peek1 === '!' || peek1 === '?') {
          resulting_string = this.__patterns.conditional_comment.read();
          resulting_string = resulting_string || this.__patterns.processing.read();
        }

        if (resulting_string) {
          token = this._create_token(TOKEN.COMMENT, resulting_string);
          token.directives = directives;
        }
      }

      return token;
    };

    Tokenizer.prototype._read_open = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (!open_token) {
        if (c === '<') {
          resulting_string = this._input.next();

          if (this._input.peek() === '/') {
            resulting_string += this._input.next();
          }

          resulting_string += this.__patterns.element_name.read();
          token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
        }
      }

      return token;
    };

    Tokenizer.prototype._read_open_handlebars = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (!open_token) {
        if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
          if (this._input.peek(2) === '!') {
            resulting_string = this.__patterns.handlebars_comment.read();
            resulting_string = resulting_string || this.__patterns.handlebars.read();
            token = this._create_token(TOKEN.COMMENT, resulting_string);
          } else {
            resulting_string = this.__patterns.handlebars_open.read();
            token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
          }
        }
      }

      return token;
    };

    Tokenizer.prototype._read_close = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (open_token) {
        if (open_token.text[0] === '<' && (c === '>' || c === '/' && this._input.peek(1) === '>')) {
          resulting_string = this._input.next();

          if (c === '/') {
            //  for close tag "/>"
            resulting_string += this._input.next();
          }

          token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
        } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
          this._input.next();

          this._input.next();

          token = this._create_token(TOKEN.TAG_CLOSE, '}}');
        }
      }

      return token;
    };

    Tokenizer.prototype._read_attribute = function (c, previous_token, open_token) {
      var token = null;
      var resulting_string = '';

      if (open_token && open_token.text[0] === '<') {
        if (c === '=') {
          token = this._create_token(TOKEN.EQUALS, this._input.next());
        } else if (c === '"' || c === "'") {
          var content = this._input.next();

          if (c === '"') {
            content += this.__patterns.double_quote.read();
          } else {
            content += this.__patterns.single_quote.read();
          }

          token = this._create_token(TOKEN.VALUE, content);
        } else {
          resulting_string = this.__patterns.attribute.read();

          if (resulting_string) {
            if (previous_token.type === TOKEN.EQUALS) {
              token = this._create_token(TOKEN.VALUE, resulting_string);
            } else {
              token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
            }
          }
        }
      }

      return token;
    };

    Tokenizer.prototype._is_content_unformatted = function (tag_name) {
      // void_elements have no content and so cannot have unformatted content
      // script and style tags should always be read as unformatted content
      // finally content_unformatted and unformatted element contents are unformatted
      return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
    };

    Tokenizer.prototype._read_raw_content = function (c, previous_token, open_token) {
      // jshint unused:false
      var resulting_string = '';

      if (open_token && open_token.text[0] === '{') {
        resulting_string = this.__patterns.handlebars_raw_close.read();
      } else if (previous_token.type === TOKEN.TAG_CLOSE && previous_token.opened.text[0] === '<' && previous_token.text[0] !== '/') {
        // ^^ empty tag has no content 
        var tag_name = previous_token.opened.text.substr(1).toLowerCase();

        if (tag_name === 'script' || tag_name === 'style') {
          // Script and style tags are allowed to have comments wrapping their content
          // or just have regular content.
          var token = this._read_comment_or_cdata(c);

          if (token) {
            token.type = TOKEN.TEXT;
            return token;
          }

          resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
        } else if (this._is_content_unformatted(tag_name)) {
          resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
        }
      }

      if (resulting_string) {
        return this._create_token(TOKEN.TEXT, resulting_string);
      }

      return null;
    };

    Tokenizer.prototype._read_content_word = function (c) {
      var resulting_string = '';

      if (this._options.unformatted_content_delimiter) {
        if (c === this._options.unformatted_content_delimiter[0]) {
          resulting_string = this.__patterns.unformatted_content_delimiter.read();
        }
      }

      if (!resulting_string) {
        resulting_string = this.__patterns.word.read();
      }

      if (resulting_string) {
        return this._create_token(TOKEN.TEXT, resulting_string);
      }
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    /***/
  }
  /******/
  ]);

  var style_html = legacy_beautify_html;
  /* Footer */

  if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(246), __webpack_require__(247)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (requireamd) {
      var js_beautify = __webpack_require__(246);
      var css_beautify = __webpack_require__(247);
      return {
        html_beautify: function html_beautify(html_source, options) {
          return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
        }
      };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var css_beautify, js_beautify; }
})();

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */


var isWhitespace = __webpack_require__(584);

var extend = __webpack_require__(349);

var typeOf = __webpack_require__(586);

module.exports = function (str, options) {
  var opts = extend({}, options);
  var sep = opts.sep || '\n\n';
  var min = opts.min;
  var re;

  if (typeof min === 'number' && min !== 2) {
    re = new RegExp("(\\r\\n|\\n|\\u2424) {" + min + ',}');
  }

  if (typeof re === 'undefined') {
    re = opts.regex || /(\r\n|\n|\u2424){2,}/g;
  } // if a line is 100% whitespace it will be trimmed, so that
  // later we can condense newlines correctly


  if (opts.keepWhitespace !== true) {
    str = str.split('\n').map(function (line) {
      return isWhitespace(line) ? line.trim() : line;
    }).join('\n');
  }

  str = trailingNewline(str, opts);
  return str.replace(re, sep);
};

function trailingNewline(str, options) {
  var val = options.trailingNewline;

  if (val === false) {
    return str;
  }

  switch (typeOf(val)) {
    case 'string':
      str = str.replace(/\s+$/, options.trailingNewline);
      break;

    case 'function':
      str = options.trailingNewline(str);
      break;

    case 'undefined':
    case 'boolean':
    default:
      {
        str = str.replace(/\s+$/, '\n');
        break;
      }
  }

  return str;
}

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


var cache;

module.exports = function isWhitespace(str) {
  return typeof str === 'string' && regex().test(str);
};

function regex() {
  // ensure that runtime compilation only happens once
  return cache || (cache = new RegExp("^[\\s\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\"]+$"));
}

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
};

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(587);

var toString = Object.prototype.toString;
/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }

  if (val === null) {
    return 'null';
  }

  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }

  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }

  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  } // functions


  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  } // array


  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  } // check for instances of RegExp and Date before calling `toString`


  if (val instanceof RegExp) {
    return 'regexp';
  }

  if (val instanceof Date) {
    return 'date';
  } // other objects


  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }

  if (type === '[object Date]') {
    return 'date';
  }

  if (type === '[object Arguments]') {
    return 'arguments';
  }

  if (type === '[object Error]') {
    return 'error';
  } // buffer


  if (isBuffer(val)) {
    return 'buffer';
  } // es6: Map, WeakMap, Set, WeakSet


  if (type === '[object Set]') {
    return 'set';
  }

  if (type === '[object WeakSet]') {
    return 'weakset';
  }

  if (type === '[object Map]') {
    return 'map';
  }

  if (type === '[object WeakMap]') {
    return 'weakmap';
  }

  if (type === '[object Symbol]') {
    return 'symbol';
  } // typed arrays


  if (type === '[object Int8Array]') {
    return 'int8array';
  }

  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }

  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }

  if (type === '[object Int16Array]') {
    return 'int16array';
  }

  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }

  if (type === '[object Int32Array]') {
    return 'int32array';
  }

  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }

  if (type === '[object Float32Array]') {
    return 'float32array';
  }

  if (type === '[object Float64Array]') {
    return 'float64array';
  } // must be a plain object


  return 'object';
};

/***/ }),

/***/ 587:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(11);

var classnames_1 = __webpack_require__(589);

var compute_lines_1 = __webpack_require__(590);

exports.DiffMethod = compute_lines_1.DiffMethod;

var styles_1 = __webpack_require__(592); // eslint-disable-next-line @typescript-eslint/no-var-requires


var m = __webpack_require__(593);

var memoize = m.default || m;
var LineNumberPrefix;

(function (LineNumberPrefix) {
  LineNumberPrefix["LEFT"] = "L";
  LineNumberPrefix["RIGHT"] = "R";
})(LineNumberPrefix = exports.LineNumberPrefix || (exports.LineNumberPrefix = {}));

var DiffViewer =
/** @class */
function (_super) {
  __extends(DiffViewer, _super);

  function DiffViewer(props) {
    var _this = _super.call(this, props) || this;
    /**
     * Resets code block expand to the initial stage. Will be exposed to the parent component via
     * refs.
     */


    _this.resetCodeBlocks = function () {
      if (_this.state.expandedBlocks.length > 0) {
        _this.setState({
          expandedBlocks: []
        });

        return true;
      }

      return false;
    };
    /**
     * Pushes the target expanded code block to the state. During the re-render,
     * this value is used to expand/fold unmodified code.
     */


    _this.onBlockExpand = function (id) {
      var prevState = _this.state.expandedBlocks.slice();

      prevState.push(id);

      _this.setState({
        expandedBlocks: prevState
      });
    };
    /**
     * Computes final styles for the diff viewer. It combines the default styles with the user
     * supplied overrides. The computed styles are cached with performance in mind.
     *
     * @param styles User supplied style overrides.
     */


    _this.computeStyles = memoize(styles_1.default);
    /**
     * Returns a function with clicked line number in the closure. Returns an no-op function when no
     * onLineNumberClick handler is supplied.
     *
     * @param id Line id of a line.
     */

    _this.onLineNumberClickProxy = function (id) {
      if (_this.props.onLineNumberClick) {
        return function (e) {
          return _this.props.onLineNumberClick(id, e);
        };
      }

      return function () {};
    };
    /**
     * Maps over the word diff and constructs the required React elements to show word diff.
     *
     * @param diffArray Word diff information derived from line information.
     * @param renderer Optional renderer to format diff words. Useful for syntax highlighting.
     */


    _this.renderWordDiff = function (diffArray, renderer) {
      return diffArray.map(function (wordDiff, i) {
        var _a;

        return React.createElement("span", {
          key: i,
          className: classnames_1.default(_this.styles.wordDiff, (_a = {}, _a[_this.styles.wordAdded] = wordDiff.type === compute_lines_1.DiffType.ADDED, _a[_this.styles.wordRemoved] = wordDiff.type === compute_lines_1.DiffType.REMOVED, _a))
        }, renderer ? renderer(wordDiff.value) : wordDiff.value);
      });
    };
    /**
     * Maps over the line diff and constructs the required react elements to show line diff. It calls
     * renderWordDiff when encountering word diff. This takes care of both inline and split view line
     * renders.
     *
     * @param lineNumber Line number of the current line.
     * @param type Type of diff of the current line.
     * @param prefix Unique id to prefix with the line numbers.
     * @param value Content of the line. It can be a string or a word diff array.
     * @param additionalLineNumber Additional line number to be shown. Useful for rendering inline
     *  diff view. Right line number will be passed as additionalLineNumber.
     * @param additionalPrefix Similar to prefix but for additional line number.
     */


    _this.renderLine = function (lineNumber, type, prefix, value, additionalLineNumber, additionalPrefix) {
      var _a, _b, _c, _d;

      var lineNumberTemplate = prefix + "-" + lineNumber;
      var additionalLineNumberTemplate = additionalPrefix + "-" + additionalLineNumber;

      var highlightLine = _this.props.highlightLines.includes(lineNumberTemplate) || _this.props.highlightLines.includes(additionalLineNumberTemplate);

      var added = type === compute_lines_1.DiffType.ADDED;
      var removed = type === compute_lines_1.DiffType.REMOVED;
      var content;

      if (Array.isArray(value)) {
        content = _this.renderWordDiff(value, _this.props.renderContent);
      } else if (_this.props.renderContent) {
        content = _this.props.renderContent(value);
      } else {
        content = value;
      }

      return React.createElement(React.Fragment, null, !_this.props.hideLineNumbers && React.createElement("td", {
        onClick: lineNumber && _this.onLineNumberClickProxy(lineNumberTemplate),
        className: classnames_1.default(_this.styles.gutter, (_a = {}, _a[_this.styles.emptyGutter] = !lineNumber, _a[_this.styles.diffAdded] = added, _a[_this.styles.diffRemoved] = removed, _a[_this.styles.highlightedGutter] = highlightLine, _a))
      }, React.createElement("pre", {
        className: _this.styles.lineNumber
      }, lineNumber)), !_this.props.splitView && !_this.props.hideLineNumbers && React.createElement("td", {
        onClick: additionalLineNumber && _this.onLineNumberClickProxy(additionalLineNumberTemplate),
        className: classnames_1.default(_this.styles.gutter, (_b = {}, _b[_this.styles.emptyGutter] = !additionalLineNumber, _b[_this.styles.diffAdded] = added, _b[_this.styles.diffRemoved] = removed, _b[_this.styles.highlightedGutter] = highlightLine, _b))
      }, React.createElement("pre", {
        className: _this.styles.lineNumber
      }, additionalLineNumber)), React.createElement("td", {
        className: classnames_1.default(_this.styles.marker, (_c = {}, _c[_this.styles.emptyLine] = !content, _c[_this.styles.diffAdded] = added, _c[_this.styles.diffRemoved] = removed, _c[_this.styles.highlightedLine] = highlightLine, _c))
      }, React.createElement("pre", null, added && '+', removed && '-')), React.createElement("td", {
        className: classnames_1.default(_this.styles.content, (_d = {}, _d[_this.styles.emptyLine] = !content, _d[_this.styles.diffAdded] = added, _d[_this.styles.diffRemoved] = removed, _d[_this.styles.highlightedLine] = highlightLine, _d))
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, content)));
    };
    /**
     * Generates lines for split view.
     *
     * @param obj Line diff information.
     * @param obj.left Life diff information for the left pane of the split view.
     * @param obj.right Life diff information for the right pane of the split view.
     * @param index React key for the lines.
     */


    _this.renderSplitView = function (_a, index) {
      var left = _a.left,
          right = _a.right;
      return React.createElement("tr", {
        key: index,
        className: _this.styles.line
      }, _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value), _this.renderLine(right.lineNumber, right.type, LineNumberPrefix.RIGHT, right.value));
    };
    /**
     * Generates lines for inline view.
     *
     * @param obj Line diff information.
     * @param obj.left Life diff information for the added section of the inline view.
     * @param obj.right Life diff information for the removed section of the inline view.
     * @param index React key for the lines.
     */


    _this.renderInlineView = function (_a, index) {
      var left = _a.left,
          right = _a.right;
      var content;

      if (left.type === compute_lines_1.DiffType.REMOVED && right.type === compute_lines_1.DiffType.ADDED) {
        return React.createElement(React.Fragment, {
          key: index
        }, React.createElement("tr", {
          className: _this.styles.line
        }, _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null)), React.createElement("tr", {
          className: _this.styles.line
        }, _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber)));
      }

      if (left.type === compute_lines_1.DiffType.REMOVED) {
        content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null);
      }

      if (left.type === compute_lines_1.DiffType.DEFAULT) {
        content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, right.lineNumber, LineNumberPrefix.RIGHT);
      }

      if (right.type === compute_lines_1.DiffType.ADDED) {
        content = _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber);
      }

      return React.createElement("tr", {
        key: index,
        className: _this.styles.line
      }, content);
    };
    /**
     * Returns a function with clicked block number in the closure.
     *
     * @param id Cold fold block id.
     */


    _this.onBlockClickProxy = function (id) {
      return function () {
        return _this.onBlockExpand(id);
      };
    };
    /**
     * Generates cold fold block. It also uses the custom message renderer when available to show
     * cold fold messages.
     *
     * @param num Number of skipped lines between two blocks.
     * @param blockNumber Code fold block id.
     * @param leftBlockLineNumber First left line number after the current code fold block.
     * @param rightBlockLineNumber First right line number after the current code fold block.
     */


    _this.renderSkippedLineIndicator = function (num, blockNumber, leftBlockLineNumber, rightBlockLineNumber) {
      var _a;

      var _b = _this.props,
          hideLineNumbers = _b.hideLineNumbers,
          splitView = _b.splitView;
      var message = _this.props.codeFoldMessageRenderer ? _this.props.codeFoldMessageRenderer(num, leftBlockLineNumber, rightBlockLineNumber) : React.createElement("pre", {
        className: _this.styles.codeFoldContent
      }, "Expand ", num, " lines ...");
      var content = React.createElement("td", null, React.createElement("a", {
        onClick: _this.onBlockClickProxy(blockNumber),
        tabIndex: 0
      }, message));
      var isUnifiedViewWithoutLineNumbers = !splitView && !hideLineNumbers;
      return React.createElement("tr", {
        key: leftBlockLineNumber + "-" + rightBlockLineNumber,
        className: _this.styles.codeFold
      }, !hideLineNumbers && React.createElement("td", {
        className: _this.styles.codeFoldGutter
      }), React.createElement("td", {
        className: classnames_1.default((_a = {}, _a[_this.styles.codeFoldGutter] = isUnifiedViewWithoutLineNumbers, _a))
      }), isUnifiedViewWithoutLineNumbers ? React.createElement(React.Fragment, null, React.createElement("td", null), content) : React.createElement(React.Fragment, null, content, React.createElement("td", null)), React.createElement("td", null), React.createElement("td", null));
    };
    /**
     * Generates the entire diff view.
     */


    _this.renderDiff = function () {
      var _a = _this.props,
          oldValue = _a.oldValue,
          newValue = _a.newValue,
          splitView = _a.splitView,
          disableWordDiff = _a.disableWordDiff,
          compareMethod = _a.compareMethod,
          linesOffset = _a.linesOffset;

      var _b = compute_lines_1.computeLineInformation(oldValue, newValue, disableWordDiff, compareMethod, linesOffset),
          lineInformation = _b.lineInformation,
          diffLines = _b.diffLines;

      var extraLines = _this.props.extraLinesSurroundingDiff < 0 ? 0 : _this.props.extraLinesSurroundingDiff;
      var skippedLines = [];
      return lineInformation.map(function (line, i) {
        var diffBlockStart = diffLines[0];
        var currentPosition = diffBlockStart - i;

        if (_this.props.showDiffOnly) {
          if (currentPosition === -extraLines) {
            skippedLines = [];
            diffLines.shift();
          }

          if (line.left.type === compute_lines_1.DiffType.DEFAULT && (currentPosition > extraLines || typeof diffBlockStart === 'undefined') && !_this.state.expandedBlocks.includes(diffBlockStart)) {
            skippedLines.push(i + 1);

            if (i === lineInformation.length - 1 && skippedLines.length > 1) {
              return _this.renderSkippedLineIndicator(skippedLines.length, diffBlockStart, line.left.lineNumber, line.right.lineNumber);
            }

            return null;
          }
        }

        var diffNodes = splitView ? _this.renderSplitView(line, i) : _this.renderInlineView(line, i);

        if (currentPosition === extraLines && skippedLines.length > 0) {
          var length_1 = skippedLines.length;
          skippedLines = [];
          return React.createElement(React.Fragment, {
            key: i
          }, _this.renderSkippedLineIndicator(length_1, diffBlockStart, line.left.lineNumber, line.right.lineNumber), diffNodes);
        }

        return diffNodes;
      });
    };

    _this.render = function () {
      var _a;

      var _b = _this.props,
          oldValue = _b.oldValue,
          newValue = _b.newValue,
          useDarkTheme = _b.useDarkTheme,
          leftTitle = _b.leftTitle,
          rightTitle = _b.rightTitle,
          splitView = _b.splitView,
          hideLineNumbers = _b.hideLineNumbers;

      if (typeof oldValue !== 'string' || typeof newValue !== 'string') {
        throw Error('"oldValue" and "newValue" should be strings');
      }

      _this.styles = _this.computeStyles(_this.props.styles, useDarkTheme);

      var nodes = _this.renderDiff();

      var colSpanOnSplitView = hideLineNumbers ? 2 : 3;
      var colSpanOnInlineView = hideLineNumbers ? 2 : 4;
      var title = (leftTitle || rightTitle) && React.createElement("tr", null, React.createElement("td", {
        colSpan: splitView ? colSpanOnSplitView : colSpanOnInlineView,
        className: _this.styles.titleBlock
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, leftTitle)), splitView && React.createElement("td", {
        colSpan: colSpanOnSplitView,
        className: _this.styles.titleBlock
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, rightTitle)));
      return React.createElement("table", {
        className: classnames_1.default(_this.styles.diffContainer, (_a = {}, _a[_this.styles.splitView] = splitView, _a))
      }, React.createElement("tbody", null, title, nodes));
    };

    _this.state = {
      expandedBlocks: []
    };
    return _this;
  }

  DiffViewer.defaultProps = {
    oldValue: '',
    newValue: '',
    splitView: true,
    highlightLines: [],
    disableWordDiff: false,
    compareMethod: compute_lines_1.DiffMethod.CHARS,
    styles: {},
    hideLineNumbers: false,
    extraLinesSurroundingDiff: 3,
    showDiffOnly: true,
    useDarkTheme: false,
    linesOffset: 0
  };
  return DiffViewer;
}(React.Component);

exports.default = DiffViewer;

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(179);

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var diff = __webpack_require__(591);

var jsDiff = diff;
var DiffType;

(function (DiffType) {
  DiffType[DiffType["DEFAULT"] = 0] = "DEFAULT";
  DiffType[DiffType["ADDED"] = 1] = "ADDED";
  DiffType[DiffType["REMOVED"] = 2] = "REMOVED";
})(DiffType = exports.DiffType || (exports.DiffType = {})); // See https://github.com/kpdecker/jsdiff/tree/v4.0.1#api for more info on the below JsDiff methods


var DiffMethod;

(function (DiffMethod) {
  DiffMethod["CHARS"] = "diffChars";
  DiffMethod["WORDS"] = "diffWords";
  DiffMethod["WORDS_WITH_SPACE"] = "diffWordsWithSpace";
  DiffMethod["LINES"] = "diffLines";
  DiffMethod["TRIMMED_LINES"] = "diffTrimmedLines";
  DiffMethod["SENTENCES"] = "diffSentences";
  DiffMethod["CSS"] = "diffCss";
})(DiffMethod = exports.DiffMethod || (exports.DiffMethod = {}));
/**
 * Splits diff text by new line and computes final list of diff lines based on
 * conditions.
 *
 * @param value Diff text from the js diff module.
 */


var constructLines = function constructLines(value) {
  var lines = value.split('\n');
  var isAllEmpty = lines.every(function (val) {
    return !val;
  });

  if (isAllEmpty) {
    // This is to avoid added an extra new line in the UI.
    if (lines.length === 2) {
      return [];
    }

    lines.pop();
    return lines;
  }

  var lastLine = lines[lines.length - 1];
  var firstLine = lines[0]; // Remove the first and last element if they are new line character. This is
  // to avoid addition of extra new line in the UI.

  if (!lastLine) {
    lines.pop();
  }

  if (!firstLine) {
    lines.shift();
  }

  return lines;
};
/**
 * Computes word diff information in the line.
 * [TODO]: Consider adding options argument for JsDiff text block comparison
 *
 * @param oldValue Old word in the line.
 * @param newValue New word in the line.
 * @param compareMethod JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
 */


var computeDiff = function computeDiff(oldValue, newValue, compareMethod) {
  if (compareMethod === void 0) {
    compareMethod = DiffMethod.CHARS;
  }

  var diffArray = jsDiff[compareMethod](oldValue, newValue);
  var computedDiff = {
    left: [],
    right: []
  };
  diffArray.forEach(function (_a) {
    var added = _a.added,
        removed = _a.removed,
        value = _a.value;
    var diffInformation = {};

    if (added) {
      diffInformation.type = DiffType.ADDED;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
    }

    if (removed) {
      diffInformation.type = DiffType.REMOVED;
      diffInformation.value = value;
      computedDiff.left.push(diffInformation);
    }

    if (!removed && !added) {
      diffInformation.type = DiffType.DEFAULT;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
      computedDiff.left.push(diffInformation);
    }

    return diffInformation;
  });
  return computedDiff;
};
/**
 * [TODO]: Think about moving common left and right value assignment to a
 * common place. Better readability?
 *
 * Computes line wise information based in the js diff information passed. Each
 * line contains information about left and right section. Left side denotes
 * deletion and right side denotes addition.
 *
 * @param oldString Old string to compare.
 * @param newString New string to compare with old string.
 * @param disableWordDiff Flag to enable/disable word diff.
 * @param compareMethod JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
 * @param linesOffset line number to start counting from
 */


var computeLineInformation = function computeLineInformation(oldString, newString, disableWordDiff, compareMethod, linesOffset) {
  if (disableWordDiff === void 0) {
    disableWordDiff = false;
  }

  if (compareMethod === void 0) {
    compareMethod = DiffMethod.CHARS;
  }

  if (linesOffset === void 0) {
    linesOffset = 0;
  }

  var diffArray = diff.diffLines(oldString.trimRight(), newString.trimRight(), {
    newlineIsToken: true,
    ignoreWhitespace: false,
    ignoreCase: false
  });
  var rightLineNumber = linesOffset;
  var leftLineNumber = linesOffset;
  var lineInformation = [];
  var counter = 0;
  var diffLines = [];
  var ignoreDiffIndexes = [];

  var getLineInformation = function getLineInformation(value, diffIndex, added, removed, evaluateOnlyFirstLine) {
    var lines = constructLines(value);
    return lines.map(function (line, lineIndex) {
      var left = {};
      var right = {};

      if (ignoreDiffIndexes.includes(diffIndex + "-" + lineIndex) || evaluateOnlyFirstLine && lineIndex !== 0) {
        return undefined;
      }

      if (added || removed) {
        if (!diffLines.includes(counter)) {
          diffLines.push(counter);
        }

        if (removed) {
          leftLineNumber += 1;
          left.lineNumber = leftLineNumber;
          left.type = DiffType.REMOVED;
          left.value = line || ' '; // When the current line is of type REMOVED, check the next item in
          // the diff array whether it is of type ADDED. If true, the current
          // diff will be marked as both REMOVED and ADDED. Meaning, the
          // current line is a modification.

          var nextDiff = diffArray[diffIndex + 1];

          if (nextDiff && nextDiff.added) {
            var nextDiffLines = constructLines(nextDiff.value)[lineIndex];

            if (nextDiffLines) {
              var _a = getLineInformation(nextDiff.value, diffIndex, true, false, true)[0].right,
                  rightValue = _a.value,
                  lineNumber = _a.lineNumber,
                  type = _a.type; // When identified as modification, push the next diff to ignore
              // list as the next value will be added in this line computation as
              // right and left values.

              ignoreDiffIndexes.push(diffIndex + 1 + "-" + lineIndex);
              right.lineNumber = lineNumber;
              right.type = type; // Do word level diff and assign the corresponding values to the
              // left and right diff information object.

              if (disableWordDiff) {
                right.value = rightValue;
              } else {
                var computedDiff = computeDiff(line, rightValue, compareMethod);
                right.value = computedDiff.right;
                left.value = computedDiff.left;
              }
            }
          }
        } else {
          rightLineNumber += 1;
          right.lineNumber = rightLineNumber;
          right.type = DiffType.ADDED;
          right.value = line;
        }
      } else {
        leftLineNumber += 1;
        rightLineNumber += 1;
        left.lineNumber = leftLineNumber;
        left.type = DiffType.DEFAULT;
        left.value = line;
        right.lineNumber = rightLineNumber;
        right.type = DiffType.DEFAULT;
        right.value = line;
      }

      counter += 1;
      return {
        right: right,
        left: left
      };
    }).filter(Boolean);
  };

  diffArray.forEach(function (_a, index) {
    var added = _a.added,
        removed = _a.removed,
        value = _a.value;
    lineInformation = __spread(lineInformation, getLineInformation(value, index, added, removed));
  });
  return {
    lineInformation: lineInformation,
    diffLines: diffLines
  };
};

exports.computeLineInformation = computeLineInformation;

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

/*!

 diff v4.0.1

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
(function (global, factory) {
   true ? factory(exports) : undefined;
})(this, function (exports) {
  'use strict';

  function Diff() {}

  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      this.options = options;
      var self = this;

      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      } // Allow subclasses to massage the input prior to running


      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
          oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      var bestPath = [{
        newPos: -1,
        components: []
      }]; // Seed editLength = 0, i.e. the content starts with the same values

      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      } // Main worker method. checks all permutations of a given edit length for acceptance.


      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;

          var addPath = bestPath[diagonalPath - 1],
              removePath = bestPath[diagonalPath + 1],
              _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }

          var canAdd = addPath && addPath.newPos + 1 < newLen,
              canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          } // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph


          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list

            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }

          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }

        editLength++;
      } // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced.


      if (callback) {
        (function exec() {
          setTimeout(function () {
            // This should not happen, but we want to be safe.

            /* istanbul ignore next */
            if (editLength > maxEditLength) {
              return callback();
            }

            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();

          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];

      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
          oldLen = oldString.length,
          newPos = basePath.newPos,
          oldPos = newPos - diagonalPath,
          commonCount = 0;

      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }

      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }

      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }

      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };

  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
        componentLen = components.length,
        newPos = 0,
        oldPos = 0;

    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];

      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }

        newPos += component.count; // Common case

        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.

        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    } // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.


    var lastComponent = components[componentLen - 1];

    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }

    return components;
  }

  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();

  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  function generateOptions(options, defaults) {
    if (typeof options === 'function') {
      defaults.callback = options;
    } else if (options) {
      for (var name in options) {
        /* istanbul ignore else */
        if (options.hasOwnProperty(name)) {
          defaults[name] = options[name];
        }
      }
    }

    return defaults;
  } //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF


  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();

  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }

    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };

  wordDiff.tokenize = function (value) {
    var tokens = value.split(/(\s+|[()[\]{}'"]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }

    return tokens;
  };

  function diffWords(oldStr, newStr, options) {
    options = generateOptions(options, {
      ignoreWhitespace: true
    });
    return wordDiff.diff(oldStr, newStr, options);
  }

  function diffWordsWithSpace(oldStr, newStr, options) {
    return wordDiff.diff(oldStr, newStr, options);
  }

  var lineDiff = new Diff();

  lineDiff.tokenize = function (value) {
    var retLines = [],
        linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    } // Merge the content and line separators into single tokens


    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];

      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }

        retLines.push(line);
      }
    }

    return retLines;
  };

  function diffLines(oldStr, newStr, callback) {
    return lineDiff.diff(oldStr, newStr, callback);
  }

  function diffTrimmedLines(oldStr, newStr, callback) {
    var options = generateOptions(callback, {
      ignoreWhitespace: true
    });
    return lineDiff.diff(oldStr, newStr, options);
  }

  var sentenceDiff = new Diff();

  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  function diffSentences(oldStr, newStr, callback) {
    return sentenceDiff.diff(oldStr, newStr, callback);
  }

  var cssDiff = new Diff();

  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  function diffCss(oldStr, newStr, callback) {
    return cssDiff.diff(oldStr, newStr, callback);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;

  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
        undefinedReplacement = _this$options.undefinedReplacement,
        _this$options$stringi = _this$options.stringifyReplacer,
        stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
      return typeof v === 'undefined' ? undefinedReplacement : v;
    } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };

  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  function diffJson(oldObj, newObj, options) {
    return jsonDiff.diff(oldObj, newObj, options);
  } // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer


  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];

    if (replacer) {
      obj = replacer(key, obj);
    }

    var i;

    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }

    var canonicalizedObj;

    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);

      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }

      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }

    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }

    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);

      var sortedKeys = [],
          _key;

      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }

      sortedKeys.sort();

      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }

      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }

    return canonicalizedObj;
  }

  var arrayDiff = new Diff();

  arrayDiff.tokenize = function (value) {
    return value.slice();
  };

  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  function diffArrays(oldArr, newArr, callback) {
    return arrayDiff.diff(oldArr, newArr, callback);
  }

  function parsePatch(uniDiff) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        list = [],
        i = 0;

    function parseIndex() {
      var index = {};
      list.push(index); // Parse diff metadata

      while (i < diffstr.length) {
        var line = diffstr[i]; // File header found, end parsing diff metadata

        if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
          break;
        } // Diff index


        var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

        if (header) {
          index.index = header[1];
        }

        i++;
      } // Parse file headers if they are defined. Unified diff requires them, but
      // there's no technical issues to have an isolated hunk without file header


      parseFileHeader(index);
      parseFileHeader(index); // Parse hunks

      index.hunks = [];

      while (i < diffstr.length) {
        var _line = diffstr[i];

        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
          break;
        } else if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else if (_line && options.strict) {
          // Ignore unexpected content unless in strict mode
          throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
        } else {
          i++;
        }
      }
    } // Parses the --- and +++ headers, if none are found, no lines
    // are consumed.


    function parseFileHeader(index) {
      var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

      if (fileHeader) {
        var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
        var data = fileHeader[2].split('\t', 2);
        var fileName = data[0].replace(/\\\\/g, '\\');

        if (/^".*"$/.test(fileName)) {
          fileName = fileName.substr(1, fileName.length - 2);
        }

        index[keyPrefix + 'FileName'] = fileName;
        index[keyPrefix + 'Header'] = (data[1] || '').trim();
        i++;
      }
    } // Parses a hunk
    // This assumes that we are at the start of a hunk.


    function parseHunk() {
      var chunkHeaderIndex = i,
          chunkHeaderLine = diffstr[i++],
          chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      var hunk = {
        oldStart: +chunkHeader[1],
        oldLines: +chunkHeader[2] || 1,
        newStart: +chunkHeader[3],
        newLines: +chunkHeader[4] || 1,
        lines: [],
        linedelimiters: []
      };
      var addCount = 0,
          removeCount = 0;

      for (; i < diffstr.length; i++) {
        // Lines starting with '---' could be mistaken for the "remove line" operation
        // But they could be the header for the next file. Therefore prune such cases out.
        if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
          break;
        }

        var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

        if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
          hunk.lines.push(diffstr[i]);
          hunk.linedelimiters.push(delimiters[i] || '\n');

          if (operation === '+') {
            addCount++;
          } else if (operation === '-') {
            removeCount++;
          } else if (operation === ' ') {
            addCount++;
            removeCount++;
          }
        } else {
          break;
        }
      } // Handle the empty block count case


      if (!addCount && hunk.newLines === 1) {
        hunk.newLines = 0;
      }

      if (!removeCount && hunk.oldLines === 1) {
        hunk.oldLines = 0;
      } // Perform optional sanity checking


      if (options.strict) {
        if (addCount !== hunk.newLines) {
          throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }

        if (removeCount !== hunk.oldLines) {
          throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }
      }

      return hunk;
    }

    while (i < diffstr.length) {
      parseIndex();
    }

    return list;
  } // Iterator that traverses in the range of [min, max], stepping
  // by distance from a given start position. I.e. for [0, 4], with
  // start of 2, this will iterate 2, 3, 1, 4, 0.


  function distanceIterator(start, minLine, maxLine) {
    var wantForward = true,
        backwardExhausted = false,
        forwardExhausted = false,
        localOffset = 1;
    return function iterator() {
      if (wantForward && !forwardExhausted) {
        if (backwardExhausted) {
          localOffset++;
        } else {
          wantForward = false;
        } // Check if trying to fit beyond text length, and if not, check it fits
        // after offset location (or desired location on first iteration)


        if (start + localOffset <= maxLine) {
          return localOffset;
        }

        forwardExhausted = true;
      }

      if (!backwardExhausted) {
        if (!forwardExhausted) {
          wantForward = true;
        } // Check if trying to fit before text beginning, and if not, check it fits
        // before offset location


        if (minLine <= start - localOffset) {
          return -localOffset++;
        }

        backwardExhausted = true;
        return iterator();
      } // We tried to fit hunk before text beginning and beyond text length, then
      // hunk can't fit on the text. Return undefined

    };
  }

  function applyPatch(source, uniDiff) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    if (Array.isArray(uniDiff)) {
      if (uniDiff.length > 1) {
        throw new Error('applyPatch only works with a single input.');
      }

      uniDiff = uniDiff[0];
    } // Apply the diff to the input


    var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        hunks = uniDiff.hunks,
        compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
      return line === patchContent;
    },
        errorCount = 0,
        fuzzFactor = options.fuzzFactor || 0,
        minLine = 0,
        offset = 0,
        removeEOFNL,
        addEOFNL;
    /**
     * Checks if the hunk exactly fits on the provided location
     */


    function hunkFits(hunk, toPos) {
      for (var j = 0; j < hunk.lines.length; j++) {
        var line = hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line;

        if (operation === ' ' || operation === '-') {
          // Context sanity check
          if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
            errorCount++;

            if (errorCount > fuzzFactor) {
              return false;
            }
          }

          toPos++;
        }
      }

      return true;
    } // Search best fit offsets for each hunk based on the previous ones


    for (var i = 0; i < hunks.length; i++) {
      var hunk = hunks[i],
          maxLine = lines.length - hunk.oldLines,
          localOffset = 0,
          toPos = offset + hunk.oldStart - 1;
      var iterator = distanceIterator(toPos, minLine, maxLine);

      for (; localOffset !== undefined; localOffset = iterator()) {
        if (hunkFits(hunk, toPos + localOffset)) {
          hunk.offset = offset += localOffset;
          break;
        }
      }

      if (localOffset === undefined) {
        return false;
      } // Set lower text limit to end of the current hunk, so next ones don't try
      // to fit over already patched text


      minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
    } // Apply patch hunks


    var diffOffset = 0;

    for (var _i = 0; _i < hunks.length; _i++) {
      var _hunk = hunks[_i],
          _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

      diffOffset += _hunk.newLines - _hunk.oldLines;

      if (_toPos < 0) {
        // Creating a new file
        _toPos = 0;
      }

      for (var j = 0; j < _hunk.lines.length; j++) {
        var line = _hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line,
            delimiter = _hunk.linedelimiters[j];

        if (operation === ' ') {
          _toPos++;
        } else if (operation === '-') {
          lines.splice(_toPos, 1);
          delimiters.splice(_toPos, 1);
          /* istanbul ignore else */
        } else if (operation === '+') {
          lines.splice(_toPos, 0, content);
          delimiters.splice(_toPos, 0, delimiter);
          _toPos++;
        } else if (operation === '\\') {
          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

          if (previousOperation === '+') {
            removeEOFNL = true;
          } else if (previousOperation === '-') {
            addEOFNL = true;
          }
        }
      }
    } // Handle EOFNL insertion/removal


    if (removeEOFNL) {
      while (!lines[lines.length - 1]) {
        lines.pop();
        delimiters.pop();
      }
    } else if (addEOFNL) {
      lines.push('');
      delimiters.push('\n');
    }

    for (var _k = 0; _k < lines.length - 1; _k++) {
      lines[_k] = lines[_k] + delimiters[_k];
    }

    return lines.join('');
  } // Wrapper that supports multiple file patches via callbacks.


  function applyPatches(uniDiff, options) {
    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    var currentIndex = 0;

    function processIndex() {
      var index = uniDiff[currentIndex++];

      if (!index) {
        return options.complete();
      }

      options.loadFile(index, function (err, data) {
        if (err) {
          return options.complete(err);
        }

        var updatedContent = applyPatch(data, index, options);
        options.patched(index, updatedContent, function (err) {
          if (err) {
            return options.complete(err);
          }

          processIndex();
        });
      });
    }

    processIndex();
  }

  function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    if (!options) {
      options = {};
    }

    if (typeof options.context === 'undefined') {
      options.context = 4;
    }

    var diff = diffLines(oldStr, newStr, options);
    diff.push({
      value: '',
      lines: []
    }); // Append an empty value to make cleanup easier

    function contextLines(lines) {
      return lines.map(function (entry) {
        return ' ' + entry;
      });
    }

    var hunks = [];
    var oldRangeStart = 0,
        newRangeStart = 0,
        curRange = [],
        oldLine = 1,
        newLine = 1;

    var _loop = function _loop(i) {
      var current = diff[i],
          lines = current.lines || current.value.replace(/\n$/, '').split('\n');
      current.lines = lines;

      if (current.added || current.removed) {
        var _curRange; // If we have previous context, start with that


        if (!oldRangeStart) {
          var prev = diff[i - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;

          if (prev) {
            curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        } // Output our changes


        (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
          return (current.added ? '+' : '-') + entry;
        }))); // Track the updated file position


        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        // Identical context lines. Track line changes
        if (oldRangeStart) {
          // Close out any changes that have been output (or join overlapping)
          if (lines.length <= options.context * 2 && i < diff.length - 2) {
            var _curRange2; // Overlapping


            (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
          } else {
            var _curRange3; // end the range and output


            var contextSize = Math.min(lines.length, options.context);

            (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

            var hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };

            if (i >= diff.length - 2 && lines.length <= options.context) {
              // EOF is inside this hunk
              var oldEOFNewline = /\n$/.test(oldStr);
              var newEOFNewline = /\n$/.test(newStr);
              var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

              if (!oldEOFNewline && noNlBeforeAdds) {
                // special case: old has no eol and no trailing context; no-nl can end up before adds
                curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
              }

              if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                curRange.push('\\ No newline at end of file');
              }
            }

            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }

        oldLine += lines.length;
        newLine += lines.length;
      }
    };

    for (var i = 0; i < diff.length; i++) {
      _loop(i);
    }

    return {
      oldFileName: oldFileName,
      newFileName: newFileName,
      oldHeader: oldHeader,
      newHeader: newHeader,
      hunks: hunks
    };
  }

  function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
    var ret = [];

    if (oldFileName == newFileName) {
      ret.push('Index: ' + oldFileName);
    }

    ret.push('===================================================================');
    ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
    ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

    for (var i = 0; i < diff.hunks.length; i++) {
      var hunk = diff.hunks[i];
      ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
      ret.push.apply(ret, hunk.lines);
    }

    return ret.join('\n') + '\n';
  }

  function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
    return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
  }

  function arrayEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return arrayStartsWith(a, b);
  }

  function arrayStartsWith(array, start) {
    if (start.length > array.length) {
      return false;
    }

    for (var i = 0; i < start.length; i++) {
      if (start[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  function calcLineCount(hunk) {
    var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
        oldLines = _calcOldNewLineCount.oldLines,
        newLines = _calcOldNewLineCount.newLines;

    if (oldLines !== undefined) {
      hunk.oldLines = oldLines;
    } else {
      delete hunk.oldLines;
    }

    if (newLines !== undefined) {
      hunk.newLines = newLines;
    } else {
      delete hunk.newLines;
    }
  }

  function merge(mine, theirs, base) {
    mine = loadPatch(mine, base);
    theirs = loadPatch(theirs, base);
    var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
    // Leaving sanity checks on this to the API consumer that may know more about the
    // meaning in their own context.

    if (mine.index || theirs.index) {
      ret.index = mine.index || theirs.index;
    }

    if (mine.newFileName || theirs.newFileName) {
      if (!fileNameChanged(mine)) {
        // No header or no change in ours, use theirs (and ours if theirs does not exist)
        ret.oldFileName = theirs.oldFileName || mine.oldFileName;
        ret.newFileName = theirs.newFileName || mine.newFileName;
        ret.oldHeader = theirs.oldHeader || mine.oldHeader;
        ret.newHeader = theirs.newHeader || mine.newHeader;
      } else if (!fileNameChanged(theirs)) {
        // No header or no change in theirs, use ours
        ret.oldFileName = mine.oldFileName;
        ret.newFileName = mine.newFileName;
        ret.oldHeader = mine.oldHeader;
        ret.newHeader = mine.newHeader;
      } else {
        // Both changed... figure it out
        ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
        ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
        ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
        ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
      }
    }

    ret.hunks = [];
    var mineIndex = 0,
        theirsIndex = 0,
        mineOffset = 0,
        theirsOffset = 0;

    while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
      var mineCurrent = mine.hunks[mineIndex] || {
        oldStart: Infinity
      },
          theirsCurrent = theirs.hunks[theirsIndex] || {
        oldStart: Infinity
      };

      if (hunkBefore(mineCurrent, theirsCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
        mineIndex++;
        theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
      } else if (hunkBefore(theirsCurrent, mineCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
        theirsIndex++;
        mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
      } else {
        // Overlap, merge as best we can
        var mergedHunk = {
          oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
          oldLines: 0,
          newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
          newLines: 0,
          lines: []
        };
        mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
        theirsIndex++;
        mineIndex++;
        ret.hunks.push(mergedHunk);
      }
    }

    return ret;
  }

  function loadPatch(param, base) {
    if (typeof param === 'string') {
      if (/^@@/m.test(param) || /^Index:/m.test(param)) {
        return parsePatch(param)[0];
      }

      if (!base) {
        throw new Error('Must provide a base reference or pass in a patch');
      }

      return structuredPatch(undefined, undefined, base, param);
    }

    return param;
  }

  function fileNameChanged(patch) {
    return patch.newFileName && patch.newFileName !== patch.oldFileName;
  }

  function selectField(index, mine, theirs) {
    if (mine === theirs) {
      return mine;
    } else {
      index.conflict = true;
      return {
        mine: mine,
        theirs: theirs
      };
    }
  }

  function hunkBefore(test, check) {
    return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
  }

  function cloneHunk(hunk, offset) {
    return {
      oldStart: hunk.oldStart,
      oldLines: hunk.oldLines,
      newStart: hunk.newStart + offset,
      newLines: hunk.newLines,
      lines: hunk.lines
    };
  }

  function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
    // This will generally result in a conflicted hunk, but there are cases where the context
    // is the only overlap where we can successfully merge the content here.
    var mine = {
      offset: mineOffset,
      lines: mineLines,
      index: 0
    },
        their = {
      offset: theirOffset,
      lines: theirLines,
      index: 0
    }; // Handle any leading content

    insertLeading(hunk, mine, their);
    insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

    while (mine.index < mine.lines.length && their.index < their.lines.length) {
      var mineCurrent = mine.lines[mine.index],
          theirCurrent = their.lines[their.index];

      if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
        // Both modified ...
        mutualChange(hunk, mine, their);
      } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
        var _hunk$lines; // Mine inserted


        (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
      } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
        var _hunk$lines2; // Theirs inserted


        (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
      } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
        // Mine removed or edited
        removal(hunk, mine, their);
      } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
        // Their removed or edited
        removal(hunk, their, mine, true);
      } else if (mineCurrent === theirCurrent) {
        // Context identity
        hunk.lines.push(mineCurrent);
        mine.index++;
        their.index++;
      } else {
        // Context mismatch
        conflict(hunk, collectChange(mine), collectChange(their));
      }
    } // Now push anything that may be remaining


    insertTrailing(hunk, mine);
    insertTrailing(hunk, their);
    calcLineCount(hunk);
  }

  function mutualChange(hunk, mine, their) {
    var myChanges = collectChange(mine),
        theirChanges = collectChange(their);

    if (allRemoves(myChanges) && allRemoves(theirChanges)) {
      // Special case for remove changes that are supersets of one another
      if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
        var _hunk$lines3;

        (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

        return;
      } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
        var _hunk$lines4;

        (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

        return;
      }
    } else if (arrayEqual(myChanges, theirChanges)) {
      var _hunk$lines5;

      (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

      return;
    }

    conflict(hunk, myChanges, theirChanges);
  }

  function removal(hunk, mine, their, swap) {
    var myChanges = collectChange(mine),
        theirChanges = collectContext(their, myChanges);

    if (theirChanges.merged) {
      var _hunk$lines6;

      (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
    } else {
      conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
    }
  }

  function conflict(hunk, mine, their) {
    hunk.conflict = true;
    hunk.lines.push({
      conflict: true,
      mine: mine,
      theirs: their
    });
  }

  function insertLeading(hunk, insert, their) {
    while (insert.offset < their.offset && insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
      insert.offset++;
    }
  }

  function insertTrailing(hunk, insert) {
    while (insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
    }
  }

  function collectChange(state) {
    var ret = [],
        operation = state.lines[state.index][0];

    while (state.index < state.lines.length) {
      var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

      if (operation === '-' && line[0] === '+') {
        operation = '+';
      }

      if (operation === line[0]) {
        ret.push(line);
        state.index++;
      } else {
        break;
      }
    }

    return ret;
  }

  function collectContext(state, matchChanges) {
    var changes = [],
        merged = [],
        matchIndex = 0,
        contextChanges = false,
        conflicted = false;

    while (matchIndex < matchChanges.length && state.index < state.lines.length) {
      var change = state.lines[state.index],
          match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

      if (match[0] === '+') {
        break;
      }

      contextChanges = contextChanges || change[0] !== ' ';
      merged.push(match);
      matchIndex++; // Consume any additions in the other block as a conflict to attempt
      // to pull in the remaining context after this

      if (change[0] === '+') {
        conflicted = true;

        while (change[0] === '+') {
          changes.push(change);
          change = state.lines[++state.index];
        }
      }

      if (match.substr(1) === change.substr(1)) {
        changes.push(change);
        state.index++;
      } else {
        conflicted = true;
      }
    }

    if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
      conflicted = true;
    }

    if (conflicted) {
      return changes;
    }

    while (matchIndex < matchChanges.length) {
      merged.push(matchChanges[matchIndex++]);
    }

    return {
      merged: merged,
      changes: changes
    };
  }

  function allRemoves(changes) {
    return changes.reduce(function (prev, change) {
      return prev && change[0] === '-';
    }, true);
  }

  function skipRemoveSuperset(state, removeChanges, delta) {
    for (var i = 0; i < delta; i++) {
      var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

      if (state.lines[state.index + i] !== ' ' + changeContent) {
        return false;
      }
    }

    state.index += delta;
    return true;
  }

  function calcOldNewLineCount(lines) {
    var oldLines = 0;
    var newLines = 0;
    lines.forEach(function (line) {
      if (typeof line !== 'string') {
        var myCount = calcOldNewLineCount(line.mine);
        var theirCount = calcOldNewLineCount(line.theirs);

        if (oldLines !== undefined) {
          if (myCount.oldLines === theirCount.oldLines) {
            oldLines += myCount.oldLines;
          } else {
            oldLines = undefined;
          }
        }

        if (newLines !== undefined) {
          if (myCount.newLines === theirCount.newLines) {
            newLines += myCount.newLines;
          } else {
            newLines = undefined;
          }
        }
      } else {
        if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
          newLines++;
        }

        if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
          oldLines++;
        }
      }
    });
    return {
      oldLines: oldLines,
      newLines: newLines
    };
  } // See: http://code.google.com/p/google-diff-match-patch/wiki/API


  function convertChangesToDMP(changes) {
    var ret = [],
        change,
        operation;

    for (var i = 0; i < changes.length; i++) {
      change = changes[i];

      if (change.added) {
        operation = 1;
      } else if (change.removed) {
        operation = -1;
      } else {
        operation = 0;
      }

      ret.push([operation, change.value]);
    }

    return ret;
  }

  function convertChangesToXML(changes) {
    var ret = [];

    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];

      if (change.added) {
        ret.push('<ins>');
      } else if (change.removed) {
        ret.push('<del>');
      }

      ret.push(escapeHTML(change.value));

      if (change.added) {
        ret.push('</ins>');
      } else if (change.removed) {
        ret.push('</del>');
      }
    }

    return ret.join('');
  }

  function escapeHTML(s) {
    var n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');
    return n;
  }
  /* See LICENSE file for terms of use */


  exports.Diff = Diff;
  exports.diffChars = diffChars;
  exports.diffWords = diffWords;
  exports.diffWordsWithSpace = diffWordsWithSpace;
  exports.diffLines = diffLines;
  exports.diffTrimmedLines = diffTrimmedLines;
  exports.diffSentences = diffSentences;
  exports.diffCss = diffCss;
  exports.diffJson = diffJson;
  exports.diffArrays = diffArrays;
  exports.structuredPatch = structuredPatch;
  exports.createTwoFilesPatch = createTwoFilesPatch;
  exports.createPatch = createPatch;
  exports.applyPatch = applyPatch;
  exports.applyPatches = applyPatches;
  exports.parsePatch = parsePatch;
  exports.merge = merge;
  exports.convertChangesToDMP = convertChangesToDMP;
  exports.convertChangesToXML = convertChangesToXML;
  exports.canonicalize = canonicalize;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var emotion_1 = __webpack_require__(1149);

exports.default = function (styleOverride, useDarkTheme) {
  var _a, _b, _c, _d, _e, _f, _g;

  if (useDarkTheme === void 0) {
    useDarkTheme = false;
  }

  var _h = styleOverride.variables,
      overrideVariables = _h === void 0 ? {} : _h,
      styles = __rest(styleOverride, ["variables"]);

  var themeVariables = {
    light: __assign({
      diffViewerBackground: '#fff',
      diffViewerColor: '212529',
      addedBackground: '#e6ffed',
      addedColor: '#24292e',
      removedBackground: '#ffeef0',
      removedColor: '#24292e',
      wordAddedBackground: '#acf2bd',
      wordRemovedBackground: '#fdb8c0',
      addedGutterBackground: '#cdffd8',
      removedGutterBackground: '#ffdce0',
      gutterBackground: '#f7f7f7',
      gutterBackgroundDark: '#f3f1f1',
      highlightBackground: '#fffbdd',
      highlightGutterBackground: '#fff5b1',
      codeFoldGutterBackground: '#dbedff',
      codeFoldBackground: '#f1f8ff',
      emptyLineBackground: '#fafbfc',
      gutterColor: '#212529',
      addedGutterColor: '#212529',
      removedGutterColor: '#212529',
      codeFoldContentColor: '#212529',
      diffViewerTitleBackground: '#fafbfc',
      diffViewerTitleColor: '#212529',
      diffViewerTitleBorderColor: '#eee'
    }, overrideVariables.light || {}),
    dark: __assign({
      diffViewerBackground: '#2e303c',
      diffViewerColor: '#FFF',
      addedBackground: '#044B53',
      addedColor: 'white',
      removedBackground: '#632F34',
      removedColor: 'white',
      wordAddedBackground: '#055d67',
      wordRemovedBackground: '#7d383f',
      addedGutterBackground: '#034148',
      removedGutterBackground: '#632b30',
      gutterBackground: '#2c2f3a',
      gutterBackgroundDark: '#262933',
      highlightBackground: '#2a3967',
      highlightGutterBackground: '#2d4077',
      codeFoldGutterBackground: '#21232b',
      codeFoldBackground: '#262831',
      emptyLineBackground: '#363946',
      gutterColor: '#464c67',
      addedGutterColor: '#8c8c8c',
      removedGutterColor: '#8c8c8c',
      codeFoldContentColor: '#555a7b',
      diffViewerTitleBackground: '#2f323e',
      diffViewerTitleColor: '#555a7b',
      diffViewerTitleBorderColor: '#353846'
    }, overrideVariables.dark || {})
  };
  var variables = useDarkTheme ? themeVariables.dark : themeVariables.light;
  var content = emotion_1.css({
    width: '100%',
    label: 'content'
  });
  var splitView = emotion_1.css((_a = {}, _a["." + content] = {
    width: '50%'
  }, _a.label = 'split-view', _a));
  var diffContainer = emotion_1.css({
    width: '100%',
    background: variables.diffViewerBackground,
    pre: {
      margin: 0,
      whiteSpace: 'pre-wrap',
      lineHeight: '25px'
    },
    label: 'diff-container',
    borderCollapse: 'collapse'
  });
  var codeFoldContent = emotion_1.css({
    color: variables.codeFoldContentColor,
    label: 'code-fold-content'
  });
  var contentText = emotion_1.css({
    color: variables.diffViewerColor,
    label: 'content-text'
  });
  var titleBlock = emotion_1.css((_b = {
    background: variables.diffViewerTitleBackground,
    padding: 10,
    borderBottom: "1px solid " + variables.diffViewerTitleBorderColor,
    label: 'title-block',
    ':last-child': {
      borderLeft: "1px solid " + variables.diffViewerTitleBorderColor
    }
  }, _b["." + contentText] = {
    color: variables.diffViewerTitleColor
  }, _b));
  var lineNumber = emotion_1.css({
    color: variables.gutterColor,
    label: 'line-number'
  });
  var diffRemoved = emotion_1.css((_c = {
    background: variables.removedBackground,
    color: variables.removedColor,
    pre: {
      color: variables.removedColor
    }
  }, _c["." + lineNumber] = {
    color: variables.removedGutterColor
  }, _c.label = 'diff-removed', _c));
  var diffAdded = emotion_1.css((_d = {
    background: variables.addedBackground,
    color: variables.addedColor,
    pre: {
      color: variables.addedColor
    }
  }, _d["." + lineNumber] = {
    color: variables.addedGutterColor
  }, _d.label = 'diff-added', _d));
  var wordDiff = emotion_1.css({
    padding: 2,
    display: 'inline-flex',
    borderRadius: 1,
    label: 'word-diff'
  });
  var wordAdded = emotion_1.css({
    background: variables.wordAddedBackground,
    label: 'word-added'
  });
  var wordRemoved = emotion_1.css({
    background: variables.wordRemovedBackground,
    label: 'word-removed'
  });
  var codeFoldGutter = emotion_1.css({
    backgroundColor: variables.codeFoldGutterBackground,
    label: 'code-fold-gutter'
  });
  var codeFold = emotion_1.css({
    backgroundColor: variables.codeFoldBackground,
    height: 40,
    fontSize: 14,
    fontWeight: 700,
    label: 'code-fold',
    a: {
      textDecoration: 'underline !important',
      cursor: 'pointer',
      pre: {
        display: 'inline'
      }
    }
  });
  var emptyLine = emotion_1.css({
    backgroundColor: variables.emptyLineBackground,
    label: 'empty-line'
  });
  var marker = emotion_1.css((_e = {
    width: 25,
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: 'none',
    label: 'marker'
  }, _e["&." + diffAdded] = {
    pre: {
      color: variables.addedColor
    }
  }, _e["&." + diffRemoved] = {
    pre: {
      color: variables.removedColor
    }
  }, _e));
  var highlightedLine = emotion_1.css((_f = {
    background: variables.highlightBackground,
    label: 'highlighted-line'
  }, _f["." + wordAdded + ", ." + wordRemoved] = {
    backgroundColor: 'initial'
  }, _f));
  var highlightedGutter = emotion_1.css({
    label: 'highlighted-gutter'
  });
  var gutter = emotion_1.css((_g = {
    userSelect: 'none',
    minWidth: 50,
    padding: '0 10px',
    label: 'gutter',
    textAlign: 'right',
    background: variables.gutterBackground,
    '&:hover': {
      cursor: 'pointer',
      background: variables.gutterBackgroundDark,
      pre: {
        opacity: 1
      }
    },
    pre: {
      opacity: 0.5
    }
  }, _g["&." + diffAdded] = {
    background: variables.addedGutterBackground
  }, _g["&." + diffRemoved] = {
    background: variables.removedGutterBackground
  }, _g["&." + highlightedGutter] = {
    background: variables.highlightGutterBackground,
    '&:hover': {
      background: variables.highlightGutterBackground
    }
  }, _g));
  var emptyGutter = emotion_1.css({
    '&:hover': {
      background: variables.gutterBackground,
      cursor: 'initial'
    },
    label: 'empty-gutter'
  });
  var line = emotion_1.css({
    verticalAlign: 'baseline',
    label: 'line'
  });
  var defaultStyles = {
    diffContainer: diffContainer,
    diffRemoved: diffRemoved,
    diffAdded: diffAdded,
    splitView: splitView,
    marker: marker,
    highlightedGutter: highlightedGutter,
    highlightedLine: highlightedLine,
    gutter: gutter,
    line: line,
    wordDiff: wordDiff,
    wordAdded: wordAdded,
    wordRemoved: wordRemoved,
    codeFoldGutter: codeFoldGutter,
    codeFold: codeFold,
    emptyGutter: emptyGutter,
    emptyLine: emptyLine,
    lineNumber: lineNumber,
    contentText: contentText,
    content: content,
    codeFoldContent: codeFoldContent,
    titleBlock: titleBlock
  };
  var computerOverrideStyles = Object.keys(styles).reduce(function (acc, key) {
    var _a;

    return __assign({}, acc, (_a = {}, _a[key] = emotion_1.css(styles[key]), _a));
  }, {});
  return Object.keys(defaultStyles).reduce(function (acc, key) {
    var _a;

    return __assign({}, acc, (_a = {}, _a[key] = computerOverrideStyles[key] ? emotion_1.cx(defaultStyles[key], computerOverrideStyles[key]) : defaultStyles[key], _a));
  }, {});
};

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  function memoized() {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

/* harmony default export */ __webpack_exports__["default"] = (memoizeOne);

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray = __webpack_require__(131);

var _classCallCheck = __webpack_require__(39);

var _createClass = __webpack_require__(40);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Char = /*#__PURE__*/function () {
  function Char(stream, pos) {
    _classCallCheck(this, Char);

    this.stream = stream;
    this.pos = pos;
  }

  _createClass(Char, [{
    key: "value",
    get: function get() {
      return this.stream[this.pos];
    }
  }]);

  return Char;
}();

var Token = /*#__PURE__*/function () {
  function Token(stream, start, end) {
    _classCallCheck(this, Token);

    this.stream = stream;
    this.start = start;
    this.end = end;
  }

  _createClass(Token, [{
    key: "value",
    get: function get() {
      return this.stream.slice(this.start, this.end);
    }
  }, {
    key: "whitespace",
    get: function get() {
      var i = this.start - 1;

      for (; i >= 0 && /\s/.test(this.stream[i]); i--) {
        ;
      }

      return new Token(this.stream, i + 1, this.start);
    }
  }]);

  return Token;
}();

function nextChar(s, i) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\S/g;
  if (!regex.global) throw new Error('Regexp must be global');
  regex.lastIndex = i;
  var res = regex.exec(s);
  if (!res) return;
  return new Char(s, res.index);
}

function nextToken(s, i) {
  var char = nextChar(s, i);
  if (!char) return;
  var start = char.pos;
  char = nextChar(s, start + 1, /[\s<]|>/g);
  var end = char ? char.pos + Number(char.value == '>') : s.length;
  return new Token(s, start, end);
}

var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr', '!doctype', '--'];

function parseTokenValue(value) {
  var tagName = value.replace(/^<\/?|>$/g, '').toLowerCase();
  if (tagName.startsWith('!--') || tagName.endsWith('--')) tagName = '--';
  var isTagStart = /</.test(value);
  var isTagEnd = />/.test(value);
  var isStartTag = /<([^/]|$)/.test(value);
  var isEndTag = /<\//.test(value) || isStartTag && voidTags.includes(tagName);
  return {
    isTagStart: isTagStart,
    isTagEnd: isTagEnd,
    isStartTag: isStartTag,
    isEndTag: isEndTag,
    tagName: tagName
  };
}

function format(html) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
  var output = [];
  var inStartTag = false;
  var inEndTag = false;
  var inPre = false;
  var inSpecialElement = false;
  var tag = '';
  var indentLevel = 0;
  var prevState = {};
  var token;
  var i = 0;

  while (token = nextToken(html, i)) {
    var tokenValue = token.value;
    var tokenWhitespaceValue = token.whitespace.value;
    var pendingWhitespace = '';

    var _parseTokenValue = parseTokenValue(tokenValue),
        isTagStart = _parseTokenValue.isTagStart,
        isTagEnd = _parseTokenValue.isTagEnd,
        isStartTag = _parseTokenValue.isStartTag,
        isEndTag = _parseTokenValue.isEndTag,
        tagName = _parseTokenValue.tagName; // Token adjustments for edge cases


    if (!inSpecialElement) {
      // Remove space before tag name
      if (isTagStart && !tagName) {
        i = token.end;
        token = nextToken(html, i);
        if (!token) break;
        tokenValue += token.value;

        var _parseTokenValue2 = parseTokenValue(tokenValue);

        isTagStart = _parseTokenValue2.isTagStart;
        isTagEnd = _parseTokenValue2.isTagEnd;
        isStartTag = _parseTokenValue2.isStartTag;
        isEndTag = _parseTokenValue2.isEndTag;
        tagName = _parseTokenValue2.tagName;
      } // Split attributes stuck together


      if (!isTagStart && (inStartTag || inEndTag)) {
        // If attribute has end quote followed by another attribute
        var regex = /[^=]"[^>]/g;
        var res = regex.exec(tokenValue);

        if (res && token.end != token.start + res.index + 2) {
          token.end = token.start + res.index + 2;
          tokenValue = token.value;

          var _parseTokenValue3 = parseTokenValue(tokenValue);

          isTagStart = _parseTokenValue3.isTagStart;
          isTagEnd = _parseTokenValue3.isTagEnd;
          isStartTag = _parseTokenValue3.isStartTag;
          isEndTag = _parseTokenValue3.isEndTag;
          tagName = _parseTokenValue3.tagName;
          pendingWhitespace = indent;
        }
      }
    }

    if (!inSpecialElement && isStartTag) tag = tagName;
    var isEndSpecialTag = (isEndTag && tagName != '--' || isTagEnd && tagName == '--') && tagName == tag; // Ignore any tags inside special elements

    if (inSpecialElement && !isEndSpecialTag) isTagStart = isTagEnd = isStartTag = isEndTag = false; // Current State

    if (isStartTag) inStartTag = true;
    if (isEndTag) inEndTag = true;
    if (isEndTag && !isStartTag) // A void tag will be both
      --indentLevel;
    var isStartSpecialTag = inStartTag && isTagEnd && ['script', 'style'].includes(tag) || isStartTag && tag == '--'; // Convenience

    var inTag = inStartTag || inEndTag; // Whitespace

    var whitespace = tokenWhitespaceValue || prevState.pendingWhitespace;
    var ignoreSpace = inTag && (/^[=">]([^=]|$)/.test(tokenValue) || /(^|=)"$/.test(prevState.tokenValue)); // Preserve whitespace inside special and pre elements

    if (inSpecialElement || inPre) output.push(tokenWhitespaceValue);else if (whitespace && !ignoreSpace) {
      var numNewlines = (whitespace.match(/\n/g) || []).length;
      var lastNewline = Math.max(0, output.lastIndexOf('\n'));
      var lineLength = output.slice(lastNewline).reduce(function (l, s) {
        return l + s.length;
      }, 0);
      var indents = indent.repeat(indentLevel + Number(inTag && !isTagStart));
      if (lineLength + tokenValue.length > width) output.push('\n', indents);else if (numNewlines) output.push.apply(output, _toConsumableArray(Array(numNewlines).fill('\n')).concat([indents]));else output.push(' ');
    }
    output.push(tokenValue);
    prevState = {
      pendingWhitespace: pendingWhitespace,
      tokenValue: tokenValue
    }; // Next state

    if (isStartSpecialTag) inSpecialElement = true;
    if (isEndSpecialTag) inSpecialElement = false;
    if (inStartTag && isTagEnd && tag == 'pre') inPre = true;
    if (isEndTag && tagName == 'pre') inPre = false;
    if (inStartTag && isTagEnd && !inEndTag) // A void tag is both start & end
      ++indentLevel;
    if (isTagEnd) inStartTag = inEndTag = false;
    i = token.end;
  }

  if (html[html.length - 1] == '\n') output.push('\n');
  return output.join('');
}

exports.default = format;
module.exports = Object.assign(exports.default, exports);

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(112);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);



var StyledContent = styled_components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"].main.withConfig({
  displayName: "layout__StyledContent",
  componentId: "sc-1juqdk6-0"
})(["max-width:1140px;margin:auto;"]);
var Layout = function Layout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__[/* Helmet */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledContent, null, children));
};

/***/ })

}]);
//# sourceMappingURL=component---src-pages-zoli-tsx-afe2cd6c04b3c8f79803.js.map