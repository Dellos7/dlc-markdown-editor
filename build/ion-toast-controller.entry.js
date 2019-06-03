import { e as registerInstance, j as getContext } from './dlc-markdown-editor-3c7af0f3.js';
import { f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-d1a72b9a.js';

class ToastController {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.doc = getContext(this, "document");
    }
    /**
     * Create a toast overlay with toast options.
     *
     * @param options The options to use to create the toast.
     */
    create(options) {
        return createOverlay('ion-toast', options);
    }
    /**
     * Dismiss the open toast overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the toast. For example, 'cancel' or 'backdrop'.
     * @param id The id of the toast to dismiss. If an id is not provided, it will dismiss the most recently opened toast.
     */
    dismiss(data, role, id) {
        return dismissOverlay(document, data, role, 'ion-toast', id);
    }
    /**
     * Get the most recently opened toast overlay.
     */
    async getTop() {
        return getOverlay(document, 'ion-toast');
    }
}

export { ToastController as ion_toast_controller };
