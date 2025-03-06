import { EBItem } from '../../EBItem/EBItem';
import { MJMLCSSGenerator } from '../../EBItem/MJMLCSSGenerator';
import { StateEditor } from '../../EBItem/StateEditor';
import { CanvasCompressor } from './CanvasCompressor';
import { CanvasMJMLCSSGenerator } from './CanvasMJMLCSSGenerator';
import { DEFAULT_STATE, CanvasState } from './CanvasState';
import { CanvasStateNode } from './CanvasStateNode';

export const itemID = 'canvas' as const;
export type CanvasItemID = typeof itemID;
class CanvasItem implements EBItem<CanvasItemID, CanvasState> {
  public readonly itemID = itemID;
  public getEditor(): StateEditor<CanvasState> {
    return document.createElement('eb-canvas-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<CanvasStateNode> {
    return new CanvasMJMLCSSGenerator();
  }
  public createStateNode(state: CanvasState = DEFAULT_STATE): CanvasStateNode {
    const canvasViewer = document.createElement('eb-canvas-viewer');
    const stateNode = new CanvasStateNode(state, canvasViewer);
    canvasViewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): CanvasCompressor {
    return new CanvasCompressor(itemID);
  }
}

export const canvasItem = new CanvasItem();
