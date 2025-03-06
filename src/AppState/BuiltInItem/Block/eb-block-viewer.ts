import { TemplateResult, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { SelectableViewerLit } from '../../Lit/SelectableViewerLit';
import { StateNode } from '../../StateNode/StateNode';
import { mapBasicStateToStyleInfo } from '../../State/StateToStyle';
import { BlockStateNode } from './BlockStateNode';
import { BlockElement } from './BlockElement';

// reminder: basically we can't move slots therefore block viewer is not a BasicContainerViewerLit
@customElement('eb-block-viewer')
export class EBBlockViewer
  extends SelectableViewerLit<BlockStateNode>
  implements BlockElement
{
  public static styles = css`
    div {
      display: flex;
      box-sizing: border-box;
    }
    eb-slot-viewer {
      flex: 1 1 0;
    }
    div.block-item.type-66-33 > eb-slot-viewer:nth-of-type(1),
    div.block-item.type-33-66 > eb-slot-viewer:nth-of-type(2) {
      flex: 2 1 0;
    }
  `;
  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('node-selected', this.handleDescendantSelected);
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('node-selected', this.handleDescendantSelected);
  }
  protected render(): TemplateResult {
    const blockClassType = `block-item type-${this.stateNode.state.type}`;
    return html`
      <div style=${styleMap(this.getStyleInfo())} class="${blockClassType}">
        ${this.stateNode.children.map((slotChild) => slotChild.component)}
      </div>
    `;
  }
  // when we are dragging from sidepanel, the hover effects has a guard-clause
  // (so no hover when dragging)
  // so if we want to highlight the block which we just dropped a new node
  // we need to do this
  private handleDescendantSelected = ({
    detail: selectedStateNode,
  }: CustomEvent<StateNode>): void => {
    if (selectedStateNode === this.stateNode) return;
    // to enforce that node-selected should be handled first
    // and then block-hovered
    requestAnimationFrame(this.dispatchHoverEvent);
  };
  private getStyleInfo(): StyleInfo {
    return {
      backgroundColor: this.stateNode.state.backgroundColor,
      ...mapBasicStateToStyleInfo(this.stateNode.state),
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
    'eb-block-viewer': EBBlockViewer;
  }
}
