import { SelectionTextUtils } from './../../selection-text-utils';
import { StylerFactoryInterface } from './styler-factory-interface';
import { StylerInterface } from '../styler-interface';
export class DefaultStylerFactory implements StylerFactoryInterface {

    constructor( private element: HTMLInputElement | HTMLTextAreaElement ) {

    }

    style(styler: StylerInterface) {
        styler.setElement( this.element );
        let selectedText: string = SelectionTextUtils.getSelectionText();
        styler.style( selectedText ).then( (insertText) => {
            document.execCommand("insertText", false, insertText);
        });
    }

}