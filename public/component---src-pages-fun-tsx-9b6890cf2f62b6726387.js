(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[11],{

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaContainer", function() { return ShaContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(840);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(22);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(85);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(842);











 // import { CounterTS } from "../components/Counter";




var Styled = styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].div.withConfig({
  displayName: "fun__Styled",
  componentId: "sc-51m0yl-0"
})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]);
var DivContainer = styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].div.withConfig({
  displayName: "fun__DivContainer",
  componentId: "sc-51m0yl-1"
})(["display:block;width:150px;height:150px;overflow:hidden;"]);
var StyledTextArea = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]).withConfig({
  displayName: "fun__StyledTextArea",
  componentId: "sc-51m0yl-2"
})(["width:100%;max-height:100%;"]);

var Sha256Writer = function Sha256Writer(_ref) {
  var onNew = _ref.onNew,
      prevText = _ref.prevText;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_5___default.a.useState({
    text: prevText
  }),
      text = _React$useState[0].text,
      changeText = _React$useState[1];

  react__WEBPACK_IMPORTED_MODULE_5___default.a.useEffect(function () {
    changeText({
      text: prevText
    });
  }, [prevText]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])(DivContainer, {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("p", {
      children: "Start to type"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(StyledTextArea, {
      rowsMin: 3,
      rowsMax: 3,
      onChange: /*#__PURE__*/function () {
        var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(e) {
          var textContent, sha256Hash;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  textContent = e.target.value;
                  _context.next = 3;
                  return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* hash */ "a"])(textContent);

                case 3:
                  sha256Hash = _context.sent;
                  onNew(sha256Hash);
                  changeText({
                    text: textContent
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
    })]
  });
};

var _StyledDiv = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"])("div").withConfig({
  displayName: "fun___StyledDiv",
  componentId: "sc-51m0yl-3"
})(["font-size:small;display:inline-block;width:10px;height:10px;border-radius:5px;background:white;padding:5px;top:", "%;left:", "%;position:absolute"], function (p) {
  return p._css;
}, function (p) {
  return p._css2;
});

var ShaContainer = function ShaContainer() {
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_10__[/* useMotionValue */ "b"])(0);

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_5___default.a.useState([]),
      hashList = _React$useState2[0],
      changeBoxes = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_5___default.a.useState({
    locX: 40,
    locY: 40,
    activeText: ""
  }),
      _React$useState3$ = _React$useState3[0],
      locX = _React$useState3$.locX,
      locY = _React$useState3$.locY,
      activeText = _React$useState3$.activeText,
      setCords = _React$useState3[1];

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
    children: [hashList.map(function (hash) {
      var _hashToCoordinates = hashToCoordinates(hash),
          locationX = _hashToCoordinates.locationX,
          locationY = _hashToCoordinates.locationY;

      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(_StyledDiv, {
        onMouseEnter: /*#__PURE__*/Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
          var text, _hashToCoordinates2, locationX, locationY;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* unHash */ "b"])(hash);

                case 2:
                  text = _context2.sent;
                  _hashToCoordinates2 = hashToCoordinates(hash), locationX = _hashToCoordinates2.locationX, locationY = _hashToCoordinates2.locationY;
                  setCords({
                    locX: locationX,
                    locY: locationY,
                    activeText: text
                  });

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })),
        _css: locationY,
        _css2: locationX
      }, hash);
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(framer_motion__WEBPACK_IMPORTED_MODULE_10__[/* motion */ "a"].div, {
      animate: {
        x: locX * window.innerWidth / 105 - 100,
        y: locY * window.innerHeight / 105 - 50,
        scale: 1,
        rotate: 0
      },
      style: {
        position: "absolute",
        x: x
      },
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Styled, {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(_material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Sha256Writer, {
            prevText: activeText,
            onNew: function onNew(hash) {
              var _hashToCoordinates3 = hashToCoordinates(hash),
                  locationY = _hashToCoordinates3.locationY,
                  locationX = _hashToCoordinates3.locationX;

              setCords({
                locX: locationX,
                locY: locationY,
                activeText: activeText
              });
              if (hashList.includes(hash)) return;
              changeBoxes([].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(hashList), [hash]));
            }
          })
        })
      })
    })]
  });
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].div.withConfig({
  displayName: "fun__Container",
  componentId: "sc-51m0yl-4"
})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:relative;background:rgba(0,85,255,1);perspective:1000px;"]);
function Page() {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(react_helmet__WEBPACK_IMPORTED_MODULE_9__[/* Helmet */ "a"], {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("style", {
        type: "text/css",
        children: "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Container, {
      children: typeof window !== "undefined" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(ShaContainer, {}) : "Loading"
    })]
  });
}

function hashToCoordinates(hash) {
  var length = hash.length;
  var size = 100 / Math.pow(4, length);
  var locationX = 0;
  var locationY = 0;

  for (var i = 1; i <= hash.length; i++) {
    var decNumber = parseInt(hash.substr(i - 1, 1), 16);
    var multiplier = 100 / Math.pow(4, i);
    locationY += decNumber % 4 * multiplier; // decNumber -= decNumber%4;

    locationX += Math.floor(decNumber / 4) * multiplier;
  }

  return {
    size: size,
    locationX: locationX,
    locationY: locationY
  };
}

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(8);

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
var useForkRef = __webpack_require__(107);

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
//# sourceMappingURL=component---src-pages-fun-tsx-9b6890cf2f62b6726387.js.map