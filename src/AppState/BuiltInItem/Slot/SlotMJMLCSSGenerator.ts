import { ContainerMJMLCSSGenerator } from '../../EBItem/ContainerMJMLCSSGenerator';
import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../EBItem/MJMLCSSGenerator';
import { AppMJMLVisitorRegister } from '../../Register/Visitor/AppMJMLVisitorRegister';
import { blockColumnWidths } from '../Block/BlockState';
import { BlockStateNode } from '../Block/BlockStateNode';
import { SlotStateNode } from './SlotStateNode';

export class SlotMJMLCSSGenerator
  extends ContainerMJMLCSSGenerator<SlotStateNode>
  implements MJMLCSSGenerator<SlotStateNode>
{
  public getMJML(
    stateNode: SlotStateNode,
    register: AppMJMLVisitorRegister
  ): string {
    return `<mj-column width="${this.getMJMLWidth(stateNode)}">
      ${this.getMJMLOfChildren(stateNode, register)}
    </mj-column>`;
  }
  protected getOwnStyle(): StyleByItemIDOrView {
    return {
      'slot-item':
        'div.slot-item{display:flex;padding:8px;' +
        'min-height:10px;flex-direction:column;box-sizing:border-box;flex:1 1 0}',
    };
  }
  private getMJMLWidth(stateNode: SlotStateNode): string {
    const parentState = (stateNode.parent as BlockStateNode).state;
    const widthMapping = blockColumnWidths[parentState.type];
    const idx = stateNode.getIndexInParent();
    if (idx == null || !widthMapping[idx])
      throw new Error(`Invalid index: ${idx}`);
    return widthMapping[idx];
  }
}
