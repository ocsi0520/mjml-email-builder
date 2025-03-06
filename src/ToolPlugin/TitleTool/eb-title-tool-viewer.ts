import { TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { mapBasicStateToStyleInfo } from '../../AppState/State/StateToStyle';
import { TitleStateNode } from './TitleStateNode';

@customElement('eb-title-tool-viewer')
export class EBTitleToolViewer extends SelectableViewerLit<TitleStateNode> {
  protected render(): TemplateResult {
    const { titleText } = this.stateNode.state;
    return html`<h1 style=${styleMap(this.getStyleInfo())}>${titleText}</h1>`;
  }
  private getStyleInfo(): Readonly<StyleInfo> {
    const { state } = this.stateNode;
    return {
      ...mapBasicStateToStyleInfo(state),
      backgroundColor: state.backgroundColor,
      ...this.getFontStyleInfo(),
      ...this.getBorderStyleInfo(),
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
  private getBorderStyleInfo(): Partial<StyleInfo> {
    const { border } = this.stateNode.state;
    if (!border) return {};

    const { color, lineType, width, radius } = border;
    const borderStyleInfo: Partial<StyleInfo> = {
      border: `${width} ${lineType} ${color}`,
    };
    if (radius) borderStyleInfo.borderRadius = radius;
    return borderStyleInfo;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-title-tool-viewer': EBTitleToolViewer;
  }
}
