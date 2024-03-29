import { r as registerInstance, f as getIonMode, c as createEvent, i as getContext, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { p as present, d as dismiss, e as eventMethod, i as isCancel } from './chunk-efd2c884.js';
import { c as createColorClasses, g as getClassMap } from './chunk-abd3a723.js';

/**
 * iOS Toast Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * iOS Toast Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

/**
 * MD Toast Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperEl.style.top = top;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * md Toast Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Toast {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * How many milliseconds to wait before hiding the toast. By default, it will show
         * until `dismiss()` is called.
         */
        this.duration = 0;
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = false;
        /**
         * The position of the toast on the screen.
         */
        this.position = 'bottom';
        /**
         * If `true`, the close button will be displayed.
         */
        this.showCloseButton = false;
        /**
         * If `true`, the toast will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the toast will animate.
         */
        this.animated = true;
        this.didPresent = createEvent(this, "ionToastDidPresent", 7);
        this.willPresent = createEvent(this, "ionToastWillPresent", 7);
        this.willDismiss = createEvent(this, "ionToastWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionToastDidDismiss", 7);
        this.config = getContext(this, "config");
    }
    /**
     * Present the toast overlay after it has been created.
     */
    async present() {
        await present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this.duration);
        }
    }
    /**
     * Dismiss the toast overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the toast.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the toast.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    /**
     * Returns a promise that resolves when the toast did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionToastDidDismiss');
    }
    /**
     * Returns a promise that resolves when the toast will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionToastWillDismiss');
    }
    getButtons() {
        const buttons = this.buttons
            ? this.buttons.map(b => {
                return (typeof b === 'string')
                    ? { text: b }
                    : b;
            })
            : [];
        if (this.showCloseButton) {
            buttons.push({
                text: this.closeButtonText || 'Close',
                handler: () => this.dismiss(undefined, 'cancel')
            });
        }
        return buttons;
    }
    async buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            return this.dismiss(undefined, role);
        }
        const shouldDismiss = await this.callButtonHandler(button);
        if (shouldDismiss) {
            return this.dismiss(undefined, button.role);
        }
        return Promise.resolve();
    }
    async callButtonHandler(button) {
        if (button && button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            try {
                const rtn = await button.handler();
                if (rtn === false) {
                    // if the return value of the handler is false then do not dismiss
                    return false;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return true;
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            style: {
                zIndex: 60000 + this.overlayIndex,
            },
            class: Object.assign({ [`${mode}`]: true }, createColorClasses(this.color), getClassMap(this.cssClass), { 'toast-translucent': this.translucent })
        };
    }
    renderButtons(buttons, side) {
        if (buttons.length === 0) {
            return;
        }
        const mode = getIonMode(this);
        const buttonGroupsClasses = {
            'toast-button-group': true,
            [`toast-button-group-${side}`]: true
        };
        return (h("div", { class: buttonGroupsClasses }, buttons.map(b => h("button", { type: "button", class: buttonClass(b), tabIndex: 0, onClick: () => this.buttonClick(b) }, h("div", { class: "toast-button-inner" }, b.icon &&
            h("ion-icon", { name: b.icon, slot: b.text === undefined ? 'icon-only' : undefined, class: "toast-icon" }), b.text), mode === 'md' && h("ion-ripple-effect", { type: b.icon !== undefined && b.text === undefined ? 'unbounded' : 'bounded' })))));
    }
    __stencil_render() {
        const allButtons = this.getButtons();
        const startButtons = allButtons.filter(b => b.side === 'start');
        const endButtons = allButtons.filter(b => b.side !== 'start');
        const wrapperClass = {
            'toast-wrapper': true,
            [`toast-${this.position}`]: true
        };
        return (h("div", { class: wrapperClass }, h("div", { class: "toast-container" }, this.renderButtons(startButtons, 'start'), h("div", { class: "toast-content" }, this.header !== undefined &&
            h("div", { class: "toast-header" }, this.header), this.message !== undefined &&
            h("div", { class: "toast-message" }, this.message)), this.renderButtons(endButtons, 'end'))));
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toast\n   * \@prop --color: Color of the toast text\n   *\n   * \@prop --border-color: Border color of the toast\n   * \@prop --border-radius: Border radius of the toast\n   * \@prop --border-width: Border width of the toast\n   * \@prop --border-style: Border style of the toast\n   *\n   * \@prop --box-shadow: Box shadow of the toast\n   *\n   * \@prop --min-width: Minimum width of the toast\n   * \@prop --width: Width of the toast\n   * \@prop --max-width: Maximum width of the toast\n   *\n   * \@prop --min-height: Minimum height of the toast\n   * \@prop --height: Height of the toast\n   * \@prop --max-height: Maximum height of the toast\n   *\n   * \@prop --button-color: Color of the button text\n   *\n   * \@prop --start: Position from the start\n   * \@prop --end: Position from the end\n   */\n  --border-width: 0;\n  --border-style: none;\n  --border-color: initial;\n  --box-shadow: none;\n  --min-width: auto;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  --max-height: auto;\n  left: 0;\n  top: 0;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  z-index: 1000;\n  pointer-events: none;\n}\n:host-context([dir=rtl]) {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\n:host(.overlay-hidden) {\n  display: none;\n}\n\n:host(.ion-color) {\n  --button-color: inherit;\n  color: var(--ion-color-contrast);\n}\n\n:host(.ion-color) .toast-wrapper {\n  background: var(--ion-color-base);\n}\n\n.toast-wrapper {\n  border-radius: var(--border-radius);\n  left: var(--start);\n  right: var(--end);\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n}\n[dir=rtl] .toast-wrapper, :host-context([dir=rtl]) .toast-wrapper {\n  left: unset;\n  right: unset;\n  left: var(--end);\n  right: var(--start);\n}\n\n.toast-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  pointer-events: auto;\n  contain: content;\n}\n\n.toast-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.toast-message {\n  -ms-flex: 1;\n  flex: 1;\n  white-space: pre-wrap;\n}\n\n.toast-button-group {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.toast-button {\n  border: 0;\n  outline: none;\n  color: var(--button-color);\n  z-index: 0;\n}\n\n.toast-icon {\n  font-size: 1.4em;\n}\n\n.toast-button-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n\@media (any-hover: hover) {\n  .toast-button:hover {\n    cursor: pointer;\n  }\n}\n:host {\n  --background: var(--ion-color-step-800, #333333);\n  --border-radius: 4px;\n  --box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);\n  --button-color: var(--ion-color-primary, #3880ff);\n  --color: var(--ion-color-step-50, #f2f2f2);\n  --max-width: 700px;\n  --start: 8px;\n  --end: 8px;\n  font-size: 14px;\n}\n\n.toast-wrapper {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: auto;\n  margin-bottom: auto;\n  display: block;\n  position: absolute;\n  opacity: 0.01;\n  z-index: 10;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-wrapper {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: auto;\n    margin-inline-start: auto;\n    -webkit-margin-end: auto;\n    margin-inline-end: auto;\n  }\n}\n\n.toast-content {\n  padding-left: 16px;\n  padding-right: 16px;\n  padding-top: 14px;\n  padding-bottom: 14px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-content {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n    -webkit-padding-end: 16px;\n    padding-inline-end: 16px;\n  }\n}\n\n.toast-header {\n  margin-bottom: 2px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n.toast-message {\n  line-height: 20px;\n}\n\n.toast-button-group-start {\n  margin-left: 8px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-button-group-start {\n    margin-left: unset;\n    -webkit-margin-start: 8px;\n    margin-inline-start: 8px;\n  }\n}\n\n.toast-button-group-end {\n  margin-right: 8px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-button-group-end {\n    margin-right: unset;\n    -webkit-margin-end: 8px;\n    margin-inline-end: 8px;\n  }\n}\n\n.toast-button {\n  padding-left: 15px;\n  padding-right: 15px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  position: relative;\n  background-color: transparent;\n  font-family: var(--ion-font-family);\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.84px;\n  text-transform: uppercase;\n  overflow: hidden;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-button {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 15px;\n    padding-inline-start: 15px;\n    -webkit-padding-end: 15px;\n    padding-inline-end: 15px;\n  }\n}\n\n.toast-button-cancel {\n  color: var(--ion-color-step-100, #e6e6e6);\n}\n\n.toast-button-icon-only {\n  border-radius: 50%;\n  padding-left: 9px;\n  padding-right: 9px;\n  padding-top: 9px;\n  padding-bottom: 9px;\n  width: 36px;\n  height: 36px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .toast-button-icon-only {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 9px;\n    padding-inline-start: 9px;\n    -webkit-padding-end: 9px;\n    padding-inline-end: 9px;\n  }\n}\n\n\@media (any-hover: hover) {\n  .toast-button:hover {\n    background-color: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.08);\n  }\n\n  .toast-button-cancel:hover {\n    background-color: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.08);\n  }\n}"; }
}
function buttonClass(button) {
    return Object.assign({ 'toast-button': true, 'toast-button-icon-only': button.icon !== undefined && button.text === undefined, [`toast-button-${button.role}`]: button.role !== undefined, 'ion-focusable': true, 'ion-activatable': true }, getClassMap(button.cssClass));
}

export { Toast as ion_toast };
