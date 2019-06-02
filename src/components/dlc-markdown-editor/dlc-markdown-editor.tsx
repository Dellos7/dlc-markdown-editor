import { Component, h, Element, State, Prop, Method } from '@stencil/core';
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
    @Prop({ attribute: 'enableShortcuts' }) enableShortcuts: boolean = true;
    @Prop({ reflect: true, mutable: true }) content: string;

    private editorEl: HTMLTextAreaElement;
    private stylerFactoryInterface: StylerFactoryInterface;
    private stylers = {
        bold: new BoldStyler(),
        italics: new ItalicsStyler(),
        link: new LinkStyler(),
        h1: new Heading1Styler()
    };
    
    componentDidLoad() {
        this.setEditorElement();
        this.convertTextToMarkdownListener();
        this.prepareEditor();
    }

    @Method()
    async bold() {
        this.stylerFactoryInterface.style( this.stylers.bold );
    }

    @Method()
    async italics() {
        this.stylerFactoryInterface.style( this.stylers.italics );
    }

    @Method()
    async link() {
        this.stylerFactoryInterface.style( this.stylers.link );
    }

    @Method()
    async h1() {
        this.stylerFactoryInterface.style( this.stylers.h1 );
    }

    @Method()
    async setContent( content: string ) {
        this.content = content;
    }

    private prepareEditor() {
        this.stylerFactoryInterface = new DefaultStylerFactory( this.editorEl );
        if( this.enableShortcuts ) {
            let editorShortcutUtils: EditorShortcutUtilsInterface = new EditorShortcutUtils( this.stylerFactoryInterface );
            editorShortcutUtils.exposeShortcuts();
        }
    }

    private setEditorElement() {
        this.editorEl = this.el.shadowRoot.querySelector('.editor');
    }

    private async convertTextToMarkdownListener() {
        if( !this.editorEl ) {
            await this.setEditorElement();
        }
        this.editorEl.oninput = _ => {
            this.content = this.editorEl.value;
            this.updateMarkdownPreview();
        };
    }

    private updateMarkdownPreview() {
        this.markdownText = marked( this.content );
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
                <textarea class="editor" contenteditable part="editor" value={this.content}></textarea>
                <div class="previewer" part="previewer" innerHTML={ this.markdownText }></div>
            </div>
        );
    }
}
