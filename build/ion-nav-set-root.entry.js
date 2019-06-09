import { r as registerInstance, c as getElement } from './dlc-markdown-editor-505a8a95.js';

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
