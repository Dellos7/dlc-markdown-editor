import { SimpleStyler } from "./simple-styler";

export class LinkStyler extends SimpleStyler {

    _styleRegExp: RegExp = /\[([^\[]+)\]\(([^\)]*)\)/;

    style(_selectedText: string): Promise<string> {
        return new Promise<string>( (resolve, _) => {
            let textHasStyle: boolean = this.hasStyle( _selectedText );
            let insertText: string = textHasStyle ? this.removeStyle( _selectedText ) : `[${_selectedText}]()`;
            resolve(insertText);
        });
    }

    removeStyle(_selectedText: string): string {
        return _selectedText.match(/\[([^\[]+)\]/)[1];
    }

}