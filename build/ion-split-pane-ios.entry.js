import { r as registerInstance, c as createEvent, i as getContext, f as getIonMode, e as getElement, h, H as Host } from './dlc-markdown-editor-d387313e.js';

const SPLIT_PANE_MAIN = 'split-pane-main';
const SPLIT_PANE_SIDE = 'split-pane-side';
const QUERY = {
    'xs': '(min-width: 0px)',
    'sm': '(min-width: 576px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 992px)',
    'xl': '(min-width: 1200px)',
    'never': ''
};
class SplitPane {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visible = false;
        /**
         * If `true`, the split pane will be hidden.
         */
        this.disabled = false;
        /**
         * When the split-pane should be shown.
         * Can be a CSS media query expression, or a shortcut expression.
         * Can also be a boolean expression.
         */
        this.when = QUERY['lg'];
        this.ionSplitPaneVisible = createEvent(this, "ionSplitPaneVisible", 7);
        this.isServer = getContext(this, "isServer");
        this.win = getContext(this, "window");
    }
    visibleChanged(visible) {
        const detail = { visible, isPane: this.isPane.bind(this) };
        this.ionSplitPaneVisible.emit(detail);
    }
    componentDidLoad() {
        this.styleChildren();
        this.updateState();
    }
    componentDidUnload() {
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
    }
    updateState() {
        if (this.isServer) {
            return;
        }
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
        // Check if the split-pane is disabled
        if (this.disabled) {
            this.visible = false;
            return;
        }
        // When query is a boolean
        const query = this.when;
        if (typeof query === 'boolean') {
            this.visible = query;
            return;
        }
        // When query is a string, let's find first if it is a shortcut
        const mediaQuery = QUERY[query] || query;
        // Media query is empty or null, we hide it
        if (mediaQuery.length === 0) {
            this.visible = false;
            return;
        }
        if (this.win.matchMedia) {
            // Listen on media query
            const callback = (q) => {
                this.visible = q.matches;
            };
            const mediaList = this.win.matchMedia(mediaQuery);
            mediaList.addListener(callback);
            this.rmL = () => mediaList.removeListener(callback);
            this.visible = mediaList.matches;
        }
    }
    isPane(element) {
        if (!this.visible) {
            return false;
        }
        return element.parentElement === this.el
            && element.classList.contains(SPLIT_PANE_SIDE);
    }
    styleChildren() {
        if (this.isServer) {
            return;
        }
        const contentId = this.contentId;
        const children = this.el.children;
        const nu = this.el.childElementCount;
        let foundMain = false;
        for (let i = 0; i < nu; i++) {
            const child = children[i];
            const isMain = contentId !== undefined ? child.id === contentId : child.hasAttribute('main');
            if (isMain) {
                if (foundMain) {
                    console.warn('split pane cannot have more than one main node');
                    return;
                }
                foundMain = true;
            }
            setPaneClass(child, isMain);
        }
        if (!foundMain) {
            console.warn('split pane does not have a specified main node');
        }
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true,
                // Used internally for styling
                [`split-pane-${mode}`]: true,
                'split-pane-visible': this.visible
            }
        };
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "visible": ["visibleChanged"],
        "disabled": ["updateState"],
        "when": ["updateState"]
    }; }
    render() { return h(Host, this.hostData()); }
    static get style() { return "ion-split-pane {\n  /**\n   * \@prop --border: Border between panes\n   */\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  contain: strict;\n}\n\n.split-pane-visible > .split-pane-side,\n.split-pane-visible > .split-pane-main {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  /* stylelint-disable-next-line declaration-no-important */\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n  z-index: 0;\n}\n\n.split-pane-visible > .split-pane-side:not(ion-menu),\n.split-pane-visible > ion-menu.split-pane-side.menu-enabled {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n\n.split-pane-side:not(ion-menu) {\n  display: none;\n}\n\n.split-pane-visible > .split-pane-side {\n  -ms-flex-order: -1;\n  order: -1;\n}\n\n.split-pane-visible > .split-pane-side[side=end] {\n  -ms-flex-order: 1;\n  order: 1;\n}\n\n.split-pane-ios {\n  --border: 0.55px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, #c8c7cc)));\n}\n\n.split-pane-ios.split-pane-visible > .split-pane-side {\n  min-width: 270px;\n  max-width: 28%;\n  border-right: var(--border);\n  border-left: 0;\n}\n\n.split-pane-ios.split-pane-visible > .split-pane-side[side=end] {\n  min-width: 270px;\n  max-width: 28%;\n  border-right: 0;\n  border-left: var(--border);\n}"; }
}
function setPaneClass(el, isMain) {
    let toAdd;
    let toRemove;
    if (isMain) {
        toAdd = SPLIT_PANE_MAIN;
        toRemove = SPLIT_PANE_SIDE;
    }
    else {
        toAdd = SPLIT_PANE_SIDE;
        toRemove = SPLIT_PANE_MAIN;
    }
    const classList = el.classList;
    classList.add(toAdd);
    classList.remove(toRemove);
}

export { SplitPane as ion_split_pane };
