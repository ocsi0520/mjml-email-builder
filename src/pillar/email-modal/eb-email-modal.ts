import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
// import { dispatchEBEvent } from '../../../events/app.event';

@localized()
@customElement('eb-email-modal')
export class EBEmailModal extends LitElement {
  public static styles = css`
    dialog > * {
      padding: 10px;
    }
    dialog {
      width: 400px;
      background-color: var(--black);
      color: var(--ghost-white);
      border: var(--violet-border) solid 3px;
      box-shadow: var(--black) 0px 0px 5px;
      border-radius: 5px;
    }
    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.6);
    }
    .upper-row {
      display: flex;
      justify-content: space-around;
    }
    .bottom-row {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    .upper-row > button {
      border: none;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    button {
      height: 42px;
    }
    .send-button {
      width: fit-content;
      padding: 10px;
      border-radius: 5px;
      border: #6e64d9 2px solid;
      background-color: #141414;
      color: #6e64d9;
    }
    .close-button {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      border: #6e64d9 2px solid;
      background-color: #141414;
      color: #6e64d9;
      font-weight: 900;
      transition: all 0.2s ease-in-out;
    }
    .send-button:hover,
    .close-button:hover,
    .plus-btn:hover,
    .tab-btn:hover {
      box-shadow: #6e64d9 0px 0px 5px;
      transition: all 0.2s ease-in-out;
      background-color: #6e64d9;
      color: white;
    }
    input {
      font-family: inherit;
      width: 180px;
      height: 25px;
      border: #6e64d9 2px solid;
      border-radius: 3px;
      outline: 0;
      font-size: 10px;
      color: #fff;
      padding: 7px 10px;
      background: transparent;
      transition: border-color 0.2s;
    }
    /* input::placeholder {
      color: transparent;
    } */
    input:placeholder-shown {
      font-size: 10px;
      cursor: text;
      top: 20px;
    }
    input:focus {
      padding-bottom: 8px;
      border: #6e64d9 2px solid;
      border-radius: 3px;
      background-color: #212035;
    }
    input:focus ~ .form__label {
      position: absolute;
      top: 5px;
      display: block;
      transition: 0.2s;
      font-size: 10px;
      color: #9b9b9b;
    }
  `;
  protected render(): TemplateResult {
    return html`
      <dialog close>
        <div class="upper-row">
          <span>${msg('Send email')}</span>
          <button class="close-button">X</button>
        </div>
        <div class="bottom-row">
          <input
            type="text"
            placeholder="${msg('Email')}"
            name="name"
            required
          />
          <button class="send-button">${msg('Send')}</button>
        </div>
      </dialog>
    `;
  }
  // private copyElement = (): void => {
  //   dispatchEBEvent(this, 'copy-state-node', this.stateNode);
  // };
  // private closeEditor = (): void => {
  //   dispatchEBEvent(this, 'sidepanel-view-change', 'tools');
  // };
}
declare global {
  interface HTMLElementTagNameMap {
    'eb-email-modal': EBEmailModal;
  }
}
