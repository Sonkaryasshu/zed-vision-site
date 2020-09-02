(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "0yTM":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__("M6MO");module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ "695J":
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

/***/ "KEM+":
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

/***/ "M6MO":
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__("rDK1");var _toConsumableArray=__webpack_require__("RhWx");var _defineProperty=__webpack_require__("KEM+");var _objectWithoutPropertiesLoose=__webpack_require__("LdEA");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__("ERkP");var _require=__webpack_require__("ZVZ0"),useMDXComponents=_require.useMDXComponents,mdx=_require.mdx;var _require2=__webpack_require__("Amv9"),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,components=_ref.components,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","components","children"]);var mdxComponents=useMDXComponents(components);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({components:mdxComponents},props));};

/***/ }),

/***/ "RhWx":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__("tGbD");

var iterableToArray = __webpack_require__("twbh");

var unsupportedIterableToArray = __webpack_require__("peMk");

var nonIterableSpread = __webpack_require__("d8WC");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "TcdR":
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

/***/ "cZrw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zjfJ");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Wbzz");
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("IgZc");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9Dj+");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("H8eV");
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rB5o");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0yTM");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("l1C2");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







 // import { MDXProvider } from "@mdx-js/react"



var BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext,
      location = _ref.location;
  var post = data.mdx;
  var siteTitle = data.site.siteMetadata.title;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__["MDXRenderer"], null, post.body);
  };

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    location: location,
    title: siteTitle
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("header", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("h1", {
    style: {
      marginTop: Object(_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1),
      marginBottom: 0
    }
  }, post.frontmatter.title), " ", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("p", {
    style: _objectSpread(_objectSpread({}, Object(_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* scale */ "b"])(-1 / 5)), {}, {
      display: "block",
      marginBottom: Object(_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1)
    })
  }, post.frontmatter.date)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(BlogPost, null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("hr", {
    style: {
      marginBottom: Object(_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1)
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("footer", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("nav", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("ul", null, previous && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("li", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("li", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ "d8WC":
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "iQ7j":
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "peMk":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("iQ7j");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "rDK1":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("695J");

var isNativeReflectConstruct = __webpack_require__("TcdR");

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

/***/ "tGbD":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("iQ7j");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "twbh":
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ })

}]);