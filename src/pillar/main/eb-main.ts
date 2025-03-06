import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StateNode } from '../../AppState/StateNode/StateNode';
import '../../AppState/BuiltInItem/Canvas/eb-canvas-viewer';
import './sidepanel/eb-sidepanel';
import './block-creator/eb-block-creator';
import { CanvasStateNode } from '../../AppState/BuiltInItem/Canvas/CanvasStateNode';
import type { SidePanelView } from './sidepanel/SidePanelView';

const canvasImg = new URL('../../../../assets/canvasbg.png', import.meta.url)
  .href;

@customElement('eb-main')
export class EBMain extends LitElement {
  public static styles = css`
    main {
      display: flex;
      padding-top: calc(
        var(--header-height) + var(--selector-upper-bar-height)
      );
      padding-right: var(--sidepanel-width);
    }
    .canvas-and-block-creator {
      width: 100%;
      height: 100%;
      min-height: calc(
        100vh - (var(--header-height) + var(--selector-upper-bar-height)) -
          var(--canvas-block-bottom-gap)
      );
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 5px var(--black);
      margin: 0 10px 20px 10px;
    }
    eb-canvas-viewer {
      flex: 1 1 auto;
      border-top: 1px solid var(--black);
    }
    eb-block-creator {
      flex: 0 0 auto;
      padding: 8px;
      box-sizing: border-box;
      background-color: var(--white);
      border-top: 2px solid var(--violet);
      border-bottom: 1px solid var(--black);
    }
    eb-block-creator,
    eb-canvas-viewer {
      border-left: 1px solid var(--black);
      border-right: 1px solid var(--black);
    }
  `;
  @property()
  public selected: StateNode | null = null;
  @property()
  public canvasStateNode!: CanvasStateNode;
  @property()
  public sidePanelView!: SidePanelView;
  protected render(): TemplateResult {
    return html`
      <main style="background-image:url(${canvasImg});">
        <div class="canvas-and-block-creator">
          ${this.canvasStateNode.component}
          <eb-block-creator tabindex="-1"></eb-block-creator>
        </div>
        <eb-sidepanel
          .view=${this.sidePanelView}
          .selected=${this.selected}
        ></eb-sidepanel>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-main': EBMain;
  }
}
