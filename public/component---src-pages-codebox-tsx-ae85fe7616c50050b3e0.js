(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[9],{

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);





var StyledContent = styled_components__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].main.withConfig({
  displayName: "layout__StyledContent",
  componentId: "sc-1juqdk6-0"
})(["max-width:1140px;margin:auto;"]);
var Layout = function Layout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_helmet__WEBPACK_IMPORTED_MODULE_2__[/* Helmet */ "a"], {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(StyledContent, {
      children: children
    })]
  });
};

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SEO; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);




/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

var SEO = function SEO(_ref) {
  var _ref$description = _ref.description,
      description = _ref$description === void 0 ? "" : _ref$description,
      _ref$lang = _ref.lang,
      lang = _ref$lang === void 0 ? "en" : _ref$lang,
      _ref$meta = _ref.meta,
      meta = _ref$meta === void 0 ? [] : _ref$meta,
      title = _ref.title;

  var _useStaticQuery = Object(gatsby__WEBPACK_IMPORTED_MODULE_2__["useStaticQuery"])("2841359383"),
      site = _useStaticQuery.site;

  var metaDescription = description || site.siteMetadata.description;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_helmet__WEBPACK_IMPORTED_MODULE_3__[/* Helmet */ "a"], {
    htmlAttributes: {
      lang: lang
    },
    title: title,
    titleTemplate: "%s | " + site.siteMetadata.title,
    meta: [{
      name: "description",
      content: metaDescription
    }, {
      property: "og:title",
      content: title
    }, {
      property: "og:description",
      content: metaDescription
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "twitter:creator",
      content: site.siteMetadata.social.twitter
    }, {
      name: "twitter:title",
      content: title
    }, {
      name: "twitter:description",
      content: metaDescription
    }].concat(meta)
  });
};

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transform; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);




var cache = {};
var worker = typeof window !== "undefined" ? new Worker(URL.createObjectURL(new window.Blob(["\nimportScripts('https://unpkg.com/@babel/standalone@7.11.6/babel.min.js');\n\nself.onmessage=(message)=>{\n  const translatedMessage = Babel.transform(message.data.code, {\nplugins: [],\npresets: [\"react\", [\"typescript\", { isTSX: true, allExtensions: true }]],\n}).code.replace(\"export const\", \"const\").replace(\"import \", \"//import\");\n    postMessage({hash: message.data.hash, translatedCode: translatedMessage})\n}\n"], {
  type: "application/javascript"
}))) : {
  onmessage: function onmessage() {},
  postMessage: function postMessage() {}
};

worker.onmessage = /*#__PURE__*/function () {
  var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(message) {
    var codeHash, transformedCodeHash;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            codeHash = message.data.hash;

            if (!(typeof cache[codeHash] === "string")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            if (!(typeof cache[codeHash] === "object")) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_3__[/* hash */ "a"])(message.data.translatedCode);

          case 6:
            transformedCodeHash = _context.sent;
            cache[codeHash].resolve(transformedCodeHash);
            cache[codeHash] = transformedCodeHash;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var transform = /*#__PURE__*/function () {
  var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(codeHash) {
    var code, returnPromise;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_3__[/* unHash */ "b"])(codeHash);

          case 2:
            code = _context2.sent;

            if (!(typeof cache[codeHash] === "string")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", cache[codeHash]);

          case 5:
            if (!(typeof cache[codeHash] === "undefined")) {
              _context2.next = 9;
              break;
            }

            worker.postMessage({
              hash: codeHash,
              code: code
            });
            returnPromise = new Promise(function (resolve, reject) {
              cache[codeHash] = {
                resolve: resolve,
                reject: reject,
                promise: returnPromise
              };
            });
            return _context2.abrupt("return", returnPromise);

          case 9:
            return _context2.abrupt("return", cache[codeHash].promise);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function transform(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);






var _ref = typeof window !== "undefined" && _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__(),
    renderWorker = _ref.renderWorker;

var render = /*#__PURE__*/function () {
  var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(transformedCodeHash, defaultPropsHash) {
    var code, defaultProps, renderedString, renderedStringHash;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* unHash */ "b"])(transformedCodeHash);

          case 3:
            code = _context.sent;
            _context.next = 6;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* unHash */ "b"])(defaultPropsHash);

          case 6:
            defaultProps = _context.sent;
            _context.next = 9;
            return renderWorker(code, defaultProps);

          case 9:
            renderedString = _context.sent;
            _context.next = 12;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* hash */ "a"])(renderedString);

          case 12:
            renderedStringHash = _context.sent;
            return _context.abrupt("return", renderedStringHash);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", "error in rendering");

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function render(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(56)
				var methods = ["renderWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-renderer.83dfe0.worker.js", { name: "built-renderer.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ editor_MonacoEditor; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

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
    console.log("START MONACOOOO");
    startMonaco({
      element: "container",
      value: value,
      language: language,
      onChange: onChange
    });
  }, [value, language]);
  return react_default.a.createElement("div", {
    id: "container",
    style: {
      width: width,
      height: height
    }
  });
};

var startMonaco = function startMonaco(_ref2) {
  var _ref2$version = _ref2.version,
      version = _ref2$version === void 0 ? "0.21.2" : _ref2$version,
      _ref2$element = _ref2.element,
      element = _ref2$element === void 0 ? "container" : _ref2$element,
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? "" : _ref2$value,
      _ref2$language = _ref2.language,
      language = _ref2$language === void 0 ? "typescript" : _ref2$language,
      _ref2$onChange = _ref2.onChange,
      onChange = _ref2$onChange === void 0 ? function (_code) {} : _ref2$onChange;
  return new Function("version", "element", "value", "language", "onChange", "\nconst startMonaco = async ({version, element, value, language}) => {\n  const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/".concat(version, "/min/vs';\n  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/").concat(version, "/min/vs/loader.min.js');\n\n  require.config({ paths: { 'vs': vsPath } });\n  \n  require([\"vs/editor/editor.main\"], function () {\n    const editor = monaco.editor.create(document.getElementById(\"container\"), {\n      value: `").concat(value, "`,\n      language: `").concat(language, "`,\n      theme: 'vs-dark'\n    });\n\n    editor.onDidChangeModelContent((event)=>onChange(editor.getValue()))\n  });\n}\n\nreturn startMonaco({version, element, value, language})\nfunction loadScript(src) {\n  return new Promise(function (resolve, reject) {\n    var s;\n    s = document.createElement('script');\n    s.src = src;\n    s.onload = resolve;\n    s.onerror = reject;\n    document.head.appendChild(s);\n  });\n}\n"))(version, element, value, language, onChange);
};
// CONCATENATED MODULE: ./node_modules/react-cdn-monaco-editor/lib/index.js


/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ Page; });

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(16);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/framer-motion/dist/framer-motion.es.js
var framer_motion_es = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/react-cdn-monaco-editor/lib/index.js + 1 modules
var lib = __webpack_require__(67);

// EXTERNAL MODULE: ./src/components/utils/babel.ts
var babel = __webpack_require__(55);

// EXTERNAL MODULE: ./src/components/utils/renderer.ts
var renderer = __webpack_require__(57);

// EXTERNAL MODULE: ./src/components/utils/sha.ts
var sha = __webpack_require__(21);

// CONCATENATED MODULE: ./src/components/codeBox/example.ts
var defaultProps = {
  startState: {
    counter: 0
  },
  pastEvents: new Array(8).fill("+1")
};
var counterExample = "import * as React from \"react\";\n\ntype DState = { counter: number };\n\nconst actions = {\n  \"+1\": (s: DState) => ({ ...s, counter: s.counter + 1 }),\n  \"-1\": (s: DState) => ({ ...s, counter: s.counter - 1 }),\n};\n\ntype ActionType = keyof typeof actions;\n\ninterface Props {\n  startState: DState;\n  pastEvents: string[];\n  onEvent: (action: string) => void;\n}\n\nexport const Counter: React.FC<Props> = (\n  { startState, pastEvents, onEvent },\n) => {\n  const [state, setState] = React.useState({ startState, pastEvents });\n\n  const calculatedState = state.pastEvents.reduce(\n    (prevValue, currentValue) => actions[currentValue](prevValue),\n    startState,\n  );\n\n  return <div>\n    <button {...update(\"-1\")}>-</button>\n    {calculatedState.counter}\n    <button {...update(\"+1\")}>+</button>\n  </div>;\n\n  function update(action: ActionType) {\n    return {\n      \"data-onclick\": String(action),\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        onEvent(action);\n        setState({ ...state, pastEvents: [...state.pastEvents, action] });\n      },\n    };\n  }\n};\n";
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/codeBox/styledCodeBoxComps.ts

var Header = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__Header",
  componentId: "d42kyp-0"
})(["background:#3f51b5;font-family:\"Roboto\";width:100%;margin:0;padding:10px 20px 10px;color:white"]);
var Container = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__Container",
  componentId: "d42kyp-1"
})(["display:block;width:100%;height:60vh;"]);
var CodeContainer = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__CodeContainer",
  componentId: "d42kyp-2"
})(["display:block;width:100%;height:60%;"]);
var ResultContainer = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__ResultContainer",
  componentId: "d42kyp-3"
})(["display:block;width:100%;background:grey;height:220px;"]);
var ResultBox = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__ResultBox",
  componentId: "d42kyp-4"
})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]);
var ResultBoxContainer = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__ResultBoxContainer",
  componentId: "d42kyp-5"
})(["display:block;width:150px;height:150px;overflow:hidden;"]);
// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }










var CodeBox_HtmlReplayer = function HtmlReplayer(_ref) {
  var htmlArray = _ref.htmlArray,
      _ref$onEvent = _ref.onEvent,
      onEvent = _ref$onEvent === void 0 ? function () {} : _ref$onEvent;

  var _React$useState = react_default.a.useState({
    index: 0
  }),
      index = _React$useState[0].index,
      setHtml = _React$useState[1];

  react_default.a.useEffect(function () {
    console.log(index);
    if (htmlArray.length === 0) return; //const handler =

    setTimeout( /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var newIndex;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newIndex = (index + 1) % htmlArray.length;
              setHtml({
                index: newIndex
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), 100); // return ()=>clearInterval(handler);
  }, [htmlArray.length, setHtml, index]);
  console.log("HTML Array", htmlArray);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(ResultBoxContainer, {
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      onClick: function onClick(e) {
        var clickEvent = e.target.getAttribute("data-onclick");
        if (clickEvent) onEvent(clickEvent);
      },
      dangerouslySetInnerHTML: {
        __html: htmlArray[index]
      }
    })
  });
};

var CodeBox_ResultComponent = function ResultComponent(_ref3) {
  var _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? "100%" : _ref3$height,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? "100%" : _ref3$width,
      htmlArray = _ref3.htmlArray;
  var x = Object(framer_motion_es["b" /* useMotionValue */])(0);
  var background = Object(framer_motion_es["c" /* useTransform */])(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(jsx_runtime["Fragment"], {
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(framer_motion_es["a" /* motion */].div, {
      layout: true,
      style: {
        background: background,
        position: "relative",
        height: height,
        width: width,
        padding: "10px"
      },
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(framer_motion_es["a" /* motion */].div, {
        // layout
        drag: true,
        dragElastic: 0.1,
        dragMomentum: false // dragListener={true}
        // onDrag={
        // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
        // }
        ,
        style: {
          position: "absolute",
          x: x
        },
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(ResultBox, {
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(CodeBox_HtmlReplayer, {
            htmlArray: htmlArray,
            index: x.get(),
            onEvent: function onEvent(str) {
              console.log(str);
            }
          })
        })
      })
    })
  });
};

var CodeBox_CodeBox = function CodeBox(_ref4) {
  var live = _ref4.live,
      toRender = _ref4.toRender,
      className = _ref4.className,
      title = _ref4.title;

  var _React$useState2 = react_default.a.useState({
    isError: false,
    code: counterExample,
    transformedCode: "",
    mainCode: counterExample,
    mainCodeHash: "",
    devCodeHash: "",
    defaultProps: defaultProps,
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
      renderedComponent = _React$useState2[0],
      changeWorkerRenderedComponent = _React$useState2[1];

  var _React$useState3 = react_default.a.useState(counterExample),
      code = _React$useState3[0],
      changeCode = _React$useState3[1];

  react_default.a.useEffect(function () {
    var runner = /*#__PURE__*/function () {
      var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        var runnerHash, devCodeHash, codeHash, mainCode, mainCodeHash, transformedHash, transformedMainHash, defaultStateHash, transformedCode, transformedMainCode, renderedHash, renderedMainHash, renderedContent, renderedContentMain, runnerHash2;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(sha["a" /* hash */])(renderedComponent);

              case 2:
                runnerHash = _context2.sent;
                _context2.next = 5;
                return Object(sha["a" /* hash */])(code);

              case 5:
                devCodeHash = _context2.sent;
                codeHash = devCodeHash;
                mainCode = renderedComponent.mainCode ? renderedComponent.mainCode : code;
                mainCodeHash = renderedComponent.mainCodeHash ? renderedComponent.mainCodeHash : devCodeHash;
                _context2.next = 11;
                return Object(babel["a" /* transform */])(codeHash);

              case 11:
                transformedHash = _context2.sent;
                _context2.next = 14;
                return Object(babel["a" /* transform */])(mainCodeHash);

              case 14:
                transformedMainHash = _context2.sent;
                _context2.next = 17;
                return Object(sha["a" /* hash */])(renderedComponent.defaultProps);

              case 17:
                defaultStateHash = _context2.sent;

                if (transformedHash) {
                  _context2.next = 21;
                  break;
                }

                changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
                  isError: true
                }));
                return _context2.abrupt("return");

              case 21:
                _context2.next = 23;
                return Object(sha["b" /* unHash */])(transformedHash);

              case 23:
                transformedCode = _context2.sent;
                _context2.next = 26;
                return Object(sha["b" /* unHash */])(transformedMainHash);

              case 26:
                transformedMainCode = _context2.sent;
                _context2.next = 29;
                return Object(renderer["a" /* render */])(transformedHash, defaultStateHash);

              case 29:
                renderedHash = _context2.sent;
                _context2.next = 32;
                return Object(renderer["a" /* render */])(transformedMainHash, defaultStateHash);

              case 32:
                renderedMainHash = _context2.sent;
                _context2.next = 35;
                return Object(sha["b" /* unHash */])(renderedHash);

              case 35:
                renderedContent = _context2.sent;
                _context2.next = 38;
                return Object(sha["b" /* unHash */])(renderedMainHash);

              case 38:
                renderedContentMain = _context2.sent;
                _context2.next = 41;
                return Object(sha["a" /* hash */])(renderedComponent);

              case 41:
                runnerHash2 = _context2.sent;

                if (runnerHash === runnerHash2) {
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
                }

              case 43:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function runner() {
        return _ref5.apply(this, arguments);
      };
    }();

    runner();
  }, [code, renderedComponent.defaultProps]);
  var isChangeAvailable = renderedComponent.renderedContent && renderedComponent.renderedMainHash !== renderedComponent.renderedHash;
  var isError = !renderedComponent.renderedContent;
  console.log(renderedComponent.renderedContent);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(Container, {
    children: [!!title && /*#__PURE__*/Object(jsx_runtime["jsx"])(Header, {
      children: title
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(CodeContainer, {
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(lib["a" /* MonacoEditor */], {
        width: "100%",
        height: "100%",
        value: counterExample,
        onChange: changeCode
      })
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(ResultContainer, {
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(CodeBox_ResultComponent, {
        htmlArray: [renderedComponent.renderedContent]
      })
    })]
  });
};
// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(13);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(14);

// CONCATENATED MODULE: ./src/pages/codebox.tsx






function Page() {
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(layout["a" /* Layout */], {
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(seo["a" /* SEO */], {
      title: "Code Box"
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("h1", {
      children: "Code box"
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("p", {
      children: "Lets see!"
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(CodeBox_CodeBox, {
      title: "Example1 :)"
    })]
  });
}

/***/ })

}]);