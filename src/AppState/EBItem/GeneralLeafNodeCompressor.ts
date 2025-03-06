import { BasicState } from '../State/BasicState';
import { StateNode } from '../StateNode/StateNode';
import { EBItem } from './EBItem';
import { Serializable, SerializableObject } from './Serializable';
import { StateNodeCompressor } from './StateNodeCompressor';

export class GeneralLeafNodeCompressor<
  ItemID extends string,
  State extends BasicState & SerializableObject
> implements StateNodeCompressor<State>
{
  constructor(
    private itemID: ItemID,
    private createStateNode: EBItem<ItemID, State>['createStateNode']
  ) {}
  public compress(stateNode: StateNode<State>): Serializable {
    return {
      itemID: this.itemID,
      state: stateNode.state,
    };
  }
  public decompress(serializableState: Serializable): StateNode<State> {
    if (serializableState.itemID !== this.itemID)
      throw new Error(
        `Invalid state for '${this.itemID}' tool:\r\n${JSON.stringify(
          serializableState
        )}`
      );
    return this.createStateNode(serializableState.state as State);
  }
}
