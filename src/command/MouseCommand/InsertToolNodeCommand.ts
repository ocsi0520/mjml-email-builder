import { StateNode } from '../../AppState/StateNode/StateNode';
import { StateNodeFactory } from '../../AppState/Register/StateNodeFactory';
import { DropData } from '../../events/canvas.event';
import { MouseContainerCommand } from './MouseContainerCommand';
import { dispatchEBEvent } from '../../events/app.event';

export class InsertToolNodeCommand extends MouseContainerCommand {
  private createdToolStateNode: StateNode | null = null;
  private insertAt: number;
  constructor(
    protected dropData: DropData,
    private itemID: string,
    stateNodeFactory = StateNodeFactory.getInstance()
  ) {
    super();
    this.createdToolStateNode = stateNodeFactory.createStateNodeBy(this.itemID);
    this.insertAt = this.getInsertAt();
  }
  public isExecutable(): boolean {
    return (
      this.createdToolStateNode !== null &&
      this.dropData.containerStateNode.isInsertable(this.createdToolStateNode)
    );
  }
  public execute(): void {
    this.dropData.containerStateNode.addStateNode(
      this.createdToolStateNode!,
      this.insertAt
    );
    dispatchEBEvent(
      this.dropData.containerStateNode!.component,
      'node-selected',
      this.createdToolStateNode!
    );
  }
  public undo(): void {
    dispatchEBEvent(
      this.createdToolStateNode!.component,
      'clear-selection',
      this.createdToolStateNode!
    );
    this.dropData.containerStateNode.removeStateNode(
      this.createdToolStateNode!
    );
  }
}
