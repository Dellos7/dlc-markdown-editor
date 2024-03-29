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
    static get style() { return ".sc-ion-alert-md-h {\n  \n  --min-width: 250px;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  --max-height: 90%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1000;\n}\n\n.overlay-hidden.sc-ion-alert-md-h {\n  display: none;\n}\n\n.alert-top.sc-ion-alert-md-h {\n  padding-top: 50px;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n.alert-wrapper.sc-ion-alert-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  contain: content;\n  opacity: 0;\n  z-index: 10;\n}\n\n.alert-title.sc-ion-alert-md {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.alert-sub-title.sc-ion-alert-md {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 5px;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  font-weight: normal;\n}\n\n.alert-message.sc-ion-alert-md {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: auto;\n  overscroll-behavior-y: contain;\n}\n\n.alert-checkbox-group.sc-ion-alert-md::-webkit-scrollbar, .alert-radio-group.sc-ion-alert-md::-webkit-scrollbar, .alert-message.sc-ion-alert-md::-webkit-scrollbar {\n  display: none;\n}\n\n.alert-input.sc-ion-alert-md {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  width: 100%;\n  border: 0;\n  background: inherit;\n  font: inherit;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.alert-button-group.sc-ion-alert-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  width: 100%;\n}\n\n.alert-button-group-vertical.sc-ion-alert-md {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n}\n\n.alert-button.sc-ion-alert-md {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  display: block;\n  border: 0;\n  font-size: 14px;\n  line-height: 20px;\n  z-index: 0;\n}\n\n.alert-button.ion-focused.sc-ion-alert-md, .alert-tappable.ion-focused.sc-ion-alert-md {\n  background: var(--ion-color-step-100, #e6e6e6);\n}\n\n.alert-button-inner.sc-ion-alert-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\n.alert-tappable.sc-ion-alert-md {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  font-size: inherit;\n  line-height: initial;\n  text-align: start;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  contain: strict;\n}\n\n.alert-button.sc-ion-alert-md, .alert-checkbox.sc-ion-alert-md, .alert-input.sc-ion-alert-md, .alert-radio.sc-ion-alert-md {\n  outline: none;\n}\n\n.alert-radio-icon.sc-ion-alert-md, .alert-checkbox-icon.sc-ion-alert-md, .alert-checkbox-inner.sc-ion-alert-md {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.sc-ion-alert-md-h {\n  --background: var(--ion-overlay-background-color, #fff);\n  --max-width: 280px;\n  font-size: 14px;\n}\n\n.alert-wrapper.sc-ion-alert-md {\n  border-radius: 4px;\n  -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n}\n\n.alert-head.sc-ion-alert-md {\n  padding-left: 23px;\n  padding-right: 23px;\n  padding-top: 20px;\n  padding-bottom: 15px;\n  text-align: start;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-head.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 23px;\n    padding-inline-start: 23px;\n    -webkit-padding-end: 23px;\n    padding-inline-end: 23px;\n  }\n}\n\n.alert-title.sc-ion-alert-md {\n  color: var(--ion-text-color, #000);\n  font-size: 20px;\n  font-weight: 500;\n}\n\n.alert-sub-title.sc-ion-alert-md {\n  color: var(--ion-text-color, #000);\n  font-size: 16px;\n}\n\n.alert-message.sc-ion-alert-md, .alert-input-group.sc-ion-alert-md {\n  padding-left: 24px;\n  padding-right: 24px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: var(--ion-color-step-550, #737373);\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-message.sc-ion-alert-md, .alert-input-group.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 24px;\n    padding-inline-start: 24px;\n    -webkit-padding-end: 24px;\n    padding-inline-end: 24px;\n  }\n}\n\n.alert-message.sc-ion-alert-md {\n  max-height: 240px;\n  font-size: 16px;\n}\n\n.alert-message.sc-ion-alert-md:empty {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.alert-head.sc-ion-alert-md + .alert-message.sc-ion-alert-md {\n  padding-top: 0;\n}\n\n.alert-input.sc-ion-alert-md {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  border-bottom: 1px solid var(--ion-color-step-150, #d9d9d9);\n  color: var(--ion-text-color, #000);\n}\n.alert-input.sc-ion-alert-md::-webkit-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-md::-moz-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-md:-ms-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-md::-ms-input-placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-md::placeholder {\n  color: var(--ion-placeholder-color, var(--ion-color-step-400, #999999));\n  font-family: inherit;\n  font-weight: inherit;\n}\n.alert-input.sc-ion-alert-md::-ms-clear {\n  display: none;\n}\n\n.alert-input.sc-ion-alert-md:focus {\n  margin-bottom: 4px;\n  border-bottom: 2px solid var(--ion-color-primary, #3880ff);\n}\n.alert-radio-group.sc-ion-alert-md, .alert-checkbox-group.sc-ion-alert-md {\n  position: relative;\n  max-height: 240px;\n  border-top: 1px solid var(--ion-color-step-150, #d9d9d9);\n  border-bottom: 1px solid var(--ion-color-step-150, #d9d9d9);\n  overflow: auto;\n}\n\n.alert-tappable.sc-ion-alert-md {\n  position: relative;\n  height: 48px;\n  overflow: hidden;\n}\n\n.alert-radio-label.sc-ion-alert-md {\n  padding-left: 52px;\n  padding-right: 26px;\n  padding-top: 13px;\n  padding-bottom: 13px;\n  -ms-flex: 1;\n  flex: 1;\n  color: var(--ion-color-step-850, #262626);\n  font-size: 16px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-radio-label.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 52px;\n    padding-inline-start: 52px;\n    -webkit-padding-end: 26px;\n    padding-inline-end: 26px;\n  }\n}\n\n.alert-radio-icon.sc-ion-alert-md {\n  left: 26px;\n  top: 0;\n  border-radius: 50%;\n  display: block;\n  position: relative;\n  width: 20px;\n  height: 20px;\n  border-width: 2px;\n  border-style: solid;\n  border-color: var(--ion-color-step-550, #737373);\n}\n[dir=rtl].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md-h .alert-radio-icon.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-radio-icon.sc-ion-alert-md {\n  left: unset;\n  right: unset;\n  right: 26px;\n}\n\n.alert-radio-inner.sc-ion-alert-md {\n  left: 3px;\n  top: 3px;\n  border-radius: 50%;\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  -webkit-transform: scale3d(0, 0, 0);\n  transform: scale3d(0, 0, 0);\n  -webkit-transition: -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: var(--ion-color-primary, #3880ff);\n}\n[dir=rtl].sc-ion-alert-md .alert-radio-inner.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md-h .alert-radio-inner.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-radio-inner.sc-ion-alert-md {\n  left: unset;\n  right: unset;\n  right: 3px;\n}\n\n[aria-checked=true].sc-ion-alert-md .alert-radio-label.sc-ion-alert-md {\n  color: var(--ion-color-step-850, #262626);\n}\n\n[aria-checked=true].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md {\n  border-color: var(--ion-color-primary, #3880ff);\n}\n\n[aria-checked=true].sc-ion-alert-md .alert-radio-inner.sc-ion-alert-md {\n  -webkit-transform: scale3d(1, 1, 1);\n  transform: scale3d(1, 1, 1);\n}\n\n.alert-checkbox-label.sc-ion-alert-md {\n  padding-left: 53px;\n  padding-right: 26px;\n  padding-top: 13px;\n  padding-bottom: 13px;\n  -ms-flex: 1;\n  flex: 1;\n  color: var(--ion-color-step-850, #262626);\n  font-size: 16px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-checkbox-label.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 53px;\n    padding-inline-start: 53px;\n    -webkit-padding-end: 26px;\n    padding-inline-end: 26px;\n  }\n}\n\n.alert-checkbox-icon.sc-ion-alert-md {\n  left: 26px;\n  top: 0;\n  border-radius: 2px;\n  position: relative;\n  width: 16px;\n  height: 16px;\n  border-width: 2px;\n  border-style: solid;\n  border-color: var(--ion-color-step-550, #737373);\n  contain: strict;\n}\n[dir=rtl].sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md-h .alert-checkbox-icon.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-checkbox-icon.sc-ion-alert-md {\n  left: unset;\n  right: unset;\n  right: 26px;\n}\n\n[aria-checked=true].sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md {\n  border-color: var(--ion-color-primary, #3880ff);\n  background-color: var(--ion-color-primary, #3880ff);\n}\n\n[aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md {\n  left: 3px;\n  top: 0;\n  position: absolute;\n  width: 6px;\n  height: 10px;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  border-width: 2px;\n  border-top-width: 0;\n  border-left-width: 0;\n  border-style: solid;\n  border-color: var(--ion-color-primary-contrast, #fff);\n}\n[dir=rtl].sc-ion-alert-md [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md-h [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md {\n  left: unset;\n  right: unset;\n  right: 3px;\n}\n\n.alert-button-group.sc-ion-alert-md {\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -ms-flex-wrap: wrap-reverse;\n  flex-wrap: wrap-reverse;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-button-group.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 8px;\n    padding-inline-start: 8px;\n    -webkit-padding-end: 8px;\n    padding-inline-end: 8px;\n  }\n}\n\n.alert-button.sc-ion-alert-md {\n  border-radius: 2px;\n  margin-left: 0;\n  margin-right: 8px;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  position: relative;\n  background-color: transparent;\n  color: var(--ion-color-primary, #3880ff);\n  font-weight: 500;\n  text-align: end;\n  text-transform: uppercase;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-button.sc-ion-alert-md {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n    -webkit-margin-end: 8px;\n    margin-inline-end: 8px;\n  }\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .alert-button.sc-ion-alert-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 10px;\n    padding-inline-start: 10px;\n    -webkit-padding-end: 10px;\n    padding-inline-end: 10px;\n  }\n}\n\n.alert-button-inner.sc-ion-alert-md {\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}"; }
}
function buttonClass(button) {
    return Object.assign({ 'alert-button': true, 'ion-focusable': true, 'ion-activatable': true }, getClassMap(button.cssClass));
}

export { Alert as ion_alert };
