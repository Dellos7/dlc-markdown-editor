import { e as registerInstance, h as getIonMode, f as h, k as Host } from './dlc-markdown-editor-3c7af0f3.js';

class ItemGroup {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            'role': 'group',
            class: {
                [`${mode}`]: true,
                // Used internally for styling
                [`item-group-${mode}`]: true,
                'item': true
            }
        };
    }
    render() { return h(Host, this.hostData()); }
    static get style() { return "ion-item-group {\n  display: block;\n}\n\n.item-group-ios ion-item:last-child,\n.item-group-ios ion-item-sliding:last-child .item {\n  --border-width: 0;\n}"; }
}

export { ItemGroup as ion_item_group };
