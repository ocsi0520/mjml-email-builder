import { EditorToolState } from './EditorToolState';
import { EditorItemID } from './EditorToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type EditorStateNode = StateNode<
  EditorToolState,
  BasicViewerComponent<EditorToolState>,
  EditorItemID
>;
