import { LitElement, html, css, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ToolIconDescriptor } from '../../../ToolPlugin/ToolIconDescriptor';
import { dispatchEBEvent } from '../../../events/app.event';

@customElement('eb-tool-icon')
export class EBToolIcon extends LitElement {
  public static styles = css`
    .tool-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: grab;
      border: 2px solid var(--grey-light);
      margin: 10px;
      border-radius: 5px;
      width: 100px;
      height: 100px;
      transition: all 0.2s ease-in-out;
      padding-top: 5px;
      font-size: 15px;
    }
    @media (min-width: 1600px) {
      .tool-icon {
        width: 110px;
        height: 110px;
      }
    }
    @media (min-width: 1800px) {
      .tool-icon {
        width: 130px;
        height: 130px;
      }
    }
    @media (min-width: 2000px) {
      .tool-icon {
        width: 150px;
        height: 150px;
      }
    }
    @media (min-width: 2200px) {
      .tool-icon {
        width: 170px;
        height: 170px;
      }
    }

    .tool-icon:hover {
      box-shadow: 0 0 3px #ededed;
      transform: scale(1.1);
      background-color: var(--violet-light);
      -webkit-box-shadow: 0 0 3px #ededed;
    }
    .tool-icon img {
      width: 50%;
      height: 50%;
    }
    .tool-icon > div {
      text-align: center;
      color: var(--white);
    }
  `;
  @property({ attribute: false })
  public descriptor!: ToolIconDescriptor<string>;
  protected render(): TemplateResult {
    return html`
      <div
        draggable="true"
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
        class="tool-icon"
      >
        <img
          draggable="false"
          alt=${this.descriptor.title}
          src=${this.descriptor.iconPath}
        />
        <div>${this.descriptor.title}</div>
      </div>
    `;
  }
  private handleDragStart = (): void => {
    dispatchEBEvent(this, 'icon-drag-start', this.descriptor);
  };
  private handleDragEnd = (): void => {
    dispatchEBEvent(this, 'icon-drag-stop', this.descriptor);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-tool-icon': EBToolIcon;
  }
}
