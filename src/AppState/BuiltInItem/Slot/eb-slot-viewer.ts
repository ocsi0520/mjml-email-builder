import { TemplateResult, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SlotState } from './SlotState';
import { StateNode } from '../../StateNode/StateNode';
import { BasicContainerViewerLit } from '../../Lit/BasicContainerViewerLit';
import { SlotItemID } from './SlotItem';
import { SlotElement } from './SlotElement';

// TODO: finish style
@customElement('eb-slot-viewer')
export class EBSlotViewer
  extends BasicContainerViewerLit<SlotState, StateNode, SlotItemID>
  implements SlotElement
{
  public static styles = [
    BasicContainerViewerLit.stylesForDropPlaceholder,
    css`
      :host {
        display: flex;
        padding: 8px;
        min-height: 100px;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px dotted grey;
      }
    `,
  ];
  protected isHoverable = false;
  protected render(): [...Array<HTMLElement>, TemplateResult] {
    return this.renderChildren();
  }
  protected isInsertableDraggedElement(): boolean {
    if (this.dragService.draggedIcon) return true;

    const draggedSN = this.dragService.draggedStateNode!;
    return this.stateNode.isInsertable(draggedSN);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-slot-viewer': EBSlotViewer;
  }
}
