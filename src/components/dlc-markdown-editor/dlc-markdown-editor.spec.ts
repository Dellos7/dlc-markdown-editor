import { TestWindow } from '@stencil/core/testing';
import { DlcMarkdownEditor } from './dlc-markdown-editor';

describe('dlc-markdown-editor', () => {
  it('should build', () => {
    expect(new DlcMarkdownEditor()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLDlcMarkdownEditorElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DlcMarkdownEditor],
        html: '<dlc-markdown-editor></dlc-markdown-editor>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
