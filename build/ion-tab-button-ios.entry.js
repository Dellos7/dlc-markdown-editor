import { r as registerInstance, c as createEvent, i as getContext, f as getIonMode, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class TabButton {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The selected tab component
         */
        this.selected = false;
        /**
         * The selected tab component
         */
        this.disabled = false;
        this.ionTabButtonClick = createEvent(this, "ionTabButtonClick", 7);
        this.queue = getContext(this, "queue");
        this.doc = getContext(this, "document");
        this.config = getContext(this, "config");
    }
    onTabBarChanged(ev) {
        this.selected = this.tab === ev.detail.tab;
    }
    onClick(ev) {
        this.selectTab(ev);
    }
    onKeyUp(ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
            this.selectTab(ev);
        }
    }
    componentWillLoad() {
        if (this.layout === undefined) {
            this.layout = this.config.get('tabButtonLayout', 'icon-top');
        }
    }
    selectTab(ev) {
        if (this.tab !== undefined) {
            if (!this.disabled) {
                this.ionTabButtonClick.emit({
                    tab: this.tab,
                    href: this.href,
                    selected: this.selected
                });
            }
            ev.preventDefault();
        }
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    get tabIndex() {
        if (this.disabled) {
            return -1;
        }
        const hasTabIndex = this.el.hasAttribute('tabindex');
        if (hasTabIndex) {
            return this.el.getAttribute('tabindex');
        }
        return 0;
    }
    hostData() {
        const { disabled, hasIcon, hasLabel, tabIndex, layout, selected, tab } = this;
        const mode = getIonMode(this);
        return {
            'tabindex': tabIndex,
            'role': 'tab',
            'aria-selected': selected ? 'true' : null,
            'id': tab !== undefined ? `tab-button-${tab}` : null,
            class: {
                [`${mode}`]: true,
                'tab-selected': selected,
                'tab-disabled': disabled,
                'tab-has-label': hasLabel,
                'tab-has-icon': hasIcon,
                'tab-has-label-only': hasLabel && !hasIcon,
                'tab-has-icon-only': hasIcon && !hasLabel,
                [`tab-layout-${layout}`]: true,
                'ion-activatable': true,
                'ion-selectable': true,
                'ion-focusable': true
            }
        };
    }
    __stencil_render() {
        const mode = getIonMode(this);
        const { href } = this;
        return (h("a", { href: href, tabIndex: -1 }, h("slot", null), mode === 'md' && h("ion-ripple-effect", { type: "unbounded" })));
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the tab button\n   * \@prop --background-focused: Background of the focused tab button\n   *\n   * \@prop --color: Color of the tab button\n   * \@prop --color-selected: Color of the selected tab button\n   *\n   * \@prop --padding-top: Top padding of the tab button\n   * \@prop --padding-end: End padding of the tab button\n   * \@prop --padding-bottom: Bottom padding of the tab button\n   * \@prop --padding-start: Start padding of the tab button\n   *\n   * \@prop --ripple-color: Color of the button ripple effect\n   */\n  --ripple-color: var(--color-selected);\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n  outline: none;\n  background: var(--background);\n  color: var(--color);\n}\n\na {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-pack: inherit;\n  justify-content: inherit;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  outline: none;\n  background: transparent;\n  text-decoration: none;\n  cursor: pointer;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-user-drag: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  a {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--padding-start);\n    padding-inline-start: var(--padding-start);\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n:host(.ion-focused) {\n  background: var(--background-focused);\n}\n\n\@media (any-hover: hover) {\n  a:hover {\n    color: var(--color-selected);\n  }\n}\n:host(.tab-selected) {\n  color: var(--color-selected);\n}\n\n:host(.tab-hidden) {\n  /* stylelint-disable-next-line declaration-no-important */\n  display: none !important;\n}\n\n:host(.tab-disabled) {\n  pointer-events: none;\n  opacity: 0.4;\n}\n\n::slotted(ion-label),\n::slotted(ion-icon) {\n  display: block;\n  -ms-flex-item-align: center;\n  align-self: center;\n  max-width: 100%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n::slotted(ion-label) {\n  -ms-flex-order: 0;\n  order: 0;\n}\n\n::slotted(ion-icon) {\n  -ms-flex-order: -1;\n  order: -1;\n  height: 1em;\n}\n\n:host(.tab-has-label-only) ::slotted(ion-label) {\n  white-space: normal;\n}\n\n::slotted(ion-badge) {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 1;\n}\n\n:host(.tab-layout-icon-start) {\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n\n:host(.tab-layout-icon-end) {\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n:host(.tab-layout-icon-bottom) {\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n\n:host(.tab-layout-icon-hide) ::slotted(ion-icon) {\n  display: none;\n}\n\n:host(.tab-layout-label-hide) ::slotted(ion-label) {\n  display: none;\n}\n\nion-ripple-effect {\n  color: var(--ripple-color);\n}\n\n:host {\n  --padding-top: 0;\n  --padding-end: 2px;\n  --padding-bottom: 0;\n  --padding-start: 2px;\n  max-width: 240px;\n  font-size: 10px;\n}\n\n:host(.tab-has-label-only) ::slotted(ion-label) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 12px;\n  font-size: 14px;\n  line-height: 1.1;\n}\n\n::slotted(ion-badge) {\n  padding-left: 6px;\n  padding-right: 6px;\n  padding-top: 1px;\n  padding-bottom: 1px;\n  left: calc(50% + 6px);\n  top: 4px;\n  height: auto;\n  font-size: 12px;\n  line-height: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-badge) {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 6px;\n    padding-inline-start: 6px;\n    -webkit-padding-end: 6px;\n    padding-inline-end: 6px;\n  }\n}\n[dir=rtl] ::slotted(ion-badge), :host-context([dir=rtl]) ::slotted(ion-badge) {\n  left: unset;\n  right: unset;\n  right: calc(50% + 6px);\n}\n\n::slotted(ion-icon) {\n  margin-top: 4px;\n  font-size: 30px;\n}\n::slotted(ion-icon::before) {\n  vertical-align: top;\n}\n\n::slotted(ion-label) {\n  margin-top: 0;\n  margin-bottom: 1px;\n  min-height: 11px;\n}\n:host(.tab-layout-icon-end) ::slotted(ion-label),\n:host(.tab-layout-icon-start) ::slotted(ion-label),\n:host(.tab-layout-icon-hide) ::slotted(ion-label) {\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 14px;\n  line-height: 1.1;\n}\n\n:host(.tab-layout-icon-end) ::slotted(ion-icon),\n:host(.tab-layout-icon-start) ::slotted(ion-icon) {\n  min-width: 24px;\n  height: 26px;\n  margin-top: 2px;\n  margin-bottom: 1px;\n  font-size: 24px;\n}\n\n:host(.tab-layout-icon-bottom) ::slotted(ion-badge) {\n  left: calc(50% + 12px);\n}\n:host-context([dir=rtl]):host(.tab-layout-icon-bottom) ::slotted(ion-badge), :host-context([dir=rtl]).tab-layout-icon-bottom ::slotted(ion-badge) {\n  left: unset;\n  right: unset;\n  right: calc(50% + 12px);\n}\n\n:host(.tab-layout-icon-bottom) ::slotted(ion-icon) {\n  margin-top: 0;\n  margin-bottom: 1px;\n}\n:host(.tab-layout-icon-bottom) ::slotted(ion-label) {\n  margin-top: 4px;\n}\n:host(.tab-layout-icon-start) ::slotted(ion-badge),\n:host(.tab-layout-icon-end) ::slotted(ion-badge) {\n  left: calc(50% + 35px);\n  top: 10px;\n}\n:host-context([dir=rtl]):host(.tab-layout-icon-start) ::slotted(ion-badge), :host-context([dir=rtl]).tab-layout-icon-start ::slotted(ion-badge), :host-context([dir=rtl]):host(.tab-layout-icon-end) ::slotted(ion-badge), :host-context([dir=rtl]).tab-layout-icon-end ::slotted(ion-badge) {\n  left: unset;\n  right: unset;\n  right: calc(50% + 35px);\n}\n\n:host(.tab-layout-icon-hide) ::slotted(ion-badge),\n:host(.tab-has-label-only) ::slotted(ion-badge) {\n  left: calc(50% + 30px);\n  top: 10px;\n}\n:host-context([dir=rtl]):host(.tab-layout-icon-hide) ::slotted(ion-badge), :host-context([dir=rtl]).tab-layout-icon-hide ::slotted(ion-badge), :host-context([dir=rtl]):host(.tab-has-label-only) ::slotted(ion-badge), :host-context([dir=rtl]).tab-has-label-only ::slotted(ion-badge) {\n  left: unset;\n  right: unset;\n  right: calc(50% + 30px);\n}\n\n:host(.tab-layout-label-hide) ::slotted(ion-badge),\n:host(.tab-has-icon-only) ::slotted(ion-badge) {\n  top: 10px;\n}\n\n:host(.tab-layout-label-hide) ::slotted(ion-icon) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}"; }
}

export { TabButton as ion_tab_button };
