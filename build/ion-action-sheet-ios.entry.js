import { e as registerInstance, h as getIonMode, i as createEvent, j as getContext, f as h, g as getElement, k as Host } from './dlc-markdown-editor-3c7af0f3.js';
import { a as BACKDROP, b as isCancel, c as present, d as dismiss, e as eventMethod } from './chunk-d1a72b9a.js';
import { a as getClassMap } from './chunk-4d735167.js';

/**
 * iOS Action Sheet Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.4);
    wrapperAnimation.fromTo('translateY', '100%', '0%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * iOS Action Sheet Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.4, 0);
    wrapperAnimation.fromTo('translateY', '0%', '100%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(450)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * MD Action Sheet Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('translateY', '100%', '0%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * MD Action Sheet Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('translateY', '0%', '100%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(450)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class ActionSheet {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * An array of buttons for the action sheet.
         */
        this.buttons = [];
        /**
         * If `true`, the action sheet will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, the action sheet will be translucent. Only applies when the mode is `"ios"` and the device supports backdrop-filter.
         */
        this.translucent = false;
        /**
         * If `true`, the action sheet will animate.
         */
        this.animated = true;
        this.didPresent = createEvent(this, "ionActionSheetDidPresent", 7);
        this.willPresent = createEvent(this, "ionActionSheetWillPresent", 7);
        this.willDismiss = createEvent(this, "ionActionSheetWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionActionSheetDidDismiss", 7);
        this.config = getContext(this, "config");
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    dispatchCancelHandler(ev) {
        const role = ev.detail.role;
        if (isCancel(role)) {
            const cancelButton = this.getButtons().find(b => b.role === 'cancel');
            this.callButtonHandler(cancelButton);
        }
    }
    /**
     * Present the action sheet overlay after it has been created.
     */
    present() {
        return present(this, 'actionSheetEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the action sheet overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the action sheet.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the action sheet.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    dismiss(data, role) {
        return dismiss(this, data, role, 'actionSheetLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the action sheet did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionActionSheetDidDismiss');
    }
    /**
     * Returns a promise that resolves when the action sheet will dismiss.
     *
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionActionSheetWillDismiss');
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
    getButtons() {
        return this.buttons.map(b => {
            return (typeof b === 'string')
                ? { text: b }
                : b;
        });
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            'role': 'dialog',
            'aria-modal': 'true',
            style: {
                zIndex: 20000 + this.overlayIndex,
            },
            class: Object.assign({ [`${mode}`]: true }, getClassMap(this.cssClass), { 'action-sheet-translucent': this.translucent })
        };
    }
    __stencil_render() {
        const mode = getIonMode(this);
        const allButtons = this.getButtons();
        const cancelButton = allButtons.find(b => b.role === 'cancel');
        const buttons = allButtons.filter(b => b.role !== 'cancel');
        return [
            h("ion-backdrop", { tappable: this.backdropDismiss }),
            h("div", { class: "action-sheet-wrapper", role: "dialog" }, h("div", { class: "action-sheet-container" }, h("div", { class: "action-sheet-group" }, this.header !== undefined &&
                h("div", { class: "action-sheet-title" }, this.header, this.subHeader && h("div", { class: "action-sheet-sub-title" }, this.subHeader)), buttons.map(b => h("button", { type: "button", "ion-activatable": true, class: buttonClass(b), onClick: () => this.buttonClick(b) }, h("span", { class: "action-sheet-button-inner" }, b.icon && h("ion-icon", { icon: b.icon, lazy: false, class: "action-sheet-icon" }), b.text), mode === 'md' && h("ion-ripple-effect", null)))), cancelButton &&
                h("div", { class: "action-sheet-group action-sheet-group-cancel" }, h("button", { type: "button", class: buttonClass(cancelButton), onClick: () => this.buttonClick(cancelButton) }, h("span", { class: "action-sheet-button-inner" }, cancelButton.icon &&
                    h("ion-icon", { icon: cancelButton.icon, lazy: false, class: "action-sheet-icon" }), cancelButton.text)))))
        ];
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-action-sheet-ios-h {\n  \n  --color: initial;\n  --min-width: auto;\n  --width: 100%;\n  --max-width: 500px;\n  --min-height: auto;\n  --height: 100%;\n  --max-height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n  position: fixed;\n  font-family: var(--ion-font-family, inherit);\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1000;\n}\n\n.overlay-hidden.sc-ion-action-sheet-ios-h {\n  display: none;\n}\n\n.action-sheet-wrapper.sc-ion-action-sheet-ios {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: auto;\n  margin-bottom: auto;\n  -webkit-transform: translate3d(0,  100%,  0);\n  transform: translate3d(0,  100%,  0);\n  display: block;\n  position: absolute;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  z-index: 10;\n  pointer-events: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-wrapper.sc-ion-action-sheet-ios {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: auto;\n    margin-inline-start: auto;\n    -webkit-margin-end: auto;\n    margin-inline-end: auto;\n  }\n}\n\n.action-sheet-button.sc-ion-action-sheet-ios {\n  width: 100%;\n  border: 0;\n  outline: none;\n  font-family: inherit;\n}\n\n.action-sheet-button.activated.sc-ion-action-sheet-ios {\n  background: var(--background-activated);\n}\n\n.action-sheet-button-inner.sc-ion-action-sheet-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\n.action-sheet-container.sc-ion-action-sheet-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column;\n  flex-flow: column;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  height: 100%;\n  max-height: 100%;\n}\n\n.action-sheet-group.sc-ion-action-sheet-ios {\n  -ms-flex-negative: 2;\n  flex-shrink: 2;\n  overscroll-behavior-y: contain;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  pointer-events: all;\n  background: var(--background);\n}\n\n.action-sheet-group.sc-ion-action-sheet-ios::-webkit-scrollbar {\n  display: none;\n}\n\n.action-sheet-group-cancel.sc-ion-action-sheet-ios {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n\n.action-sheet-selected.sc-ion-action-sheet-ios {\n  background: var(--background-selected);\n}\n\n.sc-ion-action-sheet-ios-h {\n  --background: var(--ion-overlay-background-color, var(--ion-color-step-150, #f9f9f9));\n  --background-selected: var(--ion-background-color, #fff);\n  --background-activated: rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08);\n  text-align: center;\n}\n\n.action-sheet-wrapper.sc-ion-action-sheet-ios {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: var(--ion-safe-area-top, 0);\n  margin-bottom: var(--ion-safe-area-bottom, 0);\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-wrapper.sc-ion-action-sheet-ios {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: auto;\n    margin-inline-start: auto;\n    -webkit-margin-end: auto;\n    margin-inline-end: auto;\n  }\n}\n\n.action-sheet-container.sc-ion-action-sheet-ios {\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-container.sc-ion-action-sheet-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 8px;\n    padding-inline-start: 8px;\n    -webkit-padding-end: 8px;\n    padding-inline-end: 8px;\n  }\n}\n\n.action-sheet-group.sc-ion-action-sheet-ios {\n  border-radius: 13px;\n  margin-bottom: 8px;\n  overflow: hidden;\n}\n.action-sheet-group.sc-ion-action-sheet-ios:first-child {\n  margin-top: 10px;\n}\n.action-sheet-group.sc-ion-action-sheet-ios:last-child {\n  margin-bottom: 10px;\n}\n\@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))) {\n  .action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-group.sc-ion-action-sheet-ios {\n    background-color: transparent;\n    -webkit-backdrop-filter: saturate(280%) blur(20px);\n    backdrop-filter: saturate(280%) blur(20px);\n  }\n\n  .action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-title.sc-ion-action-sheet-ios, .action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-button.sc-ion-action-sheet-ios {\n    background-color: transparent;\n    background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)), to(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8))), -webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4)), color-stop(50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4)), color-stop(50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)));\n    background-image: linear-gradient(0deg, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8), rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%), linear-gradient(0deg, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4), rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4) 50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 50%);\n    background-repeat: no-repeat;\n    \n    background-position: top, bottom;\n    background-size: 100% calc(100% - 1px), 100% 1px;\n    -webkit-backdrop-filter: saturate(120%);\n    backdrop-filter: saturate(120%);\n  }\n\n  .action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-button.activated.sc-ion-action-sheet-ios {\n    background-color: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.7);\n    background-image: none;\n  }\n\n  .action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-cancel.sc-ion-action-sheet-ios {\n    background: var(--background-selected);\n  }\n}\n.action-sheet-title.sc-ion-action-sheet-ios, .action-sheet-button.sc-ion-action-sheet-ios {\n  background-color: transparent;\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08)), color-stop(50%, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08)), color-stop(50%, transparent));\n  background-image: linear-gradient(0deg, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08), rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08) 50%, transparent 50%);\n  background-repeat: no-repeat;\n  \n  background-position: bottom;\n  background-size: 100% 1px;\n}\n\n.action-sheet-title.sc-ion-action-sheet-ios {\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 14px;\n  padding-bottom: 13px;\n  color: var(--color, var(--ion-color-step-400, #999999));\n  font-size: 13px;\n  font-weight: 400;\n  text-align: center;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-title.sc-ion-action-sheet-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 10px;\n    padding-inline-start: 10px;\n    -webkit-padding-end: 10px;\n    padding-inline-end: 10px;\n  }\n}\n\n.action-sheet-sub-title.sc-ion-action-sheet-ios {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 15px;\n  padding-bottom: 0;\n  font-size: 12px;\n}\n\n.action-sheet-button.sc-ion-action-sheet-ios {\n  padding-left: 18px;\n  padding-right: 18px;\n  padding-top: 18px;\n  padding-bottom: 18px;\n  height: 56px;\n  color: var(--color, var(--ion-color-primary, #3880ff));\n  font-size: 20px;\n  contain: strict;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-button.sc-ion-action-sheet-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 18px;\n    padding-inline-start: 18px;\n    -webkit-padding-end: 18px;\n    padding-inline-end: 18px;\n  }\n}\n\n.action-sheet-button.sc-ion-action-sheet-ios .action-sheet-icon.sc-ion-action-sheet-ios {\n  margin-right: 0.1em;\n  font-size: 28px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .action-sheet-button.sc-ion-action-sheet-ios .action-sheet-icon.sc-ion-action-sheet-ios {\n    margin-right: unset;\n    -webkit-margin-end: 0.1em;\n    margin-inline-end: 0.1em;\n  }\n}\n\n.action-sheet-button.sc-ion-action-sheet-ios:last-child {\n  background-image: none;\n}\n\n.action-sheet-selected.sc-ion-action-sheet-ios {\n  background: var(--background-selected);\n  font-weight: bold;\n}\n\n.action-sheet-destructive.sc-ion-action-sheet-ios {\n  color: var(--ion-color-danger, #f04141);\n}\n\n.action-sheet-cancel.sc-ion-action-sheet-ios {\n  background: var(--background-selected);\n  font-weight: 600;\n}"; }
}
function buttonClass(button) {
    return Object.assign({ 'action-sheet-button': true, 'ion-activatable': true, [`action-sheet-${button.role}`]: button.role !== undefined }, getClassMap(button.cssClass));
}

export { ActionSheet as ion_action_sheet };
