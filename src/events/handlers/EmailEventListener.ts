export type Listener<T extends Event> = (ev: T) => void;
export type ObjectWithCustomEventValues<T extends object> = {
  [K in keyof T]: CustomEvent<unknown>;
};
export type EventNamesByListeners<EventMap extends object> =
  EventMap extends ObjectWithCustomEventValues<EventMap>
    ? {
        [EventName in keyof EventMap]: Listener<EventMap[EventName]>;
      }
    : never;
