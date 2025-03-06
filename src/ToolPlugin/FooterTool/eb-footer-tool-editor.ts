import { TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { FooterToolState } from './FooterToolState';
import { commonFieldStyles } from '../../common/editor-common-fields.style';
import { FontStateChangeEvent } from '../../common/components/editors/type';
import { TextInputChangeEvent } from '../../common/components/text-input/eb-text-input';
import { ColorInputChangeEvent } from '../../common/components/color-input/eb-color-input';

@localized()
@customElement('eb-footer-tool-editor')
export class EBFooterToolEditor extends StateEditorLit<FooterToolState> {
  public static styles = [StateEditorLit.baseStyles, commonFieldStyles];
  protected renderContent(): TemplateResult {
    return html`<fieldset>
      ${this.renderTextChanger()} ${this.renderURLTextChanger()}
      <eb-font-editor
        .value=${this.stateNode.state.font}
        @change=${this.handleFontChange}
      >
      </eb-font-editor>
      ${this.renderBackgroundChanger()}
    </fieldset>`;
  }
  protected getEditorName(): string {
    return msg('A footer tool');
  }
  private renderTextChanger(): TemplateResult {
    return html`<eb-text-input
      isTextArea="true"
      label=${msg('Add text')}
      .value=${this.stateNode.state.unsubscribeText}
      @change=${this.handleUnsubscribeTextChange}
      placeholder=${msg('Text')}
    >
    </eb-text-input>`;
  }
  private renderURLTextChanger(): TemplateResult {
    return html`<eb-text-input
      label=${msg('Add text to link')}
      .value=${this.stateNode.state.linkText}
      @change=${this.handleURLTextChange}
    >
    </eb-text-input>`;
  }
  private renderBackgroundChanger(): TemplateResult {
    return html`
      <div class="setting-left-padding setting-left-margin">
        <eb-color-input
          @change=${this.handleBGColorChange}
          .value=${this.stateNode.state.backgroundColor}
          label=${msg('Background color')}
        ></eb-color-input>
      </div>
    `;
  }
  private handleBGColorChange = ({
    detail: newBGColor,
  }: ColorInputChangeEvent): void => {
    const newFooterToolState: FooterToolState = {
      ...this.stateNode.state,
      backgroundColor: newBGColor,
    };
    this.dispatchNewState(newFooterToolState);
  };
  private handleUnsubscribeTextChange = (
    changeEvent: TextInputChangeEvent
  ): void => {
    const value = changeEvent.detail;
    const newFooterToolState: FooterToolState = {
      ...this.stateNode.state,
      unsubscribeText: value,
    };
    this.dispatchNewState(newFooterToolState);
  };
  private handleURLTextChange = (changeEvent: TextInputChangeEvent): void => {
    const value = changeEvent.detail;
    const newFooterToolState: FooterToolState = {
      ...this.stateNode.state,
      linkText: value,
    };
    this.dispatchNewState(newFooterToolState);
  };
  private handleFontChange = (event: FontStateChangeEvent): void => {
    const newFont = event.detail;
    const newFooterToolState: FooterToolState = {
      ...this.stateNode.state,
      font: newFont,
    };
    this.dispatchNewState(newFooterToolState);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-footer-tool-editor': EBFooterToolEditor;
  }
}
