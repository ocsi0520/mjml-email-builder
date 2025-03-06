import { msg } from '@lit/localize';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { TitleStateNode } from './TitleStateNode';
import { GET_DEFAULT_STATE, TitleToolState } from './TitleToolState';
import type { EBTitleToolEditor } from './eb-title-tool-editor';
import './eb-title-tool-viewer';
import './eb-title-tool-editor';
import { TitleMJMLCSSGenerator } from './TitleMJMLCSSGenerator';
import { MJMLCSSGenerator } from '../../AppState/EBItem/MJMLCSSGenerator';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';

const titleIconURL = new URL('../../../../assets/title.svg', import.meta.url)
  .href;

export const itemID = 'title' as const;
export type TitleItemID = typeof itemID;

class TitleToolPlugin implements ToolPlugin<TitleItemID, TitleToolState> {
  public readonly itemID = itemID;
  public createStateNode(state = GET_DEFAULT_STATE()): TitleStateNode {
    const viewer = document.createElement('eb-title-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<TitleToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
  public getEditor(): EBTitleToolEditor {
    return document.createElement('eb-title-tool-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<TitleStateNode> {
    return new TitleMJMLCSSGenerator();
  }
  public getIcon(): ToolIconDescriptor<'title'> {
    return {
      iconPath: titleIconURL,
      title: msg('A title tool'),
      itemID,
    };
  }
}
export const titleToolPlugin = new TitleToolPlugin();
