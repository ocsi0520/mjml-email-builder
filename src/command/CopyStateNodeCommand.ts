import { CanvasStateNode } from '../AppState/BuiltInItem/Canvas/CanvasStateNode';
import { SlotStateNode } from '../AppState/BuiltInItem/Slot/SlotStateNode';
import { ItemCopierVisitorRegister } from '../AppState/Register/Visitor/ItemCopierVisitorRegister';
import { StateNode } from '../AppState/StateNode/StateNode';
import { RevertableCommand } from './RevertableCommand';

export class CopyStateNodeCommand implements RevertableCommand {
  private copiedStateNode: StateNode | null = null;
  constructor(
    private originalStateNode: StateNode,
    private copier = ItemCopierVisitorRegister.getInstance()
  ) {}
  public execute(): void {
    if (!this.copiedStateNode)
      this.copiedStateNode = this.copier.visitNode(this.originalStateNode);
    const indexOfOriginalSN = this.originalStateNode.getIndexInParent()!;
    this.originalStateNode.parent!.addStateNode(
      this.copiedStateNode,
      indexOfOriginalSN + 1
    );
  }
  public undo(): void {
    this.originalStateNode.parent!.removeStateNode(this.copiedStateNode!);
  }
  public isExecutable(): boolean {
    const isCanvas = this.originalStateNode instanceof CanvasStateNode;
    const isSlot = this.originalStateNode instanceof SlotStateNode;
    return !isCanvas && !isSlot;
  }
}
