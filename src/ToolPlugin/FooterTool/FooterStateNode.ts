import { FooterToolState } from './FooterToolState';
import { FooterItemID } from './FooterToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type FooterStateNode = StateNode<
  FooterToolState,
  BasicViewerComponent<FooterToolState>,
  FooterItemID
>;
