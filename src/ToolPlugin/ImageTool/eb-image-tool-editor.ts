import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { ImageToolState } from './ImageToolState';
import {
  commonFieldStyles,
  commonSettingsStyles,
  commonInputComponentStyle,
} from '../../common/editor-common-fields.style';
import { renderSelectOptions } from '../../common/utils/renderSelectOptions';
import { dispatchEBEvent } from '../../events/app.event';
import { TextInputChangeEvent } from '../../common/components/text-input/eb-text-input';
import { LengthInputChangeEvent } from '../../common/components/length-input/type';
import { Alignment, AlignmentLocalisations } from '../../common/type';
import { optionalHtml } from '../../common/utils/markup.utils';
import { DEFAULT_BORDER_STATE } from '../../AppState/State/BorderState';
import { BorderStateChangeEvent } from '../../common/components/editors/type';
import { ColorInputChangeEvent } from '../../common/components/color-input/eb-color-input';

@localized()
@customElement('eb-image-tool-editor')
export class EBImageToolEditor extends StateEditorLit<ImageToolState> {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonSettingsStyles,
    commonInputComponentStyle,
    css`
      :host {
        height: 100%;
      }
      input[type='file'] {
        display: none;
      }
      .upload-button {
        border: none;
        padding: 2px 12px;
        cursor: pointer;
        border-radius: 5px;
        background-color: var(--violet);
      }
    `,
  ];
  protected renderContent(): TemplateResult {
    return html` <fieldset>
      <eb-text-input
        label=${msg('Image URL')}
        .value=${this.stateNode.state.imageURL}
        @change=${this.handleImageURLChange}
      >
      </eb-text-input>
      <eb-text-input
        label=${msg('Link')}
        .value=${this.stateNode.state.targetURL}
        @change=${this.handleTargetURLChange}
      >
      </eb-text-input>
      ${this.renderImageUploader()} ${this.renderAlignment()}
      ${this.renderBackgroundChanger()} ${this.renderWidthChanger()}
      ${this.renderBorderEditor()}
    </fieldset>`;
  }
  private renderImageUploader(): TemplateResult {
    return html`<div class="setting-item setting-left-margin">
      <label class="upload-button">
        <input
          type="file"
          accept="image/*"
          id="image-input"
          @change=${this.handleImageUpload}
        />
        ${msg('Upload image')}
      </label>
    </div>`;
  }
  private renderAlignment(): TemplateResult {
    return html`
      <div
        class="setting-item setting-select setting-left-margin setting-right-padding"
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
  private renderBackgroundChanger(): TemplateResult {
    return html`
      <div class="setting-item-without-left-padding setting-left-margin">
        <eb-color-input
          @change=${this.handleBGColorChange}
          .value=${this.stateNode.state.backgroundColor}
          label=${msg('Background color')}
        ></eb-color-input>
      </div>
    `;
  }
  private renderWidthChanger(): TemplateResult {
    const { width } = this.stateNode.state;
    return optionalHtml(msg('Width'), this.toggleWidth)`
    <div class="setting-left-margin">
      <eb-length-input
          allowed-units="px"
          value=${width}
          @change=${this.changeWidth}
          label=${msg('Width')}
        ></eb-length-input>
      </div>`;
  }
  private renderBorderEditor(): TemplateResult {
    return optionalHtml(msg('Border'), this.toggleBorder)`<eb-border-editor
    .value=${this.stateNode.state.border}
    @change=${this.handleBorderChange}
  ></eb-border-editor>`;
  }
  private handleBGColorChange = ({
    detail: newBGColor,
  }: ColorInputChangeEvent): void => {
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      backgroundColor: newBGColor,
    };
    this.dispatchNewState(newImageToolState);
  };
  private handleImageUpload = (changeEvent: TextInputChangeEvent): void => {
    const imageInput = changeEvent.target as HTMLInputElement;
    let newImageURL: string | undefined = '';
    if (imageInput.files && imageInput.files[0]) {
      newImageURL = URL.createObjectURL(imageInput.files[0]);
    }
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      imageURL: newImageURL,
    };
    dispatchEBEvent(this, 'node-state-changed', newImageToolState);
  };
  private handleTargetURLChange = (changeEvent: TextInputChangeEvent): void => {
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      targetURL: changeEvent.detail,
    };
    dispatchEBEvent(this, 'node-state-changed', newImageToolState);
  };
  private handleImageURLChange = (changeEvent: TextInputChangeEvent): void => {
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      imageURL: changeEvent.detail,
    };
    dispatchEBEvent(this, 'node-state-changed', newImageToolState);
  };
  private handleBorderChange = ({
    detail: newBorderState,
  }: BorderStateChangeEvent): void => {
    const newButtonToolState: ImageToolState = {
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
  private toggleWidth = (): void => {
    const { state } = this.stateNode;
    const newImageToolState: ImageToolState = {
      ...state,
      width: state.width ? undefined : '100px',
    };
    dispatchEBEvent(this, 'node-state-changed', newImageToolState);
  };
  private changeWidth = ({
    detail: newWidth,
  }: LengthInputChangeEvent): void => {
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      width: newWidth,
    };
    dispatchEBEvent(this, 'node-state-changed', newImageToolState);
  };
  private toggleBorder = (): void => {
    const newImageToolState: ImageToolState = {
      ...this.stateNode.state,
      border: this.stateNode.state.border ? undefined : DEFAULT_BORDER_STATE,
    };
    this.dispatchNewState(newImageToolState);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-image-tool-editor': EBImageToolEditor;
  }
}
