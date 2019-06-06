import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-0cf5bcf8.js';
import { c as createColorClasses } from './chunk-4d735167.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Text {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true })
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host(.ion-color) {\n  color: var(--ion-color-base);\n}"; }
}

export { Text as ion_text };
