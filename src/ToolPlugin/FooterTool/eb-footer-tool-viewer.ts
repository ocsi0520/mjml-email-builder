import { TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { mapBasicStateToStyleInfo } from '../../AppState/State/StateToStyle';
import { FooterStateNode } from './FooterStateNode';

@customElement('eb-footer-tool-viewer')
export class EBFooterToolViewer extends SelectableViewerLit<FooterStateNode> {
  protected render(): TemplateResult {
    const { unsubscribeText } = this.stateNode.state;
    const { linkText } = this.stateNode.state;
    return html`<p style=${styleMap(this.getStyleInfo())}>
      ${unsubscribeText} ${linkText}
    </p>`;
  }
  private getStyleInfo(): Readonly<StyleInfo> {
    const { state } = this.stateNode;
    return {
      ...mapBasicStateToStyleInfo(state),
      backgroundColor: state.backgroundColor,
      ...this.getFontStyleInfo(),
    };
  }
  private getFontStyleInfo(): Partial<StyleInfo> {
    const { font } = this.stateNode.state;
    return {
      color: font.color,
      fontFamily: font.fontFamily,
      fontSize: font.size,
      textAlign: font.alignment,
      fontWeight: font.weight.toString(),
      fontStyle: font.fontStyle,
      lineHeight: font.lineHeight,
      letterSpacing: font.letterSpacing,
      textDecoration: font.textDecoration,
      textTransform: font.textTransform,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-footer-tool-viewer': EBFooterToolViewer;
  }
}
