var __awaiter=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))(function(i,o){function a(t){try{s(n.next(t))}catch(t){o(t)}}function u(t){try{s(n["throw"](t))}catch(t){o(t)}}function s(t){t.done?i(t.value):new r(function(e){e(t.value)}).then(a,u)}s((n=n.apply(t,e||[])).next())})};var __generator=this&&this.__generator||function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(t){return function(e){return s([t,e])}}function s(a){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:r.label++;return{value:a[1],done:false};case 5:r.label++;i=a[1];a=[0];continue;case 7:a=r.ops.pop();r.trys.pop();continue;default:if(!(o=r.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){r=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){r.label=a[1];break}if(a[0]===6&&r.label<o[1]){r.label=o[1];o=a;break}if(o&&r.label<o[2]){r.label=o[2];r.ops.push(a);break}if(o[2])r.ops.pop();r.trys.pop();continue}a=e.call(t,r)}catch(t){a=[6,t];i=0}finally{n=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./p-e7d21f49.system.js","./p-d9187714.system.js"],function(t,e){"use strict";var r,n,i,o,a;return{setters:[function(t){r=t.e;n=t.j;i=t.h;o=t.g},function(t){a=t.i}],execute:function(){var e="root";var u="forward";var s="back";function h(t){var e=t.filter(function(t){return t.length>0}).join("/");return"/"+e}function f(t){var e=[];for(var r=0,n=t;r<n.length;r++){var i=n[r];for(var o=0,a=i.path;o<a.length;o++){var u=a[o];if(u[0]===":"){var s=i.params&&i.params[u.slice(1)];if(!s){return null}e.push(s)}else if(u!==""){e.push(u)}}}return e}function l(t,e,r,n,i,o){var a=h(d(e).concat(n));if(r){a="#"+a}if(i===u){t.pushState(o,"",a)}else{t.replaceState(o,"",a)}}function c(t,e){if(t.length>e.length){return null}if(t.length<=1&&t[0]===""){return e}for(var r=0;r<t.length;r++){if(t[r].length>0&&t[r]!==e[r]){return null}}if(e.length===t.length){return[""]}return e.slice(t.length)}function v(t,e,r){var n=t.pathname;if(r){var i=t.hash;n=i[0]==="#"?i.slice(1):""}var o=d(e);var a=d(n);return c(o,a)}function d(t){if(t==null){return[""]}var e=t.split("/").map(function(t){return t.trim()}).filter(function(t){return t.length>0});if(e.length===0){return[""]}else{return e}}function p(t){console.group("[ion-core] ROUTES["+t.length+"]");var e=function(t){var e=[];t.forEach(function(t){return e.push.apply(e,t.path)});var r=t.map(function(t){return t.id});console.debug("%c "+h(e),"font-weight: bold; padding-left: 20px","=>\t","("+r.join(", ")+")")};for(var r=0,n=t;r<n.length;r++){var i=n[r];e(i)}console.groupEnd()}function g(t){console.group("[ion-core] REDIRECTS["+t.length+"]");for(var e=0,r=t;e<r.length;e++){var n=r[e];if(n.to){console.debug("FROM: ","$c "+h(n.from),"font-weight: bold"," TO: ","$c "+h(n.to),"font-weight: bold")}}console.groupEnd()}function m(t,r,n,i,o){if(o===void 0){o=false}return __awaiter(this,void 0,void 0,function(){var a,u,s,h;return __generator(this,function(f){switch(f.label){case 0:f.trys.push([0,6,,7]);a=_(t);if(i>=r.length||!a){return[2,o]}return[4,a.componentOnReady()];case 1:f.sent();u=r[i];return[4,a.setRouteId(u.id,u.params,n)];case 2:s=f.sent();if(s.changed){n=e;o=true}return[4,m(s.element,r,n,i+1,o)];case 3:o=f.sent();if(!s.markVisible)return[3,5];return[4,s.markVisible()];case 4:f.sent();f.label=5;case 5:return[2,o];case 6:h=f.sent();console.error(h);return[2,false];case 7:return[2]}})})}function w(t){return __awaiter(this,void 0,void 0,function(){var e,r,n,i;return __generator(this,function(o){switch(o.label){case 0:e=[];n=t;o.label=1;case 1:if(!true)return[3,5];r=_(n);if(!r)return[3,3];return[4,r.getRouteId()];case 2:i=o.sent();if(i){n=i.element;i.element=undefined;e.push(i)}else{return[3,5]}return[3,4];case 3:return[3,5];case 4:return[3,1];case 5:return[2,{ids:e,outlet:r}]}})})}function b(t){if(_(t.document.body)){return Promise.resolve()}return new Promise(function(e){t.addEventListener("ionNavWillLoad",e,{once:true})})}var y=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet";function _(t){if(!t){return undefined}if(t.matches(y)){return t}var e=t.querySelector(y);return e?e:undefined}function R(t,e){var r=e.from,n=e.to;if(n===undefined){return false}if(r.length>t.length){return false}for(var i=0;i<r.length;i++){var o=r[i];if(o==="*"){return true}if(o!==t[i]){return false}}return r.length===t.length}function P(t,e){return e.find(function(e){return R(t,e)})}function S(t,e){var r=Math.min(t.length,e.length);var n=0;for(;n<r;n++){if(t[n].toLowerCase()!==e[n].id){break}}return n}function C(t,e){var r=new O(t);var n=false;var i;for(var o=0;o<e.length;o++){var a=e[o].path;if(a[0]===""){n=true}else{for(var u=0,s=a;u<s.length;u++){var h=s[u];var f=r.next();if(h[0]===":"){if(f===""){return null}i=i||[];var l=i[o]||(i[o]={});l[h.slice(1)]=f}else if(f!==h){return null}}n=false}}var c=n?n===(r.next()===""):true;if(!c){return null}if(i){return e.map(function(t,e){return{id:t.id,path:t.path,params:E(t.params,i[e])}})}return e}function E(t,e){if(!t&&e){return e}else if(t&&!e){return t}else if(t&&e){return Object.assign({},t,e)}return undefined}function N(t,e){var r=null;var n=0;var i=t.map(function(t){return t.id});for(var o=0,a=e;o<a.length;o++){var u=a[o];var s=S(i,u);if(s>n){r=u;n=s}}if(r){return r.map(function(e,r){return{id:e.id,path:e.path,params:E(e.params,t[r]&&t[r].params)}})}return null}function k(t,e){var r=null;var n=0;for(var i=0,o=e;i<o.length;i++){var a=o[i];var u=C(t,a);if(u!==null){var s=L(u);if(s>n){n=s;r=u}}}return r}function L(t){var e=1;var r=1;for(var n=0,i=t;n<i.length;n++){var o=i[n];for(var a=0,u=o.path;a<u.length;a++){var s=u[a];if(s[0]===":"){e+=Math.pow(1,r)}else if(s!==""){e+=Math.pow(2,r)}r++}}return e}var O=function(){function t(t){this.path=t.slice()}t.prototype.next=function(){if(this.path.length>0){return this.path.shift()}return""};return t}();function U(t){return Array.from(t.children).filter(function(t){return t.tagName==="ION-ROUTE-REDIRECT"}).map(function(t){var e=T(t,"to");return{from:d(T(t,"from")),to:e==null?undefined:d(e)}})}function x(t){return W(D(t))}function D(t,e){if(e===void 0){e=t}return Array.from(e.children).filter(function(t){return t.tagName==="ION-ROUTE"&&t.component}).map(function(e){var r=T(e,"component");if(r==null){throw new Error("component missing in ion-route")}return{path:d(T(e,"url")),id:r.toLowerCase(),params:e.componentProps,children:D(t,e)}})}function T(t,e){if(e in t){return t[e]}if(t.hasAttribute(e)){return t.getAttribute(e)}return null}function W(t){var e=[];for(var r=0,n=t;r<n.length;r++){var i=n[r];j([],e,i)}return e}function j(t,e,r){var n=t.slice();n.push({id:r.id,path:r.path,params:r.params});if(r.children.length===0){e.push(n);return}for(var i=0,o=r.children;i<o.length;i++){var a=o[i];j(n,e,a)}}var I=function(){function t(t){r(this,t);this.previousPath=null;this.busy=false;this.state=0;this.lastState=0;this.root="/";this.useHash=true;this.ionRouteWillChange=n(this,"ionRouteWillChange",7);this.ionRouteDidChange=n(this,"ionRouteDidChange",7);this.config=i(this,"config");this.queue=i(this,"queue");this.win=i(this,"window")}t.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:console.debug("[ion-router] router will load");return[4,b(this.win)];case 1:t.sent();console.debug("[ion-router] found nav");return[4,this.onRoutesChanged()];case 2:t.sent();return[2]}})})};t.prototype.componentDidLoad=function(){this.win.addEventListener("ionRouteRedirectChanged",a(this.onRedirectChanged.bind(this),10));this.win.addEventListener("ionRouteDataChanged",a(this.onRoutesChanged.bind(this),100))};t.prototype.onPopState=function(){var t=this.historyDirection();var e=this.getPath();console.debug("[ion-router] URL changed -> update nav",e,t);return this.writeNavStateRoot(e,t)};t.prototype.onBackButton=function(t){var e=this;t.detail.register(0,function(){return e.back()})};t.prototype.push=function(t,e){if(e===void 0){e="forward"}if(t.startsWith(".")){t=new URL(t,this.win.location.href).pathname}console.debug("[ion-router] URL pushed -> updating nav",t,e);var r=d(t);this.setPath(r,e);return this.writeNavStateRoot(r,e)};t.prototype.back=function(){this.win.history.back();return Promise.resolve(this.waitPromise)};t.prototype.printDebug=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){console.debug("CURRENT PATH",this.getPath());console.debug("PREVIOUS PATH",this.previousPath);p(x(this.el));g(U(this.el));return[2]})})};t.prototype.navChanged=function(t){return __awaiter(this,void 0,void 0,function(){var r,n,i,o,a,u;return __generator(this,function(s){switch(s.label){case 0:if(this.busy){console.warn("[ion-router] router is busy, navChanged was cancelled");return[2,false]}return[4,w(this.win.document.body)];case 1:r=s.sent(),n=r.ids,i=r.outlet;o=x(this.el);a=N(n,o);if(!a){console.warn("[ion-router] no matching URL for ",n.map(function(t){return t.id}));return[2,false]}u=f(a);if(!u){console.warn("[ion-router] router could not match path because some required param is missing");return[2,false]}console.debug("[ion-router] nav changed -> update URL",n,u);this.setPath(u,t);return[4,this.safeWriteNavState(i,a,e,u,null,n.length)];case 2:s.sent();return[2,true]}})})};t.prototype.onRedirectChanged=function(){var t=this.getPath();if(t&&P(t,U(this.el))){this.writeNavStateRoot(t,e)}};t.prototype.onRoutesChanged=function(){return this.writeNavStateRoot(this.getPath(),e)};t.prototype.historyDirection=function(){var t=this.win;if(t.history.state===null){this.state++;t.history.replaceState(this.state,t.document.title,t.document.location&&t.document.location.href)}var r=t.history.state;var n=this.lastState;this.lastState=r;if(r>n){return u}else if(r<n){return s}else{return e}};t.prototype.writeNavStateRoot=function(t,e){return __awaiter(this,void 0,void 0,function(){var r,n,i,o,a;return __generator(this,function(u){if(!t){console.error("[ion-router] URL is not part of the routing set");return[2,false]}r=U(this.el);n=P(t,r);i=null;if(n){this.setPath(n.to,e);i=n.from;t=n.to}o=x(this.el);a=k(t,o);if(!a){console.error("[ion-router] the path does not match any route");return[2,false]}return[2,this.safeWriteNavState(this.win.document.body,a,e,t,i)]})})};t.prototype.safeWriteNavState=function(t,e,r,n,i,o){if(o===void 0){o=0}return __awaiter(this,void 0,void 0,function(){var a,u,s;return __generator(this,function(h){switch(h.label){case 0:return[4,this.lock()];case 1:a=h.sent();u=false;h.label=2;case 2:h.trys.push([2,4,,5]);return[4,this.writeNavState(t,e,r,n,i,o)];case 3:u=h.sent();return[3,5];case 4:s=h.sent();console.error(s);return[3,5];case 5:a();return[2,u]}})})};t.prototype.lock=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(r){switch(r.label){case 0:t=this.waitPromise;this.waitPromise=new Promise(function(t){return e=t});if(!(t!==undefined))return[3,2];return[4,t];case 1:r.sent();r.label=2;case 2:return[2,e]}})})};t.prototype.writeNavState=function(t,e,r,n,i,o){if(o===void 0){o=0}return __awaiter(this,void 0,void 0,function(){var a,u;return __generator(this,function(s){switch(s.label){case 0:if(this.busy){console.warn("[ion-router] router is busy, transition was cancelled");return[2,false]}this.busy=true;a=this.routeChangeEvent(n,i);if(a){this.ionRouteWillChange.emit(a)}return[4,m(t,e,r,o)];case 1:u=s.sent();this.busy=false;if(u){console.debug("[ion-router] route changed",n)}if(a){this.ionRouteDidChange.emit(a)}return[2,u]}})})};t.prototype.setPath=function(t,e){this.state++;l(this.win.history,this.root,this.useHash,t,e,this.state)};t.prototype.getPath=function(){return v(this.win.location,this.root,this.useHash)};t.prototype.routeChangeEvent=function(t,e){var r=this.previousPath;var n=h(t);this.previousPath=n;if(n===r){return null}var i=e?h(e):null;return{from:r,redirectedFrom:i,to:n}};Object.defineProperty(t.prototype,"el",{get:function(){return o(this)},enumerable:true,configurable:true});return t}();t("ion_router",I)}}});