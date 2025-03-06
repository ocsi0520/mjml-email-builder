import { ContainerCompressor } from '../../EBItem/ContainerCompressor';
import { BlockItemID } from './BlockItem';
import { BlockState } from './BlockState';
import { BlockStateNode } from './BlockStateNode';
import { EBBlockViewer } from './eb-block-viewer';

export class BlockCompressor extends ContainerCompressor<
  BlockItemID,
  BlockState
> {
  protected createViewer(): EBBlockViewer {
    return document.createElement('eb-block-viewer');
  }
  protected createSpecificStateNode(
    readState: BlockState,
    element: EBBlockViewer
  ): BlockStateNode {
    return new BlockStateNode(readState, element);
  }
}
