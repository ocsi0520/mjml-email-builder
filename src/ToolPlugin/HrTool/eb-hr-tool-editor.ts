import { TemplateResult, html } from 'lit';
import { msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { StateEditorLit } from '../../AppState/Lit/StateEditorLit';
import { HrToolState } from './HrToolState';
import { BorderStateChangeEvent } from '../../common/components/editors/type';
import {
  commonFieldStyles,
  commonSettingsStyles,
} from '../../common/editor-common-fields.style';

@customElement('eb-hr-tool-editor')
export class EBHrToolEditor extends StateEditorLit<HrToolState> {
  public static styles = [
    StateEditorLit.baseStyles,
    commonFieldStyles,
    commonSettingsStyles,
  ];
  protected renderContent(): TemplateResult {
    return html`<div class="setting-container">
      <eb-border-editor
        .value=${this.stateNode.state.border}
        @change=${this.handleBorderChange}
        ?disableRadius=${true}
      ></eb-border-editor>
    </div> `;
  }
  protected getEditorName(): string {
    return msg('A hr tool');
  }
  private handleBorderChange = ({
    detail: newBorder,
  }: BorderStateChangeEvent): void => {
    this.dispatchNewState({ ...this.stateNode.state, border: newBorder });
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-hr-tool-editor': EBHrToolEditor;
  }
}
