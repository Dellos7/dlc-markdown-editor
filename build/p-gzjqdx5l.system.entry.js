System.register(["./p-e7d21f49.system.js"],function(t,e){"use strict";var i,r,o,n,s,c;return{setters:[function(t){i=t.e;r=t.j;o=t.i;n=t.f;s=t.g;c=t.k}],execute:function(){var e=function(){function t(t){var e=this;i(this,t);this.onLoad=function(){e.ionImgDidLoad.emit()};this.onError=function(){e.ionError.emit()};this.ionImgWillLoad=r(this,"ionImgWillLoad",7);this.ionImgDidLoad=r(this,"ionImgDidLoad",7);this.ionError=r(this,"ionError",7)}t.prototype.srcChanged=function(){this.addIO()};t.prototype.componentDidLoad=function(){this.addIO()};t.prototype.addIO=function(){var t=this;if(this.src===undefined){return}if("IntersectionObserver"in window){this.removeIO();this.io=new IntersectionObserver(function(e){if(e[0].isIntersecting){t.load();t.removeIO()}});this.io.observe(this.el)}else{setTimeout(function(){return t.load()},200)}};t.prototype.load=function(){this.loadError=this.onError;this.loadSrc=this.src;this.ionImgWillLoad.emit()};t.prototype.removeIO=function(){if(this.io){this.io.disconnect();this.io=undefined}};t.prototype.hostData=function(){var t;var e=o(this);return{class:(t={},t[""+e]=true,t)}};t.prototype.__stencil_render=function(){return n("img",{src:this.loadSrc,alt:this.alt,decoding:"async",onLoad:this.onLoad,onError:this.loadError})};Object.defineProperty(t.prototype,"el",{get:function(){return s(this)},enumerable:true,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{src:["srcChanged"]}},enumerable:true,configurable:true});t.prototype.render=function(){return n(c,this.hostData(),this.__stencil_render())};Object.defineProperty(t,"style",{get:function(){return":host{-o-object-fit:contain;object-fit:contain}:host,img{display:block}img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"},enumerable:true,configurable:true});return t}();t("ion_img",e)}}});