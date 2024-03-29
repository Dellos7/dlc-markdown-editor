import { r as registerInstance, f as getIonMode, h, H as Host } from './dlc-markdown-editor-d387313e.js';

/**
 * @internal
 */
class SelectPopover {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Array of options for the popover */
        this.options = [];
    }
    onSelect(ev) {
        const option = this.options.find(o => o.value === ev.target.value);
        if (option && option.handler) {
            option.handler();
        }
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
        return (h("ion-list", null, this.header !== undefined && h("ion-list-header", null, this.header), (this.subHeader !== undefined || this.message !== undefined) &&
            h("ion-item", null, h("ion-label", { "text-wrap": true }, this.subHeader !== undefined && h("h3", null, this.subHeader), this.message !== undefined && h("p", null, this.message))), h("ion-radio-group", null, this.options.map(option => h("ion-item", null, h("ion-label", null, option.text), h("ion-radio", { checked: option.checked, value: option.value, disabled: option.disabled }))))));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-select-popover-h ion-list.sc-ion-select-popover {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: -1px;\n  margin-bottom: -1px;\n}\n\n.sc-ion-select-popover-h ion-list-header.sc-ion-select-popover, .sc-ion-select-popover-h ion-label.sc-ion-select-popover {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}"; }
}

export { SelectPopover as ion_select_popover };
