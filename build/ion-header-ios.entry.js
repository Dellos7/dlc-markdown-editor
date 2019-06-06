import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-0cf5bcf8.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Header {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the header will be translucent.
         * Note: In order to scroll content behind the header, the `fullscreen`
         * attribute needs to be set on the content.
         */
        this.translucent = false;
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true,
                // Used internally for styling
                [`header-${mode}`]: true,
                [`header-translucent`]: this.translucent,
                [`header-translucent-${mode}`]: this.translucent,
            }
        };
    }
    render() { return h(Host, this.hostData()); }
    static get style() { return "ion-header {\n  display: block;\n  position: relative;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%;\n  z-index: 10;\n}\n\nion-header ion-toolbar:first-child {\n  padding-top: var(--ion-safe-area-top, 0);\n}\n\n.header-ios ion-toolbar:last-child {\n  --border-width: 0 0 0.55px;\n}\n\n.header-ios[no-border] ion-toolbar:last-child {\n  --border-width: 0;\n}\n\n.header-translucent-ios {\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px);\n}\n\n.header-translucent-ios ion-toolbar {\n  --opacity: .8;\n  --backdrop-filter: saturate(180%) blur(20px);\n}"; }
}

export { Header as ion_header };
