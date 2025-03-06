import { RevertableCommand } from './RevertableCommand';
import { singletonInstance } from '../common/utils/class.util';

export type CommandManagerState = {
  hasUndoable: boolean;
  hasRedoable: boolean;
};

export class CommandManager {
  public static getInstance = singletonInstance(this);
  private commandList: Array<RevertableCommand> = [];
  private indexOfLastAppliedCommand = -1;
  public getCurrentState(): CommandManagerState {
    return {
      hasUndoable: this.indexOfLastAppliedCommand > -1,
      hasRedoable: this.indexOfLastAppliedCommand < this.commandList.length - 1,
    };
  }
  public apply(command: RevertableCommand): void {
    command.execute();
    this.removeRevertedCommands();
    this.commandList.push(command);
    this.indexOfLastAppliedCommand++;
  }
  public undoLast(): void {
    if (this.indexOfLastAppliedCommand === -1) return;

    const lastCommand = this.commandList[this.indexOfLastAppliedCommand];
    lastCommand.undo();
    this.indexOfLastAppliedCommand--;
  }
  public reapplyPrevious(): void {
    const nextCommandInList =
      this.commandList[this.indexOfLastAppliedCommand + 1];
    if (!nextCommandInList) return;
    nextCommandInList.execute();
    this.indexOfLastAppliedCommand++;
  }
  public clearCommandList(): void {
    this.commandList = [];
    this.indexOfLastAppliedCommand = -1;
  }
  private removeRevertedCommands(): void {
    const areThereRevertedCommands =
      this.indexOfLastAppliedCommand !== this.commandList.length - 1;
    if (!areThereRevertedCommands) return;

    this.commandList.splice(this.indexOfLastAppliedCommand + 1);
  }
}
