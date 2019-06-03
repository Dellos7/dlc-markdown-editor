import { e as registerInstance, j as getContext } from './dlc-markdown-editor-3c7af0f3.js';
import { f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-d1a72b9a.js';

class LoadingController {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.doc = getContext(this, "document");
    }
    /**
     * Create a loading overlay with loading options.
     *
     * @param options The options to use to create the loading.
     */
    create(options) {
        return createOverlay('ion-loading', options);
    }
    /**
     * Dismiss the open loading overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the loading.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the loading.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the loading to dismiss. If an id is not provided, it will dismiss the most recently opened loading.
     */
    dismiss(data, role, id) {
        return dismissOverlay(document, data, role, 'ion-loading', id);
    }
    /**
     * Get the most recently opened loading overlay.
     */
    async getTop() {
        return getOverlay(document, 'ion-loading');
    }
}

export { LoadingController as ion_loading_controller };
