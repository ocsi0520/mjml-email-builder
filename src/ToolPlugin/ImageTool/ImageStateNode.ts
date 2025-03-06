import { ImageToolState } from './ImageToolState';
import { ImageItemID } from './ImageToolPlugin';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';

export type ImageStateNode = StateNode<
  ImageToolState,
  BasicViewerComponent<ImageToolState>,
  ImageItemID
>;
