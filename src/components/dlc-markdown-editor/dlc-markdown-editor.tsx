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
        //Last action
        this.prepareEditor();
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
            <div class="wrapper">
                <div class="buttons">
                    <button class="button button-bold" onClick={_ => this.bold()}>Bold</button>
                    <button class="button button-italics" onClick={_ => this.italics()}>Italics</button>
                    <button class="button button-link" onClick={_ => this.link()}>Link</button>
                    <button class="button button-h1" onClick={_ => this.h1()}>H1</button>
                </div>
                {/*<textarea class="editor" contenteditable part="editor" value={this.content}></textarea>}*/}
                <span class="editor-wrapper" innerHTML={this.getEditorElementHtml()}></span>
                <div class="previewer" part="previewer" innerHTML={this.markdownText}></div>
            </div>
        );
    }
}
