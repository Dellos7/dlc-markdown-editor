import { StylerInterface } from './styler-interface';
import { SelectionTextUtils } from '../selection-text-utils';
export abstract class GenericSurroundingSymbolsStyler implements StylerInterface {

    _symbol: string;
    _styleRegExp: RegExp;
    _halfStyleRegexp: RegExp;
    editorElement: HTMLInputElement | HTMLTextAreaElement;

    style(_selectedText: string): Promise<string> {
        return new Promise<string>((resolve, _) => {
            let textHasStyle = this.hasStyle(_selectedText);
            if (!textHasStyle) {
                let textHasUnselectedStyle = this.hasUnselectedStyle( _selectedText );
                if (textHasUnselectedStyle) {
                    textHasStyle = textHasUnselectedStyle;
                    SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                    _selectedText = SelectionTextUtils.getSelectionText(this.editorElement);
                }
            }
            let insertText: string = textHasStyle ? this.removeStyle(_selectedText) : `${this._symbol}${_selectedText}${this._symbol}`;
            resolve(insertText);
        });
    }

    hasStyle(_selectedText: string): boolean {
        return this._styleRegExp.test(_selectedText);
    }

    hasUnselectedStyle(_selectedText: string): boolean {
        return this.hasHalfStyle(
            SelectionTextUtils.getCharsBeforeSelection(
                this.editorElement,
                this._symbol.length
            )
        ) &&
            this.hasHalfStyle(
                SelectionTextUtils.getCharsAfterSelection(
                    this.editorElement,
                    this._symbol.length
                )
            );
    }

    hasHalfStyle(_selectedText: string): boolean {
        return this._halfStyleRegexp.test(_selectedText);
    }

    removeStyle(_selectedText: string): string {
        return _selectedText.substring(this._symbol.length, _selectedText.length - this._symbol.length);
    }

    setElement(element: HTMLInputElement | HTMLTextAreaElement) {
        this.editorElement = element;
    }

    getElement(): HTMLInputElement | HTMLTextAreaElement {
        return this.editorElement;
    }

}