import { msg } from '@lit/localize';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { ImageToolState, DEFAULT_STATE } from './ImageToolState';
import type { EBImageToolEditor } from './eb-image-tool-editor';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';
import { ImageMJMLCSSGenerator } from './ImageMJMLCSSGenerator';
import './eb-image-tool-viewer';
import './eb-image-tool-editor';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { ImageStateNode } from './ImageStateNode';

export const itemID = 'image' as const;
const imageIconURL = new URL(
  '../../../../assets/image-icon.svg',
  import.meta.url
).href;

export type ImageItemID = typeof itemID;
class ImageToolPlugin implements ToolPlugin<ImageItemID, ImageToolState> {
  public itemID = itemID;
  public getIcon(): ToolIconDescriptor<ImageItemID> {
    return {
      iconPath: imageIconURL,
      title: msg('An image tool'),
      itemID,
    };
  }
  public getEditor(): EBImageToolEditor {
    return document.createElement('eb-image-tool-editor');
  }
  public createStateNode(state = DEFAULT_STATE): ImageStateNode {
    const viewer = document.createElement('eb-image-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<ImageToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
  public getMJMLCSSGenerator(): ImageMJMLCSSGenerator {
    return new ImageMJMLCSSGenerator();
  }
}
export const imageToolPlugin = new ImageToolPlugin();
