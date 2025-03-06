export interface HeaderEmailBuilderEventMap {
  'debug-email-save': CustomEvent<null>;
  'debug-email-load': CustomEvent<any>; // TODO: to be defined
  'debug-email-send': CustomEvent<any>; // TODO: to be defined;
  'request-send-app-state': CustomEvent<null>;
  'request-send-email-info': CustomEvent<null>;
}
