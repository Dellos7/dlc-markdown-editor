System.register(["./p-d9187714.system.js"],function(e,t){"use strict";var n;return{setters:[function(e){n=e.k}],execute:function(){e("startInputShims",S);var t=new WeakMap;function r(e,n,r,o){if(o===void 0){o=0}if(t.has(e)===r){return}if(r){a(e,n,o)}else{i(e,n)}}function o(e){return e===e.getRootNode().activeElement}function a(e,n,r){var o=n.parentNode;var a=n.cloneNode(false);a.classList.add("cloned-input");a.tabIndex=-1;o.appendChild(a);t.set(e,a);var i=e.ownerDocument;var u=i.dir==="rtl"?9999:-9999;e.style.pointerEvents="none";n.style.transform="translate3d("+u+"px,"+r+"px,0) scale(0)"}function i(e,n){var r=t.get(e);if(r){t.delete(e);r.remove()}e.style.pointerEvents="";n.style.transform=""}function u(e,t,n){if(!n||!t){return function(){return}}var a=function(n){if(o(t)){r(e,t,n)}};var i=function(){return r(e,t,false)};var u=function(){return a(true)};var s=function(){return a(false)};n.addEventListener("ionScrollStart",u);n.addEventListener("ionScrollEnd",s);t.addEventListener("blur",i);return function(){n.removeEventListener("ionScrollStart",u);n.removeEventListener("ionScrollEnd",s);t.addEventListener("ionBlur",i)}}var s="input, textarea, [no-blur]";function f(e){var t=true;var n=false;function r(){n=true}function o(){t=true}function a(r){if(n){n=false;return}var o=e.activeElement;if(!o){return}if(o.matches(s)){return}var a=r.target;if(a===o){return}if(a.matches(s)||a.closest(s)){return}t=false;setTimeout(function(){if(!t){o.blur()}},50)}e.addEventListener("ionScrollStart",r);e.addEventListener("focusin",o,true);e.addEventListener("touchend",a,false);return function(){e.removeEventListener("ionScrollStart",r,true);e.removeEventListener("focusin",o,true);e.removeEventListener("touchend",a,false)}}var v=.3;function l(e,t,n){var r=e.closest("ion-item,[ion-item]")||e;return c(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)}function c(e,t,n,r){var o=e.top;var a=e.bottom;var i=t.top;var u=Math.min(t.bottom,r-n);var s=i+15;var f=u*.5;var l=f-a;var c=s-o;var d=Math.round(l<0?-l:c>0?-c:0);var m=Math.min(d,o-i);var p=Math.abs(m);var E=p/v;var g=Math.min(400,Math.max(150,E));return{scrollAmount:m,scrollDuration:g,scrollPadding:n,inputSafeY:-(o-s)+4}}function d(e,t,r,a){var i;var u=function(e){i=n(e)};var s=function(u){if(!i){return}var s=n(u);if(!p(6,i,s)&&!o(t)){u.preventDefault();u.stopPropagation();m(e,t,r,a)}};e.addEventListener("touchstart",u,true);e.addEventListener("touchend",s,true);return function(){e.removeEventListener("touchstart",u,true);e.removeEventListener("touchend",s,true)}}function m(e,t,n,o){var a=l(e,n,o);if(Math.abs(a.scrollAmount)<4){t.focus();return}r(e,t,true,a.inputSafeY);t.focus();n.scrollByPoint(0,a.scrollAmount,a.scrollDuration).then(function(){r(e,t,false,a.inputSafeY);t.focus()})}function p(e,t,n){if(t&&n){var r=t.x-n.x;var o=t.y-n.y;var a=r*r+o*o;return a>e*e}return false}var E="$ionPaddingTimer";function g(e,t){function n(e){h(e.target,t)}function r(e){h(e.target,0)}e.addEventListener("focusin",n);e.addEventListener("focusout",r);return function(){e.removeEventListener("focusin",n);e.removeEventListener("focusout",r)}}function h(e,t){if(e.tagName!=="INPUT"){return}if(e.parentElement&&e.parentElement.tagName==="ION-INPUT"){return}if(e.parentElement&&e.parentElement.parentElement&&e.parentElement.parentElement.tagName==="ION-SEARCHBAR"){return}var n=e.closest("ion-content");if(n===null){return}var r=n[E];if(r){clearTimeout(r)}if(t>0){n.style.setProperty("--keyboard-offset",t+"px")}else{n[E]=setTimeout(function(){n.style.setProperty("--keyboard-offset","0px")},120)}}var L=true;var y=true;function S(e,t){var n=t.getNumber("keyboardHeight",290);var r=t.getBoolean("scrollAssist",true);var o=t.getBoolean("hideCaretOnScroll",true);var a=t.getBoolean("inputBlurring",true);var i=t.getBoolean("scrollPadding",true);var s=new WeakMap;var v=new WeakMap;function l(e){var t=(e.shadowRoot||e).querySelector("input")||(e.shadowRoot||e).querySelector("textarea");var a=e.closest("ion-content");if(!t){return}if(!!a&&o&&!s.has(e)){var i=u(e,t,a);s.set(e,i)}if(!!a&&r&&!v.has(e)){var i=d(e,t,a,n);v.set(e,i)}}function c(e){if(o){var t=s.get(e);if(t){t()}s.delete(e)}if(r){var t=v.get(e);if(t){t()}v.delete(e)}}if(a&&L){f(e)}if(i&&y){g(e,n)}var m=Array.from(e.querySelectorAll("ion-input, ion-textarea"));for(var p=0,E=m;p<E.length;p++){var h=E[p];l(h)}e.body.addEventListener("ionInputDidLoad",function(e){l(e.target)});e.body.addEventListener("ionInputDidUnload",function(e){c(e.target)})}}}});