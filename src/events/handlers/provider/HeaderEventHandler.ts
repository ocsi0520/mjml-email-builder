import { CommandManager } from '../../../command/CommandManager';
import { EBRoot } from '../../../eb-root';
import { HeaderEmailBuilderEventMap } from '../../header.event';
import { EventNamesByListeners } from '../EmailEventListener';
import { AppStateSerializer } from '../../../AppState/AppStateSerializer';
import { FileSaverLoader } from '../FileSaverLoader';
import { AppHTMLGenerator } from '../../../AppState/AppHTMLGenerator';
import { EBEventHandler } from '../EBEventHandler';
import { dispatchEBEvent } from '../../app.event';
import { GlobalSettings } from '../../../pillar/main/sidepanel/global-settings/global-settings';

export class HeaderEventHandler implements EBEventHandler {
  // TODO: too many dependencies :(, so strong indication to split this up
  // (or just simply remove debug stuff :D)
  // eslint-disable-next-line max-params
  constructor(
    private ebRoot: EBRoot,
    private commandManager = CommandManager.getInstance(),
    private appStateSerializer = AppStateSerializer.getInstance(),
    private fileSaverLoader = FileSaverLoader.getInstance(),
    private appHTMLGenerator = AppHTMLGenerator.getInstance(),
    private globalSettings = GlobalSettings.getInstance()
  ) {}
  private static getDefaultFileName(): string {
    const currentDateTime = new Date();
    return [
      currentDateTime.getFullYear(),
      currentDateTime.getMonth() + 1,
      currentDateTime.getDate(),
      currentDateTime.getHours(),
      currentDateTime.getMinutes(),
    ].join('-');
  }
  public getEventListeners(): EventNamesByListeners<HeaderEmailBuilderEventMap> {
    return {
      'debug-email-save': this.saveAppStateToFile,
      'debug-email-load': this.handleEmailLoad,
      'debug-email-send': this.handleEmailSend,
      'request-send-app-state': this.dispatchAppState,
      'request-send-email-info': this.dispatchCompiledHTML,
    };
  }
  private saveAppStateToFile = (): void => {
    const serializedState = this.appStateSerializer.serializeAppState(
      this.ebRoot.canvasStateNode,
      this.globalSettings
    );
    const defaultFileName = HeaderEventHandler.getDefaultFileName();
    this.fileSaverLoader.saveAsFile(serializedState, defaultFileName);
  };
  private loadAppStateFromFile(): void {
    this.fileSaverLoader.loadFile((content: string) => {
      const { canvas, globalSettings } =
        this.appStateSerializer.deserializeAppState(content);
      this.globalSettings.linkColor = globalSettings.linkColor;
      this.globalSettings.font = globalSettings.font;
      this.ebRoot.canvasStateNode = canvas;
    });
  }
  private handleEmailLoad = (): void => {
    this.loadAppStateFromFile();
    this.commandManager.clearCommandList();
    this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
  };
  private handleEmailSend = (): void => {
    // const body = this.appHTMLGenerator.getHTMLFromCanvas(
    //   this.ebRoot.canvasStateNode
    // );
    // fetch('https://luciendelmar.com/phpMail.php', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'text/html',
    //   },
    //   body,
    // });
    // console.log(body);
    const modalComponent =
      this.ebRoot.shadowRoot?.querySelector('eb-email-modal');
    modalComponent?.shadowRoot?.querySelector('dialog')?.showModal();
  };
  private dispatchAppState = (): void => {
    const serializedState = this.appStateSerializer.serializeAppState(
      this.ebRoot.canvasStateNode,
      this.globalSettings
    );
    dispatchEBEvent(this.ebRoot, 'send-app-state', serializedState);
  };
  private dispatchCompiledHTML = (): void => {
    const compiledHTML = this.appHTMLGenerator.getHTMLFromCanvas(
      this.ebRoot.canvasStateNode
    );
    const serializedState = this.appStateSerializer.serializeAppState(
      this.ebRoot.canvasStateNode,
      this.globalSettings
    );
    dispatchEBEvent(this.ebRoot, 'send-email-info', {
      serializedState,
      compiledHTML,
    });
  };
}
