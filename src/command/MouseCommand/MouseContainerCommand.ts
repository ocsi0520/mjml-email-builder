import { StateNode } from '../../AppState/StateNode/StateNode';
import { getWhereToInsert } from '../../common/utils/childInsertAt';
import { DropData } from '../../events/canvas.event';
import { RevertableCommand } from '../RevertableCommand';

export abstract class MouseContainerCommand implements RevertableCommand {
  protected abstract dropData: DropData;
  public getInsertAt(excludedStateNode?: StateNode): number {
    // __QUESTION__ where to put this command
    return getWhereToInsert(
      this.dropData.containerStateNode,
      this.dropData.mouseEventY,
      excludedStateNode
    );
  }
  public abstract execute(): void;
  public abstract undo(): void;
  public abstract isExecutable(): boolean;
}
