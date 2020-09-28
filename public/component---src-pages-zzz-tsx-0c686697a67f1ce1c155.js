(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[20],{

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyComponent", function() { return MyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(144);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(303);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1189);







 // import { CounterTS } from "../components/Counter";




var Styled = styled_components__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"].div.withConfig({
  displayName: "zzz__Styled",
  componentId: "sc-11tle59-0"
})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]);
var DivContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"].div.withConfig({
  displayName: "zzz__DivContainer",
  componentId: "sc-11tle59-1"
})(["display:block;width:150px;height:150px;overflow:hidden;"]);
var StyledTextArea = Object(styled_components__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]).withConfig({
  displayName: "zzz__StyledTextArea",
  componentId: "sc-11tle59-2"
})(["width:100%;max-height:100%;"]);

var Sha256Writer = function Sha256Writer(_ref) {
  var onNew = _ref.onNew;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState({
    text: "",
    sha256Hash: ""
  }),
      _React$useState$ = _React$useState[0],
      text = _React$useState$.text,
      sha256Hash = _React$useState$.sha256Hash,
      changeText = _React$useState[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(DivContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Start to type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StyledTextArea, {
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
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_6__[/* hash */ "a"])(textContent);

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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("pre", null, sha256Hash));
};

var _StyledMotionDiv = Object(styled_components__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"])(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* motion */ "a"].div).withConfig({
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
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* useMotionValue */ "b"])(0);
  var background = Object(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* useTransform */ "c"])(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_StyledMotionDiv, {
    layout: true,
    style: {
      background: background
    },
    _css: height,
    _css2: width
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* motion */ "a"].div, {
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
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Styled, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Sha256Writer, {
    onNew: function onNew(hash) {
      return console.log(hash);
    }
  })))));
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"].div.withConfig({
  displayName: "zzz__Container",
  componentId: "sc-11tle59-4"
})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:flex;place-content:center;place-items:center;background:rgba(0,85,255,1);perspective:1000px;"]);
function Page() {
  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState({
    height: 600,
    width: 400
  }),
      _React$useState2$ = _React$useState2[0],
      width = _React$useState2$.width,
      height = _React$useState2$.height,
      changeSize = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_3___default.a.useEffect(function () {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_7__[/* Helmet */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("style", {
    type: "text/css"
  }, "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, null, typeof window !== "undefined" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(MyComponent, {
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
  }) : "Loading"));
}

/***/ })

}]);
//# sourceMappingURL=component---src-pages-zzz-tsx-0c686697a67f1ce1c155.js.map