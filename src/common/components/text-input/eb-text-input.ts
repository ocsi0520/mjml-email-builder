import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import {
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../editor-common-fields.style';

export type TextInputChangeEvent = CustomEvent<string>;

@localized()
@customElement('eb-text-input')
export class EBTextInput extends LitElement {
  public static styles = [
    commonSettingsStyles,
    commonInputComponentStyle,
    css`
      textarea {
        font-size: 16px;
        width: 97%;
        background-color: var(--black);
        color: var(--white);
        border: 2px solid var(--grey-medium);
        border-radius: 5px;
        outline: none;
        resize: none;
      }
      div {
        padding: 5px 5px var(--sidepanel-side-padding);
      }
    `,
  ];
  @property()
  public value!: string;
  @property()
  public label?: string;
  @property()
  public placeholder!: string;
  @property()
  public isTextArea?: string | undefined;
  protected render(): TemplateResult {
    return html`
      <div class="setting-container setting-item">
        ${this.label ? html`<label>${this.label}</label>` : nothing}
        ${this.isTextArea
          ? html`<textarea
              rows="5"
              type="text"
              .value=${this.value}
              @change=${this.handleTextChange}
              .placeholder=${this.placeholder}
            ></textarea>`
          : html`<input
              type="text"
              .value=${this.value}
              @change=${this.handleTextChange}
            />`}
      </div>
    `;
  }
  private handleTextChange(nativeEvent: Event): void {
    const newValue = (nativeEvent.target as HTMLInputElement).value;
    const event: CustomEvent<string> = new CustomEvent('change', {
      bubbles: false,
      composed: false,
      detail: newValue,
    });
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-text-input': EBTextInput;
  }
}
