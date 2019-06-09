import { r as registerInstance, e as getElement } from './dlc-markdown-editor-d387313e.js';

class NavSetRoot {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    push() {
        const nav = this.el.closest('ion-nav');
        const toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.setRoot(toPush, this.componentProps, { skipIfBusy: true });
        }
    }
    get el() { return getElement(this); }
}

export { NavSetRoot as ion_nav_set_root };
