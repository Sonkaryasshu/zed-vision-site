(this.webpackJsonp=this.webpackJsonp||[]).push([[10],{100:function(e,t,n){"use strict";var r=n(4),a=n(2),o=n(0),i=n(18),c=n(23),l={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},s=function(e){return Object(a.a)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};Object(c.a)((function(e){return{"@global":{html:l,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:Object(a.a)({margin:0},s(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,n=void 0===t?null:t;return e.classes,o.createElement(o.Fragment,null,n)}));var u=o.forwardRef((function(e,t){var n=e.classes,c=e.className,l=Object(r.a)(e,["classes","className"]);return o.createElement("div",Object(a.a)({className:Object(i.a)(n.root,c),ref:t},l))}));t.a=Object(c.a)((function(e){return{root:Object(a.a)({},l,s(e),{"& *, & *::before, & *::after":{boxSizing:"inherit"},"& strong, & b":{fontWeight:e.typography.fontWeightBold}})}}),{name:"MuiScopedCssBaseline"})(u)},143:function(e,t,n){"use strict";n.r(t),n.d(t,"ShaContainer",(function(){return j})),n.d(t,"default",(function(){return O}));var r=n(19),a=n(13),o=n.n(a),i=(n(12),n(14)),c=n(1),l=n(0),s=n.n(l),u=n(100),d=n(3),f=n(16),h=n(7),p=n(34),b=n(201),v=d.a.div.withConfig({displayName:"fun__Styled",componentId:"sc-51m0yl-0"})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]),x=d.a.div.withConfig({displayName:"fun__DivContainer",componentId:"sc-51m0yl-1"})(["display:block;width:150px;height:150px;overflow:hidden;"]),g=Object(d.a)(b.a).withConfig({displayName:"fun__StyledTextArea",componentId:"sc-51m0yl-2"})(["width:100%;max-height:100%;"]),w=function(e){var t=e.onNew,n=e.prevText,r=s.a.useState({text:n}),a=r[0].text,l=r[1];return s.a.useEffect((function(){l({text:n})}),[n]),Object(c.jsxs)(x,{children:[Object(c.jsx)("p",{children:"Start to type"}),Object(c.jsx)(g,{rowsMin:3,rowsMax:3,onChange:function(){var e=Object(i.a)(o.a.mark((function e(n){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.target.value,e.next=3,Object(f.a)(r);case 3:a=e.sent,t(a),l({text:r});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),value:a})]})},m=Object(d.a)("div").withConfig({displayName:"fun___StyledDiv",componentId:"sc-51m0yl-3"})(["font-size:small;display:inline-block;width:10px;height:10px;border-radius:5px;background:white;padding:5px;top:","%;left:","%;position:absolute"],(function(e){return e._css}),(function(e){return e._css2})),j=function(){var e=Object(p.b)(0),t=s.a.useState([]),n=t[0],a=t[1],l=s.a.useState({locX:40,locY:40,activeText:""}),d=l[0],h=d.locX,b=d.locY,x=d.activeText,g=l[1];return Object(c.jsxs)("div",{children:[n.map((function(e){var t=C(e),n=t.locationX,r=t.locationY;return Object(c.jsx)(m,{onMouseEnter:Object(i.a)(o.a.mark((function t(){var n,r,a,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.b)(e);case 2:n=t.sent,r=C(e),a=r.locationX,i=r.locationY,g({locX:a,locY:i,activeText:n});case 5:case"end":return t.stop()}}),t)}))),_css:r,_css2:n},e)})),Object(c.jsx)(p.a.div,{animate:{x:h*window.innerWidth/105-100,y:b*window.innerHeight/105-50,scale:1,rotate:0},style:{position:"absolute",x:e},children:Object(c.jsx)(v,{children:Object(c.jsx)(u.a,{children:Object(c.jsx)(w,{prevText:x,onNew:function(e){var t=C(e),o=t.locationY,i=t.locationX;g({locX:i,locY:o,activeText:x}),n.includes(e)||a([].concat(Object(r.a)(n),[e]))}})})})})]})},y=d.a.div.withConfig({displayName:"fun__Container",componentId:"sc-51m0yl-4"})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:relative;background:rgba(0,85,255,1);perspective:1000px;"]);function O(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(h.a,{children:Object(c.jsx)("style",{type:"text/css",children:"\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"})}),Object(c.jsx)(y,{children:"undefined"!=typeof window?Object(c.jsx)(j,{}):"Loading"})]})}function C(e){for(var t=e.length,n=100/Math.pow(4,t),r=0,a=0,o=1;o<=e.length;o++){var i=parseInt(e.substr(o-1,1),16),c=100/Math.pow(4,o);a+=i%4*c,r+=Math.floor(i/4)*c}return{size:n,locationX:r,locationY:a}}},201:function(e,t,n){"use strict";var r=n(2),a=n(4),o=n(0);var i=n(60);function c(e,t){return parseInt(e[t],10)||0}var l="undefined"!=typeof window?o.useLayoutEffect:o.useEffect,s={visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"},u=o.forwardRef((function(e,t){var n=e.onChange,u=e.rows,d=e.rowsMax,f=e.rowsMin,h=void 0===f?1:f,p=e.style,b=e.value,v=Object(a.a)(e,["onChange","rows","rowsMax","rowsMin","style","value"]),x=u||h,g=o.useRef(null!=b).current,w=o.useRef(null),m=Object(i.a)(t,w),j=o.useRef(null),y=o.useRef(0),O=o.useState({}),C=O[0],S=O[1],M=o.useCallback((function(){var t=w.current,n=window.getComputedStyle(t),r=j.current;r.style.width=n.width,r.value=t.value||e.placeholder||"x","\n"===r.value.slice(-1)&&(r.value+=" ");var a=n["box-sizing"],o=c(n,"padding-bottom")+c(n,"padding-top"),i=c(n,"border-bottom-width")+c(n,"border-top-width"),l=r.scrollHeight-o;r.value="x";var s=r.scrollHeight-o,u=l;x&&(u=Math.max(Number(x)*s,u)),d&&(u=Math.min(Number(d)*s,u));var f=(u=Math.max(u,s))+("border-box"===a?o+i:0),h=Math.abs(u-l)<=1;S((function(e){return y.current<20&&(f>0&&Math.abs((e.outerHeightStyle||0)-f)>1||e.overflow!==h)?(y.current+=1,{overflow:h,outerHeightStyle:f}):e}))}),[d,x,e.placeholder]);o.useEffect((function(){var e=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function r(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];var i=this,c=function(){e.apply(i,a)};clearTimeout(t),t=setTimeout(c,n)}return r.clear=function(){clearTimeout(t)},r}((function(){y.current=0,M()}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[M]),l((function(){M()})),o.useEffect((function(){y.current=0}),[b]);return o.createElement(o.Fragment,null,o.createElement("textarea",Object(r.a)({value:b,onChange:function(e){y.current=0,g||M(),n&&n(e)},ref:m,rows:x,style:Object(r.a)({height:C.outerHeightStyle,overflow:C.overflow?"hidden":null},p)},v)),o.createElement("textarea",{"aria-hidden":!0,className:e.className,readOnly:!0,ref:j,tabIndex:-1,style:Object(r.a)({},s,p)}))}));t.a=u}}]);