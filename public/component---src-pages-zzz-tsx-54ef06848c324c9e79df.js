(this.webpackJsonp=this.webpackJsonp||[]).push([[15],{100:function(e,t,n){"use strict";var r=n(4),a=n(2),o=n(0),i=n(18),c=n(23),s={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},l=function(e){return Object(a.a)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};Object(c.a)((function(e){return{"@global":{html:s,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:Object(a.a)({margin:0},l(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,n=void 0===t?null:t;return e.classes,o.createElement(o.Fragment,null,n)}));var u=o.forwardRef((function(e,t){var n=e.classes,c=e.className,s=Object(r.a)(e,["classes","className"]);return o.createElement("div",Object(a.a)({className:Object(i.a)(n.root,c),ref:t},s))}));t.a=Object(c.a)((function(e){return{root:Object(a.a)({},s,l(e),{"& *, & *::before, & *::after":{boxSizing:"inherit"},"& strong, & b":{fontWeight:e.typography.fontWeightBold}})}}),{name:"MuiScopedCssBaseline"})(u)},189:function(e,t,n){"use strict";n.r(t),n.d(t,"MyComponent",(function(){return m})),n.d(t,"default",(function(){return y}));var r=n(13),a=n.n(r),o=(n(8),n(14)),i=n(1),c=n(0),s=n.n(c),l=n(100),u=n(3),d=n(16),h=n(7),f=n(34),b=n(201),p=u.a.div.withConfig({displayName:"zzz__Styled",componentId:"sc-11tle59-0"})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]),g=u.a.div.withConfig({displayName:"zzz__DivContainer",componentId:"sc-11tle59-1"})(["display:block;width:150px;height:150px;overflow:hidden;"]),v=Object(u.a)(b.a).withConfig({displayName:"zzz__StyledTextArea",componentId:"sc-11tle59-2"})(["width:100%;max-height:100%;"]),x=function(e){var t=e.onNew,n=s.a.useState({text:"",sha256Hash:""}),r=n[0],c=r.text,l=r.sha256Hash,u=n[1];return Object(i.jsxs)(g,{children:[Object(i.jsx)("p",{children:"Start to type"}),Object(i.jsx)(v,{rowsMin:3,rowsMax:3,onChange:function(){var e=Object(o.a)(a.a.mark((function e(n){var r,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.target.value,e.next=3,Object(d.a)(r);case 3:o=e.sent,t(o),u({text:r,sha256Hash:o});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),value:c}),Object(i.jsx)("pre",{children:l})]})},w=Object(u.a)(f.a.div).withConfig({displayName:"zzz___StyledMotionDiv",componentId:"sc-11tle59-3"})(["position:relative;height:","px;width:","px;"],(function(e){return e._css}),(function(e){return e._css2})),m=function(e){var t=e.height,n=void 0===t?400:t,r=e.width,a=void 0===r?400:r,o=(e.adjust,Object(f.b)(0)),c=Object(f.c)(o,[-100,0,100],["#ff008c","#7700ff","rgb(230, 255, 0)"]);return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(w,{layout:!0,style:{background:c},_css:n,_css2:a}),Object(i.jsx)(f.a.div,{drag:!0,dragElastic:.5,dragConstraints:{top:0,bottom:n-100,left:0,right:a-100},style:{position:"absolute",x:o},children:Object(i.jsx)(p,{children:Object(i.jsx)(l.a,{children:Object(i.jsx)(x,{onNew:function(e){return console.log(e)}})})})})]})},j=u.a.div.withConfig({displayName:"zzz__Container",componentId:"sc-11tle59-4"})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:flex;place-content:center;place-items:center;background:rgba(0,85,255,1);perspective:1000px;"]);function y(){var e=s.a.useState({height:600,width:400}),t=e[0],n=t.width,r=t.height,a=e[1];return s.a.useEffect((function(){setInterval((function(){var e=200*Math.random()-100,t=Math.floor(n-e),r=Math.floor(24e4/t);a({height:r,width:t})}),1e3)}),[]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(h.a,{children:Object(i.jsx)("style",{type:"text/css",children:"\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"})}),Object(i.jsx)(j,{children:"undefined"!=typeof window?Object(i.jsx)(m,{height:r,width:n,adjust:function(e,t){var o=n-e;a({height:n*r/o,width:o})}}):"Loading"})]})}},201:function(e,t,n){"use strict";var r=n(2),a=n(4),o=n(0);var i=n(60);function c(e,t){return parseInt(e[t],10)||0}var s="undefined"!=typeof window?o.useLayoutEffect:o.useEffect,l={visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"},u=o.forwardRef((function(e,t){var n=e.onChange,u=e.rows,d=e.rowsMax,h=e.rowsMin,f=void 0===h?1:h,b=e.style,p=e.value,g=Object(a.a)(e,["onChange","rows","rowsMax","rowsMin","style","value"]),v=u||f,x=o.useRef(null!=p).current,w=o.useRef(null),m=Object(i.a)(t,w),j=o.useRef(null),y=o.useRef(0),O=o.useState({}),z=O[0],C=O[1],M=o.useCallback((function(){var t=w.current,n=window.getComputedStyle(t),r=j.current;r.style.width=n.width,r.value=t.value||e.placeholder||"x","\n"===r.value.slice(-1)&&(r.value+=" ");var a=n["box-sizing"],o=c(n,"padding-bottom")+c(n,"padding-top"),i=c(n,"border-bottom-width")+c(n,"border-top-width"),s=r.scrollHeight-o;r.value="x";var l=r.scrollHeight-o,u=s;v&&(u=Math.max(Number(v)*l,u)),d&&(u=Math.min(Number(d)*l,u));var h=(u=Math.max(u,l))+("border-box"===a?o+i:0),f=Math.abs(u-s)<=1;C((function(e){return y.current<20&&(h>0&&Math.abs((e.outerHeightStyle||0)-h)>1||e.overflow!==f)?(y.current+=1,{overflow:f,outerHeightStyle:h}):e}))}),[d,v,e.placeholder]);o.useEffect((function(){var e=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function r(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];var i=this,c=function(){e.apply(i,a)};clearTimeout(t),t=setTimeout(c,n)}return r.clear=function(){clearTimeout(t)},r}((function(){y.current=0,M()}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[M]),s((function(){M()})),o.useEffect((function(){y.current=0}),[p]);return o.createElement(o.Fragment,null,o.createElement("textarea",Object(r.a)({value:p,onChange:function(e){y.current=0,x||M(),n&&n(e)},ref:m,rows:v,style:Object(r.a)({height:z.outerHeightStyle,overflow:z.overflow?"hidden":null},b)},g)),o.createElement("textarea",{"aria-hidden":!0,className:e.className,readOnly:!0,ref:j,tabIndex:-1,style:Object(r.a)({},l,b)}))}));t.a=u}}]);