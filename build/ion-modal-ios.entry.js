import { r as registerInstance, f as getIonMode, c as createEvent, i as getContext, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { B as BACKDROP, p as present, d as dismiss, e as eventMethod } from './chunk-efd2c884.js';
import { g as getClassMap } from './chunk-abd3a723.js';
import { a as attachComponent, d as detachComponent } from './chunk-a88b8db5.js';
import { d as deepReady } from './chunk-17c2cb2e.js';

/**
 * iOS Modal Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '100%', '0%');
    backdropAnimation.fromTo('opacity', 0.01, 0.4);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(400)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
/**
 * Animations for modals
 */
// export function modalSlideIn(rootEl: HTMLElement) {
// }
// export class ModalSlideOut {
//   constructor(el: HTMLElement) {
//     let backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));
//     let wrapperEle = <HTMLElement>el.querySelector('.modal-wrapper');
//     let wrapperEleRect = wrapperEle.getBoundingClientRect();
//     let wrapper = new Animation(this.plt, wrapperEle);
//     // height of the screen - top of the container tells us how much to scoot it down
//     // so it's off-screen
//     wrapper.fromTo('translateY', '0px', `${this.plt.height() - wrapperEleRect.top}px`);
//     backdrop.fromTo('opacity', 0.4, 0.0);
//     this
//       .element(this.leavingView.pageRef())
//       .easing('ease-out')
//       .duration(250)
//       .add(backdrop)
//       .add(wrapper);
//   }
// }
// export class ModalMDSlideIn {
//   constructor(el: HTMLElement) {
//     const backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));
//     const wrapper = new Animation(this.plt, el.querySelector('.modal-wrapper'));
//     backdrop.fromTo('opacity', 0.01, 0.4);
//     wrapper.fromTo('translateY', '40px', '0px');
//     wrapper.fromTo('opacity', 0.01, 1);
//     const DURATION = 280;
//     const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
//     this.element(this.enteringView.pageRef()).easing(EASING).duration(DURATION)
//       .add(backdrop)
//       .add(wrapper);
//   }
// }
// export class ModalMDSlideOut {
//   constructor(el: HTMLElement) {
//     const backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));
//     const wrapper = new Animation(this.plt, el.querySelector('.modal-wrapper'));
//     backdrop.fromTo('opacity', 0.4, 0.0);
//     wrapper.fromTo('translateY', '0px', '40px');
//     wrapper.fromTo('opacity', 0.99, 0);
//     this
//       .element(this.leavingView.pageRef())
//       .duration(200)
//       .easing('cubic-bezier(0.47,0,0.745,0.715)')
//       .add(wrapper)
//       .add(backdrop);
//   }
// }

/**
 * iOS Modal Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const wrapperElRect = wrapperEl.getBoundingClientRect();
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '0%', `${baseEl.ownerDocument.defaultView.innerHeight - wrapperElRect.top}px`);
    backdropAnimation.fromTo('opacity', 0.4, 0.0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-out')
        .duration(250)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * Md Modal Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));
    wrapperAnimation
        .fromTo('opacity', 0.01, 1)
        .fromTo('translateY', '40px', '0px');
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(280)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * Md Modal Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation
        .fromTo('opacity', 0.99, 0)
        .fromTo('translateY', '0px', '40px');
    backdropAnimation.fromTo('opacity', 0.32, 0.0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Modal {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * If `true`, the modal will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, a backdrop will be displayed behind the modal.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the modal will animate.
         */
        this.animated = true;
        this.didPresent = createEvent(this, "ionModalDidPresent", 7);
        this.willPresent = createEvent(this, "ionModalWillPresent", 7);
        this.willDismiss = createEvent(this, "ionModalWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionModalDidDismiss", 7);
        this.config = getContext(this, "config");
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    lifecycle(modalEvent) {
        const el = this.usersElement;
        const name = LIFECYCLE_MAP[modalEvent.type];
        if (el && name) {
            const ev = new CustomEvent(name, {
                bubbles: false,
                cancelable: false,
                detail: modalEvent.detail
            });
            el.dispatchEvent(ev);
        }
    }
    /**
     * Present the modal overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector(`.modal-wrapper`);
        if (!container) {
            throw new Error('container is undefined');
        }
        const componentProps = Object.assign({}, this.componentProps, { modal: this.el });
        this.usersElement = await attachComponent(this.delegate, container, this.component, ['ion-page'], componentProps);
        await deepReady(this.usersElement);
        return present(this, 'modalEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the modal. For example, 'cancel' or 'backdrop'.
     */
    async dismiss(data, role) {
        const dismissed = await dismiss(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation);
        if (dismissed) {
            await detachComponent(this.delegate, this.usersElement);
        }
        return dismissed;
    }
    /**
     * Returns a promise that resolves when the modal did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionModalDidDismiss');
    }
    /**
     * Returns a promise that resolves when the modal will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionModalWillDismiss');
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            'no-router': true,
            'aria-modal': 'true',
            class: Object.assign({ [`${mode}`]: true }, getClassMap(this.cssClass)),
            style: {
                zIndex: 20000 + this.overlayIndex,
            }
        };
    }
    __stencil_render() {
        const mode = getIonMode(this);
        const dialogClasses = {
            [`modal-wrapper`]: true,
            [`${mode}`]: true,
        };
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            h("div", { role: "dialog", class: dialogClasses })
        ];
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-modal-ios-h {\n  \n  --width: 100%;\n  --min-width: auto;\n  --max-width: auto;\n  --height: 100%;\n  --min-height: auto;\n  --max-height: auto;\n  --overflow: hidden;\n  --border-radius: 0;\n  --border-width: 0;\n  --border-style: none;\n  --border-color: transparent;\n  --background: var(--ion-background-color, #fff);\n  --box-shadow: none;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  contain: strict;\n}\n\n.overlay-hidden.sc-ion-modal-ios-h {\n  display: none;\n}\n\n.modal-wrapper.sc-ion-modal-ios {\n  border-radius: var(--border-radius);\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: var(--overflow);\n  z-index: 10;\n}\n\n\@media only screen and (min-width: 768px) and (min-height: 600px) {\n  .sc-ion-modal-ios-h {\n    --width: 600px;\n    --height: 500px;\n    --ion-safe-area-top: 0px;\n    --ion-safe-area-bottom: 0px;\n    --ion-safe-area-right: 0px;\n    --ion-safe-area-left: 0px;\n  }\n}\n\@media only screen and (min-width: 768px) and (min-height: 768px) {\n  .sc-ion-modal-ios-h {\n    --width: 600px;\n    --height: 600px;\n  }\n}\n\@media only screen and (min-width: 768px) and (min-height: 600px) {\n  .sc-ion-modal-ios-h {\n    --border-radius: 10px;\n  }\n}\n.modal-wrapper.sc-ion-modal-ios {\n  -webkit-transform: translate3d(0,  100%,  0);\n  transform: translate3d(0,  100%,  0);\n}"; }
}
const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillLeave',
    'ionModalDidDismiss': 'ionViewDidLeave',
};

export { Modal as ion_modal };
