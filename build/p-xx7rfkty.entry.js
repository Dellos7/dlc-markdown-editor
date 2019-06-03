import{e as i,j as t,h as e,i as s,g as n,f as a,k as h}from"./p-2b8e2d69.js";const l="split-pane-main",r="split-pane-side",o={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",never:""};class d{constructor(s){i(this,s),this.visible=!1,this.disabled=!1,this.when=o.lg,this.ionSplitPaneVisible=t(this,"ionSplitPaneVisible",7),this.isServer=e(this,"isServer"),this.win=e(this,"window")}visibleChanged(i){const t={visible:i,isPane:this.isPane.bind(this)};this.ionSplitPaneVisible.emit(t)}componentDidLoad(){this.styleChildren(),this.updateState()}componentDidUnload(){this.rmL&&(this.rmL(),this.rmL=void 0)}updateState(){if(this.isServer)return;if(this.rmL&&(this.rmL(),this.rmL=void 0),this.disabled)return void(this.visible=!1);const i=this.when;if("boolean"==typeof i)return void(this.visible=i);const t=o[i]||i;if(0!==t.length){if(this.win.matchMedia){const i=i=>{this.visible=i.matches},e=this.win.matchMedia(t);e.addListener(i),this.rmL=()=>e.removeListener(i),this.visible=e.matches}}else this.visible=!1}isPane(i){return!!this.visible&&i.parentElement===this.el&&i.classList.contains(r)}styleChildren(){if(this.isServer)return;const i=this.contentId,t=this.el.children,e=this.el.childElementCount;let s=!1;for(let n=0;n<e;n++){const e=t[n],a=void 0!==i?e.id===i:e.hasAttribute("main");if(a){if(s)return void console.warn("split pane cannot have more than one main node");s=!0}p(e,a)}s||console.warn("split pane does not have a specified main node")}hostData(){const i=s(this);return{class:{[`${i}`]:!0,[`split-pane-${i}`]:!0,"split-pane-visible":this.visible}}}get el(){return n(this)}static get watchers(){return{visible:["visibleChanged"],disabled:["updateState"],when:["updateState"]}}render(){return a(h,this.hostData())}static get style(){return"ion-split-pane{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}.split-pane-visible>.split-pane-main,.split-pane-visible>.split-pane-side{left:0;right:0;top:0;bottom:0;position:relative;-ms-flex:1;flex:1;-webkit-box-shadow:none!important;box-shadow:none!important;z-index:0}.split-pane-visible>.split-pane-side:not(ion-menu),.split-pane-visible>ion-menu.split-pane-side.menu-enabled{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}.split-pane-side:not(ion-menu){display:none}.split-pane-visible>.split-pane-side{-ms-flex-order:-1;order:-1}.split-pane-visible>.split-pane-side[side=end]{-ms-flex-order:1;order:1}.split-pane-ios{--border:0.55px solid var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.split-pane-ios.split-pane-visible>.split-pane-side{min-width:270px;max-width:28%;border-right:var(--border);border-left:0}.split-pane-ios.split-pane-visible>.split-pane-side[side=end]{min-width:270px;max-width:28%;border-right:0;border-left:var(--border)}"}}function p(i,t){let e,s;t?(e=l,s=r):(e=r,s=l);const n=i.classList;n.add(e),n.remove(s)}export{d as ion_split_pane};