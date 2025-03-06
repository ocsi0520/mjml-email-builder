import { LitElement, TemplateResult, html, css, nothing } from 'lit';
import { msg } from '@lit/localize';
import { StateEditor } from '../EBItem/StateEditor';
import { commonSettingsStyles } from '../../common/editor-common-fields.style';
import { BasicState } from '../State/BasicState';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../StateNode/StateNode';
import { dispatchEBEvent } from '../../events/app.event';
import {
  LengthInputChangeEvent,
  LengthString,
} from '../../common/components/length-input/type';
import { Dimension } from '../State/FourDimensionLengthState';

type Field = 'padding' | 'margin';
// TODO: make common translation object to a separate file
const fieldTranslationGetters: Record<Field, () => string> = {
  margin: () => msg('margin'),
  padding: () => msg('padding'),
};
const dimensions = ['Bottom', 'Left', 'Right', 'Top'] as const;
const dimensionTranslationGetters: Record<Dimension, () => string> = {
  Bottom: () => msg('Bottom'),
  Top: () => msg('Top'),
  Left: () => msg('Left'),
  Right: () => msg('Right'),
};

// TODO: check whether we need @localized decorator
// at this base class
export abstract class StateEditorLit<State extends BasicState>
  extends LitElement
  implements StateEditor<State>
{
  public static baseStyles = [
    commonSettingsStyles,
    css`
      .editor-name {
        padding: 8px 0 8px 10px;
      }
    `,
  ];
  public stateNode!: StateNode<State, BasicViewerComponent<State>>;
  public dispatchNewState(state: State): void {
    dispatchEBEvent(this, 'node-state-changed', state);
  }
  public connectedCallback(): void {
    super.connectedCallback();
    this.stateNode.editor = this;
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stateNode.editor = null;
  }
  protected render(): TemplateResult {
    return html`
      <div class="setting-main-title">
        <div class="editor-name">${this.getEditorName()}</div>
        ${this.needsControls()
          ? html`<eb-state-node-controls .stateNode=${this.stateNode}>
            </eb-state-node-controls>`
          : nothing}
      </div>
      ${this.renderContent()} ${this.renderFieldSet('padding')}
      ${this.renderFieldSet('margin')}
    `;
  }
  // TODO: think about better title solution
  protected getEditorName(): string {
    return msg('Editor');
  }
  private needsControls(): boolean {
    return !(
      this.stateNode.itemID === 'canvas' ||
      this.stateNode.itemID === 'slot' ||
      this.stateNode.itemID === 'block' ||
      this.stateNode.itemID === 'footer'
    );
  }
  private renderFieldSet(field: Field): TemplateResult {
    return html`
      <p class="setting-title">${fieldTranslationGetters[field]()}</p>
      <div class="setting-container">
          ${dimensions.map((dimension) =>
            this.getInputForKey(field, dimension)
          )}
        </div>
      </div>
    `;
  }
  private getInputForKey = (
    field: Field,
    dimension: Dimension
  ): TemplateResult => {
    const stateKey: keyof BasicState = (field +
      dimension) as `${typeof field}${typeof dimension}`;
    return html`<eb-length-input
      label=${dimensionTranslationGetters[dimension]()}
      value=${this.stateNode.state[stateKey] || '0px'}
      @change=${(ev: LengthInputChangeEvent): void =>
        this.dispatchNewBasicState(stateKey, ev.detail)}
    ></eb-length-input>`;
  };
  private dispatchNewBasicState(
    key: keyof BasicState,
    newLength: LengthString
  ): void {
    const newState = {
      ...this.stateNode.state,
      [key]: newLength,
    };
    dispatchEBEvent(this, 'node-state-changed', newState);
  }
  protected abstract renderContent(): any;
}
