import{e as t,i as s,f as r,k as e}from"./p-2b8e2d69.js";class o{constructor(s){t(this,s),this.translucent=!1}hostData(){const t=s(this);return{class:{[`${t}`]:!0,[`footer-${t}`]:!0,"footer-translucent":this.translucent,[`footer-translucent-${t}`]:this.translucent}}}render(){return r(e,this.hostData())}static get style(){return"ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-child{padding-bottom:var(--ion-safe-area-bottom,0)}.footer-ios ion-toolbar:first-child{--border-width:0.55px 0 0}.footer-ios[no-border] ion-toolbar:first-child{--border-width:0}.footer-translucent-ios{-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8;--backdrop-filter:saturate(180%) blur(20px)}"}}export{o as ion_footer};