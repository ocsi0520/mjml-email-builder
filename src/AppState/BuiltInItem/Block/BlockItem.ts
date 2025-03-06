import { EBItem } from '../../EBItem/EBItem';
import { MJMLCSSGenerator } from '../../EBItem/MJMLCSSGenerator';
import { StateEditor } from '../../EBItem/StateEditor';
import { BlockCompressor } from './BlockCompressor';
import { BlockMJMLCSSGenerator } from './BlockMJMLCSSGenerator';
import { BlockState, DEFAULT_STATE } from './BlockState';
import { BlockStateNode } from './BlockStateNode';

export const itemID = 'block' as const;
export type BlockItemID = typeof itemID;
class BlockItem implements EBItem<BlockItemID, BlockState> {
  public readonly itemID = itemID;
  public getEditor(): StateEditor<BlockState> {
    return document.createElement('eb-block-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<BlockStateNode> {
    return new BlockMJMLCSSGenerator();
  }
  public createStateNode(state: BlockState = DEFAULT_STATE): BlockStateNode {
    const blockViewer = document.createElement('eb-block-viewer');
    const stateNode = new BlockStateNode(state, blockViewer);
    blockViewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): BlockCompressor {
    return new BlockCompressor(itemID);
  }
}

export const blockItem = new BlockItem();
