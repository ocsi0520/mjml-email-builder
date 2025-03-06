import { msg } from '@lit/localize';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { HrStateNode } from './HrStateNode';
import { DEFAULT_STATE, HrToolState } from './HrToolState';
import type { EBHrToolEditor } from './eb-hr-tool-editor';
import './eb-hr-tool-viewer';
import './eb-hr-tool-editor';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';
import { MJMLCSSGenerator } from '../../AppState/EBItem/MJMLCSSGenerator';
import { HrMJMLCSSGenerator } from './HrMJMLCSSGenerator';
import { StateNode } from '../../AppState/StateNode/StateNode';

const hrIconURL = new URL('../../../../assets/separator.svg', import.meta.url)
  .href;

export const itemID = 'hr' as const;
export type HRItemID = typeof itemID;

class HrToolPlugin implements ToolPlugin<HRItemID, HrToolState> {
  public readonly itemID = itemID;
  public createStateNode(state = DEFAULT_STATE): HrStateNode {
    const viewer = document.createElement('eb-hr-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<HrToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
  public getEditor(): EBHrToolEditor {
    return document.createElement('eb-hr-tool-editor');
  }
  public getMJMLCSSGenerator(): MJMLCSSGenerator<HrStateNode> {
    return new HrMJMLCSSGenerator();
  }
  public getIcon(): ToolIconDescriptor<'hr'> {
    return { iconPath: hrIconURL, title: msg('A hr tool'), itemID };
  }
}
export const hrToolPlugin = new HrToolPlugin();
