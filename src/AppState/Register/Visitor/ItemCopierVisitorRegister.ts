import { singletonInstance } from '../../../common/utils/class.util';
import { EBItem } from '../../EBItem/EBItem';
import { BasicState } from '../../State/BasicState';
import {
  AnyContainerStateNode,
  ContainerStateNode,
} from '../../StateNode/ContainerStateNode';
import { StateNode } from '../../StateNode/StateNode';
import { AppVisitorRegister, BasicVisitor } from './AppVisitorRegister';

export class ItemCopierVisitorRegister extends AppVisitorRegister<
  StateNode,
  StateNode
> {
  public static getInstance = singletonInstance(this);
  protected visitorName: string = 'Copier';
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => BasicVisitor<StateNode, StateNode> {
    return () => ({
      visit: (node, appVisitor): StateNode => {
        const copiedNode = this.getCopyWithoutChildren(node, item);
        const isContainerNode = node instanceof ContainerStateNode;
        if (!isContainerNode) return copiedNode;

        const copiedChildren = this.getCopyOfChildren(node, appVisitor);
        for (const copiedChild of copiedChildren)
          (copiedNode as AnyContainerStateNode).addStateNode(copiedChild);
        return copiedNode;
      },
    });
  }
  private getCopyWithoutChildren(
    node: StateNode,
    item: EBItem<string, BasicState>
  ): StateNode {
    const clonedState = structuredClone(node.state);
    const clonedStateNode = item.createStateNode(clonedState);
    return clonedStateNode;
  }
  private getCopyOfChildren(
    node: AnyContainerStateNode,
    itemCopier: AppVisitorRegister<StateNode, StateNode>
  ): Array<StateNode> {
    return node.children.map((childNode) => itemCopier.visitNode(childNode));
  }
}
