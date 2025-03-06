import { BlockStateNode } from '../Block/BlockStateNode';
import { ContainerStateNode } from '../../StateNode/ContainerStateNode';
import { StateNode } from '../../StateNode/StateNode';
import { CanvasElement } from './CanvasElement';
import { itemID, CanvasItemID } from './CanvasItem';
import { CanvasState } from './CanvasState';

export class CanvasStateNode extends ContainerStateNode<
  CanvasState,
  CanvasElement,
  CanvasItemID,
  BlockStateNode
> {
  constructor(state: CanvasState, component: CanvasElement, cssID?: string) {
    super(state, component, itemID, cssID);
  }
  // TODO: instead of rejecting, wrap it, not here
  // but when creating the command
  public isInsertable(stateNode: StateNode): boolean {
    return stateNode instanceof BlockStateNode;
  }
}
