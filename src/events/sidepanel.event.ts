import { ToolIconDescriptor } from '../ToolPlugin/ToolIconDescriptor';
import { SidePanelView } from '../pillar/main/sidepanel/SidePanelView';

export interface SidePanelEmailBuilderEventMap {
  'sidepanel-view-change': CustomEvent<SidePanelView>;
  'icon-drag-start': CustomEvent<ToolIconDescriptor<string>>;
  'icon-drag-stop': CustomEvent<ToolIconDescriptor<string>>;
}
