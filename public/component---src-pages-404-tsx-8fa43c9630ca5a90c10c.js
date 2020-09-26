(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(112);




var NotFoundPage = function NotFoundPage(_ref) {
  var data = _ref.data,
      location = _ref.location;
  var siteTitle = data.site.siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_1__[/* Layout */ "a"], {
    location: location,
    title: siteTitle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_2__[/* SEO */ "a"], {
    title: "404: Not Found"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Not Found"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "You just hit a route that not exist... the sadness."));
};

/* harmony default export */ __webpack_exports__["default"] = (NotFoundPage);
var pageQuery = "3159585216";

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
//# sourceMappingURL=component---src-pages-404-tsx-8fa43c9630ca5a90c10c.js.map