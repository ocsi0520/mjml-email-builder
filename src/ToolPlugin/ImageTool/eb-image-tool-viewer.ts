import { html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../AppState/Lit/SelectableViewerLit';
import { ImageStateNode } from './ImageStateNode';

// TODO: finish
@customElement('eb-image-tool-viewer')
export class EBImageToolViewer extends SelectableViewerLit<ImageStateNode> {
  public static styles = css`
    img {
      width: 100%;
    }
  `;
  // TODO: apply style
  protected render(): TemplateResult {
    this.style.textAlign = this.stateNode.state.alignment;
    this.style.backgroundColor = this.stateNode.state.backgroundColor;
    return html`<img
      style=${styleMap(this.getStyleInfo())}
      alt="an-img"
      src=${this.stateNode.state.imageURL}
    />`;
  }
  private getStyleInfo(): StyleInfo {
    return {
      width: this.stateNode.state.width || '',
      ...this.getBorderStyleInfo(),
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
    'eb-image-tool-viewer': EBImageToolViewer;
  }
}
