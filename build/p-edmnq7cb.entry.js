import{e as t,i as s,f as r,k as e}from"./p-2b8e2d69.js";import{c as a}from"./p-4d735167.js";class n{constructor(s){t(this,s),this.translucent=!1}hostData(){const t=s(this);return{class:Object.assign({},a(this.color),{"card-header-translucent":this.translucent,[`${t}`]:!0})}}__stencil_render(){return r("slot",null)}render(){return r(e,this.hostData(),this.__stencil_render())}static get style(){return":host{display:block;position:relative;background:var(--background);color:var(--color)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) ::slotted(ion-card-subtitle),:host(.ion-color) ::slotted(ion-card-title){color:currentColor}:host{padding-left:16px;padding-right:16px;padding-top:16px;padding-bottom:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}::slotted(ion-card-subtitle:not(:first-child)),::slotted(ion-card-title:not(:first-child)){margin-top:8px}"}}export{n as ion_card_header};