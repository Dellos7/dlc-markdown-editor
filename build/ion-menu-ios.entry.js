import { r as registerInstance, f as getIonMode, c as createEvent, d as getConnect, n as config, B as Build, h, H as Host, e as getElement } from './dlc-markdown-editor-d387313e.js';
import { i as isEndSide, b as assert } from './chunk-3702a6ef.js';
import { GESTURE_CONTROLLER } from './index-314f7f65.js';

class Menu {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.lastOnEnd = 0;
        this.blocker = GESTURE_CONTROLLER.createBlocker({ disableScroll: true });
        this.mode = getIonMode(this);
        this.isAnimating = false;
        this._isOpen = false;
        this.isPaneVisible = false;
        this.isEndSide = false;
        /**
         * If `true`, the menu is disabled.
         */
        this.disabled = false;
        /**
         * Which side of the view the menu should be placed.
         */
        this.side = 'start';
        /**
         * If `true`, swiping the menu is enabled.
         */
        this.swipeGesture = true;
        /**
         * The edge threshold for dragging the menu open.
         * If a drag/swipe happens over this value, the menu is not triggered.
         */
        this.maxEdgeStart = 50;
        this.ionWillOpen = createEvent(this, "ionWillOpen", 7);
        this.ionWillClose = createEvent(this, "ionWillClose", 7);
        this.ionDidOpen = createEvent(this, "ionDidOpen", 7);
        this.ionDidClose = createEvent(this, "ionDidClose", 7);
        this.ionMenuChange = createEvent(this, "ionMenuChange", 7);
        this.lazyMenuCtrl = getConnect(this, "ion-menu-controller");
    }
    typeChanged(type, oldType) {
        const contentEl = this.contentEl;
        if (contentEl) {
            if (oldType !== undefined) {
                contentEl.classList.remove(`menu-content-${oldType}`);
            }
            contentEl.classList.add(`menu-content-${type}`);
            contentEl.removeAttribute('style');
        }
        if (this.menuInnerEl) {
            // Remove effects of previous animations
            this.menuInnerEl.removeAttribute('style');
        }
        this.animation = undefined;
    }
    disabledChanged() {
        this.updateState();
        this.ionMenuChange.emit({
            disabled: this.disabled,
            open: this._isOpen
        });
    }
    sideChanged() {
        this.isEndSide = isEndSide(window, this.side);
    }
    swipeGestureChanged() {
        this.updateState();
    }
    async componentWillLoad() {
        if (this.type === undefined) {
            this.type = config.get('menuType', this.mode === 'ios' ? 'reveal' : 'overlay');
        }
        if (!Build.isBrowser) {
            this.disabled = true;
            return;
        }
        const menuCtrl = this.menuCtrl = await this.lazyMenuCtrl.componentOnReady().then(p => p._getInstance());
        const el = this.el;
        const parent = el.parentNode;
        const content = this.contentId !== undefined
            ? document.getElementById(this.contentId)
            : parent && parent.querySelector && parent.querySelector('[main]');
        if (!content || !content.tagName) {
            // requires content element
            console.error('Menu: must have a "content" element to listen for drag events on.');
            return;
        }
        this.contentEl = content;
        // add menu's content classes
        content.classList.add('menu-content');
        this.typeChanged(this.type, undefined);
        this.sideChanged();
        // register this menu with the app's menu controller
        menuCtrl._register(this);
        this.gesture = (await __sc_import_dlc_markdown_editor('./index-314f7f65.js')).createGesture({
            el: document,
            gestureName: 'menu-swipe',
            gesturePriority: 30,
            threshold: 10,
            canStart: ev => this.canStart(ev),
            onWillStart: () => this.onWillStart(),
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.updateState();
    }
    componentDidLoad() {
        this.ionMenuChange.emit({ disabled: this.disabled, open: this._isOpen });
    }
    componentDidUnload() {
        this.blocker.destroy();
        this.menuCtrl._unregister(this);
        if (this.animation) {
            this.animation.destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    }
    onSplitPaneChanged(ev) {
        this.isPaneVisible = ev.detail.isPane(this.el);
        this.updateState();
    }
    onBackdropClick(ev) {
        if (this._isOpen && this.lastOnEnd < ev.timeStamp - 100) {
            const shouldClose = (ev.composedPath)
                ? !ev.composedPath().includes(this.menuInnerEl)
                : false;
            if (shouldClose) {
                ev.preventDefault();
                ev.stopPropagation();
                this.close();
            }
        }
    }
    /**
     * Returns `true` is the menu is open.
     */
    isOpen() {
        return Promise.resolve(this._isOpen);
    }
    /**
     * Returns `true` is the menu is active.
     *
     * A menu is active when it can be opened or closed, meaning it's enabled
     * and it's not part of a `ion-split-pane`.
     */
    isActive() {
        return Promise.resolve(this._isActive());
    }
    /**
     * Opens the menu. If the menu is already open or it can't be opened,
     * it returns `false`.
     */
    open(animated = true) {
        return this.setOpen(true, animated);
    }
    /**
     * Closes the menu. If the menu is already closed or it can't be closed,
     * it returns `false`.
     */
    close(animated = true) {
        return this.setOpen(false, animated);
    }
    /**
     * Toggles the menu. If the menu is already open, it will try to close, otherwise it will try to open it.
     * If the operation can't be completed successfully, it returns `false`.
     */
    toggle(animated = true) {
        return this.setOpen(!this._isOpen, animated);
    }
    /**
     * Opens or closes the button.
     * If the operation can't be completed successfully, it returns `false`.
     */
    setOpen(shouldOpen, animated = true) {
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    }
    async _setOpen(shouldOpen, animated = true) {
        // If the menu is disabled or it is currently being animated, let's do nothing
        if (!this._isActive() || this.isAnimating || shouldOpen === this._isOpen) {
            return false;
        }
        this.beforeAnimation(shouldOpen);
        await this.loadAnimation();
        await this.startAnimation(shouldOpen, animated);
        this.afterAnimation(shouldOpen);
        return true;
    }
    async loadAnimation() {
        // Menu swipe animation takes the menu's inner width as parameter,
        // If `offsetWidth` changes, we need to create a new animation.
        const width = this.menuInnerEl.offsetWidth;
        if (width === this.width && this.animation !== undefined) {
            return;
        }
        this.width = width;
        // Destroy existing animation
        if (this.animation) {
            this.animation.destroy();
            this.animation = undefined;
        }
        // Create new animation
        this.animation = await this.menuCtrl._createAnimation(this.type, this);
    }
    async startAnimation(shouldOpen, animated) {
        const ani = this.animation.reverse(!shouldOpen);
        if (animated) {
            await ani.playAsync();
        }
        else {
            ani.playSync();
        }
    }
    _isActive() {
        return !this.disabled && !this.isPaneVisible;
    }
    canSwipe() {
        return this.swipeGesture && !this.isAnimating && this._isActive();
    }
    canStart(detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
            // TODO error
        }
        else if (this.menuCtrl.getOpenSync()) {
            return false;
        }
        return checkEdgeSide(window, detail.currentX, this.isEndSide, this.maxEdgeStart);
    }
    onWillStart() {
        this.beforeAnimation(!this._isOpen);
        return this.loadAnimation();
    }
    onStart() {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        // the cloned animation should not use an easing curve during seek
        this.animation.reverse(this._isOpen).progressStart();
    }
    onMove(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        const delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        const stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    }
    onEnd(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        const isOpen = this._isOpen;
        const isEndSide = this.isEndSide;
        const delta = computeDelta(detail.deltaX, isOpen, isEndSide);
        const width = this.width;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2.0;
        const shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        const shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || detail.deltaX < -z);
        const shouldComplete = isOpen
            ? isEndSide ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide ? shouldCompleteLeft : shouldCompleteRight;
        let shouldOpen = !isOpen && shouldComplete;
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(() => this.afterAnimation(shouldOpen), {
            clearExistingCallbacks: true,
            oneTimeCallback: true
        })
            .progressEnd(shouldComplete, stepValue, realDur);
    }
    beforeAnimation(shouldOpen) {
        assert(!this.isAnimating, '_before() should not be called while animating');
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add(SHOW_MENU);
        if (this.backdropEl) {
            this.backdropEl.classList.add(SHOW_BACKDROP);
        }
        this.blocker.block();
        this.isAnimating = true;
        if (shouldOpen) {
            this.ionWillOpen.emit();
        }
        else {
            this.ionWillClose.emit();
        }
    }
    afterAnimation(isOpen) {
        assert(this.isAnimating, '_before() should be called while animating');
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this._isOpen = isOpen;
        this.isAnimating = false;
        if (!this._isOpen) {
            this.blocker.unblock();
        }
        if (isOpen) {
            // add css class
            if (this.contentEl) {
                this.contentEl.classList.add(MENU_CONTENT_OPEN);
            }
            // emit open event
            this.ionDidOpen.emit();
        }
        else {
            // remove css classes
            this.el.classList.remove(SHOW_MENU);
            if (this.contentEl) {
                this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            }
            if (this.backdropEl) {
                this.backdropEl.classList.remove(SHOW_BACKDROP);
            }
            // emit close event
            this.ionDidClose.emit();
        }
    }
    updateState() {
        const isActive = this._isActive();
        if (this.gesture) {
            this.gesture.setDisabled(!isActive || !this.swipeGesture);
        }
        // Close menu immediately
        if (!isActive && this._isOpen) {
            // close if this menu is open, and should not be enabled
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        assert(!this.isAnimating, 'can not be animating');
    }
    forceClosing() {
        assert(this._isOpen, 'menu cannot be closed');
        this.isAnimating = true;
        const ani = this.animation.reverse(true);
        ani.playSync();
        this.afterAnimation(false);
    }
    render() {
        const { isEndSide, type, disabled, isPaneVisible } = this;
        return (h(Host, { role: "complementary", class: {
                [`menu-type-${type}`]: true,
                'menu-enabled': !disabled,
                'menu-side-end': isEndSide,
                'menu-side-start': !isEndSide,
                'menu-pane-visible': isPaneVisible
            } }, h("div", { class: "menu-inner", ref: el => this.menuInnerEl = el }, h("slot", null)), h("ion-backdrop", { ref: (el) => this.backdropEl = el, class: "menu-backdrop", tappable: false, stopPropagation: false })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "type": ["typeChanged"],
        "disabled": ["disabledChanged"],
        "side": ["sideChanged"],
        "swipeGesture": ["swipeGestureChanged"]
    }; }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the menu\n   *\n   * \@prop --min-width: Minimum width of the menu\n   * \@prop --width: Width of the menu\n   * \@prop --max-width: Maximum width of the menu\n   *\n   * \@prop --min-height: Minimum height of the menu\n   * \@prop --height: Height of the menu\n   * \@prop --max-height: Maximum height of the menu\n   */\n  --width: 304px;\n  --min-width: auto;\n  --max-width: auto;\n  --height: 100%;\n  --min-height: auto;\n  --max-height: auto;\n  --background: var(--ion-background-color, #fff);\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: none;\n  position: absolute;\n  contain: strict;\n}\n\n:host(.show-menu) {\n  display: block;\n}\n\n.menu-inner {\n  left: 0;\n  right: auto;\n  top: 0;\n  bottom: 0;\n  -webkit-transform: translate3d(-9999px,  0,  0);\n  transform: translate3d(-9999px,  0,  0);\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  contain: strict;\n}\n[dir=rtl] .menu-inner, :host-context([dir=rtl]) .menu-inner {\n  left: unset;\n  right: unset;\n  left: auto;\n  right: 0;\n}\n\n[dir=rtl] .menu-inner, :host-context([dir=rtl]) .menu-inner {\n  -webkit-transform: translate3d(calc(-1 * -9999px),  0,  0);\n  transform: translate3d(calc(-1 * -9999px),  0,  0);\n}\n\n:host(.menu-side-start) .menu-inner {\n  --ion-safe-area-right: 0px;\n  /* stylelint-disable property-blacklist */\n  right: auto;\n  left: 0;\n}\n\n:host(.menu-side-end) .menu-inner {\n  --ion-safe-area-left: 0px;\n  right: 0;\n  left: auto;\n  /* stylelint-enable property-blacklist */\n}\n\nion-backdrop {\n  display: none;\n  opacity: 0.01;\n  z-index: -1;\n}\n\n\@media (max-width: 340px) {\n  .menu-inner {\n    --width: 264px;\n  }\n}\n:host(.menu-type-reveal) {\n  z-index: 0;\n}\n\n:host(.menu-type-reveal.show-menu) .menu-inner {\n  -webkit-transform: translate3d(0,  0,  0);\n  transform: translate3d(0,  0,  0);\n}\n\n:host(.menu-type-overlay) {\n  z-index: 80;\n}\n\n:host(.menu-type-overlay) .show-backdrop {\n  display: block;\n  cursor: pointer;\n}\n\n:host(.menu-pane-visible) .menu-inner {\n  left: 0;\n  right: 0;\n  width: auto;\n  /* stylelint-disable declaration-no-important */\n  -webkit-transform: none !important;\n  transform: none !important;\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n}\n\n:host(.menu-pane-visible) ion-backdrop {\n  display: hidden !important;\n  /* stylelint-enable declaration-no-important */\n}\n\n:host(.menu-type-push) {\n  z-index: 80;\n}\n\n:host(.menu-type-push) .show-backdrop {\n  display: block;\n}"; }
}
function computeDelta(deltaX, isOpen, isEndSide) {
    return Math.max(0, isOpen !== isEndSide ? -deltaX : deltaX);
}
function checkEdgeSide(win, posX, isEndSide, maxEdgeStart) {
    if (isEndSide) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
}
const SHOW_MENU = 'show-menu';
const SHOW_BACKDROP = 'show-backdrop';
const MENU_CONTENT_OPEN = 'menu-content-open';

export { Menu as ion_menu };
