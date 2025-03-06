import { ButtonToolState } from './ButtonToolState';
import { ButtonItemID } from './ButtonToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type ButtonStateNode = StateNode<
  ButtonToolState,
  BasicViewerComponent<ButtonToolState>,
  ButtonItemID
>;
