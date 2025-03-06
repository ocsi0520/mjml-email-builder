import { View } from '../views';
import { CommandEmailBuilderEventMap } from './command.event';

export interface ToolbarEmailBuilderEventMap
  extends CommandEmailBuilderEventMap {
  preview: CustomEvent<View>;
  'exit-preview': CustomEvent<null>;
}
