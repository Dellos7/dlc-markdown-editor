System.register(["./p-e7d21f49.system.js"],function(t,e){"use strict";var i,n,o,r,s,u;return{setters:[function(t){i=t.e;n=t.j;o=t.i;r=t.g;s=t.f;u=t.k}],execute:function(){var e=function(){function t(t){i(this,t);this.inputId="ion-selopt-"+c++;this.disabled=false;this.selected=false;this.ionSelectOptionDidLoad=n(this,"ionSelectOptionDidLoad",7);this.ionSelectOptionDidUnload=n(this,"ionSelectOptionDidUnload",7)}t.prototype.componentWillLoad=function(){if(this.value===undefined){this.value=this.el.textContent||""}};t.prototype.componentDidLoad=function(){this.ionSelectOptionDidLoad.emit()};t.prototype.componentDidUnload=function(){this.ionSelectOptionDidUnload.emit()};t.prototype.hostData=function(){var t;var e=o(this);return{role:"option",id:this.inputId,class:(t={},t[""+e]=true,t)}};Object.defineProperty(t.prototype,"el",{get:function(){return r(this)},enumerable:true,configurable:true});t.prototype.render=function(){return s(u,this.hostData())};Object.defineProperty(t,"style",{get:function(){return":host{display:none}"},enumerable:true,configurable:true});return t}();t("ion_select_option",e);var c=0}}});