import { LitElement } from 'lit';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../StateNode/StateNode';
import { dispatchEBEvent } from '../../events/app.event';

export abstract class SelectableViewerLit<SN extends StateNode>
  extends LitElement
  implements BasicViewerComponent<SN['state']>
{
  public stateNode!: SN;
  protected isHoverable = true;
  public connectedCallback(): void {
    super.connectedCallback();
    if (this.isHoverable)
      this.addEventListener('mouseenter', this.dispatchHoverEvent);
    this.addEventListener('click', this.selectThisNode);
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.isHoverable)
      this.removeEventListener('mouseenter', this.dispatchHoverEvent);
    this.removeEventListener('click', this.selectThisNode);
  }
  protected dispatchHoverEvent = (): void =>
    dispatchEBEvent(this, 'node-hovered', this.stateNode);
  private selectThisNode = (ev: MouseEvent): void => {
    ev.stopPropagation();
    dispatchEBEvent(this, 'node-selected', this.stateNode);
  };
}
