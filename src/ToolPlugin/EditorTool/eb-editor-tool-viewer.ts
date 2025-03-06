import { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { EditorStateNode } from './EditorStateNode';
import { renderMargin, renderPadding } from '../../common/utils/markup.utils';

@customElement('eb-editor-tool-viewer')
export class EBEditorToolViewer extends SelectableViewerLit<EditorStateNode> {
  protected render(): TemplateResult {
    // TODO: I don't know how lit's host element should be referred in template
    // so now we imperatively set the style
    this.setHostStyle();
    return html`${unsafeStatic(this.stateNode.state.htmlContent)}`;
  }
  private setHostStyle(): void {
    const { state } = this.stateNode;
    this.style.padding = renderPadding(state);
    this.style.margin = renderMargin(state);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-editor-tool-viewer': EBEditorToolViewer;
  }
}
