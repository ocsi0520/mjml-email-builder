import { ContainerCompressor } from '../../EBItem/ContainerCompressor';
import { CanvasItemID } from './CanvasItem';
import { CanvasState } from './CanvasState';
import { CanvasStateNode } from './CanvasStateNode';
import { EBCanvasViewer } from './eb-canvas-viewer';

export class CanvasCompressor extends ContainerCompressor<
  CanvasItemID,
  CanvasState
> {
  protected createViewer(): EBCanvasViewer {
    return document.createElement('eb-canvas-viewer');
  }
  protected createSpecificStateNode(
    readState: CanvasState,
    element: EBCanvasViewer
  ): CanvasStateNode {
    return new CanvasStateNode(readState, element);
  }
}
