import{m as n,n as t}from"./p-2b8e2d69.js";function e(e){e.addEventListener("statusTap",()=>{n(()=>{const n=e.document.elementFromPoint(e.innerWidth/2,e.innerHeight/2);if(!n)return;const o=n.closest("ion-content");o&&o.componentOnReady().then(()=>{t(()=>o.scrollToTop(300))})})})}export{e as startStatusTap};