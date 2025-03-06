import { singletonInstance } from '../../common/utils/class.util';
import { EBItem } from '../EBItem/EBItem';
import { StateEditor } from '../EBItem/StateEditor';
import { EBItemRegister } from './EBItemRegister';
import { BasicState } from '../State/BasicState';
import { StateNode } from '../StateNode/StateNode';

export class StateEditorFactory extends EBItemRegister<EBItem['getEditor']> {
  public static getInstance = singletonInstance(this);
  // TODO: handle in case no editor is registered with itemID
  public getEditorFor(stateNode: StateNode): StateEditor<BasicState> {
    const editor = this.getAssignedValueFor(stateNode.itemID)!();
    editor.stateNode = stateNode;
    return editor;
  }
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => StateEditor<BasicState> {
    return item.getEditor;
  }
}
