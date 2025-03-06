import { TemplateResult, css, html, unsafeCSS } from 'lit';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { BasicState } from '../State/BasicState';
import { StateNode } from '../StateNode/StateNode';
import { BasicContainerComponent } from '../StateNode/Basic/BasicContainerComponent';
import { SelectableViewerLit } from './SelectableViewerLit';
import { ContainerStateNode } from '../StateNode/ContainerStateNode';
import { dispatchEBEvent } from '../../events/app.event';
import { DragService } from '../DragService';
import { getWhereToInsert } from '../../common/utils/childInsertAt';

export const activeContainer = 'active-drop-container';
export const activeDropPlace = 'active';

export abstract class BasicContainerViewerLit<
    State extends BasicState,
    ChildStateNode extends StateNode,
    ItemID extends string
  >
  extends SelectableViewerLit<
    ContainerStateNode<
      State,
      BasicContainerComponent<State, ChildStateNode, ItemID>,
      ItemID,
      ChildStateNode
    >
  >
  implements BasicContainerComponent<State, ChildStateNode, ItemID>
{
  public static stylesForDropPlaceholder = css`
    :host .dragged {
      display: none;
    }
    :host(.${unsafeCSS(activeContainer)})
      .drop-placeholder.${unsafeCSS(activeDropPlace)},
      :host(.${unsafeCSS(activeContainer)})
      *.${unsafeCSS(activeDropPlace)} {
      border-top: 10px solid var(--violet);
    }
  `;
  public dragService = DragService.getInstance();
  private lastPlaceholderRef: Ref<HTMLDivElement> = createRef();
  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dragover', this.dragOverHandler);
    this.addEventListener('drop', this.dropHandler);
    this.addEventListener('dragenter', this.dragenterHandler);
    this.addEventListener('dragleave', this.markAsInactiveDropContainer);
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('dragover', this.dragOverHandler);
    this.removeEventListener('drop', this.dropHandler);
    this.removeEventListener('dragenter', this.dragenterHandler);
    this.removeEventListener('dragleave', this.markAsInactiveDropContainer);
  }
  protected renderChildren(): [...Array<HTMLElement>, TemplateResult] {
    return [
      ...this.stateNode.children.map((child) => child.component),
      this.renderLastDropPlaceholder(),
    ];
  }
  private renderLastDropPlaceholder(): TemplateResult {
    return html`<div
      ${ref(this.lastPlaceholderRef)}
      class="drop-placeholder"
    ></div>`;
  }
  private dragOverHandler = (ev: DragEvent): void => {
    // TODO: in case of performance problem let's put a flag on dragenter
    // and read that one
    if (!this.isInsertableDraggedElement()) return;
    this.highlightDropPlaceholders(ev.y);
    ev.preventDefault();
  };
  private dropHandler = ({ clientY }: DragEvent): void => {
    dispatchEBEvent(this, 'state-node-drop-zone', {
      containerStateNode: this.stateNode,
      mouseEventY: clientY,
    });
    this.clearHighlight();
    this.markAsInactiveDropContainer();
  };
  private dragenterHandler = (): void => {
    if (this.isInsertableDraggedElement()) this.classList.add(activeContainer);
  };
  private markAsInactiveDropContainer = (): void => {
    this.classList.remove(activeContainer);
  };
  private highlightDropPlaceholders(mouseY: number): void {
    const indexOfInsertablePlace = getWhereToInsert(this.stateNode, mouseY);
    this.clearHighlight();
    const stateNodeOfActivePlace =
      this.stateNode.children[indexOfInsertablePlace];
    if (!stateNodeOfActivePlace) {
      this.lastPlaceholderRef.value?.classList.add(activeDropPlace);
    } else {
      stateNodeOfActivePlace.component.classList.add(activeDropPlace);
    }
  }
  private clearHighlight(): void {
    this.stateNode.children.forEach((childSN) => {
      childSN.component.classList.remove(activeDropPlace);
    });
    this.lastPlaceholderRef.value?.classList.remove(activeDropPlace);
  }
  protected abstract isInsertableDraggedElement(): boolean;
}
