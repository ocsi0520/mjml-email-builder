import { BlockType } from '../AppState/BuiltInItem/Block/BlockState';
import { BasicState } from '../AppState/State/BasicState';
import { AnyContainerStateNode } from '../AppState/StateNode/ContainerStateNode';
import { StateNode } from '../AppState/StateNode/StateNode';
import { CommandEmailBuilderEventMap } from './command.event';

export type DropData = {
  containerStateNode: AnyContainerStateNode;
  mouseEventY: number;
};

export interface CanvasEmailBuilderEventMap
  extends CommandEmailBuilderEventMap {
  'node-selected': CustomEvent<StateNode>;
  'clear-selection': CustomEvent<StateNode | null>;
  'node-state-changed': CustomEvent<BasicState>;
  'new-block': CustomEvent<BlockType>;
  'state-node-drag-start': CustomEvent<StateNode>;
  'state-node-drag-stop': CustomEvent<StateNode>;
  'state-node-drop-zone': CustomEvent<DropData>;
  'delete-state-node': CustomEvent<StateNode>;
  'node-hovered': CustomEvent<StateNode>;
  'copy-state-node': CustomEvent<StateNode>;
}
