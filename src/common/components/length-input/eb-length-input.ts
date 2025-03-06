import { LitElement, html, TemplateResult, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { property, customElement } from 'lit/decorators.js';
import { Length, LengthInputChangeEvent, lengthUnits, Unit } from './type';
import { lengthConverter, unitConverter } from './converter';
import {
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../editor-common-fields.style';

@customElement('eb-length-input')
@localized()
export class EBLengthInput extends LitElement {
  public static styles = [commonInputComponentStyle, commonSettingsStyles];
  @property({
    type: Array,
    converter: unitConverter,
    attribute: 'allowed-units',
  })
  public allowedUnits: Array<Unit> = [...lengthUnits];
  @property({ attribute: 'label', type: String })
  public label?: string;
  @property({ attribute: 'value', converter: lengthConverter, reflect: true })
  public value: Length = { unit: 'px', amount: 0 };
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#controlling_input_size
  protected render(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        ${this.renderLabel()} ${this.renderNativeInput()}
        ${this.renderSelector()}
      </div>
    `;
  }
  private renderLabel(): TemplateResult | typeof nothing {
    return this.label
      ? html`<label part="label" for="input">${this.label}</label>`
      : nothing;
  }
  private renderNativeInput(): TemplateResult {
    return html`<input
      id="input"
      .value=${this.value.amount.toString(10)}
      type="number"
      @change=${this.amountChange}
      max="${this.getMaxForUnit(this.value.unit)}"
    />`;
  }
  private renderSelector(): TemplateResult {
    return html`<select .value=${this.value.unit} @change=${this.unitChange}>
      ${this.allowedUnits.map(
        (unit) =>
          html`<option ?selected=${this.value.unit === unit} .value=${unit}>
            ${this.getTranslationFor(unit)}
          </option>`
      )}
    </select>`;
  }
  private getTranslationFor(unit: Unit): string {
    switch (unit) {
      case '%':
        return msg('Percentage');
      case 'px':
        return msg('Pixel');
      case 'em':
        return msg('EM');
      default:
        return 'N/A';
    }
  }
  private unitChange = (changeEvent: Event): void => {
    const { value: newUnit } = changeEvent.target as HTMLSelectElement;
    const newAmount = Math.min(
      this.getMaxForUnit(newUnit as Unit),
      this.value.amount
    );
    this.dispatchNewState({ amount: newAmount, unit: newUnit as Unit });
  };
  private amountChange = (changeEvent: Event): void => {
    const htmlInputElement = changeEvent.target as HTMLInputElement;
    const { valueAsNumber: amount } = htmlInputElement;

    if (Number.isNaN(amount))
      htmlInputElement.valueAsNumber = this.value.amount;
    else this.dispatchNewState({ ...this.value, amount });
  };
  private dispatchNewState({ unit, amount }: Length): void {
    const event: LengthInputChangeEvent = new CustomEvent('change', {
      bubbles: false,
      cancelable: true,
      composed: false,
      detail: `${amount}${unit}` as const,
    });
    this.dispatchEvent(event);
  }
  // TODO: put this into the converter and export it
  private getMaxForUnit(unit: Unit): number {
    return unit === '%' ? 100 : 1000;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-length-input': EBLengthInput;
  }
}
