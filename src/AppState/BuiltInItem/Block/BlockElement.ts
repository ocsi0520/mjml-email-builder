import { BlockState } from './BlockState';
import { BasicContainerComponent } from '../../StateNode/Basic/BasicContainerComponent';
import { SlotStateNode } from '../Slot/SlotStateNode';
import { BlockItemID } from './BlockItem';

export interface BlockElement
  extends BasicContainerComponent<BlockState, SlotStateNode, BlockItemID> {}
