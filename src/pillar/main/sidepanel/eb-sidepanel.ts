import { localized, msg } from '@lit/localize';
import { LitElement, html, css, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { StateNode } from '../../../AppState/StateNode/StateNode';
import { ebItemManager } from '../../../AppState/EBItemManager';
import { StateEditorFactory } from '../../../AppState/Register/StateEditorFactory';
import { BasicState } from '../../../AppState/State/BasicState';
import { StateEditor } from '../../../AppState/EBItem/StateEditor';
import { dispatchEBEvent } from '../../../events/app.event';
import { SidePanelView } from './SidePanelView';
import './global-settings/eb-global-settings';
import './eb-tool-icon';

@localized()
@customElement('eb-sidepanel')
export class EBSidepanel extends LitElement {
  public static styles = css`
    :host {
      top: var(--header-height);
      right: 0;
      bottom: 0;
      position: fixed;
      width: var(--sidepanel-width);
      z-index: var(--z-index-sidepanel, 3);
      background: linear-gradient(to right, var(--black), var(--mallow-light));
      display: flex;
      flex-direction: column;
      min-width: var(--sidepanel-width);
    }
    .sidepanel-header {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 15% 0 15%;
    }
    .sidepanel-body {
      margin-top: 0;
      background-color: var(--grey-alpha);
      overflow: auto;
      flex: 1 1 0;
    }
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background: var(--lighter-background);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--violet-medium);
    }
    button {
      flex: 1 1 0;
      padding: 0;
      cursor: pointer;
      border: none;
      color: var(--white);
      border-radius: 15px 15px 0 0;
      height: 30px;
      transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
        opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
      background-color: var(--grey-alpha);
      color: var(--violet);
    }
    .active {
      background-color: var(--violet);
      color: var(--white);
      border-radius: 15px 15px 0 0;
    }
    button:hover {
      box-shadow: var(--violet-light) 0px 0px 5px;
      transition: all 0.2s ease-in-out;
      background-color: var(--violet);
      color: var(--white);
    }
    button:disabled {
      background-color: var(--grey-alpha);
      cursor: not-allowed;
      border: none;
      border-radius: 15px 15px 0 0;
      box-shadow: none;
      color: var(--violet);
    }
    .tool-icons-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-top: 10px;
    }
  `;
  @property()
  public selected: StateNode | null = null;
  @property()
  public view!: SidePanelView;
  protected render(): TemplateResult {
    return html` ${this.getSidepanelHeader()} ${this.getSidepanelBody()}`;
  }
  private getSidepanelHeader(): TemplateResult {
    return html`
      <div class="sidepanel-header">
        <button
          style="border: none;padding: 10px;"
          class=${classMap({ active: this.view === 'tools' })}
          @click=${this.getClickHandler('tools')}
        >
          ${msg('Tools')}
        </button>
        <button
          class=${classMap({ active: this.view === 'editor' })}
          @click=${this.getClickHandler('editor')}
          ?disabled=${!this.selected}
        >
          ${msg('Change selected')}
        </button>
      </div>
    `;
  }
  private getClickHandler =
    (menu: Exclude<SidePanelView, 'global'>) => (): void => {
      dispatchEBEvent(this, 'sidepanel-view-change', menu);
    };
  private getSidepanelBody(): TemplateResult {
    let bodyContent: TemplateResult | HTMLElement;
    switch (this.view) {
      case 'tools':
        bodyContent = this.getToolsBodyContent();
        break;
      case 'editor':
        bodyContent = this.getEditorForSelected();
        break;
      case 'global':
        bodyContent = html`<eb-global-settings></eb-global-settings>`;
        break;
    }
    return html`<div class="sidepanel-body">${bodyContent}</div>`;
  }
  private getToolsBodyContent(): TemplateResult {
    return html`<div class="tool-icons-list">
      ${ebItemManager
        .getAllIcons()
        .map(
          (descriptor) =>
            html`<eb-tool-icon .descriptor=${descriptor}></eb-tool-icon>`
        )}
    </div>`;
  }
  private getEditorForSelected(): StateEditor<BasicState> {
    return StateEditorFactory.getInstance().getEditorFor(this.selected!);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-sidepanel': EBSidepanel;
  }
}
