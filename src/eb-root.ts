import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import './common/components/common-components';
import './pillar/pillars';
import './AppState/BuiltInItem/BuiltInItems';
import { CommandManagerState } from './command/CommandManager';
import { EBEventHandlerManager } from './events/handlers/EBEventHandlerManager';
import { StateNode } from './AppState/StateNode/StateNode';
import { ebItemManager } from './AppState/EBItemManager';
import { StateNodeFactory } from './AppState/Register/StateNodeFactory';
import { CanvasStateNode } from './AppState/BuiltInItem/Canvas/CanvasStateNode';
import { localization } from './localization';
import { LocaleIdentifier, allLocales } from './localization/locale-type';
import { Preview } from './views';
import { hrToolPlugin } from './ToolPlugin/HrTool/HrToolPlugin';
import { titleToolPlugin } from './ToolPlugin/TitleTool/TitleToolPlugin';
import { footerToolPlugin } from './ToolPlugin/FooterTool/FooterToolPlugin';
import { editorPlugin } from './ToolPlugin/EditorTool/EditorToolPlugin';
import { EBHighlightSelection } from './pillar/main/highlight-selection/eb-highlight-selection';
import { SidePanelView } from './pillar/main/sidepanel/SidePanelView';
import { buttonToolPlugin } from './ToolPlugin/ButtonTool/ButtonToolPlugin';
import { imageToolPlugin } from './ToolPlugin/ImageTool/ImageToolPlugin';

ebItemManager.register(hrToolPlugin);
ebItemManager.register(titleToolPlugin);
ebItemManager.register(editorPlugin);
ebItemManager.register(buttonToolPlugin);
ebItemManager.register(imageToolPlugin);
ebItemManager.register(footerToolPlugin);

@customElement('eb-root')
export class EBRoot extends LitElement {
  public static styles = css`
    :host {
      --header-height: 70px;
      --sidepanel-width: 22%;
      --sidepanel-side-padding: 10px;
      --sidepanel-item-padding: 10px 10px 5px 10px;
      --selector-upper-bar-height: 20px;
      --block-creator-height: 100px;
      --canvas-block-bottom-gap: 20px;

      --violet: #8175ff;
      --violet-dark: #5748ff;
      --violet-light: #6e64d9;
      --violet-medium: #613c84;
      --violet-border: #47418b;
      --black: #141414;
      --black-transparent: #14141400;
      --black-lighter: #1c1b20;
      --white: white;
      --ghost-white: #f0f0f3;
      --grey-dark: #838393;
      --grey-light: #e3e3e3;
      --grey-alpha: #ededed12;
      --grey-medium: #514f68;
      --highlight-color: var(--violet);
      --mallow-light: #302444;
      --mallow-dark: #18141c;
      --mallow-medium: #533e74;
      --lighter-background: #363358;

      --z-index-highlight: 1;
      --z-index-header: 2;
      --z-index-sidepanel: 3;
      --z-index-preview: 4;
    }
  `;
  @state()
  public _commandManagerState: CommandManagerState = {
    hasRedoable: false,
    hasUndoable: false,
  };
  @state()
  public _selectedStateNode: StateNode | null = null;
  @state()
  public canvasStateNode = StateNodeFactory.getInstance().createStateNodeBy(
    'canvas'
  )! as CanvasStateNode;
  @state()
  public previewState: Preview = 'none';
  @state()
  public _sidePanelView: SidePanelView = 'tools';
  public selectHighlighterRef: Ref<EBHighlightSelection> = createRef();
  public blockHoverHighlighterRef: Ref<EBHighlightSelection> = createRef();
  public nodeHoverHighlighterRef: Ref<EBHighlightSelection> = createRef();
  private eventManager: EBEventHandlerManager;
  constructor() {
    super();
    this.eventManager = new EBEventHandlerManager(this);
  }
  public connectedCallback(): void {
    super.connectedCallback();
    this.eventManager.initEventHandlers();
    this.initialLocalization();
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.eventManager.disconnectEventHandlers();
  }
  public render(): TemplateResult {
    return html`
      <eb-header></eb-header>
      ${this.renderMain()} ${this.renderHighlighters()}
      <eb-toolbar
        .undoAvailable=${this._commandManagerState.hasUndoable}
        .redoAvailable=${this._commandManagerState.hasRedoable}
      >
      </eb-toolbar>
      <eb-preview
        .canvasStateNode=${this.canvasStateNode}
        .preview=${this.previewState}
      ></eb-preview>
      <eb-email-modal></eb-email-modal>
    `;
  }
  private renderMain(): TemplateResult {
    return html`
      <eb-main
        .sidePanelView=${this._sidePanelView}
        .canvasStateNode=${this.canvasStateNode}
        .selected=${this._selectedStateNode}
      ></eb-main>
    `;
  }
  private renderHighlighters(): TemplateResult {
    return html`
      <eb-highlight-selection
        ${ref(this.selectHighlighterRef)}
      ></eb-highlight-selection>
      <eb-highlight-selection
        ${ref(this.blockHoverHighlighterRef)}
        ?pale=${true}
      ></eb-highlight-selection>
      <eb-highlight-selection
        ${ref(this.nodeHoverHighlighterRef)}
        ?pale=${true}
      ></eb-highlight-selection>
    `;
  }
  // TODO: listen for changes of 'lang' attribute & property
  // https://stackoverflow.com/questions/41424989/javascript-listen-for-attribute-change
  // property can't be listened
  // https://stackoverflow.com/a/32383745/11009933
  private initialLocalization(): void {
    const isValidLocale = allLocales.includes(this.lang as LocaleIdentifier);
    const selectedLocale = isValidLocale ? this.lang : 'en';
    localization.setLocale(selectedLocale);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eb-root': EBRoot;
  }
}
