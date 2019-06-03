import{e as t,i as s,j as e,h as o,f as i,g as a,k as n}from"./p-2b8e2d69.js";import{f as r,g as c,h as l,e as d}from"./p-be985f93.js";import{c as h,a as u}from"./p-4d735167.js";function m(t,s,e){const o=new t,i=new t,a=s.host||s,n=s.querySelector(".toast-wrapper");switch(i.addElement(n),e){case"top":i.fromTo("translateY","-100%","calc(10px + var(--ion-safe-area-top, 0px))");break;case"middle":const t=Math.floor(a.clientHeight/2-n.clientHeight/2);n.style.top=`${t}px`,i.fromTo("opacity",.01,1);break;default:i.fromTo("translateY","100%","calc(-10px - var(--ion-safe-area-bottom, 0px))")}return Promise.resolve(o.addElement(a).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).add(i))}function p(t,s,e){const o=new t,i=new t,a=s.host||s,n=s.querySelector(".toast-wrapper");switch(i.addElement(n),e){case"top":i.fromTo("translateY","calc(10px + var(--ion-safe-area-top, 0px))","-100%");break;case"middle":i.fromTo("opacity",.99,0);break;default:i.fromTo("translateY","calc(-10px - var(--ion-safe-area-bottom, 0px))","100%")}return Promise.resolve(o.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(i))}function f(t,s,e){const o=new t,i=new t,a=s.host||s,n=s.querySelector(".toast-wrapper");switch(i.addElement(n),e){case"top":n.style.top="calc(8px + var(--ion-safe-area-top, 0px))",i.fromTo("opacity",.01,1);break;case"middle":const t=Math.floor(a.clientHeight/2-n.clientHeight/2);n.style.top=`${t}px`,i.fromTo("opacity",.01,1);break;default:n.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",i.fromTo("opacity",.01,1)}return Promise.resolve(o.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(i))}function b(t,s){const e=new t,o=new t,i=s.host||s,a=s.querySelector(".toast-wrapper");return o.addElement(a),o.fromTo("opacity",.99,0),Promise.resolve(e.addElement(i).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(o))}class v{constructor(i){t(this,i),this.presented=!1,this.mode=s(this),this.duration=0,this.keyboardClose=!1,this.position="bottom",this.showCloseButton=!1,this.translucent=!1,this.animated=!0,this.didPresent=e(this,"ionToastDidPresent",7),this.willPresent=e(this,"ionToastWillPresent",7),this.willDismiss=e(this,"ionToastWillDismiss",7),this.didDismiss=e(this,"ionToastDidDismiss",7),this.config=o(this,"config")}async present(){await r(this,"toastEnter",m,f,this.position),this.duration>0&&(this.durationTimeout=setTimeout(()=>this.dismiss(void 0,"timeout"),this.duration))}dismiss(t,s){return this.durationTimeout&&clearTimeout(this.durationTimeout),c(this,t,s,"toastLeave",p,b,this.position)}onDidDismiss(){return l(this.el,"ionToastDidDismiss")}onWillDismiss(){return l(this.el,"ionToastWillDismiss")}getButtons(){const t=this.buttons?this.buttons.map(t=>"string"==typeof t?{text:t}:t):[];return this.showCloseButton&&t.push({text:this.closeButtonText||"Close",handler:()=>this.dismiss(void 0,"cancel")}),t}async buttonClick(t){const s=t.role;return d(s)?this.dismiss(void 0,s):await this.callButtonHandler(t)?this.dismiss(void 0,t.role):Promise.resolve()}async callButtonHandler(t){if(t&&t.handler)try{if(!1===await t.handler())return!1}catch(t){console.error(t)}return!0}hostData(){const t=s(this);return{style:{zIndex:6e4+this.overlayIndex},class:Object.assign({[`${t}`]:!0},h(this.color),u(this.cssClass),{"toast-translucent":this.translucent})}}renderButtons(t,e){if(0===t.length)return;const o=s(this);return i("div",{class:{"toast-button-group":!0,[`toast-button-group-${e}`]:!0}},t.map(t=>i("button",{type:"button",class:y(t),tabIndex:0,onClick:()=>this.buttonClick(t)},i("div",{class:"toast-button-inner"},t.icon&&i("ion-icon",{name:t.icon,slot:void 0===t.text?"icon-only":void 0,class:"toast-icon"}),t.text),"md"===o&&i("ion-ripple-effect",{type:void 0!==t.icon&&void 0===t.text?"unbounded":"bounded"}))))}__stencil_render(){const t=this.getButtons(),s=t.filter(t=>"start"===t.side),e=t.filter(t=>"start"!==t.side);return i("div",{class:{"toast-wrapper":!0,[`toast-${this.position}`]:!0}},i("div",{class:"toast-container"},this.renderButtons(s,"start"),i("div",{class:"toast-content"},void 0!==this.header&&i("div",{class:"toast-header"},this.header),void 0!==this.message&&i("div",{class:"toast-message"},this.message)),this.renderButtons(e,"end")))}get el(){return a(this)}render(){return i(n,this.hostData(),this.__stencil_render())}static get style(){return":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1000;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper,[dir=rtl] .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-800,#333);--border-radius:4px;--box-shadow:0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12);--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-50,#f2f2f2);--max-width:700px;--start:8px;--end:8px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;opacity:.01;z-index:10}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.toast-content{padding-left:16px;padding-right:16px;padding-top:14px;padding-bottom:14px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-header,.toast-message{line-height:20px}.toast-button-group-start{margin-left:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button-group-start{margin-left:unset;-webkit-margin-start:8px;margin-inline-start:8px}}.toast-button-group-end{margin-right:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button-group-end{margin-right:unset;-webkit-margin-end:8px;margin-inline-end:8px}}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;font-family:var(--ion-font-family);font-size:14px;font-weight:500;letter-spacing:.84px;text-transform:uppercase;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button-cancel{color:var(--ion-color-step-100,#e6e6e6)}.toast-button-icon-only{border-radius:50%;padding-left:9px;padding-right:9px;padding-top:9px;padding-bottom:9px;width:36px;height:36px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button-icon-only{padding-left:unset;padding-right:unset;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px}}\@media (any-hover:hover){.toast-button:hover{background-color:rgba(var(--ion-color-primary-rgb,56,128,255),.08)}.toast-button-cancel:hover{background-color:rgba(var(--ion-background-color-rgb,255,255,255),.08)}}"}}function y(t){return Object.assign({"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text,[`toast-button-${t.role}`]:void 0!==t.role,"ion-focusable":!0,"ion-activatable":!0},u(t.cssClass))}export{v as ion_toast};