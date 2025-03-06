import { TitleToolState } from './TitleToolState';
import { TitleItemID } from './TitleToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type TitleStateNode = StateNode<
  TitleToolState,
  BasicViewerComponent<TitleToolState>,
  TitleItemID
>;
