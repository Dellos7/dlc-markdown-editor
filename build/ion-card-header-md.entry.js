import { r as registerInstance, f as getIonMode, h, H as Host } from './dlc-markdown-editor-d387313e.js';
import { c as createColorClasses } from './chunk-abd3a723.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class CardHeader {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the card header will be translucent.
         */
        this.translucent = false;
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'card-header-translucent': this.translucent, [`${mode}`]: true })
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  display: block;\n  position: relative;\n  background: var(--background);\n  color: var(--color);\n}\n\n:host(.ion-color) {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n:host(.ion-color) ::slotted(ion-card-title),\n:host(.ion-color) ::slotted(ion-card-subtitle) {\n  color: currentColor;\n}\n\n:host {\n  padding-left: 16px;\n  padding-right: 16px;\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n    -webkit-padding-end: 16px;\n    padding-inline-end: 16px;\n  }\n}\n\n::slotted(ion-card-title:not(:first-child)),\n::slotted(ion-card-subtitle:not(:first-child)) {\n  margin-top: 8px;\n}"; }
}

export { CardHeader as ion_card_header };
