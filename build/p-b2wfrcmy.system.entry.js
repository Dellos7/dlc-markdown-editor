var __awaiter=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{c(r.next(t))}catch(t){i(t)}}function u(t){try{c(r["throw"](t))}catch(t){i(t)}}function c(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(a,u)}c((r=r.apply(t,e||[])).next())})};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,o,i,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(t){return function(e){return c([t,e])}}function c(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,o&&(i=a[0]&2?o["return"]:a[0]?o["throw"]||((i=o["return"])&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;if(o=0,i)a=[a[0]&2,i.value];switch(a[0]){case 0:case 1:i=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;o=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(i=n.trys,i=i.length>0&&i[i.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){n.label=a[1];break}if(a[0]===6&&n.label<i[1]){n.label=i[1];i=a;break}if(i&&n.label<i[2]){n.label=i[2];n.ops.push(a);break}if(i[2])n.ops.pop();n.trys.pop();continue}a=e.call(t,n)}catch(t){a=[6,t];o=0}finally{r=i=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./p-e7d21f49.system.js","./p-1c4ab2e5.system.js"],function(t,e){"use strict";var n,r,o,i,a;return{setters:[function(t){n=t.e;r=t.f;o=t.g;i=t.k},function(t){a=t.a}],execute:function(){var e=function(){function t(t){n(this,t);this.loaded=false;this.active=false}t.prototype.componentWillLoad=function(){};t.prototype.setActive=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.prepareLazyLoaded()];case 1:t.sent();this.active=true;return[2]}})})};t.prototype.prepareLazyLoaded=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){if(!this.loaded&&this.component!=null){this.loaded=true;try{return[2,a(this.delegate,this.el,this.component,["ion-page"])]}catch(t){console.error(t)}}return[2,undefined]})})};t.prototype.hostData=function(){var t=this,e=t.tab,n=t.active,r=t.component;return{role:"tabpanel","aria-hidden":!n?"true":null,"aria-labelledby":"tab-button-"+e,class:{"ion-page":r===undefined,"tab-hidden":!n}}};t.prototype.__stencil_render=function(){return r("slot",null)};Object.defineProperty(t.prototype,"el",{get:function(){return o(this)},enumerable:true,configurable:true});t.prototype.render=function(){return r(i,this.hostData(),this.__stencil_render())};Object.defineProperty(t,"style",{get:function(){return":host(.tab-hidden){display:none!important}"},enumerable:true,configurable:true});return t}();t("ion_tab",e)}}});