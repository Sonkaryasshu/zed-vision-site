(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[11],{

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);






var NotFoundPage = function NotFoundPage(_ref) {
  var data = _ref.data,
      location = _ref.location;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(_components_layout__WEBPACK_IMPORTED_MODULE_2__[/* Layout */ "a"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_seo__WEBPACK_IMPORTED_MODULE_3__[/* SEO */ "a"], {
      title: "404: Not Found"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "Not Found"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
      children: "You just hit a route that not exist... the sadness."
    })]
  });
};

/* harmony default export */ __webpack_exports__["default"] = (NotFoundPage);
var pageQuery = "3159585216";

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SEO; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76);




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

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48);





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

/***/ })

}]);
//# sourceMappingURL=component---src-pages-404-tsx-4eb5304e680d875d5472.js.map