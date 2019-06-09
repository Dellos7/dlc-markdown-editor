import { r as registerInstance, d as getIonMode, h, H as Host } from './dlc-markdown-editor-505a8a95.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Footer {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the footer will be translucent.
         * Note: In order to scroll content behind the footer, the `fullscreen`
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
                [`footer-${mode}`]: true,
                [`footer-translucent`]: this.translucent,
                [`footer-translucent-${mode}`]: this.translucent,
            }
        };
    }
    render() { return h(Host, this.hostData()); }
    static get style() { return "ion-footer {\n  display: block;\n  position: relative;\n  -ms-flex-order: 1;\n  order: 1;\n  width: 100%;\n  z-index: 10;\n}\n\nion-footer ion-toolbar:last-child {\n  padding-bottom: var(--ion-safe-area-bottom, 0);\n}\n\n.footer-ios ion-toolbar:first-child {\n  --border-width: 0.55px 0 0;\n}\n\n.footer-ios[no-border] ion-toolbar:first-child {\n  --border-width: 0;\n}\n\n.footer-translucent-ios {\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px);\n}\n\n.footer-translucent-ios ion-toolbar {\n  --opacity: .8;\n  --backdrop-filter: saturate(180%) blur(20px);\n}"; }
}

export { Footer as ion_footer };
