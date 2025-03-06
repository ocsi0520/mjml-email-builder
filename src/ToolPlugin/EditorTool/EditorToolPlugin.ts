import { msg } from '@lit/localize';
import { GeneralLeafNodeCompressor } from '../../AppState/EBItem/GeneralLeafNodeCompressor';
import { StateEditor } from '../../AppState/EBItem/StateEditor';
import { StateNodeCompressor } from '../../AppState/EBItem/StateNodeCompressor';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { ToolIconDescriptor } from '../ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin';
import { EditorStateNode } from './EditorStateNode';
import { DEFAULT_STATE, EditorToolState } from './EditorToolState';
import './eb-editor-tool-editor';
import './eb-editor-tool-viewer';
import { EditorMJMLCSSGenerator } from './EditorMJMLCSSGenerator';

export const itemID = 'editor-tool' as const;
export type EditorItemID = typeof itemID;

const editorIconURL = new URL('../../../../assets/text.svg', import.meta.url)
  .href;

class EditorToolPlugin implements ToolPlugin<EditorItemID, EditorToolState> {
  public itemID = itemID;
  public getIcon(): ToolIconDescriptor<'editor-tool'> {
    return {
      iconPath: editorIconURL,
      title: msg('An HTML editor tool'),
      itemID,
    };
  }
  public getEditor = (): StateEditor<EditorToolState> =>
    document.createElement('eb-editor-tool-editor');
  public getMJMLCSSGenerator(): EditorMJMLCSSGenerator {
    return new EditorMJMLCSSGenerator();
  }
  public createStateNode(
    state: EditorToolState = DEFAULT_STATE
  ): EditorStateNode {
    const viewer = document.createElement('eb-editor-tool-viewer');
    const stateNode = new StateNode(state, viewer, itemID);
    viewer.stateNode = stateNode;
    return stateNode;
  }
  public getCompressor(): StateNodeCompressor<EditorToolState> {
    return new GeneralLeafNodeCompressor(
      itemID,
      this.createStateNode.bind(this)
    );
  }
}

export const editorPlugin = new EditorToolPlugin();
