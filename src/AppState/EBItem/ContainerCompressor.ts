import { StateNodeCompressor } from './StateNodeCompressor';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { BasicContainerComponent } from '../StateNode/Basic/BasicContainerComponent';
import { BasicState } from '../State/BasicState';
import { ContainerStateNode } from '../StateNode/ContainerStateNode';
import { StateNode } from '../StateNode/StateNode';
import { Serializable } from './Serializable';
import { AppVisitorRegister } from '../Register/Visitor/AppVisitorRegister';

export abstract class ContainerCompressor<
  ItemID extends string,
  State extends BasicState
> implements StateNodeCompressor<State>
{
  constructor(public readonly itemID: ItemID) {}
  public compress(
    stateNode: ContainerStateNode<
      State,
      BasicContainerComponent<State, StateNode, ItemID>
    >,
    appCompressor: AppVisitorRegister<Serializable, StateNode>
  ): Serializable {
    const compressedChildren = stateNode.children.map((child) =>
      appCompressor.visitNode(child)
    );
    return {
      itemID: stateNode.itemID,
      children: compressedChildren,
      state: stateNode.state,
    };
  }
  public decompress(
    { itemID, state, children }: Serializable,
    appDecompressor: AppVisitorRegister<StateNode, Serializable>
  ): ContainerStateNode<
    State,
    BasicContainerComponent<State, StateNode, ItemID>
  > {
    if (itemID !== this.itemID)
      throw new Error(`Incorrect itemID for '${this.itemID}', got '${itemID}'`);
    const decompressedStateNode = this.getDecompressedStateNodeWithoutChildren(
      state as State
    );
    const allDecompressedChildren = this.getDecompressedChildren(
      children!,
      appDecompressor
    );
    for (const child of allDecompressedChildren)
      decompressedStateNode.addStateNode(child);
    return decompressedStateNode;
  }
  private getDecompressedStateNodeWithoutChildren(
    readState: State
  ): ContainerStateNode<
    State,
    BasicContainerComponent<State, StateNode, ItemID>
  > {
    const element = this.createViewer();
    const deCompressedStateNode = this.createSpecificStateNode(
      readState,
      element
    );
    element.stateNode = deCompressedStateNode;
    return deCompressedStateNode;
  }
  private getDecompressedChildren(
    compressedChildren: Array<Serializable>,
    appDecompressor: AppVisitorRegister<StateNode, Serializable>
  ): Array<StateNode> {
    return compressedChildren.map((compressedChild) =>
      appDecompressor.visitNode(compressedChild)
    );
  }
  protected abstract createViewer(): BasicViewerComponent<State>;
  protected abstract createSpecificStateNode(
    readState: State,
    element: BasicViewerComponent<State>
  ): ContainerStateNode<
    State,
    BasicContainerComponent<State, StateNode, ItemID>
  >;
}
