(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[13],{

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaContainer", function() { return ShaContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_ScopedCssBaseline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1109);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(116);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(278);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1129);











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

/***/ })

}]);
//# sourceMappingURL=component---src-pages-fun-tsx-252f32885a0ff60d1b2c.js.map