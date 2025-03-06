import { SlotState } from './SlotState';
import { BasicContainerComponent } from '../../StateNode/Basic/BasicContainerComponent';
import { StateNode } from '../../StateNode/StateNode';
import { SlotItemID } from './SlotItem';

export interface SlotElement
  extends BasicContainerComponent<SlotState, StateNode, SlotItemID> {}
