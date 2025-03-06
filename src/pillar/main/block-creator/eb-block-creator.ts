import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getValuesOfEnum } from '../../../common/utils/object.util';
import { BlockType } from '../../../AppState/BuiltInItem/Block/BlockState';
import { dispatchEBEvent } from '../../../events/app.event';
import { getSlotDomClassesFor } from '../../../AppState/BuiltInItem/Block/PresentationHelper';

@customElement('eb-block-creator')
export class EBBlockCreator extends LitElement {
  public static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--block-creator-height);
      width: 100%;
    }
    .type-wrapper {
      height: 100%;
      width: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      gap: 4px;
      padding: 0 10px;
    }
    .type-wrapper > div {
      box-sizing: border-box;
      border: 2px solid var(--mallow-light);
      flex: 1 1 auto;
      height: 100%;
    }
    .type-wrapper > div.two-unit {
      flex: 2 2 auto;
    }
    .type-wrapper:hover > div {
      background-color: var(--violet);
    }
    .plus-btn {
      color: var(--violet-light);
      width: 60px;
      height: 60px;
      font-size: 30px;
      font-weight: 900;
      border-radius: 50%;
      border: var(--violet-light) 5px solid;
      background-color: var(--black-transparent);
      transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, Helvetica, sans-serif;
      cursor: pointer;
    }
    .plus-btn:hover {
      box-shadow: var(--violet-light) 0px 0px 5px;
      transition: all 0.2s ease-in-out;
      background-color: var(--violet-light);
      color: white;
    }
  `;
  @state()
  private isSelectorShown = false;
  private allBlockTypes = getValuesOfEnum(BlockType);
  private static getDivsByClasses(
    classes: Array<string>
  ): Array<TemplateResult> {
    return classes.map((divClass) => html`<div class="${divClass}"></div>`);
  }
  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('blur', this.handleBlur);
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('blur', this.handleBlur);
  }
  protected render(): Array<TemplateResult> | TemplateResult {
    return this.isSelectorShown ? this.renderSelector() : this.renderPlusSign();
  }
  private renderSelector(): Array<TemplateResult> {
    return this.allBlockTypes.map(
      (blockType) =>
        html`<div
          class="type-wrapper"
          @click=${this.getNewBlockAdderFor(blockType)}
        >
          ${EBBlockCreator.getDivsByClasses(getSlotDomClassesFor(blockType))}
        </div>`
    );
  }
  private renderPlusSign(): TemplateResult {
    return html`<div
      class="plus-btn"
      @click=${(): void => {
        this.isSelectorShown = true;
      }}
    >
      +
    </div>`;
  }
  private getNewBlockAdderFor =
    (blockType: BlockType): (() => void) =>
    () => {
      this.isSelectorShown = false;
      dispatchEBEvent(this, 'new-block', blockType);
    };
  private handleBlur = (): void => {
    this.isSelectorShown = false;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-block-creator': EBBlockCreator;
  }
}
