import { html, css, TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { CanvasState } from './CanvasState';
import { BlockStateNode } from '../Block/BlockStateNode';
import {
  BasicContainerViewerLit,
  activeContainer,
} from '../../Lit/BasicContainerViewerLit';
import { CanvasItemID } from './CanvasItem';
import { CanvasElement } from './CanvasElement';
import { mapBasicStateToStyleInfo } from '../../State/StateToStyle';

@customElement('eb-canvas-viewer')
export class EBCanvasViewer
  extends BasicContainerViewerLit<CanvasState, BlockStateNode, CanvasItemID>
  implements CanvasElement
{
  public static styles = [
    BasicContainerViewerLit.stylesForDropPlaceholder,
    css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      :host(.${unsafeCSS(activeContainer)}) > div {
        border-top: none;
      }
      div {
        width: 100%;
        box-sizing: border-box;
        flex: 1 1 0;
      }
    `,
  ];
  protected isHoverable = false;
  protected render(): TemplateResult {
    return html`<div style=${styleMap(this.getStyleInfo())}>
      ${this.renderChildren()}
    </div>`;
  }
  protected isInsertableDraggedElement(): boolean {
    if (this.dragService.draggedIcon) return false;

    const draggedSN = this.dragService.draggedStateNode!;
    return this.stateNode.isInsertable(draggedSN);
  }
  private getStyleInfo(): StyleInfo {
    return {
      backgroundColor: this.stateNode.state.backgroundColor,
      ...mapBasicStateToStyleInfo(this.stateNode.state),
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-canvas-viewer': EBCanvasViewer;
  }
}
