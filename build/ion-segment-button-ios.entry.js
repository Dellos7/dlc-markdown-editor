import { r as registerInstance, c as createEvent, f as getIonMode, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';

let ids = 0;
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class SegmentButton {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the segment button is selected.
         */
        this.checked = false;
        /**
         * If `true`, the user cannot interact with the segment button.
         */
        this.disabled = false;
        /**
         * Set the layout of the text and icon in the segment.
         */
        this.layout = 'icon-top';
        /**
         * The value of the segment button.
         */
        this.value = 'ion-sb-' + (ids++);
        this.ionSelect = createEvent(this, "ionSelect", 7);
    }
    checkedChanged(checked, prev) {
        if (checked && !prev) {
            this.ionSelect.emit();
        }
    }
    onClick() {
        this.checked = true;
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    hostData() {
        const { checked, disabled, hasIcon, hasLabel, layout } = this;
        const mode = getIonMode(this);
        return {
            'aria-disabled': disabled ? 'true' : null,
            class: {
                [`${mode}`]: true,
                'segment-button-has-label': hasLabel,
                'segment-button-has-icon': hasIcon,
                'segment-button-has-label-only': hasLabel && !hasIcon,
                'segment-button-has-icon-only': hasIcon && !hasLabel,
                'segment-button-disabled': disabled,
                'segment-button-checked': checked,
                [`segment-button-layout-${layout}`]: true,
                'ion-activatable': true,
                'ion-activatable-instant': true,
            }
        };
    }
    __stencil_render() {
        const mode = getIonMode(this);
        return [
            h("button", { type: "button", "aria-pressed": this.checked ? 'true' : null, class: "button-native", disabled: this.disabled }, h("slot", null), mode === 'md' && h("ion-ripple-effect", null)),
            h("div", { class: "segment-button-indicator" })
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["checkedChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the segment button\n   * \@prop --background-hover: Background of the segment button on hover\n   * \@prop --background-activated: Background of the activated (pressed) segment button\n   * \@prop --background-checked: Background of the checked segment button\n   *\n   * \@prop --color: Color of the segment button\n   * \@prop --color-activated: Color of the activated segment button\n   * \@prop --color-checked: Color of the checked segment button\n   * \@prop --color-disabled: Color of the disabled segment button\n   * \@prop --color-checked-disabled: Color of the checked & disabled segment button\n   *\n   * \@prop --border-radius: Radius of the segment button border\n   * \@prop --border-color: Color of the segment button border\n   * \@prop --border-style: Style of the segment button border\n   * \@prop --border-width: Width of the segment button border\n   *\n   * \@prop --margin-top: Top margin of the segment button\n   * \@prop --margin-end: End margin of the segment button\n   * \@prop --margin-bottom: Bottom margin of the segment button\n   * \@prop --margin-start: Start margin of the segment button\n   *\n   * \@prop --padding-top: Top padding of the segment button\n   * \@prop --padding-end: End padding of the segment button\n   * \@prop --padding-bottom: Bottom padding of the segment button\n   * \@prop --padding-start: Start padding of the segment button\n   *\n   * \@prop --transition: Transition of the segment button\n   *\n   * \@prop --indicator-color: Color of the indicator (highlight) under the segment button\n   * \@prop --indicator-color-checked: Color of the indicator (highlight) under the checked segment button\n   *\n   */\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: auto;\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  color: var(--color);\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n}\n\n:host(:first-of-type) {\n  border-top-left-radius: var(--border-radius);\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: var(--border-radius);\n}\n:host-context([dir=rtl]):host(:first-of-type), :host-context([dir=rtl]):first-of-type {\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--border-radius);\n  border-bottom-right-radius: var(--border-radius);\n  border-bottom-left-radius: 0;\n}\n\n:host(:not(:first-of-type)) {\n  border-left-width: 0;\n}\n:host-context([dir=rtl]):host(:not(:first-of-type)), :host-context([dir=rtl]):not(:first-of-type) {\n  border-right-width: 0;\n  border-left-width: var(--border-width);\n}\n\n:host(:last-of-type) {\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--border-radius);\n  border-bottom-right-radius: var(--border-radius);\n  border-bottom-left-radius: 0;\n}\n:host-context([dir=rtl]):host(:last-of-type), :host-context([dir=rtl]):last-of-type {\n  border-top-left-radius: var(--border-radius);\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: var(--border-radius);\n}\n\n.button-native {\n  border-radius: inherit;\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  margin-left: var(--margin-start);\n  margin-right: var(--margin-end);\n  margin-top: var(--margin-top);\n  margin-bottom: var(--margin-bottom);\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  min-width: inherit;\n  max-width: inherit;\n  height: auto;\n  min-height: inherit;\n  max-height: inherit;\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border: none;\n  outline: none;\n  background: transparent;\n  contain: content;\n  cursor: pointer;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .button-native {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: var(--margin-start);\n    margin-inline-start: var(--margin-start);\n    -webkit-margin-end: var(--margin-end);\n    margin-inline-end: var(--margin-end);\n  }\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .button-native {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--padding-start);\n    padding-inline-start: var(--padding-start);\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n.segment-button-indicator {\n  -ms-flex-item-align: end;\n  align-self: flex-end;\n  width: 100%;\n  height: 2px;\n  background-color: var(--indicator-color);\n  opacity: 1;\n}\n\n:host(.segment-button-checked) {\n  background: var(--background-checked);\n  color: var(--color-checked);\n}\n\n:host(.segment-button-checked) .segment-button-indicator {\n  background-color: var(--indicator-color-checked, var(--color-checked));\n}\n\n:host(.activated) {\n  color: var(--color-activated, var(--color));\n}\n\n:host(.segment-button-disabled) {\n  color: var(--color-disabled);\n}\n\n:host(.segment-button-disabled.segment-button-checked) {\n  color: var(--color-checked-disabled);\n}\n\n::slotted(ion-icon) {\n  -ms-flex-order: -1;\n  order: -1;\n}\n\n::slotted(ion-label) {\n  display: block;\n  -ms-flex-item-align: center;\n  align-self: center;\n  line-height: 22px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n:host(.segment-button-layout-icon-start) .button-native {\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n\n:host(.segment-button-layout-icon-end) .button-native {\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n:host(.segment-button-layout-icon-bottom) .button-native {\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n\n:host(.segment-button-layout-icon-hide) ::slotted(ion-icon) {\n  display: none;\n}\n\n:host(.segment-button-layout-label-hide) ::slotted(ion-label) {\n  display: none;\n}\n\nion-ripple-effect {\n  color: var(--ripple-color, var(--color-checked));\n}\n\n:host {\n  --border-radius: 4px;\n  --border-width: 1px;\n  --border-style: solid;\n  --transition: 100ms all linear;\n  min-height: 24px;\n  font-size: 13px;\n  line-height: 37px;\n}\n\n.segment-button-indicator {\n  display: none;\n}\n\n::slotted(ion-icon) {\n  font-size: 24px;\n}\n\n:host(.segment-button-layout-icon-start) ::slotted(ion-label) {\n  margin-left: 2px;\n  margin-right: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.segment-button-layout-icon-start) ::slotted(ion-label) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 2px;\n    margin-inline-start: 2px;\n    -webkit-margin-end: 0;\n    margin-inline-end: 0;\n  }\n}\n\n:host(.segment-button-layout-icon-end) ::slotted(ion-label) {\n  margin-left: 0;\n  margin-right: 2px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.segment-button-layout-icon-end) ::slotted(ion-label) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n    -webkit-margin-end: 2px;\n    margin-inline-end: 2px;\n  }\n}\n\n\@media (any-hover: hover) {\n  :host(:hover:not(.segment-button-checked)) {\n    background: var(--background-hover);\n  }\n}\n:host(.activated) {\n  background: var(--background-activated);\n}\n\n:host(.segment-button-checked.activated) {\n  background: var(--background-checked);\n  color: var(--color-checked);\n}"; }
}

export { SegmentButton as ion_segment_button };
