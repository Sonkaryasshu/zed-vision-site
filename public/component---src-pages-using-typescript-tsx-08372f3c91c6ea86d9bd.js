(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "+wGG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9Dj+");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("H8eV");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Wbzz");



 // If you don't want to use TypeScript you can delete this file!

var UsingTypescript = function UsingTypescript(_ref) {
  var path = _ref.path,
      location = _ref.location;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    title: "Using TypeScript",
    location: location
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    title: "Using TypeScript"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Gatsby supports TypeScript by default!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "This means that you can create and write ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".ts/.tsx"), " files for your pages, components etc. Please note that the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "gatsby-*.js"), " files (like gatsby-node.js) currently don't support TypeScript yet."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "For type checking you'll want to install ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "typescript"), " via npm and run ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "tsc --init"), " to create a ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".tsconfig"), " file."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "You're currently on the page \"", path, "\""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/"
  }, "Go back to the homepage"));
};

/* harmony default export */ __webpack_exports__["default"] = (UsingTypescript);
var query = null;

/***/ }),

/***/ "H8eV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Wbzz");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Vgyk");



/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

var SEO = function SEO(_ref) {
  var description = _ref.description,
      lang = _ref.lang,
      meta = _ref.meta,
      title = _ref.title;

  var _useStaticQuery = Object(gatsby__WEBPACK_IMPORTED_MODULE_1__["useStaticQuery"])("2841359383"),
      site = _useStaticQuery.site;

  var metaDescription = description || site.siteMetadata.description;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_2__[/* Helmet */ "a"], {
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

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: ""
};
/* harmony default export */ __webpack_exports__["a"] = (SEO);

/***/ })

}]);
//# sourceMappingURL=component---src-pages-using-typescript-tsx-08372f3c91c6ea86d9bd.js.map