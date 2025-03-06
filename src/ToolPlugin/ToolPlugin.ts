import { BasicState } from '../AppState/State/BasicState';
import { ToolIconDescriptor } from './ToolIconDescriptor';
import { EBItem } from '../AppState/EBItem/EBItem';

export interface ToolPlugin<
  itemID extends string = string,
  State extends BasicState = BasicState
> extends EBItem<itemID, State> {
  getIcon: () => ToolIconDescriptor<itemID>;
}
