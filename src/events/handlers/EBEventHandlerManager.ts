import { EBRoot } from '../../eb-root';
import { SidePanelView } from '../../pillar/main/sidepanel/SidePanelView';
import { AppEventNamesByListeners, EmailBuilderEventMap } from '../app.event';
import { Listener } from './EmailEventListener';
import { wrapEventHandlerWithStopPropagation } from './StopPropagationWrapper';
import { EventHandlerProvider } from './provider/EventHandlerProvider';

type EventNameAndListenerTuple = [keyof EmailBuilderEventMap, Listener<Event>];

export class EBEventHandlerManager {
  private allStreamLinedListeners: Array<EventNameAndListenerTuple> = [];
  constructor(
    private ebRoot: EBRoot,
    private eventHandlerProvider = EventHandlerProvider.getInstance()
  ) {}
  public initEventHandlers(): void {
    if (this.allStreamLinedListeners.length !== 0)
      this.disconnectEventHandlers();

    this.allStreamLinedListeners = this.getAllStreamlinedEventListeners();

    this.allStreamLinedListeners.forEach(([eventName, listener]) => {
      this.ebRoot.addEventListener(eventName, listener);
    });
  }
  public disconnectEventHandlers(): void {
    this.allStreamLinedListeners.forEach(([eventName, listener]) => {
      this.ebRoot.removeEventListener(eventName, listener);
    });
    this.allStreamLinedListeners = [];
  }
  private getAllStreamlinedEventListeners(): Array<EventNameAndListenerTuple> {
    const eventHandlers = this.eventHandlerProvider.getAllEventHandlersFor(
      this.ebRoot
    );
    // important that first we streamline and then we merge the arrays
    // because it can happen that two event handler tackle the same thing
    // and we don't want to overwrite each others' handlers
    const allStreamLinedListeners = eventHandlers.flatMap((eventHandler) =>
      this.getStreamLinedListenersFrom(eventHandler.getEventListeners())
    );

    // TODO: move sidepanel-related stuff from here into a separate EVTH
    allStreamLinedListeners.push(this.getSidePanelViewChangeTuple());
    return allStreamLinedListeners;
  }
  private getSidePanelViewChangeTuple(): EventNameAndListenerTuple {
    return [
      'sidepanel-view-change',
      wrapEventHandlerWithStopPropagation(
        (ev: CustomEvent<SidePanelView>): void => {
          this.ebRoot._sidePanelView = ev.detail;
        }
      ),
    ] as EventNameAndListenerTuple;
  }
  // union types to tuple type is hacky: https://stackoverflow.com/a/55128956/11009933
  private getStreamLinedListenersFrom(
    listenersByKey: Partial<AppEventNamesByListeners>
  ): Array<EventNameAndListenerTuple> {
    return (
      Object.keys(listenersByKey) as Array<keyof EmailBuilderEventMap>
    ).map((eventName) => [
      eventName,
      wrapEventHandlerWithStopPropagation(
        listenersByKey[eventName] as Listener<Event>
      ),
    ]);
  }
}
