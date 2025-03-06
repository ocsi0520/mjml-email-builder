import { msg } from '@lit/localize';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { ButtonToolState, DEFAULT_STATE } from './ButtonToolState';
import type { EBButtonToolEditor } from './eb-button-tool-editor';
import { ButtonStateNode } from './ButtonStateNode';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';
import './eb-button-tool-viewer';
import './eb-button-tool-editor';
import { ButtonMJMLCSSGenerator } from './ButtonMJMLCSGenerator';
import { StateNode } from '../../AppState/StateNode/StateNode';

export const itemID = 'button' as const;
export type ButtonItemID = typeof itemID;

const buttonIconURL = new URL(
  '../../../../assets/link-button.svg',
  import.meta.url
).href;

class ButtonToolPlugin implements ToolPlugin<ButtonItemID, ButtonToolState> {
  public itemID = itemID;
  public getIcon(): ToolIconDescriptor<ButtonItemID> {
    return {
      iconPath: buttonIconURL,
      title: msg('A button tool'),
      itemID,
    };
  }
  public getEditor(): EBButtonToolEditor {
    return document.createElement('eb-button-tool-editor');
  }
  public createStateNode(state = DEFAULT_STATE): ButtonStateNode {
    const viewer = document.createElement('eb-button-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<ButtonToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
  public getMJMLCSSGenerator(): ButtonMJMLCSSGenerator {
    return new ButtonMJMLCSSGenerator();
  }
}
export const buttonToolPlugin = new ButtonToolPlugin();
