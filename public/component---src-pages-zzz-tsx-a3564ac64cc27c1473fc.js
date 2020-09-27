(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[16],{

/***/ 1152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(11);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(46);

// CONCATENATED MODULE: ./src/components/Counter.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var actions = {
  "+1": function _(s) {
    return _objectSpread(_objectSpread({}, s), {}, {
      counter: s.counter + 1
    });
  },
  "-1": function _(s) {
    return _objectSpread(_objectSpread({}, s), {}, {
      counter: s.counter - 1
    });
  }
};

var Counter_Component = function Component(_ref) {
  var startState = _ref.startState,
      pastEvents = _ref.pastEvents,
      onEvent = _ref.onEvent;

  var _React$useState = react_default.a.useState({
    startState: startState,
    pastEvents: pastEvents
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var calculatedState = state.pastEvents.reduce(function (prevValue, currentValue) {
    return actions[currentValue](prevValue);
  }, startState);
  return /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("button", update("-1"), "-"), calculatedState.counter, /*#__PURE__*/react_default.a.createElement("button", update("+1"), "+"));

  function update(action) {
    return {
      "data-onclick": String(action),
      onClick: function onClick(e) {
        e.stopPropagation();
        onEvent(action);
        setState(_objectSpread(_objectSpread({}, state), {}, {
          pastEvents: [].concat(Object(toConsumableArray["a" /* default */])(state.pastEvents), [action])
        }));
      }
    };
  }
};

var CounterTS = Counter_Component;
// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(77);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(102);

// CONCATENATED MODULE: ./src/pages/zzz.tsx





var zzz_ZPage = function ZPage() {
  return /*#__PURE__*/react_default.a.createElement(layout["a" /* Layout */], null, /*#__PURE__*/react_default.a.createElement(seo["a" /* SEO */], {
    title: "404: Not Found"
  }), /*#__PURE__*/react_default.a.createElement("h1", null, "lll"), /*#__PURE__*/react_default.a.createElement(CounterTS, {
    startState: {
      counter: 0
    },
    pastEvents: [],
    onEvent: function onEvent(action) {
      return console.log(action);
    }
  }));
};

/* harmony default export */ var zzz = __webpack_exports__["default"] = (zzz_ZPage);

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
//# sourceMappingURL=component---src-pages-zzz-tsx-a3564ac64cc27c1473fc.js.map