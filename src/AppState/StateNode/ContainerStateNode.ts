import { BasicContainerComponent } from './Basic/BasicContainerComponent';
import { BasicState } from '../State/BasicState';
import { StateNode } from './StateNode';

export abstract class ContainerStateNode<
  State extends BasicState,
  // eslint-disable-next-line no-use-before-define
  Component extends BasicContainerComponent<State, ChildStateNode, ItemID>,
  ItemID extends string = string,
  ChildStateNode extends StateNode = StateNode
> extends StateNode<State, Component, ItemID> {
  private _children: Array<ChildStateNode> = [];
  public get children(): Array<ChildStateNode> {
    return this._children;
  }
  public addStateNode(
    stateNode: ChildStateNode,
    insertAt = this._children.length
  ): boolean {
    if (!this.isInsertable(stateNode)) return false;
    if (stateNode.parent) return false;
    stateNode.parent = this;
    this._children.splice(insertAt, 0, stateNode);
    this.component.requestUpdate();
    return true;
  }
  public removeStateNode(stateNode: ChildStateNode): boolean {
    if (stateNode.parent !== this) return false;
    stateNode.parent = null;
    this._children = this._children.filter((child) => child !== stateNode);
    this.component.requestUpdate();
    return true;
  }
  public abstract isInsertable(stateNode: StateNode): boolean;
}

export type AnyContainerStateNode = ContainerStateNode<
  BasicState,
  BasicContainerComponent<BasicState, StateNode, string>
>;
