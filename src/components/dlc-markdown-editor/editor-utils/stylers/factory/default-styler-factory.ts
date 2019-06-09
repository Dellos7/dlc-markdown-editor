import { SelectionTextUtils } from './../../selection-text-utils';
import { StylerFactoryInterface } from './styler-factory-interface';
import { StylerInterface } from '../styler-interface';
export class DefaultStylerFactory implements StylerFactoryInterface {

    constructor( public element: HTMLInputElement | HTMLTextAreaElement ) {

    }

    style(styler: StylerInterface) {
        styler.setElement( this.element );
        let selectedText: string = SelectionTextUtils.getSelectionText(this.element);
        styler.style( selectedText ).then( (insertText) => {
            if( !document.execCommand("insertText", false, insertText) ) {
                let ss = this.element.selectionStart;
                let se = this.element.selectionEnd;
                this.element.value = this.element.value.substring(0, ss) + insertText + this.element.value.substring(se, 999999);
                this.element.dispatchEvent(new Event('input'));
            }
        });
    }

}