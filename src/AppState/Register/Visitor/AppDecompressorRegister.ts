import { singletonInstance } from '../../../common/utils/class.util';
import { EBItem } from '../../EBItem/EBItem';
import { Serializable } from '../../EBItem/Serializable';
import { BasicState } from '../../State/BasicState';
import { StateNode } from '../../StateNode/StateNode';
import { AppVisitorRegister, BasicVisitor } from './AppVisitorRegister';

export class AppDecompressorRegister extends AppVisitorRegister<
  StateNode,
  Serializable
> {
  public static getInstance = singletonInstance(this);
  protected visitorName: string = 'Compressor';
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => BasicVisitor<StateNode, Serializable> {
    const compressor = item.getCompressor();
    return () => ({
      visit(node, appVisitor): StateNode {
        return compressor.decompress(node, appVisitor);
      },
    });
  }
}
