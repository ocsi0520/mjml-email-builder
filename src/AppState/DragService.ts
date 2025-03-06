import { ToolIconDescriptor } from '../ToolPlugin/ToolIconDescriptor';
import { singletonInstance } from '../common/utils/class.util';
import { StateNode } from './StateNode/StateNode';

export class DragService {
  public static getInstance = singletonInstance(this);
  public draggedIcon: ToolIconDescriptor<string> | null = null;
  public draggedStateNode: StateNode | null = null;
  public get draggedItem(): StateNode | ToolIconDescriptor<string> | null {
    return this.draggedIcon || this.draggedStateNode;
  }
}
