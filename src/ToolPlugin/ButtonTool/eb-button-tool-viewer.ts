import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { mapBasicStateToStyleInfo } from '../../AppState/State/StateToStyle';
import { ButtonStateNode } from './ButtonStateNode';

@customElement('eb-button-tool-viewer')
export class EBButtonToolViewer extends SelectableViewerLit<ButtonStateNode> {
  protected render(): TemplateResult {
    this.style.textAlign = this.stateNode.state.alignment;
    return html`<button style=${styleMap(this.getStyleInfo())}>
      ${this.stateNode.state.text}
    </button>`;
  }
  private getStyleInfo(): Readonly<StyleInfo> {
    return {
      ...mapBasicStateToStyleInfo(this.stateNode.state),
      backgroundColor: this.stateNode.state.backgroundColor,
      width: this.stateNode.state.width,
      ...this.getFontSettingsStyleInfo(),
      ...this.getBorderStyleInfo(),
    };
  }
  private getFontSettingsStyleInfo(): Partial<StyleInfo> {
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
    'eb-button-tool-viewer': EBButtonToolViewer;
  }
}
