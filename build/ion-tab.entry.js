import { r as registerInstance, B as Build, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { a as attachComponent } from './chunk-a88b8db5.js';

class Tab {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loaded = false;
        /** @internal */
        this.active = false;
    }
    componentWillLoad() {
        if (Build.isDev) {
            if (this.component !== undefined && this.el.childElementCount > 0) {
                console.error('You can not use a lazy-loaded component in a tab and inlined content at the same time.' +
                    `- Remove the component attribute in: <ion-tab component="${this.component}">` +
                    ` or` +
                    `- Remove the embedded content inside the ion-tab: <ion-tab></ion-tab>`);
            }
        }
    }
    /** Set the active component for the tab */
    async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
    }
    async prepareLazyLoaded() {
        if (!this.loaded && this.component != null) {
            this.loaded = true;
            try {
                return attachComponent(this.delegate, this.el, this.component, ['ion-page']);
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
    hostData() {
        const { tab, active, component } = this;
        return {
            'role': 'tabpanel',
            'aria-hidden': !active ? 'true' : null,
            'aria-labelledby': `tab-button-${tab}`,
            'class': {
                'ion-page': component === undefined,
                'tab-hidden': !active
            }
        };
    }
    __stencil_render() {
        return h("slot", null);
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host(.tab-hidden) {\n  /* stylelint-disable-next-line declaration-no-important */\n  display: none !important;\n}"; }
}

export { Tab as ion_tab };
