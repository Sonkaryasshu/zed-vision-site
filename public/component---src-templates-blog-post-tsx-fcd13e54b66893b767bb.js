(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"0yTM":function(t,e,n){var r=n("M6MO");t.exports={MDXRenderer:r}},"695J":function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},"KEM+":function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},M6MO:function(t,e,n){var r=n("rDK1"),o=n("RhWx"),c=n("KEM+"),i=n("LdEA");function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l=n("ERkP"),f=n("ZVZ0").mdx,p=n("Amv9").useMDXScope;t.exports=function(t){var e=t.scope,n=t.children,c=i(t,["scope","children"]),u=p(e),s=l.useMemo((function(){if(!n)return null;var t=a({React:l,mdx:f},u),e=Object.keys(t),c=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+n])).apply(void 0,[{}].concat(o(c)))}),[n,e]);return l.createElement(s,a({},c))}},RhWx:function(t,e,n){var r=n("tGbD"),o=n("twbh"),c=n("peMk"),i=n("d8WC");t.exports=function(t){return r(t)||o(t)||c(t)||i()}},TcdR:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},cZrw:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",(function(){return h}));var r=n("fhSp"),o=n("ERkP"),c=n("Wbzz"),i=n("IgZc"),u=n("9Dj+"),a=n("H8eV"),l=n("rB5o"),f=n("0yTM"),p=n("j/s1");function s(){var t=Object(r.a)(["\n  margin-bottom: ",";\n"]);return s=function(){return t},t}function b(){var t=Object(r.a)(["\n  font-size: ",";\n  line-height: ",";\n  display: block;\n  margin-bottom: ",";\n"]);return b=function(){return t},t}function m(){var t=Object(r.a)(["\n  margin-top: ",";\n  margin-bottom: 0;\n"]);return m=function(){return t},t}var y=p.b.h1(m(),Object(l.a)(1)),d=Object(l.b)(.2),v=d.fontSize,O=d.lineHeight,j=p.b.p(b(),v,O,Object(l.a)(1)),g=p.b.hr(s(),Object(l.a)(1));e.default=function(t){var e=t.data,n=t.pageContext,r=t.location,l=e.mdx,p=e.site.siteMetadata.title,s=n.previous,b=n.next,m=function(){return o.createElement(f.MDXRenderer,null,l.body)};return o.createElement(o.Fragment,null,o.createElement(u.a,{location:r,title:p},o.createElement(a.a,{title:l.frontmatter.title,description:l.frontmatter.description||l.excerpt}),o.createElement("header",null,o.createElement(y,null,l.frontmatter.title),o.createElement(j,null,l.frontmatter.date)),o.createElement(m,null),o.createElement(g,null),o.createElement("footer",null,o.createElement(i.a,null)),o.createElement("nav",null,o.createElement("ul",null,s&&o.createElement("li",null,o.createElement(c.Link,{to:s.fields.slug,rel:"prev"},"← ",s.frontmatter.title)),b&&o.createElement("li",null,o.createElement(c.Link,{to:b.fields.slug,rel:"next"},b.frontmatter.title," →"))))))};var h="2168380918"},d8WC:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},iQ7j:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},peMk:function(t,e,n){var r=n("iQ7j");t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},rDK1:function(t,e,n){var r=n("695J"),o=n("TcdR");function c(e,n,i){return o()?t.exports=c=Reflect.construct:t.exports=c=function(t,e,n){var o=[null];o.push.apply(o,e);var c=new(Function.bind.apply(t,o));return n&&r(c,n.prototype),c},c.apply(null,arguments)}t.exports=c},tGbD:function(t,e,n){var r=n("iQ7j");t.exports=function(t){if(Array.isArray(t))return r(t)}},twbh:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-fcd13e54b66893b767bb.js.map