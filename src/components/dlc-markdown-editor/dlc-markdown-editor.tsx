import { Component, h, State, Prop, Method, Watch, Element } from '@stencil/core';
import marked from 'marked';
import { EditorShortcutUtils } from './editor-utils/shortcuts/editor-shortcut-utils';
import { StylerFactoryInterface } from './editor-utils/stylers/factory/styler-factory-interface';
import { DefaultStylerFactory } from './editor-utils/stylers/factory/default-styler-factory';
import { EditorShortcutUtilsInterface } from './editor-utils/shortcuts/editor-shortcut-utils-interface';
import { BoldStyler } from './editor-utils/stylers/bold-styler';
import { ItalicsStyler } from './editor-utils/stylers/italics-styler';
import { LinkStyler } from './editor-utils/stylers/link-styler';
import { Heading1Styler } from './editor-utils/stylers/heading1-styler';
import 'ionicons';

@Component({
    tag: 'dlc-markdown-editor',
    styleUrl: 'dlc-markdown-editor.scss',
    shadow: true
})
export class DlcMarkdownEditor {

    @Element() private el: HTMLDlcMarkdownEditorElement;
    @State() private markdownText: string;
    /**
     * Whether enable or not the keyboard shortcuts
     */
    @Prop({ attribute: 'enableShortcuts' }) enableShortcuts: boolean = true;
    /**
     * To set the content of the editor element (input, textarea...)
     */
    @Prop({ reflect: true, mutable: true }) content: string;
    /**
     * We can pass in a custom element to handle the editor (<textarea>, <input> or an element that contains one of these)
     */
    @Prop({ reflect: true, mutable: true }) customEditorElement: HTMLInputElement | HTMLTextAreaElement;

    @Prop({ attribute: 'previewerStyle' }) previewerStyle: 'github';

    @Watch('previewerStyle')
    setPreviewerStyle(newValue: string, _?: string) {
        if (newValue === 'github') {
            this.setPreviewerClasses('markdown-body');
        }
        else {
            this.removePreviewerClasses('markdown-body');
        }
    }

    private editorEl: HTMLTextAreaElement | HTMLInputElement;
    private stylerFactoryInterface: StylerFactoryInterface;
    private stylers = {
        bold: new BoldStyler(),
        italics: new ItalicsStyler(),
        link: new LinkStyler(),
        h1: new Heading1Styler()
    };
    /**
     * This is the outher html of the editor element
     */
    private outerHtml: string;

    componentDidLoad() {
        this.setEditorElement();
        this.convertTextToMarkdownListener();
        this.setEditorElContent();
        this.setPreviewerStyle(this.previewerStyle);
        //Last action
        this.prepareEditor();

        //Ir, va..... (evitar scroll de la página al hacer focus en el textarea)
        this.el.shadowRoot.querySelector('textarea, input').addEventListener('focus', () => {
            setTimeout( () => {
                window.scrollTo(0, 0);
            }, 10);
        });
    }

    componentDidUpdate() {
        this.setEditorElement();
        this.convertTextToMarkdownListener();
        this.setEditorElContent();
        this.modifyElInStylerFactory();
    }

    /**
     * Bold the selected text
     */
    @Method()
    async bold() {
        this.stylerFactoryInterface.style(this.stylers.bold);
    }

    /**
     * Format the selected text into italics
     */
    @Method()
    async italics() {
        this.stylerFactoryInterface.style(this.stylers.italics);
    }

    /**
     * Create a link onto the selected text
     */
    @Method()
    async link() {
        this.stylerFactoryInterface.style(this.stylers.link);
    }

    /**
     * Convert the selected text into an h1
     */
    @Method()
    async h1() {
        this.stylerFactoryInterface.style(this.stylers.h1);
    }

    @Method()
    async setPreviewerClasses(...classes: string[]) {
        //let previewer = this.el.shadowRoot.querySelector('.previewer');
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper__area');
        if (previewer) {
            previewer.classList.add(...classes);
        }
    }

    @Method()
    async removePreviewerClasses(...classes: string[]) {
        //let previewer = this.el.shadowRoot.querySelector('.previewer');
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper__area');
        if (previewer) {
            previewer.classList.remove(...classes);
        }
    }

    /**
     * Show the previewer
     */
    @Method()
    async showPreviewer() {
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper') as HTMLElement;
        //previewer.style.display = 'initial';
        previewer.classList.add('previewer-wrapper__opened');
    }

    /**
     * Close the previewer
     */
    @Method()
    async closePreviewer() {
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper') as HTMLElement;
        //previewer.style.display = 'none';
        previewer.classList.remove('previewer-wrapper__opened');
    }

    /**
     * Count words
     */
    @Method()
    async countWords() {
        let s = this.content.replace(/(^\s*)|(\s*$)/gi, "");
        s = s.replace(/[ ]{2,}/gi, " ");
        s = s.replace(/\n /, "\n");
        return s.split(' ').length;
    }

    copyHtmlToClipboard() {
        let text = this.el.shadowRoot.querySelector('.previewer-wrapper__area').innerHTML;
        navigator.clipboard.writeText(text).then( 
            () => {
                
            }, 
            () => {
            if ( (document as any).selection) {
                let range = (document.body as any).createTextRange();
                range.moveToElementText(this.el.shadowRoot.querySelector('.previewer-wrapper__area'));
                range.select().createTextRange();
                document.execCommand("copy");
            
              } else if (window.getSelection) {
                let range = document.createRange();
                range.selectNode(this.el.shadowRoot.querySelector('.previewer-wrapper__area'));
                window.getSelection().addRange(range);
                document.execCommand("copy");
              }
        });
    }

    @Watch('customEditorElement')
    watchCustomEditorElement(newValue: string, oldValue: string) {
        //When the customEditorElement is modified (user passes a new one),
        //we must reset the attributes that were set
        if (oldValue !== newValue) {
            this.editorEl = null;
            this.outerHtml = null;
        }
    }

    @Watch('content')
    watchContent(newValue: string, oldValue: string) {
        //If user passes a new content, synchronize the editor element value with that content
        if (oldValue !== newValue) {
            this.editorEl.value = newValue;
        }
    }

    private prepareEditor() {
        // Prepare the editor: enable shortcuts, create the styler factory with the element
        this.stylerFactoryInterface = new DefaultStylerFactory(this.editorEl);
        if (this.enableShortcuts) {
            let editorShortcutUtils: EditorShortcutUtilsInterface = new EditorShortcutUtils(this.stylerFactoryInterface);
            editorShortcutUtils.exposeShortcuts();
        }
    }

    private setEditorElement() {
        //The editor element must be set looking for in the Shadow DOM. It could be a textarea or an input element,
        //and it could be nested in any children of the shadow root
        if (!this.editorEl) {
            //this.editorEl = this.el.shadowRoot.querySelector('.editor');
            this.editorEl = this.el.shadowRoot.querySelector('textarea, input');
        }
    }

    private convertTextToMarkdownListener() {
        //We must handle the user inputs in the editor and update the markdown
        if (this.editorEl) {
            this.editorEl.oninput = _ => {
                this.content = this.editorEl.value;
                this.updateMarkdownPreview();
            };
        }
    }

    private updateMarkdownPreview() {
        //Convert the editor value (content) into markdown
        this.markdownText = marked(this.content);
    }

    private getEditorElementHtml() {
        return this.customEditorElement ? this._getEditorElementCustom() : this._getEditorElementDefault();
    }

    /*    private _getEditorElementCustom() {
            if (this.editorEl) {
                return this.editorEl.outerHTML;
            }
            let el = document.createElement(this.customEditorElement) as HTMLInputElement;
            if (el) {
                el.className = 'editor';
                el.contentEditable = 'true';
                return el.outerHTML;
            }
            return null;
        }*/

    private _getEditorElementCustom() {
        //Custom editor element. Retrieve the element passed in by the user and assign the required properties
        //Then, return the outerHTML in order to print it in the render function
        if (this.outerHtml) {
            return this.outerHtml;
        }
        let el = this.customEditorElement;
        if (el) {
            el.className = `editor${el.className ? " " + el.className : ""}`;
            el.contentEditable = 'true';
            el.setAttribute('part', 'editor');
            this.outerHtml = el.outerHTML;
            return el.outerHTML;
        }
        return null;
    }

    private _getEditorElementDefault() {
        //If user didn't pass in a custom element, we create by default a textarea for the editor
        if (this.outerHtml) {
            //return this.editorEl.outerHTML;
            return this.outerHtml;
        }
        let el = document.createElement('textarea');
        if (el) {
            el.className = 'editor';
            el.contentEditable = 'true';
            el.setAttribute('part', 'editor');
            this.outerHtml = el.outerHTML;
            return el.outerHTML;
        }
        return null;
    }

    private setEditorElContent() {
        if (this.editorEl && this.content && !this.editorEl.value) {
            this.editorEl.value = this.content;
        }
    }

    private modifyElInStylerFactory() {
        if (this.editorEl && this.stylerFactoryInterface.element !== this.editorEl) {
            this.stylerFactoryInterface.element = this.editorEl;
        }
    }

    render() {
        this.updateMarkdownPreview();
        return (
            <div class="wrapper" part="container">
                {/*<textarea class="editor" contenteditable part="editor" value={this.content}></textarea>}*/}
                <div class="editor-wrapper">
                    <div class="buttons">
                        <button class="button button__bold" onClick={_ => this.bold()}><strong>B</strong></button>
                        <button class="button button__italics" onClick={_ => this.italics()}><i>I</i></button>
                        <button class="button button__link" onClick={_ => this.link()}><ion-icon name="link"></ion-icon></button>
                        <button class="button button__h1" onClick={_ => this.h1()}>H<sub>1</sub></button>
                        <button class="button button__h2" onClick={_ => this.h1()}>H<sub>2</sub></button>
                        <button class="button button__h3" onClick={_ => this.h1()}>H<sub>3</sub></button>
                        <button class="button button__show-previewer" onClick={_ => this.showPreviewer()}><ion-icon name="eye"></ion-icon></button>
                    </div>
                    <div class="editor-wrapper__area" innerHTML={this.getEditorElementHtml()}></div>
                </div>
                {/*<div class="previewer" part="previewer" innerHTML={this.markdownText}></div>*/}
                <div class="previewer-wrapper">
                    <div class="buttons">
                        <button class="button button-copy-html" onClick={_ => this.copyHtmlToClipboard()}><ion-icon name="copy"></ion-icon></button>
                        <button class="button button__close-previewer" onClick={_ => this.closePreviewer()}><ion-icon name="close"></ion-icon></button>
                    </div>
                    <div class="previewer-wrapper__area" part="previewer" innerHTML={this.markdownText}></div>
                </div>
            </div>
        );
    }
}
