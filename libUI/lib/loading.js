(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t(require("vue")):"function"===typeof define&&define.amd?define(["vue"],t):"object"===typeof exports?exports["cqc"]=t(require("vue")):(e["cqc"]=e["cqc"]||{},e["cqc"]["loading"]=t(e["vue"]))})(self,(function(e){return function(){"use strict";var t={3744:function(e,t){t.Z=(e,t)=>{const o=e.__vccOpts||e;for(const[n,c]of t)o[n]=c;return o}},441:function(t){t.exports=e}},o={};function n(e){var c=o[e];if(void 0!==c)return c.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,n),r.exports}!function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}();var c={};return function(){n.d(c,{default:function(){return f}});var e=n(441);const t={class:"cqc-loading"},o={class:"cqc-loading-wrapper"},r=(0,e.createElementVNode)("i",{class:"cqc-icon cqc-icon-loading"},null,-1),i={key:0,class:"cqc-loading-text"};function a(n,c,a,s,l,u){return(0,e.openBlock)(),(0,e.createBlock)(e.Transition,{name:"cqc-loading"},{default:(0,e.withCtx)((()=>[(0,e.withDirectives)((0,e.createElementVNode)("div",t,[(0,e.createElementVNode)("div",o,[r,n.text?((0,e.openBlock)(),(0,e.createElementBlock)("div",i,(0,e.toDisplayString)(n.text),1)):(0,e.createCommentVNode)("",!0)]),n.mask?((0,e.openBlock)(),(0,e.createElementBlock)("div",{key:0,class:"cqc-loading-mask",onTouchmove:c[0]||(c[0]=(0,e.withModifiers)((()=>{}),["stop","prevent"]))},null,32)):(0,e.createCommentVNode)("",!0)],512),[[e.vShow,n.visible]])])),_:1})}var s={setup(){const t=(0,e.reactive)({text:"",mask:!0,visible:!1});return{...(0,e.toRefs)(t)}}},l=n(3744);const u=(0,l.Z)(s,[["render",a]]);var p=u;let d;var f={open(t={}){if(!d){const t=document.createElement("div"),o=(0,e.createApp)(p);d=o.mount(t),d.wrapper=t}d.visible||(d.text=t.text||"",d.mask=t.mask||!0,d.wrapper&&document.body.appendChild(d.wrapper),(0,e.nextTick)((()=>{d.visible=!0})))},close(){d&&(d.visible=!1)}}}(),c=c["default"],c}()}));