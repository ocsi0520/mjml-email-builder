import { msg } from '@lit/localize';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { FooterStateNode } from './FooterStateNode';
import { GET_DEFAULT_STATE, FooterToolState } from './FooterToolState';
import type { EBFooterToolEditor } from './eb-footer-tool-editor';
import './eb-footer-tool-viewer';
import './eb-footer-tool-editor';
import { FooterMJMLCSSGenerator } from './FooterMJMLCSSGenerator';
import { MJMLCSSGenerator } from '../../AppState/EBItem/MJMLCSSGenerator';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';

const footerIconURL = new URL('../../../../assets/footer.svg', import.meta.url)
  .href;

export const itemID = 'footer' as const;
export type FooterItemID = typeof itemID;

class FooterToolPlugin implements ToolPlugin<FooterItemID, FooterToolState> {
  public readonly itemID = itemID;
  public createStateNode(state = GET_DEFAULT_STATE()): FooterStateNode {
    const viewer = document.createElement('eb-footer-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<FooterToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
  public getEditor(): EBFooterToolEditor {
    return document.createElement('eb-footer-tool-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<FooterStateNode> {
    return new FooterMJMLCSSGenerator();
  }
  public getIcon(): ToolIconDescriptor<'footer'> {
    return {
      iconPath: footerIconURL,
      title: msg('A footer tool'),
      itemID,
    };
  }
}
export const footerToolPlugin = new FooterToolPlugin();
