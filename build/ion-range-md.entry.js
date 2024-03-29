import { r as registerInstance, c as createEvent, i as getContext, f as getIonMode, h, e as getElement, H as Host } from './dlc-markdown-editor-d387313e.js';
import { c as createColorClasses, h as hostContext } from './chunk-abd3a723.js';
import { c as clamp, d as debounceEvent } from './chunk-3702a6ef.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot start - Content is placed to the left of the range slider in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the range slider in LTR, and to the left in RTL.
 */
class Range {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.noUpdate = false;
        this.hasFocus = false;
        this.ratioA = 0;
        this.ratioB = 0;
        /**
         * How long, in milliseconds, to wait to trigger the
         * `ionChange` event after each change in the range value.
         */
        this.debounce = 0;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = '';
        /**
         * Show two knobs.
         */
        this.dualKnobs = false;
        /**
         * Minimum integer value of the range.
         */
        this.min = 0;
        /**
         * Maximum integer value of the range.
         */
        this.max = 100;
        /**
         * If `true`, a pin with integer value is shown when the knob
         * is pressed.
         */
        this.pin = false;
        /**
         * If `true`, the knob snaps to tick marks evenly spaced based
         * on the step property value.
         */
        this.snaps = false;
        /**
         * Specifies the value granularity.
         */
        this.step = 1;
        /**
         * If `true`, tick marks are displayed based on the step value.
         * Only applies when `snaps` is `true`.
         */
        this.ticks = true;
        /**
         * If `true`, the user cannot interact with the range.
         */
        this.disabled = false;
        /**
         * the value of the range.
         */
        this.value = 0;
        this.clampBounds = (value) => {
            return clamp(this.min, value, this.max);
        };
        this.ensureValueInBounds = (value) => {
            if (this.dualKnobs) {
                return {
                    lower: this.clampBounds(value.lower),
                    upper: this.clampBounds(value.upper)
                };
            }
            else {
                return this.clampBounds(value);
            }
        };
        this.handleKeyboard = (knob, isIncrease) => {
            let step = this.step;
            step = step > 0 ? step : 1;
            step = step / (this.max - this.min);
            if (!isIncrease) {
                step *= -1;
            }
            if (knob === 'A') {
                this.ratioA = clamp(0, this.ratioA + step, 1);
            }
            else {
                this.ratioB = clamp(0, this.ratioB + step, 1);
            }
            this.updateValue();
        };
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.queue = getContext(this, "queue");
        this.doc = getContext(this, "document");
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    minChanged() {
        if (!this.noUpdate) {
            this.updateRatio();
        }
    }
    maxChanged() {
        if (!this.noUpdate) {
            this.updateRatio();
        }
    }
    disabledChanged() {
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
        this.emitStyle();
    }
    valueChanged(value) {
        if (!this.noUpdate) {
            this.updateRatio();
        }
        value = this.ensureValueInBounds(value);
        this.ionChange.emit({ value });
    }
    onBlur() {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.ionBlur.emit();
            this.emitStyle();
        }
    }
    onFocus() {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
            this.emitStyle();
        }
    }
    componentWillLoad() {
        this.updateRatio();
        this.debounceChanged();
        this.emitStyle();
    }
    async componentDidLoad() {
        this.gesture = (await __sc_import_dlc_markdown_editor('./index-314f7f65.js')).createGesture({
            el: this.rangeSlider,
            gestureName: 'range',
            gesturePriority: 100,
            threshold: 0,
            onStart: ev => this.onStart(ev),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.gesture.setDisabled(this.disabled);
    }
    componentDidUnload() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    }
    getValue() {
        const value = this.value || 0;
        if (this.dualKnobs) {
            if (typeof value === 'object') {
                return value;
            }
            return {
                lower: 0,
                upper: value
            };
        }
        else {
            if (typeof value === 'object') {
                return value.upper;
            }
            return value;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'interactive-disabled': this.disabled
        });
    }
    onStart(detail) {
        const rect = this.rect = this.rangeSlider.getBoundingClientRect();
        const currentX = detail.currentX;
        // figure out which knob they started closer to
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (document.dir === 'rtl') {
            ratio = 1 - ratio;
        }
        this.pressedKnob =
            !this.dualKnobs ||
                Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio)
                ? 'A'
                : 'B';
        this.setFocus(this.pressedKnob);
        // update the active knob's position
        this.update(currentX);
    }
    onMove(detail) {
        this.update(detail.currentX);
    }
    onEnd(detail) {
        this.update(detail.currentX);
        this.pressedKnob = undefined;
    }
    update(currentX) {
        // figure out where the pointer is currently at
        // update the knob being interacted with
        const rect = this.rect;
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (document.dir === 'rtl') {
            ratio = 1 - ratio;
        }
        if (this.snaps) {
            // snaps the ratio to the current value
            ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
        }
        // update which knob is pressed
        if (this.pressedKnob === 'A') {
            this.ratioA = ratio;
        }
        else {
            this.ratioB = ratio;
        }
        // Update input value
        this.updateValue();
    }
    get valA() {
        return ratioToValue(this.ratioA, this.min, this.max, this.step);
    }
    get valB() {
        return ratioToValue(this.ratioB, this.min, this.max, this.step);
    }
    get ratioLower() {
        if (this.dualKnobs) {
            return Math.min(this.ratioA, this.ratioB);
        }
        return 0;
    }
    get ratioUpper() {
        if (this.dualKnobs) {
            return Math.max(this.ratioA, this.ratioB);
        }
        return this.ratioA;
    }
    updateRatio() {
        const value = this.getValue();
        const { min, max } = this;
        if (this.dualKnobs) {
            this.ratioA = valueToRatio(value.lower, min, max);
            this.ratioB = valueToRatio(value.upper, min, max);
        }
        else {
            this.ratioA = valueToRatio(value, min, max);
        }
    }
    updateValue() {
        this.noUpdate = true;
        const { valA, valB } = this;
        this.value = !this.dualKnobs
            ? valA
            : {
                lower: Math.min(valA, valB),
                upper: Math.max(valA, valB)
            };
        this.noUpdate = false;
    }
    setFocus(knob) {
        if (this.el.shadowRoot) {
            const knobEl = this.el.shadowRoot.querySelector(knob === 'A' ? '.range-knob-a' : '.range-knob-b');
            if (knobEl) {
                knobEl.focus();
            }
        }
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true, 'in-item': hostContext('ion-item', this.el), 'range-disabled': this.disabled, 'range-pressed': this.pressedKnob !== undefined, 'range-has-pin': this.pin })
        };
    }
    __stencil_render() {
        const { min, max, step, ratioLower, ratioUpper } = this;
        const barStart = `${ratioLower * 100}%`;
        const barEnd = `${100 - ratioUpper * 100}%`;
        const doc = document;
        const isRTL = doc.dir === 'rtl';
        const start = isRTL ? 'right' : 'left';
        const end = isRTL ? 'left' : 'right';
        const ticks = [];
        if (this.snaps && this.ticks) {
            for (let value = min; value <= max; value += step) {
                const ratio = valueToRatio(value, min, max);
                const tick = {
                    ratio,
                    active: ratio >= ratioLower && ratio <= ratioUpper,
                };
                tick[start] = `${ratio * 100}%`;
                ticks.push(tick);
            }
        }
        const tickStyle = (tick) => {
            const style = {};
            style[start] = tick[start];
            return style;
        };
        const barStyle = () => {
            const style = {};
            style[start] = barStart;
            style[end] = barEnd;
            return style;
        };
        return [
            h("slot", { name: "start" }),
            h("div", { class: "range-slider", ref: el => this.rangeSlider = el }, ticks.map(tick => (h("div", { style: tickStyle(tick), role: "presentation", class: {
                    'range-tick': true,
                    'range-tick-active': tick.active
                } }))), h("div", { class: "range-bar", role: "presentation" }), h("div", { class: "range-bar range-bar-active", role: "presentation", style: barStyle() }), renderKnob(isRTL, {
                knob: 'A',
                pressed: this.pressedKnob === 'A',
                value: this.valA,
                ratio: this.ratioA,
                pin: this.pin,
                disabled: this.disabled,
                handleKeyboard: this.handleKeyboard,
                min,
                max
            }), this.dualKnobs && renderKnob(isRTL, {
                knob: 'B',
                pressed: this.pressedKnob === 'B',
                value: this.valB,
                ratio: this.ratioB,
                pin: this.pin,
                disabled: this.disabled,
                handleKeyboard: this.handleKeyboard,
                min,
                max
            })),
            h("slot", { name: "end" })
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "debounce": ["debounceChanged"],
        "min": ["minChanged"],
        "max": ["maxChanged"],
        "disabled": ["disabledChanged"],
        "value": ["valueChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --bar-background: Background of the range bar\n   * \@prop --bar-background-active: Background of the active range bar\n   * \@prop --bar-height: Height of the range bar\n   * \@prop --bar-border-radius: Border radius of the range bar\n   * \@prop --height: Height of the range\n   * \@prop --knob-background: Background of the range knob\n   * \@prop --knob-border-radius: Border radius of the range knob\n   * \@prop --knob-box-shadow: Box shadow of the range knob\n   * \@prop --knob-size: Size of the range knob\n   */\n  --knob-handle-size: calc(var(--knob-size) * 2);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex: 3;\n  flex: 3;\n  -ms-flex-align: center;\n  align-items: center;\n  font-family: var(--ion-font-family, inherit);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 2;\n}\n\n:host(.range-disabled) {\n  pointer-events: none;\n}\n\n::slotted(ion-label) {\n  -ms-flex: initial;\n  flex: initial;\n}\n\n::slotted(ion-icon[slot]) {\n  font-size: 24px;\n}\n\n.range-slider {\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  height: var(--height);\n  contain: size layout style;\n  cursor: -webkit-grab;\n  cursor: grab;\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n\n:host(.range-pressed) .range-slider {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n\n.range-pin {\n  position: absolute;\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n  text-align: center;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.range-knob-handle {\n  left: 0;\n  top: calc((var(--height) - var(--knob-handle-size)) / 2);\n  margin-left: calc(0px - var(--knob-handle-size) / 2);\n  position: absolute;\n  width: var(--knob-handle-size);\n  height: var(--knob-handle-size);\n  text-align: center;\n}\n[dir=rtl] .range-knob-handle, :host-context([dir=rtl]) .range-knob-handle {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .range-knob-handle {\n    margin-left: unset;\n    -webkit-margin-start: calc(0px - var(--knob-handle-size) / 2);\n    margin-inline-start: calc(0px - var(--knob-handle-size) / 2);\n  }\n}\n[dir=rtl] .range-knob-handle, :host-context([dir=rtl]) .range-knob-handle {\n  /* stylelint-disable-next-line property-blacklist */\n  left: unset;\n}\n\n.range-knob-handle:active, .range-knob-handle:focus {\n  outline: none;\n}\n\n.range-bar {\n  border-radius: var(--bar-border-radius);\n  left: 0;\n  top: calc((var(--height) - var(--bar-height)) / 2);\n  position: absolute;\n  width: 100%;\n  height: var(--bar-height);\n  background: var(--bar-background);\n  pointer-events: none;\n}\n[dir=rtl] .range-bar, :host-context([dir=rtl]) .range-bar {\n  left: unset;\n  right: unset;\n  right: 0;\n}\n\n[dir=rtl] .range-bar, :host-context([dir=rtl]) .range-bar {\n  /* stylelint-disable-next-line property-blacklist */\n  left: unset;\n}\n\n.range-knob {\n  border-radius: var(--knob-border-radius);\n  left: calc(50% - var(--knob-size) / 2);\n  top: calc(50% - var(--knob-size) / 2);\n  position: absolute;\n  width: var(--knob-size);\n  height: var(--knob-size);\n  background: var(--knob-background);\n  -webkit-box-shadow: var(--knob-box-shadow);\n  box-shadow: var(--knob-box-shadow);\n  z-index: 2;\n  pointer-events: none;\n}\n[dir=rtl] .range-knob, :host-context([dir=rtl]) .range-knob {\n  left: unset;\n  right: unset;\n  right: calc(50% - var(--knob-size) / 2);\n}\n\n[dir=rtl] .range-knob, :host-context([dir=rtl]) .range-knob {\n  /* stylelint-disable-next-line property-blacklist */\n  left: unset;\n}\n\n:host(.range-pressed) .range-bar-active {\n  will-change: left, right;\n}\n\n:host(.in-item) {\n  width: 100%;\n}\n\n:host(.in-item) ::slotted(ion-label) {\n  -ms-flex-item-align: center;\n  align-self: center;\n}\n\n:host {\n  --knob-border-radius: 50%;\n  --knob-background: var(--bar-background-active);\n  --knob-box-shadow: none;\n  --knob-size: 18px;\n  --bar-height: 2px;\n  --bar-background: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.26);\n  --bar-background-active: var(--ion-color-primary, #3880ff);\n  --bar-border-radius: 0;\n  --height: 42px;\n  --pin-background: var(--ion-color-primary, #3880ff);\n  --pin-color: var(--ion-color-primary-contrast, #fff);\n  padding-left: 14px;\n  padding-right: 14px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  font-size: 12px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 14px;\n    padding-inline-start: 14px;\n    -webkit-padding-end: 14px;\n    padding-inline-end: 14px;\n  }\n}\n\n:host(.ion-color) .range-bar {\n  background: rgba(var(--ion-color-base-rgb), 0.26);\n}\n\n:host(.ion-color) .range-bar-active,\n:host(.ion-color) .range-knob,\n:host(.ion-color) .range-pin,\n:host(.ion-color) .range-pin::before,\n:host(.ion-color) .range-tick {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n::slotted([slot=start]) {\n  margin-left: 0;\n  margin-right: 14px;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted([slot=start]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n    -webkit-margin-end: 14px;\n    margin-inline-end: 14px;\n  }\n}\n\n::slotted([slot=end]) {\n  margin-left: 14px;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted([slot=end]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 14px;\n    margin-inline-start: 14px;\n    -webkit-margin-end: 0;\n    margin-inline-end: 0;\n  }\n}\n\n:host(.range-has-pin) {\n  padding-top: 28px;\n}\n.range-bar-active {\n  bottom: 0;\n  width: auto;\n  background: var(--bar-background-active);\n}\n\n.range-knob {\n  -webkit-transform: scale(0.67);\n  transform: scale(0.67);\n  -webkit-transition-duration: 120ms;\n  transition-duration: 120ms;\n  -webkit-transition-property: background-color, border, -webkit-transform;\n  transition-property: background-color, border, -webkit-transform;\n  transition-property: transform, background-color, border;\n  transition-property: transform, background-color, border, -webkit-transform;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease;\n  z-index: 2;\n}\n\n.range-tick {\n  position: absolute;\n  top: calc((var(--height) - var(--bar-height)) / 2);\n  width: var(--bar-height);\n  height: var(--bar-height);\n  background: var(--bar-background-active);\n  z-index: 1;\n  pointer-events: none;\n}\n\n.range-tick-active {\n  background: transparent;\n}\n\n.range-pin {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  border-radius: 50%;\n  -webkit-transform: translate3d(0,  0,  0) scale(0.01);\n  transform: translate3d(0,  0,  0) scale(0.01);\n  display: inline-block;\n  position: relative;\n  min-width: 28px;\n  height: 28px;\n  -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n  transition: background 120ms ease, -webkit-transform 120ms ease;\n  transition: transform 120ms ease, background 120ms ease;\n  transition: transform 120ms ease, background 120ms ease, -webkit-transform 120ms ease;\n  background: var(--pin-background);\n  color: var(--pin-color);\n  text-align: center;\n}\n.range-pin::before {\n  left: 50%;\n  top: 3px;\n  margin-left: -13px;\n  /* stylelint-disable-next-line property-blacklist */\n  border-radius: 50% 50% 50% 0;\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n  -webkit-transition: background 120ms ease;\n  transition: background 120ms ease;\n  background: var(--pin-background);\n  content: \"\";\n  z-index: -1;\n}\n[dir=rtl] .range-pin::before, :host-context([dir=rtl]) .range-pin::before {\n  left: unset;\n  right: unset;\n  right: 50%;\n}\n\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .range-pin::before {\n    margin-left: unset;\n    -webkit-margin-start: -13px;\n    margin-inline-start: -13px;\n  }\n}\n[dir=rtl] .range-pin::before, :host-context([dir=rtl]) .range-pin::before {\n  /* stylelint-disable-next-line property-blacklist */\n  left: unset;\n}\n\n.range-knob-pressed .range-pin {\n  -webkit-transform: translate3d(0,  -24px,  0) scale(1);\n  transform: translate3d(0,  -24px,  0) scale(1);\n}\n\n:host(:not(.range-has-pin)) .range-knob-pressed .range-knob {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n}\n\n:host(.range-disabled) .range-bar-active,\n:host(.range-disabled) .range-bar,\n:host(.range-disabled) .range-tick {\n  background-color: var(--ion-color-step-250, #bfbfbf);\n}\n\n:host(.range-disabled) .range-knob {\n  -webkit-transform: scale(0.55);\n  transform: scale(0.55);\n  outline: 5px solid #fff;\n  background-color: var(--ion-color-step-250, #bfbfbf);\n}"; }
}
function renderKnob(isRTL, { knob, value, ratio, min, max, disabled, pressed, pin, handleKeyboard }) {
    const start = isRTL ? 'right' : 'left';
    const knobStyle = () => {
        const style = {};
        style[start] = `${ratio * 100}%`;
        return style;
    };
    return (h("div", { onKeyDown: (ev) => {
            const key = ev.key;
            if (key === 'ArrowLeft' || key === 'ArrowDown') {
                handleKeyboard(knob, false);
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (key === 'ArrowRight' || key === 'ArrowUp') {
                handleKeyboard(knob, true);
                ev.preventDefault();
                ev.stopPropagation();
            }
        }, class: {
            'range-knob-handle': true,
            'range-knob-a': knob === 'A',
            'range-knob-b': knob === 'B',
            'range-knob-pressed': pressed,
            'range-knob-min': value === min,
            'range-knob-max': value === max
        }, style: knobStyle(), role: "slider", tabindex: disabled ? -1 : 0, "aria-valuemin": min, "aria-valuemax": max, "aria-disabled": disabled ? 'true' : null, "aria-valuenow": value }, pin && h("div", { class: "range-pin", role: "presentation" }, Math.round(value)), h("div", { class: "range-knob", role: "presentation" })));
}
function ratioToValue(ratio, min, max, step) {
    let value = (max - min) * ratio;
    if (step > 0) {
        value = Math.round(value / step) * step + min;
    }
    return clamp(min, value, max);
}
function valueToRatio(value, min, max) {
    return clamp(0, (value - min) / (max - min), 1);
}

export { Range as ion_range };
