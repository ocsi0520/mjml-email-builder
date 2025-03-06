import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Preview, View } from '../../views';
import { dispatchEBEvent } from '../../events/app.event';
import { CanvasStateNode } from '../../AppState/BuiltInItem/Canvas/CanvasStateNode';
import { AppHTMLGenerator } from '../../AppState/AppHTMLGenerator';
import { upperBarCSS } from '../../common/upper-bar.style';

type IframeSize = {
  width: number;
  height: number;
};

const crossIconURL = new URL('../../../../assets/cross.svg', import.meta.url)
  .href;

@customElement('eb-preview')
export class EBPreview extends LitElement {
  public static styles = [
    upperBarCSS,
    css`
      :host {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        z-index: var(--z-index-preview, 4);
      }
      div.preview-wrapper {
        position: relative;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      div.upper-bar > div {
        display: inline-flex;
        justify-content: center;
      }
      div.icons {
        position: relative;
        z-index: 1;
        width: 42px;
      }
      div.edge {
        z-index: 0;
      }
    `,
  ];
  private static IframeWidthByPreview: Record<View, number> = {
    desktop: 1440,
    tablet: 1024,
    phone: 600,
  };
  @property()
  public preview: Preview = 'none';
  @property()
  public canvasStateNode!: CanvasStateNode;
  @property()
  public appHTMLGenerator = AppHTMLGenerator.getInstance();
  protected render(): TemplateResult | typeof nothing {
    if (this.preview === 'none' || !this.canvasStateNode) return nothing;
    return html`<div class="preview-wrapper">
      ${this.renderUpperbar()}${this.renderPreview()}
    </div>`;
  }
  private renderUpperbar(): TemplateResult {
    return html`<div class="upper-bar">
      <div class="edge left-edge"></div>
      <div class="icons">
        <img
          @click=${(): void => dispatchEBEvent(this, 'exit-preview', null)}
          alt="delete item"
          src="${crossIconURL}"
        />
      </div>
      <div class="edge right-edge"></div>
    </div>`;
  }
  private renderPreview(): TemplateResult {
    const { width, height } = this.getIframeSize();
    const emailHTMLString = this.appHTMLGenerator.getHTMLFromCanvas(
      this.canvasStateNode
    );
    return html`<iframe
      title="email-preview"
      width=${width}
      height=${height}
      sandbox
      srcdoc=${emailHTMLString}
    ></iframe>`;
  }
  private getIframeSize(): IframeSize {
    return {
      height: Math.floor(window.innerHeight * 0.8),
      width: EBPreview.IframeWidthByPreview[this.preview as View],
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-preview': EBPreview;
  }
}
