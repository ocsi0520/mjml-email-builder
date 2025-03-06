import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { SlotState } from './SlotState';
import { StateEditorLit } from '../../Lit/StateEditorLit';
import { commonSettingsStyles } from '../../../common/editor-common-fields.style';
// TODO: finish
@customElement('eb-slot-editor')
export class EBSlotEditor extends StateEditorLit<SlotState> {
  public static styles = [StateEditorLit.baseStyles, commonSettingsStyles];
  protected renderContent(): TemplateResult {
    return html``;
  }
  protected getEditorName(): string {
    return msg('Slot Editor');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-slot-editor': EBSlotEditor;
  }
}
