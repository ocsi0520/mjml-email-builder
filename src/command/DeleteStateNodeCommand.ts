import { CanvasStateNode } from '../AppState/BuiltInItem/Canvas/CanvasStateNode';
import { SlotStateNode } from '../AppState/BuiltInItem/Slot/SlotStateNode';
import { AnyContainerStateNode } from '../AppState/StateNode/ContainerStateNode';
import { StateNode } from '../AppState/StateNode/StateNode';
import { dispatchEBEvent } from '../events/app.event';
import { RevertableCommand } from './RevertableCommand';

export class DeleteStateNodeCommand implements RevertableCommand {
  private oldParent: AnyContainerStateNode | null;
  private oldIndex: number | null;
  constructor(private stateNode: StateNode) {
    this.oldParent = stateNode.parent;
    this.oldIndex = this.stateNode.getIndexInParent();
  }
  public isExecutable(): boolean {
    const parentExists = this.oldParent !== null && this.oldIndex !== null;
    const isNonDeletableSN =
      this.stateNode instanceof SlotStateNode ||
      this.stateNode instanceof CanvasStateNode;
    return parentExists && !isNonDeletableSN;
  }
  public execute(): void {
    dispatchEBEvent(
      this.stateNode.component,
      'clear-selection',
      this.stateNode
    );
    this.oldParent!.removeStateNode(this.stateNode);
  }
  public undo(): void {
    this.oldParent!.addStateNode(this.stateNode, this.oldIndex!);
    dispatchEBEvent(this.oldParent!.component, 'node-selected', this.stateNode);
  }
}
