import{e as t,j as e,i,f as a,g as n,k as s}from"./p-2b8e2d69.js";import{i as o}from"./p-be985f93.js";import{d as r}from"./p-4d735167.js";import{e as l,c as h,d}from"./p-5955c745.js";function u(t,e,i,a){if(t!==V&&t!==I){if(t===H)return void 0!==i&&void 0!==i.hour?i.hour<12?"AM":"PM":e?e.toUpperCase():"";if(t===L)return void 0!==i&&void 0!==i.hour?i.hour<12?"am":"pm":e||"";if(null==e)return"";if(t===C||t===E||t===Y||t===A||t===z||t===B)return S(e);if(t===O)return w(e);if(t===N)return(a.monthNames?a.monthNames:X)[e-1];if(t===F)return(a.monthShortNames?a.monthShortNames:q)[e-1];if(t===_||t===W){if(0===e)return"12";if(e>12&&(e-=12),t===_&&e<10)return"0"+e}return e.toString()}try{return e=new Date(i.year,i.month-1,i.day).getDay(),t===V?(a.dayNames?a.dayNames:R)[e]:(a.dayShortNames?a.dayShortNames:U)[e]}catch(t){}}function m(t,e,i,a=0,n=0){return parseInt(`1${w(t)}${S(e)}${S(i)}${S(a)}${S(n)}`,10)}function c(t){return m(t.year,t.month,t.day,t.hour,t.minute)}const f=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,p=/^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;function y(t){let e=null;if(null!=t&&""!==t&&((e=p.exec(t))?(e.unshift(void 0,void 0),e[2]=e[3]=void 0):e=f.exec(t)),null===e)return;for(let t=1;t<8;t++)e[t]=void 0!==e[t]?parseInt(e[t],10):void 0;let i=0;return e[9]&&e[10]&&(i=60*parseInt(e[10],10),e[11]&&(i+=parseInt(e[11],10)),"-"===e[9]&&(i*=-1)),{year:e[1],month:e[2],day:e[3],hour:e[4],minute:e[5],second:e[6],millisecond:e[7],tzOffset:i}}const g=(t="")=>{null==t&&(t=""),10!==t.length&&7!==t.length||(t+=" ");const e="string"==typeof t&&t.length>0?new Date(t):new Date;return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))};function v(t,e){return e===H||e===L?t.hour<12?"am":"pm":e===_||e===W?t.hour>12?t.hour-12:t.hour:t[x(e)]}function x(t){for(const e in Z)if(Z[e].f===t)return Z[e].k}function M(t){let e="";return void 0!==t.year?(e=w(t.year),void 0!==t.month&&(e+="-"+S(t.month),void 0!==t.day&&(e+="-"+S(t.day),void 0!==t.hour&&(e+=`T${S(t.hour)}:${S(t.minute)}:${S(t.second)}`,t.millisecond>0&&(e+="."+k(t.millisecond)),e+=void 0===t.tzOffset?"Z":(t.tzOffset>0?"+":"-")+S(Math.floor(Math.abs(t.tzOffset/60)))+":"+S(t.tzOffset%60))))):void 0!==t.hour&&(e=S(t.hour)+":"+S(t.minute),void 0!==t.second&&(e+=":"+S(t.second),void 0!==t.millisecond&&(e+="."+k(t.millisecond)))),e}function b(t,e){if(null==t)return;let i;return"string"==typeof t&&(t=t.replace(/\[|\]/g,"").split(",")),Array.isArray(t)&&(i=t.map(t=>t.toString().trim())),void 0!==i&&0!==i.length||console.warn(`Invalid "${e}Names". Must be an array of strings, or a comma separated string.`),i}function D(t,e){let i;return"string"==typeof t&&(t=t.replace(/\[|\]|\s/g,"").split(",")),0===(i=Array.isArray(t)?t.map(t=>parseInt(t,10)).filter(isFinite):[t]).length&&console.warn(`Invalid "${e}Values". Must be an array of numbers, or a comma separated string of numbers.`),i}function S(t){return("0"+(void 0!==t?Math.abs(t):"0")).slice(-2)}function k(t){return("00"+(void 0!==t?Math.abs(t):"0")).slice(-3)}function w(t){return("000"+(void 0!==t?Math.abs(t):"0")).slice(-4)}const O="YYYY",C="YY",N="MMMM",F="MMM",E="MM",T="M",V="DDDD",I="DDD",Y="DD",$="D",A="HH",j="H",_="hh",W="h",z="mm",P="m",B="ss",J="s",H="A",L="a",Z=[{f:O,k:"year"},{f:N,k:"month"},{f:V,k:"day"},{f:F,k:"month"},{f:I,k:"day"},{f:C,k:"year"},{f:E,k:"month"},{f:Y,k:"day"},{f:A,k:"hour"},{f:_,k:"hour"},{f:z,k:"minute"},{f:B,k:"second"},{f:T,k:"month"},{f:$,k:"day"},{f:j,k:"hour"},{f:W,k:"hour"},{f:P,k:"minute"},{f:J,k:"second"},{f:H,k:"ampm"},{f:L,k:"ampm"}],R=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],U=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],X=["January","February","March","April","May","June","July","August","September","October","November","December"],q=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],G=[_,W,z,P,B,J];class K{constructor(i){t(this,i),this.inputId=`ion-dt-${Q++}`,this.locale={},this.datetimeMin={},this.datetimeMax={},this.datetimeValue={},this.isExpanded=!1,this.name=this.inputId,this.disabled=!1,this.readonly=!1,this.displayFormat="MMM D, YYYY",this.cancelText="Cancel",this.doneText="Done",this.onFocus=()=>{this.ionFocus.emit()},this.onBlur=()=>{this.ionBlur.emit()},this.ionCancel=e(this,"ionCancel",7),this.ionChange=e(this,"ionChange",7),this.ionFocus=e(this,"ionFocus",7),this.ionBlur=e(this,"ionBlur",7),this.ionStyle=e(this,"ionStyle",7)}disabledChanged(){this.emitStyle()}valueChanged(){this.updateDatetimeValue(this.value),this.emitStyle(),this.ionChange.emit({value:this.value})}componentWillLoad(){this.locale={monthNames:b(this.monthNames,"monthNames"),monthShortNames:b(this.monthShortNames,"monthShortNames"),dayNames:b(this.dayNames,"dayNames"),dayShortNames:b(this.dayShortNames,"dayShortNames")},this.updateDatetimeValue(this.value),this.emitStyle()}onClick(){this.setFocus(),this.open()}async open(){if(this.disabled||this.isExpanded)return;const t=this.generatePickerOptions(),e=await o.create(t);this.isExpanded=!0,e.onDidDismiss().then(()=>{this.isExpanded=!1,this.setFocus()}),e.addEventListener("ionPickerColChange",async t=>{const i=t.detail,a={};a[i.name]={value:i.options[i.selectedIndex].value},this.updateDatetimeValue(a);const n=this.generateColumns();e.columns=n,await this.validate(e)}),await this.validate(e),await e.present()}emitStyle(){this.ionStyle.emit({interactive:!0,datetime:!0,"has-placeholder":null!=this.placeholder,"has-value":this.hasValue(),"interactive-disabled":this.disabled})}updateDatetimeValue(t){!function(t,e){if(!e||"string"==typeof e){const t=g(e);Number.isNaN(t.getTime())||(e=t.toISOString())}if(e&&""!==e){if("string"==typeof e){if(e=y(e))return Object.assign(t,e),!0}else if(e.year||e.hour||e.month||e.day||e.minute||e.second){e.ampm&&e.hour&&(e.hour.value="pm"===e.ampm.value?12===e.hour.value?12:e.hour.value+12:12===e.hour.value?0:e.hour.value);for(const i of Object.keys(e))t[i]=e[i].value;return!0}console.warn(`Error parsing date: "${e}". Please provide a valid ISO 8601 datetime format: https://www.w3.org/TR/NOTE-datetime`)}else for(const e in t)t.hasOwnProperty(e)&&delete t[e]}(this.datetimeValue,t)}generatePickerOptions(){const t=i(this),e=Object.assign({mode:t},this.pickerOptions,{columns:this.generateColumns()}),a=e.buttons;return a&&0!==a.length||(e.buttons=[{text:this.cancelText,role:"cancel",handler:()=>{this.updateDatetimeValue(this.value),this.ionCancel.emit()}},{text:this.doneText,handler:t=>{this.updateDatetimeValue(t);const e=new Date(M(this.datetimeValue));this.datetimeValue.tzOffset=-1*e.getTimezoneOffset(),this.value=M(this.datetimeValue)}}]),e}generateColumns(){let t=this.pickerFormat||this.displayFormat||tt;if(0===t.length)return[];this.calcMinMax(),-1===(t=t.replace("DDDD","{~}").replace("DDD","{~}")).indexOf("D")&&(t=t.replace("{~}","D"));const e=function(t){const e=[];t=t.replace(/[^\w\s]/gi," "),Z.forEach(e=>{e.f.length>1&&t.indexOf(e.f)>-1&&t.indexOf(e.f+e.f.charAt(0))<0&&(t=t.replace(e.f," "+e.f+" "))});const i=t.split(" ").filter(t=>t.length>0);return i.forEach((t,a)=>{Z.forEach(n=>{if(t===n.f){if((t===H||t===L)&&(e.indexOf(W)<0&&e.indexOf(_)<0||-1===G.indexOf(i[a-1])))return;e.push(t)}})}),e}(t=t.replace(/{~}/g,"")).map(t=>{const e=x(t);let i;const a=(i=this[e+"Values"]?D(this[e+"Values"],e):function(t,e,i){const a=[];if(t===O||t===C){if(void 0===i.year||void 0===e.year)throw new Error("min and max year is undefined");for(let t=i.year;t>=e.year;t--)a.push(t)}else if(t===N||t===F||t===E||t===T||t===_||t===W)for(let t=1;t<13;t++)a.push(t);else if(t===V||t===I||t===Y||t===$)for(let t=1;t<32;t++)a.push(t);else if(t===A||t===j)for(let t=0;t<24;t++)a.push(t);else if(t===z||t===P)for(let t=0;t<60;t++)a.push(t);else if(t===B||t===J)for(let t=0;t<60;t++)a.push(t);else t!==H&&t!==L||a.push("am","pm");return a}(t,this.datetimeMin,this.datetimeMax)).map(e=>({value:e,text:u(t,e,void 0,this.locale)})),n=function(t,e){const i=v(t,e);return void 0!==i?i:v(y((new Date).toISOString()),e)}(this.datetimeValue,t),s=a.findIndex(t=>t.value===n);return{name:e,selectedIndex:s>=0?s:0,options:a}}),i=this.datetimeMin,a=this.datetimeMax;return["month","day","hour","minute"].filter(t=>!e.find(e=>e.name===t)).forEach(t=>{i[t]=0,a[t]=0}),function(t){const e=[];let i,a;for(let n=0;n<t.length;n++){i=t[n],e.push(0);for(const t of i.options)(a=t.text.length)>e[n]&&(e[n]=a)}return 2===e.length?(a=Math.max(e[0],e[1]),t[0].align="right",t[1].align="left",t[0].optionsWidth=t[1].optionsWidth=`${17*a}px`):3===e.length&&(a=Math.max(e[0],e[2]),t[0].align="right",t[1].columnWidth=`${17*e[1]}px`,t[0].optionsWidth=t[2].optionsWidth=`${17*a}px`,t[2].align="left"),t}(e)}async validate(t){const e=new Date,i=c(this.datetimeMin),a=c(this.datetimeMax),n=await t.getColumn("year");let s=e.getFullYear();if(n){n.options.find(t=>t.value===e.getFullYear())||(s=n.options[0].value);const t=n.selectedIndex;if(void 0!==t){const e=n.options[t];e&&(s=e.value)}}const o=await this.validateColumn(t,"month",1,i,a,[s,0,0,0,0],[s,12,31,23,59]),r=4===(l=o)||6===l||9===l||11===l?30:2===l?function(t){return t%4==0&&t%100!=0||t%400==0}(s)?29:28:31;var l;const h=await this.validateColumn(t,"day",2,i,a,[s,o,0,0,0],[s,o,r,23,59]),d=await this.validateColumn(t,"hour",3,i,a,[s,o,h,0,0],[s,o,h,23,59]);await this.validateColumn(t,"minute",4,i,a,[s,o,h,d,0],[s,o,h,d,59])}calcMinMax(){const t=(new Date).getFullYear();if(void 0!==this.yearValues){const t=D(this.yearValues,"year");void 0===this.min&&(this.min=Math.min(...t).toString()),void 0===this.max&&(this.max=Math.max(...t).toString())}else void 0===this.min&&(this.min=(t-100).toString()),void 0===this.max&&(this.max=t.toString());const e=this.datetimeMin=y(this.min),i=this.datetimeMax=y(this.max);e.year=e.year||t,i.year=i.year||t,e.month=e.month||1,i.month=i.month||12,e.day=e.day||1,i.day=i.day||31,e.hour=e.hour||0,i.hour=i.hour||23,e.minute=e.minute||0,i.minute=i.minute||59,e.second=e.second||0,i.second=i.second||59,e.year>i.year&&(console.error("min.year > max.year"),e.year=i.year-100),e.year===i.year&&(e.month>i.month?(console.error("min.month > max.month"),e.month=1):e.month===i.month&&e.day>i.day&&(console.error("min.day > max.day"),e.day=1))}async validateColumn(t,e,i,a,n,s,o){const r=await t.getColumn(e);if(!r)return 0;const h=s.slice(),d=o.slice(),u=r.options;let c=u.length-1,f=0;for(let t=0;t<u.length;t++){const e=u[t],r=e.value;h[i]=e.value,d[i]=e.value,(e.disabled=r<s[i]||r>o[i]||m(d[0],d[1],d[2],d[3],d[4])<a||m(h[0],h[1],h[2],h[3],h[4])>n)||(c=Math.min(c,t),f=Math.max(f,t))}const p=r.selectedIndex=l(c,r.selectedIndex,f),y=r.options[p];return y?y.value:0}getText(){if(null!=this.value&&0!==this.value.length)return function(t,e,i){if(void 0===e)return;const a=[];let n=!1;if(Z.forEach((s,o)=>{if(t.indexOf(s.f)>-1){const r="{"+o+"}",l=u(s.f,e[s.k],e,i);n||void 0===l||null==e[s.k]||(n=!0),a.push(r,l||""),t=t.replace(s.f,r)}}),n){for(let e=0;e<a.length;e+=2)t=t.replace(a[e],a[e+1]);return t}}(this.displayFormat||this.pickerFormat||tt,this.datetimeValue,this.locale)}hasValue(){return Object.keys(this.datetimeValue).length>0}setFocus(){this.buttonEl&&this.buttonEl.focus()}hostData(){const{inputId:t,disabled:e,readonly:a,isExpanded:n,el:s,placeholder:o}=this,l=i(this),d=void 0===this.getText()&&null!=o,u=t+"-lbl",m=h(s);return m&&(m.id=u),{role:"combobox","aria-disabled":e?"true":null,"aria-expanded":`${n}`,"aria-haspopup":"true","aria-labelledby":u,class:{[`${l}`]:!0,"datetime-disabled":e,"datetime-readonly":a,"datetime-placeholder":d,"in-item":r("ion-item",s)}}}__stencil_render(){let t=this.getText();return void 0===t&&(t=null!=this.placeholder?this.placeholder:""),d(!0,this.el,this.name,this.value,this.disabled),[a("div",{class:"datetime-text"},t),a("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled,ref:t=>this.buttonEl=t})]}get el(){return n(this)}static get watchers(){return{disabled:["disabledChanged"],value:["valueChanged"]}}render(){return a(s,this.hostData(),this.__stencil_render())}static get style(){return":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;min-width:16px;min-height:1.2em;font-family:var(--ion-font-family,inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static}:host(.datetime-placeholder){color:var(--placeholder-color)}:host(.datetime-disabled){opacity:.3;pointer-events:none}:host(.datetime-readonly){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.datetime-text{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-ms-flex:1;flex:1;min-height:inherit;direction:ltr;overflow:inherit}:host-context([dir=rtl]) .datetime-text,[dir=rtl] .datetime-text{direction:rtl}:host{--placeholder-color:var(--ion-color-step-400,#999);--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}"}}let Q=0;const tt="MMM D, YYYY";export{K as ion_datetime};