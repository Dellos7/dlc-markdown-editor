import { BoldStyler } from './../stylers/bold-styler';
import { GenericSurroundingSymbolsStyler } from './surrounding-symbols-styler';
import { SelectionTextUtils } from '../selection-text-utils';

export class ItalicsStyler extends GenericSurroundingSymbolsStyler {

    _symbol: string = '*';
    _styleRegExp: RegExp = /^(\*|_)(.*?)(\*|_)$/;
    _halfStyleRegexp: RegExp = /(\*|_)(.*?)/;

    style(_selectedText: string): Promise<string> {
        let boldStyler: BoldStyler = new BoldStyler();
        return new Promise<string>((resolve, _) => {
            let insertText: string, textHasStyle = false;
            //As italics and bold use both same symbol (*), we must check first if the selected text is bold
            if (boldStyler.hasStyle(_selectedText)) {
                let textTmp: string = boldStyler.removeStyle(_selectedText);
                textHasStyle = this.hasStyle(textTmp);
                //If it's bold, we check if it's also italics, and if true we remove the italics style
                if (textHasStyle) {
                    insertText = this.removeStyle(_selectedText);
                }
                else {
                    //If it's no italics, we check if it's italics taking into account the surronding not selected text
                    let textHasUnselectedStyle = this.hasUnselectedStyle( _selectedText );
                    if (textHasUnselectedStyle) {
                        textHasStyle = textHasUnselectedStyle;
                        SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                        _selectedText = SelectionTextUtils.getSelectionText();
                    }
                    insertText = `${this._symbol}${_selectedText}${this._symbol}`;
                }
            }
            else {
                //Text has not bold style, we check if text has italics style
                textHasStyle = this.hasStyle( _selectedText );
                if( !textHasStyle ) {
                    let textHasUnselectedStyle = this.hasUnselectedStyle( _selectedText );
                    if (textHasUnselectedStyle) {
                        textHasStyle = textHasUnselectedStyle;
                        SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                        _selectedText = SelectionTextUtils.getSelectionText();
                    }
                }
                insertText = textHasStyle ? this.removeStyle( _selectedText ) : `${this._symbol}${_selectedText}${this._symbol}`;
            }
            resolve(insertText);
        });
    }

}