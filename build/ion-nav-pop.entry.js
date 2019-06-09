import { r as registerInstance, c as getElement } from './dlc-markdown-editor-505a8a95.js';

class NavPop {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    pop() {
        const nav = this.el.closest('ion-nav');
        if (nav) {
            nav.pop({ skipIfBusy: true });
        }
    }
    get el() { return getElement(this); }
}

export { NavPop as ion_nav_pop };
