(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[11],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);









var StyledLink = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"]).withConfig({
  displayName: "pages__StyledLink",
  componentId: "sc-1y93mv4-0"
})(["box-shadow:\"none\";"]);
var H3 = styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].h3.withConfig({
  displayName: "pages__H3",
  componentId: "sc-1y93mv4-1"
})(["margin-bottom:", ";"], Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1 / 4));

var BlogIndex = function BlogIndex(_ref) {
  var data = _ref.data;
  var edges = data.allMdx.edges;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* Layout */ "a"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__[/* SEO */ "a"], {
      title: "This is Zed vision"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__[/* Bio */ "a"], {}), edges.map(function (_ref2) {
      var node = _ref2.node;
      var title = node.frontmatter.title || node.fields.slug;
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("article", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("header", {
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(H3, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(StyledLink, {
              to: node.fields.slug,
              children: title
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("small", {
            children: node.frontmatter.date
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("section", {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
            dangerouslySetInnerHTML: {
              __html: node.frontmatter.description || node.excerpt
            }
          })
        })]
      }, node.fields.slug);
    })]
  });
};

/* harmony default export */ __webpack_exports__["default"] = (BlogIndex);
var pageQuery = "497448492";

/***/ })

}]);
//# sourceMappingURL=component---src-pages-index-tsx-1f07197e7d9538ef3327.js.map