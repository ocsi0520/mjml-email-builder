import { BasicState } from '../AppState/State/BasicState';
import { BasicViewerComponent } from '../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../AppState/StateNode/StateNode';
import { RevertableCommand } from './RevertableCommand';

// __QUESTION__ do we need to make a deep copy for old state?
export class SetNewStateCommand<State extends BasicState>
  implements RevertableCommand
{
  private oldState: State;
  constructor(
    private stateNode: StateNode<State, BasicViewerComponent<State>>,
    private newState: State
  ) {
    this.oldState = this.stateNode.state;
  }
  public execute(): void {
    this.stateNode.state = this.newState;
  }
  public undo(): void {
    this.stateNode.state = this.oldState;
  }
  public isExecutable(): boolean {
    return true;
  }
}
