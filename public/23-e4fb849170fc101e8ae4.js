(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[23],{

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(27);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(31);

// CONCATENATED MODULE: ./node_modules/react-cdn-monaco-editor/lib/editor.js




var editor_MonacoEditor = function MonacoEditor(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? "600px" : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? "400px" : _ref$height,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? "" : _ref$value,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? "typescript" : _ref$language,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function (_code) {} : _ref$onChange;
  react_default.a.useEffect(function () {
    if (typeof window === "undefined") return;

    var init = /*#__PURE__*/function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var monaco;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return startMonaco({
                  element: "container",
                  value: value,
                  language: language,
                  onChange: onChange
                });

              case 2:
                monaco = _context.sent;
                console.log(monaco);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function init() {
        return _ref2.apply(this, arguments);
      };
    }();

    init();
  });
  return react_default.a.createElement("div", {
    id: "container",
    style: {
      width: width,
      height: height
    }
  });
};

var startMonaco = function startMonaco(_ref3) {
  var _ref3$version = _ref3.version,
      version = _ref3$version === void 0 ? "0.21.2" : _ref3$version,
      _ref3$element = _ref3.element,
      element = _ref3$element === void 0 ? "container" : _ref3$element,
      _ref3$value = _ref3.value,
      value = _ref3$value === void 0 ? "" : _ref3$value,
      _ref3$language = _ref3.language,
      language = _ref3$language === void 0 ? "typescript" : _ref3$language,
      _ref3$onChange = _ref3.onChange,
      onChange = _ref3$onChange === void 0 ? function (_code) {} : _ref3$onChange;
  return new Function("version", "element", "value", "language", "onChange", "\nconst startMonaco = async ({version, element, value, language, onChange}) => {\n  const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/".concat(version, "/min/vs';\n  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/").concat(version, "/min/vs/loader.min.js');\n\n  require.config({ paths: { 'vs': vsPath } });\n  \n  require([\"vs/editor/editor.main\"], function () {\n    const editor = monaco.editor.create(document.getElementById(\"container\"), {\n      value: `").concat(value, "`,\n      language: `").concat(language, "`,\n      theme: 'vs-dark'\n    });\n\n    editor.onDidChangeModelContent((event)=>(").concat(onChange, ")(editor.getValue()))\n  });\n}\n\nreturn startMonaco({version, element, value, language, onChange})\nfunction loadScript(src) {\n  return new Promise(function (resolve, reject) {\n    var s;\n    s = document.createElement('script');\n    s.src = src;\n    s.onload = resolve;\n    s.onerror = reject;\n    document.head.appendChild(s);\n  });\n}\n"))({
    version: version,
    element: element,
    value: value,
    language: language,
    onChange: onChange
  });
};
// CONCATENATED MODULE: ./node_modules/react-cdn-monaco-editor/lib/index.js

// CONCATENATED MODULE: ./src/components/monacoEditor.tsx




var monacoEditor_MonacoEditorComp = function MonacoEditorComp(_ref) {
  var value = _ref.value,
      changeCode = _ref.changeCode;
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(editor_MonacoEditor, {
    width: "100%",
    height: "100vh",
    language: "typescript",
    value: value,
    onChange: function onChange(e) {
      return changeCode(e);
    }
  });
};

/* harmony default export */ var monacoEditor = __webpack_exports__["default"] = (monacoEditor_MonacoEditorComp);

/***/ })

}]);
//# sourceMappingURL=23-e4fb849170fc101e8ae4.js.map