import { LitElement, html, css, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { commonSettingsStyles } from '../../editor-common-fields.style';

@customElement('eb-optional-wrapper-checkbox')
export class EBOptionalWrapperCheckbox extends LitElement {
  public static styles = [
    commonSettingsStyles,
    css`
      label {
        color: white;
      }
      .toggle-switch {
        display: inline-block;
        background: #514f68;
        border-radius: 16px;
        width: 58px;
        height: 32px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
      }
      .toggle-switch:before,
      .toggle-switch:after {
        content: '';
      }
      .toggle-switch:before {
        display: block;
        background: linear-gradient(to bottom, #dec5e5 0%, #eee 100%);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        width: 24px;
        height: 24px;
        position: absolute;
        top: 4px;
        left: 4px;
        transition: left 0.25s;
      }
      .toggle:hover .toggle-switch:before {
        background: linear-gradient(to bottom, #edc8f8, #fff 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      }
      .toggle-checkbox:checked + .toggle-switch {
        background: #6e64d9;
      }
      .toggle-checkbox:checked + .toggle-switch:before {
        left: 30px;
      }
      .toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }
    `,
  ];
  @property({ type: Boolean })
  public checked: boolean = false;
  @property()
  public label!: string;
  protected render(): TemplateResult {
    return html`<div>
      <div class="setting-title">
        <label>
          ${this.label}
          <input
            class="toggle-checkbox"
            @change=${this.handleChange}
            type="checkbox"
            .checked=${this.checked}
          />
          <div class="toggle-switch"></div>
        </label>
      </div>
      <slot></slot>
    </div>`;
  }
  private handleChange = (): void => {
    const event = new Event('change', {
      bubbles: false,
      cancelable: true,
      composed: false,
    });
    this.dispatchEvent(event);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-optional-wrapper-checkbox': EBOptionalWrapperCheckbox;
  }
}
