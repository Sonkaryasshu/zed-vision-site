(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[13],{

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(112);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82);



 // If you don't want to use TypeScript you can delete this file!

var UsingTypescript = function UsingTypescript(_ref) {
  var path = _ref.path,
      location = _ref.location;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_1__[/* Layout */ "a"], {
    title: "Using TypeScript",
    location: location
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_2__[/* SEO */ "a"], {
    title: "Using TypeScript"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Gatsby supports TypeScript by default!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "This means that you can create and write ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".ts/.tsx"), "files for your pages, components etc. Please note that the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "gatsby-*.js"), " files (like gatsby-node.js) currently do not support TypeScript yet."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "For type checking you will want to install ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "typescript"), "via npm and run ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "tsc --init"), " to create a ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".tsconfig"), " file."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "You are currently on the page ", path, "\\\\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/"
  }, "Go back to the homepage"));
};

/* harmony default export */ __webpack_exports__["default"] = (UsingTypescript);
var query = null;

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(128);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(82);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(77);




var StyledContent = styled_components__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].div.withConfig({
  displayName: "layout__StyledContent",
  componentId: "sc-1juqdk6-0"
})(["max-width:1140px;margin:auto;"]);
var Layout = function Layout(_ref) {
  var location = _ref.location,
      title = _ref.title,
      children = _ref.children;

  var __PATH_PREFIX__;

  var rootPath = __PATH_PREFIX__ + "/";
  var header = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/"
  }, title));
  if (!(location && location.pathname)) header = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);else if (location.pathname === rootPath) {
    header = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/"
    }, title));
  } else {
    header = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/"
    }, title));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_1__[/* Helmet */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](StyledContent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null, header), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("main", null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("footer", null, "\xA9 ", new Date().getFullYear(), ", Zed vision")));
};

/***/ })

}]);
//# sourceMappingURL=component---src-pages-using-typescript-tsx-f27e9bbc96be177b0b90.js.map