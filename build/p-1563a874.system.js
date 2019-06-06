System.register([],function(t,e){"use strict";return{execute:function(){t("scopeCss",e);function e(t,e,n){var o=new r;return o.shimCssText(t,e,e+"-h",e+"-s",n)}var r=function(){function t(){this.strictStyling=true}t.prototype.shimCssText=function(t,e,r,n,o){if(r===void 0){r=""}if(n===void 0){n=""}if(o===void 0){o=false}var s=C(t);t=x(t);var c=[];if(o){var i=function(t){var e="/*!@___"+c.length+"___*/";var r="/*!@"+t.selector+"*/";c.push({placeholder:e,comment:r});t.selector=e+t.selector;return t};t=P(t,function(t){if(t.selector[0]!=="@"){return i(t)}else if(t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")){t.content=P(t.content,i);return t}return t})}var a=this._scopeCssText(t,e,r,n,o);t=[a].concat(s).join("\n");if(o){c.forEach(function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})}return t};t.prototype._scopeCssText=function(t,e,r,n,o){t=this._insertPolyfillHostInCssText(t);t=this._convertColonHost(t);t=this._convertColonHostContext(t);t=this._convertColonSlotted(t,n);t=this._convertShadowDOMSelectors(t);if(e){t=this._scopeSelectors(t,e,r,n,o)}t=t.replace(/-shadowcsshost-no-combinator/g,"."+r);t=t.replace(/>\s*\*\s+([^{, ]+)/gm," $1 ");return t.trim()};t.prototype._convertColonHost=function(t){return this._convertColonRule(t,a,this._colonHostPartReplacer)};t.prototype._convertColonSlotted=function(t,e){var r=p;return t.replace(r,function(){var t=[];for(var r=0;r<arguments.length;r++){t[r]=arguments[r]}if(t[2]){var n=t[2].trim();var o=t[3];var s="."+e+" > "+n+o;return s}else{return u+t[3]}})};t.prototype._convertColonHostContext=function(t){return this._convertColonRule(t,l,this._colonHostContextPartReplacer)};t.prototype._convertColonRule=function(t,e,r){return t.replace(e,function(){var t=[];for(var e=0;e<arguments.length;e++){t[e]=arguments[e]}if(t[2]){var n=t[2].split(",");var o=[];for(var s=0;s<n.length;s++){var c=n[s].trim();if(!c)break;o.push(r(u,c,t[3]))}return o.join(",")}else{return u+t[3]}})};t.prototype._colonHostContextPartReplacer=function(t,e,r){if(e.indexOf(o)>-1){return this._colonHostPartReplacer(t,e,r)}else{return t+e+r+", "+e+" "+t+r}};t.prototype._colonHostPartReplacer=function(t,e,r){return t+e.replace(o,"")+r};t.prototype._convertShadowDOMSelectors=function(t){return h.reduce(function(t,e){return t.replace(e," ")},t)};t.prototype._scopeSelectors=function(t,e,r,n,o){var s=this;return P(t,function(t){var c=t.selector;var i=t.content;if(t.selector[0]!=="@"){c=s._scopeSelector(t.selector,e,r,n,s.strictStyling)}else if(t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")){i=s._scopeSelectors(t.content,e,r,n,o)}c=c.replace(/\s{2,}/g," ").trim();return new b(c,i)})};t.prototype._scopeSelector=function(t,e,r,n,o){var s=this;return t.split(",").map(function(t){if(n&&t.indexOf("."+n)>-1){return t.trim()}if(s._selectorNeedsScoping(t,e)){return o?s._applyStrictSelectorScope(t,e,r).trim():s._applySelectorScope(t,e,r).trim()}else{return t.trim()}}).join(", ")};t.prototype._selectorNeedsScoping=function(t,e){var r=this._makeScopeMatcher(e);return!r.test(t)};t.prototype._makeScopeMatcher=function(t){var e=/\[/g;var r=/\]/g;t=t.replace(e,"\\[").replace(r,"\\]");return new RegExp("^("+t+")"+f,"m")};t.prototype._applySelectorScope=function(t,e,r){return this._applySimpleSelectorScope(t,e,r)};t.prototype._applySimpleSelectorScope=function(t,e,r){_.lastIndex=0;if(_.test(t)){var n=this.strictStyling?"."+r:e;return t.replace(v,function(t,e){return e.replace(/([^:]*)(:*)(.*)/,function(t,e,r,o){return e+n+r+o})}).replace(_,n+" ")}return e+" "+t};t.prototype._applyStrictSelectorScope=function(t,e,r){var o=this;var s=/\[is=([^\]]*)\]/g;e=e.replace(s,function(t){var e=[];for(var r=1;r<arguments.length;r++){e[r-1]=arguments[r]}return e[0]});var c="."+e;var i=function(t){var n=t.trim();if(!n){return""}if(t.indexOf(u)>-1){n=o._applySimpleSelectorScope(t,e,r)}else{var s=t.replace(_,"");if(s.length>0){var i=s.match(/([^:]*)(:*)(.*)/);if(i){n=i[1]+c+i[2]+i[3]}}}return n};var a=new n(t);t=a.content();var l="";var p=0;var v;var h=/( |>|\+|~(?!=))\s*/g;var f=t.indexOf(u)>-1;var g=!f;while((v=h.exec(t))!==null){var d=v[1];var S=t.slice(p,v.index).trim();g=g||S.indexOf(u)>-1;var m=g?i(S):S;l+=m+" "+d+" ";p=h.lastIndex}var x=t.substring(p);g=g||x.indexOf(u)>-1;l+=g?i(x):x;return a.restore(l)};t.prototype._insertPolyfillHostInCssText=function(t){t=t.replace(S,c).replace(g,o).replace(d,s);return t};return t}();t("ShadowCss",r);var n=function(){function t(t){var e=this;this.placeholders=[];this.index=0;t=t.replace(/(\[[^\]]*\])/g,function(t,r){var n="__ph-"+e.index+"__";e.placeholders.push(r);e.index++;return n});this._content=t.replace(/(:nth-[-\w]+)(\([^)]+\))/g,function(t,r,n){var o="__ph-"+e.index+"__";e.placeholders.push(n);e.index++;return r+o})}t.prototype.restore=function(t){var e=this;return t.replace(/__ph-(\d+)__/g,function(t,r){return e.placeholders[+r]})};t.prototype.content=function(){return this._content};return t}();var o="-shadowcsshost";var s="-shadowcssslotted";var c="-shadowcsscontext";var i=")(?:\\(("+"(?:\\([^)(]*\\)|[^)(]*)+?"+")\\))?([^,{]*)";var a=new RegExp("("+o+i,"gim");var l=new RegExp("("+c+i,"gim");var p=new RegExp("("+s+i,"gim");var u=o+"-no-combinator";var v=/-shadowcsshost-no-combinator([^\s]*)/;var h=[/::shadow/g,/::content/g];var f="([>\\s~+[.,{:][\\s\\S]*)?$";var _=/-shadowcsshost/gim;var g=/:host/gim;var d=/::slotted/gim;var S=/:host-context/gim;var m=/\/\*\s*[\s\S]*?\*\//g;function x(t){return t.replace(m,"")}var y=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;function C(t){return t.match(y)||[]}var w=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;var R=/([{}])/g;var H="{";var O="}";var W="%BLOCK%";var b=function(){function t(t,e){this.selector=t;this.content=e}return t}();function P(t,e){var r=T(t);var n=0;return r.escapedString.replace(w,function(){var t=[];for(var o=0;o<arguments.length;o++){t[o]=arguments[o]}var s=t[2];var c="";var i=t[4];var a="";if(i&&i.startsWith("{"+W)){c=r.blocks[n++];i=i.substring(W.length+1);a="{"}var l=e(new b(s,c));return""+t[1]+l.selector+t[3]+a+l.content+i})}var j=function(){function t(t,e){this.escapedString=t;this.blocks=e}return t}();function T(t){var e=t.split(R);var r=[];var n=[];var o=0;var s=[];for(var c=0;c<e.length;c++){var i=e[c];if(i===O){o--}if(o>0){s.push(i)}else{if(s.length>0){n.push(s.join(""));r.push(W);s=[]}r.push(i)}if(i===H){o++}}if(s.length>0){n.push(s.join(""));r.push(W)}return new j(r.join(""),n)}}}});