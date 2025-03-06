import { CommandManager } from '../../../command/CommandManager';
import { EBRoot } from '../../../eb-root';
import { View } from '../../../views';
import { ToolbarEmailBuilderEventMap } from '../../toolbar.event';
import { EBEventHandler } from '../EBEventHandler';
import { EventNamesByListeners } from '../EmailEventListener';

export class ToolbarEventHandler implements EBEventHandler {
  constructor(
    private ebRoot: EBRoot,
    private commandManager = CommandManager.getInstance()
  ) {}
  public getEventListeners(): EventNamesByListeners<ToolbarEmailBuilderEventMap> {
    return {
      preview: this.handlePreview,
      'exit-preview': this.handleExitPreview,
      undo: this.handleUndo,
      redo: this.handleRedo,
    };
  }
  private handlePreview = (ev: CustomEvent<View>): void => {
    this.ebRoot.previewState = ev.detail;
  };
  private handleExitPreview = (): void => {
    this.ebRoot.previewState = 'none';
  };
  private handleUndo = (): void => {
    this.commandManager.undoLast();
    this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
  };
  private handleRedo = (): void => {
    this.commandManager.reapplyPrevious();
    this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
  };
}
