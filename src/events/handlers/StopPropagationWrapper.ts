import { Listener } from './EmailEventListener';

export const wrapEventHandlerWithStopPropagation =
  <T extends Event>(listener: Listener<T>): Listener<T> =>
  (ev) => {
    ev.stopPropagation();
    listener(ev);
  };
