import { e as registerInstance, j as getContext, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-0cf5bcf8.js';
import { a as sanitizeDOMString } from './chunk-2ef9ae2f.js';

class RefresherContent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.config = getContext(this, "config");
    }
    componentWillLoad() {
        if (this.pullingIcon === undefined) {
            this.pullingIcon = this.config.get('refreshingIcon', 'arrow-down');
        }
        if (this.refreshingSpinner === undefined) {
            const mode = getIonMode(this);
            this.refreshingSpinner = this.config.get('refreshingSpinner', this.config.get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
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
        return [
            h("div", { class: "refresher-pulling" }, this.pullingIcon &&
                h("div", { class: "refresher-pulling-icon" }, h("ion-icon", { icon: this.pullingIcon, lazy: false })), this.pullingText &&
                h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(this.pullingText) })),
            h("div", { class: "refresher-refreshing" }, this.refreshingSpinner &&
                h("div", { class: "refresher-refreshing-icon" }, h("ion-spinner", { name: this.refreshingSpinner })), this.refreshingText &&
                h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(this.refreshingText) }))
        ];
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
}

export { RefresherContent as ion_refresher_content };
