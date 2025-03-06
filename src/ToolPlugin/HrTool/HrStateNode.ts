import { HrToolState } from './HrToolState';
import { HRItemID } from './HrToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type HrStateNode = StateNode<
  HrToolState,
  BasicViewerComponent<HrToolState>,
  HRItemID
>;
