(this.webpackJsonp=this.webpackJsonp||[]).push([[15],{171:function(t,e,n){"use strict";n.r(e),n.d(e,"MyComponent",(function(){return j})),n.d(e,"default",(function(){return v}));var i=n(5),a=n.n(i),r=(n(4),n(6)),c=n(0),o=n(1),s=n.n(o),h=n(2),d=n(13),l=n(3),p=n(28),u=h.a.div.withConfig({displayName:"zzz__Styled",componentId:"sc-11tle59-0"})(["text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"]),x=h.a.div.withConfig({displayName:"zzz__DivContainer",componentId:"sc-11tle59-1"})(["display:block;width:150px;height:150px;overflow:hidden;"]),f=h.a.textarea.withConfig({displayName:"zzz__StyledTextArea",componentId:"sc-11tle59-2"})(["width:100%;max-height:100%;"]),g=function(t){var e=t.onNew,n=s.a.useState({text:"",sha256Hash:""}),i=n[0],o=i.text,h=i.sha256Hash,l=n[1];return Object(c.jsxs)(x,{children:[Object(c.jsx)("p",{children:"Start to type"}),Object(c.jsx)(f,{onChange:function(){var t=Object(r.a)(a.a.mark((function t(n){var i,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=n.target.value,t.next=3,Object(d.a)(i);case 3:r=t.sent,e(r),l({text:i,sha256Hash:r});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),value:o}),Object(c.jsx)("pre",{children:h})]})},b=Object(h.a)(p.a.div).withConfig({displayName:"zzz___StyledMotionDiv",componentId:"sc-11tle59-3"})(["position:relative;height:","px;width:","px;"],(function(t){return t._css}),(function(t){return t._css2})),j=function(t){var e=t.height,n=void 0===e?400:e,i=t.width,a=void 0===i?400:i,r=(t.adjust,Object(p.b)(0)),o=Object(p.c)(r,[-100,0,100],["#ff008c","#7700ff","rgb(230, 255, 0)"]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(b,{layout:!0,style:{background:o},_css:n,_css2:a}),Object(c.jsx)(p.a.div,{drag:!0,dragElastic:.5,dragConstraints:{top:0,bottom:n-100,left:0,right:a-100},style:{position:"absolute",x:r},children:Object(c.jsx)(u,{children:Object(c.jsx)(g,{onNew:function(t){return console.log(t)}})})})]})},w=h.a.div.withConfig({displayName:"zzz__Container",componentId:"sc-11tle59-4"})(["height:100vh;width:100vw;overflow:hidden;text-align:center;display:flex;place-content:center;place-items:center;background:rgba(0,85,255,1);perspective:1000px;"]);function v(){var t=s.a.useState({height:600,width:400}),e=t[0],n=e.width,i=e.height,a=t[1];return s.a.useEffect((function(){setInterval((function(){var t=200*Math.random()-100,e=Math.floor(n-t),i=Math.floor(24e4/e);a({height:i,width:e})}),1e3)}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(l.a,{children:Object(c.jsx)("style",{type:"text/css",children:"\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }"})}),Object(c.jsx)(w,{children:"undefined"!=typeof window?Object(c.jsx)(j,{height:i,width:n,adjust:function(t,e){var r=n-t;a({height:n*i/r,width:r})}}):"Loading"})]})}}}]);