import { BlockStateNode } from '../../BuiltInItem/Block/BlockStateNode';
import { CanvasStateNode } from '../../BuiltInItem/Canvas/CanvasStateNode';
import { ContainerStateNode } from '../../StateNode/ContainerStateNode';
import { StateNode } from '../../StateNode/StateNode';
import { SlotElement } from './SlotElement';
import { SlotItemID, itemID } from './SlotItem';
import { SlotState } from './SlotState';

export class SlotStateNode extends ContainerStateNode<
  SlotState,
  SlotElement,
  SlotItemID
> {
  constructor(state: SlotState, component: SlotElement, cssID?: string) {
    super(state, component, itemID, cssID);
  }
  public isInsertable(stateNode: StateNode): boolean {
    const isBuiltInElement =
      stateNode instanceof CanvasStateNode ||
      stateNode instanceof BlockStateNode ||
      stateNode instanceof SlotStateNode;
    return !isBuiltInElement;
  }
}
