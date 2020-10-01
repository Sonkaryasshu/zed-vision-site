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

/***/ 674:
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

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/codeBox/styledCodeBoxComps.ts

var Container = styled_components_browser_esm["b" /* default */].div.withConfig({
  displayName: "styledCodeBoxComps__Container",
  componentId: "d42kyp-0"
})(["display:block;width:100%;height:400px;"]);
// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx



var CodeBox_CodeBox = function CodeBox() {
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Container, {
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("h1", {
      children: "Ello"
    })
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
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(CodeBox_CodeBox, {})]
  });
}

/***/ })

}]);
//# sourceMappingURL=component---src-pages-codebox-tsx-0115330269f7da2d548d.js.map