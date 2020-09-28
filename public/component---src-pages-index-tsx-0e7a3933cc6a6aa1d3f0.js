(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[15],{

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(306);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(105);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90);
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(233);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(55);







var StyledLink = Object(styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"])(gatsby__WEBPACK_IMPORTED_MODULE_1__["Link"]).withConfig({
  displayName: "pages__StyledLink",
  componentId: "sc-1y93mv4-0"
})(["box-shadow:\"none\";"]);
var H3 = styled_components__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].h3.withConfig({
  displayName: "pages__H3",
  componentId: "sc-1y93mv4-1"
})(["margin-bottom:", ";"], Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_5__[/* rhythm */ "a"])(1 / 4));

var BlogIndex = function BlogIndex(_ref) {
  var data = _ref.data;
  var edges = data.allMdx.edges;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_3__[/* Layout */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_4__[/* SEO */ "a"], {
    title: "This is Zed vision"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_bio__WEBPACK_IMPORTED_MODULE_2__[/* Bio */ "a"], null), edges.map(function (_ref2) {
    var node = _ref2.node;
    var title = node.frontmatter.title || node.fields.slug;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("article", {
      key: node.fields.slug
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H3, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](StyledLink, {
      to: node.fields.slug
    }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("small", null, node.frontmatter.date)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", {
      dangerouslySetInnerHTML: {
        __html: node.frontmatter.description || node.excerpt
      }
    })));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogIndex);
var pageQuery = "497448492";

/***/ })

}]);
//# sourceMappingURL=component---src-pages-index-tsx-0e7a3933cc6a6aa1d3f0.js.map