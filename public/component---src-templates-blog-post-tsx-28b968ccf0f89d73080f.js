(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"0yTM":function(t,e,r){var n=r("M6MO");t.exports={MDXRenderer:n}},"695J":function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},"KEM+":function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},M6MO:function(t,e,r){var n=r("rDK1"),o=r("RhWx"),c=r("KEM+"),i=r("LdEA");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l=r("ERkP"),p=r("ZVZ0"),f=p.useMDXComponents,s=p.mdx,b=r("Amv9").useMDXScope;t.exports=function(t){var e=t.scope,r=t.components,c=t.children,a=i(t,["scope","components","children"]),p=f(r),O=b(e),y=l.useMemo((function(){if(!c)return null;var t=u({React:l,mdx:s},O),e=Object.keys(t),r=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+c])).apply(void 0,[{}].concat(o(r)))}),[c,e]);return l.createElement(y,u({components:p},a))}},RhWx:function(t,e,r){var n=r("tGbD"),o=r("twbh"),c=r("peMk"),i=r("d8WC");t.exports=function(t){return n(t)||o(t)||c(t)||i()}},TcdR:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},cZrw:function(t,e,r){"use strict";r.r(e),r.d(e,"pageQuery",(function(){return y}));var n=r("zjfJ"),o=r("ERkP"),c=r.n(o),i=r("Wbzz"),a=r("IgZc"),u=r("9Dj+"),l=r("H8eV"),p=r("rB5o"),f=r("0yTM"),s=r("l1C2");function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function O(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.default=function(t){var e=t.data,r=t.pageContext,n=t.location,o=e.mdx,b=e.site.siteMetadata.title,y=r.previous,j=r.next;return Object(s.a)(c.a.Fragment,null,Object(s.a)(u.a,{location:n,title:b},Object(s.a)(l.a,{title:o.frontmatter.title,description:o.frontmatter.description||o.excerpt}),Object(s.a)("header",null,Object(s.a)("h1",{style:{marginTop:Object(p.a)(1),marginBottom:0}},o.frontmatter.title)," ",Object(s.a)("p",{style:O(O({},Object(p.b)(-.2)),{},{display:"block",marginBottom:Object(p.a)(1)})},o.frontmatter.date)),Object(s.a)((function(){return Object(s.a)(f.MDXRenderer,null,o.body)}),null),Object(s.a)("hr",{style:{marginBottom:Object(p.a)(1)}}),Object(s.a)("footer",null,Object(s.a)(a.a,null)),Object(s.a)("nav",null,Object(s.a)("ul",null,y&&Object(s.a)("li",null,Object(s.a)(i.Link,{to:y.fields.slug,rel:"prev"},"← ",y.frontmatter.title)),j&&Object(s.a)("li",null,Object(s.a)(i.Link,{to:j.fields.slug,rel:"next"},j.frontmatter.title," →"))))))};var y="2168380918"},d8WC:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},iQ7j:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},peMk:function(t,e,r){var n=r("iQ7j");t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},rDK1:function(t,e,r){var n=r("695J"),o=r("TcdR");function c(e,r,i){return o()?t.exports=c=Reflect.construct:t.exports=c=function(t,e,r){var o=[null];o.push.apply(o,e);var c=new(Function.bind.apply(t,o));return r&&n(c,r.prototype),c},c.apply(null,arguments)}t.exports=c},tGbD:function(t,e,r){var n=r("iQ7j");t.exports=function(t){if(Array.isArray(t))return n(t)}},twbh:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}}}]);