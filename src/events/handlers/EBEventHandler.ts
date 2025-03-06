import { AppEventNamesByListeners } from '../app.event';

export interface EBEventHandler {
  getEventListeners(): Partial<AppEventNamesByListeners>;
}
