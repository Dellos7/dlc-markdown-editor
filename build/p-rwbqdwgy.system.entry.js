System.register(["./p-e7d21f49.system.js","./p-771b9d5a.system.js"],function(t,e){"use strict";var r,n,i,o,s,u,c;return{setters:[function(t){r=t.e;n=t.h;i=t.i;o=t.f;s=t.k},function(t){u=t.b;c=t.c}],execute:function(){var e=function(){function t(t){r(this,t);this.routerDirection="forward";this.win=n(this,"window")}t.prototype.onClick=function(t){u(this.win,this.href,t,this.routerDirection)};t.prototype.hostData=function(){var t;var e=i(this);return{class:Object.assign({},c(this.color),(t={},t[""+e]=true,t["ion-activatable"]=true,t))}};t.prototype.__stencil_render=function(){return o("a",{href:this.href},o("slot",null))};t.prototype.render=function(){return o(s,this.hostData(),this.__stencil_render())};Object.defineProperty(t,"style",{get:function(){return":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"},enumerable:true,configurable:true});return t}();t("ion_anchor",e)}}});