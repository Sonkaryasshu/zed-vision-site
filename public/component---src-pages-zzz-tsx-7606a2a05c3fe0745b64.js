(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[15],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: styles

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 2 modules
var withStyles = __webpack_require__(9);

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

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyComponent", function() { return MyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(121);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(36);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(681);










 // import { CounterTS } from "../components/Counter";




var Styled = styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].div.withConfig({
  displayName: "zzz__Styled",
  componentId: "sc-11tle59-0"
})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]);
var DivContainer = styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].div.withConfig({
  displayName: "zzz__DivContainer",
  componentId: "sc-11tle59-1"
})(["display:block;width:150px;height:150px;overflow:hidden;"]);
var StyledTextArea = Object(styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]).withConfig({
  displayName: "zzz__StyledTextArea",
  componentId: "sc-11tle59-2"
})(["width:100%;max-height:100%;"]);

var Sha256Writer = function Sha256Writer(_ref) {
  var onNew = _ref.onNew;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState({
    text: "",
    sha256Hash: ""
  }),
      _React$useState$ = _React$useState[0],
      text = _React$useState$.text,
      sha256Hash = _React$useState$.sha256Hash,
      changeText = _React$useState[1];

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxs"])(DivContainer, {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("p", {
      children: "Start to type"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(StyledTextArea, {
      rowsMin: 3,
      rowsMax: 3,
      onChange: /*#__PURE__*/function () {
        var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
          var textContent, sha256Hash;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  textContent = e.target.value;
                  _context.next = 3;
                  return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(textContent);

                case 3:
                  sha256Hash = _context.sent;
                  onNew(sha256Hash);
                  changeText({
                    text: textContent,
                    sha256Hash: sha256Hash
                  });

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }(),
      value: text
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("pre", {
      children: sha256Hash
    })]
  });
};

var _StyledMotionDiv = Object(styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"])(framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* motion */ "a"].div).withConfig({
  displayName: "zzz___StyledMotionDiv",
  componentId: "sc-11tle59-3"
})(["position:relative;height:", "px;width:", "px;"], function (p) {
  return p._css;
}, function (p) {
  return p._css2;
});

var MyComponent = function MyComponent(_ref3) {
  var _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? 400 : _ref3$height,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? 400 : _ref3$width,
      adjust = _ref3.adjust;
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* useMotionValue */ "b"])(0);
  var background = Object(framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* useTransform */ "c"])(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(_StyledMotionDiv, {
      layout: true,
      style: {
        background: background
      },
      _css: height,
      _css2: width
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* motion */ "a"].div, {
      // layout
      drag: true,
      dragElastic: 0.5 // dragListener={true}
      // onDrag={
      // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
      // }
      ,
      dragConstraints: {
        top: 0,
        bottom: height - 100,
        left: 0,
        right: width - 100
      },
      style: {
        position: "absolute",
        x: x
      },
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Styled, {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(_material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Sha256Writer, {
            onNew: function onNew(hash) {
              return console.log(hash);
            }
          })
        })
      })
    })]
  });
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].div.withConfig({
  displayName: "zzz__Container",
  componentId: "sc-11tle59-4"
})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:flex;place-content:center;place-items:center;background:rgba(0,85,255,1);perspective:1000px;"]);
function Page() {
  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState({
    height: 600,
    width: 400
  }),
      _React$useState2$ = _React$useState2[0],
      width = _React$useState2$.width,
      height = _React$useState2$.height,
      changeSize = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_4___default.a.useEffect(function () {
    setInterval(function () {
      var x = Math.random() * 200 - 100;
      var total = 600 * 400;
      var newWith = Math.floor(width - x);
      var newHeight = Math.floor(total / newWith);
      changeSize({
        height: newHeight,
        width: newWith
      });
    }, 1000);
  }, []);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(react_helmet__WEBPACK_IMPORTED_MODULE_8__[/* Helmet */ "a"], {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("style", {
        type: "text/css",
        children: "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Container, {
      children: typeof window !== "undefined" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(MyComponent, {
        height: height,
        width: width,
        adjust: function adjust(x, y) {
          var total = width * height;
          var newWith = width - x;
          var newHeight = total / newWith;
          changeSize({
            height: newHeight,
            width: newWith
          });
        }
      }) : "Loading"
    })]
  });
}

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);

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
var useForkRef = __webpack_require__(68);

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

/***/ })

}]);
//# sourceMappingURL=component---src-pages-zzz-tsx-7606a2a05c3fe0745b64.js.map