import { singletonInstance } from '../../common/utils/class.util';
import { EBItem } from '../EBItem/EBItem';
import { EBItemRegister } from './EBItemRegister';
import { BasicState } from '../State/BasicState';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../StateNode/StateNode';

type StateNodeCreator = () => StateNode<
  BasicState,
  BasicViewerComponent<BasicState>
>;
export class StateNodeFactory extends EBItemRegister<StateNodeCreator> {
  public static getInstance = singletonInstance(this);
  public createStateNodeBy(itemID: string): StateNode | null {
    return this.getAssignedValueFor(itemID)?.() || null;
  }
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): StateNodeCreator {
    return item.createStateNode;
  }
}
