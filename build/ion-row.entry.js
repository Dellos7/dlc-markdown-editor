import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-3c7af0f3.js';

class Row {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true,
            }
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}"; }
}

export { Row as ion_row };
