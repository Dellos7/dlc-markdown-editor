import { e as registerInstance, i as createEvent, h as getIonMode, g as getElement, f as h, k as Host } from './dlc-markdown-editor-0cf5bcf8.js';

class SelectOption {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
        /**
         * If `true`, the element is selected.
         */
        this.selected = false;
        this.ionSelectOptionDidLoad = createEvent(this, "ionSelectOptionDidLoad", 7);
        this.ionSelectOptionDidUnload = createEvent(this, "ionSelectOptionDidUnload", 7);
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.ionSelectOptionDidLoad.emit();
    }
    componentDidUnload() {
        this.ionSelectOptionDidUnload.emit();
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            'role': 'option',
            'id': this.inputId,
            class: {
                [`${mode}`]: true,
            }
        };
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData()); }
    static get style() { return ":host {\n  display: none;\n}"; }
}
let selectOptionIds = 0;

export { SelectOption as ion_select_option };