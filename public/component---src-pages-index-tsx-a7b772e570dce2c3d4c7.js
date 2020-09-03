(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "QeBL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fhSp");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Wbzz");
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("IgZc");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9Dj+");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("H8eV");
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rB5o");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("j/s1");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("l1C2");


function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  margin-bottom: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  box-shadow: \"none\";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}









var StyledLink = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"])(_templateObject());
var H3 = styled_components__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].h3(_templateObject2(), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1 / 4));

var BlogIndex = function BlogIndex(_ref) {
  var data = _ref.data,
      location = _ref.location;
  var siteTitle = data.site.siteMetadata.title;
  var edges = data.allMdx.edges;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    location: location,
    title: siteTitle
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    title: "This is Zed vision"
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null), edges.map(function (_ref2) {
    var node = _ref2.node;
    var title = node.frontmatter.title || node.fields.slug;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("article", {
      key: node.fields.slug
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("header", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(H3, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])(StyledLink, {
      to: node.fields.slug
    }, title)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("small", null, node.frontmatter.date)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("section", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "a"])("p", {
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