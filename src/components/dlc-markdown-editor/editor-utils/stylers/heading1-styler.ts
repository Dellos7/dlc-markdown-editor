import { SimpleStyler } from "./simple-styler";

export class Heading1Styler extends SimpleStyler {

    _styleRegExp: RegExp = /^(#{1})(\ )(.*)/;

    style(_selectedText: string): Promise<string> {
        return new Promise<string>( (resolve, _) => {
            let textHasStyle: boolean = this.hasStyle( _selectedText );
            let insertText: string = textHasStyle ? this.removeStyle( _selectedText ) : `# ${_selectedText}`;
            resolve(insertText);
        });
    }

    removeStyle(_selectedText: string): string {
        return _selectedText.substring(2, _selectedText.length);
    }

}