function n(n,t){return null!==t.closest(n)}function t(n){return"string"==typeof n&&n.length>0?{"ion-color":!0,[`ion-color-${n}`]:!0}:void 0}function r(n){const t={};return function(n){return void 0!==n?(Array.isArray(n)?n:n.split(" ")).filter(n=>null!=n).map(n=>n.trim()).filter(n=>""!==n):[]}(n).forEach(n=>t[n]=!0),t}const o=/^[a-z][a-z0-9+\-.]*:/;async function e(n,t,r,e){if(null!=t&&"#"!==t[0]&&!o.test(t)){const o=n.document.querySelector("ion-router");if(o)return null!=r&&r.preventDefault(),await o.componentOnReady(),o.push(t,e)}return!1}export{r as a,e as b,t as c,n as d};