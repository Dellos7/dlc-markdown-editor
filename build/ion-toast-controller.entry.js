import { r as registerInstance, i as getContext } from './dlc-markdown-editor-d387313e.js';
import { c as createOverlay, a as dismissOverlay, g as getOverlay } from './chunk-efd2c884.js';

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
