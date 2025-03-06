import { css, html, TemplateResult } from 'lit';
import { msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import type {
  Editor,
  EditorEvent,
  RawEditorOptions,
  TinyMCE,
  Events,
} from 'tinymce';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { EditorToolState } from './EditorToolState';
import { commonFieldStyles } from '../../common/editor-common-fields.style';
import {
  KNOWN_FONTS,
  makeDefaultFontState,
} from '../../AppState/State/FontState';

declare const tinymce: TinyMCE;
type ChangeEvent = Events.EditorEventMap['change'];

// TODO: handle with https://www.tiny.cloud/docs-4x/advanced/usage-with-module-loaders/

// eslint-disable-next-line max-lines-per-function
const getEditorOptions = (target: HTMLElement): RawEditorOptions => ({
  skin: 'oxide-dark',
  content_css: 'dark',
  target,
  menubar: false,
  statusbar: false,
  font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
  plugins: 'lists link emoticons anchor table help fullscreen',
  // This option allows you to specify the buttons and the order that they
  // will appear on TinyMCE’s toolbar.
  // https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar
  toolbar:
    'fontfamily fontsize |' +
    'bold italic underline strikethrough backcolor forecolor |' +
    'lineheight align bullist numlist outdent indent blockquote | ' +
    'link emoticons removeformat selectall fullscreen',
  toolbar_mode: 'wrap',
  // Toolbar groups is a useful concept for organizing the toolbar into
  // sub toolbars that show up as a floating toolbar.
  // This particular toolbar config is inspired by Gmail.
  // https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar_groups
  toolbar_groups: {
    formatgroup: {
      icon: 'format',
      tooltip: 'Formatting',
      items:
        'fontselect | formatselect | bold italic underline strikethrough forecolor | ' +
        'align bullist numlist outdent indent blockquote',
    },
  },
  // An alternative to the styleselect toolbar button is the formatselect button
  // which is a simpler version of the styleselect button. It is configured
  // using the block_formats option.
  // https://www.tiny.cloud/docs/configure/editor-appearance/#block_formats
  block_formats: 'Normal=p; Heading=h1; Sub heading=h2; Small=small',
  // In order to force TinyMCE to apply inline styles to the default paragraph
  // text we can use the forced_root_block together with forced_root_block_attrs.
  // https://www.tiny.cloud/docs/configure/content-filtering/#forced_root_block
  // https://www.tiny.cloud/docs/configure/content-filtering/#forced_root_block_attrs
  forced_root_block: 'p',
  forced_root_block_attrs: {
    // style: 'font-size: 14px; font-family: helvetica, arial, sans-serif;',
  },
  // Add known fonts to font family dropdown menu
  font_family_formats: Object.entries(KNOWN_FONTS)
    .map(([name, style]) => `${name}=${style}`)
    .join(';'),
  // Make sure the default font is selected ( instead of 'System Font' )
  content_style: `body { font-family: ${makeDefaultFontState().fontFamily} }`,
});

@customElement('eb-editor-tool-editor')
export class EBEditorToolEditor extends StateEditorLit<EditorToolState> {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    css`
      div.tox.tox-tinymce.tox-fullscreen
        ~ div.tox.tox-silver-sink.tox-tinymce-aux {
        position: absolute !important;
      }
      div.tox.tox-silver-sink.tox-tinymce-aux .tox-form__group:last-child {
        display: none;
      }
    `,
  ];
  private editor: Editor | null = null;
  private content: string | null = null;
  public connectedCallback(): void {
    super.connectedCallback();
    requestAnimationFrame(() => this.initTinyMCE());
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.editor!.destroy();
  }
  protected willUpdate(): void {
    const newHTMLContent = this.stateNode.state.htmlContent;
    const noChange = this.content === newHTMLContent;
    if (!this.editor || noChange) return;

    this.content = newHTMLContent;
    this.editor.setContent(this.stateNode.state.htmlContent);
  }
  protected renderContent(): TemplateResult {
    return html`<textarea
      id="editor"
      .value=${this.stateNode.state.htmlContent}
    ></textarea>`;
  }
  protected getEditorName(): string {
    return msg('An HTML editor tool');
  }
  private async initTinyMCE(): Promise<void> {
    const textArea = this.shadowRoot!.getElementById('editor')!;
    const [editor] = await tinymce.init(getEditorOptions(textArea));
    this.editor = editor;
    this.editor.on('change', this.handleChangeFromEditor);
  }
  private handleChangeFromEditor = (_ev: EditorEvent<ChangeEvent>): void => {
    this.content = this.editor!.getContent();
    const newState: EditorToolState = {
      ...this.stateNode.state,
      htmlContent: this.content,
    };
    this.dispatchNewState(newState);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-editor-tool-editor': EBEditorToolEditor;
  }
}
