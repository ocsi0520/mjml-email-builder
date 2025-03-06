import { CanvasStateNode } from '../../AppState/BuiltInItem/Canvas/CanvasStateNode';
import { SlotStateNode } from '../../AppState/BuiltInItem/Slot/SlotStateNode';
import { AnyContainerStateNode } from '../../AppState/StateNode/ContainerStateNode';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { DropData } from '../../events/canvas.event';
import { MouseContainerCommand } from './MouseContainerCommand';

export class MoveStateNodeCommand extends MouseContainerCommand {
  private oldParent: AnyContainerStateNode;
  private oldIndex: number;
  private insertAt: number;
  constructor(
    private stateNodeToMove: StateNode,
    protected dropData: DropData
  ) {
    super();
    this.oldParent = this.stateNodeToMove.parent!;
    this.oldIndex = this.stateNodeToMove.getIndexInParent()!;
    this.insertAt = this.getInsertAt(this.stateNodeToMove);
  }
  public execute(): void {
    this.oldParent.removeStateNode(this.stateNodeToMove);
    this.dropData.containerStateNode.addStateNode(
      this.stateNodeToMove,
      this.insertAt
    );
  }
  public undo(): void {
    this.dropData.containerStateNode.removeStateNode(this.stateNodeToMove);
    this.oldParent.addStateNode(this.stateNodeToMove, this.oldIndex);
  }
  public isExecutable(): boolean {
    const isNonMovableSN =
      this.stateNodeToMove instanceof SlotStateNode ||
      this.stateNodeToMove instanceof CanvasStateNode;
    const isOldAndNewPlaceTheSame =
      this.oldParent === this.dropData.containerStateNode &&
      this.oldIndex === this.insertAt;
    const isInsertable = this.dropData.containerStateNode.isInsertable(
      this.stateNodeToMove
    );
    return !isNonMovableSN && !isOldAndNewPlaceTheSame && isInsertable;
  }
}
