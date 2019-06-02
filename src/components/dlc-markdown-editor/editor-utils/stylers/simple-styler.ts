import { StylerInterface } from './styler-interface';
export abstract class SimpleStyler implements StylerInterface {

    _styleRegExp: RegExp;
    editorElement: HTMLInputElement | HTMLTextAreaElement;

    style(_selectedText: string): Promise<string> {
        throw new Error("Method not implemented.");
    }    
    
    hasStyle(_selectedText: string): boolean {
        return this._styleRegExp.test(_selectedText);
    }

    hasUnselectedStyle(_selectedText: string): boolean {
        throw new Error("Method not implemented.");
    }

    hasHalfStyle(_selectedText: string): boolean {
        throw new Error("Method not implemented.");
    }

    removeStyle(_selectedText: string): string {
        throw new Error("Method not implemented.");
    }

    setElement(element: HTMLInputElement | HTMLTextAreaElement) {
        this.editorElement = element;
    }


}