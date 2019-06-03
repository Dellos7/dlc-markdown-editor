import { e as registerInstance, i as createEvent, j as getContext, h as getIonMode, f as h, g as getElement, k as Host } from './dlc-markdown-editor-3c7af0f3.js';
import { c as createColorClasses, d as hostContext } from './chunk-4d735167.js';
import { d as findItemLabel, e as renderHiddenInput } from './chunk-f3597f81.js';
import { d as hapticSelection } from './chunk-3a57d379.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Toggle {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = `ion-tg-${toggleIds++}`;
        this.lastDrag = 0;
        this.activated = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the toggle is selected.
         */
        this.checked = false;
        /**
         * If `true`, the user cannot interact with the toggle.
         */
        this.disabled = false;
        /**
         * The value of the toggle does not mean if it's checked or not, use the `checked`
         * property for that.
         *
         * The value of a toggle is analogous to the value of a `<input type="checkbox">`,
         * it's only used when the toggle participates in a native `<form>`.
         */
        this.value = 'on';
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.queue = getContext(this, "queue");
        this.doc = getContext(this, "document");
    }
    checkedChanged(isChecked) {
        this.ionChange.emit({
            checked: isChecked,
            value: this.value
        });
    }
    disabledChanged() {
        this.emitStyle();
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
    }
    componentWillLoad() {
        this.emitStyle();
    }
    async componentDidLoad() {
        this.gesture = (await __sc_import_dlc_markdown_editor('./index-b3da374b.js')).createGesture({
            el: this.el,
            gestureName: 'toggle',
            gesturePriority: 100,
            threshold: 5,
            passive: false,
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.disabledChanged();
    }
    componentDidUnload() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    }
    onClick() {
        if (this.lastDrag + 300 < Date.now()) {
            this.checked = !this.checked;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive-disabled': this.disabled,
        });
    }
    onStart() {
        this.activated = true;
        // touch-action does not work in iOS
        this.setFocus();
    }
    onMove(detail) {
        if (shouldToggle(document, this.checked, detail.deltaX, -10)) {
            this.checked = !this.checked;
            hapticSelection();
        }
    }
    onEnd(ev) {
        this.activated = false;
        this.lastDrag = Date.now();
        ev.event.preventDefault();
        ev.event.stopImmediatePropagation();
    }
    getValue() {
        return this.value || '';
    }
    setFocus() {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    }
    hostData() {
        const { inputId, disabled, checked, activated, color, el } = this;
        const mode = getIonMode(this);
        const labelId = inputId + '-lbl';
        const label = findItemLabel(el);
        if (label) {
            label.id = labelId;
        }
        return {
            'role': 'checkbox',
            'aria-disabled': disabled ? 'true' : null,
            'aria-checked': `${checked}`,
            'aria-labelledby': labelId,
            class: Object.assign({}, createColorClasses(color), { [`${mode}`]: true, 'in-item': hostContext('ion-item', el), 'toggle-activated': activated, 'toggle-checked': checked, 'toggle-disabled': disabled, 'interactive': true })
        };
    }
    __stencil_render() {
        const value = this.getValue();
        renderHiddenInput(true, this.el, this.name, (this.checked ? value : ''), this.disabled);
        return [
            h("div", { class: "toggle-icon" }, h("div", { class: "toggle-inner" })),
            h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: el => this.buttonEl = el })
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["checkedChanged"],
        "disabled": ["disabledChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toggle\n   * \@prop --background-checked: Background of the toggle when checked\n   * \@prop --handle-background: Background of the toggle handle\n   * \@prop --handle-background-checked: Background of the toggle handle when checked\n   */\n  /* stylelint-disable-next-line declaration-no-important */\n  -webkit-box-sizing: content-box !important;\n  box-sizing: content-box !important;\n  display: inline-block;\n  outline: none;\n  contain: content;\n  cursor: pointer;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 2;\n}\n\n:host(.ion-focused) input {\n  border: 2px solid #5e9ed6;\n}\n\n:host(.toggle-disabled) {\n  pointer-events: none;\n}\n\nbutton {\n  left: 0;\n  top: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n}\n[dir=rtl] button, :host-context([dir=rtl]) button {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\nbutton::-moz-focus-inner {\n  border: 0;\n}\n\n:host {\n  --background: var(--ion-color-medium-tint, #a2a4ab);\n  --background-checked: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.5);\n  --handle-background: var(--ion-background-color, #fff);\n  --handle-background-checked: var(--ion-color-primary, #3880ff);\n  padding-left: 12px;\n  padding-right: 12px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  contain: strict;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 12px;\n    padding-inline-start: 12px;\n    -webkit-padding-end: 12px;\n    padding-inline-end: 12px;\n  }\n}\n\n:host(.ion-color.toggle-checked) .toggle-icon {\n  background: rgba(var(--ion-color-base-rgb), 0.5);\n}\n\n:host(.ion-color.toggle-checked) .toggle-inner {\n  background: var(--ion-color-base);\n}\n\n.toggle-icon {\n  border-radius: 14px;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: background-color 160ms;\n  transition: background-color 160ms;\n  background: var(--background);\n  pointer-events: none;\n}\n\n.toggle-inner {\n  left: 0;\n  top: -3px;\n  border-radius: 50%;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  -webkit-transition-duration: 160ms;\n  transition-duration: 160ms;\n  -webkit-transition-property: background-color, -webkit-transform;\n  transition-property: background-color, -webkit-transform;\n  transition-property: transform, background-color;\n  transition-property: transform, background-color, -webkit-transform;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  background: var(--handle-background);\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  will-change: transform, background-color;\n  contain: strict;\n}\n[dir=rtl] .toggle-inner, :host-context([dir=rtl]) .toggle-inner {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\n:host(.toggle-checked) .toggle-icon {\n  background: var(--background-checked);\n}\n\n:host(.toggle-checked) .toggle-inner {\n  -webkit-transform: translate3d(16px,  0,  0);\n  transform: translate3d(16px,  0,  0);\n  background: var(--handle-background-checked);\n}\n:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner, :host-context([dir=rtl]).toggle-checked .toggle-inner {\n  -webkit-transform: translate3d(calc(-1 * 16px),  0,  0);\n  transform: translate3d(calc(-1 * 16px),  0,  0);\n}\n\n:host(.toggle-disabled) {\n  opacity: 0.3;\n}\n\n:host(.in-item[slot]) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 16px;\n  padding-right: 0;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  cursor: pointer;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.in-item[slot]) {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n    -webkit-padding-end: 0;\n    padding-inline-end: 0;\n  }\n}\n\n:host(.in-item[slot=start]) {\n  padding-left: 2px;\n  padding-right: 18px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.in-item[slot=start]) {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 2px;\n    padding-inline-start: 2px;\n    -webkit-padding-end: 18px;\n    padding-inline-end: 18px;\n  }\n}"; }
}
function shouldToggle(doc, checked, deltaX, margin) {
    const isRTL = doc.dir === 'rtl';
    if (checked) {
        return (!isRTL && (margin > deltaX)) ||
            (isRTL && (-margin < deltaX));
    }
    else {
        return (!isRTL && (-margin < deltaX)) ||
            (isRTL && (margin > deltaX));
    }
}
let toggleIds = 0;

export { Toggle as ion_toggle };
