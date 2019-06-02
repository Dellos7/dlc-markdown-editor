export class SelectionTextUtils {

    /**
     * Gets the current selected text
     */
    public static getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if ((document as any).selection && (document as any).selection.type != "Control") {
            text = (document as any).selection.createRange().text;
        }
        return text;
    }

    /**
     * Expands the selection to "numCharsBefore" and "numCharsAfter" the selected text
     * @param element The element
     * @param numCharsBefore The number of characters to select before the selected text on the element
     * @param numCharsAfter The number of characters to select after the selected text on the element
     */
    public static selectMoreText(element: HTMLInputElement | HTMLTextAreaElement, numCharsBefore: number, numCharsAfter: number) {
        element.focus();
        let ss = element.selectionStart;
        let se = element.selectionEnd;
        element.setSelectionRange(ss - numCharsBefore, se + numCharsAfter);
    }

    /**
     * Gets the "numChars" characters before the selected text
     * @param element The element
     * @param numChars The number of characters
     */
    public static getCharsBeforeSelection(element: HTMLInputElement | HTMLTextAreaElement, numChars: number) {
        let ss = element.selectionStart;
        return element.value.substring(ss - numChars, ss);
    }

    /**
     * Gets the "numChars" characters after the selected text
     * @param element The element
     * @param numChars The number of characters
     */
    public static getCharsAfterSelection(element: HTMLInputElement | HTMLTextAreaElement, numChars: number) {
        let se = element.selectionEnd;
        return element.value.substring(se, se + numChars);
    }

}