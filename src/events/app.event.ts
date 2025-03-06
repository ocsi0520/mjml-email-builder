import { CanvasEmailBuilderEventMap } from './canvas.event';
import { EventNamesByListeners } from './handlers/EmailEventListener';
import { HeaderEmailBuilderEventMap } from './header.event';
import { OutgoingEventMap } from './outgoing-event';
import { SidePanelEmailBuilderEventMap } from './sidepanel.event';
import { ToolbarEmailBuilderEventMap } from './toolbar.event';

export interface EmailBuilderEventMap
  extends HeaderEmailBuilderEventMap,
    CanvasEmailBuilderEventMap,
    ToolbarEmailBuilderEventMap,
    SidePanelEmailBuilderEventMap,
    OutgoingEventMap {}

export type AppEventNamesByListeners =
  EventNamesByListeners<EmailBuilderEventMap>;

declare global {
  interface HTMLElementEventMap extends EmailBuilderEventMap {}
}

export const dispatchEBEvent = <
  EventName extends keyof EmailBuilderEventMap,
  EventType extends EmailBuilderEventMap[EventName]
>(
  eventTarget: EventTarget,
  eventName: EventName,
  detail: EventType['detail']
): void => {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail,
  }) as EventType;
  eventTarget.dispatchEvent(event);
};
