import { customAlphabet } from 'nanoid';
import { StateEditor } from '../EBItem/StateEditor';
import { BasicState } from '../State/BasicState';
import { BasicViewerComponent } from './Basic/BasicViewerComponent';
import { AnyContainerStateNode } from './ContainerStateNode';

const generateUniqueId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 24);

export class StateNode<
  State extends BasicState = BasicState,
  Component extends BasicViewerComponent<State> = BasicViewerComponent<State>,
  ItemID extends string = string
> {
  public parent: AnyContainerStateNode | null = null;
  public editor: StateEditor<State> | null = null;
  // eslint-disable-next-line max-params
  constructor(
    private _state: State,
    public readonly component: Component,
    public readonly itemID: ItemID,
    /** An identifier for item-specific css rules @see MJMLCSSGenerator any implementation */
    public readonly cssID = generateUniqueId()
  ) {}
  public get state(): State {
    return this._state;
  }
  public set state(newState: State) {
    this._state = newState;
    this.component.requestUpdate();
    this.editor?.requestUpdate();
  }
  public getIndexInParent(): number | null {
    return this.parent?.children.findIndex((child) => child === this) ?? null;
  }
}
