import { r as registerInstance, f as getIonMode, c as createEvent, i as getContext, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { B as BACKDROP, i as isCancel, p as present, d as dismiss, e as eventMethod } from './chunk-efd2c884.js';
import { g as getClassMap } from './chunk-abd3a723.js';
import { s as sanitizeDOMString } from './chunk-8d8e0c6f.js';

/**
 * iOS Alert Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * iOS Alert Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * Md Alert Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 0.9, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * Md Alert Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Alert {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.processedInputs = [];
        this.processedButtons = [];
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * Array of buttons to be added to the alert.
         */
        this.buttons = [];
        /**
         * Array of input to show in the alert.
         */
        this.inputs = [];
        /**
         * If `true`, the alert will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, the alert will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the alert will animate.
         */
        this.animated = true;
        this.didPresent = createEvent(this, "ionAlertDidPresent", 7);
        this.willPresent = createEvent(this, "ionAlertWillPresent", 7);
        this.willDismiss = createEvent(this, "ionAlertWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionAlertDidDismiss", 7);
        this.config = getContext(this, "config");
    }
    buttonsChanged() {
        const buttons = this.buttons;
        this.processedButtons = buttons.map(btn => {
            return (typeof btn === 'string')
                ? { text: btn, role: btn.toLowerCase() === 'cancel' ? 'cancel' : undefined }
                : btn;
        });
    }
    inputsChanged() {
        const inputs = this.inputs;
        // An alert can be created with several different inputs. Radios,
        // checkboxes and inputs are all accepted, but they cannot be mixed.
        const inputTypes = new Set(inputs.map(i => i.type));
        if (inputTypes.has('checkbox') && inputTypes.has('radio')) {
            console.warn(`Alert cannot mix input types: ${(Array.from(inputTypes.values()).join('/'))}. Please see alert docs for more info.`);
        }
        this.inputType = inputTypes.values().next().value;
        this.processedInputs = inputs.map((i, index) => ({
            type: i.type || 'text',
            name: i.name || `${index}`,
            placeholder: i.placeholder || '',
            value: i.value,
            label: i.label,
            checked: !!i.checked,
            disabled: !!i.disabled,
            id: i.id || `alert-input-${this.overlayIndex}-${index}`,
            handler: i.handler,
            min: i.min,
            max: i.max
        }));
    }
    componentWillLoad() {
        this.inputsChanged();
        this.buttonsChanged();
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    dispatchCancelHandler(ev) {
        const role = ev.detail.role;
        if (isCancel(role)) {
            const cancelButton = this.processedButtons.find(b => b.role === 'cancel');
            this.callButtonHandler(cancelButton);
        }
    }
    /**
     * Present the alert overlay after it has been created.
     */
    present() {
        return present(this, 'alertEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the alert overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the alert.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the alert.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    dismiss(data, role) {
        return dismiss(this, data, role, 'alertLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the alert did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionAlertDidDismiss');
    }
    /**
     * Returns a promise that resolves when the alert will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionAlertWillDismiss');
    }
    rbClick(selectedInput) {
        for (const input of this.processedInputs) {
            input.checked = input === selectedInput;
        }
        this.activeId = selectedInput.id;
        if (selectedInput.handler) {
            selectedInput.handler(selectedInput);
        }
        this.el.forceUpdate();
    }
    cbClick(selectedInput) {
        selectedInput.checked = !selectedInput.checked;
        if (selectedInput.handler) {
            selectedInput.handler(selectedInput);
        }
        this.el.forceUpdate();
    }
    buttonClick(button) {
        const role = button.role;
        const values = this.getValues();
        if (isCancel(role)) {
            return this.dismiss({ values }, role);
        }
        const returnData = this.callButtonHandler(button, values);
        if (returnData !== false) {
            return this.dismiss(Object.assign({ values }, returnData), button.role);
        }
        return Promise.resolve(false);
    }
    callButtonHandler(button, data) {
        if (button && button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            const returnData = button.handler(data);
            if (returnData === false) {
                // if the return value of the handler is false then do not dismiss
                return false;
            }
            if (typeof returnData === 'object') {
                return returnData;
            }
        }
        return {};
    }
    getValues() {
        if (this.processedInputs.length === 0) {
            // this is an alert without any options/inputs at all
            return undefined;
        }
        if (this.inputType === 'radio') {
            // this is an alert with radio buttons (single value select)
            // return the one value which is checked, otherwise undefined
            const checkedInput = this.processedInputs.find(i => !!i.checked);
            return checkedInput ? checkedInput.value : undefined;
        }
        if (this.inputType === 'checkbox') {
            // this is an alert with checkboxes (multiple value select)
            // return an array of all the checked values
            return this.processedInputs.filter(i => i.checked).map(i => i.value);
        }
        // this is an alert with text inputs
        // return an object of all the values with the input name as the key
        const values = {};
        this.processedInputs.forEach(i => {
            values[i.name] = i.value || '';
        });
        return values;
    }
    renderAlertInputs(labelledBy) {
        switch (this.inputType) {
            case 'checkbox': return this.renderCheckbox(labelledBy);
            case 'radio': return this.renderRadio(labelledBy);
            default: return this.renderInput(labelledBy);
        }
    }
    renderCheckbox(labelledby) {
        const inputs = this.processedInputs;
        const mode = getIonMode(this);
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-checkbox-group", "aria-labelledby": labelledby }, inputs.map(i => (h("button", { type: "button", onClick: () => this.cbClick(i), "aria-checked": `${i.checked}`, id: i.id, disabled: i.disabled, tabIndex: 0, role: "checkbox", class: "alert-tappable alert-checkbox alert-checkbox-button ion-focusable" }, h("div", { class: "alert-button-inner" }, h("div", { class: "alert-checkbox-icon" }, h("div", { class: "alert-checkbox-inner" })), h("div", { class: "alert-checkbox-label" }, i.label)), mode === 'md' && h("ion-ripple-effect", null))))));
    }
    renderRadio(labelledby) {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-radio-group", role: "radiogroup", "aria-labelledby": labelledby, "aria-activedescendant": this.activeId }, inputs.map(i => (h("button", { type: "button", onClick: () => this.rbClick(i), "aria-checked": `${i.checked}`, disabled: i.disabled, id: i.id, tabIndex: 0, class: "alert-radio-button alert-tappable alert-radio ion-focusable", role: "radio" }, h("div", { class: "alert-button-inner" }, h("div", { class: "alert-radio-icon" }, h("div", { class: "alert-radio-inner" })), h("div", { class: "alert-radio-label" }, i.label)))))));
    }
    renderInput(labelledby) {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-input-group", "aria-labelledby": labelledby }, inputs.map(i => (h("div", { class: "alert-input-wrapper" }, h("input", { placeholder: i.placeholder, value: i.value, type: i.type, min: i.min, max: i.max, onInput: e => i.value = e.target.value, id: i.id, disabled: i.disabled, tabIndex: 0, class: "alert-input" }))))));
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            'role': 'dialog',
            'aria-modal': 'true',
            style: {
                zIndex: 20000 + this.overlayIndex,
            },
            class: Object.assign({}, getClassMap(this.cssClass), { [`${mode}`]: true, 'alert-translucent': this.translucent })
        };
    }
    renderAlertButtons() {
        const buttons = this.processedButtons;
        const mode = getIonMode(this);
        const alertButtonGroupClass = {
            'alert-button-group': true,
            'alert-button-group-vertical': buttons.length > 2
        };
        return (h("div", { class: alertButtonGroupClass }, buttons.map(button => h("button", { type: "button", class: buttonClass(button), tabIndex: 0, onClick: () => this.buttonClick(button) }, h("span", { class: "alert-button-inner" }, button.text), mode === 'md' && h("ion-ripple-effect", null)))));
    }
    __stencil_render() {
        const hdrId = `alert-${this.overlayIndex}-hdr`;
        const subHdrId = `alert-${this.overlayIndex}-sub-hdr`;
        const msgId = `alert-${this.overlayIndex}-msg`;
        let labelledById;
        if (this.header !== undefined) {
            labelledById = hdrId;
        }
        else if (this.subHeader !== undefined) {
            labelledById = subHdrId;
        }
        return [
            h("ion-backdrop", { tappable: this.backdropDismiss }),
            h("div", { class: "alert-wrapper" }, h("div", { class: "alert-head" }, this.header && h("h2", { id: hdrId, class: "alert-title" }, this.header), this.subHeader && h("h2", { id: subHdrId, class: "alert-sub-title" }, this.subHeader)), h("div", { id: msgId, class: "alert-message", innerHTML: sanitizeDOMString(this.message) }), this.renderAlertInputs(labelledById), this.renderAlertButtons())
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "buttons": ["buttonsChanged"],
        "inputs": ["inputsChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-alert-ios-h {\n  \n  --min-width: 250px;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  --max-height: 90%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1000;\n}\n\n.overlay-hidden.sc-ion-alert-ios-h {\n  display: none;\n}\n\n.alert-top.sc-ion-alert-ios-h {\n  padding-top: 50px;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n.alert-wrapper.sc-ion-alert-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  contain: content;\n  opacity: 0;\n  z-index: 10;\n}\n\n.alert-title.sc-ion-alert-ios {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.alert-sub-title.sc-ion-alert-ios {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 5px;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  font-weight: normal;\n}\n\n.alert-message.sc-ion-alert-ios {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: auto;\n  overscroll-behavior-y: contain;\n}\n\n.alert-checkbox-group.sc-ion-alert-ios::-webkit-scrollbar, .alert-radio-group.sc-ion-alert-ios::-webkit-scrollbar, .alert-message.sc-ion-alert-ios::-webkit-scrollbar {\n  display: none;\n}\n\n.alert-input.sc-ion-alert-ios {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  width: 100%;\n  border: 0;\n  background: inherit;\n  font: inherit;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.alert-button-group.sc-ion-alert-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  width: 100%;\n}\n\n.alert-button-group-vertical.sc-ion-alert-ios {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n}\n\n.alert-button.sc-ion-alert-ios {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  display: block;\n  border: 0;\n  font-size: 14px;\n  line-height: 20px;\n  z-index: 0;\n}\n\n.alert-button.ion-focused.sc-ion-alert-ios, .alert-tappable.ion-focused.sc-ion-alert-ios {\n  background: var(--ion-color-step-100, #e6e6e6);\n}\n\n.alert-button-inner.sc-ion-alert-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\n.alert-tappable.sc-ion-alert-ios {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  font-size: inherit;\n  line-height: initial;\n  text-align: start;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  contain: strict;\n}\n\n.alert-button.sc-ion-alert-ios, .alert-checkbox.sc-ion-alert-ios, .alert-input.sc-ion-alert-ios, .alert-radio.sc-ion-alert-ios {\n  outline: none;\n}\n\n.alert-radio-icon.sc-ion-alert-ios, .alert-checkbox-icon.sc-ion-alert-ios, .alert-checkbox-inner.sc-ion-alert-ios {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.sc-ion-alert-ios-h {\n  --background: var(--ion-overlay-background-color, var(--ion-color-step-150, #f9f9f9));\n  --max-width: 270px;\n  font-size: 14px;\n}\n\n.alert-wrapper.sc-ion-alert-ios {\n  border-radius: 13px;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  overflow: hidden;\n}\n\n.alert-translucent.sc-ion-alert-ios-h .alert-wrapper.sc-ion-alert-ios {\n  background: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.9);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px);\n}\n\n.alert-head.sc-ion-alert-ios {\n  padding-left: 16px;\n  padding-right: 16px;\n  padding-top: 12px;\n  padding-bottom: 7px;\n  text-align: center;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-head.sc-ion-alert-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n    -webkit-padding-end: 16px;\n    padding-inline-end: 16px;\n  }\n}\n\n.alert-title.sc-ion-alert-ios {\n  margin-top: 8px;\n  color: var(--ion-text-color, #000);\n  font-size: 17px;\n  font-weight: 600;\n}\n.alert-sub-title.sc-ion-alert-ios {\n  color: var(--ion-color-step-600, #666666);\n  font-size: 14px;\n}\n\n.alert-message.sc-ion-alert-ios, .alert-input-group.sc-ion-alert-ios {\n  padding-left: 16px;\n  padding-right: 16px;\n  padding-top: 0;\n  padding-bottom: 21px;\n  color: var(--ion-text-color, #000);\n  font-size: 13px;\n  text-align: center;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-message.sc-ion-alert-ios, .alert-input-group.sc-ion-alert-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n    -webkit-padding-end: 16px;\n    padding-inline-end: 16px;\n  }\n}\n\n.alert-message.sc-ion-alert-ios {\n  max-height: 240px;\n}\n\n.alert-message.sc-ion-alert-ios:empty {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 12px;\n}\n\n.alert-input.sc-ion-alert-ios {\n  border-radius: 4px;\n  margin-top: 10px;\n  padding-left: 6px;\n  padding-right: 6px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n  border: 0.55px solid var(--ion-color-step-250, #bfbfbf);\n  background-color: var(--ion-background-color, #fff);\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-input.sc-ion-alert-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 6px;\n    padding-inline-start: 6px;\n    -webkit-padding-end: 6px;\n    padding-inline-end: 6px;\n  }\n}\n.alert-input.sc-ion-alert-ios::-webkit-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-ios::-moz-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-ios:-ms-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-ios::-ms-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-ios::placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-ios::-ms-clear {\n  display: none;\n}\n\n.alert-radio-group.sc-ion-alert-ios, .alert-checkbox-group.sc-ion-alert-ios {\n  -ms-scroll-chaining: none;\n  overscroll-behavior: contain;\n  max-height: 240px;\n  border-top: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n.alert-tappable.sc-ion-alert-ios {\n  height: 44px;\n}\n\n.alert-radio-label.sc-ion-alert-ios {\n  padding-left: 13px;\n  padding-right: 13px;\n  padding-top: 13px;\n  padding-bottom: 13px;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-order: 0;\n  order: 0;\n  color: var(--ion-text-color, #000);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-radio-label.sc-ion-alert-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 13px;\n    padding-inline-start: 13px;\n    -webkit-padding-end: 13px;\n    padding-inline-end: 13px;\n  }\n}\n\n[aria-checked=true].sc-ion-alert-ios .alert-radio-label.sc-ion-alert-ios {\n  color: var(--ion-color-primary, #3880ff);\n}\n\n.alert-radio-icon.sc-ion-alert-ios {\n  position: relative;\n  -ms-flex-order: 1;\n  order: 1;\n  min-width: 30px;\n}\n\n[aria-checked=true].sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios {\n  left: 7px;\n  top: -7px;\n  position: absolute;\n  width: 6px;\n  height: 12px;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  border-width: 2px;\n  border-top-width: 0;\n  border-left-width: 0;\n  border-style: solid;\n  border-color: var(--ion-color-primary, #3880ff);\n}\n[dir=rtl].sc-ion-alert-ios [aria-checked=true].sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios, [dir=rtl].sc-ion-alert-ios-h [aria-checked=true].sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios, [dir=rtl] .sc-ion-alert-ios-h [aria-checked=true].sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios {\n  left: unset;\n  right: unset;\n  right: 7px;\n}\n\n.alert-checkbox-label.sc-ion-alert-ios {\n  padding-left: 13px;\n  padding-right: 13px;\n  padding-top: 13px;\n  padding-bottom: 13px;\n  -ms-flex: 1;\n  flex: 1;\n  color: var(--ion-text-color, #000);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-checkbox-label.sc-ion-alert-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 13px;\n    padding-inline-start: 13px;\n    -webkit-padding-end: 13px;\n    padding-inline-end: 13px;\n  }\n}\n\n.alert-checkbox-icon.sc-ion-alert-ios {\n  border-radius: 50%;\n  margin-left: 16px;\n  margin-right: 6px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  position: relative;\n  width: 24px;\n  height: 24px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, #c8c7cc)));\n  background-color: var(--ion-item-background, var(--ion-background-color, #fff));\n  contain: strict;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-checkbox-icon.sc-ion-alert-ios {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 16px;\n    margin-inline-start: 16px;\n    -webkit-margin-end: 6px;\n    margin-inline-end: 6px;\n  }\n}\n\n[aria-checked=true].sc-ion-alert-ios .alert-checkbox-icon.sc-ion-alert-ios {\n  border-color: var(--ion-color-primary, #3880ff);\n  background-color: var(--ion-color-primary, #3880ff);\n}\n\n[aria-checked=true].sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios {\n  left: 9px;\n  top: 4px;\n  position: absolute;\n  width: 5px;\n  height: 12px;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  border-width: 1px;\n  border-top-width: 0;\n  border-left-width: 0;\n  border-style: solid;\n  border-color: var(--ion-background-color, #fff);\n}\n[dir=rtl].sc-ion-alert-ios [aria-checked=true].sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios, [dir=rtl].sc-ion-alert-ios-h [aria-checked=true].sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios, [dir=rtl] .sc-ion-alert-ios-h [aria-checked=true].sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios {\n  left: unset;\n  right: unset;\n  right: 9px;\n}\n\n.alert-button-group.sc-ion-alert-ios {\n  margin-right: -0.55px;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-button-group.sc-ion-alert-ios {\n    margin-right: unset;\n    -webkit-margin-end: -0.55px;\n    margin-inline-end: -0.55px;\n  }\n}\n\n.alert-button.sc-ion-alert-ios {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  border-radius: 0;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  min-width: 50%;\n  height: 44px;\n  border-top: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);\n  border-right: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);\n  background-color: transparent;\n  color: var(--ion-color-primary, #3880ff);\n  font-size: 17px;\n  overflow: hidden;\n}\n\n[dir=rtl].sc-ion-alert-ios .alert-button.sc-ion-alert-ios:first-child, [dir=rtl].sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:first-child, [dir=rtl] .sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:first-child {\n  border-right: 0;\n}\n\n.alert-button.sc-ion-alert-ios:last-child {\n  border-right: 0;\n  font-weight: bold;\n}\n[dir=rtl].sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child, [dir=rtl].sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:last-child, [dir=rtl] .sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:last-child {\n  border-right: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);\n}\n\n.alert-button.activated.sc-ion-alert-ios {\n  background-color: rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.1);\n}"; }
}
function buttonClass(button) {
    return Object.assign({ 'alert-button': true, 'ion-focusable': true, 'ion-activatable': true }, getClassMap(button.cssClass));
}

export { Alert as ion_alert };
