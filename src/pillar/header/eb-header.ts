import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { buttonCss } from '../../common/button.style';
import { HeaderEmailBuilderEventMap } from '../../events/header.event';
import { dispatchEBEvent } from '../../events/app.event';

type HeaderEvent = keyof HeaderEmailBuilderEventMap;

const localizationByText: Record<HeaderEvent, () => string> = {
  'debug-email-save': () => msg('Save'),
  'debug-email-load': () => msg('Load'),
  'debug-email-send': () => msg('Sending in email'),
  'request-send-app-state': () => msg('Save'),
  'request-send-email-info': () => msg('Send'),
};

@localized()
@customElement('eb-header')
export class EBHeader extends LitElement {
  public static styles = [
    buttonCss,
    css`
      :host {
        height: var(--header-height, 80px);
        overflow: hidden;
        display: block;
        background: linear-gradient(
          to right,
          var(--black) 75%,
          var(--mallow-light) 100%
        );
        border-bottom: 1px solid var(--black);
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: var(--z-index-header), 2;
      }
      header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      button {
        margin-right: 30px;
        border-radius: 30px;
        height: 40px;
        background-color: var(--black);
        border: 2px solid var(--violet);
      }
      button.exit {
        aspect-ratio: 1 / 1;
        font-weight: 500;
        font-size: 16px;
      }
    `,
  ];
  protected render(): TemplateResult {
    // TODO: create proper style, and hide or remove debugger buttons
    return html`
      <header>
        <button
          @click=${(): void =>
            dispatchEBEvent(this, 'request-send-app-state', null)}
        >
          Provide App State
        </button>
        <button
          @click=${(): void =>
            dispatchEBEvent(this, 'request-send-email-info', null)}
        >
          Provide Compiled HTML
        </button>
        ${this.renderEmailCommands()} ${this.renderExitButton()}
      </header>
    `;
  }
  private renderEmailCommands(): TemplateResult {
    const emailCommands = [
      'debug-email-save',
      'debug-email-load',
      'debug-email-send',
    ] as const;
    const allButtonsTemplate = emailCommands.map((emailCommand) =>
      this.renderSimpleEventDispatcherButton(emailCommand)
    );
    return html`${allButtonsTemplate}`;
  }
  private renderExitButton(): TemplateResult {
    return html`<button class="exit" @click=${this.dispatchExitEvent}>
      X
    </button>`;
  }
  private dispatchExitEvent(): void {
    dispatchEBEvent(this, 'exit-event', null);
  }
  private renderSimpleEventDispatcherButton(
    eventType: HeaderEvent
  ): TemplateResult {
    return html`<button @click=${this.getSimpleEventDispatcher(eventType)}>
      ${localizationByText[eventType]()}
    </button>`;
  }
  private getSimpleEventDispatcher = (eventName: HeaderEvent) => (): void =>
    dispatchEBEvent(this, eventName, null);
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-header': EBHeader;
  }
}
