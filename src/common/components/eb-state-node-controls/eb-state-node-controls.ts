import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StateNode } from '../../../AppState/StateNode/StateNode';
import { dispatchEBEvent } from '../../../events/app.event';

const deleteIcon = new URL(
  '../../../../../assets/trash-solid.svg',
  import.meta.url
).href;

const copyIcon = new URL(
  '../../../../../assets/copy-solid.svg',
  import.meta.url
).href;

const closeIcon = new URL(
  '../../../../../assets/xmark-solid.svg',
  import.meta.url
).href;

@customElement('eb-state-node-controls')
export class EBStateNodeControls extends LitElement {
  public static styles = css`
    .wrapper {
      display: flex;
      height: 100%;
    }
    .control {
      border-left: 1px solid var(--grey-medium);
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
    }
    .control:hover {
      background-color: var(--violet);
    }
    img {
      width: 15px;
      height: 15px;
    }
  `;
  @property({ attribute: false })
  public stateNode!: StateNode;
  protected render(): TemplateResult {
    return html`
      <div class="wrapper">
        <div class="control">
          <img alt="delete" @click=${this.deleteElement} src=${deleteIcon} />
        </div>
        <div class="control">
          <img alt="copy" @click=${this.copyElement} src=${copyIcon} />
        </div>
        <div class="control">
          <img alt="close" @click=${this.closeEditor} src=${closeIcon} />
        </div>
      </div>
    `;
  }
  private deleteElement = (): void => {
    dispatchEBEvent(this, 'delete-state-node', this.stateNode);
  };
  private copyElement = (): void => {
    dispatchEBEvent(this, 'copy-state-node', this.stateNode);
  };
  private closeEditor = (): void => {
    dispatchEBEvent(this, 'sidepanel-view-change', 'tools');
  };
}
declare global {
  interface HTMLElementTagNameMap {
    'eb-state-node-controls': EBStateNodeControls;
  }
}
