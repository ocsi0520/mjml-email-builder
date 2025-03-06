import { LitElement, html, TemplateResult, css } from 'lit';
import { state, property, customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { GoogleFontService } from '../../services/google-font/GoogleFontService';
import { GoogleFont } from '../../services/google-font/google-font-type';
import {
  commonFieldStyles,
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../editor-common-fields.style';

type SuccessfullFontFetchingState = {
  state: 'fulfilled';
  data: Array<GoogleFont>;
};

type FontFetchingState =
  | SuccessfullFontFetchingState
  | {
      state: 'rejected';
      error: Error;
    }
  | { state: 'pending' };

@customElement('eb-font-family-picker')
export class EBFontFamilyPicker extends LitElement {
  public static styles = [
    commonInputComponentStyle,
    commonSettingsStyles,
    commonFieldStyles,
    css`
      input {
        padding-left: 0;
        margin: 4px 0;
        width: fit-content;
      }
      button {
        cursor: pointer;
      }
    `,
  ];
  @property({ attribute: false })
  public fontService = GoogleFontService.getInstance();
  @property()
  public value!: string;
  @state()
  private fontFetchingState: FontFetchingState = { state: 'pending' };
  protected firstUpdated(): void {
    this.executeFontFetchingProcess();
  }
  protected render(): TemplateResult {
    switch (this.fontFetchingState.state) {
      case 'rejected':
        // TODO: proper style please
        return html`
          <button @click=${this.executeFontFetchingProcess}>
            ${msg('Please retry')}
          </button>
        `;
      case 'fulfilled':
        return this.renderFetchedFamilies(this.fontFetchingState.data);
      default: // pending
        return html`<eb-loading-indicator></eb-loading-indicator>`;
    }
  }
  private async executeFontFetchingProcess(): Promise<void> {
    this.fontFetchingState = { state: 'pending' };
    try {
      const data = await this.fontService.getGoogleFonts();
      this.fontFetchingState = { state: 'fulfilled', data };
    } catch (e) {
      this.fontFetchingState = { state: 'rejected', error: e as Error };
    }
  }
  private renderFetchedFamilies(
    fontFamilies: Array<GoogleFont>
  ): TemplateResult {
    return html`
      <div class="setting-item setting-select">
        <label>${msg('Font family')}</label>
        <input
          .value=${this.value}
          @change=${this.handleInputChange}
          list="fonts"
        />
        <datalist id="fonts">${this.renderFontOptions(fontFamilies)}</datalist>
      </div>
    `;
  }
  private renderFontOptions(
    fontFamilies: Array<GoogleFont>
  ): Array<TemplateResult> {
    return fontFamilies.map(
      (fontFamily) => html`
        <option
          value=${fontFamily.family}
          ?selected=${fontFamily.family === this.value}
        >
          ${fontFamily.family}
        </option>
      `
    );
  }
  private handleInputChange = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;
    const fonts = (this.fontFetchingState as SuccessfullFontFetchingState).data;
    const selectedFont = fonts.find(
      (font) => font.family.toLowerCase() === value.toLowerCase()
    );
    if (selectedFont) this.onChangeFontFamily(selectedFont.family);
  };
  private onChangeFontFamily = (newFontFamily: string): void => {
    this.fontService.insertFontToHead(newFontFamily);
    const changeEvent = new CustomEvent('change', {
      detail: newFontFamily,
      bubbles: false,
      composed: false,
      cancelable: true,
    });
    this.dispatchEvent(changeEvent);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-font-family-picker': EBFontFamilyPicker;
  }
}
