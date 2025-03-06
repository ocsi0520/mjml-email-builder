import { html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { mapBasicStateToStyleInfo } from '../../AppState/State/StateToStyle';
import { HrStateNode } from './HrStateNode';

@customElement('eb-hr-tool-viewer')
export class EBHrToolViewer extends SelectableViewerLit<HrStateNode> {
  public static styles = css`
    hr {
      border: none;
    }
  `;
  protected render(): TemplateResult {
    return html`<hr style=${styleMap(this.getStyleInfo())} />`;
  }
  private getStyleInfo(): Readonly<StyleInfo> {
    return {
      ...mapBasicStateToStyleInfo(this.stateNode.state),
      borderTop: this.getBorderTopStyle(),
    };
  }
  private getBorderTopStyle(): StyleInfo['borderTop'] {
    const { color, lineType, width } = this.stateNode.state.border;
    return `${width} ${lineType} ${color}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-hr-tool-viewer': EBHrToolViewer;
  }
}
