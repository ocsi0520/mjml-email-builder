import { msg } from '@lit/localize';
import { LitElement, TemplateResult, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BorderStateChangeEvent } from './type';
import { StateEditorLit } from '../../../AppState/Lit/StateEditorLit';
import {
  commonFieldStyles,
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../editor-common-fields.style';
import { ColorInputChangeEvent } from '../color-input/eb-color-input';
import {
  BorderState,
  LineType,
  allAllowedLineTypes,
  allAllowedLineTypesLocalization,
} from '../../../AppState/State/BorderState';
import { LengthInputChangeEvent, LengthString } from '../length-input/type';
import { optionalHtml } from '../../utils/markup.utils';
import { renderSelectOptions } from '../../utils/renderSelectOptions';

@customElement('eb-border-editor')
export class EBBorderEditor extends LitElement {
  // TODO: unify baseStyles & commonFieldStyles, anyway StateEditorLit.baseStyles shouldn't be here
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonInputComponentStyle,
    commonSettingsStyles,
  ];
  @property({ attribute: false })
  public value!: BorderState;
  @property({ type: Boolean })
  public disableRadius: boolean = false;
  @property({ type: Boolean })
  public disableLineType: boolean = false;
  protected render(): TemplateResult {
    return html`
      <div class="setting-left-margin">
        ${this.renderWidthChanger()} ${this.renderLineTypeEditor()}
        <div class="setting-item">
          <eb-color-input
            .value=${this.value.color}
            @change=${this.onChangeColor}
            label=${msg('Color')}
          ></eb-color-input>
        </div>
        ${this.renderBorderRadiusEditor()}
      </div>
    `;
  }
  private renderWidthChanger(): TemplateResult {
    return html`
        <eb-length-input
          allowed-units="px"
          label=${msg('Width')}
          @change=${this.onChangeWidth}
          value=${this.value.width}
        ></eb-length-input>
      </div>
    `;
  }
  private renderBorderRadiusEditor(): TemplateResult | typeof nothing {
    if (this.disableRadius) return nothing;
    return optionalHtml(
      msg('Radius'),
      this.onToggleRadius
    )`<eb-length-input label=${msg('Radius')} value=${
      this.value.radius
    } @change=${this.onChangeRadius}></eb-length-input>`;
  }
  private renderLineTypeEditor(): TemplateResult | typeof nothing {
    if (this.disableLineType) return nothing;

    return html`<div class="border-style setting-item setting-select">
      <p>${msg('Style')}</p>
      <select
        .value=${this.value.lineType}
        @change=${this.handleLineTypeChange}
      >
        ${renderSelectOptions(
          allAllowedLineTypes,
          allAllowedLineTypesLocalization,
          this.value.lineType
        )}
      </select>
    </div>`;
  }
  private dispatchState(borderState: BorderState): void {
    const event: BorderStateChangeEvent = new CustomEvent('change', {
      bubbles: false,
      cancelable: true,
      composed: false,
      detail: borderState,
    });
    this.dispatchEvent(event);
  }
  private onChangeColor = ({
    detail: newColor,
  }: ColorInputChangeEvent): void => {
    this.dispatchState({
      ...this.value,
      color: newColor,
    });
  };
  private onChangeWidth = ({
    detail: newBorderWidth,
  }: LengthInputChangeEvent): void => {
    this.dispatchState({
      ...this.value,
      width: newBorderWidth,
    });
  };
  private onToggleRadius = (): void => {
    const newRadius: LengthString | undefined = this.value.radius
      ? undefined
      : '4px';
    this.dispatchState({ ...this.value, radius: newRadius });
  };
  private onChangeRadius = ({
    detail: newRadius,
  }: LengthInputChangeEvent): void => {
    this.dispatchState({ ...this.value, radius: newRadius });
  };
  private handleLineTypeChange = (changeEvent: Event): void => {
    const { value } = changeEvent.target as HTMLSelectElement;
    this.dispatchState({ ...this.value, lineType: value as LineType });
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-border-editor': EBBorderEditor;
  }
}
