import{e as t,h as n,i as e,f as o,k as i}from"./p-2b8e2d69.js";class s{constructor(e){t(this,e),this.autoHide=!0,this.config=n(this,"config")}hostData(){return{class:{[`${e(this)}`]:!0,button:!0,"ion-activatable":!0,"ion-focusable":!0}}}__stencil_render(){const t=e(this),n=this.config.get("menuIcon","menu");return o("ion-menu-toggle",{menu:this.menu,autoHide:this.autoHide},o("button",{type:"button"},o("slot",null,o("ion-icon",{icon:n,mode:t,color:this.color,lazy:!1})),"md"===t&&o("ion-ripple-effect",{type:"unbounded"})))}render(){return o(i,this.hostData(),this.__stencil_render())}static get style(){return":host{--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}button{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px;border:0;outline:none;background:transparent;line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){button{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host-context(ion-toolbar:not(.ion-color)){color:var(--ion-toolbar-color,var(--color))}:host{--color:var(--ion-color-primary,#3880ff);--padding-start:5px;--padding-end:5px}:host(.activated){opacity:.4}ion-icon{font-size:31px}"}}export{s as ion_menu_button};