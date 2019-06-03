import { e as registerInstance, g as getElement } from './dlc-markdown-editor-3c7af0f3.js';

class NavPush {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    push() {
        const nav = this.el.closest('ion-nav');
        const toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.push(toPush, this.componentProps, { skipIfBusy: true });
        }
    }
    get el() { return getElement(this); }
}

export { NavPush as ion_nav_push };
