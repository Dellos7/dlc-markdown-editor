import { r as registerInstance, f as getIonMode, h, H as Host } from './dlc-markdown-editor-d387313e.js';

class Thumbnail {
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
    static get style() { return ":host {\n  /**\n   * \@prop --border-radius: Border radius of the thumbnail\n   * \@prop --size: Size of the thumbnail\n   */\n  --size: 48px;\n  --border-radius: 0;\n  border-radius: var(--border-radius);\n  display: block;\n  width: var(--size);\n  height: var(--size);\n}\n\n::slotted(ion-img),\n::slotted(img) {\n  border-radius: var(--border-radius);\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n  object-fit: cover;\n  overflow: hidden;\n}"; }
}

export { Thumbnail as ion_thumbnail };
