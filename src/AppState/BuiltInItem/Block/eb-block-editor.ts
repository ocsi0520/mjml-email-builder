import { html, TemplateResult } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BlockState } from './BlockState';
import { StateEditorLit } from '../../Lit/StateEditorLit';
import { BlockStateNode } from './BlockStateNode';
import {
  commonFieldStyles,
  commonSettingsStyles,
} from '../../../common/editor-common-fields.style';
import { ColorInputChangeEvent } from '../../../common/components/color-input/eb-color-input';
import { optionalHtml } from '../../../common/utils/markup.utils';
import { DEFAULT_BORDER_STATE } from '../../State/BorderState';
import { BorderStateChangeEvent } from '../../../common/components/editors/type';

@customElement('eb-block-editor')
@localized()
export class EBBlockEditor extends StateEditorLit<BlockState> {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonSettingsStyles,
  ];
  public stateNode!: BlockStateNode;
  protected renderContent(): TemplateResult {
    return html`<div class="setting-left-padding">
      <eb-color-input
        @change=${this.handleBGColorChange}
        .value=${this.stateNode.state.backgroundColor}
        label=${msg('Background color')}
      ></eb-color-input>
      ${this.renderBorderEditor()}
    </div>`;
  }
  protected getEditorName(): string {
    return msg('Block Editor');
  }
  private renderBorderEditor(): TemplateResult {
    return optionalHtml(msg('Border'), this.toggleBorder)`<eb-border-editor
    .value=${this.stateNode.state.border}
    @change=${this.handleBorderChange}
  ></eb-border-editor>`;
  }
  private toggleBorder = (): void => {
    const newBlockState: BlockState = {
      ...this.stateNode.state,
      border: this.stateNode.state.border ? undefined : DEFAULT_BORDER_STATE,
    };
    this.dispatchNewState(newBlockState);
  };
  private handleBorderChange = ({
    detail: newBorderState,
  }: BorderStateChangeEvent): void => {
    const newBlockState: BlockState = {
      ...this.stateNode.state,
      border: newBorderState,
    };
    this.dispatchNewState(newBlockState);
  };
  private handleBGColorChange({
    detail: newColor,
  }: ColorInputChangeEvent): void {
    const newState: BlockState = {
      ...this.stateNode.state,
      backgroundColor: newColor,
    };
    this.dispatchNewState(newState);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-block-editor': EBBlockEditor;
  }
}
