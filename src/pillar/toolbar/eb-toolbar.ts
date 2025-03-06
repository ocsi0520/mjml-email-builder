import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import { View } from '../../views';
import { dispatchEBEvent } from '../../events/app.event';

const globalSettingsIcon = new URL(
  '../../../../assets/gears-solid.svg',
  import.meta.url
).href;

const undoIcon = new URL(
  '../../../../assets/arrow-rotate-left-solid.svg',
  import.meta.url
).href;

const redoIcon = new URL(
  '../../../../assets/rotate-right-solid.svg',
  import.meta.url
).href;

// const iconsByView: Record<View, string> = {
//   tablet: new URL('../../../../assets/views/tablet-solid.svg', import.meta.url).href,
//   phone: new URL('../../../../assets/views/mobile-screen-button-solid.svg', import.meta.url).href,
//   desktop: new URL('../../../../assets/views/desktop-solid.svg', import.meta.url)
//     .href,
// };
@customElement('eb-toolbar')
export class EBToolbar extends LitElement {
  public static styles = css`
    :host {
      display: inline-flex;
      position: fixed;
      bottom: 40px;
      left: 2%;
      height: 35px;
      background-color: var(--mallow-light);
      border-radius: 3px;
      padding: 2px;
      border: 1px solid var(--mallow-light);
      box-shadow: var(--lighter-background) 0px 0px 3px;
    }
    img {
      height: 18px;
      width: 18px;
      cursor: pointer;
    }
    button {
      cursor: pointer;
      padding: 4px;
      background-color: var(--mallow-light);
      border: none;
      opacity: 0.5;
    }
    button:hover {
      opacity: 1;
    }
    .command-button {
      width: 30px;
      opacity: 1;
    }
    .command-button[disabled] {
      opacity: 0.5;
    }
  `;
  @property()
  public undoAvailable: boolean = false;
  @property()
  public redoAvailable: boolean = false;
  protected render(): TemplateResult {
    // ${views.map((view) => this.renderViewIcon(view))}
    return html`
      ${this.renderGlobalSettingsIcon()}
      <button
        class="command-button"
        .disabled=${!this.undoAvailable}
        @click=${(): void => dispatchEBEvent(this, 'undo', null)}
      >
        <img alt="undo" src=${undoIcon} />
      </button>
      <button
        class="command-button"
        .disabled=${!this.redoAvailable}
        @click=${(): void => dispatchEBEvent(this, 'redo', null)}
      >
        <img alt="redo" src=${redoIcon} />
      </button>
    `;
  }
  private renderGlobalSettingsIcon(): TemplateResult {
    return html`<button @click=${(): void => this.showGlobalSettings()}>
      <img alt="global settings" src=${globalSettingsIcon} />
    </button>`;
  }
  //   private renderViewIcon(view: View): TemplateResult {
  //     return html`<button @click=${(): void => this.previewWith(view)}>
  //       <img alt=${view} src=${iconsByView[view]} />
  //     </button>`;
  //   }
  //   private previewWith(view: View): void {
  //     dispatchEBEvent(this, 'preview', view);
  //   }
  private showGlobalSettings(): void {
    dispatchEBEvent(this, 'sidepanel-view-change', 'global');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-toolbar': EBToolbar;
  }
}
