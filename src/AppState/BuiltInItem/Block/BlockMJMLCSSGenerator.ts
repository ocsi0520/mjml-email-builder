import { renderPadding } from '../../../common/utils/markup.utils';
import { ContainerMJMLCSSGenerator } from '../../EBItem/ContainerMJMLCSSGenerator';
import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../EBItem/MJMLCSSGenerator';
import { AppMJMLVisitorRegister } from '../../Register/Visitor/AppMJMLVisitorRegister';
import { BlockState, BlockType } from './BlockState';
import { BlockStateNode } from './BlockStateNode';

export class BlockMJMLCSSGenerator
  extends ContainerMJMLCSSGenerator<BlockStateNode>
  implements MJMLCSSGenerator<BlockStateNode>
{
  public getMJML(
    stateNode: BlockStateNode,
    register: AppMJMLVisitorRegister
  ): string {
    const { state } = stateNode;
    const padding = renderPadding(state);
    return `<mj-section padding="${padding}" background-color="${
      stateNode.state.backgroundColor
    }" ${this.getBorderStyle(state)}>${this.getMJMLOfChildren(
      stateNode,
      register
    )}</mj-section>`;
  }
  protected getOwnStyle(stateNode: BlockStateNode): StyleByItemIDOrView {
    const styles: StyleByItemIDOrView = {};
    const blockType = stateNode.state.type;
    styles.block =
      'div.block-item{display: flex;gap: 8px;margin: 8px;box-sizing: border-box;}';

    if (blockType === BlockType.oneAndTwoThird)
      styles['block-one-two'] =
        'div.block-item.type-33-66>div.slot-item:nth-of-type(2){flex: 2 1 0;}';

    if (blockType === BlockType.twoAndOneThird)
      styles['block-two-one'] =
        'div.block-item.type-66-33>div.slot-item:nth-of-type(1){flex: 2 1 0;}';
    return styles;
  }
  private getBorderStyle({ border }: BlockState): string {
    if (!border) return '';
    const { width, lineType, color, radius } = border;
    const simpleBorder = `border="${width} ${lineType} ${color};"`;
    const borderRadius = radius ? `border-radius="${radius};"` : '';
    return simpleBorder + borderRadius;
  }
}
