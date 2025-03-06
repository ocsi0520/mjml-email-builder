import { EBItem } from '../../EBItem/EBItem';
import { MJMLCSSGenerator } from '../../EBItem/MJMLCSSGenerator';
import { StateEditor } from '../../EBItem/StateEditor';
import { SlotCompressor } from './SlotCompressor';
import { SlotMJMLCSSGenerator } from './SlotMJMLCSSGenerator';
import { SlotState, DEFAULT_STATE } from './SlotState';
import { SlotStateNode } from './SlotStateNode';

export const itemID = 'slot' as const;
export type SlotItemID = typeof itemID;
class SlotItem implements EBItem<SlotItemID, SlotState> {
  public readonly itemID = itemID;
  public getEditor(): StateEditor<SlotState> {
    return document.createElement('eb-slot-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<SlotStateNode> {
    return new SlotMJMLCSSGenerator();
  }
  public createStateNode(state: SlotState = DEFAULT_STATE): SlotStateNode {
    const slotViewer = document.createElement('eb-slot-viewer');
    const stateNode = new SlotStateNode(state, slotViewer);
    slotViewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): SlotCompressor {
    return new SlotCompressor('slot');
  }
}

export const slotItem = new SlotItem();
