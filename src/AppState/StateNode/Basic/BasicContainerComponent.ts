import { ContainerStateNode } from '../ContainerStateNode';
import { StateNode } from '../StateNode';
import { BasicViewerComponent } from './BasicViewerComponent';
import { BasicState } from '../../State/BasicState';

export interface BasicContainerComponent<
  State extends BasicState,
  ChildStateNode extends StateNode,
  ItemID extends string
> extends BasicViewerComponent<State> {
  stateNode: ContainerStateNode<
    State,
    BasicContainerComponent<State, ChildStateNode, ItemID>,
    ItemID,
    ChildStateNode
  >;
}
