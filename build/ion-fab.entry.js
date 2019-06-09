import { r as registerInstance, f as getIonMode, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';

class Fab {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the fab will display on the edge of the header if
         * `vertical` is `"top"`, and on the edge of the footer if
         * it is `"bottom"`. Should be used with a `fixed` slot.
         */
        this.edge = false;
        /**
         * If `true`, both the `ion-fab-button` and all `ion-fab-list` inside `ion-fab` will become active.
         * That means `ion-fab-button` will become a `close` icon and `ion-fab-list` will become visible.
         */
        this.activated = false;
    }
    activatedChanged() {
        const activated = this.activated;
        const fab = this.getFab();
        if (fab) {
            fab.activated = activated;
        }
        Array.from(this.el.querySelectorAll('ion-fab-list')).forEach(list => {
            list.activated = activated;
        });
    }
    componentDidLoad() {
        if (this.activated) {
            this.activatedChanged();
        }
    }
    getFab() {
        return this.el.querySelector('ion-fab-button');
    }
    onClick() {
        const hasList = !!this.el.querySelector('ion-fab-list');
        const getButton = this.getFab();
        const isButtonDisabled = getButton && getButton.disabled;
        if (hasList && !isButtonDisabled) {
            this.activated = !this.activated;
        }
    }
    /**
     * Close an active FAB list container.
     */
    async close() {
        this.activated = false;
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true,
                [`fab-horizontal-${this.horizontal}`]: this.horizontal !== undefined,
                [`fab-vertical-${this.vertical}`]: this.vertical !== undefined,
                'fab-edge': this.edge
            }
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "activated": ["activatedChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  position: absolute;\n  z-index: 999;\n}\n\n:host(.fab-horizontal-center) {\n  left: 50%;\n  margin-left: -28px;\n}\n:host-context([dir=rtl]):host(.fab-horizontal-center), :host-context([dir=rtl]).fab-horizontal-center {\n  left: unset;\n  right: unset;\n  right: 50%;\n}\n\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.fab-horizontal-center) {\n    margin-left: unset;\n    -webkit-margin-start: -28px;\n    margin-inline-start: -28px;\n  }\n}\n\n:host(.fab-horizontal-start) {\n  left: calc(10px + var(--ion-safe-area-left, 0px));\n}\n:host-context([dir=rtl]):host(.fab-horizontal-start), :host-context([dir=rtl]).fab-horizontal-start {\n  left: unset;\n  right: unset;\n  right: calc(10px + var(--ion-safe-area-left, 0px));\n}\n\n:host(.fab-horizontal-end) {\n  right: calc(10px + var(--ion-safe-area-right, 0px));\n}\n:host-context([dir=rtl]):host(.fab-horizontal-end), :host-context([dir=rtl]).fab-horizontal-end {\n  left: unset;\n  right: unset;\n  left: calc(10px + var(--ion-safe-area-right, 0px));\n}\n\n:host(.fab-vertical-top) {\n  top: 10px;\n}\n\n:host(.fab-vertical-top.fab-edge) {\n  top: -28px;\n}\n\n:host(.fab-vertical-bottom) {\n  bottom: 10px;\n}\n\n:host(.fab-vertical-bottom.fab-edge) {\n  bottom: -28px;\n}\n\n:host(.fab-vertical-center) {\n  margin-top: -28px;\n  top: 50%;\n}"; }
}

export { Fab as ion_fab };
