import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import { GlobalSettings } from './global-settings';
import { FontStateChangeEvent } from '../../../../common/components/editors/type';
import {
  commonFieldStyles,
  commonSettingsStyles,
} from '../../../../common/editor-common-fields.style';
import { ColorInputChangeEvent } from '../../../../common/components/color-input/eb-color-input';

@customElement('eb-global-settings')
@localized()
export class EBGlobalSettings extends LitElement {
  public static styles = [
    commonFieldStyles,
    commonSettingsStyles,
    css`
      .setting-main-title {
        padding: 8px 0 8px 10px;
      }
    `,
  ];
  @property({ attribute: false })
  private settings: GlobalSettings = GlobalSettings.getInstance();
  constructor() {
    super();
    this.settings.setListenerComponent(this);
  }
  protected render(): TemplateResult {
    return html`
      <p class="setting-main-title">${msg('Global Settings')}</p>
      <eb-font-editor
        .value=${this.settings.font}
        @change=${this.onChangeFont}
      ></eb-font-editor>
      <fieldset>
        <p class="setting-title">${msg('Color Settings')}</p>
        ${this.renderLinkColor()}
      </fieldset>
    `;
  }
  private renderLinkColor(): TemplateResult {
    return html`<eb-color-input
      @change=${this.onChangeLinkColor}
      label=${msg('Link color')}
      .value="${this.settings.linkColor}"
    ></eb-color-input> `;
  }
  private onChangeLinkColor = ({
    detail: newColor,
  }: ColorInputChangeEvent): void => {
    this.settings.linkColor = newColor;
  };
  private onChangeFont = (event: FontStateChangeEvent): void => {
    this.settings.font = event.detail;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-global-settings': EBGlobalSettings;
  }
}
