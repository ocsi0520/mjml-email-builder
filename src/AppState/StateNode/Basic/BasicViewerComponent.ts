import { StateNode } from '../StateNode';
import { BasicState } from '../../State/BasicState';

export interface BasicViewerComponent<State extends BasicState>
  extends HTMLElement {
  stateNode: StateNode<State, BasicViewerComponent<State>>;
  requestUpdate(): void;
}
