import { e as registerInstance, h as getIonMode, i as createEvent, j as getContext, f as h, g as getElement, k as Host } from './dlc-markdown-editor-3c7af0f3.js';
import { a as BACKDROP, c as present, d as dismiss, e as eventMethod } from './chunk-d1a72b9a.js';
import { a as getClassMap } from './chunk-4d735167.js';
import { a as sanitizeDOMString } from './chunk-2ef9ae2f.js';

/**
 * iOS Loading Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * iOS Loading Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * Md Loading Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * Md Loading Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Loading {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * Number of milliseconds to wait before dismissing the loading indicator.
         */
        this.duration = 0;
        /**
         * If `true`, the loading indicator will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = false;
        /**
         * If `true`, a backdrop will be displayed behind the loading indicator.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the loading indicator will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the loading indicator will animate.
         */
        this.animated = true;
        this.didPresent = createEvent(this, "ionLoadingDidPresent", 7);
        this.willPresent = createEvent(this, "ionLoadingWillPresent", 7);
        this.willDismiss = createEvent(this, "ionLoadingWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionLoadingDidDismiss", 7);
        this.config = getContext(this, "config");
    }
    componentWillLoad() {
        if (this.spinner === undefined) {
            const mode = getIonMode(this);
            this.spinner = this.config.get('loadingSpinner', this.config.get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    /**
     * Present the loading overlay after it has been created.
     */
    async present() {
        await present(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation, undefined);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
    }
    /**
     * Dismiss the loading overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the loading.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the loading.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the loading did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionLoadingDidDismiss');
    }
    /**
     * Returns a promise that resolves when the loading will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionLoadingWillDismiss');
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            style: {
                zIndex: 40000 + this.overlayIndex
            },
            class: Object.assign({}, getClassMap(this.cssClass), { [`${mode}`]: true, 'loading-translucent': this.translucent })
        };
    }
    __stencil_render() {
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            h("div", { class: "loading-wrapper", role: "dialog" }, this.spinner && (h("div", { class: "loading-spinner" }, h("ion-spinner", { name: this.spinner }))), this.message && h("div", { class: "loading-content", innerHTML: sanitizeDOMString(this.message) }))
        ];
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-loading-md-h {\n  \n  --min-width: auto;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1000;\n}\n\n.overlay-hidden.sc-ion-loading-md-h {\n  display: none;\n}\n\n.loading-wrapper.sc-ion-loading-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-pack: inherit;\n  justify-content: inherit;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  opacity: 0;\n  z-index: 10;\n}\n\n.spinner-lines.sc-ion-loading-md, .spinner-lines-small.sc-ion-loading-md, .spinner-bubbles.sc-ion-loading-md, .spinner-circles.sc-ion-loading-md, .spinner-crescent.sc-ion-loading-md, .spinner-dots.sc-ion-loading-md {\n  color: var(--spinner-color);\n}\n\n.sc-ion-loading-md-h {\n  --background: var(--ion-color-step-50, #f2f2f2);\n  --max-width: 280px;\n  --max-height: 90%;\n  --spinner-color: var(--ion-color-primary, #3880ff);\n  color: var(--ion-color-step-850, #262626);\n  font-size: 14px;\n}\n\n.loading-wrapper.sc-ion-loading-md {\n  border-radius: 2px;\n  padding-left: 24px;\n  padding-right: 24px;\n  padding-top: 24px;\n  padding-bottom: 24px;\n  -webkit-box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4);\n  box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4);\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .loading-wrapper.sc-ion-loading-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 24px;\n    padding-inline-start: 24px;\n    -webkit-padding-end: 24px;\n    padding-inline-end: 24px;\n  }\n}\n\n.loading-spinner.sc-ion-loading-md + .loading-content.sc-ion-loading-md {\n  margin-left: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .loading-spinner.sc-ion-loading-md + .loading-content.sc-ion-loading-md {\n    margin-left: unset;\n    -webkit-margin-start: 16px;\n    margin-inline-start: 16px;\n  }\n}"; }
}

export { Loading as ion_loading };
