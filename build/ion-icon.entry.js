import { r as registerInstance, k as getMode, B as Build, h, H as Host, e as getElement, l as getAssetPath } from './dlc-markdown-editor-d387313e.js';

let CACHED_MAP;
const getIconMap = () => {
    if (!CACHED_MAP) {
        const win = window;
        win.Ionicons = win.Ionicons || {};
        CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
};
const addIcons = (icons) => {
    const map = getIconMap();
    Object.keys(icons).forEach(name => {
        map.set(name, icons[name]);
    });
};
const getName = (name, mode, ios, md) => {
    // default to "md" if somehow the mode wasn't set
    mode = (mode || 'md').toLowerCase();
    mode = mode === 'ios' ? 'ios' : 'md';
    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    if (ios && mode === 'ios') {
        name = ios.toLowerCase();
    }
    else if (md && mode === 'md') {
        name = md.toLowerCase();
    }
    else if (name) {
        name = name.toLowerCase();
        if (!/^md-|^ios-|^logo-/.test(name)) {
            // this does not have one of the defaults
            // so lets auto add in the mode prefix for them
            name = `${mode}-${name}`;
        }
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    // only allow alpha characters and dash
    const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return name;
};
const getSrc = (src) => {
    if (typeof src === 'string') {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
};
const isSrc = (str) => {
    return str.length > 0 && /(\/|\.)/.test(str);
};
const isValid = (elm) => {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (let i = 0; i < elm.attributes.length; i++) {
            const val = elm.attributes[i].value;
            if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
};

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Icon {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.mode = getIonMode(this);
        this.isVisible = false;
        /**
         * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
         * Default, `false`.
         */
        this.lazy = false;
    }
    connectedCallback() {
        // purposely do not return the promise here because loading
        // the svg file should not hold up loading the app
        // only load the svg if it's visible
        this.waitUntilVisible(this.el, '50px', () => {
            this.isVisible = true;
            this.loadIcon();
        });
    }
    disconnectedCallback() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    waitUntilVisible(el, rootMargin, cb) {
        if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && window.IntersectionObserver) {
            const io = this.io = new window.IntersectionObserver((data) => {
                if (data[0].isIntersecting) {
                    io.disconnect();
                    this.io = undefined;
                    cb();
                }
            }, { rootMargin });
            io.observe(el);
        }
        else {
            // browser doesn't support IntersectionObserver
            // so just fallback to always show it
            cb();
        }
    }
    loadIcon() {
        if (Build.isBrowser && this.isVisible) {
            const url = this.getUrl();
            if (url) {
                getSvgContent(this.el.ownerDocument, url, 's-ion-icon')
                    .then(svgContent => this.svgContent = svgContent);
            }
            else {
                console.error('icon was not resolved');
            }
        }
        if (!this.ariaLabel) {
            const name = getName(this.getName(), this.mode, this.ios, this.md);
            // user did not provide a label
            // come up with the label based on the icon name
            if (name) {
                this.ariaLabel = name
                    .replace('ios-', '')
                    .replace('md-', '')
                    .replace(/\-/g, ' ');
            }
        }
    }
    getName() {
        if (this.name !== undefined) {
            return this.name;
        }
        if (this.icon && !isSrc(this.icon)) {
            return this.icon;
        }
        return undefined;
    }
    getUrl() {
        let url = getSrc(this.src);
        if (url) {
            return url;
        }
        url = getName(this.getName(), this.mode, this.ios, this.md);
        if (url) {
            return getNamedUrl(url);
        }
        url = getSrc(this.icon);
        if (url) {
            return url;
        }
        return null;
    }
    render() {
        const mode = this.mode || 'md';
        const flipRtl = this.flipRtl || (this.ariaLabel && this.ariaLabel.indexOf('arrow') > -1 && this.flipRtl !== false);
        return (h(Host, { role: "img", class: Object.assign({ [`${mode}`]: true }, createColorClasses(this.color), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': !!flipRtl && this.el.ownerDocument.dir === 'rtl' }) }, ((Build.isBrowser && this.svgContent)
            ? h("div", { class: "icon-inner", innerHTML: this.svgContent })
            : h("div", { class: "icon-inner" }))));
    }
    static get assetsDirs() { return ["svg"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "name": ["loadIcon"],
        "src": ["loadIcon"],
        "icon": ["loadIcon"]
    }; }
    static get style() { return ":host {\n  display: inline-block;\n\n  width: 1em;\n  height: 1em;\n\n  contain: strict;\n\n  fill: currentColor;\n\n  -webkit-box-sizing: content-box !important;\n\n  box-sizing: content-box !important;\n}\n\n.icon-inner,\nsvg {\n  display: block;\n\n  height: 100%;\n  width: 100%;\n}\n\n\n/* Icon RTL\n * -----------------------------------------------------------\n */\n\n:host(.flip-rtl) .icon-inner {\n  -webkit-transform: scaleX(-1);\n  transform: scaleX(-1);\n}\n\n\n/* Icon Sizes\n * -----------------------------------------------------------\n */\n\n:host(.icon-small) {\n  font-size: 18px !important;\n}\n\n:host(.icon-large){\n  font-size: 32px !important;\n}\n\n\n/* Icon Colors\n * -----------------------------------------------------------\n */\n\n:host(.ion-color) {\n  color: var(--ion-color-base) !important;\n}\n\n:host(.ion-color-primary) {\n  --ion-color-base: var(--ion-color-primary, #3880ff);\n}\n\n:host(.ion-color-secondary) {\n  --ion-color-base: var(--ion-color-secondary, #0cd1e8);\n}\n\n:host(.ion-color-tertiary) {\n  --ion-color-base: var(--ion-color-tertiary, #f4a942);\n}\n\n:host(.ion-color-success) {\n  --ion-color-base: var(--ion-color-success, #10dc60);\n}\n\n:host(.ion-color-warning) {\n  --ion-color-base: var(--ion-color-warning, #ffce00);\n}\n\n:host(.ion-color-danger) {\n  --ion-color-base: var(--ion-color-danger, #f14141);\n}\n\n:host(.ion-color-light) {\n  --ion-color-base: var(--ion-color-light, #f4f5f8);\n}\n\n:host(.ion-color-medium) {\n  --ion-color-base: var(--ion-color-medium, #989aa2);\n}\n\n:host(.ion-color-dark) {\n  --ion-color-base: var(--ion-color-dark, #222428);\n}"; }
}
const getIonMode = (ref) => {
    return getMode(ref) || document.documentElement.getAttribute('mode') || 'md';
};
const getNamedUrl = (name) => {
    const url = getIconMap().get(name);
    if (url) {
        return url;
    }
    return getAssetPath(`svg/${name}.svg`);
};
const requests = new Map();
const getSvgContent = (doc, url, scopedId) => {
    // see if we already have a request for this url
    let req = requests.get(url);
    if (!req) {
        // we don't already have a request
        req = fetch(url, { cache: 'force-cache' }).then(rsp => {
            if (isStatusValid(rsp.status)) {
                return rsp.text();
            }
            return Promise.resolve(null);
        }).then(svgContent => validateContent(doc, svgContent, scopedId));
        // cache for the same requests
        requests.set(url, req);
    }
    return req;
};
const isStatusValid = (status) => {
    return status <= 299;
};
const validateContent = (document, svgContent, scopeId) => {
    if (svgContent) {
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = svgContent;
        frag.appendChild(div);
        // setup this way to ensure it works on our buddy IE
        for (let i = div.childNodes.length - 1; i >= 0; i--) {
            if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
                div.removeChild(div.childNodes[i]);
            }
        }
        // must only have 1 root element
        const svgElm = div.firstElementChild;
        if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
            if (scopeId) {
                svgElm.setAttribute('class', scopeId);
            }
            // root element must be an svg
            // lets double check we've got valid elements
            // do not allow scripts
            if (isValid(svgElm)) {
                return div.innerHTML;
            }
        }
    }
    return '';
};
const createColorClasses = (color) => {
    return (color) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : null;
};

export { Icon as ion_icon };
