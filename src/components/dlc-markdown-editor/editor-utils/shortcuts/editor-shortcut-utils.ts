import { LinkStyler } from './../stylers/link-styler';
import { StrikethroughStyler } from './../stylers/strikethrough-styler';
import { ItalicsStyler } from './../stylers/italics-styler';
import { StylerFactoryInterface } from './../../../../../dist/types/components/dlc-markdown-editor/editor-utils/stylers/factory/styler-factory-interface.d';
import { BoldStyler } from './../stylers/bold-styler';
import { EditorShortcutUtilsInterface } from "./editor-shortcut-utils-interface";

export class EditorShortcutUtils extends EditorShortcutUtilsInterface {

    shortcuts = [
        {
            keyCode: 66,
            usesMetaKey: true,
            styler: new BoldStyler(),
            stylerFactory: this.defaultStylerFactory
        },
        {
            keyCode: 73,
            usesMetaKey: true,
            styler: new ItalicsStyler(),
            stylerFactory: this.defaultStylerFactory
        },
        {
            keyCode: 186,
            usesMetaKey: true,
            styler: new StrikethroughStyler(),
            stylerFactory: this.defaultStylerFactory
        },
        {
            keyCode: 75,
            usesMetaKey: true,
            styler: new LinkStyler(),
            stylerFactory: this.defaultStylerFactory
        }
    ];

    constructor( private defaultStylerFactory: StylerFactoryInterface ) {
        super();
    }

}