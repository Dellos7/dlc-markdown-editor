import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-3c7af0f3.js';
import { c as createColorClasses } from './chunk-4d735167.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class CardSubtitle {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true }),
            'role': 'heading',
            'aria-level': '3'
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --color: Color of the card subtitle\n   */\n  display: block;\n  position: relative;\n  color: var(--color);\n}\n\n:host(.ion-color) {\n  color: var(--ion-color-base);\n}\n\n:host {\n  --color: var(--ion-color-step-600, #666666);\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 4px;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}"; }
}

export { CardSubtitle as ion_card_subtitle };
