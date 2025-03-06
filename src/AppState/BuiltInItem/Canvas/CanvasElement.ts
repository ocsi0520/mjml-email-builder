import { CanvasState } from './CanvasState';
import { BlockStateNode } from '../Block/BlockStateNode';
import { BasicContainerComponent } from '../../StateNode/Basic/BasicContainerComponent';
import { CanvasItemID } from './CanvasItem';

export interface CanvasElement
  extends BasicContainerComponent<CanvasState, BlockStateNode, CanvasItemID> {}
