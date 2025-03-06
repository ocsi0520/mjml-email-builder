import { ContainerCompressor } from '../../EBItem/ContainerCompressor';
import { SlotItemID } from './SlotItem';
import { SlotState } from './SlotState';
import { SlotStateNode } from './SlotStateNode';
import { EBSlotViewer } from './eb-slot-viewer';

export class SlotCompressor extends ContainerCompressor<SlotItemID, SlotState> {
  protected createViewer(): EBSlotViewer {
    return document.createElement('eb-slot-viewer');
  }
  protected createSpecificStateNode(
    readState: SlotState,
    element: EBSlotViewer
  ): SlotStateNode {
    return new SlotStateNode(readState, element);
  }
}
