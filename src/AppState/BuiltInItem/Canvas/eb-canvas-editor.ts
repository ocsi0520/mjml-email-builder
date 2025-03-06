import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { CanvasState } from './CanvasState';
import { StateEditorLit } from '../../Lit/StateEditorLit';
import { commonFieldStyles } from '../../../common/editor-common-fields.style';
import type { ColorInputChangeEvent } from '../../../common/components/color-input/eb-color-input';

@localized()
@customElement('eb-canvas-editor')
export class EBCanvasEditor extends StateEditorLit<CanvasState> {
  public static styles = [StateEditorLit.baseStyles, commonFieldStyles];
  protected renderContent(): TemplateResult {
    return html`<div class="setting-left-padding">
      <eb-color-input
        .value=${this.stateNode.state.backgroundColor}
        label=${msg('Background color')}
        @change=${this.onColorChange}
      ></eb-color-input>
    </div>`;
  }
  protected getEditorName(): string {
    return msg('Canvas Editor');
  }
  private onColorChange = (colorChangeEvent: ColorInputChangeEvent): void => {
    this.dispatchNewState({
      ...this.stateNode.state,
      backgroundColor: colorChangeEvent.detail,
    });
  };
}
declare global {
  interface HTMLElementTagNameMap {
    'eb-canvas-editor': EBCanvasEditor;
  }
}
