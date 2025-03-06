import { DragService } from '../../../AppState/DragService';
import { ToolIconDescriptor } from '../../../ToolPlugin/ToolIconDescriptor';
import { CommandManager } from '../../../command/CommandManager';
import { EBRoot } from '../../../eb-root';
import { SidePanelView } from '../../../pillar/main/sidepanel/SidePanelView';
import { SidePanelEmailBuilderEventMap } from '../../sidepanel.event';
import { EBEventHandler } from '../EBEventHandler';
import { EventNamesByListeners } from '../EmailEventListener';

export class SidePanelEventHandler implements EBEventHandler {
  constructor(
    private ebRoot: EBRoot,
    private commandManager = CommandManager.getInstance(),
    private dragService = DragService.getInstance()
  ) {}
  public getEventListeners(): EventNamesByListeners<SidePanelEmailBuilderEventMap> {
    return {
      'sidepanel-view-change': this.handleSidePanelViewChange,
      'icon-drag-start': this.handleIconDragStart,
      'icon-drag-stop': this.handleIconDragStop,
    };
  }
  private handleSidePanelViewChange = (
    ev: CustomEvent<SidePanelView>
  ): void => {
    this.ebRoot._sidePanelView = ev.detail;
  };
  private handleIconDragStart = (
    ev: CustomEvent<ToolIconDescriptor<string>>
  ): void => {
    this.dragService.draggedIcon = ev.detail;
  };
  private handleIconDragStop = (): void => {
    this.dragService.draggedIcon = null;
  };
}
