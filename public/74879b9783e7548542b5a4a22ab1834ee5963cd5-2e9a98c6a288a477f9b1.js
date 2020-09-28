(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[7],{

/***/ 1168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: styles

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 2 modules
var withStyles = __webpack_require__(73);

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

/***/ 1195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(10);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/utils/debounce.js
// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 166;
  var timeout;

  function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    } // eslint-disable-next-line consistent-this


    var that = this;

    var later = function later() {
      func.apply(that, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = function () {
    clearTimeout(timeout);
  };

  return debounced;
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/useForkRef.js + 1 modules
var useForkRef = __webpack_require__(416);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/TextareaAutosize/TextareaAutosize.js






function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

var useEnhancedEffect = typeof window !== 'undefined' ? react["useLayoutEffect"] : react["useEffect"];
var styles = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)'
  }
};
var TextareaAutosize_TextareaAutosize = /*#__PURE__*/react["forwardRef"](function TextareaAutosize(props, ref) {
  var onChange = props.onChange,
      rows = props.rows,
      rowsMax = props.rowsMax,
      _props$rowsMin = props.rowsMin,
      rowsMinProp = _props$rowsMin === void 0 ? 1 : _props$rowsMin,
      style = props.style,
      value = props.value,
      other = Object(objectWithoutProperties["a" /* default */])(props, ["onChange", "rows", "rowsMax", "rowsMin", "style", "value"]);

  var rowsMin = rows || rowsMinProp;

  var _React$useRef = react["useRef"](value != null),
      isControlled = _React$useRef.current;

  var inputRef = react["useRef"](null);
  var handleRef = Object(useForkRef["a" /* default */])(ref, inputRef);
  var shadowRef = react["useRef"](null);
  var renders = react["useRef"](0);

  var _React$useState = react["useState"]({}),
      state = _React$useState[0],
      setState = _React$useState[1];

  var syncHeight = react["useCallback"](function () {
    var input = inputRef.current;
    var computedStyle = window.getComputedStyle(input);
    var inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';

    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    var boxSizing = computedStyle['box-sizing'];
    var padding = getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    var border = getStyleValue(computedStyle, 'border-bottom-width') + getStyleValue(computedStyle, 'border-top-width'); // The height of the inner content

    var innerHeight = inputShallow.scrollHeight - padding; // Measure height of a textarea with a single row

    inputShallow.value = 'x';
    var singleRowHeight = inputShallow.scrollHeight - padding; // The height of the outer content

    var outerHeight = innerHeight;

    if (rowsMin) {
      outerHeight = Math.max(Number(rowsMin) * singleRowHeight, outerHeight);
    }

    if (rowsMax) {
      outerHeight = Math.min(Number(rowsMax) * singleRowHeight, outerHeight);
    }

    outerHeight = Math.max(outerHeight, singleRowHeight); // Take the box sizing into account for applying this value as a style.

    var outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    var overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState(function (prevState) {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
        renders.current += 1;
        return {
          overflow: overflow,
          outerHeightStyle: outerHeightStyle
        };
      }

      if (false) {}

      return prevState;
    });
  }, [rowsMax, rowsMin, props.placeholder]);
  react["useEffect"](function () {
    var handleResize = debounce(function () {
      renders.current = 0;
      syncHeight();
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);
  useEnhancedEffect(function () {
    syncHeight();
  });
  react["useEffect"](function () {
    renders.current = 0;
  }, [value]);

  var handleChange = function handleChange(event) {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("textarea", Object(esm_extends["a" /* default */])({
    value: value,
    onChange: handleChange,
    ref: handleRef // Apply the rows prop to get a "correct" first SSR paint
    ,
    rows: rowsMin,
    style: Object(esm_extends["a" /* default */])({
      height: state.outerHeightStyle,
      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow: state.overflow ? 'hidden' : null
    }, style)
  }, other)), /*#__PURE__*/react["createElement"]("textarea", {
    "aria-hidden": true,
    className: props.className,
    readOnly: true,
    ref: shadowRef,
    tabIndex: -1,
    style: Object(esm_extends["a" /* default */])({}, styles.shadow, style)
  }));
});
 false ? undefined : void 0;
/* harmony default export */ var esm_TextareaAutosize_TextareaAutosize = __webpack_exports__["a"] = (TextareaAutosize_TextareaAutosize);

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return unHash; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97);
/* harmony import */ var _sha256_sha256_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(230);
/* harmony import */ var _sha256_sha256_worker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sha256_sha256_worker__WEBPACK_IMPORTED_MODULE_3__);




var hashTable = {};

var _ref = typeof window !== "undefined" && _sha256_sha256_worker__WEBPACK_IMPORTED_MODULE_3__(),
    sha256 = _ref.sha256;

var hash = /*#__PURE__*/function () {
  var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(input) {
    var strInput, hash, shorterHash, shortener;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shortener = function _shortener(hash) {
              for (var i = 4; i < 64; i++) {
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

  return function hash(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var unHash = /*#__PURE__*/function () {
  var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(hash) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", hashTable[hashTable[hash]] || "Something is broken");

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function unHash(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ 148:
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

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(148)
				var methods = ["sha256"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-sha256.95c84a.worker.js", { name: "built-sha256.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return invariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return warning; });
var warning = function warning() {};

var invariant = function invariant() {};

if (false) {}



/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __rest; });
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __createBinding */
/* unused harmony export __exportStar */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __spreadArrays; });
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/* unused harmony export __classPrivateFieldGet */
/* unused harmony export __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
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

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};


function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
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
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cancelSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getFrameData; });
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(231);

var prevTime = 0;
var onNextFrame = typeof window !== 'undefined' && window.requestAnimationFrame !== undefined ? function (callback) {
  return window.requestAnimationFrame(callback);
} : function (callback) {
  var timestamp = Date.now();
  var timeToCall = Math.max(0, 16.7 - (timestamp - prevTime));
  prevTime = timestamp + timeToCall;
  setTimeout(function () {
    return callback(prevTime);
  }, timeToCall);
};

var createStep = function createStep(setRunNextFrame) {
  var processToRun = [];
  var processToRunNextFrame = [];
  var numThisFrame = 0;
  var isProcessing = false;
  var i = 0;
  var cancelled = new WeakSet();
  var toKeepAlive = new WeakSet();
  var renderStep = {
    cancel: function cancel(process) {
      var indexOfCallback = processToRunNextFrame.indexOf(process);
      cancelled.add(process);

      if (indexOfCallback !== -1) {
        processToRunNextFrame.splice(indexOfCallback, 1);
      }
    },
    process: function process(frame) {
      var _a;

      isProcessing = true;
      _a = [processToRunNextFrame, processToRun], processToRun = _a[0], processToRunNextFrame = _a[1];
      processToRunNextFrame.length = 0;
      numThisFrame = processToRun.length;

      if (numThisFrame) {
        var process_1;

        for (i = 0; i < numThisFrame; i++) {
          process_1 = processToRun[i];
          process_1(frame);

          if (toKeepAlive.has(process_1) === true && !cancelled.has(process_1)) {
            renderStep.schedule(process_1);
            setRunNextFrame(true);
          }
        }
      }

      isProcessing = false;
    },
    schedule: function schedule(process, keepAlive, immediate) {
      if (keepAlive === void 0) {
        keepAlive = false;
      }

      if (immediate === void 0) {
        immediate = false;
      }

      Object(hey_listen__WEBPACK_IMPORTED_MODULE_0__[/* invariant */ "a"])(typeof process === "function", "Argument must be a function");
      var addToCurrentBuffer = immediate && isProcessing;
      var buffer = addToCurrentBuffer ? processToRun : processToRunNextFrame;
      cancelled.delete(process);
      if (keepAlive) toKeepAlive.add(process);

      if (buffer.indexOf(process) === -1) {
        buffer.push(process);
        if (addToCurrentBuffer) numThisFrame = processToRun.length;
      }
    }
  };
  return renderStep;
};

var maxElapsed = 40;
var defaultElapsed = 1 / 60 * 1000;
var useDefaultElapsed = true;
var willRunNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];

var setWillRunNextFrame = function setWillRunNextFrame(willRun) {
  return willRunNextFrame = willRun;
};

var steps = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  acc[key] = createStep(setWillRunNextFrame);
  return acc;
}, {});
var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  var step = steps[key];

  acc[key] = function (process, keepAlive, immediate) {
    if (keepAlive === void 0) {
      keepAlive = false;
    }

    if (immediate === void 0) {
      immediate = false;
    }

    if (!willRunNextFrame) startLoop();
    step.schedule(process, keepAlive, immediate);
    return process;
  };

  return acc;
}, {});
var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  acc[key] = steps[key].cancel;
  return acc;
}, {});

var processStep = function processStep(stepId) {
  return steps[stepId].process(frame);
};

var processFrame = function processFrame(timestamp) {
  willRunNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultElapsed : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  if (!useDefaultElapsed) defaultElapsed = frame.delta;
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;

  if (willRunNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};

var startLoop = function startLoop() {
  willRunNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing) onNextFrame(processFrame);
};

var getFrameData = function getFrameData() {
  return frame;
};

/* harmony default export */ __webpack_exports__["b"] = (sync);


/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return complex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return percent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return progressPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return px; });
/* unused harmony export rgbUnit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return vh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return vw; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(232);


var clamp = function clamp(min, max) {
  return function (v) {
    return Math.max(Math.min(v, max), min);
  };
};

var sanitize = function sanitize(v) {
  return v % 1 ? Number(v.toFixed(5)) : v;
};

var floatRegex = /(-)?(\d[\d\.]*)/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
var number = {
  test: function test(v) {
    return typeof v === 'number';
  },
  parse: parseFloat,
  transform: function transform(v) {
    return v;
  }
};

var alpha = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, number), {
  transform: clamp(0, 1)
});

var scale = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, number), {
  default: 1
});

var createUnitType = function createUnitType(unit) {
  return {
    test: function test(v) {
      return typeof v === 'string' && v.endsWith(unit) && v.split(' ').length === 1;
    },
    parse: parseFloat,
    transform: function transform(v) {
      return "" + v + unit;
    }
  };
};

var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px = createUnitType('px');
var vh = createUnitType('vh');
var vw = createUnitType('vw');

var progressPercentage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, percent), {
  parse: function parse(v) {
    return percent.parse(v) / 100;
  },
  transform: function transform(v) {
    return percent.transform(v * 100);
  }
});

var getValueFromFunctionString = function getValueFromFunctionString(value) {
  return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
};

var clampRgbUnit = clamp(0, 255);

var isRgba = function isRgba(v) {
  return v.red !== undefined;
};

var isHsla = function isHsla(v) {
  return v.hue !== undefined;
};

function getValuesAsArray(value) {
  return getValueFromFunctionString(value).replace(/(,|\/)/g, ' ').split(/ \s*/);
}

var splitColorValues = function splitColorValues(terms) {
  return function (v) {
    if (typeof v !== 'string') return v;
    var values = {};
    var valuesArray = getValuesAsArray(v);

    for (var i = 0; i < 4; i++) {
      values[terms[i]] = valuesArray[i] !== undefined ? parseFloat(valuesArray[i]) : 1;
    }

    return values;
  };
};

var rgbaTemplate = function rgbaTemplate(_a) {
  var red = _a.red,
      green = _a.green,
      blue = _a.blue,
      _b = _a.alpha,
      alpha = _b === void 0 ? 1 : _b;
  return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
};

var hslaTemplate = function hslaTemplate(_a) {
  var hue = _a.hue,
      saturation = _a.saturation,
      lightness = _a.lightness,
      _b = _a.alpha,
      alpha = _b === void 0 ? 1 : _b;
  return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " + alpha + ")";
};

var rgbUnit = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, number), {
  transform: function transform(v) {
    return Math.round(clampRgbUnit(v));
  }
});

function isColorString(color, colorType) {
  return color.startsWith(colorType) && singleColorRegex.test(color);
}

var rgba = {
  test: function test(v) {
    return typeof v === 'string' ? isColorString(v, 'rgb') : isRgba(v);
  },
  parse: splitColorValues(['red', 'green', 'blue', 'alpha']),
  transform: function transform(_a) {
    var red = _a.red,
        green = _a.green,
        blue = _a.blue,
        _b = _a.alpha,
        alpha$1 = _b === void 0 ? 1 : _b;
    return rgbaTemplate({
      red: rgbUnit.transform(red),
      green: rgbUnit.transform(green),
      blue: rgbUnit.transform(blue),
      alpha: sanitize(alpha.transform(alpha$1))
    });
  }
};
var hsla = {
  test: function test(v) {
    return typeof v === 'string' ? isColorString(v, 'hsl') : isHsla(v);
  },
  parse: splitColorValues(['hue', 'saturation', 'lightness', 'alpha']),
  transform: function transform(_a) {
    var hue = _a.hue,
        saturation = _a.saturation,
        lightness = _a.lightness,
        _b = _a.alpha,
        alpha$1 = _b === void 0 ? 1 : _b;
    return hslaTemplate({
      hue: Math.round(hue),
      saturation: percent.transform(sanitize(saturation)),
      lightness: percent.transform(sanitize(lightness)),
      alpha: sanitize(alpha.transform(alpha$1))
    });
  }
};

var hex = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, rgba), {
  test: function test(v) {
    return typeof v === 'string' && isColorString(v, '#');
  },
  parse: function parse(v) {
    var r = '';
    var g = '';
    var b = '';

    if (v.length > 4) {
      r = v.substr(1, 2);
      g = v.substr(3, 2);
      b = v.substr(5, 2);
    } else {
      r = v.substr(1, 1);
      g = v.substr(2, 1);
      b = v.substr(3, 1);
      r += r;
      g += g;
      b += b;
    }

    return {
      red: parseInt(r, 16),
      green: parseInt(g, 16),
      blue: parseInt(b, 16),
      alpha: 1
    };
  }
});

var color = {
  test: function test(v) {
    return typeof v === 'string' && singleColorRegex.test(v) || isRgba(v) || isHsla(v);
  },
  parse: function parse(v) {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else if (hex.test(v)) {
      return hex.parse(v);
    }

    return v;
  },
  transform: function transform(v) {
    if (isRgba(v)) {
      return rgba.transform(v);
    } else if (isHsla(v)) {
      return hsla.transform(v);
    }

    return v;
  }
};
var COLOR_TOKEN = '${c}';
var NUMBER_TOKEN = '${n}';

var convertNumbersToZero = function convertNumbersToZero(v) {
  return typeof v === 'number' ? 0 : v;
};

var complex = {
  test: function test(v) {
    if (typeof v !== 'string' || !isNaN(v)) return false;
    var numValues = 0;
    var foundNumbers = v.match(floatRegex);
    var foundColors = v.match(colorRegex);
    if (foundNumbers) numValues += foundNumbers.length;
    if (foundColors) numValues += foundColors.length;
    return numValues > 0;
  },
  parse: function parse(v) {
    var input = v;
    var parsed = [];
    var foundColors = input.match(colorRegex);

    if (foundColors) {
      input = input.replace(colorRegex, COLOR_TOKEN);
      parsed.push.apply(parsed, foundColors.map(color.parse));
    }

    var foundNumbers = input.match(floatRegex);

    if (foundNumbers) {
      parsed.push.apply(parsed, foundNumbers.map(number.parse));
    }

    return parsed;
  },
  createTransformer: function createTransformer(prop) {
    var template = prop;
    var token = 0;
    var foundColors = prop.match(colorRegex);
    var numColors = foundColors ? foundColors.length : 0;

    if (foundColors) {
      for (var i = 0; i < numColors; i++) {
        template = template.replace(foundColors[i], COLOR_TOKEN);
        token++;
      }
    }

    var foundNumbers = template.match(floatRegex);
    var numNumbers = foundNumbers ? foundNumbers.length : 0;

    if (foundNumbers) {
      for (var i = 0; i < numNumbers; i++) {
        template = template.replace(foundNumbers[i], NUMBER_TOKEN);
        token++;
      }
    }

    return function (v) {
      var output = template;

      for (var i = 0; i < token; i++) {
        output = output.replace(i < numColors ? COLOR_TOKEN : NUMBER_TOKEN, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
      }

      return output;
    };
  },
  getAnimatableNone: function getAnimatableNone(target) {
    var parsedTarget = complex.parse(target);
    var targetTransformer = complex.createTransformer(target);
    return targetTransformer(parsedTarget.map(convertNumbersToZero));
  }
};


/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export angle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return anticipate; });
/* unused harmony export applyOffset */
/* unused harmony export attract */
/* unused harmony export attractExpo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return backInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return bounceIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return bounceInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return bounceOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return circIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return circInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return circOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return clamp; });
/* unused harmony export createAnticipate */
/* unused harmony export createAttractor */
/* unused harmony export createBackIn */
/* unused harmony export createExpoIn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return cubicBezier; });
/* unused harmony export decay */
/* unused harmony export degreesToRadians */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return easeIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return easeInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return easeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return inertia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return interpolate; });
/* unused harmony export isPoint */
/* unused harmony export isPoint3D */
/* unused harmony export keyframes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return linear; });
/* unused harmony export mirrorEasing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return mix; });
/* unused harmony export mixColor */
/* unused harmony export mixComplex */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return pipe; });
/* unused harmony export pointFromVector */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return progress; });
/* unused harmony export radiansToDegrees */
/* unused harmony export reverseEasing */
/* unused harmony export smooth */
/* unused harmony export smoothFrame */
/* unused harmony export snap */
/* unused harmony export spring */
/* unused harmony export steps */
/* unused harmony export toDecimal */
/* unused harmony export velocityPerFrame */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return velocityPerSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return wrap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(232);
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(231);
/* harmony import */ var style_value_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(308);
/* harmony import */ var framesync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(307);





var clamp = function clamp(min, max, v) {
  return Math.min(Math.max(v, min), max);
};

var safeMin = 0.001;
var minDuration = 0.01;
var maxDuration = 10.0;
var minDamping = 0.05;
var maxDamping = 1;

function findSpring(_a) {
  var _b = _a.duration,
      duration = _b === void 0 ? 800 : _b,
      _c = _a.bounce,
      bounce = _c === void 0 ? 0.25 : _c,
      _d = _a.velocity,
      velocity = _d === void 0 ? 0 : _d,
      _e = _a.mass,
      mass = _e === void 0 ? 1 : _e;
  var envelope;
  var derivative;
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* warning */ "b"])(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
  var dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1000);

  if (dampingRatio < 1) {
    envelope = function envelope(undampedFreq) {
      var exponentialDecay = undampedFreq * dampingRatio;
      var delta = exponentialDecay * duration;
      var a = exponentialDecay - velocity;
      var b = calcAngularFreq(undampedFreq, dampingRatio);
      var c = Math.exp(-delta);
      return safeMin - a / b * c;
    };

    derivative = function derivative(undampedFreq) {
      var exponentialDecay = undampedFreq * dampingRatio;
      var delta = exponentialDecay * duration;
      var d = delta * velocity + velocity;
      var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
      var f = Math.exp(-delta);
      var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
      var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = function envelope(undampedFreq) {
      var a = Math.exp(-undampedFreq * duration);
      var b = (undampedFreq - velocity) * duration + 1;
      return -safeMin + a * b;
    };

    derivative = function derivative(undampedFreq) {
      var a = Math.exp(-undampedFreq * duration);
      var b = (velocity - undampedFreq) * (duration * duration);
      return a * b;
    };
  }

  var initialGuess = 5 / duration;
  var undampedFreq = approximateRoot(envelope, derivative, initialGuess);

  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10
    };
  } else {
    var stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness: stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness)
    };
  }
}

var rootIterations = 12;

function approximateRoot(envelope, derivative, initialGuess) {
  var result = initialGuess;

  for (var i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }

  return result;
}

function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

function spring(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0.0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1.0 : _c,
      _d = _a.velocity,
      velocity = _d === void 0 ? 0.0 : _d,
      _e = _a.stiffness,
      stiffness = _e === void 0 ? 100 : _e,
      _f = _a.damping,
      damping = _f === void 0 ? 10 : _f,
      _g = _a.mass,
      mass = _g === void 0 ? 1.0 : _g,
      _h = _a.restSpeed,
      restSpeed = _h === void 0 ? 2 : _h,
      restDelta = _a.restDelta,
      duration = _a.duration,
      bounce = _a.bounce;
  var isResolvedFromDuration = false;
  var state = {
    done: false,
    value: from
  };

  if (duration !== undefined || bounce !== undefined) {
    isResolvedFromDuration = true;
    var derived = findSpring({
      duration: duration,
      bounce: bounce
    });
    stiffness = derived.stiffness;
    damping = derived.damping;
    velocity = 0.0;
    mass = 1.0;
  }

  var resolveSpring = zero;
  var resolveVelocity = zero;

  function createSpring() {
    var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
    var initialDelta = to - from;
    var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;

    if (dampingRatio < 1) {
      var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);

      resolveSpring = function resolveSpring(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
      };

      resolveVelocity = function resolveVelocity(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = function resolveSpring(t) {
        return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
      };
    } else {
      var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);

      resolveSpring = function resolveSpring(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
      };
    }
  }

  createSpring();
  return {
    next: function next(t) {
      var current = resolveSpring(t);

      if (!isResolvedFromDuration) {
        var currentVelocity = resolveVelocity(t) * 1000;
        var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }

      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: function flipTarget() {
      var _a;

      velocity = -velocity;
      _a = [to, from], from = _a[0], to = _a[1];
      createSpring();
    }
  };
}

spring.needsInterpolation = function (a, b) {
  return typeof a === "string" || typeof b === "string";
};

var zero = function zero(_t) {
  return 0;
};

var progress = function progress(from, to, value) {
  var toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

var mix = function mix(from, to, progress) {
  return -progress * from + progress * to + from;
};

var mixLinearColor = function mixLinearColor(from, to, v) {
  var fromExpo = from * from;
  var toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};

var colorTypes = [style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* hex */ "e"], style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* rgba */ "k"], style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* hsla */ "f"]];

var getColorType = function getColorType(v) {
  return colorTypes.find(function (type) {
    return type.test(v);
  });
};

var notAnimatable = function notAnimatable(color) {
  return "'" + color + "' is not an animatable color. Use the equivalent color code instead.";
};

var mixColor = function mixColor(from, to) {
  var fromColorType = getColorType(from);
  var toColorType = getColorType(to);
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(!!fromColorType, notAnimatable(from));
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(!!toColorType, notAnimatable(to));
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(fromColorType.transform === toColorType.transform, 'Both colors must be hex/RGBA, OR both must be HSLA.');
  var fromColor = fromColorType.parse(from);
  var toColor = toColorType.parse(to);

  var blended = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, fromColor);

  var mixFunc = fromColorType === style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* hsla */ "f"] ? mix : mixLinearColor;
  return function (v) {
    for (var key in blended) {
      if (key !== 'alpha') {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }

    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};

var zeroPoint = {
  x: 0,
  y: 0,
  z: 0
};

var isNum = function isNum(v) {
  return typeof v === 'number';
};

var combineFunctions = function combineFunctions(a, b) {
  return function (v) {
    return b(a(v));
  };
};

var pipe = function pipe() {
  var transformers = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    transformers[_i] = arguments[_i];
  }

  return transformers.reduce(combineFunctions);
};

function getMixer(origin, target) {
  if (isNum(origin)) {
    return function (v) {
      return mix(origin, target, v);
    };
  } else if (style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* color */ "b"].test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}

var mixArray = function mixArray(from, to) {
  var output = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spreadArrays */ "f"])(from);

  var numValues = output.length;
  var blendValue = from.map(function (fromThis, i) {
    return getMixer(fromThis, to[i]);
  });
  return function (v) {
    for (var i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }

    return output;
  };
};

var mixObject = function mixObject(origin, target) {
  var output = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, origin), target);

  var blendValue = {};

  for (var key in output) {
    if (origin[key] !== undefined && target[key] !== undefined) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }

  return function (v) {
    for (var key in blendValue) {
      output[key] = blendValue[key](v);
    }

    return output;
  };
};

function analyse(value) {
  var parsed = style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* complex */ "c"].parse(value);
  var numValues = parsed.length;
  var numNumbers = 0;
  var numRGB = 0;
  var numHSL = 0;

  for (var i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === 'number') {
      numNumbers++;
    } else {
      if (parsed[i].hue !== undefined) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }

  return {
    parsed: parsed,
    numNumbers: numNumbers,
    numRGB: numRGB,
    numHSL: numHSL
  };
}

var mixComplex = function mixComplex(origin, target) {
  var template = style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* complex */ "c"].createTransformer(target);
  var originStats = analyse(origin);
  var targetStats = analyse(target);
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
  return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

var mixNumber = function mixNumber(from, to) {
  return function (p) {
    return mix(from, to, p);
  };
};

function detectMixerFactory(v) {
  if (typeof v === 'number') {
    return mixNumber;
  } else if (typeof v === 'string') {
    if (style_value_types__WEBPACK_IMPORTED_MODULE_2__[/* color */ "b"].test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === 'object') {
    return mixObject;
  }
}

function createMixers(output, ease, customMixer) {
  var mixers = [];
  var mixerFactory = customMixer || detectMixerFactory(output[0]);
  var numMixers = output.length - 1;

  for (var i = 0; i < numMixers; i++) {
    var mixer = mixerFactory(output[i], output[i + 1]);

    if (ease) {
      var easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }

    mixers.push(mixer);
  }

  return mixers;
}

function fastInterpolate(_a, _b) {
  var from = _a[0],
      to = _a[1];
  var mixer = _b[0];
  return function (v) {
    return mixer(progress(from, to, v));
  };
}

function slowInterpolate(input, mixers) {
  var inputLength = input.length;
  var lastInputIndex = inputLength - 1;
  return function (v) {
    var mixerIndex = 0;
    var foundMixerIndex = false;

    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }

    if (!foundMixerIndex) {
      var i = 1;

      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }

      mixerIndex = i - 1;
    }

    var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}

function interpolate(input, output, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.clamp,
      isClamp = _c === void 0 ? true : _c,
      ease = _b.ease,
      mixer = _b.mixer;

  var inputLength = input.length;
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(inputLength === output.length, 'Both input and output ranges must be the same length');
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__[/* invariant */ "a"])(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');

  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }

  var mixers = createMixers(output, ease, mixer);
  var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? function (v) {
    return interpolator(clamp(input[0], input[inputLength - 1], v));
  } : interpolator;
}

var reverseEasing = function reverseEasing(easing) {
  return function (p) {
    return 1 - easing(1 - p);
  };
};

var mirrorEasing = function mirrorEasing(easing) {
  return function (p) {
    return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
  };
};

var createExpoIn = function createExpoIn(power) {
  return function (p) {
    return Math.pow(p, power);
  };
};

var createBackIn = function createBackIn(power) {
  return function (p) {
    return p * p * ((power + 1) * p - power);
  };
};

var createAnticipate = function createAnticipate(power) {
  var backEasing = createBackIn(power);
  return function (p) {
    return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  };
};

var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;

var linear = function linear(p) {
  return p;
};

var easeIn = /*#__PURE__*/createExpoIn(2);
var easeOut = /*#__PURE__*/reverseEasing(easeIn);
var easeInOut = /*#__PURE__*/mirrorEasing(easeIn);

var circIn = function circIn(p) {
  return 1 - Math.sin(Math.acos(p));
};

var circOut = /*#__PURE__*/reverseEasing(circIn);
var circInOut = /*#__PURE__*/mirrorEasing(circOut);
var backIn = /*#__PURE__*/createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = /*#__PURE__*/reverseEasing(backIn);
var backInOut = /*#__PURE__*/mirrorEasing(backIn);
var anticipate = /*#__PURE__*/createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356.0 / 361.0;
var cb = 35442.0 / 1805.0;
var cc = 16061.0 / 1805.0;

var bounceOut = function bounceOut(p) {
  if (p === 1 || p === 0) return p;
  var p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};

var bounceIn = /*#__PURE__*/reverseEasing(bounceOut);

var bounceInOut = function bounceInOut(p) {
  return p < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0)) : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
};

function defaultEasing(values, easing) {
  return values.map(function () {
    return easing || easeInOut;
  }).splice(0, values.length - 1);
}

function defaultOffset(values) {
  var numValues = values.length;
  return values.map(function (_value, i) {
    return i !== 0 ? i / (numValues - 1) : 0;
  });
}

function convertOffsetToTimes(offset, duration) {
  return offset.map(function (o) {
    return o * duration;
  });
}

function keyframes(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c,
      ease = _a.ease,
      offset = _a.offset,
      _d = _a.duration,
      duration = _d === void 0 ? 300 : _d;
  var state = {
    done: false,
    value: from
  };
  var values = Array.isArray(to) ? to : [from, to];
  var times = convertOffsetToTimes(offset !== null && offset !== void 0 ? offset : defaultOffset(values), duration);

  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }

  var interpolator = createInterpolator();
  return {
    next: function next(t) {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: function flipTarget() {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}

function decay(_a) {
  var _b = _a.velocity,
      velocity = _b === void 0 ? 0 : _b,
      _c = _a.from,
      from = _c === void 0 ? 0 : _c,
      _d = _a.power,
      power = _d === void 0 ? 0.8 : _d,
      _e = _a.timeConstant,
      timeConstant = _e === void 0 ? 350 : _e,
      _f = _a.restDelta,
      restDelta = _f === void 0 ? 0.5 : _f,
      modifyTarget = _a.modifyTarget;
  var state = {
    done: false,
    value: from
  };
  var amplitude = power * velocity;
  var ideal = from + amplitude;
  var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
  if (target !== ideal) amplitude = target - from;
  return {
    next: function next(t) {
      var delta = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: function flipTarget() {}
  };
}

var types = {
  keyframes: keyframes,
  spring: spring,
  decay: decay
};

function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }

  var keys = new Set(Object.keys(config));

  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }

  return keyframes;
}

function loopElapsed(elapsed, duration, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return elapsed - duration - delay;
}

function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
  if (delay === void 0) {
    delay = 0;
  }

  if (isForwardPlayback === void 0) {
    isForwardPlayback = true;
  }

  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}

function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

var framesync = function framesync(update) {
  var passTimestamp = function passTimestamp(_a) {
    var delta = _a.delta;
    return update(delta);
  };

  return {
    start: function start() {
      return framesync__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].update(passTimestamp, true, true);
    },
    stop: function stop() {
      return framesync__WEBPACK_IMPORTED_MODULE_3__[/* cancelSync */ "a"].update(passTimestamp);
    }
  };
};

function animate(_a) {
  var _b, _c;

  var from = _a.from,
      _d = _a.autoplay,
      autoplay = _d === void 0 ? true : _d,
      _e = _a.driver,
      driver = _e === void 0 ? framesync : _e,
      _f = _a.elapsed,
      elapsed = _f === void 0 ? 0 : _f,
      _g = _a.repeat,
      repeatMax = _g === void 0 ? 0 : _g,
      _h = _a.repeatType,
      repeatType = _h === void 0 ? "loop" : _h,
      _j = _a.repeatDelay,
      repeatDelay = _j === void 0 ? 0 : _j,
      onPlay = _a.onPlay,
      onStop = _a.onStop,
      onComplete = _a.onComplete,
      onRepeat = _a.onRepeat,
      onUpdate = _a.onUpdate,
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);

  var to = options.to;
  var driverControls;
  var repeatCount = 0;
  var computedDuration = options.duration;
  var latest;
  var isComplete = false;
  var isForwardPlayback = true;
  var interpolateFromNumber;
  var animator = detectAnimationFromOptions(options);

  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }

  var animation = animator(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, options), {
    from: from,
    to: to
  }));

  function repeat() {
    repeatCount++;

    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror") animation.flipTarget();
    }

    isComplete = false;
    onRepeat && onRepeat();
  }

  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }

  function update(delta) {
    if (!isForwardPlayback) delta = -delta;
    elapsed += delta;

    if (!isComplete) {
      var state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber) latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }

    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);

    if (isComplete) {
      if (repeatCount === 0) computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;

      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }

  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }

  autoplay && play();
  return {
    stop: function stop() {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0;
}

function inertia(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.velocity,
      velocity = _c === void 0 ? 0 : _c,
      min = _a.min,
      max = _a.max,
      _d = _a.power,
      power = _d === void 0 ? 0.8 : _d,
      _e = _a.timeConstant,
      timeConstant = _e === void 0 ? 750 : _e,
      _f = _a.bounceStiffness,
      bounceStiffness = _f === void 0 ? 500 : _f,
      _g = _a.bounceDamping,
      bounceDamping = _g === void 0 ? 10 : _g,
      _h = _a.restDelta,
      restDelta = _h === void 0 ? 1 : _h,
      modifyTarget = _a.modifyTarget,
      driver = _a.driver,
      _onUpdate = _a.onUpdate,
      onComplete = _a.onComplete;
  var currentAnimation;

  function isOutOfBounds(v) {
    return min !== undefined && v < min || max !== undefined && v > max;
  }

  function boundaryNearest(v) {
    if (min === undefined) return max;
    if (max === undefined) return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }

  function startAnimation(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, options), {
      driver: driver,
      onUpdate: function onUpdate(v) {
        var _a;

        _onUpdate === null || _onUpdate === void 0 ? void 0 : _onUpdate(v);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
      },
      onComplete: onComplete
    }));
  }

  function startSpring(options) {
    startAnimation(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
      type: "spring",
      stiffness: bounceStiffness,
      damping: bounceDamping,
      restDelta: restDelta
    }, options));
  }

  if (isOutOfBounds(from)) {
    startSpring({
      from: from,
      velocity: velocity,
      to: boundaryNearest(from)
    });
  } else {
    var target = power * velocity + from;
    if (typeof modifyTarget !== "undefined") target = modifyTarget(target);
    var boundary_1 = boundaryNearest(target);
    var heading_1 = boundary_1 === min ? -1 : 1;
    var prev_1;
    var current_1;

    var checkBoundary = function checkBoundary(v) {
      prev_1 = current_1;
      current_1 = v;
      velocity = velocityPerSecond(v - prev_1, Object(framesync__WEBPACK_IMPORTED_MODULE_3__[/* getFrameData */ "c"])().delta);

      if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) {
        startSpring({
          from: v,
          to: boundary_1,
          velocity: velocity
        });
      }
    };

    startAnimation({
      type: "decay",
      from: from,
      velocity: velocity,
      timeConstant: timeConstant,
      power: power,
      restDelta: restDelta,
      modifyTarget: modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : undefined
    });
  }

  return {
    stop: function stop() {
      return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    }
  };
}

var radiansToDegrees = function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
};

var angle = function angle(a, b) {
  if (b === void 0) {
    b = zeroPoint;
  }

  return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
};

var applyOffset = function applyOffset(from, to) {
  var hasReceivedFrom = true;

  if (to === undefined) {
    to = from;
    hasReceivedFrom = false;
  }

  return function (v) {
    if (hasReceivedFrom) {
      return v - from + to;
    } else {
      from = v;
      hasReceivedFrom = true;
      return to;
    }
  };
};

var identity = function identity(v) {
  return v;
};

var createAttractor = function createAttractor(alterDisplacement) {
  if (alterDisplacement === void 0) {
    alterDisplacement = identity;
  }

  return function (constant, origin, v) {
    var displacement = origin - v;
    var springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
    return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
  };
};

var attract = /*#__PURE__*/createAttractor();
var attractExpo = /*#__PURE__*/createAttractor(Math.sqrt);

var degreesToRadians = function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

var isPoint = function isPoint(point) {
  return point.hasOwnProperty('x') && point.hasOwnProperty('y');
};

var isPoint3D = function isPoint3D(point) {
  return isPoint(point) && point.hasOwnProperty('z');
};

var distance1D = function distance1D(a, b) {
  return Math.abs(a - b);
};

function distance(a, b) {
  if (isNum(a) && isNum(b)) {
    return distance1D(a, b);
  } else if (isPoint(a) && isPoint(b)) {
    var xDelta = distance1D(a.x, b.x);
    var yDelta = distance1D(a.y, b.y);
    var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

var pointFromVector = function pointFromVector(origin, angle, distance) {
  angle = degreesToRadians(angle);
  return {
    x: distance * Math.cos(angle) + origin.x,
    y: distance * Math.sin(angle) + origin.y
  };
};

var toDecimal = function toDecimal(num, precision) {
  if (precision === void 0) {
    precision = 2;
  }

  precision = Math.pow(10, precision);
  return Math.round(num * precision) / precision;
};

var smoothFrame = function smoothFrame(prevValue, nextValue, duration, smoothing) {
  if (smoothing === void 0) {
    smoothing = 0;
  }

  return toDecimal(prevValue + duration * (nextValue - prevValue) / Math.max(smoothing, duration));
};

var smooth = function smooth(strength) {
  if (strength === void 0) {
    strength = 50;
  }

  var previousValue = 0;
  var lastUpdated = 0;
  return function (v) {
    var currentFramestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_3__[/* getFrameData */ "c"])().timestamp;
    var timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
    var newValue = timeDelta ? smoothFrame(previousValue, v, timeDelta, strength) : previousValue;
    lastUpdated = currentFramestamp;
    previousValue = newValue;
    return newValue;
  };
};

var snap = function snap(points) {
  if (typeof points === 'number') {
    return function (v) {
      return Math.round(v / points) * points;
    };
  } else {
    var i_1 = 0;
    var numPoints_1 = points.length;
    return function (v) {
      var lastDistance = Math.abs(points[0] - v);

      for (i_1 = 1; i_1 < numPoints_1; i_1++) {
        var point = points[i_1];
        var distance = Math.abs(point - v);
        if (distance === 0) return point;
        if (distance > lastDistance) return points[i_1 - 1];
        if (i_1 === numPoints_1 - 1) return point;
        lastDistance = distance;
      }
    };
  }
};

function velocityPerFrame(xps, frameDuration) {
  return xps / (1000 / frameDuration);
}

var wrap = function wrap(min, max, v) {
  var rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

var a = function a(a1, a2) {
  return 1.0 - 3.0 * a2 + 3.0 * a1;
};

var b = function b(a1, a2) {
  return 3.0 * a2 - 6.0 * a1;
};

var c = function c(a1) {
  return 3.0 * a1;
};

var calcBezier = function calcBezier(t, a1, a2) {
  return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};

var getSlope = function getSlope(t, a1, a2) {
  return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
};

var subdivisionPrecision = 0.0000001;
var subdivisionMaxIterations = 10;

function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX;
  var currentT;
  var i = 0;

  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;

    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);

  return currentT;
}

var newtonIterations = 8;
var newtonMinSlope = 0.001;

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < newtonIterations; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);

    if (currentSlope === 0.0) {
      return aGuessT;
    }

    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }

  return aGuessT;
}

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2) return linear;
  var sampleValues = new Float32Array(kSplineTableSize);

  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX(aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    --currentSample;
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);

    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function (t) {
    return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
  };
}

var steps = function steps(_steps, direction) {
  if (direction === void 0) {
    direction = 'end';
  }

  return function (progress) {
    progress = direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
    var expanded = progress * _steps;
    var rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp(0, 1, rounded / _steps);
  };
};



/***/ })

}]);
//# sourceMappingURL=74879b9783e7548542b5a4a22ab1834ee5963cd5-2e9a98c6a288a477f9b1.js.map