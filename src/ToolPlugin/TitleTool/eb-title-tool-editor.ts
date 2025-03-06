import { TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { TitleToolState } from './TitleToolState';
import { commonFieldStyles } from '../../common/editor-common-fields.style';
import {
  FontStateChangeEvent,
  BorderStateChangeEvent,
} from '../../common/components/editors/type';
import { TextInputChangeEvent } from '../../common/components/text-input/eb-text-input';
import { optionalHtml } from '../../common/utils/markup.utils';
import { DEFAULT_BORDER_STATE } from '../../AppState/State/BorderState';
import { ColorInputChangeEvent } from '../../common/components/color-input/eb-color-input';

@localized()
@customElement('eb-title-tool-editor')
export class EBTitleToolEditor extends StateEditorLit<TitleToolState> {
  public static styles = [StateEditorLit.baseStyles, commonFieldStyles];
  protected renderContent(): TemplateResult {
    return html`<fieldset>
      ${this.renderTextChanger()} ${this.renderLinkChanger()}
      <eb-font-editor
        .value=${this.stateNode.state.font}
        @change=${this.handleFontChange}
      >
      </eb-font-editor>
      ${this.renderBackgroundChanger()} ${this.renderBorderEditor()}
    </fieldset>`;
  }
  protected getEditorName(): string {
    return msg('A title tool');
  }
  private renderTextChanger(): TemplateResult {
    return html`<eb-text-input
      isTextArea="true"
      label=${msg('Add text')}
      .value=${this.stateNode.state.titleText}
      @change=${this.handleTitleTextChange}
      placeholder=${msg('Text')}
    >
    </eb-text-input>`;
  }
  private renderLinkChanger(): TemplateResult {
    return optionalHtml(msg('Link'), this.toggleTitleLink)`<eb-text-input
    .value=${this.stateNode.state.url}
    @change=${this.handleTitleURLChange}
  >
  </eb-text-input>`;
  }
  private toggleTitleLink = (): void => {
    const newValue = this.stateNode.state.url
      ? undefined
      : 'https://www.google.com';
    this.changeTitleURL(newValue);
  };
  private renderBorderEditor(): TemplateResult {
    return optionalHtml(msg('Border'), this.toggleBorder)`<eb-border-editor
    .value=${this.stateNode.state.border}
    @change=${this.handleBorderChange}
  ></eb-border-editor>`;
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
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      backgroundColor: newBGColor,
    };
    this.dispatchNewState(newTitleToolState);
  };
  private handleTitleTextChange = (changeEvent: TextInputChangeEvent): void => {
    const value = changeEvent.detail;
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      titleText: value,
    };
    this.dispatchNewState(newTitleToolState);
  };
  private handleFontChange = (event: FontStateChangeEvent): void => {
    const newFont = event.detail;
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      font: newFont,
    };
    this.dispatchNewState(newTitleToolState);
  };
  private handleBorderChange = ({
    detail: newBorderState,
  }: BorderStateChangeEvent): void => {
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      border: newBorderState,
    };
    this.dispatchNewState(newTitleToolState);
  };
  // TODO: this is not the best way, but for sake of time
  private handleTitleURLChange = (changeEvent: TextInputChangeEvent): void => {
    this.changeTitleURL(changeEvent.detail);
  };
  private changeTitleURL = (newURL: string | undefined): void => {
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      url: newURL,
    };
    this.dispatchNewState(newTitleToolState);
  };
  private toggleBorder = (): void => {
    const newTitleToolState: TitleToolState = {
      ...this.stateNode.state,
      border: this.stateNode.state.border ? undefined : DEFAULT_BORDER_STATE,
    };
    this.dispatchNewState(newTitleToolState);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-title-tool-editor': EBTitleToolEditor;
  }
}
