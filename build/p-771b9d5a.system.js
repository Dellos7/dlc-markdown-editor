var __awaiter=this&&this.__awaiter||function(t,n,e,r){return new(e||(e=Promise))(function(u,i){function o(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r["throw"](t))}catch(t){i(t)}}function c(t){t.done?u(t.value):new e(function(n){n(t.value)}).then(o,a)}c((r=r.apply(t,n||[])).next())})};var __generator=this&&this.__generator||function(t,n){var e={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,u,i,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(t){return function(n){return c([t,n])}}function c(o){if(r)throw new TypeError("Generator is already executing.");while(e)try{if(r=1,u&&(i=o[0]&2?u["return"]:o[0]?u["throw"]||((i=u["return"])&&i.call(u),0):u.next)&&!(i=i.call(u,o[1])).done)return i;if(u=0,i)o=[o[0]&2,i.value];switch(o[0]){case 0:case 1:i=o;break;case 4:e.label++;return{value:o[1],done:false};case 5:e.label++;u=o[1];o=[0];continue;case 7:o=e.ops.pop();e.trys.pop();continue;default:if(!(i=e.trys,i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){e.label=o[1];break}if(o[0]===6&&e.label<i[1]){e.label=i[1];i=o;break}if(i&&e.label<i[2]){e.label=i[2];e.ops.push(o);break}if(i[2])e.ops.pop();e.trys.pop();continue}o=n.call(t,e)}catch(t){o=[6,t];u=0}finally{r=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};System.register([],function(t,n){"use strict";return{execute:function(){t({a:u,b:o,c:e,d:n});function n(t,n){return n.closest(t)!==null}function e(t){var n;return typeof t==="string"&&t.length>0?(n={"ion-color":true},n["ion-color-"+t]=true,n):undefined}function r(t){if(t!==undefined){var n=Array.isArray(t)?t:t.split(" ");return n.filter(function(t){return t!=null}).map(function(t){return t.trim()}).filter(function(t){return t!==""})}return[]}function u(t){var n={};r(t).forEach(function(t){return n[t]=true});return n}var i=/^[a-z][a-z0-9+\-.]*:/;function o(t,n,e,r){return __awaiter(this,void 0,void 0,function(){var u;return __generator(this,function(o){switch(o.label){case 0:if(!(n!=null&&n[0]!=="#"&&!i.test(n)))return[3,2];u=t.document.querySelector("ion-router");if(!u)return[3,2];if(e!=null){e.preventDefault()}return[4,u.componentOnReady()];case 1:o.sent();return[2,u.push(n,r)];case 2:return[2,false]}})})}}}});