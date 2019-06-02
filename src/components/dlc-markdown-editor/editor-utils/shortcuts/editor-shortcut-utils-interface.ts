import { StylerInterface } from '../stylers/styler-interface';
import { StylerFactoryInterface } from "../stylers/factory/styler-factory-interface";

export abstract class EditorShortcutUtilsInterface {
    
    shortcuts: { keyCode: number, usesMetaKey: boolean, styler: StylerInterface, stylerFactory: StylerFactoryInterface }[];

    exposeShortcuts() {
        window.addEventListener('keydown', (e) => {
            for (let shortcut of this.shortcuts) {
                if ((shortcut.usesMetaKey && e.metaKey || !shortcut.usesMetaKey) && e.keyCode === shortcut.keyCode) {
                    shortcut.stylerFactory.style( shortcut.styler );
                }
            }
        });
    }

}