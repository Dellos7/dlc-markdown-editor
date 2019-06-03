import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-3c7af0f3.js';

class Reorder {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    onClick(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
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
        return (h("slot", null, h("ion-icon", { name: "reorder", lazy: false, class: "reorder-icon" })));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host([slot]) {\n  display: none;\n  line-height: 0;\n  z-index: 100;\n}\n\n.reorder-icon {\n  display: block;\n  font-size: 22px;\n}\n\n.reorder-icon {\n  font-size: 34px;\n  opacity: 0.4;\n}"; }
}

export { Reorder as ion_reorder };
