(this.webpackJsonp=this.webpackJsonp||[]).push([[10],{125:function(e,t,n){"use strict";n.r(t),n.d(t,"ShaContainer",(function(){return j})),n.d(t,"default",(function(){return m}));var i=n(22),a=n(5),c=n.n(a),o=(n(4),n(6)),r=n(0),s=n(1),l=n.n(s),d=n(2),p=n(13),u=n(3),h=n(28),x=d.a.div.withConfig({displayName:"fun__Styled",componentId:"sc-51m0yl-0"})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]),f=d.a.div.withConfig({displayName:"fun__DivContainer",componentId:"sc-51m0yl-1"})(["display:block;width:150px;height:150px;overflow:hidden;"]),b=d.a.textarea.withConfig({displayName:"fun__StyledTextArea",componentId:"sc-51m0yl-2"})(["width:100%;min-height:120px;max-height:100%;"]),v=function(e){var t=e.onNew,n=e.prevText,i=l.a.useState({text:n}),a=i[0].text,s=i[1];return l.a.useEffect((function(){s({text:n})}),[n]),Object(r.jsxs)(f,{children:[Object(r.jsx)("p",{children:"Start to type"}),Object(r.jsx)(b,{onChange:function(){var e=Object(o.a)(c.a.mark((function e(n){var i,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.target.value,e.next=3,Object(p.a)(i);case 3:a=e.sent,t(a),s({text:i});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),value:a})]})},w=Object(d.a)("div").withConfig({displayName:"fun___StyledDiv",componentId:"sc-51m0yl-3"})(["font-size:small;display:inline-block;width:10px;height:10px;border-radius:5px;background:white;padding:5px;top:","%;left:","%;position:absolute"],(function(e){return e._css}),(function(e){return e._css2})),j=function(){var e=Object(h.b)(0),t=l.a.useState([]),n=t[0],a=t[1],s=l.a.useState({locX:40,locY:40,activeText:""}),d=s[0],u=d.locX,f=d.locY,b=d.activeText,j=s[1];return Object(r.jsxs)("div",{children:[n.map((function(e){var t=y(e),n=t.locationX,i=t.locationY;return Object(r.jsx)(w,{onMouseEnter:Object(o.a)(c.a.mark((function t(){var n,i,a,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(p.b)(e);case 2:n=t.sent,i=y(e),a=i.locationX,o=i.locationY,j({locX:a,locY:o,activeText:n});case 5:case"end":return t.stop()}}),t)}))),_css:i,_css2:n},e)})),Object(r.jsx)(h.a.div,{animate:{x:u*window.innerWidth/105-100,y:f*window.innerHeight/105-50,scale:1,rotate:0},style:{position:"absolute",x:e},children:Object(r.jsx)(x,{children:Object(r.jsx)(v,{prevText:b,onNew:function(e){var t=y(e),c=t.locationY,o=t.locationX;j({locX:o,locY:c,activeText:b}),n.includes(e)||a([].concat(Object(i.a)(n),[e]))}})})})]})},g=d.a.div.withConfig({displayName:"fun__Container",componentId:"sc-51m0yl-4"})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:relative;background:rgba(0,85,255,1);perspective:1000px;"]);function m(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(u.a,{children:Object(r.jsx)("style",{type:"text/css",children:"\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"})}),Object(r.jsx)(g,{children:"undefined"!=typeof window?Object(r.jsx)(j,{}):"Loading"})]})}function y(e){for(var t=e.length,n=100/Math.pow(4,t),i=0,a=0,c=1;c<=e.length;c++){var o=parseInt(e.substr(c-1,1),16),r=100/Math.pow(4,c);a+=o%4*r,i+=Math.floor(o/4)*r}return{size:n,locationX:i,locationY:a}}}}]);