import { r as registerInstance, i as getContext } from './dlc-markdown-editor-d387313e.js';
import { c as createOverlay, a as dismissOverlay, g as getOverlay } from './chunk-efd2c884.js';

class PickerController {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.doc = getContext(this, "document");
    }
    /**
     * Create a picker overlay with picker options.
     *
     * @param options The options to use to create the picker.
     */
    create(options) {
        return createOverlay('ion-picker', options);
    }
    /**
     * Dismiss the open picker overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the picker.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the picker.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the picker to dismiss. If an id is not provided, it will dismiss the most recently opened picker.
     */
    dismiss(data, role, id) {
        return dismissOverlay(document, data, role, 'ion-picker', id);
    }
    /**
     * Get the most recently opened picker overlay.
     */
    async getTop() {
        return getOverlay(document, 'ion-picker');
    }
}

export { PickerController as ion_picker_controller };
