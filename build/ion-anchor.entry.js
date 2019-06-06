import { e as registerInstance, j as getContext, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-0cf5bcf8.js';
import { b as openURL, c as createColorClasses } from './chunk-4d735167.js';

class Anchor {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.win = getContext(this, "window");
    }
    onClick(ev) {
        openURL(this.win, this.href, ev, this.routerDirection);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true, 'ion-activatable': true })
        };
    }
    __stencil_render() {
        return (h("a", { href: this.href }, h("slot", null)));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the badge\n   * \@prop --color: Text color of the badge\n   */\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n  background: var(--background);\n  color: var(--color);\n}\n\n:host(.ion-color) {\n  color: var(--ion-color-base);\n}\n\na {\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n}"; }
}

export { Anchor as ion_anchor };
