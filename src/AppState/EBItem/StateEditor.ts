import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { BasicState } from '../State/BasicState';

export interface StateEditor<State extends BasicState>
  extends HTMLElement,
    BasicViewerComponent<State> {
  dispatchNewState(state: State): void;
}
