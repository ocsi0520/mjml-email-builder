import { singletonInstance } from '../../../common/utils/class.util';
import { EBItem } from '../../EBItem/EBItem';
import { Serializable } from '../../EBItem/Serializable';
import { BasicState } from '../../State/BasicState';
import { StateNode } from '../../StateNode/StateNode';
import { AppVisitorRegister, BasicVisitor } from './AppVisitorRegister';

export class AppCompressorRegister extends AppVisitorRegister<
  Serializable,
  StateNode
> {
  public static getInstance = singletonInstance(this);
  protected visitorName: string = 'Compressor';
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => BasicVisitor<Serializable, StateNode> {
    const compressor = item.getCompressor();
    return () => ({
      visit(node, appVisitor): Serializable {
        return compressor.compress(node, appVisitor);
      },
    });
  }
}
