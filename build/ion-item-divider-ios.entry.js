import { r as registerInstance, d as getIonMode, h, c as getElement, H as Host } from './dlc-markdown-editor-505a8a95.js';
import { c as createColorClasses } from './chunk-abd3a723.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot start - Content is placed to the left of the divider text in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the divider text in LTR, and to the left in RTL.
 */
class ItemDivider {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * When it's set to `true`, the item-divider will stay visible when it reaches the top
         * of the viewport until the next `ion-item-divider` replaces it.
         *
         * This feature relies in `position:sticky`:
         * https://caniuse.com/#feat=css-sticky
         */
        this.sticky = false;
    }
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        Array.from(this.el.querySelectorAll('ion-button')).forEach(button => {
            if (button.size === undefined) {
                button.size = 'small';
            }
        });
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true, 'item-divider-sticky': this.sticky, 'item': true })
        };
    }
    __stencil_render() {
        return [
            h("slot", { name: "start" }),
            h("div", { class: "item-divider-inner" }, h("div", { class: "item-divider-wrapper" }, h("slot", null)), h("slot", { name: "end" }))
        ];
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the item divider\n   * \@prop --color: Color of the item divider\n   * \@prop --padding-start: Start padding of the item divider\n   * \@prop --padding-end: End padding of the item divider\n   * \@prop --padding-top: Top padding of the item divider\n   * \@prop --padding-bottom: Bottom padding of the item divider\n   */\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n  padding-right: calc(var(--padding-end) + var(--ion-safe-area-right, 0px));\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 30px;\n  background: var(--background);\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  overflow: hidden;\n  z-index: 100;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n    padding-inline-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n    -webkit-padding-end: calc(var(--padding-end) + var(--ion-safe-area-right, 0px));\n    padding-inline-end: calc(var(--padding-end) + var(--ion-safe-area-right, 0px));\n  }\n}\n\n:host(.ion-color) {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n:host(.item-divider-sticky) {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n\n.item-divider-inner {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  min-height: inherit;\n  border: 0;\n  overflow: hidden;\n}\n\n.item-divider-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n:host {\n  --background: var(--ion-color-step-50, #f2f2f2);\n  --color: var(--ion-color-step-850, #262626);\n  --padding-start: 16px;\n  border-radius: 0;\n  position: relative;\n  font-size: 17px;\n}\n\n.item-divider-inner {\n  padding-right: 8px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .item-divider-inner {\n    padding-right: unset;\n    -webkit-padding-end: 8px;\n    padding-inline-end: 8px;\n  }\n}\n\n:host([slot=start]) {\n  margin-left: 0;\n  margin-right: 16px;\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host([slot=start]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n    -webkit-margin-end: 16px;\n    margin-inline-end: 16px;\n  }\n}\n\n:host([slot=end]) {\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host([slot=end]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 8px;\n    margin-inline-start: 8px;\n    -webkit-margin-end: 8px;\n    margin-inline-end: 8px;\n  }\n}\n\n::slotted(ion-icon[slot=start]),\n::slotted(ion-icon[slot=end]) {\n  margin-left: 0;\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-icon[slot=start]),\n::slotted(ion-icon[slot=end]) {\n    margin-left: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n  }\n}\n\n::slotted(ion-label) {\n  margin-left: 0;\n  margin-right: 8px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-label) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n    -webkit-margin-end: 8px;\n    margin-inline-end: 8px;\n  }\n}\n\n::slotted(h1) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 24px;\n  font-weight: normal;\n}\n\n::slotted(h2) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 17px;\n  font-weight: normal;\n}\n\n::slotted(h3),\n::slotted(h4),\n::slotted(h5),\n::slotted(h6) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 3px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal;\n}\n\n::slotted(p) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  color: var(--ion-color-step-400, #999999);\n  font-size: 14px;\n  line-height: normal;\n  text-overflow: inherit;\n  overflow: inherit;\n}\n\n::slotted(h2:last-child) ::slotted(h3:last-child),\n::slotted(h4:last-child),\n::slotted(h5:last-child),\n::slotted(h6:last-child),\n::slotted(p:last-child) {\n  margin-bottom: 0;\n}"; }
}

export { ItemDivider as ion_item_divider };
