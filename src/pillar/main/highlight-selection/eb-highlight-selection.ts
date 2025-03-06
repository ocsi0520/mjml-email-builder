import {
  LitElement,
  PropertyValueMap,
  TemplateResult,
  css,
  html,
  nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { dispatchEBEvent } from '../../../events/app.event';
import { StateNode } from '../../../AppState/StateNode/StateNode';
import { upperBarCSS } from '../../../common/upper-bar.style';
import { SlotStateNode } from '../../../AppState/BuiltInItem/Slot/SlotStateNode';
import { BlockStateNode } from '../../../AppState/BuiltInItem/Block/BlockStateNode';

const plusIconURL = new URL('../../../../../assets/plus.svg', import.meta.url)
  .href;
const sixDotsIconURL = new URL(
  '../../../../../assets/six-dots.svg',
  import.meta.url
).href;
const crossIconURL = new URL('../../../../../assets/cross.svg', import.meta.url)
  .href;

type HighlightRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

@customElement('eb-highlight-selection')
export class EBHighlightSelection extends LitElement {
  public static styles = [
    upperBarCSS,
    css`
      :host {
        z-index: var(--z-index-highlight, 1);
      }
      div.highlight-root {
        position: absolute;
        border: 2px solid var(--highlight-color);
        pointer-events: none;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      div.highlight-root.position-for-block {
        justify-content: flex-end;
      }
      div.icons > img:nth-of-type(2) {
        cursor: grab;
      }
      div.upper-bar {
        transform: translate(8px, -100%);
      }
      div.upper-bar > div {
        display: inline-block;
      }
      .pale {
        opacity: 0.5;
      }
    `,
  ];
  @property({ attribute: false, reflect: false })
  public selectedStateNode: StateNode | null = null;
  @property({ type: Boolean })
  public pale: boolean = false;
  private observer = new ResizeObserver(() => {
    this.requestUpdate();
  });
  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (!changedProperties.has('selectedStateNode')) return;
    const oldStateNode = changedProperties.get('selectedStateNode');
    if (oldStateNode) this.observer.unobserve(oldStateNode.component);
    if (this.selectedStateNode)
      this.observer.observe(this.selectedStateNode.component);
  }
  protected render(): TemplateResult | typeof nothing {
    if (!this.selectedStateNode) return nothing;
    const clientRect = this.getHighlightRectFrom(
      this.selectedStateNode.component
    );
    const isSlot = this.selectedStateNode instanceof SlotStateNode;
    const isBlock = this.selectedStateNode instanceof BlockStateNode;
    return html`<div
      class=${classMap({
        'highlight-root': true,
        'position-for-block': isBlock,
        pale: this.pale,
      })}
      style=${styleMap(this.getPositionStyleFrom(clientRect))}
    >
      ${isSlot ? nothing : this.renderUpperBar()}
    </div>`;
  }
  private renderUpperBar(): TemplateResult {
    return html`<div class="upper-bar">
      <div class="edge left-edge"></div>
      ${this.renderIcons()}
      <div class="edge right-edge"></div>
    </div>`;
  }
  private renderIcons(): TemplateResult {
    return html`<div class="icons">
      <img @click=${this.copyElement} alt="copy item" src="${plusIconURL}" />
      <img
        @dragstart=${this.dragStart}
        @dragend=${this.dragEnd}
        @click=${this.selectElement}
        ?draggable=${true}
        alt="move item"
        src="${sixDotsIconURL}"
      />
      <img
        @click=${this.deleteElement}
        alt="delete item"
        src="${crossIconURL}"
      />
    </div>`;
  }
  private selectElement = (): void => {
    dispatchEBEvent(this, 'node-selected', this.selectedStateNode!);
  };
  private copyElement = (): void => {
    dispatchEBEvent(this, 'copy-state-node', this.selectedStateNode!);
  };
  private deleteElement = (): void => {
    dispatchEBEvent(this, 'delete-state-node', this.selectedStateNode!);
  };
  private dragStart = (): void => {
    dispatchEBEvent(this, 'state-node-drag-start', this.selectedStateNode!);
  };
  private dragEnd = (): void => {
    dispatchEBEvent(this, 'state-node-drag-stop', this.selectedStateNode!);
  };
  private getHighlightRectFrom(target: HTMLElement): HighlightRect {
    const domRect = target.getBoundingClientRect();
    return {
      x: domRect.x,
      y: target.offsetTop,
      width: domRect.width,
      height: domRect.height,
    };
  }
  private getPositionStyleFrom({
    x,
    y,
    width,
    height,
  }: HighlightRect): StyleInfo {
    return {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-highlight-selection': EBHighlightSelection;
  }
}
