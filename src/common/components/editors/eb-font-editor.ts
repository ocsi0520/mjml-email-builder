/* eslint-disable max-lines */
import { msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import { FontStateChangeEvent } from './type';
import {
  FontAlignmentLocalisations,
  FontStyleLocalisations,
  TextDecorationLocalisations,
  TextTransformLocalisations,
} from './localizations';
import {
  FontAlignment,
  FontState,
  FontStyle,
  TextDecoration,
  TextTransform,
  makeDefaultFontState,
} from '../../../AppState/State/FontState';
import { renderSelectOptions } from '../../utils/renderSelectOptions';
import { StateEditorLit } from '../../../AppState/Lit/StateEditorLit';
import {
  commonFieldStyles,
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../editor-common-fields.style';

type EnumKeysOfFontState =
  | 'alignment'
  | 'weight'
  | 'fontStyle'
  | 'textDecoration'
  | 'textTransform';

type NonEnumKeysOfFontState = Exclude<keyof FontState, EnumKeysOfFontState>;

@customElement('eb-font-editor')
export class EBFontEditor extends LitElement {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonSettingsStyles,
    commonInputComponentStyle,
  ];
  @property({ attribute: false })
  public value: FontState = makeDefaultFontState();
  protected render(): TemplateResult {
    return html`
      <div class="setting-title">${this.getEditorName()}</div>
      <fieldset class="setting-container">
        <eb-font-family-picker
          value=${this.value.fontFamily}
          @change=${this.getHandlerForInput('fontFamily')}
        ></eb-font-family-picker>
        ${this.renderFontSize()} ${this.renderFontStyle()}
        ${this.renderTextDecoration()} ${this.renderTextTransform()}
        ${this.renderTextAlignment()} ${this.renderFontWeight()}
        ${this.renderLineHeight()} ${this.renderLetterSpacing()}
        ${this.renderColorPicker()}
      </fieldset>
    `;
  }
  protected getEditorName(): string {
    return msg('Font Editor');
  }
  private renderFontSize(): TemplateResult {
    return html`<eb-length-input
      allowed-units="px"
      label="${msg('Font size')}"
      value="${this.value.size}"
      @change=${this.getHandlerForInput('size')}
    ></eb-length-input> `;
  }
  private renderLineHeight(): TemplateResult {
    return html`<eb-length-input
      allowed-units="px"
      label="${msg('Line Height')}"
      value="${this.value.lineHeight}"
      @change=${this.getHandlerForInput('lineHeight')}
    ></eb-length-input> `;
  }
  private renderLetterSpacing(): TemplateResult {
    return html`<eb-length-input
      allowed-units="px"
      label="${msg('Letter Spacing')}"
      value="${this.value.letterSpacing}"
      @change=${this.getHandlerForInput('letterSpacing')}
    ></eb-length-input> `;
  }
  private renderTextAlignment(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        <label>${msg('Text alignment')}</label>
        <select @change=${this.getHandlerForSelection('alignment')}>
          ${renderSelectOptions(
            Object.values(FontAlignment),
            FontAlignmentLocalisations,
            this.value.alignment
          )}
        </select>
      </div>
    `;
  }
  private renderFontStyle(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        <label>${msg('Font style')}</label>
        <select @change=${this.getHandlerForSelection('fontStyle')}>
          ${renderSelectOptions(
            Object.values(FontStyle),
            FontStyleLocalisations,
            this.value.fontStyle
          )}
        </select>
      </div>
    `;
  }
  private renderTextDecoration(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        <label>${msg('Text decoration')}</label>
        <select @change=${this.getHandlerForSelection('textDecoration')}>
          ${renderSelectOptions(
            Object.values(TextDecoration),
            TextDecorationLocalisations,
            this.value.textDecoration
          )}
        </select>
      </div>
    `;
  }
  private renderTextTransform(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        <label>${msg('Text transform')}</label>
        <select @change=${this.getHandlerForSelection('textTransform')}>
          ${renderSelectOptions(
            Object.values(TextTransform),
            TextTransformLocalisations,
            this.value.textTransform
          )}
        </select>
      </div>
    `;
  }
  private renderFontWeight(): TemplateResult {
    return html`
      <div class="setting-select setting-item">
        <label>${msg('Font weight')}</label>
        <select @change=${this.onChangeWeight}>
          ${this.renderFontWeightOptions()}
        </select>
      </div>
    `;
  }
  private renderFontWeightOptions(): Array<TemplateResult> {
    return [100, 200, 300, 400, 500, 600, 700, 800, 900].map(
      (fontWeight) =>
        html`<option
          ?selected=${fontWeight === this.value.weight}
          value="${fontWeight}"
        >
          ${fontWeight}
        </option>`
    );
  }
  private renderColorPicker(): TemplateResult {
    return html`
      <div class="setting-item">
        <eb-color-input
          label=${msg('Font color')}
          @change=${this.getHandlerForInput('color')}
          .value=${this.value.color}
        >
        </eb-color-input>
      </div>
    `;
  }
  private dispatchState(fontState: FontState): void {
    const event: FontStateChangeEvent = new CustomEvent('change', {
      bubbles: false,
      cancelable: true,
      composed: false,
      detail: fontState,
    });
    this.dispatchEvent(event);
  }
  private getHandlerForInput =
    <T extends NonEnumKeysOfFontState>(key: T) =>
    (event: CustomEvent<FontState[T]>): void => {
      this.dispatchState({
        ...this.value,
        [key]: event.detail,
      });
    };
  private getHandlerForSelection =
    <T extends EnumKeysOfFontState>(key: T) =>
    (event: Event): void => {
      this.dispatchState({
        ...this.value,
        [key]: (event.target as HTMLSelectElement).value as FontState[T],
      });
    };
  private onChangeWeight = (event: Event): void => {
    const newWeight = Number((event.target as HTMLSelectElement).value);
    this.dispatchState({
      ...this.value,
      weight: newWeight,
    });
  };
}

// TODO: decrease number of lines in file
declare global {
  interface HTMLElementTagNameMap {
    'eb-font-editor': EBFontEditor;
  }
}
