import { SlotStateNode } from '../Slot/SlotStateNode';
import { ContainerStateNode } from '../../StateNode/ContainerStateNode';
import { StateNode } from '../../StateNode/StateNode';
import { BlockElement } from './BlockElement';
import { itemID, BlockItemID } from './BlockItem';
import { BlockState } from './BlockState';

export class BlockStateNode extends ContainerStateNode<
  BlockState,
  BlockElement,
  BlockItemID,
  SlotStateNode
> {
  constructor(state: BlockState, component: BlockElement, cssID?: string) {
    super(state, component, itemID, cssID);
  }
  public isInsertable(stateNode: StateNode): boolean {
    return stateNode instanceof SlotStateNode;
  }
}
