import { e as registerInstance, j as getContext, h as getIonMode, f as h, g as getElement, k as Host } from './dlc-markdown-editor-3c7af0f3.js';
import { b as openURL, c as createColorClasses } from './chunk-4d735167.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class BackButton {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.config = getContext(this, "config");
        this.win = getContext(this, "window");
    }
    async onClick(ev) {
        const nav = this.el.closest('ion-nav');
        ev.preventDefault();
        if (nav && await nav.canGoBack()) {
            return nav.pop({ skipIfBusy: true });
        }
        return openURL(this.win, this.defaultHref, ev, 'back');
    }
    hostData() {
        const showBackButton = this.defaultHref !== undefined;
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true, 'button': true, 'ion-activatable': true, 'show-back-button': showBackButton })
        };
    }
    __stencil_render() {
        const mode = getIonMode(this);
        const defaultBackButtonText = mode === 'ios' ? 'Back' : null;
        const backButtonIcon = this.icon != null ? this.icon : this.config.get('backButtonIcon', 'arrow-back');
        const backButtonText = this.text != null ? this.text : this.config.get('backButtonText', defaultBackButtonText);
        return (h("button", { type: "button", class: "button-native" }, h("span", { class: "button-inner" }, backButtonIcon && h("ion-icon", { icon: backButtonIcon, lazy: false }), backButtonText && h("span", { class: "button-text" }, backButtonText)), mode === 'md' && h("ion-ripple-effect", { type: "unbounded" })));
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".sc-ion-back-button-md-h {\n  \n  --background: transparent;\n  --ripple-color: currentColor;\n  --transition: background-color, opacity 100ms linear;\n  --opacity: 1;\n  display: none;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n}\n\n.ion-color.sc-ion-back-button-md-h .button-native.sc-ion-back-button-md {\n  color: var(--ion-color-base);\n}\n\n.can-go-back.sc-ion-back-button-md-h > ion-header.sc-ion-back-button-md, .can-go-back > ion-header .sc-ion-back-button-md-h, .show-back-button.sc-ion-back-button-md-h {\n  display: block;\n}\n\n.button-native.sc-ion-back-button-md {\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin-left: var(--margin-start);\n  margin-right: var(--margin-end);\n  margin-top: var(--margin-top);\n  margin-bottom: var(--margin-bottom);\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  min-width: var(--min-width);\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border: 0;\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  cursor: pointer;\n  opacity: var(--opacity);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .button-native.sc-ion-back-button-md {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: var(--margin-start);\n    margin-inline-start: var(--margin-start);\n    -webkit-margin-end: var(--margin-end);\n    margin-inline-end: var(--margin-end);\n  }\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .button-native.sc-ion-back-button-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--padding-start);\n    padding-inline-start: var(--padding-start);\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n.button-inner.sc-ion-back-button-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\nion-icon.sc-ion-back-button-md {\n  padding-left: var(--icon-padding-start);\n  padding-right: var(--icon-padding-end);\n  padding-top: var(--icon-padding-top);\n  padding-bottom: var(--icon-padding-bottom);\n  margin-left: var(--icon-margin-start);\n  margin-right: var(--icon-margin-end);\n  margin-top: var(--icon-margin-top);\n  margin-bottom: var(--icon-margin-bottom);\n  display: inherit;\n  font-size: var(--icon-font-size);\n  font-weight: var(--icon-font-weight);\n  pointer-events: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ion-icon.sc-ion-back-button-md {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--icon-padding-start);\n    padding-inline-start: var(--icon-padding-start);\n    -webkit-padding-end: var(--icon-padding-end);\n    padding-inline-end: var(--icon-padding-end);\n  }\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ion-icon.sc-ion-back-button-md {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: var(--icon-margin-start);\n    margin-inline-start: var(--icon-margin-start);\n    -webkit-margin-end: var(--icon-margin-end);\n    margin-inline-end: var(--icon-margin-end);\n  }\n}\n\nion-toolbar.sc-ion-back-button-md-h:not(.ion-color):not(.ion-color), ion-toolbar:not(.ion-color) .sc-ion-back-button-md-h:not(.ion-color) {\n  color: var(--ion-toolbar-color, var(--color));\n}\n\n.sc-ion-back-button-md-h {\n  --color: currentColor;\n  --margin-top: 0;\n  --margin-end: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --padding-top: 0;\n  --padding-end: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --min-height: 32px;\n  --min-width: 44px;\n  --icon-padding-top: 0;\n  --icon-padding-end: 0;\n  --icon-padding-start: 0;\n  --icon-padding-bottom: 0;\n  --icon-margin-top: 0;\n  --icon-margin-end: 0;\n  --icon-margin-bottom: 0;\n  --icon-margin-start: 0;\n  --icon-font-size: 24px;\n  --icon-font-weight: normal;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n\n.button-native.sc-ion-back-button-md {\n  width: 48px;\n  height: 48px;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\nion-icon.sc-ion-back-button-md {\n  line-height: 0.67;\n  text-align: start;\n}"; }
}

export { BackButton as ion_back_button };
