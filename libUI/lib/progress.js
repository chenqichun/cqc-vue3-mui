(function(t,r){"object"===typeof exports&&"object"===typeof module?module.exports=r(require("vue")):"function"===typeof define&&define.amd?define(["vue"],r):"object"===typeof exports?exports["cqc"]=r(require("vue")):(t["cqc"]=t["cqc"]||{},t["cqc"]["progress"]=r(t["vue"]))})(self,(function(t){return function(){var r={9662:function(t,r,e){var n=e(7854),o=e(614),i=e(6330),u=n.TypeError;t.exports=function(t){if(o(t))return t;throw u(i(t)+" is not a function")}},6077:function(t,r,e){var n=e(7854),o=e(614),i=n.String,u=n.TypeError;t.exports=function(t){if("object"==typeof t||o(t))return t;throw u("Can't set "+i(t)+" as a prototype")}},9670:function(t,r,e){var n=e(7854),o=e(111),i=n.String,u=n.TypeError;t.exports=function(t){if(o(t))return t;throw u(i(t)+" is not an object")}},1318:function(t,r,e){var n=e(5656),o=e(1400),i=e(6244),u=function(t){return function(r,e,u){var c,a=n(r),f=i(a),s=o(u,f);if(t&&e!=e){while(f>s)if(c=a[s++],c!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},4326:function(t,r,e){var n=e(1702),o=n({}.toString),i=n("".slice);t.exports=function(t){return i(o(t),8,-1)}},648:function(t,r,e){var n=e(7854),o=e(1694),i=e(614),u=e(4326),c=e(5112),a=c("toStringTag"),f=n.Object,s="Arguments"==u(function(){return arguments}()),p=function(t,r){try{return t[r]}catch(e){}};t.exports=o?u:function(t){var r,e,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=p(r=f(t),a))?e:s?u(r):"Object"==(n=u(r))&&i(r.callee)?"Arguments":n}},7741:function(t,r,e){var n=e(1702),o=Error,i=n("".replace),u=function(t){return String(o(t).stack)}("zxcasd"),c=/\n\s*at [^:]*:[^\n]*/,a=c.test(u);t.exports=function(t,r){if(a&&"string"==typeof t&&!o.prepareStackTrace)while(r--)t=i(t,c,"");return t}},9920:function(t,r,e){var n=e(2597),o=e(3887),i=e(1236),u=e(3070);t.exports=function(t,r,e){for(var c=o(r),a=u.f,f=i.f,s=0;s<c.length;s++){var p=c[s];n(t,p)||e&&n(e,p)||a(t,p,f(r,p))}}},8880:function(t,r,e){var n=e(9781),o=e(3070),i=e(9114);t.exports=n?function(t,r,e){return o.f(t,r,i(1,e))}:function(t,r,e){return t[r]=e,t}},9114:function(t){t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},9781:function(t,r,e){var n=e(7293);t.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(t,r,e){var n=e(7854),o=e(111),i=n.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},8113:function(t,r,e){var n=e(5005);t.exports=n("navigator","userAgent")||""},7392:function(t,r,e){var n,o,i=e(7854),u=e(8113),c=i.process,a=i.Deno,f=c&&c.versions||a&&a.version,s=f&&f.v8;s&&(n=s.split("."),o=n[0]>0&&n[0]<4?1:+(n[0]+n[1])),!o&&u&&(n=u.match(/Edge\/(\d+)/),(!n||n[1]>=74)&&(n=u.match(/Chrome\/(\d+)/),n&&(o=+n[1]))),t.exports=o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2914:function(t,r,e){var n=e(7293),o=e(9114);t.exports=!n((function(){var t=Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",o(1,7)),7!==t.stack)}))},2109:function(t,r,e){var n=e(7854),o=e(1236).f,i=e(8880),u=e(1320),c=e(3505),a=e(9920),f=e(4705);t.exports=function(t,r){var e,s,p,l,v,d,y=t.target,h=t.global,b=t.stat;if(s=h?n:b?n[y]||c(y,{}):(n[y]||{}).prototype,s)for(p in r){if(v=r[p],t.noTargetGet?(d=o(s,p),l=d&&d.value):l=s[p],e=f(h?p:y+(b?".":"#")+p,t.forced),!e&&void 0!==l){if(typeof v==typeof l)continue;a(v,l)}(t.sham||l&&l.sham)&&i(v,"sham",!0),u(s,p,v,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(r){return!0}}},2104:function(t,r,e){var n=e(4374),o=Function.prototype,i=o.apply,u=o.call;t.exports="object"==typeof Reflect&&Reflect.apply||(n?u.bind(i):function(){return u.apply(i,arguments)})},4374:function(t,r,e){var n=e(7293);t.exports=!n((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:function(t,r,e){var n=e(4374),o=Function.prototype.call;t.exports=n?o.bind(o):function(){return o.apply(o,arguments)}},6530:function(t,r,e){var n=e(9781),o=e(2597),i=Function.prototype,u=n&&Object.getOwnPropertyDescriptor,c=o(i,"name"),a=c&&"something"===function(){}.name,f=c&&(!n||n&&u(i,"name").configurable);t.exports={EXISTS:c,PROPER:a,CONFIGURABLE:f}},1702:function(t,r,e){var n=e(4374),o=Function.prototype,i=o.bind,u=o.call,c=n&&i.bind(u,u);t.exports=n?function(t){return t&&c(t)}:function(t){return t&&function(){return u.apply(t,arguments)}}},5005:function(t,r,e){var n=e(7854),o=e(614),i=function(t){return o(t)?t:void 0};t.exports=function(t,r){return arguments.length<2?i(n[t]):n[t]&&n[t][r]}},8173:function(t,r,e){var n=e(9662);t.exports=function(t,r){var e=t[r];return null==e?void 0:n(e)}},7854:function(t,r,e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e.g&&e.g)||function(){return this}()||Function("return this")()},2597:function(t,r,e){var n=e(1702),o=e(7908),i=n({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,r){return i(o(t),r)}},3501:function(t){t.exports={}},4664:function(t,r,e){var n=e(9781),o=e(7293),i=e(317);t.exports=!n&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,r,e){var n=e(7854),o=e(1702),i=e(7293),u=e(4326),c=n.Object,a=o("".split);t.exports=i((function(){return!c("z").propertyIsEnumerable(0)}))?function(t){return"String"==u(t)?a(t,""):c(t)}:c},9587:function(t,r,e){var n=e(614),o=e(111),i=e(7674);t.exports=function(t,r,e){var u,c;return i&&n(u=r.constructor)&&u!==e&&o(c=u.prototype)&&c!==e.prototype&&i(t,c),t}},2788:function(t,r,e){var n=e(1702),o=e(614),i=e(5465),u=n(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return u(t)}),t.exports=i.inspectSource},8340:function(t,r,e){var n=e(111),o=e(8880);t.exports=function(t,r){n(r)&&"cause"in r&&o(t,"cause",r.cause)}},9909:function(t,r,e){var n,o,i,u=e(8536),c=e(7854),a=e(1702),f=e(111),s=e(8880),p=e(2597),l=e(5465),v=e(6200),d=e(3501),y="Object already initialized",h=c.TypeError,b=c.WeakMap,g=function(t){return i(t)?o(t):n(t,{})},x=function(t){return function(r){var e;if(!f(r)||(e=o(r)).type!==t)throw h("Incompatible receiver, "+t+" required");return e}};if(u||l.state){var m=l.state||(l.state=new b),w=a(m.get),S=a(m.has),O=a(m.set);n=function(t,r){if(S(m,t))throw new h(y);return r.facade=t,O(m,t,r),r},o=function(t){return w(m,t)||{}},i=function(t){return S(m,t)}}else{var j=v("state");d[j]=!0,n=function(t,r){if(p(t,j))throw new h(y);return r.facade=t,s(t,j,r),r},o=function(t){return p(t,j)?t[j]:{}},i=function(t){return p(t,j)}}t.exports={set:n,get:o,has:i,enforce:g,getterFor:x}},614:function(t){t.exports=function(t){return"function"==typeof t}},4705:function(t,r,e){var n=e(7293),o=e(614),i=/#|\.prototype\./,u=function(t,r){var e=a[c(t)];return e==s||e!=f&&(o(r)?n(r):!!r)},c=u.normalize=function(t){return String(t).replace(i,".").toLowerCase()},a=u.data={},f=u.NATIVE="N",s=u.POLYFILL="P";t.exports=u},111:function(t,r,e){var n=e(614);t.exports=function(t){return"object"==typeof t?null!==t:n(t)}},1913:function(t){t.exports=!1},2190:function(t,r,e){var n=e(7854),o=e(5005),i=e(614),u=e(7976),c=e(3307),a=n.Object;t.exports=c?function(t){return"symbol"==typeof t}:function(t){var r=o("Symbol");return i(r)&&u(r.prototype,a(t))}},6244:function(t,r,e){var n=e(7466);t.exports=function(t){return n(t.length)}},133:function(t,r,e){var n=e(7392),o=e(7293);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},8536:function(t,r,e){var n=e(7854),o=e(614),i=e(2788),u=n.WeakMap;t.exports=o(u)&&/native code/.test(i(u))},6277:function(t,r,e){var n=e(1340);t.exports=function(t,r){return void 0===t?arguments.length<2?"":r:n(t)}},3070:function(t,r,e){var n=e(7854),o=e(9781),i=e(4664),u=e(3353),c=e(9670),a=e(4948),f=n.TypeError,s=Object.defineProperty,p=Object.getOwnPropertyDescriptor,l="enumerable",v="configurable",d="writable";r.f=o?u?function(t,r,e){if(c(t),r=a(r),c(e),"function"===typeof t&&"prototype"===r&&"value"in e&&d in e&&!e[d]){var n=p(t,r);n&&n[d]&&(t[r]=e.value,e={configurable:v in e?e[v]:n[v],enumerable:l in e?e[l]:n[l],writable:!1})}return s(t,r,e)}:s:function(t,r,e){if(c(t),r=a(r),c(e),i)try{return s(t,r,e)}catch(n){}if("get"in e||"set"in e)throw f("Accessors not supported");return"value"in e&&(t[r]=e.value),t}},1236:function(t,r,e){var n=e(9781),o=e(6916),i=e(5296),u=e(9114),c=e(5656),a=e(4948),f=e(2597),s=e(4664),p=Object.getOwnPropertyDescriptor;r.f=n?p:function(t,r){if(t=c(t),r=a(r),s)try{return p(t,r)}catch(e){}if(f(t,r))return u(!o(i.f,t,r),t[r])}},8006:function(t,r,e){var n=e(6324),o=e(748),i=o.concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return n(t,i)}},5181:function(t,r){r.f=Object.getOwnPropertySymbols},7976:function(t,r,e){var n=e(1702);t.exports=n({}.isPrototypeOf)},6324:function(t,r,e){var n=e(1702),o=e(2597),i=e(5656),u=e(1318).indexOf,c=e(3501),a=n([].push);t.exports=function(t,r){var e,n=i(t),f=0,s=[];for(e in n)!o(c,e)&&o(n,e)&&a(s,e);while(r.length>f)o(n,e=r[f++])&&(~u(s,e)||a(s,e));return s}},5296:function(t,r){"use strict";var e={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!e.call({1:2},1);r.f=o?function(t){var r=n(this,t);return!!r&&r.enumerable}:e},7674:function(t,r,e){var n=e(1702),o=e(9670),i=e(6077);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,e={};try{t=n(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set),t(e,[]),r=e instanceof Array}catch(u){}return function(e,n){return o(e),i(n),r?t(e,n):e.__proto__=n,e}}():void 0)},2140:function(t,r,e){var n=e(7854),o=e(6916),i=e(614),u=e(111),c=n.TypeError;t.exports=function(t,r){var e,n;if("string"===r&&i(e=t.toString)&&!u(n=o(e,t)))return n;if(i(e=t.valueOf)&&!u(n=o(e,t)))return n;if("string"!==r&&i(e=t.toString)&&!u(n=o(e,t)))return n;throw c("Can't convert object to primitive value")}},3887:function(t,r,e){var n=e(5005),o=e(1702),i=e(8006),u=e(5181),c=e(9670),a=o([].concat);t.exports=n("Reflect","ownKeys")||function(t){var r=i.f(c(t)),e=u.f;return e?a(r,e(t)):r}},2626:function(t,r,e){var n=e(3070).f;t.exports=function(t,r,e){e in t||n(t,e,{configurable:!0,get:function(){return r[e]},set:function(t){r[e]=t}})}},1320:function(t,r,e){var n=e(7854),o=e(614),i=e(2597),u=e(8880),c=e(3505),a=e(2788),f=e(9909),s=e(6530).CONFIGURABLE,p=f.get,l=f.enforce,v=String(String).split("String");(t.exports=function(t,r,e,a){var f,p=!!a&&!!a.unsafe,d=!!a&&!!a.enumerable,y=!!a&&!!a.noTargetGet,h=a&&void 0!==a.name?a.name:r;o(e)&&("Symbol("===String(h).slice(0,7)&&(h="["+String(h).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),(!i(e,"name")||s&&e.name!==h)&&u(e,"name",h),f=l(e),f.source||(f.source=v.join("string"==typeof h?h:""))),t!==n?(p?!y&&t[r]&&(d=!0):delete t[r],d?t[r]=e:u(t,r,e)):d?t[r]=e:c(r,e)})(Function.prototype,"toString",(function(){return o(this)&&p(this).source||a(this)}))},4488:function(t,r,e){var n=e(7854),o=n.TypeError;t.exports=function(t){if(void 0==t)throw o("Can't call method on "+t);return t}},3505:function(t,r,e){var n=e(7854),o=Object.defineProperty;t.exports=function(t,r){try{o(n,t,{value:r,configurable:!0,writable:!0})}catch(e){n[t]=r}return r}},6200:function(t,r,e){var n=e(2309),o=e(9711),i=n("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,r,e){var n=e(7854),o=e(3505),i="__core-js_shared__",u=n[i]||o(i,{});t.exports=u},2309:function(t,r,e){var n=e(1913),o=e(5465);(t.exports=function(t,r){return o[t]||(o[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.22.2",mode:n?"pure":"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE",source:"https://github.com/zloirock/core-js"})},1400:function(t,r,e){var n=e(9303),o=Math.max,i=Math.min;t.exports=function(t,r){var e=n(t);return e<0?o(e+r,0):i(e,r)}},5656:function(t,r,e){var n=e(8361),o=e(4488);t.exports=function(t){return n(o(t))}},9303:function(t){var r=Math.ceil,e=Math.floor;t.exports=function(t){var n=+t;return n!==n||0===n?0:(n>0?e:r)(n)}},7466:function(t,r,e){var n=e(9303),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},7908:function(t,r,e){var n=e(7854),o=e(4488),i=n.Object;t.exports=function(t){return i(o(t))}},7593:function(t,r,e){var n=e(7854),o=e(6916),i=e(111),u=e(2190),c=e(8173),a=e(2140),f=e(5112),s=n.TypeError,p=f("toPrimitive");t.exports=function(t,r){if(!i(t)||u(t))return t;var e,n=c(t,p);if(n){if(void 0===r&&(r="default"),e=o(n,t,r),!i(e)||u(e))return e;throw s("Can't convert object to primitive value")}return void 0===r&&(r="number"),a(t,r)}},4948:function(t,r,e){var n=e(7593),o=e(2190);t.exports=function(t){var r=n(t,"string");return o(r)?r:r+""}},1694:function(t,r,e){var n=e(5112),o=n("toStringTag"),i={};i[o]="z",t.exports="[object z]"===String(i)},1340:function(t,r,e){var n=e(7854),o=e(648),i=n.String;t.exports=function(t){if("Symbol"===o(t))throw TypeError("Cannot convert a Symbol value to a string");return i(t)}},6330:function(t,r,e){var n=e(7854),o=n.String;t.exports=function(t){try{return o(t)}catch(r){return"Object"}}},9711:function(t,r,e){var n=e(1702),o=0,i=Math.random(),u=n(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+u(++o+i,36)}},3307:function(t,r,e){var n=e(133);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,r,e){var n=e(9781),o=e(7293);t.exports=n&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},5112:function(t,r,e){var n=e(7854),o=e(2309),i=e(2597),u=e(9711),c=e(133),a=e(3307),f=o("wks"),s=n.Symbol,p=s&&s["for"],l=a?s:s&&s.withoutSetter||u;t.exports=function(t){if(!i(f,t)||!c&&"string"!=typeof f[t]){var r="Symbol."+t;c&&i(s,t)?f[t]=s[t]:f[t]=a&&p?p(r):l(r)}return f[t]}},9191:function(t,r,e){"use strict";var n=e(5005),o=e(2597),i=e(8880),u=e(7976),c=e(7674),a=e(9920),f=e(2626),s=e(9587),p=e(6277),l=e(8340),v=e(7741),d=e(2914),y=e(9781),h=e(1913);t.exports=function(t,r,e,b){var g="stackTraceLimit",x=b?2:1,m=t.split("."),w=m[m.length-1],S=n.apply(null,m);if(S){var O=S.prototype;if(!h&&o(O,"cause")&&delete O.cause,!e)return S;var j=n("Error"),k=r((function(t,r){var e=p(b?r:t,void 0),n=b?new S(t):new S;return void 0!==e&&i(n,"message",e),d&&i(n,"stack",v(n.stack,2)),this&&u(O,this)&&s(n,this,k),arguments.length>x&&l(n,arguments[x]),n}));if(k.prototype=O,"Error"!==w?c?c(k,j):a(k,j,{name:!0}):y&&g in S&&(f(k,S,g),f(k,S,"prepareStackTrace")),a(k,S),!h)try{O.name!==w&&i(O,"name",w),O.constructor=k}catch(E){}return k}}},1703:function(t,r,e){var n=e(2109),o=e(7854),i=e(2104),u=e(9191),c="WebAssembly",a=o[c],f=7!==Error("e",{cause:7}).cause,s=function(t,r){var e={};e[t]=u(t,r,f),n({global:!0,forced:f},e)},p=function(t,r){if(a&&a[t]){var e={};e[t]=u(c+"."+t,r,f),n({target:c,stat:!0,forced:f},e)}};s("Error",(function(t){return function(r){return i(t,this,arguments)}})),s("EvalError",(function(t){return function(r){return i(t,this,arguments)}})),s("RangeError",(function(t){return function(r){return i(t,this,arguments)}})),s("ReferenceError",(function(t){return function(r){return i(t,this,arguments)}})),s("SyntaxError",(function(t){return function(r){return i(t,this,arguments)}})),s("TypeError",(function(t){return function(r){return i(t,this,arguments)}})),s("URIError",(function(t){return function(r){return i(t,this,arguments)}})),p("CompileError",(function(t){return function(r){return i(t,this,arguments)}})),p("LinkError",(function(t){return function(r){return i(t,this,arguments)}})),p("RuntimeError",(function(t){return function(r){return i(t,this,arguments)}}))},441:function(r){"use strict";r.exports=t}},e={};function n(t){var o=e[t];if(void 0!==o)return o.exports;var i=e[t]={exports:{}};return r[t](i,i.exports,n),i.exports}!function(){n.d=function(t,r){for(var e in r)n.o(r,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:r[e]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)}}();var o={};return function(){"use strict";n.d(o,{default:function(){return u}});var t=n(441);function r(r){const e=(0,t.computed)((()=>(r.strokeWidth/r.width*100).toFixed(1))),n=(0,t.computed)((()=>"circle"===r.type||"dashboard"===r.type?parseInt(50-parseFloat(e.value)/2,10):0)),o=(0,t.computed)((()=>{const t=n.value,e="dashboard"===r.type;return`\n      M 50 50\n      m 0 ${e?"":"-"}${t}\n      a ${t} ${t} 0 1 1 0 ${e?"-":""}${2*t}\n      a ${t} ${t} 0 1 1 0 ${e?"":"-"}${2*t}\n      `})),i=(0,t.computed)((()=>2*Math.PI*n.value)),u=(0,t.computed)((()=>"dashboard"===r.type?.75:1)),c=(0,t.computed)((()=>{const t=-1*i.value*(1-u.value)/2;return`${t}px`})),a=(0,t.computed)((()=>({strokeDasharray:`${i.value*u.value}px, ${i.value}px`,strokeDashoffset:c.value}))),f=(0,t.computed)((()=>{let t=r.percentage;return t>100&&(t=100),t<0&&(t=0),{strokeDasharray:`${i.value*u.value*(t/100)}px, ${i.value}px`,strokeDashoffset:c.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"}}));return{trackPath:o,trailPathStyle:a,circlePathStyle:f,relativeStrokeWidth:e}}n(1703);var e={type:{type:String,default:"line",validator(t){const r=["line","circle","dashboard"];if(t&&!r.includes(t))throw new Error(`cqc-button的type属性必须为:${r.join(",")}中的一个`);return!0}},percentage:{type:Number,default:0},strokeWidth:{type:Number,default:6},width:{type:Number,default:50},color:{type:String,default:"#409EFF"},bgColor:{type:String,default:"#ebeef5"},radius:{type:Boolean,default:!0},showText:{type:Boolean,default:!0},textPosition:{type:String,default:"center"},strokeLinecap:{type:String,default:"round"}},i={name:"CqcProgress",props:e,setup(e,{slots:n}){const o=(0,t.ref)(null),{percentage:i}=(0,t.toRefs)(e);let u=0;const c=(0,t.reactive)({height:e.strokeWidth+"px",backgroundColor:e.bgColor,borderRadius:e.radius?e.strokeWidth+"px":0}),a=(0,t.reactive)({backgroundColor:e.color,borderRadius:e.radius?e.strokeWidth+"px":0}),f=(0,t.computed)((()=>["cqc-progress-text","cqc-progress-text-"+e.textPosition])),s=t=>{t>100&&(t=100),t<0&&(t=0),a.width=parseInt(t/100*u)+"px"},{trackPath:p,trailPathStyle:l,circlePathStyle:v,relativeStrokeWidth:d}=r(e);return(0,t.watch)(i,(t=>s(t))),(0,t.onMounted)((()=>{(0,t.nextTick)((()=>{o.value&&(u=o.value.clientWidth,s(i.value))}))})),()=>"line"===e.type?(0,t.createVNode)("div",{class:"cqc-progress",style:c,ref:o},[(0,t.createVNode)("div",{class:"cqc-progress-bar",style:a},[e.showText&&(0,t.createVNode)("div",{class:f.value},[n.default?n.default():e.percentage+"%"])])]):(0,t.createVNode)("div",{class:"cqc-progress",style:{height:e.width+"px",width:e.width+"px"}},[(0,t.createVNode)("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100"},[(0,t.createVNode)("path",{d:p.value,stroke:e.bgColor,"stroke-width":e.strokeWidth,fill:"none",style:l.value},null),(0,t.createVNode)("path",{d:p.value,stroke:e.color,fill:"none","stroke-linecap":e.strokeLinecap,"stroke-width":e.percentage?d.value:0,style:v.value},null)]),e.showText&&(0,t.createVNode)("div",{class:"cqc-track-text"},[n.default?n.default():e.percentage+"%"])])},install:t=>t.component(i.name,i)},u=i}(),o=o["default"],o}()}));