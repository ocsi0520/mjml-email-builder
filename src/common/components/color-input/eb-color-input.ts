import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  setAssetPath,
  CalciteColorPickerCustomEvent,
} from '@esri/calcite-components/dist/components';
import '@esri/calcite-components/dist/components/calcite-color-picker';
import {
  commonInputComponentStyle,
  commonFieldStyles,
  commonSettingsStyles,
} from '../../editor-common-fields.style';

setAssetPath(
  'https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets'
);

export type ColorInputChangeEvent = CustomEvent<string>;
// TODO: integrate this into components where we use custom color pickers
@customElement('eb-color-input')
export class EBColorInput extends LitElement {
  // TODO: the style is different from the previous color pickers
  public static styles = [
    commonFieldStyles,
    commonInputComponentStyle,
    commonSettingsStyles,
    css`
      div {
        font-size: 13px;
      }
      label {
        display: block;
      }
    `,
  ];
  @property()
  public label!: string;
  @property()
  public value!: string;
  protected render(): TemplateResult {
    return html`
      <div class="setting-container">
        <label>${this.label}</label>
        <calcite-color-picker
          .alphaChannel=${true}
          .channelsDisabled=${true}
          .hexDisabled=${false}
          .savedDisabled=${true}
          .value=${this.value}
          @calciteColorPickerChange=${this.onChangeColor}
        ></calcite-color-picker>
      </div>
    `;
  }
  private onChangeColor = ({
    target,
  }: CalciteColorPickerCustomEvent<void>): void => {
    const newValue = target.value as string;
    const colorChangeEvent: ColorInputChangeEvent = new CustomEvent('change', {
      bubbles: false,
      cancelable: true,
      composed: false,
      detail: newValue,
    });
    this.dispatchEvent(colorChangeEvent);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-color-input': EBColorInput;
  }
}
