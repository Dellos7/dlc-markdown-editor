import { r as registerInstance, c as createEvent, f as getIonMode, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { f as popoverController, h as actionSheetController, j as alertController } from './chunk-efd2c884.js';
import { h as hostContext } from './chunk-abd3a723.js';
import { f as findItemLabel, a as renderHiddenInput } from './chunk-3702a6ef.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Select {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.childOpts = [];
        this.inputId = `ion-sel-${selectIds++}`;
        this.didInit = false;
        this.isExpanded = false;
        /**
         * If `true`, the user cannot interact with the select.
         */
        this.disabled = false;
        /**
         * The text to display on the cancel button.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the ok button.
         */
        this.okText = 'OK';
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the select can accept multiple values.
         */
        this.multiple = false;
        /**
         * The interface the select should use: `action-sheet`, `popover` or `alert`.
         */
        this.interface = 'alert';
        /**
         * Any additional options that the `alert`, `action-sheet` or `popover` interface
         * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
         * [PopoverController API docs](../../popover/PopoverController/#create) for the
         * create options for each interface.
         */
        this.interfaceOptions = {};
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionCancel = createEvent(this, "ionCancel", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        if (this.didInit) {
            this.updateOptions();
            this.ionChange.emit({
                value: this.value,
            });
            this.emitStyle();
        }
    }
    async selectOptionChanged() {
        await this.loadOptions();
        if (this.didInit) {
            this.updateOptions();
            this.updateOverlayOptions();
            this.emitStyle();
            /**
             * In the event that options
             * are not loaded at component load
             * this ensures that any value that is
             * set is properly rendered once
             * options have been loaded
             */
            if (this.value !== undefined) {
                this.el.forceUpdate();
            }
        }
    }
    onClick(ev) {
        this.setFocus();
        this.open(ev);
    }
    async componentDidLoad() {
        await this.loadOptions();
        if (this.value === undefined) {
            if (this.multiple) {
                // there are no values set at this point
                // so check to see who should be selected
                const checked = this.childOpts.filter(o => o.selected);
                this.value = checked.map(o => o.value);
            }
            else {
                const checked = this.childOpts.find(o => o.selected);
                if (checked) {
                    this.value = checked.value;
                }
            }
        }
        this.updateOptions();
        this.emitStyle();
        this.el.forceUpdate();
        this.didInit = true;
    }
    /**
     * Open the select overlay. The overlay is either an alert, action sheet, or popover,
     * depending on the `interface` property on the `ion-select`.
     *
     * @param event The user interface event that called the open.
     */
    async open(event) {
        if (this.disabled || this.isExpanded) {
            return undefined;
        }
        const overlay = this.overlay = await this.createOverlay(event);
        this.isExpanded = true;
        overlay.onDidDismiss().then(() => {
            this.overlay = undefined;
            this.isExpanded = false;
            this.setFocus();
        });
        await overlay.present();
        return overlay;
    }
    createOverlay(ev) {
        let selectInterface = this.interface;
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn(`Select interface cannot be "${selectInterface}" with a multi-value select. Using the "alert" interface instead.`);
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover') {
            return this.openPopover(ev);
        }
        if (selectInterface === 'action-sheet') {
            return this.openActionSheet();
        }
        return this.openAlert();
    }
    updateOverlayOptions() {
        if (!this.overlay) {
            return;
        }
        const overlay = this.overlay;
        switch (this.interface) {
            case 'action-sheet':
                overlay.buttons = this.createActionSheetButtons(this.childOpts);
                break;
            case 'popover':
                const popover = overlay.querySelector('ion-select-popover');
                if (popover) {
                    popover.options = this.createPopoverOptions(this.childOpts);
                }
                break;
            default:
                const inputType = (this.multiple ? 'checkbox' : 'radio');
                overlay.inputs = this.createAlertInputs(this.childOpts, inputType);
                break;
        }
    }
    createActionSheetButtons(data) {
        const actionSheetButtons = data.map(option => {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.textContent,
                handler: () => {
                    this.value = option.value;
                }
            };
        });
        // Add "cancel" button
        actionSheetButtons.push({
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
                this.ionCancel.emit();
            }
        });
        return actionSheetButtons;
    }
    createAlertInputs(data, inputType) {
        return data.map(o => {
            return {
                type: inputType,
                label: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled
            };
        });
    }
    createPopoverOptions(data) {
        return data.map(o => {
            return {
                text: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled,
                handler: () => {
                    this.value = o.value;
                    this.close();
                }
            };
        });
    }
    async openPopover(ev) {
        const interfaceOptions = this.interfaceOptions;
        const mode = getIonMode(this);
        const popoverOpts = Object.assign({ mode }, interfaceOptions, { component: 'ion-select-popover', cssClass: ['select-popover', interfaceOptions.cssClass], event: ev, componentProps: {
                header: interfaceOptions.header,
                subHeader: interfaceOptions.subHeader,
                message: interfaceOptions.message,
                value: this.value,
                options: this.createPopoverOptions(this.childOpts)
            } });
        return popoverController.create(popoverOpts);
    }
    async openActionSheet() {
        const mode = getIonMode(this);
        const interfaceOptions = this.interfaceOptions;
        const actionSheetOpts = Object.assign({ mode }, interfaceOptions, { buttons: this.createActionSheetButtons(this.childOpts), cssClass: ['select-action-sheet', interfaceOptions.cssClass] });
        return actionSheetController.create(actionSheetOpts);
    }
    async openAlert() {
        const label = this.getLabel();
        const labelText = (label) ? label.textContent : null;
        const interfaceOptions = this.interfaceOptions;
        const inputType = (this.multiple ? 'checkbox' : 'radio');
        const mode = getIonMode(this);
        const alertOpts = Object.assign({ mode }, interfaceOptions, { header: interfaceOptions.header ? interfaceOptions.header : labelText, inputs: this.createAlertInputs(this.childOpts, inputType), buttons: [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: () => {
                        this.ionCancel.emit();
                    }
                },
                {
                    text: this.okText,
                    handler: (selectedValues) => {
                        this.value = selectedValues;
                    }
                }
            ], cssClass: ['select-alert', interfaceOptions.cssClass,
                (this.multiple ? 'multiple-select-alert' : 'single-select-alert')] });
        return alertController.create(alertOpts);
    }
    /**
     * Close the select interface.
     */
    close() {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
            return Promise.resolve(false);
        }
        return this.overlay.dismiss();
    }
    async loadOptions() {
        this.childOpts = await Promise.all(Array.from(this.el.querySelectorAll('ion-select-option')).map(o => o.componentOnReady()));
    }
    updateOptions() {
        // iterate all options, updating the selected prop
        let canSelect = true;
        for (const selectOption of this.childOpts) {
            const selected = canSelect && isOptionSelected(this.value, selectOption.value, this.compareWith);
            selectOption.selected = selected;
            // if current option is selected and select is single-option, we can't select
            // any option more
            if (selected && !this.multiple) {
                canSelect = false;
            }
        }
    }
    getLabel() {
        return findItemLabel(this.el);
    }
    hasValue() {
        return this.getText() !== '';
    }
    getText() {
        const selectedText = this.selectedText;
        if (selectedText != null && selectedText !== '') {
            return selectedText;
        }
        return generateText(this.childOpts, this.value, this.compareWith);
    }
    setFocus() {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'select': true,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'interactive-disabled': this.disabled,
            'select-disabled': this.disabled
        });
    }
    hostData() {
        const mode = getIonMode(this);
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return {
            'role': 'combobox',
            'aria-disabled': this.disabled ? 'true' : null,
            'aria-expanded': `${this.isExpanded}`,
            'aria-haspopup': 'dialog',
            'aria-labelledby': labelId,
            class: {
                [`${mode}`]: true,
                'in-item': hostContext('ion-item', this.el),
                'select-disabled': this.disabled,
            }
        };
    }
    __stencil_render() {
        renderHiddenInput(true, this.el, this.name, parseValue(this.value), this.disabled);
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        let addPlaceholderClass = false;
        let selectText = this.getText();
        if (selectText === '' && this.placeholder != null) {
            selectText = this.placeholder;
            addPlaceholderClass = true;
        }
        const selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return [
            h("div", { class: selectTextClasses }, selectText),
            h("div", { class: "select-icon", role: "presentation" }, h("div", { class: "select-icon-inner" })),
            h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: (el => this.buttonEl = el) })
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["disabledChanged"],
        "value": ["valueChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --padding-top: Top padding of the select\n   * \@prop --padding-end: End padding of the select\n   * \@prop --padding-bottom: Bottom padding of the select\n   * \@prop --padding-start: Start padding of the select\n   */\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  font-family: var(--ion-font-family, inherit);\n  overflow: hidden;\n  z-index: 2;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--padding-start);\n    padding-inline-start: var(--padding-start);\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n:host(.in-item) {\n  position: static;\n  max-width: 45%;\n}\n\n:host(.select-disabled) {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n:host(.ion-focused) button {\n  border: 2px solid #5e9ed6;\n}\n\n.select-placeholder {\n  color: currentColor;\n  opacity: 0.33;\n}\n\nbutton {\n  left: 0;\n  top: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n}\n[dir=rtl] button, :host-context([dir=rtl]) button {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\nbutton::-moz-focus-inner {\n  border: 0;\n}\n\n.select-icon {\n  position: relative;\n}\n\n.select-text {\n  -ms-flex: 1;\n  flex: 1;\n  min-width: 16px;\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.select-icon-inner {\n  left: 5px;\n  top: 50%;\n  margin-top: -3px;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 5px solid;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  color: currentColor;\n  opacity: 0.33;\n  pointer-events: none;\n}\n[dir=rtl] .select-icon-inner, :host-context([dir=rtl]) .select-icon-inner {\n  left: unset;\n  right: unset;\n  right: 5px;\n}\n\n:host {\n  --padding-top: 10px;\n  --padding-end: 8px;\n  --padding-bottom: 10px;\n  --padding-start: 16px;\n}\n\n.select-icon {\n  width: 12px;\n  height: 18px;\n}"; }
}
function parseValue(value) {
    if (value == null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value.toString();
}
function isOptionSelected(currentValue, compareValue, compareWith) {
    if (currentValue === undefined) {
        return false;
    }
    if (Array.isArray(currentValue)) {
        return currentValue.some(val => compareOptions(val, compareValue, compareWith));
    }
    else {
        return compareOptions(currentValue, compareValue, compareWith);
    }
}
function compareOptions(currentValue, compareValue, compareWith) {
    if (typeof compareWith === 'function') {
        return compareWith(currentValue, compareValue);
    }
    else if (typeof compareWith === 'string') {
        return currentValue[compareWith] === compareValue[compareWith];
    }
    else {
        return currentValue === compareValue;
    }
}
function generateText(opts, value, compareWith) {
    if (value === undefined) {
        return '';
    }
    if (Array.isArray(value)) {
        return value
            .map(v => textForValue(opts, v, compareWith))
            .filter(opt => opt !== null)
            .join(', ');
    }
    else {
        return textForValue(opts, value, compareWith) || '';
    }
}
function textForValue(opts, value, compareWith) {
    const selectOpt = opts.find(opt => {
        return compareOptions(opt.value, value, compareWith);
    });
    return selectOpt
        ? selectOpt.textContent
        : null;
}
let selectIds = 0;

export { Select as ion_select };
