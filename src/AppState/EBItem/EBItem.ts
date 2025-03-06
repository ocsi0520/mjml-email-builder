import { BasicState } from '../State/BasicState';
import { StateEditor } from './StateEditor';
import { StateNode } from '../StateNode/StateNode';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { StateNodeCompressor } from './StateNodeCompressor';
import { MJMLCSSGenerator } from './MJMLCSSGenerator';

export interface EBItem<
  ItemID extends string = string,
  State extends BasicState = BasicState
> {
  readonly itemID: ItemID;
  getEditor: () => StateEditor<State>;
  getMJMLCSSGenerator: () => MJMLCSSGenerator<
    StateNode<State, BasicViewerComponent<State>>
  >;
  createStateNode: (
    state?: State
  ) => StateNode<State, BasicViewerComponent<State>, ItemID>;
  getCompressor: () => StateNodeCompressor<State>;
}
