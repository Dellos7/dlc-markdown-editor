System.register([],function(e,t){"use strict";return{execute:function(){e({a:t,b:n,c:r,d:i,e:a,f:d,g:l,h:u,i:f,j:o,k:c});function t(e){if("requestIdleCallback"in window){window.requestIdleCallback(e)}else{setTimeout(e,32)}}function n(e){return!!e.shadowRoot&&!!e.attachShadow}function r(e){var t=e.closest("ion-item");if(t){return t.querySelector("ion-label")}return null}function i(e,t,r,i,a){if(e||n(t)){var u=t.querySelector("input.aux-input");if(!u){u=t.ownerDocument.createElement("input");u.type="hidden";u.classList.add("aux-input");t.appendChild(u)}u.disabled=a;u.name=r;u.value=i||""}}function a(e,t,n){return Math.max(e,Math.min(t,n))}function u(e,t){if(!e){var n="ASSERT: "+t;console.error(n);debugger;throw new Error(n)}}function o(e){return e.timeStamp||Date.now()}function c(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}if(e.pageX!==undefined){return{x:e.pageX,y:e.pageY}}}return{x:0,y:0}}function l(e,t){var n=e.document.dir==="rtl";switch(t){case"start":return n;case"end":return!n;default:throw new Error('"'+t+'" is not a valid value for [side]. Use "start" or "end" instead.')}}function d(e,t){var n=e._original||e;return{_original:e,emit:f(n.emit.bind(n),t)}}function f(e,t){if(t===void 0){t=0}var n;return function(){var r=[];for(var i=0;i<arguments.length;i++){r[i]=arguments[i]}clearTimeout(n);n=setTimeout.apply(void 0,[e,t].concat(r))}}}}});