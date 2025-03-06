import { html, nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { ButtonToolState } from './ButtonToolState';
import {
  commonFieldStyles,
  commonInputComponentStyle,
  commonSettingsStyles,
} from '../../common/editor-common-fields.style';
import { TextInputChangeEvent } from '../../common/components/text-input/eb-text-input';
import {
  FontStateChangeEvent,
  BorderStateChangeEvent,
} from '../../common/components/editors/type';
import { renderSelectOptions } from '../../common/utils/renderSelectOptions';
import { dispatchEBEvent } from '../../events/app.event';
import { LengthInputChangeEvent } from '../../common/components/length-input/type';
import { Alignment, AlignmentLocalisations } from '../../common/type';
import { optionalHtml } from '../../common/utils/markup.utils';
import { DEFAULT_BORDER_STATE } from '../../AppState/State/BorderState';
import { ColorInputChangeEvent } from '../../common/components/color-input/eb-color-input';

@localized()
@customElement('eb-button-tool-editor')
export class EBButtonToolEditor extends StateEditorLit<ButtonToolState> {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonSettingsStyles,
    commonInputComponentStyle,
  ];
  protected renderContent(): TemplateResult {
    return html` <fieldset>
      ${this.renderTextChanger()} ${this.renderURLChanger()}
      ${this.renderWidthChanger()} ${this.renderBackgroundChanger()}
      ${this.renderAlignment()}
      <eb-font-editor
        .value=${this.stateNode.state.font}
        @change=${this.handleFontChange}
      >
      </eb-font-editor>
      ${this.renderBorderEditor()}
    </fieldset>`;
  }
  protected getEditorName(): string {
    return msg('A button tool');
  }
  private renderTextChanger(): TemplateResult {
    return html`<eb-text-input
      isTextArea="true"
      label=${msg('Add text')}
      .value=${this.stateNode.state.text}
      @change=${this.handleButtonTextChange}
      placeholder=${msg('Text')}
    ></eb-text-input>`;
  }
  private renderURLChanger(): TemplateResult {
    return html`<eb-text-input
      label=${msg('Link')}
      .value=${this.stateNode.state.url}
      @change=${this.handleButtonURLChange}
    >
    </eb-text-input>`;
  }
  private renderWidthChanger(): TemplateResult | typeof nothing {
    return html`<div class="setting-left-margin">
      <eb-length-input
        label=${msg('Width')}
        value="${this.stateNode.state.width}"
        @change=${this.handleWidthChange}
      ></eb-length-input>
    </div>`;
  }
  private renderBackgroundChanger(): TemplateResult {
    return html`
      <div class="setting-item setting-left-padding setting-left-margin">
        <eb-color-input
          @change=${this.handleBGColorChange}
          .value=${this.stateNode.state.backgroundColor}
          label=${msg('Background color')}
        ></eb-color-input>
      </div>
    `;
  }
  private renderAlignment(): TemplateResult {
    return html`
      <div
        class="setting-item setting-select setting-left-padding setting-right-padding setting-left-margin"
      >
        <label>${msg('Alignment')}</label>
        <select @change=${this.onChangeAlignment}>
          ${renderSelectOptions(
            Object.values(Alignment),
            AlignmentLocalisations,
            this.stateNode.state.alignment
          )}
        </select>
      </div>
    `;
  }
  private renderBorderEditor(): TemplateResult {
    return optionalHtml(msg('Border'), this.toggleBorder)`<eb-border-editor
    .value=${this.stateNode.state.border}
    @change=${this.handleBorderChange}
  ></eb-border-editor>`;
  }
  private handleButtonTextChange = (
    changeEvent: TextInputChangeEvent
  ): void => {
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      text: changeEvent.detail,
    };
    this.dispatchNewState(newButtonToolState);
  };
  private handleButtonURLChange = (changeEvent: CustomEvent<string>): void => {
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      url: changeEvent.detail,
    };
    this.dispatchNewState(newButtonToolState);
  };
  private handleFontChange = (event: FontStateChangeEvent): void => {
    const newFontState = event.detail;
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      font: newFontState,
    };
    this.dispatchNewState(newButtonToolState);
  };
  private handleBGColorChange = ({
    detail: newBGColor,
  }: ColorInputChangeEvent): void => {
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      backgroundColor: newBGColor,
    };
    this.dispatchNewState(newButtonToolState);
  };
  private handleWidthChange = ({
    detail: newWidth,
  }: LengthInputChangeEvent): void => {
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      width: newWidth,
    };
    dispatchEBEvent(this, 'node-state-changed', newButtonToolState);
  };
  private handleBorderChange = ({
    detail: newBorderState,
  }: BorderStateChangeEvent): void => {
    const newButtonToolState: ButtonToolState = {
      ...this.stateNode.state,
      border: newBorderState,
    };
    this.dispatchNewState(newButtonToolState);
  };
  private onChangeAlignment = (event: Event): void => {
    this.dispatchNewState({
      ...this.stateNode.state,
      alignment: (event.target as HTMLSelectElement).value as Alignment,
    });
  };
  private toggleBorder = (): void => {
    const newBorderToolState: ButtonToolState = {
      ...this.stateNode.state,
      border: this.stateNode.state.border ? undefined : DEFAULT_BORDER_STATE,
    };
    this.dispatchNewState(newBorderToolState);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-button-tool-editor': EBButtonToolEditor;
  }
}
