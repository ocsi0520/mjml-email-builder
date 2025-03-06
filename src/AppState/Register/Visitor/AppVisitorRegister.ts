import { EBItem } from '../../EBItem/EBItem';
import { EBItemRegister } from '../EBItemRegister';

export type itemIDOwner = {
  itemID: EBItem['itemID'];
};

export interface BasicVisitor<VisitResult, NodeType extends itemIDOwner> {
  visit(
    node: NodeType,
    // eslint-disable-next-line no-use-before-define
    appVisitor: AppVisitorRegister<VisitResult, NodeType>
  ): VisitResult;
}
export abstract class AppVisitorRegister<
  VisitResult,
  NodeType extends itemIDOwner
> extends EBItemRegister<() => BasicVisitor<VisitResult, NodeType>> {
  protected abstract readonly visitorName: string;
  public visitNode(node: NodeType): VisitResult {
    const visitorGetter = this.getAssignedValueFor(node.itemID);
    if (!visitorGetter)
      throw new Error(
        `No ${this.visitorName} visitor found for item: ${node.itemID}`
      );
    const visitor = visitorGetter();
    return visitor.visit(node, this);
  }
}
